import { requireActiveAdmin } from '../../lib/adminAccess.js';
import { getAdminSecret } from '../../lib/adminAuth.js';
import { jsonResponse } from '../../lib/http.js';

export async function handleAdminSession(request, env) {
  if (!getAdminSecret(env)) {
    return jsonResponse({ error: 'Auth not configured' }, 503);
  }

  const auth = await requireActiveAdmin(request, env);
  if (auth.error) return auth.error;

  return jsonResponse({
    user: auth.user,
    expiresAt: auth.payload.exp,
  });
}

/** @deprecated Pages Functions entry — use handleAdminSession via worker/index.js */
export async function onRequestGet(context) {
  return handleAdminSession(context.request, context.env);
}
