import { useCallback, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ClientFooter from '../../components/client/ClientFooter';
import { felnottkepzesContact } from '../../content/felnottkepzes';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  useFelnottkepzesCategories,
  useFelnottkepzesContent,
  useFelnottkepzesProgrammes,
} from '../../services/content/useContent';
import './felnottkepzes.css';

const INTRO_PHOTO = (
  <>
    📷 tréningterem – jelenetfotó helye
    <br />
    (tompított, meleg tónus)
  </>
);

const CATEGORY_PHOTOS = [
  <>📷 kommunikációs tréning – jelenetfotó helye</>,
  <>📷 vezetői tréning – jelenetfotó helye</>,
  <>📷 generációs workshop – jelenetfotó helye</>,
  <>📷 stresszkezelési tréning – jelenetfotó helye</>,
  <>📷 MI képzés – jelenetfotó helye</>,
] as const;

function stripRegLabel(value: string, label: string) {
  return value.replace(new RegExp(`^${label}:\\s*`, 'i'), '');
}

function PhotoSlot({
  image,
  alt,
  placeholder,
}: {
  image?: string;
  alt: string;
  placeholder: ReactNode;
}) {
  if (image) {
    return (
      <div className="photo-slot">
        <img src={image} alt={alt} loading="lazy" decoding="async" />
      </div>
    );
  }

  return <div className="photo-slot">{placeholder}</div>;
}

export default function FelnottkepzesPage() {
  const page = useFelnottkepzesContent();
  const felnottkepzesCategories = useFelnottkepzesCategories();
  const felnottkepzesProgrammeGroups = useFelnottkepzesProgrammes();
  const reducedMotion = useReducedMotion();

  const trainingCount = felnottkepzesProgrammeGroups.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );
  const areaCount = felnottkepzesProgrammeGroups.length;

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [catalogTransitioning, setCatalogTransitioning] = useState(false);
  const activeGroup = felnottkepzesProgrammeGroups[activeTabIndex];

  const showCatalogTab = useCallback(
    (index: number) => {
      if (index === activeTabIndex) return;

      if (reducedMotion) {
        setActiveTabIndex(index);
        return;
      }

      setCatalogTransitioning(true);
      window.setTimeout(() => {
        setActiveTabIndex(index);
        setCatalogTransitioning(false);
      }, 280);
    },
    [activeTabIndex, reducedMotion],
  );

  const registrationNum = stripRegLabel(
    page.registration,
    'Nyilvántartásba vételi számunk',
  );
  const licenseNum = stripRegLabel(page.license, 'Engedélyszámunk');

  return (
    <>
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
          <div className="kicker">{page.hero.label}</div>
          <h1>
            {page.hero.titleLead}{' '}
            <span className="mark">{page.hero.titleMark}</span>
          </h1>
          <p className="award-line">
            <span className="g">›</span>
            {page.hero.awardLine}
          </p>
        </div>
      </section>

      <section className="sec sec-w">
        <div className="wrap">
          <div className="band flip rev">
            <div>
              <h2 className="sec-t2">{page.keyMessage.title}.</h2>
              <p className="mut">{page.credentials.paragraphs[0]}</p>
              <p className="mut" style={{ marginTop: '1rem' }}>
                {page.processLead} Ennek szerves része a tananyagfejlesztés is.
              </p>
            </div>
            <div className="photo-slot">{INTRO_PHOTO}</div>
          </div>
          <div className="mid rev">
            <p>{page.keyMessage.text}</p>
            <div className="tagrow" aria-label="Oktatás-módszertani megoldásaink">
              {page.methodTags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <p style={{ marginTop: '1.4rem' }}>{page.credentials.paragraphs[2]}</p>
          </div>
          <div className="doc rev">
            <div className="toplab">Engedélyezett felnőttképző intézmény</div>
            <div className="grid">
              <div>
                <div className="lab">Nyilvántartásba vételi számunk</div>
                <div className="num">{registrationNum}</div>
              </div>
              <div>
                <div className="lab">Engedélyszámunk</div>
                <div className="num">{licenseNum}</div>
              </div>
            </div>
            <div className="note">
              Cégünk felnőttképzési engedéllyel rendelkező intézmény.
            </div>
          </div>
        </div>
      </section>

      <section className="sec strip">
        <div className="wrap rev">
          <p>{page.motto}</p>
        </div>
      </section>

      <section className="sec sec-w">
        <div className="wrap">
          <div className="kicker rev">Főbb képzési területeink</div>
          <h2 className="sec-t rev">
            {felnottkepzesCategories.length} terület, amelyben a legerősebbek vagyunk.
          </h2>

          {felnottkepzesCategories.map((category, index) => {
            const flip = index % 2 === 1;
            const placeholder =
              CATEGORY_PHOTOS[index] ?? <>📷 jelenetfotó helye</>;

            const photo = (
              <PhotoSlot
                key={`photo-${category.id}`}
                image={category.image}
                alt={category.title}
                placeholder={placeholder}
              />
            );

            const copy = (
              <div key={`copy-${category.id}`}>
                <h3>{category.title}</h3>
                <p>{category.text}</p>
              </div>
            );

            return (
              <div
                key={category.id}
                className={`band${flip ? ' flip' : ''} rev`}
              >
                {flip ? (
                  <>
                    {copy}
                    {photo}
                  </>
                ) : (
                  <>
                    {photo}
                    {copy}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="cat-head">
            <div>
              <div className="kicker rev">Referencia-képzéseink</div>
              <h2 className="sec-t rev" style={{ marginBottom: 0 }}>
                Képzési katalógus.
              </h2>
            </div>
            <div className="cat-count rev">
              <b>{trainingCount}</b> képzés · <b>{areaCount}</b> terület
            </div>
          </div>
          <div
            className="cat-tabs rev"
            role="tablist"
            aria-label="Képzési kategóriák"
          >
            {felnottkepzesProgrammeGroups.map((group, index) => (
              <button
                key={group.id}
                type="button"
                role="tab"
                className={`cat-tab${index === activeTabIndex ? ' on' : ''}`}
                aria-selected={index === activeTabIndex}
                onClick={() => showCatalogTab(index)}
              >
                {group.tab}
              </button>
            ))}
          </div>
          <div className="cat-card rev">
            <div className={`cat-inner${catalogTransitioning ? ' out' : ''}`}>
              {activeGroup ? (
                <>
                  <h3>{activeGroup.title}</h3>
                  <ul className="reflist">
                    {activeGroup.items.map((item) => (
                      <li key={item.title}>
                        <span className="t">{item.title}</span>
                        <span className="dots" aria-hidden="true" />
                        <span className="h">{item.hours}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-w">
        <div className="wrap">
          <div className="kicker rev">Elérhetőségeink</div>
          <h2 className="sec-t rev">Ügyfélszolgálat és iroda.</h2>
          <div className="duo">
            <article className="info rev">
              <h3>{felnottkepzesContact.customerService.title}</h3>
              <p className="big">{felnottkepzesContact.customerService.address}</p>
              <p>{felnottkepzesContact.customerService.hours}</p>
            </article>
            <article className="info rev">
              <h3>{felnottkepzesContact.office.title}</h3>
              <p className="big">{felnottkepzesContact.office.address}</p>
              <p>{felnottkepzesContact.office.note}</p>
              <a
                className="map"
                href={felnottkepzesContact.office.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Megnyitás térképen →
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="close">
        <div className="wrap rev">
          <svg
            className="chev-trio"
            viewBox="0 0 40 46"
            aria-hidden="true"
          >
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
          <div className="kicker">{page.close.kicker}</div>
          <h2>{page.close.title}</h2>
          <p className="refs">
            {felnottkepzesContact.customerService.address} · info@ravezeto.hu ·
            +36 70/513 4128
          </p>
          <Link to={page.close.link} className="btn">
            {page.close.cta}
          </Link>
        </div>
        <ClientFooter />
      </section>
    </>
  );
}
