import { Link, useLocation } from 'react-router-dom';
import ClientFooter from '../../components/client/ClientFooter';
import ScrollReveal from '../../components/client/ScrollReveal';
import { company } from '../../content/company';
import { jogiFallback, jogiPages } from './jogiContent';

function resolveSlug(pathname: string): string | null {
  const segment = pathname.split('/').filter(Boolean).pop();
  return segment && segment !== 'jogi' ? segment : null;
}

export default function JogiPage() {
  const { pathname } = useLocation();
  const slug = resolveSlug(pathname);
  const content = (slug && jogiPages[slug]) || jogiFallback;
  const isImpresszum = slug === 'impresszum';

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
          <ScrollReveal className="doc">
            {content.intro && <p>{content.intro}</p>}

            {isImpresszum && (
              <div className="jogi-impresszum">
                <p>
                  <strong>{company.name}</strong>
                  <br />
                  {company.address}
                  <br />
                  <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
                  <br />
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </p>
              </div>
            )}

            <ul className="jogi-doc-list">
              {content.documents.map((doc) => {
                const isExternal = doc.href.startsWith('http');
                const isPdf = doc.href.endsWith('.pdf');

                if (isExternal || isPdf) {
                  return (
                    <li key={doc.href}>
                      <a
                        href={doc.href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        download={isPdf ? true : undefined}
                      >
                        {doc.label}
                      </a>
                      {doc.description && <span>{doc.description}</span>}
                    </li>
                  );
                }

                return (
                  <li key={doc.href}>
                    <Link to={doc.href}>{doc.label}</Link>
                    {doc.description && <span>{doc.description}</span>}
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <ClientFooter />
    </>
  );
}
