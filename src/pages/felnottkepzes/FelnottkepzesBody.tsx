import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { company as companyStatic } from '../../content/company';
import {
  useCompanySettings,
  useFelnottkepzesCategories,
  useFelnottkepzesContent,
  useFelnottkepzesProgrammes,
} from '../../services/content/useContent';
import FelnottkepzesCatalog from './FelnottkepzesCatalog';
import { felnottkepzesCategoryBands, felnottkepzesImages } from './felnottkepzesImages';

function SketchPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="photo-slot">
      <img className="ill" src={src} alt={alt} />
    </div>
  );
}

export default function FelnottkepzesBody() {
  const content = useFelnottkepzesContent();
  const company = useCompanySettings();
  const categories = useFelnottkepzesCategories();
  const programmeGroups = useFelnottkepzesProgrammes();

  const categoryById = useMemo(() => {
    const map = new Map<string, (typeof categories)[number]>();
    categories.forEach((cat) => map.set(cat.id, cat));
    return map;
  }, [categories]);

  const bandParagraphs = content.credentials.paragraphs;
  const heroImage = content.hero.image || felnottkepzesImages.terem;

  return (
    <div className="page-felnottkepzes">
      <section className="hero-sub">
        <svg className="hero-wm" viewBox="0 0 100 120" aria-hidden="true">
          <path
            d="M14 8 L78 60 L14 112"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="wrap">
          <div className="kicker">{content.hero.label}</div>
          <h1>
            {content.hero.titleLead}{' '}
            <span className="mark">{content.hero.titleMark}</span>
          </h1>
          <p className="award-line">
            <span className="g">›</span>
            {content.hero.awardLine}
          </p>
          <a
            className="award-proof"
            href="https://www.linkedin.com/feed/update/urn:li:activity:7159842612516921345/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Megnézem a bizonyítékot →
          </a>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="band flip rev">
            <div>
              <h2 className="sec-t2">{content.keyMessage.title}.</h2>
              {bandParagraphs[0] ? <p className="mut">{bandParagraphs[0]}</p> : null}
              {bandParagraphs[1] ? (
                <p className="mut" style={{ marginTop: '1rem' }}>
                  {bandParagraphs[1]}
                </p>
              ) : null}
            </div>
            <SketchPhoto src={heroImage} alt={content.hero.imageAlt} />
          </div>
          <div className="mid rev">
            <p>{content.keyMessage.text}</p>
            <div className="tagrow" aria-label="Oktatás-módszertani megoldásaink">
              {content.methodTags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            {bandParagraphs[2] ? (
              <p style={{ marginTop: '1.4rem' }}>{bandParagraphs[2]}</p>
            ) : null}
          </div>
          <div className="doc rev">
            <div className="toplab">Engedélyezett felnőttképző intézmény</div>
            <div className="grid">
              <div>
                <div className="lab">Nyilvántartásba vételi számunk</div>
                <div className="num">B/2020/001943</div>
              </div>
              <div>
                <div className="lab">Engedélyszámunk</div>
                <div className="num">E/2021/000106</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec strip">
        <div className="wrap rev">
          <p>{content.motto}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="kicker rev">Főbb képzési területeink</div>
          <h2 className="sec-t rev">Négy terület, amelyben a legerősebbek vagyunk.</h2>
          {felnottkepzesCategoryBands.map((band) => {
            const category = categoryById.get(band.id);
            if (!category?.active) return null;
            const src = category.image?.trim() || band.image;
            const textBlock = (
              <div>
                <h3>{category.title}</h3>
                <p>{category.text}</p>
              </div>
            );
            const imageBlock = <SketchPhoto src={src} alt={band.alt} />;
            return (
              <div key={band.id} className={`band${band.flip ? ' flip' : ''} rev`}>
                {band.flip ? (
                  <>
                    {textBlock}
                    {imageBlock}
                  </>
                ) : (
                  <>
                    {imageBlock}
                    {textBlock}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <FelnottkepzesCatalog groups={programmeGroups} />
        </div>
      </section>

      <section className="sec sec-w">
        <div className="wrap">
          <div className="kicker rev">Elérhetőségeink</div>
          <h2 className="sec-t rev">Ügyfélszolgálat és iroda.</h2>
          <div className="duo">
            <article className="info rev">
              <h3>Ügyfélszolgálat</h3>
              <p className="big">{company.address}</p>
              <p>{company.hours}</p>
            </article>
            <article className="info rev">
              <h3>Irodánk</h3>
              <p className="big">{company.address}</p>
              <p>6. kapucsengő</p>
              <a className="map" href={companyStatic.mapsSearch} target="_blank" rel="noopener noreferrer">
                Megnyitás térképen →
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="close">
        <div className="wrap rev">
          <svg className="chev-trio" viewBox="0 0 40 46" aria-hidden="true">
            <path
              d="M6 40 L20 28 L34 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".35"
            />
            <path
              d="M6 26 L20 14 L34 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".2"
            />
            <path
              d="M6 12 L20 0 L34 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".12"
              transform="translate(0,4)"
            />
          </svg>
          <div className="kicker">{content.close.kicker}</div>
          <h2>{content.close.title}</h2>
          <p className="refs">
            {company.address} · {company.email} · {company.phone}
          </p>
          <Link to={content.close.link} className="btn">
            {content.close.cta}
          </Link>
        </div>
        <footer>
          <div className="wrap">
            <div className="cols">
              <div className="flogo">
                <img src="/assets/logo.svg" alt="Rávezető Projekt Kft." />
                <div className="tag">{company.tagline}</div>
              </div>
              <div>
                {company.address}
                <br />
                <a href={`mailto:${company.email}`}>{company.email}</a> ·{' '}
                <a href={`tel:${company.phoneTel}`}>{company.phone}</a>
              </div>
              <div>
                <a href={companyStatic.linkedIn} target="_blank" rel="noopener noreferrer">
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
                Nyilvántartásba vételi számunk: B/2020/001943 · Engedélyszámunk:
                E/2021/000106
              </div>
            </div>
            <div className="copy">© 2026 Rávezető Projekt Kft.</div>
          </div>
        </footer>
      </section>
    </div>
  );
}
