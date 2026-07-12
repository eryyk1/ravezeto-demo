import ReferenciakHero from '../../components/references/ReferenciakHero';
import ReferenceFeatured from '../../components/references/ReferenceFeatured';
import ReferencePortfolio from '../../components/references/ReferencePortfolio';
import ReferenceQuotes from '../../components/references/ReferenceQuotes';
import PageCta from '../../components/pages/PageCta';
import PageSection from '../../components/pages/PageSection';
import {
  referenciakCta,
  referenciakFeaturedCount,
  referenciakFilters,
  referenciakHero,
  referenciakQuotes,
  referenciakYearGroups,
} from '../../content/referenciak';
import './referenciak.css';

const featuredReferences = referenciakYearGroups[0].items.slice(0, referenciakFeaturedCount);

export default function ReferenciakPage() {
  return (
    <div className="page referenciak-page">
      <ReferenciakHero
        label={referenciakHero.label}
        title={referenciakHero.title}
        intro={referenciakHero.intro}
        image={referenciakHero.image}
        imageAlt={referenciakHero.imageAlt}
      />

      <PageSection
        tone="warm-white"
        label="Kiemelt partnereink"
        title="Legfrissebb együttműködéseink"
        lead="A jelenlegi weboldalon előre kerülő partnerek — a 2025-ös frissített logólista sorrendje szerint."
        accent
      >
        <ReferenceFeatured items={featuredReferences} />
      </PageSection>

      <PageSection tone="stone" label="Partnereink mondták" title="Megbízható együttműködések">
        <ReferenceQuotes quotes={referenciakQuotes} />
      </PageSection>

      <div className="page-divider" aria-hidden="true">
        <span className="page-divider__mark" />
      </div>

      <PageSection tone="warm-white" label="Partnereink" title="Ügyfeleink és partnereink" accent>
        {referenciakYearGroups.map((group) => (
          <ReferencePortfolio
            key={group.year}
            year={group.year}
            label={group.label}
            items={group.items}
            filters={referenciakFilters}
          />
        ))}
      </PageSection>

      <PageSection tone="green-forest">
        <PageCta
          title={referenciakCta.title}
          text={referenciakCta.text}
          cta={referenciakCta.cta}
          link={referenciakCta.link}
        />
      </PageSection>
    </div>
  );
}
