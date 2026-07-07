import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './StatDisplay.css';

type StatDisplayProps = {
  value: number;
  suffix?: string;
  label: string;
  index?: number;
};

export default function StatDisplay({
  value,
  suffix = '',
  label,
  index = 0,
}: StatDisplayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value, reduced]);

  return (
    <motion.div
      ref={ref}
      className="stat-display"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="stat-display__value">
        {display}
        {suffix && <span className="stat-display__suffix">{suffix}</span>}
      </span>
      <span className="stat-display__label">{label}</span>
    </motion.div>
  );
}
