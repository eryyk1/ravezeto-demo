import {
  getAdminSecret,
  signAdminToken,
  validateAdminCredentials,
} from '../lib/adminAuth.js';
import { ADMIN_SESSION_TTL_MS } from '../lib/sessionConfig.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secret = getAdminSecret();
  if (!secret) {
    res.status(503).json({
      error:
        'Az admin bejelentkezés nincs konfigurálva. Állítsa be az ADMIN_EMAIL, ADMIN_PASSWORD és ADMIN_JWT_SECRET változókat.',
    });
    return;
  }

  const email = String(req.body?.email ?? '').trim();
  const password = String(req.body?.password ?? '');

  if (!email || !password) {
    res.status(400).json({ error: 'Email és jelszó megadása kötelező.' });
    return;
  }

  if (!validateAdminCredentials(email, password)) {
    res.status(401).json({ error: 'Hibás email vagy jelszó.' });
    return;
  }

  const ttlMs = ADMIN_SESSION_TTL_MS;
  const expiresAt = Date.now() + ttlMs;
  const accessToken = signAdminToken({ sub: 'admin', email }, secret, ttlMs);

  res.status(200).json({
    accessToken,
    expiresAt,
    user: { id: 'admin', email },
  });
}
