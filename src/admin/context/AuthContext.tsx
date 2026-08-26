import { useEffect, useState } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth/authService';
import type { AuthSession } from '../../services/auth/types';

type AuthContextValue = {
  session: AuthSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    authService.getSession().then((next: AuthSession | null) => {
      if (active) {
        setSession(next);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setSession(null);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!session) return;

    const expireIfNeeded = () => {
      if (Date.now() >= session.expiresAt) {
        void logout().then(() => {
          navigate('/admin/login', {
            replace: true,
            state: { expired: true },
          });
        });
      }
    };

    expireIfNeeded();
    const timer = window.setInterval(expireIfNeeded, 30_000);
    return () => window.clearInterval(timer);
  }, [session, logout, navigate]);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authService.login(email, password);
    if (!result.ok) return result.error;
    setSession(result.session);
    return null;
  }, []);

  const value = useMemo(
    () => ({ session, loading, login, logout }),
    [session, loading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
