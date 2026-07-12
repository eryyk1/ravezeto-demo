import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { mentallyCta } from '../../pages/mentally/mentallyContent';
import './MentallyCta.css';

const ease = [0.22, 1, 0.36, 1] as const;

type MentallyCtaProps = {
  section: typeof mentallyCta;
};

export default function MentallyCta({ section }: MentallyCtaProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="mentally-cta"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.75, ease }}
    >
      <div className="mentally-cta__inner">
        <h2 className="mentally-cta__title">{section.title}</h2>
        <p className="mentally-cta__lead">{section.lead}</p>
        <a
          href={section.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mentally-cta__button"
        >
          <span className="mentally-cta__button-label">{section.button}</span>
          <span className="mentally-cta__button-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </motion.div>
  );
}
