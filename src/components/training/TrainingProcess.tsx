import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { felnottkepzesProcess } from '../../content/felnottkepzes';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './TrainingProcess.css';

type TrainingProcessProps = {
  process: typeof felnottkepzesProcess;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function TrainingProcess({ process }: TrainingProcessProps) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const reduced = useReducedMotion();

  return (
    <ol ref={ref} className="training-process">
      {process.steps.map((step, index) => (
        <motion.li
          key={step.id}
          className="training-process__step"
          initial={reduced ? false : { opacity: 0, x: index % 2 === 0 ? -16 : 16 }}
          animate={inView || reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -16 : 16 }}
          transition={{ duration: 0.6, ease, delay: reduced ? 0 : index * 0.08 }}
        >
          <div className="training-process__marker">
            <span className="training-process__num">{step.step}</span>
            {index < process.steps.length - 1 && (
              <motion.span
                className="training-process__line"
                aria-hidden="true"
                initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
                animate={inView || reduced ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.7, ease, delay: reduced ? 0 : 0.2 + index * 0.08 }}
                style={{ transformOrigin: 'top' }}
              />
            )}
          </div>
          <div className="training-process__body">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
