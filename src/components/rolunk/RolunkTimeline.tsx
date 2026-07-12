import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { rolunkTimeline } from '../../content/rolunk';
import './RolunkTimeline.css';

type RolunkTimelineProps = {
  items: typeof rolunkTimeline.items;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function RolunkTimeline({ items }: RolunkTimelineProps) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const reduced = useReducedMotion();

  return (
    <ol ref={ref} className="rolunk-timeline">
      {items.map((item, index) => (
        <motion.li
          key={`${item.year}-${item.title}`}
          className="rolunk-timeline__item"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.65, ease, delay: reduced ? 0 : index * 0.08 }}
        >
          <span className="rolunk-timeline__year">{item.year}</span>
          <div className="rolunk-timeline__body">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
          <motion.span
            className="rolunk-timeline__line"
            aria-hidden="true"
            initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
            animate={inView || reduced ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.8, ease, delay: reduced ? 0 : 0.15 + index * 0.08 }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.li>
      ))}
    </ol>
  );
}
