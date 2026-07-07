import { Link } from 'react-router-dom';
import { company } from '../../content/company';
import { footerNav, primaryNav } from '../../content/navigation';
import './HomeFooter.css';

export default function HomeFooter() {
  const half = Math.ceil(primaryNav.length / 2);

  return (
    <footer className="home-footer">
      <div className="content-wrap home-footer__main">
        <div className="home-footer__brand">
          <Link to="/" className="home-footer__logo">
            <img src="/assets/logo.png" alt="Rávezető" width={200} height={40} />
          </Link>
          <p className="home-footer__tagline">{company.tagline}</p>
        </div>

        <div className="home-footer__col">
          <h2 className="home-footer__heading">Oldaltérkép</h2>
          <ul className="home-footer__links">
            {primaryNav.slice(0, half).map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <ul className="home-footer__links">
            {primaryNav.slice(half).map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="home-footer__col">
          <h2 className="home-footer__heading">Elérhetőségek</h2>
          <address className="home-footer__address">
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <br />
            <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>
            <br />
            {company.address}
          </address>
        </div>

        <div className="home-footer__col">
          <h2 className="home-footer__heading">Kövessen minket</h2>
          <a
            href={company.facebook}
            className="home-footer__social"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>

      <div className="home-footer__bar">
        <div className="content-wrap home-footer__bar-inner">
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
          <ul className="home-footer__legal">
            {footerNav.legal.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
