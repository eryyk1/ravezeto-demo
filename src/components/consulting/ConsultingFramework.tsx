import { motion } from 'framer-motion';
import { tanacsadasFramework } from '../../content/tanacsadasFramework';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SectionLabel from '../typography/SectionLabel';
import './ConsultingFramework.css';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ConsultingFramework() {
  const reduced = useReducedMotion();

  return (
    <section className="consulting-framework" aria-labelledby="consulting-framework-title">
      <div className="content-wrap">
        <header className="consulting-framework__head">
          <SectionLabel>{tanacsadasFramework.label}</SectionLabel>
          <h2 id="consulting-framework-title" className="consulting-framework__title">
            {tanacsadasFramework.title}
          </h2>
          <p className="consulting-framework__intro">{tanacsadasFramework.intro}</p>
        </header>

        <ol className="consulting-framework__steps">
          {tanacsadasFramework.steps.map((step, i) => (
            <motion.li
              key={step.id}
              className="consulting-framework__step"
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
            >
              <div className="consulting-framework__marker">
                <span className="consulting-framework__num">{step.step}</span>
                {i < tanacsadasFramework.steps.length - 1 && (
                  <span className="consulting-framework__line" aria-hidden="true" />
                )}
              </div>

              <div className="consulting-framework__body">
                <div className="consulting-framework__top">
                  <h3>{step.title}</h3>
                  <span>{step.subtitle}</span>
                </div>
                <p className="consulting-framework__summary">{step.summary}</p>
                {'detail' in step && step.detail && (
                  <p className="consulting-framework__detail">{step.detail}</p>
                )}
                {'pillars' in step && step.pillars && (
                  <ul className="consulting-framework__pillars">
                    {step.pillars.map((pillar) => (
                      <li key={pillar}>{pillar}</li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
