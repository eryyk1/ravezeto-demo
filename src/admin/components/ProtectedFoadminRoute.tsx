import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedFoadminRoute() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner" aria-hidden="true" />
        <p>Admin betöltése…</p>
      </div>
    );
  }

  if (!session || session.user.role !== 'foadmin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
