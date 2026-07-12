import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import { partnerLogos, referenceClientLogos } from '../../content/partners';
import { referenciakHero } from '../../content/referenciak';
import './referenciak.css';

export default function ReferenciakPage() {
  return (
    <div className="page referenciak-page">
      <InnerPageHero
        label={referenciakHero.label}
        title={referenciakHero.title}
        accent="cases"
      />

      <PageSection tone="warm-white" label="Partnereink" title="Ügyfeleink és partnereink" accent>
        <StaggerGrid className="referenciak-logo-wall">
          {referenceClientLogos.map((item) => (
            <StaggerItem key={item.slug} className="referenciak-logo-wall__item">
              <img src={item.logo} alt={item.name} loading="lazy" />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>

      <PageSection tone="stone" label="Intézményi partnerek" title="Együttműködő partnereink">
        <StaggerGrid className="referenciak-partners">
          {partnerLogos.map((partner) => (
            <StaggerItem key={partner.slug} className="referenciak-partners__item">
              <img src={partner.logo} alt={partner.name} loading="lazy" />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>
    </div>
  );
}
