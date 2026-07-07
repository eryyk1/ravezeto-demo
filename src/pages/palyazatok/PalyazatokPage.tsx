import InnerPageHero from '../../components/pages/InnerPageHero';
import PageCta from '../../components/pages/PageCta';
import PageSection from '../../components/pages/PageSection';
import SectionShell from '../../components/shell/SectionShell';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import {
  palyazatokEu,
  palyazatokHero,
  palyazatokIntro,
  palyazatokProcess,
  palyazatokProjects,
  palyazatokServices,
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

      <PageSection tone="warm-white" accent>
        <p className="page-section__lead palyazatok-intro">{palyazatokIntro}</p>
        <ul className="palyazatok-services">
          {palyazatokServices.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </PageSection>

      <PageSection tone="stone" label="Folyamat" title="Pályázati támogatás lépései">
        <ol className="palyazatok-process">
          {palyazatokProcess.map((step) => (
            <li key={step.step}>
              <span className="palyazatok-process__num">{step.step}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </PageSection>

      <PageSection tone="warm-white" label="Projektek" title="Támogatott projektjeink">
        <StaggerGrid className="palyazatok-projects">
          {palyazatokProjects.map((proj) => (
            <StaggerItem key={proj.title} className="palyazatok-project">
              <h3>{proj.title}</h3>
              <p className="palyazatok-project__sub">{proj.subtitle}</p>
              <p>{proj.text}</p>
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

      <SectionShell tone="green-deep">
        <div className="content-wrap">
          <PageCta
            title="Pályázati tanácsadás"
            text="Beszéljük meg, hogyan tudunk segíteni uniós vagy hazai forrásból."
            cta="Kapcsolatfelvétel"
            link="/kapcsolat"
          />
        </div>
      </SectionShell>
    </div>
  );
}
