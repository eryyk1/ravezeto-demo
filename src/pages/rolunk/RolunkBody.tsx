import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { pageImage } from '../../data/media';
import { useRolunkContent, useTeamMembers } from '../../services/content/useContent';

function valuesImageAlt(labels: string[]): string {
  return `Értékeink kézzel rajzolt mozaikja: ${labels.join(', ')}`;
}

export default function RolunkBody() {
  const { hero, story, values, closing, close } = useRolunkContent();
  const team = useTeamMembers(true);

  const mottoParagraph = useMemo(() => {
    const parts = [story.pullQuote, ...story.paragraphs].filter(Boolean);
    return parts.join(' ');
  }, [story.pullQuote, story.paragraphs]);

  const valuesAlt = useMemo(() => valuesImageAlt(values.labels), [values.labels]);

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
          <div className="kicker">{hero.label}</div>
          <h1>
            {hero.title} <span className="mark">{hero.titleMark}</span>
          </h1>
          <p className="lead">{hero.intro}</p>
        </div>
        <div className="wrap" style={{ marginTop: '3rem' }}>
          <div className="team-photo team-photo--hero rev">
            <img src={hero.image} alt={hero.imageAlt} />
          </div>
        </div>
      </section>

      <section className="sec sec-w motto-sec">
        <div className="motto-art" aria-hidden="true">
          <svg viewBox="0 0 200 170" fill="none">
            <path d="M20 160 L80 100 L140 160 H106 L80 134 L54 160 Z" fill="#9DAD52" opacity=".1" />
            <path d="M20 116 L80 56 L140 116 H106 L80 90 L54 116 Z" fill="#75833A" opacity=".14" />
            <path d="M50 62 L80 32 L110 62 H91 L80 51 L69 62 Z" fill="#D6A548" opacity=".22" />
          </svg>
        </div>
        <div className="wrap motto rev">
          <div className="latin">
            <span className="gm">„</span>
            {story.motto}
            <span className="gm">”</span>
          </div>
          <p>{mottoParagraph}</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="sec-t rev">Munkatársaink</h2>
          <div className="team-grid">
            {team.map((member) => {
              const linkedIn = member.linkedInUrl?.trim();
              return (
                <article key={member.id} className="member rev">
                  <h3>{member.name}</h3>
                  {linkedIn ? (
                    <a
                      className="li-link"
                      href={linkedIn}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${member.name} LinkedIn profilja`}
                    >
                      <span className="li-badge" aria-hidden="true">
                        in
                      </span>
                      LinkedIn profil
                    </a>
                  ) : null}
                  <p className="bio">{member.bio}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="kicker rev">{values.label}</div>
          <h2 className="sec-t rev">{values.title}</h2>
          <div className="values-img rev">
            <img src={values.image} alt={valuesAlt} />
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
          <div className="kicker">{close.kicker}</div>
          <h2>{close.title}</h2>
          <p className="refs">{closing}</p>
          <Link className="btn" to={close.link}>
            {close.cta}
          </Link>
        </div>
        <footer>
          <div className="wrap">
            <div className="cols">
              <div className="flogo">
                <img src={pageImage('csapatunk', 'img-04.svg')} alt="Rávezető Projekt" />
                <div className="tag">Változásokat vezetünk, együtt!</div>
              </div>
              <div>
                1146 Budapest, Izsó u. 7. 1/3.
                <br />
                <a href="mailto:info@ravezeto.hu">info@ravezeto.hu</a> ·{' '}
                <a href="tel:+36705134128">+36 70/513 4128</a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/company/r%C3%A1vezet%C5%91-projekt/"
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn
                </a>
                <br />
                <Link to="/jogi/adatvedelem">Adatvédelem</Link> · <Link to="/jogi/impresszum">Impresszum</Link>
              </div>
            </div>
            <div className="fcred">
              <div className="fdoc">
                <b>Cégünk felnőttképzési engedéllyel rendelkező intézmény.</b>
                <br />
                Nyilvántartásba vételi számunk: B/2020/001943 · Engedélyszámunk: E/2021/000106
              </div>
            </div>
            <div className="copy">
              © 2026 Rávezető Projekt Kft. · Frissítve:{' '}
              <time dateTime="2026-09-09">2026. szeptember</time>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}
