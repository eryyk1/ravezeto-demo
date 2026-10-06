import { Link } from 'react-router-dom';
import { company as companyLegal } from '../../content/company';
import { footerNav } from '../../content/navigation';
import { SITE_LAST_MODIFIED, SITE_LAST_MODIFIED_LABEL } from '../../seo/config';
import { useCompanySettings, useEuMark, useFooterContent } from '../../services/content/useContent';

const FOOTER_LOGO = '/assets/images/fooldal/img-02.svg';

/**
 * Single public-site footer (same markup as the homepage reference).
 * "Támogatott projektjeink" renders only if the CMS has a real logo image set.
 */
export default function ClientFooter() {
  const company = useCompanySettings();
  const footer = useFooterContent();
  const euMark = useEuMark();
  const euImage = euMark?.image?.trim();

  return (
    <>
      {euImage ? (
        <div className="eu-band">
          <div className="wrap">
            <div className="kicker">Támogatott projektjeink</div>
            <Link to={euMark.link || '/palyazatok'}>
              <img src={euImage} alt={euMark.alt} className="eu-band__img" />
            </Link>
          </div>
        </div>
      ) : null}
      <footer>
        <div className="wrap">
          <div className="cols">
            <div className="flogo">
              <img src={FOOTER_LOGO} alt="Rávezető Projekt Kft." />
              <div className="tag">{company.tagline}</div>
            </div>
            <div>
              {company.address}
              <br />
              <a href={`mailto:${company.email}`}>{company.email}</a> ·{' '}
              <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
            </div>
            <div>
              <a href={companyLegal.linkedIn} target="_blank" rel="noopener noreferrer">
                LinkedIn
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
              {footer.trainingReg?.trim() || companyLegal.trainingReg}
            </div>
          </div>

          <div className="copy">
            © {new Date().getFullYear()} Rávezető Projekt Kft. · Frissítve:{' '}
            <time dateTime={SITE_LAST_MODIFIED}>{SITE_LAST_MODIFIED_LABEL}</time>
          </div>
        </div>
      </footer>
    </>
  );
}
