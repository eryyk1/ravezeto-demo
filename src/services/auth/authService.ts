import {
  clearSession,
  getAccessToken,
  loadSession,
  saveSession,
} from './sessionStorage';
import type { AuthProvider, AuthSession, LoginResult } from './types';

async function parseJsonBody(response: Response): Promise<Record<string, unknown>> {
  const text = await response.text();
  if (!text) return {};

  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return {};
  }
}

function readError(payload: Record<string, unknown>, fallback: string): string {
  return typeof payload.error === 'string' && payload.error.trim()
    ? payload.error
    : fallback;
}

async function apiLogin(email: string, password: string): Promise<LoginResult> {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const payload = await parseJsonBody(response);

    if (!response.ok) {
      const fallback =
        response.status === 401
          ? 'Hibás email vagy jelszó.'
          : response.status === 503
            ? 'Az admin bejelentkezés nincs konfigurálva a szerveren.'
            : 'Bejelentkezés sikertelen.';
      return { ok: false, error: readError(payload, fallback) };
    }

    const accessToken = payload.accessToken;
    const expiresAt = payload.expiresAt;
    const user = payload.user as { id: string; email: string } | undefined;

    if (typeof accessToken !== 'string' || !user?.email || typeof expiresAt !== 'number') {
      return { ok: false, error: 'Érvénytelen szerver válasz.' };
    }

    const session: AuthSession = {
      accessToken,
      expiresAt,
      user,
    };

    saveSession(session);
    return { ok: true, session };
  } catch {
    return { ok: false, error: 'Nem sikerült csatlakozni a szerverhez. Próbálja újra.' };
  }
}

async function apiGetSession(): Promise<AuthSession | null> {
  const cached = loadSession();
  const token = getAccessToken();
  if (!token) return null;

  try {
    const response = await fetch('/api/admin/session', {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });

    if (!response.ok) {
      clearSession();
      return null;
    }

    const payload = await parseJsonBody(response);
    const user = payload.user as { id: string; email: string } | undefined;
    const expiresAt = payload.expiresAt;

    if (!user?.email || typeof expiresAt !== 'number') {
      clearSession();
      return null;
    }

    const session: AuthSession = {
      accessToken: token,
      expiresAt,
      user,
    };
    saveSession(session);
    return session;
  } catch {
    return cached;
  }
}

const apiAuthProvider: AuthProvider = {
  login: apiLogin,
  logout: async () => {
    clearSession();
  },
  getSession: apiGetSession,
};

let supabaseProvider: AuthProvider | null = null;

async function getSupabaseProvider(): Promise<AuthProvider | null> {
  if (supabaseProvider) return supabaseProvider;
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const { createSupabaseAuthProvider } = await import('./supabaseProvider');
  supabaseProvider = createSupabaseAuthProvider(url, anonKey);
  return supabaseProvider;
}

function resolveProvider(): AuthProvider | 'pending' {
  if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return 'pending';
  }
  return apiAuthProvider;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResult> {
    const provider = resolveProvider();
    if (provider === 'pending') {
      const supabase = await getSupabaseProvider();
      if (supabase) return supabase.login(email, password);
    }
    return apiAuthProvider.login(email, password);
  },

  async logout(): Promise<void> {
    const provider = resolveProvider();
    if (provider === 'pending') {
      const supabase = await getSupabaseProvider();
      if (supabase) {
        await supabase.logout();
        return;
      }
    }
    await apiAuthProvider.logout();
  },

  async getSession(): Promise<AuthSession | null> {
    const provider = resolveProvider();
    if (provider === 'pending') {
      const supabase = await getSupabaseProvider();
      if (supabase) return supabase.getSession();
    }
    return apiAuthProvider.getSession();
  },
};
