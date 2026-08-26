import { Link } from 'react-router-dom';
import { company } from '../../content/company';
import { felnottkepzesReg } from '../../content/felnottkepzes';
import { homeEuMark } from '../../content/home';
import { footerNav } from '../../content/navigation';

export default function ClientFooter() {
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div className="flogo">
            <img src="/assets/logo.svg" alt="Rávezető Projekt" />
            <div className="tag">{company.tagline}</div>
          </div>
          <div>
            {company.address}
            <br />
            <a href={`mailto:${company.email}`}>{company.email}</a> ·{' '}
            <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
          </div>
          <div>
            <a href={company.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <br />
            {footerNav.legal.map((item, index) => (
              <span key={item.path}>
                {index > 0 && ' · '}
                <Link to={item.path}>{item.label}</Link>
              </span>
            ))}
          </div>
        </div>

        <div className="fcred">
          <div className="fdoc">
            <b>Cégünk felnőttképzési engedéllyel rendelkező intézmény.</b>
            <br />
            {felnottkepzesReg.registration} · {felnottkepzesReg.license}
          </div>
          <div className="eu-slot">
            <img src={homeEuMark.image} alt={homeEuMark.alt} onError={(e) => e.currentTarget.remove()} />
            <span>Széchenyi 2020 / EU logó helye</span>
          </div>
        </div>

        <div className="copy">
          © {new Date().getFullYear()} {company.name}
        </div>
      </div>
    </footer>
  );
}
