import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  'aria-label'?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  id,
  'aria-label': ariaLabel,
}: SectionRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const reduced = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 36 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.8, ease, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.section>
  );
}
