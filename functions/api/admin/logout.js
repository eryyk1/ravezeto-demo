import { jsonResponse } from '../../lib/http.js';

const CLEAR_COOKIE =
  'ravezeto_admin_jwt=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';

export async function handleAdminLogout(_request, _env) {
  return jsonResponse({ ok: true }, 200, {
    'Set-Cookie': CLEAR_COOKIE,
  });
}
