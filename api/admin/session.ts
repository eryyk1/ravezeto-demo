import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminSecret, verifyAdminToken } from '../lib/adminAuth';

function getBearerToken(req: VercelRequest): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = getAdminSecret();
  if (!secret) {
    return res.status(503).json({ error: 'Auth not configured' });
  }

  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const payload = verifyAdminToken(token, secret);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }

  return res.status(200).json({
    user: { id: payload.sub, email: payload.email },
    expiresAt: payload.exp,
  });
}
