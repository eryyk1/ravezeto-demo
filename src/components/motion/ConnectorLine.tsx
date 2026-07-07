import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ConnectorLine.css';

type Point = { x: number; y: number };

type ConnectorLineProps = {
  points: Point[];
  className?: string;
};

export default function ConnectorLine({ points, className = '' }: ConnectorLineProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-20%' });
  const reduced = useReducedMotion();
  const [path, setPath] = useState('');

  useEffect(() => {
    if (points.length < 2) return;

    const segments: string[] = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const x = p.x * 100;
      const y = p.y * 100;
      if (i === 0) {
        segments.push(`M ${x} ${y}`);
      } else {
        const prev = points[i - 1];
        const cx = ((prev.x + p.x) / 2) * 100;
        const cy = prev.y * 100 + (p.y - prev.y) * 30;
        segments.push(`Q ${cx} ${cy}, ${x} ${y}`);
      }
    }
    setPath(segments.join(' '));
  }, [points]);

  const shouldDraw = inView || reduced;

  return (
    <svg
      ref={containerRef}
      className={`connector-line ${className}`.trim()}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {path && (
        <motion.path
          className="connector-line__path"
          d={path}
          fill="none"
          stroke="var(--green-primary)"
          strokeWidth="0.35"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          initial={{ pathLength: reduced ? 1 : 0, opacity: 0.35 }}
          animate={
            shouldDraw
              ? { pathLength: 1, opacity: 0.55 }
              : { pathLength: 0, opacity: 0.35 }
          }
          transition={
            reduced
              ? { duration: 0 }
              : { pathLength: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.4 } }
          }
        />
      )}
    </svg>
  );
}
