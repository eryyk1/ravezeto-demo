import { Outlet, useLocation } from 'react-router-dom';
import PageMetaManager from '../seo/PageMetaManager';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <PageMetaManager />
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
