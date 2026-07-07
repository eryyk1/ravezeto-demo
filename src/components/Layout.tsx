import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import siteContent from '../data/siteContent.json';
import Footer from './Footer';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={`site-header${menuOpen ? ' menu-active' : ''}`}>
        <div className="menu-container">
          <nav className="main-menu" aria-label="Fő navigáció">
            {siteContent.navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="hamburger"
            aria-label="Menü"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          />
        </div>
        <nav className={`mobile-menu${menuOpen ? ' active' : ''}`} aria-label="Mobil navigáció">
          {siteContent.navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
