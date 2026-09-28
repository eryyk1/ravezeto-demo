import { verifyAdminToken, getAdminSecret } from './adminAuth.js';
import { readAdminUsersFromDisk } from './adminUserStore.js';
import { resolveActiveUserById, ADMIN_ROLES } from '../../functions/lib/adminUserStore.js';

export async function requireActiveAdmin(request, rootDir, env = process.env) {
  const secret = getAdminSecret();
  if (!secret) return { status: 503, body: { error: 'Auth not configured' } };

  const header = request.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return { status: 401, body: { error: 'Unauthorized' } };

  const payload = verifyAdminToken(token, secret);
  if (!payload?.sub) return { status: 401, body: { error: 'Invalid or expired session' } };

  const user = await resolveActiveUserById(payload.sub, () => readAdminUsersFromDisk(rootDir));
  if (!user) return { status: 401, body: { error: 'Unauthorized' } };

  return {
    user: { id: user.id, email: user.email, role: user.role },
    payload,
  };
}

export async function requireFoadmin(request, rootDir) {
  const auth = await requireActiveAdmin(request, rootDir);
  if (auth.status) return auth;
  if (auth.user.role !== ADMIN_ROLES.FOADMIN) {
    return { status: 403, body: { error: 'Forbidden' } };
  }
  return auth;
}
