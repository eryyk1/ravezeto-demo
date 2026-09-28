import { hashPassword, verifyPassword } from './passwordHash.js';
import {
  ADMIN_ROLES,
  countActiveFoadmins,
  emptyAdminUsersRecord,
  findUserByEmail,
  findUserById,
  normalizeEmail,
  sanitizeUserForClient,
} from './adminUserStore.js';

function nowIso() {
  return new Date().toISOString();
}

function newUserId() {
  return crypto.randomUUID();
}

function readBootstrapEmail(env) {
  return env?.ADMIN_BOOTSTRAP_EMAIL ?? env?.ADMIN_EMAIL ?? null;
}

function readBootstrapPassword(env) {
  return env?.ADMIN_BOOTSTRAP_PASSWORD ?? null;
}

function legacyEnvAccounts(env) {
  const accounts = [];
  if (env?.ADMIN_EMAIL && env?.ADMIN_PASSWORD) {
    accounts.push({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD, role: ADMIN_ROLES.FOADMIN });
  }
  if (env?.CLIENT_ADMIN_EMAIL && env?.CLIENT_ADMIN_PASSWORD) {
    accounts.push({
      email: env.CLIENT_ADMIN_EMAIL,
      password: env.CLIENT_ADMIN_PASSWORD,
      role: ADMIN_ROLES.ADMIN,
    });
  }
  return accounts;
}

async function createUserInRecord(record, { email, password, role }) {
  const normalized = normalizeEmail(email);
  if (findUserByEmail(record, normalized)) {
    return { ok: false, error: 'Ez az email már foglalt.' };
  }
  if (!password || String(password).length < 8) {
    return { ok: false, error: 'A jelszónak legalább 8 karakter hosszúnak kell lennie.' };
  }
  if (role !== ADMIN_ROLES.FOADMIN && role !== ADMIN_ROLES.ADMIN) {
    return { ok: false, error: 'Érvénytelen szerepkör.' };
  }

  const ts = nowIso();
  const user = {
    id: newUserId(),
    email: normalized,
    passwordHash: await hashPassword(String(password)),
    role,
    active: true,
    createdAt: ts,
    updatedAt: ts,
  };
  record.users.push(user);
  return { ok: true, user };
}

async function tryBootstrapFirstUser(record, email, password, env) {
  if (record.users.length > 0) return null;

  const bootstrapEmail = readBootstrapEmail(env);
  const bootstrapPassword = readBootstrapPassword(env);
  const normalized = normalizeEmail(email);

  if (
    bootstrapEmail &&
    bootstrapPassword &&
    normalized === normalizeEmail(bootstrapEmail) &&
    String(password) === String(bootstrapPassword)
  ) {
    const created = await createUserInRecord(record, {
      email: bootstrapEmail,
      password: bootstrapPassword,
      role: ADMIN_ROLES.FOADMIN,
    });
    return created.ok ? created.user : null;
  }

  for (const legacy of legacyEnvAccounts(env)) {
    if (normalized === normalizeEmail(legacy.email) && String(password) === String(legacy.password)) {
      const created = await createUserInRecord(record, {
        email: legacy.email,
        password: legacy.password,
        role: legacy.role,
      });
      return created.ok ? created.user : null;
    }
  }

  return null;
}

async function tryLegacyMigrateUser(record, email, password, env) {
  const normalized = normalizeEmail(email);
  if (findUserByEmail(record, normalized)) return null;

  for (const legacy of legacyEnvAccounts(env)) {
    if (normalized === normalizeEmail(legacy.email) && String(password) === String(legacy.password)) {
      const created = await createUserInRecord(record, {
        email: legacy.email,
        password: legacy.password,
        role: legacy.role,
      });
      return created.ok ? created.user : null;
    }
  }
  return null;
}

/**
 * @param {{ readUsers: () => Promise<{version:number, users:object[]}>, writeUsers: (r: object) => Promise<{ok:boolean}>, env: object }} deps
 */
export async function authenticateAdminUser(email, password, deps) {
  const { readUsers, writeUsers, env } = deps;
  let record = await readUsers();

  if (record.users.length === 0) {
    const bootstrapped = await tryBootstrapFirstUser(record, email, password, env);
    if (bootstrapped) {
      await writeUsers(record);
    } else {
      return null;
    }
    record = await readUsers();
  }

  let user = findUserByEmail(record, email);
  if (!user) {
    const migrated = await tryLegacyMigrateUser(record, email, password, env);
    if (migrated) {
      await writeUsers(record);
      user = migrated;
    } else {
      return null;
    }
  }

  if (!user.active) return null;
  const valid = await verifyPassword(String(password ?? ''), user.passwordHash);
  if (!valid) return null;

  return { id: user.id, email: user.email, role: user.role };
}

export async function listAdminUsers(readUsers) {
  const record = await readUsers();
  return record.users.map(sanitizeUserForClient).sort((a, b) => a.email.localeCompare(b.email));
}

export async function createAdminUser({ email, password, role }, readUsers, writeUsers) {
  const record = await readUsers();
  const created = await createUserInRecord(record, { email, password, role });
  if (!created.ok) return created;
  const write = await writeUsers(record);
  if (!write.ok) return write;
  return { ok: true, user: sanitizeUserForClient(created.user) };
}

export async function updateAdminUser(userId, patch, readUsers, writeUsers, actor) {
  const record = await readUsers();
  const user = findUserById(record, userId);
  if (!user) return { ok: false, error: 'Felhasználó nem található.', status: 404 };

  const nextActive = patch.active !== undefined ? Boolean(patch.active) : user.active;
  const nextRole = patch.role !== undefined ? patch.role : user.role;

  if (actor.role !== ADMIN_ROLES.FOADMIN) {
    return { ok: false, error: 'Forbidden', status: 403 };
  }

  if (actor.id === userId && patch.role && patch.role !== user.role) {
    return { ok: false, error: 'Saját szerepkör módosítása nem engedélyezett.', status: 400 };
  }

  if (nextRole !== ADMIN_ROLES.FOADMIN && nextRole !== ADMIN_ROLES.ADMIN) {
    return { ok: false, error: 'Érvénytelen szerepkör.', status: 400 };
  }

  const wasActiveFoadmin = user.active && user.role === ADMIN_ROLES.FOADMIN;
  const willBeActiveFoadmin = nextActive && nextRole === ADMIN_ROLES.FOADMIN;

  if (wasActiveFoadmin && !willBeActiveFoadmin && countActiveFoadmins(record) <= 1) {
    return {
      ok: false,
      error: 'Az utolsó aktív Főadmin nem tiltható le vagy vonható vissza.',
      status: 400,
    };
  }

  user.active = nextActive;
  user.role = nextRole;
  user.updatedAt = nowIso();

  const write = await writeUsers(record);
  if (!write.ok) return write;
  return { ok: true, user: sanitizeUserForClient(user) };
}

export async function resetAdminUserPassword(userId, newPassword, readUsers, writeUsers, actor) {
  if (actor.role !== ADMIN_ROLES.FOADMIN) {
    return { ok: false, error: 'Forbidden', status: 403 };
  }
  if (!newPassword || String(newPassword).length < 8) {
    return { ok: false, error: 'A jelszónak legalább 8 karakter hosszúnak kell lennie.', status: 400 };
  }

  const record = await readUsers();
  const user = findUserById(record, userId);
  if (!user) return { ok: false, error: 'Felhasználó nem található.', status: 404 };

  user.passwordHash = await hashPassword(String(newPassword));
  user.updatedAt = nowIso();

  const write = await writeUsers(record);
  if (!write.ok) return write;
  return { ok: true };
}

export async function deleteAdminUser(userId, readUsers, writeUsers, actor) {
  if (actor.role !== ADMIN_ROLES.FOADMIN) {
    return { ok: false, error: 'Forbidden', status: 403 };
  }

  const record = await readUsers();
  const user = findUserById(record, userId);
  if (!user) return { ok: false, error: 'Felhasználó nem található.', status: 404 };

  if (user.active && user.role === ADMIN_ROLES.FOADMIN && countActiveFoadmins(record) <= 1) {
    return { ok: false, error: 'Az utolsó aktív Főadmin nem törölhető.', status: 400 };
  }

  record.users = record.users.filter((u) => u.id !== userId);
  const write = await writeUsers(record);
  if (!write.ok) return write;
  return { ok: true };
}

export { emptyAdminUsersRecord, ADMIN_ROLES };
