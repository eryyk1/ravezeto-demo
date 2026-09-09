import { Link } from 'react-router-dom';
import { company } from '../../content/company';
import ContentFreshness from '../../components/client/ContentFreshness';
import type { JogiPageContent } from './jogiContent';

type JogiDocumentBodyProps = {
  content: JogiPageContent;
  showCompanyDetails?: boolean;
};

export default function JogiDocumentBody({
  content,
  showCompanyDetails = false,
}: JogiDocumentBodyProps) {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="kicker">Dokumentumok</div>
          <h1>{content.title}</h1>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="doc rev">
            <p className="doc-intro">{content.intro}</p>
            {content.body?.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}

            {showCompanyDetails ? (
              <dl className="company-block">
                <div>
                  <dt>Cégnév</dt>
                  <dd>{company.name}</dd>
                </div>
                <div>
                  <dt>Székhely</dt>
                  <dd>{company.address}</dd>
                </div>
                <div>
                  <dt>E-mail</dt>
                  <dd>
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Telefon</dt>
                  <dd>
                    <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>Adószám</dt>
                  <dd>{company.taxId}</dd>
                </div>
                <div>
                  <dt>Cégjegyzékszám</dt>
                  <dd>{company.companyRegistration}</dd>
                </div>
                <div>
                  <dt>Felnőttképzési nyilvántartási szám</dt>
                  <dd>{company.trainingRegistrationNumber}</dd>
                </div>
                <div>
                  <dt>Felnőttképzési engedélyszám</dt>
                  <dd>{company.trainingLicenseNumber}</dd>
                </div>
              </dl>
            ) : null}

            {content.documents.length > 0 ? (
              <ul className="doc-links">
                {content.documents.map((document) => (
                  <li key={document.href}>
                    <a href={document.href} target="_blank" rel="noopener noreferrer">
                      {document.label}
                    </a>
                    {document.description ? (
                      <span className="doc-link-desc">{document.description}</span>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}

            <ContentFreshness />
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="cols">
            <div className="flogo">
              <img src="/assets/images/adatvedelem/img-02.svg" alt="Rávezető Projekt Kft." />
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
          <div className="copy">© 2026 Rávezető Projekt Kft.</div>
        </div>
      </footer>
    </>
  );
}
