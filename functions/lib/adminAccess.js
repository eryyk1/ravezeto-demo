import { getAdminSecret, verifyAdminToken } from './adminAuth.js';
import { ADMIN_ROLES, readAdminUsers, resolveActiveUserById } from './adminUserStore.js';
import { jsonResponse } from './http.js';

function getBearerToken(request) {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7);
}

export async function requireActiveAdmin(request, env) {
  const secret = getAdminSecret(env);
  if (!secret) {
    return { error: jsonResponse({ error: 'Auth not configured' }, 503) };
  }

  const token = getBearerToken(request);
  if (!token) {
    return { error: jsonResponse({ error: 'Unauthorized' }, 401) };
  }

  const payload = await verifyAdminToken(token, secret);
  if (!payload?.sub) {
    return { error: jsonResponse({ error: 'Invalid or expired session' }, 401) };
  }

  const user = await resolveActiveUserById(payload.sub, () => readAdminUsers(env));
  if (!user) {
    return { error: jsonResponse({ error: 'Unauthorized' }, 401) };
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    payload,
  };
}

export async function requireFoadmin(request, env) {
  const auth = await requireActiveAdmin(request, env);
  if (auth.error) return auth;
  if (auth.user.role !== ADMIN_ROLES.FOADMIN) {
    return { error: jsonResponse({ error: 'Forbidden' }, 403) };
  }
  return auth;
}
