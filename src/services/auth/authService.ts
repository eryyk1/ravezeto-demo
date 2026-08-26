import {
  clearSession,
  getAccessToken,
  loadSession,
  saveSession,
} from './sessionStorage';
import type { AuthProvider, AuthSession, LoginResult } from './types';

async function apiLogin(email: string, password: string): Promise<LoginResult> {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const payload = (await response.json()) as {
    accessToken?: string;
    expiresAt?: number;
    user?: { id: string; email: string };
    error?: string;
  };

  if (!response.ok) {
    return { ok: false, error: payload.error ?? 'Bejelentkezés sikertelen.' };
  }

  if (!payload.accessToken || !payload.user || !payload.expiresAt) {
    return { ok: false, error: 'Érvénytelen szerver válasz.' };
  }

  const session: AuthSession = {
    accessToken: payload.accessToken,
    expiresAt: payload.expiresAt,
    user: payload.user,
  };

  saveSession(session);
  return { ok: true, session };
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
    const payload = (await response.json()) as {
      user?: { id: string; email: string };
      expiresAt?: number;
    };
    if (!payload.user || !payload.expiresAt) {
      clearSession();
      return null;
    }
    const session: AuthSession = {
      accessToken: token,
      expiresAt: payload.expiresAt,
      user: payload.user,
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
