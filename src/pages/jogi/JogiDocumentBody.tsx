import { Link } from 'react-router-dom';
import { company } from '../../content/company';
import { SITE_LAST_MODIFIED, SITE_LAST_MODIFIED_LABEL } from '../../seo/config';
import { defaultJogiAdatvedelem } from '../../content/jogi/jogiDefaults';
import type { JogiAdatvedelemContent, JogiImpresszumContent } from '../../services/content/types';
import { useJogiTocSpy } from './useJogiTocSpy';
import { jogiPages } from './jogiContent';

export type JogiDocumentVariant = 'impresszum' | 'adatvedelem' | 'cookie';

type JogiDocumentBodyProps = {
  variant: JogiDocumentVariant;
  impresszum: JogiImpresszumContent;
  adatvedelem: JogiAdatvedelemContent;
  logoSrc?: string;
};

export default function JogiDocumentBody({
  variant,
  impresszum,
  adatvedelem,
  logoSrc = '/assets/images/adatvedelem/img-02.svg',
}: JogiDocumentBodyProps) {
  const isAdatvedelem = variant === 'adatvedelem';
  const isCookie = variant === 'cookie';
  useJogiTocSpy(isAdatvedelem);

  const adatLead =
    adatvedelem.heroLead?.trim() || defaultJogiAdatvedelem.heroLead;
  const adatBodyHtml =
    adatvedelem.bodyHtml?.trim() || defaultJogiAdatvedelem.bodyHtml;

  const cookiePage = jogiPages.cookie;
  const title = isCookie
    ? cookiePage.title
    : isAdatvedelem
      ? 'Adatkezelési tájékoztató'
      : 'Impresszum';

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="kicker">Dokumentumok</div>
          <h1>{title}</h1>
          {isAdatvedelem && adatLead ? <p className="hlead">{adatLead}</p> : null}
          {isCookie && cookiePage.intro ? <p className="hlead">{cookiePage.intro}</p> : null}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          {isAdatvedelem ? (
            <div
              className="lgrid"
              dangerouslySetInnerHTML={{ __html: adatBodyHtml }}
            />
          ) : isCookie ? (
            <div className="legal rev">
              {cookiePage.body?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
              <ul className="doc-list">
                {cookiePage.documents.map((doc) => (
                  <li key={doc.href}>
                    <a href={doc.href} target="_blank" rel="noopener noreferrer">
                      {doc.label}
                    </a>
                    {doc.description ? <> — {doc.description}</> : null}
                  </li>
                ))}
              </ul>
              <p>
                <Link to="/jogi/adatvedelem">Teljes adatkezelési tájékoztató →</Link>
              </p>
            </div>
          ) : (
            <div className="legal rev">
              <div dangerouslySetInnerHTML={{ __html: impresszum.bodyHtml }} />
            </div>
          )}
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="cols">
            <div className="flogo">
              <img src={logoSrc} alt="Rávezető Projekt Kft." />
              <div className="tag">Változásokat vezetünk, együtt!</div>
            </div>
            <div>
              {company.address}
              <br />
              <a href={`mailto:${company.email}`}>{company.email}</a> ·{' '}
              <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
            </div>
            <div>
              <a href={company.linkedIn} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <br />
              <Link to="/jogi/adatvedelem">Adatvédelem</Link> ·{' '}
              <Link to="/jogi/impresszum">Impresszum</Link>
            </div>
          </div>
          <div className="fcred">
            <div className="fdoc">
              <b>Cégünk felnőttképzési engedéllyel rendelkező intézmény.</b>
              <br />
              Nyilvántartásba vételi számunk: {company.trainingRegistrationNumber} ·
              Engedélyszámunk: {company.trainingLicenseNumber}
            </div>
          </div>
          <div className="copy">
            © 2026 Rávezető Projekt Kft. · Frissítve:{' '}
            <time dateTime={SITE_LAST_MODIFIED}>{SITE_LAST_MODIFIED_LABEL}</time>
          </div>
        </div>
      </footer>
    </>
  );
}
