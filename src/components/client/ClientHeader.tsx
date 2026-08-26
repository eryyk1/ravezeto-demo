import { Link, NavLink } from 'react-router-dom';
import { primaryNav } from '../../content/navigation';
import { useClientMobileMenu } from '../../hooks/useClientMobileMenu';
import ClientMobileMenu from './ClientMobileMenu';

export default function ClientHeader() {
  const { buttonRef, toggle, close, menuId } = useClientMobileMenu();

  return (
    <>
      <header>
        <div className="nav">
          <Link to="/" className="logo" aria-label="Rávezető — Főoldal">
            <img src="/assets/logo-dark.svg" alt="Rávezető Projekt" />
          </Link>

          <nav aria-label="Fő navigáció">
            {primaryNav.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {item.label}
              </NavLink>
            ))}
            <a href="https://mentally.team" target="_blank" rel="noopener noreferrer">
              Mentally
            </a>
            <NavLink to="/kapcsolat" className="cta">
              Kapcsolat
            </NavLink>
          </nav>

          <button
            ref={buttonRef}
            type="button"
            className="menu-btn"
            aria-label="Menü"
            aria-expanded={false}
            aria-controls={menuId}
            onClick={toggle}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <ClientMobileMenu id={menuId} onLinkClick={close} />
    </>
  );
}
