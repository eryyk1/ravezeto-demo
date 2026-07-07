import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './MeshGradient.css';

type MeshGradientProps = {
  variant?: 'green-navy' | 'green-charcoal';
  className?: string;
};

export default function MeshGradient({
  variant = 'green-navy',
  className = '',
}: MeshGradientProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`mesh-gradient mesh-gradient--${variant} ${className}`.trim()}
      aria-hidden="true"
      animate={
        reduced
          ? undefined
          : {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }
      }
      transition={
        reduced
          ? undefined
          : { duration: 20, repeat: Infinity, ease: 'linear' }
      }
    />
  );
}
