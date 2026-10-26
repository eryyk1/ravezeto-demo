var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// functions/lib/sessionConfig.js
var ADMIN_SESSION_TTL_MS = 60 * 60 * 1e3;

// functions/lib/adminAuth.js
function base64UrlEncode(bytes) {
  const bin = bytes instanceof Uint8Array ? bytes : new TextEncoder().encode(bytes);
  let binary = "";
  for (const byte of bin) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(base64UrlEncode, "base64UrlEncode");
function base64UrlDecode(value) {
  const padded = value + "=".repeat((4 - value.length % 4) % 4);
  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}
__name(base64UrlDecode, "base64UrlDecode");
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
__name(timingSafeEqual, "timingSafeEqual");
async function hmacSha256Base64Url(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return base64UrlEncode(new Uint8Array(signature));
}
__name(hmacSha256Base64Url, "hmacSha256Base64Url");
async function signAdminToken(payload, secret, ttlMs = ADMIN_SESSION_TTL_MS) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(
    JSON.stringify({
      ...payload,
      exp: Date.now() + ttlMs
    })
  );
  const signature = await hmacSha256Base64Url(secret, `${header}.${body}`);
  return `${header}.${body}.${signature}`;
}
__name(signAdminToken, "signAdminToken");
async function verifyAdminToken(token, secret) {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expected = await hmacSha256Base64Url(secret, `${header}.${body}`);
  if (!timingSafeEqual(signature, expected)) return null;
  try {
    const payload = JSON.parse(base64UrlDecode(body));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
__name(verifyAdminToken, "verifyAdminToken");
function getAdminSecret(env) {
  return env?.ADMIN_JWT_SECRET ?? null;
}
__name(getAdminSecret, "getAdminSecret");
function isAdminAuthConfigured(env) {
  if (!getAdminSecret(env)) return false;
  if (env?.CMS_KV) return true;
  return Boolean(
    env?.ADMIN_BOOTSTRAP_PASSWORD || env?.ADMIN_EMAIL && env?.ADMIN_PASSWORD
  );
}
__name(isAdminAuthConfigured, "isAdminAuthConfigured");

// functions/lib/adminUserStore.js
var ADMIN_USERS_KV_KEY = "admin:users:v1";
var ADMIN_ROLES = {
  FOADMIN: "foadmin",
  ADMIN: "admin"
};
function emptyAdminUsersRecord() {
  return { version: 1, users: [] };
}
__name(emptyAdminUsersRecord, "emptyAdminUsersRecord");
function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}
__name(normalizeEmail, "normalizeEmail");
async function readAdminUsers(env) {
  if (!env?.CMS_KV) return emptyAdminUsersRecord();
  const raw = await env.CMS_KV.get(ADMIN_USERS_KV_KEY);
  if (!raw) return emptyAdminUsersRecord();
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.users)) return emptyAdminUsersRecord();
    return { version: 1, users: parsed.users };
  } catch {
    return emptyAdminUsersRecord();
  }
}
__name(readAdminUsers, "readAdminUsers");
async function writeAdminUsers(env, record) {
  if (!env?.CMS_KV) {
    return { ok: false, error: "CMS_KV binding is not configured on the Worker." };
  }
  await env.CMS_KV.put(ADMIN_USERS_KV_KEY, JSON.stringify(record));
  return { ok: true };
}
__name(writeAdminUsers, "writeAdminUsers");
function sanitizeUserForClient(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}
__name(sanitizeUserForClient, "sanitizeUserForClient");
function countActiveFoadmins(record) {
  return record.users.filter((u) => u.active && u.role === ADMIN_ROLES.FOADMIN).length;
}
__name(countActiveFoadmins, "countActiveFoadmins");
function findUserByEmail(record, email) {
  const normalized = normalizeEmail(email);
  return record.users.find((u) => normalizeEmail(u.email) === normalized) ?? null;
}
__name(findUserByEmail, "findUserByEmail");
function findUserById(record, id) {
  return record.users.find((u) => u.id === id) ?? null;
}
__name(findUserById, "findUserById");
async function resolveActiveUserById(userId, readUsers) {
  const record = await readUsers();
  const user = findUserById(record, userId);
  if (!user || !user.active) return null;
  return user;
}
__name(resolveActiveUserById, "resolveActiveUserById");

// functions/lib/passwordHash.js
var PBKDF2_ITERATIONS_DEFAULT = 1e5;
var PBKDF2_ITERATIONS_MIN = 1e5;
var SALT_BYTES = 16;
var KEY_BITS = 256;
function base64UrlEncode2(bytes) {
  const bin = bytes instanceof Uint8Array ? bytes : new TextEncoder().encode(bytes);
  let binary = "";
  for (const byte of bin) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
__name(base64UrlEncode2, "base64UrlEncode");
function base64UrlDecode2(value) {
  const padded = value + "=".repeat((4 - value.length % 4) % 4);
  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
__name(base64UrlDecode2, "base64UrlDecode");
function parsePasswordHash(stored) {
  if (typeof stored !== "string" || !stored.startsWith("pbkdf2-sha256$")) return null;
  const parts = stored.split("$");
  if (parts.length !== 4) return null;
  const iterations = Number(parts[1]);
  if (!Number.isFinite(iterations) || iterations < PBKDF2_ITERATIONS_MIN) return null;
  return {
    algorithm: "pbkdf2-sha256",
    iterations,
    saltB64: parts[2],
    hashB64: parts[3]
  };
}
__name(parsePasswordHash, "parsePasswordHash");
function shouldUpgradePasswordHash(stored) {
  const parsed = parsePasswordHash(stored);
  if (!parsed) return false;
  return parsed.iterations !== PBKDF2_ITERATIONS_DEFAULT;
}
__name(shouldUpgradePasswordHash, "shouldUpgradePasswordHash");
async function hashPassword(plainPassword) {
  return hashPasswordWithIterations(plainPassword, PBKDF2_ITERATIONS_DEFAULT);
}
__name(hashPassword, "hashPassword");
async function hashPasswordWithIterations(plainPassword, iterations) {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await deriveKeyWithIterations(plainPassword, salt, iterations);
  return `pbkdf2-sha256$${iterations}$${base64UrlEncode2(salt)}$${base64UrlEncode2(hash)}`;
}
__name(hashPasswordWithIterations, "hashPasswordWithIterations");
async function deriveKeyWithIterations(plainPassword, salt, iterations) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(plainPassword), "PBKDF2", false, [
    "deriveBits"
  ]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256"
    },
    keyMaterial,
    KEY_BITS
  );
  return new Uint8Array(bits);
}
__name(deriveKeyWithIterations, "deriveKeyWithIterations");
async function verifyPassword(plainPassword, stored) {
  const parsed = parsePasswordHash(stored);
  if (!parsed) return false;
  const salt = base64UrlDecode2(parsed.saltB64);
  const expected = base64UrlDecode2(parsed.hashB64);
  const actual = await deriveKeyWithIterations(plainPassword, salt, parsed.iterations);
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i += 1) diff |= actual[i] ^ expected[i];
  return diff === 0;
}
__name(verifyPassword, "verifyPassword");

// functions/lib/adminUsersService.js
function nowIso() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
__name(nowIso, "nowIso");
function newUserId() {
  return crypto.randomUUID();
}
__name(newUserId, "newUserId");
function readBootstrapEmail(env) {
  return env?.ADMIN_BOOTSTRAP_EMAIL ?? env?.ADMIN_EMAIL ?? null;
}
__name(readBootstrapEmail, "readBootstrapEmail");
function readBootstrapPassword(env) {
  return env?.ADMIN_BOOTSTRAP_PASSWORD ?? null;
}
__name(readBootstrapPassword, "readBootstrapPassword");
function legacyEnvAccounts(env) {
  const accounts = [];
  if (env?.ADMIN_EMAIL && env?.ADMIN_PASSWORD) {
    accounts.push({ email: env.ADMIN_EMAIL, password: env.ADMIN_PASSWORD, role: ADMIN_ROLES.FOADMIN });
  }
  if (env?.CLIENT_ADMIN_EMAIL && env?.CLIENT_ADMIN_PASSWORD) {
    accounts.push({
      email: env.CLIENT_ADMIN_EMAIL,
      password: env.CLIENT_ADMIN_PASSWORD,
      role: ADMIN_ROLES.ADMIN
    });
  }
  return accounts;
}
__name(legacyEnvAccounts, "legacyEnvAccounts");
async function createUserInRecord(record, { email, password, role }) {
  const normalized = normalizeEmail(email);
  if (findUserByEmail(record, normalized)) {
    return { ok: false, error: "Ez az email m\xE1r foglalt." };
  }
  if (!password || String(password).length < 8) {
    return { ok: false, error: "A jelsz\xF3nak legal\xE1bb 8 karakter hossz\xFAnak kell lennie." };
  }
  if (role !== ADMIN_ROLES.FOADMIN && role !== ADMIN_ROLES.ADMIN) {
    return { ok: false, error: "\xC9rv\xE9nytelen szerepk\xF6r." };
  }
  const ts = nowIso();
  const user = {
    id: newUserId(),
    email: normalized,
    passwordHash: await hashPassword(String(password)),
    role,
    active: true,
    createdAt: ts,
    updatedAt: ts
  };
  record.users.push(user);
  return { ok: true, user };
}
__name(createUserInRecord, "createUserInRecord");
async function tryBootstrapFirstUser(record, email, password, env) {
  if (record.users.length > 0) return null;
  const bootstrapEmail = readBootstrapEmail(env);
  const bootstrapPassword = readBootstrapPassword(env);
  const normalized = normalizeEmail(email);
  if (bootstrapEmail && bootstrapPassword && normalized === normalizeEmail(bootstrapEmail) && String(password) === String(bootstrapPassword)) {
    const created = await createUserInRecord(record, {
      email: bootstrapEmail,
      password: bootstrapPassword,
      role: ADMIN_ROLES.FOADMIN
    });
    return created.ok ? created.user : null;
  }
  for (const legacy of legacyEnvAccounts(env)) {
    if (normalized === normalizeEmail(legacy.email) && String(password) === String(legacy.password)) {
      const created = await createUserInRecord(record, {
        email: legacy.email,
        password: legacy.password,
        role: legacy.role
      });
      return created.ok ? created.user : null;
    }
  }
  return null;
}
__name(tryBootstrapFirstUser, "tryBootstrapFirstUser");
async function tryLegacyMigrateUser(record, email, password, env) {
  const normalized = normalizeEmail(email);
  if (findUserByEmail(record, normalized)) return null;
  for (const legacy of legacyEnvAccounts(env)) {
    if (normalized === normalizeEmail(legacy.email) && String(password) === String(legacy.password)) {
      const created = await createUserInRecord(record, {
        email: legacy.email,
        password: legacy.password,
        role: legacy.role
      });
      return created.ok ? created.user : null;
    }
  }
  return null;
}
__name(tryLegacyMigrateUser, "tryLegacyMigrateUser");
function userAuthResult(user) {
  return { id: user.id, email: user.email, role: user.role };
}
__name(userAuthResult, "userAuthResult");
async function authenticateAdminUser(email, password, deps) {
  const { readUsers, writeUsers, env } = deps;
  let record = await readUsers();
  if (record.users.length === 0) {
    const bootstrapped = await tryBootstrapFirstUser(record, email, password, env);
    if (!bootstrapped) return null;
    const write = await writeUsers(record);
    if (!write.ok) return null;
    return userAuthResult(bootstrapped);
  }
  let user = findUserByEmail(record, email);
  if (!user) {
    const migrated = await tryLegacyMigrateUser(record, email, password, env);
    if (!migrated) return null;
    const write = await writeUsers(record);
    if (!write.ok) return null;
    return userAuthResult(migrated);
  }
  if (!user.active) return null;
  const valid = await verifyPassword(String(password ?? ""), user.passwordHash);
  if (!valid) return null;
  if (shouldUpgradePasswordHash(user.passwordHash)) {
    user.passwordHash = await hashPassword(String(password));
    user.updatedAt = nowIso();
    const write = await writeUsers(record);
    if (!write.ok) return null;
  }
  return userAuthResult(user);
}
__name(authenticateAdminUser, "authenticateAdminUser");
async function listAdminUsers(readUsers) {
  const record = await readUsers();
  return record.users.map(sanitizeUserForClient).sort((a, b) => a.email.localeCompare(b.email));
}
__name(listAdminUsers, "listAdminUsers");
async function createAdminUser({ email, password, role }, readUsers, writeUsers) {
  const record = await readUsers();
  const created = await createUserInRecord(record, { email, password, role });
  if (!created.ok) return created;
  const write = await writeUsers(record);
  if (!write.ok) return write;
  return { ok: true, user: sanitizeUserForClient(created.user) };
}
__name(createAdminUser, "createAdminUser");
async function updateAdminUser(userId, patch, readUsers, writeUsers, actor) {
  const record = await readUsers();
  const user = findUserById(record, userId);
  if (!user) return { ok: false, error: "Felhaszn\xE1l\xF3 nem tal\xE1lhat\xF3.", status: 404 };
  const nextActive = patch.active !== void 0 ? Boolean(patch.active) : user.active;
  const nextRole = patch.role !== void 0 ? patch.role : user.role;
  if (actor.role !== ADMIN_ROLES.FOADMIN) {
    return { ok: false, error: "Forbidden", status: 403 };
  }
  if (actor.id === userId && patch.role && patch.role !== user.role) {
    return { ok: false, error: "Saj\xE1t szerepk\xF6r m\xF3dos\xEDt\xE1sa nem enged\xE9lyezett.", status: 400 };
  }
  if (nextRole !== ADMIN_ROLES.FOADMIN && nextRole !== ADMIN_ROLES.ADMIN) {
    return { ok: false, error: "\xC9rv\xE9nytelen szerepk\xF6r.", status: 400 };
  }
  const wasActiveFoadmin = user.active && user.role === ADMIN_ROLES.FOADMIN;
  const willBeActiveFoadmin = nextActive && nextRole === ADMIN_ROLES.FOADMIN;
  if (wasActiveFoadmin && !willBeActiveFoadmin && countActiveFoadmins(record) <= 1) {
    return {
      ok: false,
      error: "Az utols\xF3 akt\xEDv F\u0151admin nem tilthat\xF3 le vagy vonhat\xF3 vissza.",
      status: 400
    };
  }
  user.active = nextActive;
  user.role = nextRole;
  user.updatedAt = nowIso();
  const write = await writeUsers(record);
  if (!write.ok) return write;
  return { ok: true, user: sanitizeUserForClient(user) };
}
__name(updateAdminUser, "updateAdminUser");
async function resetAdminUserPassword(userId, newPassword, readUsers, writeUsers, actor) {
  if (actor.role !== ADMIN_ROLES.FOADMIN) {
    return { ok: false, error: "Forbidden", status: 403 };
  }
  if (!newPassword || String(newPassword).length < 8) {
    return { ok: false, error: "A jelsz\xF3nak legal\xE1bb 8 karakter hossz\xFAnak kell lennie.", status: 400 };
  }
  const record = await readUsers();
  const user = findUserById(record, userId);
  if (!user) return { ok: false, error: "Felhaszn\xE1l\xF3 nem tal\xE1lhat\xF3.", status: 404 };
  user.passwordHash = await hashPassword(String(newPassword));
  user.updatedAt = nowIso();
  const write = await writeUsers(record);
  if (!write.ok) return write;
  return { ok: true };
}
__name(resetAdminUserPassword, "resetAdminUserPassword");
async function deleteAdminUser(userId, readUsers, writeUsers, actor) {
  if (actor.role !== ADMIN_ROLES.FOADMIN) {
    return { ok: false, error: "Forbidden", status: 403 };
  }
  const record = await readUsers();
  const user = findUserById(record, userId);
  if (!user) return { ok: false, error: "Felhaszn\xE1l\xF3 nem tal\xE1lhat\xF3.", status: 404 };
  if (user.active && user.role === ADMIN_ROLES.FOADMIN && countActiveFoadmins(record) <= 1) {
    return { ok: false, error: "Az utols\xF3 akt\xEDv F\u0151admin nem t\xF6r\xF6lhet\u0151.", status: 400 };
  }
  record.users = record.users.filter((u) => u.id !== userId);
  const write = await writeUsers(record);
  if (!write.ok) return write;
  return { ok: true };
}
__name(deleteAdminUser, "deleteAdminUser");

// functions/lib/http.js
function jsonResponse(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders
    }
  });
}
__name(jsonResponse, "jsonResponse");

// functions/api/admin/login.js
async function handleAdminLogin(request, env) {
  const secret = getAdminSecret(env);
  if (!secret || !isAdminAuthConfigured(env)) {
    return jsonResponse(
      {
        error: "Az admin bejelentkez\xE9s nincs konfigur\xE1lva. \xC1ll\xEDtsa be az ADMIN_JWT_SECRET \xE9rt\xE9ket, \xE9s a CMS_KV-t, valamint az ADMIN_BOOTSTRAP_* vagy legacy ADMIN_EMAIL/ADMIN_PASSWORD p\xE1rost."
      },
      503
    );
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "\xC9rv\xE9nytelen k\xE9r\xE9s." }, 400);
  }
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");
  if (!email || !password) {
    return jsonResponse({ error: "Email \xE9s jelsz\xF3 megad\xE1sa k\xF6telez\u0151." }, 400);
  }
  const user = await authenticateAdminUser(email, password, {
    env,
    readUsers: /* @__PURE__ */ __name(() => readAdminUsers(env), "readUsers"),
    writeUsers: /* @__PURE__ */ __name((record) => writeAdminUsers(env, record), "writeUsers")
  });
  if (!user) {
    return jsonResponse({ error: "Hib\xE1s email vagy jelsz\xF3." }, 401);
  }
  const ttlMs = ADMIN_SESSION_TTL_MS;
  const expiresAt = Date.now() + ttlMs;
  const accessToken = await signAdminToken(
    { sub: user.id, email: user.email, role: user.role },
    secret,
    ttlMs
  );
  return jsonResponse({
    accessToken,
    expiresAt,
    user: { id: user.id, email: user.email, role: user.role }
  });
}
__name(handleAdminLogin, "handleAdminLogin");

// functions/api/admin/logout.js
var CLEAR_COOKIE = "ravezeto_admin_jwt=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0";
async function handleAdminLogout(_request, _env) {
  return jsonResponse({ ok: true }, 200, {
    "Set-Cookie": CLEAR_COOKIE
  });
}
__name(handleAdminLogout, "handleAdminLogout");

// functions/lib/adminAccess.js
function getBearerToken(request) {
  const header = request.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}
__name(getBearerToken, "getBearerToken");
async function requireActiveAdmin(request, env) {
  const secret = getAdminSecret(env);
  if (!secret) {
    return { error: jsonResponse({ error: "Auth not configured" }, 503) };
  }
  const token = getBearerToken(request);
  if (!token) {
    return { error: jsonResponse({ error: "Unauthorized" }, 401) };
  }
  const payload = await verifyAdminToken(token, secret);
  if (!payload?.sub) {
    return { error: jsonResponse({ error: "Invalid or expired session" }, 401) };
  }
  const user = await resolveActiveUserById(payload.sub, () => readAdminUsers(env));
  if (!user) {
    return { error: jsonResponse({ error: "Unauthorized" }, 401) };
  }
  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    },
    payload
  };
}
__name(requireActiveAdmin, "requireActiveAdmin");
async function requireFoadmin(request, env) {
  const auth = await requireActiveAdmin(request, env);
  if (auth.error) return auth;
  if (auth.user.role !== ADMIN_ROLES.FOADMIN) {
    return { error: jsonResponse({ error: "Forbidden" }, 403) };
  }
  return auth;
}
__name(requireFoadmin, "requireFoadmin");

// functions/api/admin/session.js
async function handleAdminSession(request, env) {
  if (!getAdminSecret(env)) {
    return jsonResponse({ error: "Auth not configured" }, 503);
  }
  const auth = await requireActiveAdmin(request, env);
  if (auth.error) return auth.error;
  return jsonResponse({
    user: auth.user,
    expiresAt: auth.payload.exp
  });
}
__name(handleAdminSession, "handleAdminSession");

// functions/api/admin/users.js
function userStoreDeps(env) {
  return {
    readUsers: /* @__PURE__ */ __name(() => readAdminUsers(env), "readUsers"),
    writeUsers: /* @__PURE__ */ __name((record) => writeAdminUsers(env, record), "writeUsers")
  };
}
__name(userStoreDeps, "userStoreDeps");
async function handleAdminUsersList(request, env) {
  const auth = await requireFoadmin(request, env);
  if (auth.error) return auth.error;
  const users = await listAdminUsers(() => readAdminUsers(env));
  return jsonResponse({ users });
}
__name(handleAdminUsersList, "handleAdminUsersList");
async function handleAdminUsersCreate(request, env) {
  const auth = await requireFoadmin(request, env);
  if (auth.error) return auth.error;
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "\xC9rv\xE9nytelen k\xE9r\xE9s." }, 400);
  }
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");
  const role = body?.role === ADMIN_ROLES.FOADMIN ? ADMIN_ROLES.FOADMIN : ADMIN_ROLES.ADMIN;
  if (!email || !password) {
    return jsonResponse({ error: "Email \xE9s jelsz\xF3 megad\xE1sa k\xF6telez\u0151." }, 400);
  }
  const deps = userStoreDeps(env);
  const result = await createAdminUser({ email, password, role }, deps.readUsers, deps.writeUsers);
  if (!result.ok) {
    return jsonResponse({ error: result.error ?? "Nem siker\xFClt l\xE9trehozni." }, result.status ?? 400);
  }
  return jsonResponse({ user: result.user }, 201);
}
__name(handleAdminUsersCreate, "handleAdminUsersCreate");
async function handleAdminUsersPatch(request, env, userId) {
  const auth = await requireFoadmin(request, env);
  if (auth.error) return auth.error;
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "\xC9rv\xE9nytelen k\xE9r\xE9s." }, 400);
  }
  const patch = {};
  if (body?.active !== void 0) patch.active = Boolean(body.active);
  if (body?.role !== void 0) patch.role = body.role;
  const deps = userStoreDeps(env);
  const result = await updateAdminUser(userId, patch, deps.readUsers, deps.writeUsers, auth.user);
  if (!result.ok) {
    return jsonResponse({ error: result.error ?? "Nem siker\xFClt friss\xEDteni." }, result.status ?? 400);
  }
  return jsonResponse({ user: result.user });
}
__name(handleAdminUsersPatch, "handleAdminUsersPatch");
async function handleAdminUsersPassword(request, env, userId) {
  const auth = await requireFoadmin(request, env);
  if (auth.error) return auth.error;
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "\xC9rv\xE9nytelen k\xE9r\xE9s." }, 400);
  }
  const password = String(body?.password ?? "");
  const deps = userStoreDeps(env);
  const result = await resetAdminUserPassword(
    userId,
    password,
    deps.readUsers,
    deps.writeUsers,
    auth.user
  );
  if (!result.ok) {
    return jsonResponse({ error: result.error ?? "Nem siker\xFClt m\xF3dos\xEDtani." }, result.status ?? 400);
  }
  return jsonResponse({ ok: true });
}
__name(handleAdminUsersPassword, "handleAdminUsersPassword");
async function handleAdminUsersDelete(request, env, userId) {
  const auth = await requireFoadmin(request, env);
  if (auth.error) return auth.error;
  const deps = userStoreDeps(env);
  const result = await deleteAdminUser(userId, deps.readUsers, deps.writeUsers, auth.user);
  if (!result.ok) {
    return jsonResponse({ error: result.error ?? "Nem siker\xFClt t\xF6r\xF6lni." }, result.status ?? 400);
  }
  return jsonResponse({ ok: true });
}
__name(handleAdminUsersDelete, "handleAdminUsersDelete");
async function routeAdminUsers(request, env, path) {
  const match = path.match(/^\/api\/admin\/users(?:\/([^/]+))?(?:\/(password))?$/);
  if (!match) return null;
  const userId = match[1];
  const sub = match[2];
  if (!userId && request.method === "GET") {
    return handleAdminUsersList(request, env);
  }
  if (!userId && request.method === "POST") {
    return handleAdminUsersCreate(request, env);
  }
  if (userId && sub === "password" && request.method === "POST") {
    return handleAdminUsersPassword(request, env, userId);
  }
  if (userId && !sub && request.method === "PATCH") {
    return handleAdminUsersPatch(request, env, userId);
  }
  if (userId && !sub && request.method === "DELETE") {
    return handleAdminUsersDelete(request, env, userId);
  }
  return jsonResponse({ error: "Method not allowed" }, 405);
}
__name(routeAdminUsers, "routeAdminUsers");

// functions/lib/contactEmail.js
var CONTACT_TO = "info@ravezeto.hu";
var CONTACT_SUBJECT = "\xDAj kapcsolatfelv\xE9tel \u2013 R\xE1vezet\u0151 weboldal";
var DEFAULT_CONTACT_FROM = "R\xE1vezet\u0151 weboldal <weboldal@ravezeto.hu>";
function buildEmailText({ name, email, phone, message }) {
  const lines = [
    "\xDAj kapcsolatfelv\xE9teli \xFCzenet \xE9rkezett a R\xE1vezet\u0151 weboldalr\xF3l.",
    "",
    `N\xE9v: ${name}`,
    `E-mail: ${email}`
  ];
  if (phone) {
    lines.push(`Telefonsz\xE1m: ${phone}`);
  }
  lines.push("", "\xDCzenet:", message);
  return lines.join("\n");
}
__name(buildEmailText, "buildEmailText");
async function sendContactEmail(env, payload) {
  const apiKey = env?.RESEND_API_KEY?.trim();
  const from = (env?.CONTACT_FROM_EMAIL?.trim() || DEFAULT_CONTACT_FROM).trim();
  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error: "Az \u0171rlap jelenleg nincs konfigur\xE1lva. K\xE9rj\xFCk \xEDrjon k\xF6zvetlen\xFCl az info@ravezeto.hu c\xEDmre."
    };
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_TO],
      reply_to: payload.email,
      subject: CONTACT_SUBJECT,
      text: buildEmailText(payload)
    })
  });
  if (!response.ok) {
    let detail = "";
    try {
      const errBody = await response.json();
      if (errBody && typeof errBody.message === "string") {
        detail = errBody.message;
      }
    } catch {
    }
    console.error("[contact-email] Resend error", response.status, detail || response.statusText);
    return {
      ok: false,
      status: 502,
      error: "Hiba t\xF6rt\xE9nt. K\xE9rj\xFCk pr\xF3b\xE1lja \xFAjra k\xE9s\u0151bb."
    };
  }
  return { ok: true };
}
__name(sendContactEmail, "sendContactEmail");

// functions/lib/contactValidation.js
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var MAX_NAME = 200;
var MAX_EMAIL = 254;
var MAX_PHONE = 40;
var MAX_MESSAGE = 5e3;
function validateContactPayload(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "\xC9rv\xE9nytelen k\xE9r\xE9s." };
  }
  if (body.website) {
    return { ok: false, error: "\xC9rv\xE9nytelen k\xE9r\xE9s." };
  }
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (!name) {
    return { ok: false, error: "Ez a mez\u0151 k\xF6telez\u0151." };
  }
  if (name.length > MAX_NAME) {
    return { ok: false, error: "A n\xE9v t\xFAl hossz\xFA." };
  }
  if (!email) {
    return { ok: false, error: "Ez a mez\u0151 k\xF6telez\u0151." };
  }
  if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return { ok: false, error: "\xC9rv\xE9nytelen e-mail c\xEDm." };
  }
  if (phone.length > MAX_PHONE) {
    return { ok: false, error: "A telefonsz\xE1m t\xFAl hossz\xFA." };
  }
  if (!message) {
    return { ok: false, error: "Ez a mez\u0151 k\xF6telez\u0151." };
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: "Az \xFCzenet t\xFAl hossz\xFA." };
  }
  return {
    ok: true,
    data: { name, email, phone: phone || void 0, message }
  };
}
__name(validateContactPayload, "validateContactPayload");
function readOrigin(headers) {
  if (typeof headers.get === "function") {
    return headers.get("Origin");
  }
  return headers.origin ?? headers.Origin ?? null;
}
__name(readOrigin, "readOrigin");
function isSameOriginRequest(request) {
  const origin = readOrigin(request.headers);
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
__name(isSameOriginRequest, "isSameOriginRequest");

// functions/api/contact.js
async function handleContactSubmit(request, env) {
  if (!isSameOriginRequest(request)) {
    return jsonResponse({ error: "Forbidden" }, 403);
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "\xC9rv\xE9nytelen k\xE9r\xE9s." }, 400);
  }
  const validation = validateContactPayload(body);
  if (!validation.ok) {
    return jsonResponse({ error: validation.error }, 400);
  }
  const result = await sendContactEmail(env, validation.data);
  if (!result.ok) {
    return jsonResponse({ error: result.error }, result.status);
  }
  return jsonResponse({ ok: true });
}
__name(handleContactSubmit, "handleContactSubmit");

// functions/lib/cmsStorage.js
var CMS_KV_KEY = "cms:state";
function buildPublishedPayload(state, buildRef = "live") {
  return {
    schemaVersion: state.published?.schemaVersion ?? 2,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    buildRef,
    defaultsRevision: state.meta?.defaultsRevision ?? 0,
    published: state.published
  };
}
__name(buildPublishedPayload, "buildPublishedPayload");
async function readCmsState(env) {
  if (env?.CMS_KV) {
    const raw = await env.CMS_KV.get(CMS_KV_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
  }
  return null;
}
__name(readCmsState, "readCmsState");
function buildCmsStateFromPublishedSnapshot(snapshot) {
  if (!snapshot?.published) return null;
  const published = snapshot.published;
  const generatedAt = snapshot.generatedAt ?? (/* @__PURE__ */ new Date()).toISOString();
  return {
    storageVersion: 5,
    draft: published,
    published,
    versions: [],
    activity: [],
    meta: {
      lastModified: generatedAt,
      lastPublished: generatedAt,
      hasUnpublishedChanges: false,
      publishedBuildRef: snapshot.buildRef ?? "live",
      defaultsRevision: snapshot.defaultsRevision ?? 0
    }
  };
}
__name(buildCmsStateFromPublishedSnapshot, "buildCmsStateFromPublishedSnapshot");
async function readOrInitializeCmsState(env) {
  const existing = await readCmsState(env);
  if (existing) return existing;
  const snapshot = await readPublishedFromAssets(env);
  const seeded = buildCmsStateFromPublishedSnapshot(snapshot);
  if (!seeded) return null;
  const write = await writeCmsState(env, seeded);
  if (!write.ok) return null;
  return seeded;
}
__name(readOrInitializeCmsState, "readOrInitializeCmsState");
async function writeCmsState(env, state) {
  if (!env?.CMS_KV) {
    return { ok: false, error: "CMS_KV binding is not configured on the Worker." };
  }
  await env.CMS_KV.put(CMS_KV_KEY, JSON.stringify(state));
  return { ok: true };
}
__name(writeCmsState, "writeCmsState");
async function readPublishedFromAssets(env) {
  if (!env?.ASSETS) return null;
  try {
    const response = await env.ASSETS.fetch(new URL("https://cms.local/cms/published.json"));
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
__name(readPublishedFromAssets, "readPublishedFromAssets");

// functions/api/cms/handlers.js
async function requireAdmin(request, env) {
  return requireActiveAdmin(request, env);
}
__name(requireAdmin, "requireAdmin");
async function handleCmsPublishedGet(_request, env) {
  const fromKv = await readCmsState(env);
  if (fromKv?.published) {
    return jsonResponse(buildPublishedPayload(fromKv, fromKv.meta?.publishedBuildRef ?? "live"));
  }
  const fromAssets = await readPublishedFromAssets(env);
  if (fromAssets) {
    return jsonResponse(fromAssets);
  }
  return jsonResponse({ error: "Published CMS snapshot not found" }, 404);
}
__name(handleCmsPublishedGet, "handleCmsPublishedGet");
async function handleCmsStateGet(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;
  const state = await readOrInitializeCmsState(env);
  if (!state) {
    return jsonResponse({ error: "CMS state not initialized on server" }, 404);
  }
  return jsonResponse({ state });
}
__name(handleCmsStateGet, "handleCmsStateGet");
async function handleCmsStatePut(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }
  if (!body?.state || typeof body.state !== "object") {
    return jsonResponse({ error: "Missing state object" }, 400);
  }
  const result = await writeCmsState(env, body.state);
  if (!result.ok) {
    return jsonResponse({ error: result.error }, 503);
  }
  return jsonResponse({ ok: true });
}
__name(handleCmsStatePut, "handleCmsStatePut");
async function handleCmsPublishPost(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }
  if (!body?.state || typeof body.state !== "object") {
    return jsonResponse({ error: "Missing state object" }, 400);
  }
  const state = body.state;
  const result = await writeCmsState(env, state);
  if (!result.ok) {
    return jsonResponse({ error: result.error }, 503);
  }
  return jsonResponse({
    ok: true,
    published: buildPublishedPayload(state, state.meta?.publishedBuildRef ?? "live")
  });
}
__name(handleCmsPublishPost, "handleCmsPublishPost");
var UPLOAD_MAX_BYTES = 2 * 1024 * 1024;
var UPLOAD_ALLOWED = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg"
};
async function handleCmsUploadPost(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;
  if (!env?.CMS_UPLOADS) {
    return jsonResponse(
      { error: "CMS uploads storage (R2) is not configured on the Worker." },
      503
    );
  }
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: "Invalid multipart body" }, 400);
  }
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return jsonResponse({ error: "Missing file upload" }, 400);
  }
  const mime = file.type || "application/octet-stream";
  const ext = UPLOAD_ALLOWED[mime];
  if (!ext) {
    return jsonResponse({ error: "Unsupported image type" }, 400);
  }
  const bytes = await file.arrayBuffer();
  if (bytes.byteLength > UPLOAD_MAX_BYTES) {
    return jsonResponse({ error: "File too large" }, 400);
  }
  const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  const rand = crypto.getRandomValues(new Uint8Array(4));
  const hex = [...rand].map((b) => b.toString(16).padStart(2, "0")).join("");
  const name = `cms-${stamp}-${hex}.${ext}`;
  const key = `uploads/cms/${name}`;
  await env.CMS_UPLOADS.put(key, bytes, {
    httpMetadata: { contentType: mime }
  });
  return jsonResponse({ url: `/assets/uploads/cms/${name}` });
}
__name(handleCmsUploadPost, "handleCmsUploadPost");
async function handleCmsUploadAssetGet(request, env, path) {
  if (!env?.CMS_UPLOADS) return null;
  const prefix = "/assets/uploads/cms/";
  if (!path.startsWith(prefix)) return null;
  const fileName = path.slice(prefix.length);
  if (!fileName || fileName.includes("..") || fileName.includes("/")) return null;
  const object = await env.CMS_UPLOADS.get(`uploads/cms/${fileName}`);
  if (!object) return null;
  const headers = new Headers();
  headers.set(
    "Content-Type",
    object.httpMetadata?.contentType || "application/octet-stream"
  );
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  return new Response(object.body, { status: 200, headers });
}
__name(handleCmsUploadAssetGet, "handleCmsUploadAssetGet");

// functions/lib/routing.js
var GONE_PATHS = /* @__PURE__ */ new Set([
  "/teszt",
  "/csr",
  "/70-uk-gambling-dens-not-on-gamstop-best-web-sites-of-july-2025",
  "/uk-non-gamstop-bookmakers",
  "/best-non-gamstop-casinos-in-typically-the-uk-2025",
  "/online-casino-transaction-methods-deposit-options-2025",
  "/category/egyeb",
  "/category/palyazat",
  "/category/munkatarsak",
  "/category/referenciak",
  "/author/papajcsikaron",
  "/api/gone",
  "/gone"
]);
function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}
__name(normalizePath, "normalizePath");
var GONE_HTML = `<!doctype html>
<html lang="hu">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex, nofollow" />
  <title>410 \u2013 Az oldal m\xE1r nem el\xE9rhet\u0151</title>
</head>
<body>
  <h1>410 \u2013 Az oldal m\xE1r nem el\xE9rhet\u0151</h1>
  <p>Ez az URL v\xE9glegesen megsz\u0171nt.</p>
  <p><a href="/">Vissza a f\u0151oldalra</a></p>
</body>
</html>`;
function goneResponse() {
  return new Response(GONE_HTML, {
    status: 410,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=86400"
    }
  });
}
__name(goneResponse, "goneResponse");

// worker/index.js
var worker_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = normalizePath(url.pathname);
    if (request.method === "GET" && url.pathname.length > 1 && url.pathname.endsWith("/") && !url.pathname.startsWith("/api/") && !url.pathname.startsWith("/assets/")) {
      const redirectUrl = new URL(request.url);
      redirectUrl.pathname = url.pathname.slice(0, -1);
      redirectUrl.search = url.search;
      return new Response(null, {
        status: 301,
        headers: {
          Location: redirectUrl.toString(),
          "Cache-Control": "no-store"
        }
      });
    }
    if (GONE_PATHS.has(path)) {
      return goneResponse();
    }
    if (path === "/api/admin/login" && request.method === "POST") {
      return handleAdminLogin(request, env);
    }
    if (path === "/api/admin/session" && request.method === "GET") {
      return handleAdminSession(request, env);
    }
    if (path === "/api/admin/logout" && request.method === "POST") {
      return handleAdminLogout(request, env);
    }
    if (path.startsWith("/api/admin/users")) {
      const usersResponse = await routeAdminUsers(request, env, path);
      if (usersResponse) return usersResponse;
    }
    if ((path === "/api/contact" || path === "/api/contact-submit.php") && request.method === "POST") {
      return handleContactSubmit(request, env);
    }
    if (path === "/api/cms/published" && request.method === "GET") {
      return handleCmsPublishedGet(request, env);
    }
    if (path === "/api/cms/state" && request.method === "GET") {
      return handleCmsStateGet(request, env);
    }
    if (path === "/api/cms/state" && (request.method === "PUT" || request.method === "POST")) {
      return handleCmsStatePut(request, env);
    }
    if (path === "/api/cms/publish" && request.method === "POST") {
      return handleCmsPublishPost(request, env);
    }
    if (path === "/api/cms/upload" && request.method === "POST") {
      return handleCmsUploadPost(request, env);
    }
    if (request.method === "GET" && path.startsWith("/assets/uploads/cms/")) {
      const fromR2 = await handleCmsUploadAssetGet(request, env, path);
      if (fromR2) return fromR2;
    }
    return env.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    const body = JSON.stringify(error);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-rYOad3/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = worker_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-rYOad3/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  scheduledTime;
  cron;
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
