import fs from 'node:fs';
import path from 'node:path';
import {
  ADMIN_USERS_KV_KEY,
  ADMIN_ROLES,
  emptyAdminUsersRecord,
  normalizeEmail,
  sanitizeUserForClient,
  countActiveFoadmins,
  findUserByEmail,
  findUserById,
} from '../../functions/lib/adminUserStore.js';

export {
  ADMIN_USERS_KV_KEY,
  ADMIN_ROLES,
  emptyAdminUsersRecord,
  normalizeEmail,
  sanitizeUserForClient,
  countActiveFoadmins,
  findUserByEmail,
  findUserById,
};

export function adminUsersFile(rootDir) {
  return path.join(path.resolve(rootDir), 'data', 'cms', 'admin-users.json');
}

export async function readAdminUsersFromDisk(rootDir) {
  const file = adminUsersFile(rootDir);
  if (!fs.existsSync(file)) return emptyAdminUsersRecord();
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!parsed || !Array.isArray(parsed.users)) return emptyAdminUsersRecord();
    return { version: 1, users: parsed.users };
  } catch {
    return emptyAdminUsersRecord();
  }
}

export async function writeAdminUsersToDisk(rootDir, record) {
  const file = adminUsersFile(rootDir);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(record, null, 2)}\n`, 'utf8');
  return { ok: true };
}
