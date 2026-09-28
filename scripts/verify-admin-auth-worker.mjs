/**
 * Worker-style admin auth tests (functions/* + Web Crypto PBKDF2, no Vite).
 * Run: node scripts/verify-admin-auth-worker.mjs
 */
import { handleAdminLogin } from '../functions/api/admin/login.js';
import { handleAdminSession } from '../functions/api/admin/session.js';
import { handleAdminUsersList } from '../functions/api/admin/users.js';
import { readAdminUsers, writeAdminUsers, emptyAdminUsersRecord, findUserByEmail } from '../functions/lib/adminUserStore.js';
import {
  authenticateAdminUser,
  createAdminUser,
  updateAdminUser,
  ADMIN_ROLES,
} from '../functions/lib/adminUsersService.js';
import {
  hashPasswordWithIterations,
  parsePasswordHash,
  PBKDF2_ITERATIONS_DEFAULT,
  PBKDF2_ITERATIONS_LEGACY,
  verifyPassword,
} from '../functions/lib/passwordHash.js';

const JWT_SECRET = 'test-worker-admin-jwt-secret-min-32-chars';
const BOOTSTRAP_EMAIL = 'bootstrap.foadmin@ravezeto.hu';
const BOOTSTRAP_PASSWORD = 'bootstrap-pass-2026!';

function createMockEnv() {
  const kv = new Map();
  const env = {
    ADMIN_JWT_SECRET: JWT_SECRET,
    ADMIN_BOOTSTRAP_EMAIL: BOOTSTRAP_EMAIL,
    ADMIN_BOOTSTRAP_PASSWORD: BOOTSTRAP_PASSWORD,
    CMS_KV: {
      get: async (key) => kv.get(key) ?? null,
      put: async (key, value) => {
        kv.set(key, value);
      },
    },
  };
  return { env, kv };
}

function storeDeps(env) {
  return {
    env,
    readUsers: () => readAdminUsers(env),
    writeUsers: (record) => writeAdminUsers(env, record),
  };
}

async function loginRequest(env, email, password) {
  const request = new Request('https://ravezeto.hu/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleAdminLogin(request, env);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  console.log('verify-admin-auth-worker: starting');

  const legacyHash = await hashPasswordWithIterations('legacy-check-1', PBKDF2_ITERATIONS_LEGACY);
  assert(parsePasswordHash(legacyHash)?.iterations === PBKDF2_ITERATIONS_LEGACY, 'legacy hash parse');
  assert(await verifyPassword('legacy-check-1', legacyHash), 'legacy hash verifies');

  const { env } = createMockEnv();
  const deps = storeDeps(env);

  // 1. First Főadmin bootstrap (Worker login handler)
  const resBootstrap = await loginRequest(env, BOOTSTRAP_EMAIL, BOOTSTRAP_PASSWORD);
  assert(resBootstrap.status === 200, `bootstrap login HTTP ${resBootstrap.status}`);
  const bootPayload = await resBootstrap.json();
  assert(typeof bootPayload.accessToken === 'string', 'bootstrap accessToken');
  assert(bootPayload.user?.role === 'foadmin', 'bootstrap role');

  const storedAfterBoot = JSON.parse((await env.CMS_KV.get('admin:users:v1')) ?? '{"users":[]}');
  assert(storedAfterBoot.users.length === 1, 'one user in KV');
  const hashMeta = parsePasswordHash(storedAfterBoot.users[0].passwordHash);
  assert(hashMeta?.iterations === PBKDF2_ITERATIONS_DEFAULT, 'bootstrap hash uses DEFAULT iterations');
  assert(!storedAfterBoot.users[0].passwordHash.includes(BOOTSTRAP_PASSWORD), 'no plaintext in KV');
  console.log('OK bootstrap + single hash in KV');

  // 2. Normal Főadmin login
  const resFoadmin = await loginRequest(env, BOOTSTRAP_EMAIL, BOOTSTRAP_PASSWORD);
  assert(resFoadmin.status === 200, 'foadmin re-login');
  console.log('OK foadmin login');

  // 3. Wrong password
  const resWrong = await loginRequest(env, BOOTSTRAP_EMAIL, 'not-the-password');
  assert(resWrong.status === 401, `wrong password HTTP ${resWrong.status}`);
  console.log('OK wrong password 401');

  // 4. Admin user login
  const adminEmail = 'admin.user@ravezeto.hu';
  const adminPass = 'admin-user-pass1';
  const created = await createAdminUser(
    { email: adminEmail, password: adminPass, role: ADMIN_ROLES.ADMIN },
    deps.readUsers,
    deps.writeUsers,
  );
  assert(created.ok, 'create admin');
  const resAdmin = await loginRequest(env, adminEmail, adminPass);
  assert(resAdmin.status === 200, 'admin login');
  const adminPayload = await resAdmin.json();
  assert(adminPayload.user?.role === 'admin', 'admin role');
  console.log('OK admin login');

  const foadminToken = bootPayload.accessToken;
  const adminToken = adminPayload.accessToken;

  // 5. Főadmin-only endpoint (while admin is still active)
  const listAsAdmin = await handleAdminUsersList(
    new Request('https://ravezeto.hu/api/admin/users', {
      headers: { Authorization: `Bearer ${adminToken}`, Accept: 'application/json' },
    }),
    env,
  );
  assert(listAsAdmin.status === 403, 'admin forbidden users list');

  const listAsFoadmin = await handleAdminUsersList(
    new Request('https://ravezeto.hu/api/admin/users', {
      headers: { Authorization: `Bearer ${foadminToken}`, Accept: 'application/json' },
    }),
    env,
  );
  assert(listAsFoadmin.status === 200, 'foadmin users list');

  const sessionRes = await handleAdminSession(
    new Request('https://ravezeto.hu/api/admin/session', {
      headers: { Authorization: `Bearer ${foadminToken}`, Accept: 'application/json' },
    }),
    env,
  );
  assert(sessionRes.status === 200, 'session endpoint');
  console.log('OK foadmin-only authorization');

  // 6. Disabled user
  const record = await deps.readUsers();
  const adminUser = findUserByEmail(record, adminEmail);
  const bootRecord = findUserByEmail(record, BOOTSTRAP_EMAIL);
  const disabled = await updateAdminUser(
    adminUser.id,
    { active: false },
    deps.readUsers,
    deps.writeUsers,
    { id: bootRecord.id, role: ADMIN_ROLES.FOADMIN },
  );
  assert(disabled.ok, 'disable admin');
  const resDisabled = await loginRequest(env, adminEmail, adminPass);
  assert(resDisabled.status === 401, 'disabled user 401');
  console.log('OK disabled user');

  // 7. Legacy 600k hash: verify + upgrade on login
  const { env: legacyEnv } = createMockEnv();
  const legacyDeps = storeDeps(legacyEnv);
  const legacyHashOnly = await hashPasswordWithIterations('upgrade-me-99', PBKDF2_ITERATIONS_LEGACY);
  const legacyRecord = emptyAdminUsersRecord();
  legacyRecord.users.push({
    id: crypto.randomUUID(),
    email: 'legacy.user@ravezeto.hu',
    passwordHash: legacyHashOnly,
    role: ADMIN_ROLES.ADMIN,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  await legacyDeps.writeUsers(legacyRecord);

  const legacyLogin = await authenticateAdminUser('legacy.user@ravezeto.hu', 'upgrade-me-99', legacyDeps);
  assert(legacyLogin?.email === 'legacy.user@ravezeto.hu', 'legacy user login');
  const afterLegacy = await legacyDeps.readUsers();
  const upgraded = findUserByEmail(afterLegacy, 'legacy.user@ravezeto.hu');
  assert(
    parsePasswordHash(upgraded.passwordHash)?.iterations === PBKDF2_ITERATIONS_DEFAULT,
    'legacy hash upgraded to DEFAULT',
  );
  console.log('OK legacy hash verify + upgrade');

  console.log('verify-admin-auth-worker: all checks passed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
