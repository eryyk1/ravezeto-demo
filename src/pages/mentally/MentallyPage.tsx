import InnerPageHero from '../../components/pages/InnerPageHero';
import PageCta from '../../components/pages/PageCta';
import PageSection from '../../components/pages/PageSection';
import SectionShell from '../../components/shell/SectionShell';
import {
  mentallyCta,
  mentallyHero,
  mentallyProduct,
  mentallyProductImage,
  mentallySections,
  mentallyThoughts,
  mentallyThoughtsIntro,
} from '../../content/mentally';
import './mentally.css';

export default function MentallyPage() {
  return (
    <div className="page mentally-page">
      <InnerPageHero
        label={mentallyHero.label}
        title={mentallyHero.title}
        intro={mentallyHero.intro}
        tone="deep"
        accent="product"
      />

      <PageSection tone="warm-white" label={mentallyProduct.title} accent>
        <div className="mentally-product">
          <img
            src={mentallyProductImage}
            alt="Mentally termék"
            className="mentally-product__image"
            loading="lazy"
          />
          <div className="mentally-product__copy">
            {mentallyProduct.paragraphs.map((p) => (
              <p key={p.slice(0, 30)} className="page-section__lead">
                {p}
              </p>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection tone="graphite" title={mentallyThoughtsIntro} accent>
        <ul className="mentally-thoughts-list">
          {mentallyThoughts.map((thought, i) => (
            <li key={thought} style={{ ['--i' as string]: i }}>
              {thought}
            </li>
          ))}
        </ul>
      </PageSection>

      {mentallySections.map((section) => (
        <PageSection
          key={section.label}
          tone="stone"
          label={section.label}
          title={section.title || undefined}
          accent
        >
          <img
            src={section.image}
            alt={section.title || section.label}
            className="mentally-section__image"
            loading="lazy"
          />
        </PageSection>
      ))}

      <SectionShell tone="green-deep">
        <div className="content-wrap">
          <PageCta
            title={mentallyCta.title}
            text={mentallyCta.text}
            cta={mentallyCta.cta}
            link={mentallyCta.link}
          />
        </div>
      </SectionShell>
    </div>
  );
}
