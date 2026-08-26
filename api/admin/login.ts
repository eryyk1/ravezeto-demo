import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  getAdminSecret,
  signAdminToken,
  validateAdminCredentials,
} from '../lib/adminAuth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = getAdminSecret();
  if (!secret) {
    return res.status(503).json({
      error:
        'Az admin bejelentkezés nincs konfigurálva. Állítsa be az ADMIN_EMAIL, ADMIN_PASSWORD és ADMIN_JWT_SECRET változókat.',
    });
  }

  const email = String(req.body?.email ?? '').trim();
  const password = String(req.body?.password ?? '');

  if (!email || !password) {
    return res.status(400).json({ error: 'Email és jelszó megadása kötelező.' });
  }

  if (!validateAdminCredentials(email, password)) {
    return res.status(401).json({ error: 'Hibás email vagy jelszó.' });
  }

  const ttlMs = 8 * 60 * 60 * 1000;
  const expiresAt = Date.now() + ttlMs;
  const accessToken = signAdminToken({ sub: 'admin', email }, secret, ttlMs);

  return res.status(200).json({
    accessToken,
    expiresAt,
    user: { id: 'admin', email },
  });
}
