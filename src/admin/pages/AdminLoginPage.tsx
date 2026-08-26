import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LOGIN_STARS = [
  { top: '14%', left: '12%', size: 2, delay: 0 },
  { top: '22%', left: '78%', size: 1.5, delay: 1.2 },
  { top: '38%', left: '44%', size: 1, delay: 2.4 },
  { top: '56%', left: '18%', size: 1.5, delay: 0.8 },
  { top: '68%', left: '62%', size: 2, delay: 1.8 },
  { top: '82%', left: '34%', size: 1, delay: 3.1 },
  { top: '48%', left: '88%', size: 1.5, delay: 2.2 },
  { top: '8%', left: '52%', size: 1, delay: 1.5 },
] as const;

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
      setSubmitting(false);
      return;
    }
    navigate(safeRedirect, { replace: true });
    setSubmitting(false);
  }

  return (
    <div className="admin-login">
      <div className="admin-login__bg" aria-hidden="true">
        <div className="admin-login__gradient" />
        <div className="admin-login__grid" />
        <div className="admin-login__stars">
          {LOGIN_STARS.map((star) => (
            <span
              key={`${star.top}-${star.left}`}
              className="admin-login__star"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="admin-login__glow admin-login__glow--1" />
        <div className="admin-login__glow admin-login__glow--2" />
        <div className="admin-login__glow admin-login__glow--3" />
      </div>

      <div className="admin-login__layout">
        <div className="admin-login__hero">
          <img
            className="admin-login__logo"
            src="/assets/logo.svg"
            alt="Rávezető"
            width={220}
            height={43}
          />
          <h1>Tartalomkezelő</h1>
          <p>Biztonságos admin felület a Rávezető weboldal szerkesztéséhez.</p>
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
              disabled={submitting}
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
              disabled={submitting}
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
