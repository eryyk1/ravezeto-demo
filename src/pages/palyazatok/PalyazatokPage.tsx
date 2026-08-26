import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ClientFooter from '../../components/client/ClientFooter';
import GoldMark from '../../components/client/GoldMark';
import HeroWatermark from '../../components/client/HeroWatermark';
import ScrollReveal from '../../components/client/ScrollReveal';
import PalyazatokForm from './PalyazatokForm';
import PalyazatokPartners from './PalyazatokPartners';
import {
  palyazatokAbout,
  palyazatokContact,
  palyazatokDeadline,
  palyazatokFacts,
  palyazatokHero,
  palyazatokPartners,
  palyazatokSteps,
  palyazatokTopics,
} from './palyazatokContent';
import { usePartners, usePalyazatokSettings } from '../../services/content/useContent';

function KontaktChevron() {
  return (
    <svg className="k-chev" viewBox="0 0 100 120" aria-hidden="true">
      <path
        d="M14 8 L78 60 L14 112"
        fill="none"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KontaktCrown() {
  return (
    <svg className="kc-crown" viewBox="0 0 64 42" aria-hidden="true">
      <path
        d="M10 30 L17 13 L25 26 L32 8 L39 26 L47 13 L54 30 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M13 36 H51" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function DeadlineCircle() {
  return (
    <svg viewBox="0 0 220 70" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M14,36 C22,12 192,6 208,28 C220,50 156,66 62,62 C30,60 10,50 16,36"
        pathLength={300}
      />
    </svg>
  );
}

export default function PalyazatokPage() {
  const cms = usePalyazatokSettings();
  const cmsPartners = usePartners(true);
  const partnerLogos =
    cmsPartners.length > 0
      ? cmsPartners.map((partner) => ({
          slug: partner.slug,
          name: partner.name,
          logo: partner.logo,
        }))
      : palyazatokPartners.logos;

  return (
    <>
      <section className="hero">
        <HeroWatermark />
        <div className="wrap">
          <div className="kicker">{cms.heroLabel || palyazatokHero.label}</div>
          <h1>
            <span className="q1">{cms.q1 || palyazatokHero.q1}</span>
            <span className="q2">
              {cms.q2Lead || palyazatokHero.q2Lead}{' '}
              <GoldMark>{cms.q2Mark || palyazatokHero.q2Mark}</GoldMark>
            </span>
          </h1>
          <p className="lead anim">{cms.lead || palyazatokHero.lead}</p>
          <div className="cta-row anim">
            <a className="btn" href="#urlap">
              {palyazatokHero.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="deadline-sec">
        <div className="wrap">
          <ScrollReveal className="deadline">
            <span className="k">{cms.deadlineKicker || palyazatokDeadline.kicker}</span>
            <b>
              {palyazatokDeadline.label}{' '}
              <span className="circ">
                {cms.deadlineDate || palyazatokDeadline.date}
                <DeadlineCircle />
              </span>
            </b>
          </ScrollReveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <ScrollReveal as="div" className="head">
            <div className="kicker">{palyazatokTopics.label}</div>
            <h2>{palyazatokTopics.title}</h2>
          </ScrollReveal>
          <ScrollReveal className="cards3">
            {palyazatokTopics.cards.map((card, index) => (
              <article className="tcard" key={card.id}>
                <div className="idx">{String(index + 1).padStart(2, '0')}</div>
                <h3>{card.title}</h3>
                {'text' in card && card.text ? <p>{card.text}</p> : null}
                {'items' in card && card.items ? (
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <ScrollReveal as="div" className="head">
            <div className="kicker">{palyazatokFacts.label}</div>
            <h2>{palyazatokFacts.title}</h2>
          </ScrollReveal>
          <ScrollReveal className="facts">
            {palyazatokFacts.items.map((fact) => (
              <div className={`fact${'highlight' in fact && fact.highlight ? ' hl' : ''}`} key={fact.id}>
                {'value' in fact && fact.value !== undefined ? (
                  <div className="big" data-t={fact.value} data-s={fact.suffix}>
                    {fact.value}
                    {fact.suffix}
                  </div>
                ) : (
                  <div className="big">{fact.symbol}</div>
                )}
                <p>{fact.text}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <ScrollReveal className="about">
            <p>{palyazatokAbout.text}</p>
            <Link to={palyazatokAbout.link}>{palyazatokAbout.linkLabel}</Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <ScrollReveal>
            <PalyazatokPartners
              partners={partnerLogos}
              label={palyazatokPartners.label}
              referenciakLink={palyazatokPartners.link}
              referenciakLabel={palyazatokPartners.linkLabel}
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <ScrollReveal as="div" className="head">
            <div className="kicker">{palyazatokSteps.label}</div>
            <h2>{palyazatokSteps.title}</h2>
          </ScrollReveal>
          <ScrollReveal className="steps">
            {palyazatokSteps.steps.map((step, index) => (
              <Fragment key={step.slice(0, 24)}>
                {index > 0 ? (
                  <div className="ssep" aria-hidden="true" key={`sep-${index}`}>
                    &gt;
                  </div>
                ) : null}
                <div className="step" key={step.slice(0, 24)}>
                  <div className="idx">{String(index + 1).padStart(2, '0')}</div>
                  <p>{step}</p>
                </div>
              </Fragment>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="sec" id="urlap">
        <div className="wrap">
          <ScrollReveal className="duo">
            <div className="kontakt">
              <KontaktChevron />
              <KontaktCrown />
              <div className="kc">
                <span className="l1">Keep calm</span>
                <span className="l2">and</span>
                <span className="l1">
                  call <b>Rávezető</b>
                </span>
              </div>
              <div className="pwrap">
                <img
                  src={palyazatokContact.portrait}
                  alt={`${palyazatokContact.name} portréja`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h2>{palyazatokContact.name}</h2>
                <div className="role">{palyazatokContact.role}</div>
              </div>
              <div className="elms">
                E-mail:{' '}
                <a href={`mailto:${palyazatokContact.email}`}>{palyazatokContact.email}</a>
                <br />
                Telefon:{' '}
                <a href={`tel:${palyazatokContact.phoneTel}`}>{palyazatokContact.phone}</a>
              </div>
            </div>
            <PalyazatokForm />
          </ScrollReveal>
        </div>
      </section>

      <ClientFooter />
    </>
  );
}
