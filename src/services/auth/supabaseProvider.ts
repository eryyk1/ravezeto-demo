import { createClient } from '@supabase/supabase-js';
import type { AuthProvider, AuthSession, LoginResult } from './types';
import { clearSession, loadSession, saveSession } from './sessionStorage';

export function createSupabaseAuthProvider(url: string, anonKey: string): AuthProvider {
  const supabase = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      storageKey: 'ravezeto_supabase_auth',
    },
  });

  return {
    async login(email: string, password: string): Promise<LoginResult> {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.session || !data.user) {
        return { ok: false, error: error?.message ?? 'Bejelentkezés sikertelen.' };
      }

      const session: AuthSession = {
        accessToken: data.session.access_token,
        expiresAt: (data.session.expires_at ?? 0) * 1000,
        user: { id: data.user.id, email: data.user.email ?? email },
      };
      saveSession(session);
      return { ok: true, session };
    },

    async logout() {
      await supabase.auth.signOut();
      clearSession();
    },

    async getSession() {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        clearSession();
        return null;
      }

      const cached = loadSession();
      const session: AuthSession = {
        accessToken: data.session.access_token,
        expiresAt: (data.session.expires_at ?? 0) * 1000,
        user: {
          id: data.session.user.id,
          email: data.session.user.email ?? cached?.user.email ?? '',
        },
      };
      saveSession(session);
      return session;
    },
  };
}
