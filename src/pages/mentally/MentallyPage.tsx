import ClientClose from '../../components/client/ClientClose';
import GoldMark from '../../components/client/GoldMark';
import HeroWatermark from '../../components/client/HeroWatermark';
import ScrollReveal from '../../components/client/ScrollReveal';
import { homeContactClose } from '../../content/home';
import {
  mentallyBenefits,
  mentallyCta,
  mentallyHero,
  mentallyWhatIs,
} from './mentallyContent';
import './mentally.css';

function ChevTrio() {
  return (
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
  );
}

export default function MentallyPage() {
  const [heroLine1, heroLine2] = mentallyHero.title.split('\n');

  return (
    <>
      <section className="hero-sub">
        <HeroWatermark />
        <div className="wrap">
          <ScrollReveal as="div" className="kicker">
            {mentallyHero.label}
          </ScrollReveal>
          <ScrollReveal as="h1">
            {heroLine1}
            <br />= <GoldMark>{heroLine2.replace(/^=\s*/, '')}</GoldMark>
          </ScrollReveal>
          <ScrollReveal as="p" className="lead">
            {mentallyHero.intro}
          </ScrollReveal>
        </div>
      </section>

      <section className="sec sec-w">
        <div className="wrap">
          <ScrollReveal as="div" className="kicker">
            {mentallyWhatIs.eyebrow}
          </ScrollReveal>
          <ScrollReveal as="h2" className="sec-t">
            {mentallyWhatIs.title}
          </ScrollReveal>
          <div className="band rev">
            <div className="mentally-visual">
              <div className="photo-slot mentally-visual__brand">
                <img src={mentallyWhatIs.brandImage} alt="Mentally" loading="lazy" decoding="async" />
              </div>
              <div className="photo-slot mentally-visual__product">
                <img
                  src={mentallyWhatIs.productImage}
                  alt="Mentally termék előnézet"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div>
              <p className="mut">{mentallyWhatIs.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <ScrollReveal as="div" className="kicker">
            {mentallyBenefits.eyebrow}
          </ScrollReveal>
          <ScrollReveal as="h2" className="sec-t">
            {mentallyBenefits.title}
          </ScrollReveal>
          <div className="cards3">
            {mentallyBenefits.items.map((item, index) => (
              <ScrollReveal key={item.id} className="tcard">
                <div className="idx">{String(index + 1).padStart(2, '0')}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </ScrollReveal>
            ))}
          </div>
          <div className="duo mentally-compare">
            <ScrollReveal>
              <div className="kicker">{mentallyBenefits.comparison.beforeLabel}</div>
              <div className="photo-slot">
                <img
                  src={mentallyBenefits.comparison.beforeImage}
                  alt={mentallyBenefits.comparison.beforeLabel}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="kicker">{mentallyBenefits.comparison.afterLabel}</div>
              <div className="photo-slot">
                <img
                  src={mentallyBenefits.comparison.afterImage}
                  alt={mentallyBenefits.comparison.afterLabel}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="wrap">
          <ScrollReveal className="cta-card">
            <ChevTrio />
            <div className="kicker">Mentally</div>
            <h2>{mentallyCta.title}</h2>
            <p>{mentallyCta.lead}</p>
            <a
              href={mentallyCta.url}
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {mentallyCta.button}
            </a>
          </ScrollReveal>
        </div>
      </section>

      <ClientClose
        kicker={homeContactClose.kicker}
        title={homeContactClose.title}
        btnLabel={homeContactClose.cta}
        btnTo={homeContactClose.link}
      />
    </>
  );
}
