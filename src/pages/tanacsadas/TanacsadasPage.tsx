import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ConsultingFramework from '../../components/consulting/ConsultingFramework';
import ConsultingProcess from '../../components/consulting/ConsultingProcess';
import ConsultingServices from '../../components/consulting/ConsultingServices';
import TanacsadasHero from '../../components/consulting/TanacsadasHero';
import PageCta from '../../components/pages/PageCta';
import PageSection from '../../components/pages/PageSection';
import {
  tanacsadasCta,
  tanacsadasHero,
  tanacsadasMotto,
  tanacsadasProcess,
  tanacsadasQuote,
  tanacsadasServices,
} from '../../content/tanacsadas';
import { tanacsadasFramework } from '../../content/tanacsadasFramework';
import './tanacsadas.css';

const VALID_ANCHORS = new Set<string>(tanacsadasServices.map((s) => s.id));

export default function TanacsadasPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    const segment = pathname.split('/').filter(Boolean).pop();
    if (segment && segment !== 'tanacsadas' && VALID_ANCHORS.has(segment)) {
      const el = document.getElementById(segment);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pathname]);

  return (
    <div className="page tanacsadas-page">
      <TanacsadasHero
        label={tanacsadasHero.label}
        title={tanacsadasHero.title}
        intro={tanacsadasHero.intro}
        image={tanacsadasHero.image}
        imageAlt={tanacsadasHero.imageAlt}
      />

      <PageSection tone="stone">
        <figure className="page-editorial-quote tanacsadas-quote">
          <blockquote>„{tanacsadasQuote.text}"</blockquote>
          <figcaption>
            — {tanacsadasQuote.author}
            <p>{tanacsadasQuote.note}</p>
          </figcaption>
        </figure>
      </PageSection>

      <PageSection tone="warm-white" label="Szolgáltatások" title="Tanácsadási területeink" accent>
        <ConsultingServices services={tanacsadasServices} />
      </PageSection>

      <PageSection tone="stone">
        <blockquote className="tanacsadas-motto">{tanacsadasMotto}</blockquote>
      </PageSection>

      <div className="page-divider" aria-hidden="true">
        <span className="page-divider__mark" />
      </div>

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
        tone="warm-white"
        label={tanacsadasProcess.label}
        title={tanacsadasProcess.title}
        lead={tanacsadasProcess.lead}
        accent
      >
        <ConsultingProcess process={tanacsadasProcess} />
      </PageSection>

      <PageSection tone="green-forest">
        <PageCta
          title={tanacsadasCta.title}
          text={tanacsadasCta.text}
          cta={tanacsadasCta.cta}
          link={tanacsadasCta.link}
        />
      </PageSection>
    </div>
  );
}
