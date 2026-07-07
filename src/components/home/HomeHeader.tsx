import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { primaryNav } from '../../content/navigation';
import MobileMenuOverlay from '../shell/MobileMenuOverlay';
import './HomeHeader.css';

export default function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="home-header">
        <div className="home-header__inner content-wrap">
          <Link to="/" className="home-header__logo" aria-label="Rávezető — Főoldal">
            <img src="/assets/logo.svg" alt="" width={200} height={40} className="home-header__logo-img" />
          </Link>

          <nav className="home-header__nav" aria-label="Fő navigáció">
            <ul className="home-header__list">
              {primaryNav.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `home-header__link${isActive ? ' home-header__link--active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="home-header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="home-mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="visually-hidden">Menü</span>
            <span className={`home-header__burger${menuOpen ? ' is-open' : ''}`} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <MobileMenuOverlay
        id="home-mobile-menu"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
