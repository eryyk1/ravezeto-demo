import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import SectionShell from '../../components/shell/SectionShell';
import {
  palyazatokConsulting,
  palyazatokEu,
  palyazatokHero,
  palyazatokNoOpenGrants,
} from '../../content/palyazatok';
import './palyazatok.css';

export default function PalyazatokPage() {
  return (
    <div className="page palyazatok-page">
      <InnerPageHero
        label={palyazatokHero.label}
        title={palyazatokHero.title}
        intro={palyazatokHero.intro || undefined}
        accent="official"
      />

      <PageSection tone="warm-white" label={palyazatokConsulting.label} accent>
        <div className="page-prose">
          {palyazatokConsulting.paragraphs.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>
      </PageSection>

      <PageSection tone="stone" label="Pályázatok" title="Aktuális pályázataink">
        <p className="palyazatok-no-open">{palyazatokNoOpenGrants}</p>
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
