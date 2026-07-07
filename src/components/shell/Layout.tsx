import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <a href="#main-content" className="skip-link">
        Ugrás a tartalomhoz
      </a>
      {!isHome && <SiteHeader />}
      <main id="main-content">
        <Outlet />
      </main>
      {!isHome && <SiteFooter />}
    </>
  );
}
