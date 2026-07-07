import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './StrategicDiagram.css';

type StrategicDiagramProps = {
  className?: string;
};

export default function StrategicDiagram({ className = '' }: StrategicDiagramProps) {
  const reduced = useReducedMotion();

  const draw = reduced
    ? { pathLength: 1, opacity: 0.7 }
    : { pathLength: 1, opacity: 0.7 };

  return (
    <div className={`strategic-diagram ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 480 520" className="strategic-diagram__svg">
        <motion.rect
          x="40"
          y="30"
          width="400"
          height="460"
          rx="2"
          fill="none"
          stroke="rgba(247,245,242,0.12)"
          strokeWidth="1"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0.2 }}
          animate={draw}
          transition={{ duration: reduced ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.circle
          cx="240"
          cy="260"
          r="48"
          fill="rgba(42,107,82,0.08)"
          stroke="var(--green-primary)"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: reduced ? 0 : 0.5, duration: 0.5 }}
        />
        <text x="240" y="264" textAnchor="middle" className="strategic-diagram__label">
          VÁLTOZÁS
        </text>

        {[
          'M240 212 L240 120 L120 80',
          'M240 212 L240 120 L360 80',
          'M288 260 L400 260 L420 380',
          'M192 260 L80 260 L60 380',
          'M260 300 L320 420 L240 480',
          'M220 300 L160 420 L240 480',
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="rgba(161,180,85,0.45)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={draw}
            transition={{
              delay: reduced ? 0 : 0.4 + i * 0.12,
              duration: reduced ? 0 : 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {[
          { cx: 120, cy: 80, label: 'DIAGNÓZIS' },
          { cx: 360, cy: 80, label: 'STRATÉGIA' },
          { cx: 420, cy: 380, label: 'VEZETÉS' },
          { cx: 60, cy: 380, label: 'CSAPAT' },
          { cx: 320, cy: 420, label: 'FOLYAMAT' },
          { cx: 160, cy: 420, label: 'KÉPZÉS' },
        ].map((node, i) => (
          <g key={node.label}>
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r="28"
              fill="rgba(14,26,43,0.6)"
              stroke="rgba(247,245,242,0.25)"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: reduced ? 0 : 0.7 + i * 0.08, duration: 0.45 }}
            />
            <text x={node.cx} y={node.cy + 4} textAnchor="middle" className="strategic-diagram__node-label">
              {node.label}
            </text>
          </g>
        ))}

        <motion.line
          x1="40"
          y1="500"
          x2="180"
          y2="500"
          stroke="rgba(247,245,242,0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: reduced ? 0 : 1.2, duration: 0.8 }}
        />
        <text x="110" y="515" textAnchor="middle" className="strategic-diagram__dim">
          RÁVEZETÉS
        </text>
      </svg>

      {!reduced && (
        <>
          <motion.span
            className="strategic-diagram__float strategic-diagram__float--a"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="strategic-diagram__float strategic-diagram__float--b"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </>
      )}
    </div>
  );
}
