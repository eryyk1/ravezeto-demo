import {
  authenticateAdminUser,
  getAdminSecret,
  signAdminToken,
} from '../../lib/adminAuth.js';
import { ADMIN_SESSION_TTL_MS } from '../../lib/sessionConfig.js';
import { jsonResponse } from '../../lib/http.js';

export async function handleAdminLogin(request, env) {
  const secret = getAdminSecret(env);

  if (!secret) {
    return jsonResponse(
      {
        error:
          'Az admin bejelentkezés nincs konfigurálva. Állítsa be az ADMIN_EMAIL, ADMIN_PASSWORD és ADMIN_JWT_SECRET változókat a Cloudflare Worker környezeti változóiban.',
      },
      503,
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Érvénytelen kérés.' }, 400);
  }

  const email = String(body?.email ?? '').trim();
  const password = String(body?.password ?? '');

  if (!email || !password) {
    return jsonResponse({ error: 'Email és jelszó megadása kötelező.' }, 400);
  }

  const user = authenticateAdminUser(email, password, env);
  if (!user) {
    return jsonResponse({ error: 'Hibás email vagy jelszó.' }, 401);
  }

  const ttlMs = ADMIN_SESSION_TTL_MS;
  const expiresAt = Date.now() + ttlMs;
  const accessToken = await signAdminToken({ sub: user.id, email: user.email }, secret, ttlMs);

  return jsonResponse({
    accessToken,
    expiresAt,
    user: { id: user.id, email: user.email },
  });
}

/** @deprecated Pages Functions entry — use handleAdminLogin via worker/index.js */
export async function onRequestPost(context) {
  return handleAdminLogin(context.request, context.env);
}
