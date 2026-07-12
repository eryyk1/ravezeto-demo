import InnerPageHero from '../../components/pages/InnerPageHero';
import PageSection from '../../components/pages/PageSection';
import { mentallyHero, mentallyLanding } from '../../content/mentally';
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

      <PageSection
        tone="warm-white"
        label={mentallyLanding.eyebrow}
        title={mentallyLanding.title}
        accent
      >
        <div className="mentally-landing__inner">
          <div className="mentally-landing__visual">
            <img
              src={mentallyLanding.image}
              alt="Mentally"
              className="mentally-landing__image"
              loading="lazy"
            />
          </div>

          <div className="mentally-landing__copy">
            <p className="mentally-landing__description">{mentallyLanding.description}</p>
            <a
              href={mentallyLanding.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-btn premium-btn--solid mentally-landing__cta"
            >
              <span className="premium-btn__shine" aria-hidden="true" />
              <span className="premium-btn__label">{mentallyLanding.cta}</span>
              <span className="premium-btn__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
