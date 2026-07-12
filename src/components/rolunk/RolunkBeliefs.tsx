import { motion } from 'framer-motion';
import { rolunkBeliefs } from '../../content/rolunkBeliefs';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { StaggerGrid, StaggerItem } from '../pages/StaggerReveal';
import SectionLabel from '../typography/SectionLabel';
import './RolunkBeliefs.css';

const ICONS: Record<string, string> = {
  diagnosis: '◎',
  bridge: '⇄',
  guide: '→',
  solution: '✦',
  crisis: '△',
  growth: '↗',
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function RolunkBeliefs() {
  const reduced = useReducedMotion();

  return (
    <section className="rolunk-beliefs" aria-labelledby="rolunk-beliefs-title">
      <div className="rolunk-beliefs__transition" aria-hidden="true" />
      <div className="content-wrap">
        <header className="rolunk-beliefs__head">
          <SectionLabel>{rolunkBeliefs.label}</SectionLabel>
          <motion.h2
            id="rolunk-beliefs-title"
            className="rolunk-beliefs__title"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease }}
          >
            {rolunkBeliefs.title}
          </motion.h2>
          <motion.p
            className="rolunk-beliefs__intro"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            {rolunkBeliefs.intro}
          </motion.p>
        </header>

        <StaggerGrid className="rolunk-beliefs__grid">
          {rolunkBeliefs.items.map((item, i) => (
            <StaggerItem key={item.id} className="rolunk-beliefs__card">
              <span className="rolunk-beliefs__icon" aria-hidden="true">
                {ICONS[item.id]}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <span className="rolunk-beliefs__index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
