import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChangeFrameworkStrip from '../../components/consulting/ChangeFrameworkStrip';
import InnerPageHero from '../../components/pages/InnerPageHero';
import PageCta from '../../components/pages/PageCta';
import PageSection from '../../components/pages/PageSection';
import SectionShell from '../../components/shell/SectionShell';
import SectionLabel from '../../components/typography/SectionLabel';
import StrategicDiagram from '../../components/atmosphere/StrategicDiagram';
import { StaggerItem } from '../../components/pages/StaggerReveal';
import {
  tanacsadasAreas,
  tanacsadasCulture,
  tanacsadasHero,
  tanacsadasQuote,
} from '../../content/tanacsadas';
import './tanacsadas.css';

export default function TanacsadasPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    const segment = pathname.split('/').pop();
    if (segment && segment !== 'tanacsadas') {
      const el = document.getElementById(segment);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pathname]);

  return (
    <div className="page tanacsadas-page">
      <InnerPageHero
        label={tanacsadasHero.label}
        title={tanacsadasHero.title}
        intro={tanacsadasHero.intro}
        accent="strategic"
      />

      <PageSection tone="warm-white">
        <figure className="page-editorial-quote tanacsadas-quote">
          <blockquote>„{tanacsadasQuote.text}"</blockquote>
          <figcaption>— {tanacsadasQuote.author}</figcaption>
        </figure>
      </PageSection>

      <SectionShell tone="graphite" density="default">
        <div className="content-wrap tanacsadas-framework">
          <SectionLabel>Módszertan</SectionLabel>
          <h2 className="tanacsadas-framework__title">A változás keretrendszere</h2>
          <ChangeFrameworkStrip />
          <div className="tanacsadas-framework__diagram">
            <StrategicDiagram />
          </div>
        </div>
      </SectionShell>

      {tanacsadasAreas.map((area, i) => (
        <PageSection
          key={area.id}
          tone={i % 2 === 0 ? 'stone' : 'warm-white'}
          id={area.id}
          accent={i % 2 === 0}
        >
          <StaggerItem>
            <div className={`tanacsadas-area__grid${i % 2 === 1 ? ' tanacsadas-area__grid--reverse' : ''}`}>
              <div className="tanacsadas-area__copy">
                <SectionLabel>{area.label}</SectionLabel>
                <h2 className="page-section__title">{area.question}</h2>
                <p className="page-section__lead">{area.text}</p>
                <span className="tanacsadas-area__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="tanacsadas-area__visual">
                <img src={area.illustration} alt="" aria-hidden="true" loading="lazy" />
              </div>
            </div>
          </StaggerItem>
        </PageSection>
      ))}

      <PageSection tone="green-forest" title={tanacsadasCulture.title} accent>
        <div className="tanacsadas-culture page-prose">
          {tanacsadasCulture.paragraphs.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>
      </PageSection>

      <SectionShell tone="green-deep">
        <div className="content-wrap">
          <PageCta
            title="Kérjen személyes konzultációt"
            text="Beszéljük meg szervezete fejlesztési igényeit — emberközpontú megközelítéssel."
            cta="Kapcsolatfelvétel"
            link="/kapcsolat"
          />
        </div>
      </SectionShell>
    </div>
  );
}
