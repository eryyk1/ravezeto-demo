import siteContent from '../data/siteContent.json';
import { PageHero, ContentSection } from '../components/PageSections';
import { logoImages } from '../data/assets';

export default function ReferencesPage() {
  const logosWithImages = siteContent.logos.filter((logo) => logoImages[logo.slug]);

  return (
    <div className="references-page">
      <PageHero
        title="Referenciák"
        subtitle="Cégünk teljesítményének értékét ügyfeleink véleménye, elégedettsége határozza meg. Büszkék vagyunk partnereink bizalmára!"
        accent="brown"
      />

      <section className="logo-grid-section">
        <h2>Partnereink</h2>
        <div className="logo-grid">
          {logosWithImages.map((logo) => (
            <div key={logo.id} className="logo-card">
              <img src={logoImages[logo.slug]} alt={logo.name} loading="lazy" />
              <span>{logo.name}</span>
            </div>
          ))}
          {siteContent.logos
            .filter((logo) => !logoImages[logo.slug])
            .slice(0, 12)
            .map((logo) => (
              <div key={logo.id} className="logo-card text-only">
                <span>{logo.name}</span>
              </div>
            ))}
        </div>
      </section>

      <ContentSection title="Referencia kategóriák">
        <div className="reference-categories">
          <img src="/assets/illustrations/illust_inner_references_government.svg" alt="" aria-hidden="true" />
          <img src="/assets/illustrations/illust_inner_references_economic.svg" alt="" aria-hidden="true" />
          <img src="/assets/illustrations/illust_inner_references_highereducation.svg" alt="" aria-hidden="true" />
        </div>
        <ul className="feature-list">
          <li>Kormányzati és közigazgatási szektor</li>
          <li>Gazdasági szervezetek</li>
          <li>Felsőoktatás</li>
          <li>Önkormányzatok</li>
          <li>Nemzetközi projektek</li>
        </ul>
      </ContentSection>
    </div>
  );
}
