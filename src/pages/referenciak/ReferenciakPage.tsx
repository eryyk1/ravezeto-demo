import ClientClose from '../../components/client/ClientClose';
import GoldMark from '../../components/client/GoldMark';
import HeroWatermark from '../../components/client/HeroWatermark';
import ScrollReveal from '../../components/client/ScrollReveal';
import {
  usePartners,
  useReferences,
  useReferenciakPageContent,
} from '../../services/content/useContent';
import LogoFlow from './LogoFlow';
import TestimonialDeck from './TestimonialDeck';

export default function ReferenciakPage() {
  const partners = usePartners(true);
  const references = useReferences(true);
  const page = useReferenciakPageContent();
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
          <div className="kicker">{page.hero.label}</div>
          <h1>
            {page.hero.title}{' '}
            <GoldMark>{page.hero.titleMark}</GoldMark>
          </h1>
          <p className="lead">{page.hero.lead}</p>
        </div>
      </section>

      <section className="tstats">
        <div className="wrap">
          <ScrollReveal className="grid">
            {page.stats.map((stat) => (
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
        kicker={page.cta.kicker}
        title={page.cta.title}
        refsLine={page.cta.text}
        btnLabel={page.cta.btnLabel}
        btnTo={page.cta.link}
        showEuBand={false}
      />
    </>
  );
}
