/**
 * PBKDF2-HMAC-SHA256 password hashes for admin users (Web Crypto — Workers + Node).
 *
 * Stored format (versioned by iteration count in segment 2):
 *   pbkdf2-sha256$<iterations>$<salt-b64url>$<hash-b64url>
 *
 * - New hashes use PBKDF2_ITERATIONS_DEFAULT (tuned for Cloudflare Worker CPU limits).
 * - Legacy 600_000-iteration hashes (OWASP server-side profile) remain verifiable.
 * - After a successful login, legacy/high-iteration hashes are re-hashed at DEFAULT.
 */
export const PBKDF2_ITERATIONS_DEFAULT = 100_000;
/** @deprecated Verify-only; new passwords use PBKDF2_ITERATIONS_DEFAULT */
export const PBKDF2_ITERATIONS_LEGACY = 600_000;
/** Reject unknown / weak parameter sets */
export const PBKDF2_ITERATIONS_MIN = 100_000;

const SALT_BYTES = 16;
const KEY_BITS = 256;

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
  return bytes;
}

export function parsePasswordHash(stored) {
  if (typeof stored !== 'string' || !stored.startsWith('pbkdf2-sha256$')) return null;
  const parts = stored.split('$');
  if (parts.length !== 4) return null;
  const iterations = Number(parts[1]);
  if (!Number.isFinite(iterations) || iterations < PBKDF2_ITERATIONS_MIN) return null;
  return {
    algorithm: 'pbkdf2-sha256',
    iterations,
    saltB64: parts[2],
    hashB64: parts[3],
  };
}

/** True when the stored hash should be replaced after a successful password check. */
export function shouldUpgradePasswordHash(stored) {
  const parsed = parsePasswordHash(stored);
  if (!parsed) return false;
  return parsed.iterations !== PBKDF2_ITERATIONS_DEFAULT;
}

export async function hashPassword(plainPassword) {
  return hashPasswordWithIterations(plainPassword, PBKDF2_ITERATIONS_DEFAULT);
}

export async function hashPasswordWithIterations(plainPassword, iterations) {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const hash = await deriveKeyWithIterations(plainPassword, salt, iterations);
  return `pbkdf2-sha256$${iterations}$${base64UrlEncode(salt)}$${base64UrlEncode(hash)}`;
}

async function deriveKeyWithIterations(plainPassword, salt, iterations) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(plainPassword), 'PBKDF2', false, [
    'deriveBits',
  ]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    KEY_BITS,
  );
  return new Uint8Array(bits);
}

export async function verifyPassword(plainPassword, stored) {
  const parsed = parsePasswordHash(stored);
  if (!parsed) return false;

  const salt = base64UrlDecode(parsed.saltB64);
  const expected = base64UrlDecode(parsed.hashB64);
  const actual = await deriveKeyWithIterations(plainPassword, salt, parsed.iterations);
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i += 1) diff |= actual[i] ^ expected[i];
  return diff === 0;
}
