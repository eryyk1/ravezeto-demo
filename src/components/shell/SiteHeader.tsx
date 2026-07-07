import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { primaryNav } from '../../content/navigation';
import MobileMenuOverlay from './MobileMenuOverlay';
import './SiteHeader.css';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`site-header${scrolled ? ' site-header--light' : ' site-header--dark'}`}>
        <div className="site-header__inner content-wrap">
          <Link to="/" className="site-header__logo" aria-label="Rávezető — Főoldal">
            <img
              src={scrolled ? '/assets/logo-dark.svg' : '/assets/logo.svg'}
              alt=""
              width={165}
              height={32}
              className="site-header__logo-img"
            />
          </Link>

          <nav className="site-header__nav" aria-label="Fő navigáció">
            <ul className="site-header__nav-list">
              {primaryNav.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `site-header__link${isActive ? ' site-header__link--active' : ''}`
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
            className="site-header__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="visually-hidden">
              {menuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
            </span>
            <span
              className={`site-header__hamburger${menuOpen ? ' is-open' : ''}`}
              aria-hidden="true"
            >
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <MobileMenuOverlay id="mobile-menu" open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
