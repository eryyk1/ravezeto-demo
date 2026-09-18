import { getAccessToken } from '../auth/sessionStorage';
import type { CmsState } from './types';

export type CmsPublishedFile = {
  schemaVersion: number;
  generatedAt: string;
  buildRef: string;
  defaultsRevision: number;
  published: CmsState['published'];
};

export type CmsApiError = {
  ok: false;
  status: number;
  message: string;
};

export type CmsApiOk<T> = { ok: true; data: T };

async function parseJson(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function readError(payload: Record<string, unknown>, fallback: string): string {
  return typeof payload.error === 'string' && payload.error.trim() ? payload.error : fallback;
}

function authHeaders(): HeadersInit {
  const token = getAccessToken();
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function fetchPublishedSnapshot(): Promise<
  CmsApiOk<CmsPublishedFile> | CmsApiError
> {
  try {
    const response = await fetch('/api/cms/published', { cache: 'no-store' });
    const payload = await parseJson(response);
    if (!response.ok) {
      const fallback =
        response.status === 404
          ? 'Nincs szerveren publikált CMS pillanatkép — a build alapértelmezés érvényes.'
          : 'A publikált tartalom betöltése sikertelen.';
      return { ok: false, status: response.status, message: readError(payload, fallback) };
    }
    return { ok: true, data: payload as unknown as CmsPublishedFile };
  } catch {
    return { ok: false, status: 0, message: 'Nem sikerült csatlakozni a CMS API-hoz.' };
  }
}

export async function fetchAdminCmsState(): Promise<CmsApiOk<{ state: CmsState }> | CmsApiError> {
  try {
    const response = await fetch('/api/cms/state', { headers: authHeaders(), cache: 'no-store' });
    const payload = await parseJson(response);
    if (!response.ok) {
      const fallback =
        response.status === 404
          ? 'A szerveren még nincs CMS állapot. Publikáljon egyszer, vagy importálja a state fájlt.'
          : response.status === 401
            ? 'Nincs érvényes admin munkamenet.'
            : 'Az admin CMS állapot betöltése sikertelen.';
      return { ok: false, status: response.status, message: readError(payload, fallback) };
    }
    const state = payload.state as CmsState | undefined;
    if (!state) {
      return { ok: false, status: 500, message: 'Érvénytelen CMS válasz a szervertől.' };
    }
    return { ok: true, data: { state } };
  } catch {
    return { ok: false, status: 0, message: 'Nem sikerült csatlakozni a CMS API-hoz.' };
  }
}

export async function saveAdminCmsState(state: CmsState): Promise<CmsApiOk<{ ok: true }> | CmsApiError> {
  try {
    const response = await fetch('/api/cms/state', {
      method: 'PUT',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    });
    const payload = await parseJson(response);
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: readError(payload, 'A piszkozat mentése a szerverre sikertelen.'),
      };
    }
    return { ok: true, data: { ok: true } };
  } catch {
    return { ok: false, status: 0, message: 'Nem sikerült csatlakozni a CMS API-hoz.' };
  }
}

export async function publishCmsState(
  state: CmsState,
): Promise<CmsApiOk<{ published: CmsPublishedFile }> | CmsApiError> {
  try {
    const response = await fetch('/api/cms/publish', {
      method: 'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    });
    const payload = await parseJson(response);
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: readError(payload, 'A publikálás a szerverre sikertelen.'),
      };
    }
    const published = payload.published as CmsPublishedFile | undefined;
    if (!published?.published) {
      return { ok: false, status: 500, message: 'Érvénytelen publikálási válasz a szervertől.' };
    }
    return { ok: true, data: { published } };
  } catch {
    return { ok: false, status: 0, message: 'Nem sikerült csatlakozni a CMS API-hoz.' };
  }
}

export async function uploadCmsImage(file: File): Promise<CmsApiOk<{ url: string }> | CmsApiError> {
  const form = new FormData();
  form.append('file', file);
  try {
    const response = await fetch('/api/cms/upload', {
      method: 'POST',
      headers: authHeaders(),
      body: form,
    });
    const payload = await parseJson(response);
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: readError(payload, 'A kép feltöltése sikertelen.'),
      };
    }
    const url = payload.url;
    if (typeof url !== 'string' || !url.startsWith('/')) {
      return { ok: false, status: 500, message: 'Érvénytelen feltöltési válasz.' };
    }
    return { ok: true, data: { url } };
  } catch {
    return { ok: false, status: 0, message: 'Nem sikerült csatlakozni a feltöltési API-hoz.' };
  }
}
