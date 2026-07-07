import { motion } from 'framer-motion';
import './ArchitecturalLine.css';

type ArchitecturalLineProps = {
  variant?: 'horizontal' | 'diagonal';
  offset?: string;
  className?: string;
  animate?: boolean;
};

export default function ArchitecturalLine({
  variant = 'horizontal',
  offset = '10%',
  className = '',
  animate = true,
}: ArchitecturalLineProps) {
  return (
    <motion.div
      className={`arch-line arch-line--${variant} ${className}`.trim()}
      style={{ '--arch-offset': offset } as React.CSSProperties}
      aria-hidden="true"
      initial={animate ? { scaleX: 0, opacity: 0 } : false}
      whileInView={animate ? { scaleX: 1, opacity: 1 } : undefined}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
