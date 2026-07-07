import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './TransformationRoadmap.css';

type Reason = {
  title: string;
  text: string;
};

type TransformationRoadmapProps = {
  reasons: readonly Reason[];
};

/**
 * Signature homepage moment — executive transformation process wall.
 * Six partnership phases from original company content.
 */
export default function TransformationRoadmap({ reasons }: TransformationRoadmapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="transformation-roadmap" role="list">
      <div className="transformation-roadmap__spine" aria-hidden="true">
        <motion.div
          className="transformation-roadmap__spine-fill"
          initial={{ scaleY: 0 }}
          animate={inView || reduced ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: reduced ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {reasons.map((reason, i) => (
        <motion.article
          key={reason.title}
          className={`transformation-roadmap__stage transformation-roadmap__stage--${i % 2 === 0 ? 'left' : 'right'}`}
          role="listitem"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            delay: reduced ? 0 : 0.15 + i * 0.08,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="transformation-roadmap__node" aria-hidden="true">
            <span>{String(i + 1).padStart(2, '0')}</span>
          </div>
          <div className="transformation-roadmap__card">
            <h3 className="transformation-roadmap__title">{reason.title}</h3>
            <p className="transformation-roadmap__text">{reason.text}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
