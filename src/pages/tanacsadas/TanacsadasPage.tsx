import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ClientClose from '../../components/client/ClientClose';
import ContentPhotoSlot from '../../components/client/ContentPhotoSlot';
import GoldMark from '../../components/client/GoldMark';
import HeroLines from '../../components/client/HeroLines';
import ScrollReveal from '../../components/client/ScrollReveal';
import { useServices, useTanacsadasContent, useTeamMembers } from '../../services/content/useContent';

function useCoachingPhoto() {
  const teamMembers = useTeamMembers(true);
  return teamMembers.find((m) => m.featured)?.portrait ?? teamMembers[0]?.portrait ?? '';
}

function ChangeCurve() {
  return (
    <ScrollReveal className="vmcurve" role="img" aria-label="A változási görbe: a mélyponton átvezetve a szervezet magasabb szintre jut, mint ahonnan indult">
      <svg viewBox="0 0 1000 320" aria-hidden="true">
        <line className="base" x1="30" y1="140" x2="965" y2="140" />
        <path
          className="area"
          d="M30,140 C160,142 240,256 400,262 C560,268 620,185 720,142 C820,99 905,74 958,66 L958,320 L30,320 Z"
        />
        <path
          className="curve"
          d="M30,140 C160,142 240,256 400,262 C560,268 620,185 720,142 C820,99 905,74 958,66"
          pathLength={1000}
        />
        <path className="arr" d="M936,54 L964,64 L950,92" />
        <circle className="cd c1" cx="150" cy="149" r="9" />
        <circle className="cd c2" cx="400" cy="262" r="9" />
        <circle className="cd c3" cx="700" cy="149" r="9" />
        <circle className="cd c4" cx="920" cy="71" r="9" />
        <text className="cn c1" x="150" y="119">
          01
        </text>
        <text className="cn c2" x="400" y="300">
          02
        </text>
        <text className="cn c3" x="700" y="119">
          03
        </text>
        <text className="cn c4" x="920" y="41">
          04
        </text>
      </svg>
    </ScrollReveal>
  );
}

function BandPhoto({ label, photo }: { label: string; photo?: string }) {
  if (photo) {
    return (
      <div className="photo-slot">
        <img src={photo} alt="" loading="lazy" decoding="async" />
      </div>
    );
  }
  return <ContentPhotoSlot placeholder={label} alt="" />;
}

function renderHeroTitle(title: string) {
  if (title.includes('munkatársak')) {
    const [before, after] = title.split('munkatársak');
    return (
      <>
        {before}
        <GoldMark>munkatársak</GoldMark>
        {after}
      </>
    );
  }
  return title;
}

export default function TanacsadasPage() {
  const coachingPhoto = useCoachingPhoto();
  const { pathname } = useLocation();
  const page = useTanacsadasContent();
  const tanacsadasServices = useServices('tanacsadas', true);
  const validAnchors = useMemo(
    () => new Set<string>(tanacsadasServices.map((s) => s.id)),
    [tanacsadasServices],
  );
  const valtozasService = tanacsadasServices.find((s) => s.id === 'valtozasmenedzsment');

  useEffect(() => {
    const segment = pathname.split('/').filter(Boolean).pop();
    if (segment && segment !== 'tanacsadas' && validAnchors.has(segment)) {
      const el = document.getElementById(segment);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pathname, validAnchors]);

  return (
    <>
      <section className="hero-sub">
        <HeroLines />
        <div className="wrap">
          <div className="kicker">{page.hero.label}</div>
          <h1>{renderHeroTitle(page.hero.title)}</h1>
          <p className="lead">{page.hero.intro}</p>
        </div>
      </section>

      <div className="aurelius-wrap">
        <div className="aurelius-sticky">
          <div className="wrap">
            <div className="kicker aurelius-label">Kétezer éves üzenet</div>
            <p className="aurelius" id="aurelius">
              {page.quote.text}
            </p>
            <div className="aurelius-who">{page.quote.author}</div>
            <p className="aurelius-why">{page.quote.note}</p>
          </div>
        </div>
      </div>

      <section className="chapter" id="szervezetfejlesztes">
        <div className="wrap">
          <div className="ch-head">
            <h2 className="ch-big">
              Szervezet
              <wbr />
              <b>fejlesztés</b>
            </h2>
          </div>
          <ScrollReveal as="p" className="punch">
            {page.szervezetfejlesztes.punch}
          </ScrollReveal>
          <ScrollReveal className="band">
            <BandPhoto
              label={page.szervezetfejlesztes.bands[0].photoLabel}
              photo={page.szervezetfejlesztes.bands[0].photo}
            />
            <div className="btxt">
              <h3>{page.szervezetfejlesztes.bands[0].title}</h3>
              {page.szervezetfejlesztes.bands[0].paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal className="band flip">
            <div className="btxt">
              <h3>{page.szervezetfejlesztes.bands[1].title}</h3>
              {page.szervezetfejlesztes.bands[1].paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <BandPhoto
              label={page.szervezetfejlesztes.bands[1].photoLabel}
              photo={page.szervezetfejlesztes.bands[1].photo}
            />
          </ScrollReveal>
          <ScrollReveal as="p" className="accent-line">
            {page.motto}
          </ScrollReveal>
        </div>
      </section>

      <section className="chapter w alt" id="valtozasmenedzsment">
        <div className="wrap">
          <div className="ch-head">
            <h2 className="ch-big">
              Változás
              <wbr />
              <b>menedzsment</b>
            </h2>
          </div>
          {valtozasService && (
            <>
              <ScrollReveal as="p" className="vm-lead">
                {valtozasService.intro}
              </ScrollReveal>
              <ChangeCurve />
              <div className="vmgrid" aria-label="A változás útja négy lépésben">
                {valtozasService.problems.map((step, index) => (
                  <ScrollReveal className="vstep" key={step.slice(0, 24)}>
                    <span className="num">{String(index + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                  </ScrollReveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="chapter" id="coaching">
        <div className="wrap">
          <div className="ch-head">
            <h2 className="ch-big">
              Üzleti edzés, <b>coaching</b>
            </h2>
          </div>
          <div className="co-grid">
            <ScrollReveal as="p" className="co-lead">
              <span className="strong">{page.coaching.leadStrong}</span>
              {page.coaching.leadRest}
            </ScrollReveal>
            <ScrollReveal className="chairs">
              <div className="co-photo">
                <img src={coachingPhoto} alt="Coaching" loading="lazy" decoding="async" />
              </div>
            </ScrollReveal>
          </div>
          <div className="duo">
            {page.coaching.cards.map((card) => (
              <ScrollReveal as="article" className="card" key={card.title}>
                <h3>{card.title}</h3>
                {card.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ClientClose
        kicker={page.close.kicker}
        title={page.close.title}
        btnLabel={page.close.cta}
        btnTo={page.close.link}
      />
    </>
  );
}
