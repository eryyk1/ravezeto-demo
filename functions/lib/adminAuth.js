import { ADMIN_SESSION_TTL_MS } from './sessionConfig.js';

function base64UrlEncode(bytes) {
  const bin = bytes instanceof Uint8Array ? bytes : new TextEncoder().encode(bytes);
  let binary = '';
  for (const byte of bin) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(value) {
  const padded = value + '='.repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmacSha256Base64Url(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return base64UrlEncode(new Uint8Array(signature));
}

export async function signAdminToken(payload, secret, ttlMs = ADMIN_SESSION_TTL_MS) {
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(
    JSON.stringify({
      ...payload,
      exp: Date.now() + ttlMs,
    }),
  );
  const signature = await hmacSha256Base64Url(secret, `${header}.${body}`);
  return `${header}.${body}.${signature}`;
}

export async function verifyAdminToken(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expected = await hmacSha256Base64Url(secret, `${header}.${body}`);

  if (!timingSafeEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(body));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getAdminSecret(env) {
  return env?.ADMIN_JWT_SECRET ?? null;
}

export function authenticateAdminUser(email, password, env) {
  const normalizedEmail = String(email ?? '').trim();
  const normalizedPassword = String(password ?? '');

  const primaryEmail = env?.ADMIN_EMAIL;
  const primaryPassword = env?.ADMIN_PASSWORD;
  if (
    primaryEmail &&
    primaryPassword &&
    normalizedEmail === primaryEmail &&
    normalizedPassword === primaryPassword
  ) {
    return { id: 'admin', email: primaryEmail };
  }

  const clientEmail = env?.CLIENT_ADMIN_EMAIL;
  const clientPassword = env?.CLIENT_ADMIN_PASSWORD;
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

export function isPrimaryAdminConfigured(env) {
  return Boolean(env?.ADMIN_EMAIL && env?.ADMIN_PASSWORD && getAdminSecret(env));
}
