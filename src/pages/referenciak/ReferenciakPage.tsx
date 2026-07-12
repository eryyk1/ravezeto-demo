import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import ReferenceFeatured from '../../components/references/ReferenceFeatured';
import ReferencePortfolio from '../../components/references/ReferencePortfolio';
import ReferenceQuotes from '../../components/references/ReferenceQuotes';
import {
  referenciakFeaturedCount,
  referenciakFilters,
  referenciakHero,
  referenciakQuotes,
  referenciakYearGroups,
} from './referenciakContent';
import './referenciak.css';

const featuredReferences = referenciakYearGroups[0].items.slice(0, referenciakFeaturedCount);

export default function ReferenciakPage() {
  return (
    <div className="page referenciak-page">
      <InnerPageHero
        label={referenciakHero.label}
        title={referenciakHero.title}
        accent="cases"
      />

      <PageSection
        tone="warm-white"
        label="Kiemelt partnereink"
        title="Legfrissebb együttműködéseink"
        lead="A jelenlegi weboldalon előre kerülő partnerek — 2025-ös frissített logólista szerint."
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
    </div>
  );
}
