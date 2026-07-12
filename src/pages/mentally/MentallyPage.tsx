import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import MentallyAbout from '../../components/mentally/MentallyAbout';
import MentallyBenefits from '../../components/mentally/MentallyBenefits';
import MentallyCta from '../../components/mentally/MentallyCta';
import {
  mentallyBenefits,
  mentallyCta,
  mentallyHero,
  mentallyWhatIs,
} from './mentallyContent';
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

      <PageSection
        tone="warm-white"
        label={mentallyWhatIs.eyebrow}
        title={mentallyWhatIs.title}
        accent
      >
        <MentallyAbout section={mentallyWhatIs} />
      </PageSection>

      <div className="page-divider" aria-hidden="true">
        <span className="page-divider__mark" />
      </div>

      <PageSection
        tone="stone"
        label={mentallyBenefits.eyebrow}
        title={mentallyBenefits.title}
        accent
      >
        <MentallyBenefits section={mentallyBenefits} />
      </PageSection>

      <PageSection tone="warm-white" density="default">
        <MentallyCta section={mentallyCta} />
      </PageSection>
    </div>
  );
}
