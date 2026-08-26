import { createHmac, timingSafeEqual } from 'crypto';
import { ADMIN_SESSION_TTL_MS } from './sessionConfig.js';

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(value) {
  const padded = value + '='.repeat((4 - (value.length % 4)) % 4);
  return Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
}

export function signAdminToken(payload, secret, ttlMs = ADMIN_SESSION_TTL_MS) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(
    JSON.stringify({
      ...payload,
      exp: Date.now() + ttlMs,
    }),
  );
  const signature = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

export function verifyAdminToken(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expected = createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');

  try {
    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;
  } catch {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(body));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getAdminSecret() {
  return process.env.ADMIN_JWT_SECRET ?? null;
}

/**
 * Authenticate against configured admin accounts (primary + optional client).
 * Returns { id, email } on success, null on failure.
 */
export function authenticateAdminUser(email, password) {
  const normalizedEmail = String(email ?? '').trim();
  const normalizedPassword = String(password ?? '');

  const primaryEmail = process.env.ADMIN_EMAIL;
  const primaryPassword = process.env.ADMIN_PASSWORD;
  if (
    primaryEmail &&
    primaryPassword &&
    normalizedEmail === primaryEmail &&
    normalizedPassword === primaryPassword
  ) {
    return { id: 'admin', email: primaryEmail };
  }

  const clientEmail = process.env.CLIENT_ADMIN_EMAIL;
  const clientPassword = process.env.CLIENT_ADMIN_PASSWORD;
  if (
    clientEmail &&
    clientPassword &&
    normalizedEmail === clientEmail &&
    normalizedPassword === clientPassword
  ) {
    return { id: 'client-admin', email: clientEmail };
  }

  return null;
}

/** @deprecated Use authenticateAdminUser — kept for callers expecting a boolean */
export function validateAdminCredentials(email, password) {
  return authenticateAdminUser(email, password) !== null;
}

export function isPrimaryAdminConfigured() {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && getAdminSecret());
}
