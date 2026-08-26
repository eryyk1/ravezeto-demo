import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ClientClose from '../../components/client/ClientClose';
import ContentPhotoSlot from '../../components/client/ContentPhotoSlot';
import GoldMark from '../../components/client/GoldMark';
import HeroLines from '../../components/client/HeroLines';
import ScrollReveal from '../../components/client/ScrollReveal';
import {
  tanacsadasClose,
  tanacsadasCoaching,
  tanacsadasHero,
  tanacsadasMotto,
  tanacsadasQuote,
  tanacsadasServices,
  tanacsadasSzervezetfejlesztes,
} from '../../content/tanacsadas';
import { useTeamMembers } from '../../services/content/useContent';

const VALID_ANCHORS = new Set<string>(tanacsadasServices.map((s) => s.id));

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

function BandPhoto({ label }: { label: string }) {
  return <ContentPhotoSlot placeholder={label} alt="" />;
}

export default function TanacsadasPage() {
  const coachingPhoto = useCoachingPhoto();
  const { pathname } = useLocation();
  const valtozasService = tanacsadasServices.find((s) => s.id === 'valtozasmenedzsment');

  useEffect(() => {
    const segment = pathname.split('/').filter(Boolean).pop();
    if (segment && segment !== 'tanacsadas' && VALID_ANCHORS.has(segment)) {
      const el = document.getElementById(segment);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pathname]);

  return (
    <>
      <section className="hero-sub">
        <HeroLines />
        <div className="wrap">
          <div className="kicker">{tanacsadasHero.label}</div>
          <h1>
            Egyetlen szervezetfejlesztés sem lehet sikeres a változást támogató vezetők és{' '}
            <GoldMark>munkatársak</GoldMark> nélkül.
          </h1>
          <p className="lead">{tanacsadasHero.intro}</p>
        </div>
      </section>

      <div className="aurelius-wrap">
        <div className="aurelius-sticky">
          <div className="wrap">
            <div className="kicker aurelius-label">Kétezer éves üzenet</div>
            <p className="aurelius" id="aurelius">
              {tanacsadasQuote.text}
            </p>
            <div className="aurelius-who">{tanacsadasQuote.author}</div>
            <p className="aurelius-why">{tanacsadasQuote.note}</p>
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
            {tanacsadasSzervezetfejlesztes.punch}
          </ScrollReveal>
          <ScrollReveal className="band">
            <BandPhoto label={tanacsadasSzervezetfejlesztes.bands[0].photoLabel} />
            <div className="btxt">
              <h3>{tanacsadasSzervezetfejlesztes.bands[0].title}</h3>
              {tanacsadasSzervezetfejlesztes.bands[0].paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal className="band flip">
            <div className="btxt">
              <h3>{tanacsadasSzervezetfejlesztes.bands[1].title}</h3>
              {tanacsadasSzervezetfejlesztes.bands[1].paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <BandPhoto label={tanacsadasSzervezetfejlesztes.bands[1].photoLabel} />
          </ScrollReveal>
          <ScrollReveal as="p" className="accent-line">
            {tanacsadasMotto}
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
              <span className="strong">{tanacsadasCoaching.leadStrong}</span>
              {tanacsadasCoaching.leadRest}
            </ScrollReveal>
            <ScrollReveal className="chairs">
              <div className="co-photo">
                <img src={coachingPhoto} alt="Coaching" loading="lazy" decoding="async" />
              </div>
            </ScrollReveal>
          </div>
          <div className="duo">
            {tanacsadasCoaching.cards.map((card) => (
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
        kicker={tanacsadasClose.kicker}
        title={tanacsadasClose.title}
        btnLabel={tanacsadasClose.cta}
        btnTo={tanacsadasClose.link}
      />
    </>
  );
}
