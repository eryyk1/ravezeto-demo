import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { mentallyWhatIs } from '../../pages/mentally/mentallyContent';
import './MentallyAbout.css';

const ease = [0.22, 1, 0.36, 1] as const;

type MentallyAboutProps = {
  section: typeof mentallyWhatIs;
};

export default function MentallyAbout({ section }: MentallyAboutProps) {
  const reduced = useReducedMotion();

  return (
    <div className="mentally-about">
      <motion.div
        className="mentally-about__visual"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="mentally-about__brand">
          <img
            src={section.brandImage}
            alt="Mentally"
            className="mentally-about__brand-image"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="mentally-about__product">
          <img
            src={section.productImage}
            alt="Mentally termék előnézet"
            className="mentally-about__product-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>

      <motion.p
        className="mentally-about__description"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-8%' }}
        transition={{ duration: 0.7, ease, delay: reduced ? 0 : 0.1 }}
      >
        {section.description}
      </motion.p>
    </div>
  );
}
