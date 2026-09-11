import { getAdminSecret, verifyAdminToken } from '../../lib/adminAuth.js';
import { jsonResponse } from '../../lib/http.js';

function getBearerToken(request) {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7);
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const secret = getAdminSecret(env);

  if (!secret) {
    return jsonResponse({ error: 'Auth not configured' }, 503);
  }

  const token = getBearerToken(request);
  if (!token) {
    return jsonResponse({ error: 'Unauthorized' }, 401);
  }

  const payload = await verifyAdminToken(token, secret);
  if (!payload) {
    return jsonResponse({ error: 'Invalid or expired session' }, 401);
  }

  return jsonResponse({
    user: { id: payload.sub, email: payload.email },
    expiresAt: payload.exp,
  });
}
