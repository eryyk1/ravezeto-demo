import type { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminToasts from '../components/AdminToasts';
import { useAdminUi } from '../context/AdminUiContext';

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { setSidebarOpen } = useAdminUi();

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-topbar">
          <button
            type="button"
            className="admin-topbar__menu"
            aria-label="Menü megnyitása"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="admin-topbar__title">Tartalomkezelő</div>
        </div>
        <main className="admin-content">{children}</main>
      </div>
      <AdminToasts />
    </div>
  );
}
