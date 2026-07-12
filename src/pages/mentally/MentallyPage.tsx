import { motion } from 'framer-motion';
import InnerPageHero from '../../components/pages/InnerPageHero';
import SectionLabel from '../../components/typography/SectionLabel';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { mentallyHero, mentallyLanding } from '../../content/mentally';
import './mentally.css';

const ease = [0.22, 1, 0.36, 1] as const;

export default function MentallyPage() {
  const reduced = useReducedMotion();

  return (
    <div className="page mentally-page">
      <InnerPageHero
        label={mentallyHero.label}
        title={mentallyHero.title}
        intro={mentallyHero.intro}
        tone="deep"
        accent="product"
      />

      <section className="mentally-landing" aria-labelledby="mentally-landing-title">
        <div className="content-wrap mentally-landing__inner">
          <motion.div
            className="mentally-landing__visual"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease }}
          >
            <img
              src={mentallyLanding.image}
              alt="Mentally"
              className="mentally-landing__image"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            className="mentally-landing__copy"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <SectionLabel>{mentallyLanding.eyebrow}</SectionLabel>
            <h2 id="mentally-landing-title" className="mentally-landing__title">
              {mentallyLanding.title}
            </h2>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
