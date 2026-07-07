import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './BlueprintGrid.css';

type BlueprintGridProps = {
  animated?: boolean;
  spacing?: number;
  className?: string;
};

export default function BlueprintGrid({
  animated = false,
  spacing = 40,
  className = '',
}: BlueprintGridProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={`blueprint-grid ${animated && !reduced ? 'blueprint-grid--animated' : ''} ${className}`.trim()}
      style={
        {
          '--grid-spacing': `${spacing}px`,
        } as React.CSSProperties
      }
      aria-hidden="true"
      animate={
        animated && !reduced
          ? { opacity: [0.35, 0.55, 0.35] }
          : undefined
      }
      transition={
        animated && !reduced
          ? { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
    />
  );
}
