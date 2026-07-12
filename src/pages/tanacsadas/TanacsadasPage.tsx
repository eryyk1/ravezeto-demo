import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ConsultingFramework from '../../components/consulting/ConsultingFramework';
import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import {
  tanacsadasCoaching,
  tanacsadasCultureSections,
  tanacsadasHero,
  tanacsadasMotto,
  tanacsadasQuote,
} from '../../content/tanacsadas';
import { tanacsadasFramework } from '../../content/tanacsadasFramework';
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
          <figcaption>
            — {tanacsadasQuote.author}
            <p>{tanacsadasQuote.note}</p>
          </figcaption>
        </figure>
      </PageSection>

      <PageSection tone="stone" label="Szervezetfejlesztés" accent>
        <div className="tanacsadas-culture page-prose">
          {tanacsadasCultureSections.map((section) => (
            <div key={section.title} className="tanacsadas-culture__block">
              <h3>{section.title}</h3>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection tone="warm-white">
        <blockquote className="tanacsadas-motto">{tanacsadasMotto}</blockquote>
      </PageSection>

      <PageSection
        tone="graphite"
        label={tanacsadasFramework.label}
        title={tanacsadasFramework.title}
        lead={tanacsadasFramework.intro}
        accent
        id="valtozasmenedzsment"
      >
        <ConsultingFramework />
      </PageSection>

      <PageSection
        tone="stone"
        label="Coaching"
        title={tanacsadasCoaching.title}
        accent
        id="coaching"
      >
        <div className="tanacsadas-culture page-prose">
          {tanacsadasCoaching.sections.map((section) => (
            <div key={section.heading} className="tanacsadas-culture__block">
              <h3>{section.heading}</h3>
              <p>{section.text}</p>
            </div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
