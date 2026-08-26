import { getAdminSecret, verifyAdminToken } from '../lib/adminAuth.js';

function getBearerToken(req) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const secret = getAdminSecret();
  if (!secret) {
    res.status(503).json({ error: 'Auth not configured' });
    return;
  }

  const token = getBearerToken(req);
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const payload = verifyAdminToken(token, secret);
  if (!payload) {
    res.status(401).json({ error: 'Invalid or expired session' });
    return;
  }

  res.status(200).json({
    user: { id: payload.sub, email: payload.email },
    expiresAt: payload.exp,
  });
}
