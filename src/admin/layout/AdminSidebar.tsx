import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdminUi } from '../context/AdminUiContext';
import {
  IconDashboard,
  IconExternal,
  IconGrant,
  IconHandshake,
  IconHome,
  IconLogout,
  IconPages,
  IconSettings,
  IconStar,
  IconUsers,
} from '../components/AdminIcons';

const NAV_SECTIONS = [
  {
    title: null,
    items: [{ to: '/admin/dashboard', label: 'Dashboard', icon: IconDashboard, end: true }],
  },
  {
    title: 'Weboldal',
    items: [
      { to: '/admin/home', label: 'Kezdőlap', icon: IconHome },
      { to: '/admin/rolunk', label: 'Rólunk', icon: IconPages },
      { to: '/admin/szolgaltatasok', label: 'Szolgáltatások', icon: IconPages },
    ],
  },
  {
    title: 'Tartalom',
    items: [
      { to: '/admin/team', label: 'Csapat', icon: IconUsers },
      { to: '/admin/references', label: 'Referenciák', icon: IconStar },
      { to: '/admin/partners', label: 'Partnerek', icon: IconHandshake },
      { to: '/admin/kapcsolat', label: 'Kapcsolat', icon: IconPages },
      { to: '/admin/palyazatok', label: 'Pályázatok', icon: IconGrant },
    ],
  },
  {
    title: 'Rendszer',
    items: [
      { to: '/admin/verziok', label: 'Verzióelőzmények', icon: IconPages },
      { to: '/admin/settings', label: 'Beállítások', icon: IconSettings },
    ],
  },
] as const;

export default function AdminSidebar() {
  const { logout, session } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useAdminUi();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <>
      <div
        className={`admin-sidebar-backdrop${sidebarOpen ? ' is-open' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
      <aside className={`admin-sidebar${sidebarOpen ? ' is-open' : ''}`}>
        <div className="admin-sidebar__brand">
          <img
            className="admin-sidebar__logo-img"
            src="/assets/logo.svg"
            alt="Rávezető"
            width={132}
            height={26}
          />
          <span className="admin-sidebar__badge">Tartalomkezelő</span>
        </div>

        <nav className="admin-sidebar__nav" aria-label="Admin navigáció">
          {NAV_SECTIONS.map((section) => (
            <div className="admin-sidebar__section" key={section.title ?? 'root'}>
              {section.title ? (
                <div className="admin-sidebar__section-title">{section.title}</div>
              ) : null}
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={'end' in item ? item.end : false}
                    className={({ isActive }) =>
                      `admin-sidebar__link${isActive ? ' is-active' : ''}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="admin-sidebar__icon" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <p className="admin-sidebar__user">{session?.user.email}</p>
          <a className="admin-sidebar__link admin-sidebar__link--muted" href="/" target="_blank" rel="noreferrer">
            <IconExternal className="admin-sidebar__icon" />
            <span>Weboldal megnyitása</span>
          </a>
          <button type="button" className="admin-sidebar__logout" onClick={handleLogout}>
            <IconLogout className="admin-sidebar__icon" />
            <span>Kijelentkezés</span>
          </button>
        </div>
      </aside>
    </>
  );
}
