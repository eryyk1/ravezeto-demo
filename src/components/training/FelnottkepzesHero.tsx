import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import DisplayHeading from '../typography/DisplayHeading';
import SectionLabel from '../typography/SectionLabel';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './FelnottkepzesHero.css';

type FelnottkepzesHeroProps = {
  label: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function FelnottkepzesHero({
  label,
  title,
  intro,
  image,
  imageAlt,
}: FelnottkepzesHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const reduced = useReducedMotion();

  return (
    <header ref={ref} className="felnottkepzes-hero">
      <div className="felnottkepzes-hero__bg" aria-hidden="true" />
      <div className="content-wrap felnottkepzes-hero__grid">
        <motion.div
          className="felnottkepzes-hero__copy"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.8, ease, delay: reduced ? 0 : 0.1 }}
        >
          <SectionLabel>{label}</SectionLabel>
          <DisplayHeading as="h1">{title}</DisplayHeading>
          <p className="felnottkepzes-hero__badge">{intro}</p>
        </motion.div>

        <motion.figure
          className="felnottkepzes-hero__media"
          initial={reduced ? false : { opacity: 0, scale: 1.03 }}
          animate={inView || reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.9, ease, delay: reduced ? 0 : 0.25 }}
        >
          <img src={image} alt={imageAlt} loading="eager" decoding="async" />
        </motion.figure>
      </div>
    </header>
  );
}
