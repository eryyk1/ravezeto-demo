import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import GrantsInternational from '../../components/grants/GrantsInternational';
import GrantsStatus from '../../components/grants/GrantsStatus';
import {
  palyazatokConsulting,
  palyazatokHero,
  palyazatokInternational,
  palyazatokStatusMessage,
} from './palyazatokContent';
import './palyazatok.css';

export default function PalyazatokPage() {
  return (
    <div className="page palyazatok-page">
      <InnerPageHero
        label={palyazatokHero.label}
        title={palyazatokHero.title}
        accent="official"
      />

      <PageSection tone="warm-white" label="Aktuális helyzet" accent>
        <GrantsStatus message={palyazatokStatusMessage} />
      </PageSection>

      <PageSection
        tone="stone"
        label={palyazatokConsulting.label}
        title={palyazatokConsulting.title}
        accent
      >
        <div className="page-prose palyazatok-consulting">
          {palyazatokConsulting.paragraphs.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>
      </PageSection>

      <div className="page-divider" aria-hidden="true">
        <span className="page-divider__mark" />
      </div>

      <PageSection
        tone="warm-white"
        label={palyazatokInternational.label}
        title={palyazatokInternational.title}
        accent
      >
        <GrantsInternational section={palyazatokInternational} />
      </PageSection>
    </div>
  );
}
