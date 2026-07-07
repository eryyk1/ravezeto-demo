import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ease = [0.22, 1, 0.36, 1] as const;

type PageRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function PageReveal({ children, className = '', delay = 0 }: PageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.75, ease, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

type StaggerGridProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerGrid({ children, className = '' }: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-6%' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView || reduced ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : 0.07 } },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
