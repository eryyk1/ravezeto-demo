import ClientClose from '../../components/client/ClientClose';
import GoldMark from '../../components/client/GoldMark';
import HeroWatermark from '../../components/client/HeroWatermark';
import ScrollReveal from '../../components/client/ScrollReveal';
import {
  referenciakCta,
  referenciakHero,
  referenciakStats,
} from '../../content/referenciak';
import { usePartners, useReferences } from '../../services/content/useContent';
import LogoFlow from './LogoFlow';
import TestimonialDeck from './TestimonialDeck';

export default function ReferenciakPage() {
  const partners = usePartners(true);
  const references = useReferences(true);
  const referenceClientLogos = partners.map((partner) => ({
    slug: partner.slug,
    name: partner.name,
    logo: partner.logo,
  }));
  const referenciakTestimonials = references.map((reference) => ({
    logo: reference.logo || reference.title,
    who: reference.who,
    quotes: reference.quotes,
  }));

  return (
    <>
      <section className="hero">
        <HeroWatermark />
        <div className="wrap">
          <div className="kicker">{referenciakHero.label}</div>
          <h1>
            {referenciakHero.title}{' '}
            <GoldMark>{referenciakHero.titleMark}</GoldMark>
          </h1>
          <p className="lead">{referenciakHero.lead}</p>
        </div>
      </section>

      <section className="tstats">
        <div className="wrap">
          <ScrollReveal className="grid">
            {referenciakStats.map((stat) => (
              <div className="tstat" key={stat.label}>
                <div
                  className="num"
                  data-t={stat.value}
                  data-s={stat.suffix || undefined}
                >
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="lab">{stat.label}</div>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <LogoFlow logos={referenceClientLogos} />
        </div>
      </section>

      <section className="sec-t3" id="velemenyek">
        <div className="wrap">
          <ScrollReveal as="div" className="kicker">
            Ügyfeleink mondták
          </ScrollReveal>
          <ScrollReveal as="h2" className="sec-t">
            Partnereink szavaival.
          </ScrollReveal>
          <TestimonialDeck items={referenciakTestimonials} />
        </div>
      </section>

      <ClientClose
        kicker={referenciakCta.kicker}
        title={referenciakCta.title}
        refsLine={referenciakCta.text}
        btnLabel={referenciakCta.btnLabel}
        btnTo={referenciakCta.link}
        showEuBand={false}
      />
    </>
  );
}
