import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import KapcsolatDetails from '../../components/kapcsolat/KapcsolatDetails';
import KapcsolatForm from '../../components/kapcsolat/KapcsolatForm';
import KapcsolatMap from '../../components/kapcsolat/KapcsolatMap';
import {
  kapcsolatDetails,
  kapcsolatForm,
  kapcsolatHero,
  kapcsolatMapEmbed,
} from './kapcsolatContent';
import './kapcsolat.css';

export default function KapcsolatPage() {
  return (
    <div className="page kapcsolat-page">
      <InnerPageHero
        label={kapcsolatHero.label}
        title={kapcsolatHero.title}
        intro={kapcsolatHero.intro}
        accent="contact"
      />

      <PageSection tone="warm-white" label="Elérhetőség" title="Kapcsolattartási adatok" accent>
        <KapcsolatDetails blocks={kapcsolatDetails} />
      </PageSection>

      <PageSection
        tone="stone"
        label="Kapcsolatfelvétel"
        title={kapcsolatForm.title}
        id="kapcsolat-form"
        accent
      >
        <div className="kapcsolat-form-layout">
          <KapcsolatMap embedUrl={kapcsolatMapEmbed} />
          <KapcsolatForm config={kapcsolatForm} />
        </div>
      </PageSection>
    </div>
  );
}
