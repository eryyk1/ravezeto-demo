import { getAccessToken } from './sessionStorage';
import type { AdminRole } from './types';

export type AdminUserRecord = {
  id: string;
  email: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

async function parseJson(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function authHeaders(): HeadersInit {
  const token = getAccessToken();
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function readError(payload: Record<string, unknown>, fallback: string): string {
  return typeof payload.error === 'string' && payload.error.trim() ? payload.error : fallback;
}

export async function fetchAdminUsers(): Promise<
  { ok: true; users: AdminUserRecord[] } | { ok: false; error: string }
> {
  const response = await fetch('/api/admin/users', { headers: authHeaders() });
  const payload = await parseJson(response);
  if (!response.ok) {
    return { ok: false, error: readError(payload, 'Nem sikerült betölteni a felhasználókat.') };
  }
  const users = payload.users as AdminUserRecord[] | undefined;
  if (!Array.isArray(users)) return { ok: false, error: 'Érvénytelen szerver válasz.' };
  return { ok: true, users };
}

export async function createAdminUser(input: {
  email: string;
  password: string;
  role: AdminRole;
}): Promise<{ ok: true; user: AdminUserRecord } | { ok: false; error: string }> {
  const response = await fetch('/api/admin/users', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(input),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    return { ok: false, error: readError(payload, 'Nem sikerült létrehozni a felhasználót.') };
  }
  const user = payload.user as AdminUserRecord | undefined;
  if (!user?.id) return { ok: false, error: 'Érvénytelen szerver válasz.' };
  return { ok: true, user };
}

export async function patchAdminUser(
  id: string,
  patch: { active?: boolean; role?: AdminRole },
): Promise<{ ok: true; user: AdminUserRecord } | { ok: false; error: string }> {
  const response = await fetch(`/api/admin/users/${id}`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify(patch),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    return { ok: false, error: readError(payload, 'Nem sikerült frissíteni a felhasználót.') };
  }
  const user = payload.user as AdminUserRecord | undefined;
  if (!user?.id) return { ok: false, error: 'Érvénytelen szerver válasz.' };
  return { ok: true, user };
}

export async function resetAdminUserPassword(
  id: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const response = await fetch(`/api/admin/users/${id}/password`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ password }),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    return { ok: false, error: readError(payload, 'Nem sikerült módosítani a jelszót.') };
  }
  return { ok: true };
}

export async function deleteAdminUser(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const response = await fetch(`/api/admin/users/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    return { ok: false, error: readError(payload, 'Nem sikerült törölni a felhasználót.') };
  }
  return { ok: true };
}
