import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientFooter from '../../components/client/ClientFooter';
import { useReferenciakPageContent, useReferences } from '../../services/content/useContent';
import LogoFlow from './LogoFlow';
import {
  REFERENCIAK_LOGO_TRACK_A,
  REFERENCIAK_LOGO_TRACK_B,
  REFERENCIAK_PARTNER_LIST,
} from './referenciakPageData';
import TestimonialDeck from './TestimonialDeck';

export default function ReferenciakBody() {
  const page = useReferenciakPageContent();
  const references = useReferences();
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);

  const testimonials = useMemo(
    () =>
      references.map((ref) => ({
        id: ref.id,
        logo: ref.title,
        who: ref.who,
        quotes: ref.quotes,
        listItems: ref.listItems,
      })),
    [references],
  );

  const stats = page.stats;

  return (
    <>
      <section className="hero">
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
            {page.hero.title}{' '}
            <span className="mark">{page.hero.titleMark}</span>
          </h1>
          <p className="lead">{page.hero.lead}</p>
        </div>
      </section>

      <section className="tstats">
        <div className="wrap">
          <div className="grid rev">
            {stats.map((stat) => (
              <div className="tstat" key={stat.label}>
                <div className="num" data-t={stat.value} data-s={stat.suffix || undefined}>
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="lab">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <LogoFlow
            forwardTrack={REFERENCIAK_LOGO_TRACK_A}
            backTrack={REFERENCIAK_LOGO_TRACK_B}
            onPartnerHover={setHoveredPartner}
          />
          <p className="partner-list rev">
            <strong>Partnereink:</strong>{' '}
            {REFERENCIAK_PARTNER_LIST.map((partner, index) => (
              <span key={partner.slug}>
                {index > 0 && ' · '}
                <span
                  className={`pn${hoveredPartner === partner.slug ? ' on' : ''}`}
                  data-p={partner.slug}
                >
                  {partner.name}
                </span>
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="sec-t3" id="velemenyek">
        <div className="wrap">
          <div className="kicker rev">Ügyfeleink mondták</div>
          <h2 className="sec-t rev">Partnereink szavaival.</h2>
          <TestimonialDeck items={testimonials} />
        </div>
      </section>

      <section className="cta-sec">
        <div className="wrap">
          <div className="cta-card rev">
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
            <div className="kicker">{page.cta.kicker}</div>
            <h2>{page.cta.title}</h2>
            <p>{page.cta.text}</p>
            <Link className="btn" to={page.cta.link}>
              {page.cta.btnLabel}
            </Link>
          </div>
        </div>
      </section>

      <ClientFooter />
    </>
  );
}
