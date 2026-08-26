export type AuthUser = {
  id: string;
  email: string;
};

export type AuthSession = {
  accessToken: string;
  expiresAt: number;
  user: AuthUser;
};

export type LoginResult =
  | { ok: true; session: AuthSession }
  | { ok: false; error: string };

export type AuthProvider = {
  login(email: string, password: string): Promise<LoginResult>;
  logout(): Promise<void>;
  getSession(): Promise<AuthSession | null>;
};
