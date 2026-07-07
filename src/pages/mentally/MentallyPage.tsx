import InnerPageHero from '../../components/pages/InnerPageHero';
import PageCta from '../../components/pages/PageCta';
import PageSection from '../../components/pages/PageSection';
import SectionShell from '../../components/shell/SectionShell';
import { StaggerGrid, StaggerItem } from '../../components/pages/StaggerReveal';
import {
  mentallyCta,
  mentallyFeatures,
  mentallyHero,
  mentallyThoughts,
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

      <PageSection tone="graphite" label="Probléma" title="Ismerős vezetői kérdések?" accent>
        <ul className="mentally-thoughts-list">
          {mentallyThoughts.map((thought, i) => (
            <li key={thought} style={{ ['--i' as string]: i }}>
              {thought}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection tone="warm-white" label="Megoldás" title="Mit csinál a Mentally?" accent>
        <div className="mentally-product">
          <div className="mentally-product__visual">
            <img src="/assets/illustrations/illust_empx_0_logo.svg" alt="Mentally" />
            <div className="mentally-product__dashboard" aria-hidden="true">
              <div className="mentally-product__dash-header">
                <span />
                <span />
                <span />
              </div>
              <div className="mentally-product__dash-body">
                <span className="mentally-product__dash-bar" style={{ ['--w' as string]: '72%' }} />
                <span className="mentally-product__dash-bar" style={{ ['--w' as string]: '58%' }} />
                <span className="mentally-product__dash-bar" style={{ ['--w' as string]: '84%' }} />
                <span className="mentally-product__dash-bar" style={{ ['--w' as string]: '45%' }} />
              </div>
            </div>
          </div>
          <div className="mentally-product__copy">
            <p className="page-section__lead">
              Online mérőeszköz, amely azonnali személyes visszajelzést ad minden munkavállalónak,
              miközben átfogó képet nyújt a vezetőknek a vállalat állapotáról.
            </p>
            <div className="mentally-flow">
              <span>Probléma</span>
              <span aria-hidden="true">→</span>
              <span>Mérés</span>
              <span aria-hidden="true">→</span>
              <span>Fejlesztés</span>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection tone="stone" label="Eredmény" title="Kinek segít, hogyan?">
        <StaggerGrid className="mentally-features">
          {mentallyFeatures.map((f) => (
            <StaggerItem key={f.title} className="mentally-features__item">
              <img src={f.icon} alt="" aria-hidden="true" />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </PageSection>

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
