import ClientFooter from '../../components/client/ClientFooter';
import { Link } from 'react-router-dom';
import { defaultJogiAdatvedelem, defaultJogiImpresszum } from '../../content/jogi/jogiDefaults';
import type { JogiAdatvedelemContent, JogiImpresszumContent } from '../../services/content/types';
import { useJogiTocSpy } from './useJogiTocSpy';
import { jogiPages } from './jogiContent';
import { normalizeLegalHtml, normalizeLegalPlainText } from '../../utils/legalHtml';

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
}: JogiDocumentBodyProps) {
  const isAdatvedelem = variant === 'adatvedelem';
  const isCookie = variant === 'cookie';
  useJogiTocSpy(isAdatvedelem);

  const adatLead = normalizeLegalPlainText(
    adatvedelem.heroLead?.trim() || defaultJogiAdatvedelem.heroLead,
  );
  const adatBodyHtml = normalizeLegalHtml(
    adatvedelem.bodyHtml?.trim() || defaultJogiAdatvedelem.bodyHtml,
  );
  const impresszumBodyHtml = normalizeLegalHtml(
    impresszum.bodyHtml?.trim() || defaultJogiImpresszum.bodyHtml,
  );

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
          {isAdatvedelem && adatLead ? (
            <p className="hlead" dangerouslySetInnerHTML={{ __html: adatLead }} />
          ) : null}
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
              {cookiePage.documents.length > 0 ? (
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
              ) : null}
              <p>
                <Link to="/jogi/adatvedelem">Teljes adatkezelési tájékoztató →</Link>
              </p>
            </div>
          ) : (
            <div className="legal rev">
              <div dangerouslySetInnerHTML={{ __html: impresszumBodyHtml }} />
            </div>
          )}
        </div>
      </section>

      <ClientFooter />
    </>
  );
}
