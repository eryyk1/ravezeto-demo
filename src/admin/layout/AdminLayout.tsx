import type { ReactNode } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminToasts from '../components/AdminToasts';
import { useAdminUi } from '../context/AdminUiContext';
import { contentStore } from '../../services/content/store';
import { useCmsMeta } from '../../services/content/useContent';

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { setSidebarOpen, pushToast } = useAdminUi();
  const meta = useCmsMeta();

  function handlePublish() {
    contentStore.publish();
    pushToast('success', 'Minden piszkozat publikálva.');
  }

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
          <div className="admin-topbar__actions">
            <span className={`admin-badge${meta.hasUnpublishedChanges ? ' admin-badge--warn' : ''}`}>
              {meta.hasUnpublishedChanges ? 'Piszkozat' : 'Publikálva'}
            </span>
            <button
              type="button"
              className="admin-btn admin-btn--sm admin-btn--primary"
              onClick={handlePublish}
            >
              Publikálás
            </button>
          </div>
        </div>
        <main className="admin-content">{children}</main>
      </div>
      <AdminToasts />
    </div>
  );
}
