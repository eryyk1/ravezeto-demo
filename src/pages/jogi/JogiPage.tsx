import { Link, useLocation } from 'react-router-dom';
import InnerPageHero from '../../components/pages/InnerPageHero';
import { company } from '../../content/company';
import { jogiFallback, jogiPages } from './jogiContent';
import './jogi.css';

function resolveSlug(pathname: string): string | null {
  const segment = pathname.split('/').filter(Boolean).pop();
  return segment && segment !== 'jogi' ? segment : null;
}

export default function JogiPage() {
  const { pathname } = useLocation();
  const slug = resolveSlug(pathname);
  const content = (slug && jogiPages[slug]) || jogiFallback;

  return (
    <div className="page jogi-page">
      <InnerPageHero label="Jogi" title={content.title} intro={content.intro} tone="deep" />

      <section className="jogi-page__body content-wrap">
        <ul className="jogi-page__docs">
          {content.documents.map((doc) => {
            const isExternal = doc.href.startsWith('http');
            const isPdf = doc.href.endsWith('.pdf');

            if (isExternal || isPdf) {
              return (
                <li key={doc.href}>
                  <a
                    href={doc.href}
                    className="jogi-page__doc-link"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    download={isPdf ? true : undefined}
                  >
                    <span className="jogi-page__doc-label">{doc.label}</span>
                    {doc.description && (
                      <span className="jogi-page__doc-desc">{doc.description}</span>
                    )}
                  </a>
                </li>
              );
            }

            return (
              <li key={doc.href}>
                <Link to={doc.href} className="jogi-page__doc-link">
                  <span className="jogi-page__doc-label">{doc.label}</span>
                  {doc.description && (
                    <span className="jogi-page__doc-desc">{doc.description}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {slug === 'impresszum' && (
          <aside className="jogi-page__impresszum">
            <h2>Cégadatok</h2>
            <p>
              <strong>{company.name}</strong>
              <br />
              {company.address}
              <br />
              <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
              <br />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </aside>
        )}
      </section>
    </div>
  );
}
