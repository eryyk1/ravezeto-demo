import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdminUi } from '../context/AdminUiContext';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard', end: true },
  { to: '/admin/home', label: 'Kezdőlap' },
  { to: '/admin/rolunk', label: 'Rólunk' },
  { to: '/admin/szolgaltatasok', label: 'Szolgáltatások' },
  { to: '/admin/team', label: 'Csapat' },
  { to: '/admin/references', label: 'Referenciák' },
  { to: '/admin/partners', label: 'Partnerek' },
  { to: '/admin/palyazatok', label: 'Pályázatok' },
  { to: '/admin/settings', label: 'Beállítások' },
] as const;

export default function AdminSidebar() {
  const { logout, session } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useAdminUi();

  return (
    <>
      <div
        className={`admin-sidebar-backdrop${sidebarOpen ? ' is-open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <aside className={`admin-sidebar${sidebarOpen ? ' is-open' : ''}`}>
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">Rávezető</span>
          <span className="admin-sidebar__badge">Admin</span>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Admin navigáció">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : false}
              className={({ isActive }) =>
                `admin-sidebar__link${isActive ? ' is-active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <p className="admin-sidebar__user">{session?.user.email}</p>
          <a className="admin-sidebar__link" href="/" target="_blank" rel="noreferrer">
            Weboldal megnyitása
          </a>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => logout()}>
            Kijelentkezés
          </button>
        </div>
      </aside>
    </>
  );
}
