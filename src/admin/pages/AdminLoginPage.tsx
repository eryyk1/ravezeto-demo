import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage() {
  const { login, session, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? '/admin/dashboard';
  const safeRedirect =
    redirectTo === '/admin' || redirectTo === '/admin/' ? '/admin/dashboard' : redirectTo;

  if (!loading && session) {
    return <Navigate to={safeRedirect} replace />;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const message = await login(email.trim(), password);
    if (message) {
      setError(message);
    } else {
      navigate(safeRedirect, { replace: true });
    }
    setSubmitting(false);
  }

  return (
    <div className="admin-login">
      <div className="admin-login__bg" aria-hidden="true">
        <div className="admin-login__grid" />
        <div className="admin-login__glow admin-login__glow--1" />
        <div className="admin-login__glow admin-login__glow--2" />
      </div>

      <div className="admin-login__layout">
        <div className="admin-login__hero">
          <div className="admin-login__hero-mark">R</div>
          <h1>Rávezető</h1>
          <p>Tartalomkezelő rendszer a weboldal szerkesztéséhez.</p>
        </div>

        <form className="admin-login__card" onSubmit={handleSubmit}>
          <div className="admin-login__card-head">
            <strong>Admin belépés</strong>
            <span>Jelentkezzen be a folytatáshoz</span>
          </div>

          <label className="admin-field">
            <span className="admin-field__label">Email cím</span>
            <input
              className="admin-input"
              type="email"
              autoComplete="username"
              placeholder="pelda@ravezeto.hu"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="admin-field">
            <span className="admin-field__label">Jelszó</span>
            <input
              className="admin-input"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error ? (
            <div className="admin-login__error" role="alert">
              {error}
            </div>
          ) : null}

          <button
            className="admin-btn admin-btn--primary admin-btn--block"
            type="submit"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="admin-btn__spinner" aria-hidden="true" />
                Bejelentkezés…
              </>
            ) : (
              'Bejelentkezés'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
