import { Link } from 'react-router-dom';
import { company } from '../../content/company';
import { footerNav } from '../../content/navigation';
import './SiteFooter.css';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner content-wrap">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            <img src="/assets/logo.svg" alt="Rávezető" width={180} height={36} />
          </Link>
          <p className="site-footer__tagline">{company.tagline}</p>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Cég</h2>
          <ul className="site-footer__links">
            {footerNav.company.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Szolgáltatások</h2>
          <ul className="site-footer__links">
            {footerNav.services.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Elérhetőség</h2>
          <address className="site-footer__address">
            {company.address}
            <br />
            <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </address>
        </div>
      </div>

      <div className="site-footer__bottom content-wrap">
        <p>
          © {new Date().getFullYear()} {company.name}
        </p>
        <p className="site-footer__reg">{company.trainingReg}</p>
        <ul className="site-footer__legal">
          {footerNav.legal.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
