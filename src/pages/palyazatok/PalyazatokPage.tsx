import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import SectionShell from '../../components/shell/SectionShell';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import {
  palyazatokConsulting,
  palyazatokEu,
  palyazatokHero,
  palyazatokProjects,
} from '../../content/palyazatok';
import './palyazatok.css';

export default function PalyazatokPage() {
  return (
    <div className="page palyazatok-page">
      <InnerPageHero
        label={palyazatokHero.label}
        title={palyazatokHero.title}
        intro={palyazatokHero.intro}
        accent="official"
      />

      <PageSection
        tone="warm-white"
        label={palyazatokConsulting.label}
        accent
      >
        <div className="page-prose">
          {palyazatokConsulting.paragraphs.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>
      </PageSection>

      <PageSection tone="stone" label="Pályázatok" title="Aktuális pályázataink">
        <StaggerGrid className="palyazatok-projects">
          {palyazatokProjects.map((proj) => (
            <StaggerItem key={proj.title} className="palyazatok-project">
              <h3>
                <a href={proj.link} target="_blank" rel="noreferrer">
                  {proj.title}
                </a>
              </h3>
              <p className="palyazatok-project__sub">{proj.subtitle}</p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>

      <SectionShell tone="green-forest">
        <div className="content-wrap palyazatok-eu">
          <img
            src={palyazatokEu.image}
            alt={palyazatokEu.alt}
            className="palyazatok-eu__banner"
            loading="lazy"
          />
          <p>{palyazatokEu.text}</p>
        </div>
      </SectionShell>
    </div>
  );
}
