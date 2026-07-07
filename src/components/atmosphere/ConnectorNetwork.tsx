import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ConnectorNetwork.css';

const NODES = [
  { x: 15, y: 20 },
  { x: 85, y: 15 },
  { x: 50, y: 45 },
  { x: 20, y: 70 },
  { x: 75, y: 65 },
  { x: 45, y: 88 },
  { x: 90, y: 85 },
];

const EDGES: [number, number][] = [
  [0, 2],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [2, 5],
];

type ConnectorNetworkProps = {
  className?: string;
  animate?: boolean;
};

export default function ConnectorNetwork({
  className = '',
  animate = true,
}: ConnectorNetworkProps) {
  const reduced = useReducedMotion();

  return (
    <svg
      className={`connector-network ${className}`.trim()}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {EDGES.map(([a, b], i) => {
        const n1 = NODES[a];
        const n2 = NODES[b];
        return (
          <motion.line
            key={`${a}-${b}`}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="rgba(42,107,82,0.15)"
            strokeWidth="0.15"
            initial={{ opacity: 0 }}
            whileInView={animate && !reduced ? { opacity: 0.5 } : { opacity: 0.25 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.8 }}
          />
        );
      })}
      {NODES.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="0.8"
          fill="var(--green-primary)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.35, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}
