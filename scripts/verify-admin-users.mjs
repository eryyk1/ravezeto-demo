/**
 * Local verification for multi-user admin auth (no secrets in repo).
 * Usage (PowerShell):
 *   $env:ADMIN_JWT_SECRET='...'
 *   $env:ADMIN_BOOTSTRAP_EMAIL='riz.adam@ravezeto.hu'
 *   $env:ADMIN_BOOTSTRAP_PASSWORD='...'
 *   node scripts/verify-admin-users.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { authenticateAdminUser, createAdminUser, ADMIN_ROLES } from '../functions/lib/adminUsersService.js';
import { readAdminUsersFromDisk, writeAdminUsersToDisk } from '../api/lib/adminUserStore.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const testFile = path.join(root, 'data', 'cms', 'admin-users.verify.json');

function deps() {
  return {
    env: process.env,
    readUsers: async () => {
      if (!fs.existsSync(testFile)) return { version: 1, users: [] };
      return JSON.parse(fs.readFileSync(testFile, 'utf8'));
    },
    writeUsers: async (record) => {
      fs.mkdirSync(path.dirname(testFile), { recursive: true });
      fs.writeFileSync(testFile, JSON.stringify(record, null, 2));
      return { ok: true };
    },
  };
}

async function main() {
  if (!process.env.ADMIN_JWT_SECRET || !process.env.ADMIN_BOOTSTRAP_PASSWORD) {
    console.error('Set ADMIN_JWT_SECRET and ADMIN_BOOTSTRAP_PASSWORD (and optionally ADMIN_BOOTSTRAP_EMAIL).');
    process.exit(1);
  }

  fs.rmSync(testFile, { force: true });
  const email = process.env.ADMIN_BOOTSTRAP_EMAIL ?? process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  const user = await authenticateAdminUser(email, password, deps());
  if (!user || user.role !== ADMIN_ROLES.FOADMIN) {
    console.error('Bootstrap login failed');
    process.exit(1);
  }
  console.log('OK bootstrap foadmin', user.email);

  const adminCreated = await createAdminUser(
    { email: 'test-admin@ravezeto.hu', password: 'testpass1234', role: ADMIN_ROLES.ADMIN },
    deps().readUsers,
    deps().writeUsers,
  );
  if (!adminCreated.ok) {
    console.error('Create admin failed', adminCreated.error);
    process.exit(1);
  }
  console.log('OK create admin');

  const adminLogin = await authenticateAdminUser('test-admin@ravezeto.hu', 'testpass1234', deps());
  if (!adminLogin || adminLogin.role !== ADMIN_ROLES.ADMIN) {
    console.error('Admin login failed');
    process.exit(1);
  }
  console.log('OK admin login');

  const stored = JSON.parse(fs.readFileSync(testFile, 'utf8'));
  if (stored.users.some((u) => u.passwordHash?.includes('testpass'))) {
    console.error('Plaintext password leaked into store');
    process.exit(1);
  }
  console.log('OK passwords hashed');

  fs.rmSync(testFile, { force: true });
  console.log('verify-admin-users: all checks passed');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
