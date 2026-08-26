import { Link } from 'react-router-dom';
import { footerNav } from '../../content/navigation';
import {
  useCompanySettings,
  useEuMark,
  useFooterContent,
  useFelnottkepzesContent,
} from '../../services/content/useContent';

export default function ClientFooter() {
  const company = useCompanySettings();
  const footer = useFooterContent();
  const euMark = useEuMark();
  const felnottkepzes = useFelnottkepzesContent();

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
            {footer.trainingReg || felnottkepzes.registration} · {felnottkepzes.license}
          </div>
          <div className="eu-slot">
            <img src={euMark.image} alt={euMark.alt} onError={(e) => e.currentTarget.remove()} />
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
