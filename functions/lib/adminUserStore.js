/** Dedicated KV key — separate from cms:state */
export const ADMIN_USERS_KV_KEY = 'admin:users:v1';

export const ADMIN_ROLES = {
  FOADMIN: 'foadmin',
  ADMIN: 'admin',
};

export function emptyAdminUsersRecord() {
  return { version: 1, users: [] };
}

export function normalizeEmail(email) {
  return String(email ?? '')
    .trim()
    .toLowerCase();
}

export async function readAdminUsers(env) {
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

export async function writeAdminUsers(env, record) {
  if (!env?.CMS_KV) {
    return { ok: false, error: 'CMS_KV binding is not configured on the Worker.' };
  }
  await env.CMS_KV.put(ADMIN_USERS_KV_KEY, JSON.stringify(record));
  return { ok: true };
}

export function sanitizeUserForClient(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    active: user.active,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function countActiveFoadmins(record) {
  return record.users.filter((u) => u.active && u.role === ADMIN_ROLES.FOADMIN).length;
}

export function findUserByEmail(record, email) {
  const normalized = normalizeEmail(email);
  return record.users.find((u) => normalizeEmail(u.email) === normalized) ?? null;
}

export function findUserById(record, id) {
  return record.users.find((u) => u.id === id) ?? null;
}

export async function resolveActiveUserById(userId, readUsers) {
  const record = await readUsers();
  const user = findUserById(record, userId);
  if (!user || !user.active) return null;
  return user;
}
