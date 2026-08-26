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

  if (!loading && session) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const message = await login(email.trim(), password);
    if (message) {
      setError(message);
    } else {
      navigate(redirectTo, { replace: true });
    }
    setSubmitting(false);
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__brand">
          <span>Rávezető</span>
          <strong>Admin belépés</strong>
        </div>
        <p className="admin-login__intro">
          A tartalomkezelő védett. Jelentkezzen be a weboldal szerkesztéséhez.
        </p>

        <label className="admin-field">
          <span className="admin-field__label">Email</span>
          <input
            className="admin-input"
            type="email"
            autoComplete="username"
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error ? <p className="admin-login__error">{error}</p> : null}

        <button className="admin-btn admin-btn--primary" type="submit" disabled={submitting}>
          {submitting ? 'Bejelentkezés…' : 'Bejelentkezés'}
        </button>
      </form>
    </div>
  );
}
