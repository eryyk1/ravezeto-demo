import type { ReactNode } from 'react';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import {
  homeUniverseCenter,
  homeUniverseNodes,
  homeUniverseSecondaryNodes,
} from '../../content/homeUniverse';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './HeroUniverse.css';

const ease = [0.22, 1, 0.36, 1] as const;
const CX = 50;
const CY = 50;

const ORBITAL_RINGS = [
  { rx: 38, ry: 18, opacity: 0.06, duration: 14 },
  { rx: 36, ry: 22, opacity: 0.08, duration: 16 },
  { rx: 34, ry: 26, opacity: 0.1, duration: 18 },
  { rx: 32, ry: 30, opacity: 0.12, duration: 20 },
  { rx: 30, ry: 34, opacity: 0.1, duration: 22 },
  { rx: 28, ry: 36, opacity: 0.08, duration: 24 },
  { rx: 26, ry: 38, opacity: 0.06, duration: 26 },
] as const;

const STAGE_PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 15 + ((i * 17) % 70),
  y: 12 + ((i * 23) % 76),
  size: 0.15 + (i % 3) * 0.08,
  delay: i * 0.35,
  duration: 5 + (i % 4),
}));

function polar(angleDeg: number, radiusPct: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + (radiusPct / 3.6) * Math.cos(rad),
    y: CY + (radiusPct / 3.6) * Math.sin(rad),
  };
}

const BROKEN_ARCS = [
  { rx: 40, ry: 16, dash: '1.2 2.8', rotate: 0 },
  { rx: 37, ry: 24, dash: '0.8 3.2', rotate: 12 },
  { rx: 33, ry: 32, dash: '1.5 2.2', rotate: -8 },
  { rx: 29, ry: 36, dash: '0.6 3.8', rotate: 20 },
] as const;

function sampleQuadratic(
  x1: number,
  y1: number,
  cpx: number,
  cpy: number,
  x2: number,
  y2: number,
  t: number,
) {
  const u = 1 - t;
  return {
    x: u * u * x1 + 2 * u * t * cpx + t * t * x2,
    y: u * u * y1 + 2 * u * t * cpy + t * t * y2,
  };
}

function curvedPathData(x1: number, y1: number, x2: number, y2: number, bend = 0.12) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const cpx = mx + (-dy / len) * bend * len;
  const cpy = my + (dx / len) * bend * len;
  return {
    d: `M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`,
    cpx,
    cpy,
  };
}

function NodeIcon({ type }: { type: string }) {
  const icons: Record<string, ReactNode> = {
    strategy: (
      <path d="M12 20 L20 8 L26 16 L32 6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    ),
    leadership: (
      <>
        <circle cx="22" cy="10" r="4" stroke="currentColor" strokeWidth="1.3" fill="none" />
        <path d="M12 28 Q22 18 32 28" stroke="currentColor" strokeWidth="1.3" fill="none" />
      </>
    ),
    hr: (
      <>
        <circle cx="14" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <circle cx="26" cy="14" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M8 28c0-5 4-8 8-8s8 3 8 8" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </>
    ),
    results: (
      <>
        <rect x="10" y="18" width="5" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <rect x="18" y="12" width="5" height="18" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <rect x="26" y="8" width="5" height="22" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </>
    ),
    mentally: (
      <path d="M12 22 Q22 8 32 22 Q22 30 12 22 Z" stroke="currentColor" strokeWidth="1.3" fill="none" />
    ),
    development: (
      <>
        <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M22 12 L22 32 M12 22 L32 22" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
    training: (
      <>
        <path d="M10 24 L22 12 L34 24" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M14 24 L14 32 M30 24 L30 32" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
    grants: (
      <>
        <rect x="10" y="14" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M16 14 V12 M28 14 V12" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
    contact: (
      <>
        <path d="M10 14 L22 22 L34 14" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <rect x="10" y="14" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </>
    ),
    people: (
      <>
        <circle cx="22" cy="11" r="4" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M10 30c0-6 5-10 12-10s12 4 12 10" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </>
    ),
    culture: (
      <>
        <path d="M8 24 L22 10 L36 24" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M14 24 L14 32 M30 24 L30 32" stroke="currentColor" strokeWidth="1.2" />
      </>
    ),
  };

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {icons[type] ?? icons.strategy}
    </svg>
  );
}

export default function HeroUniverse() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 32, damping: 28 });
  const py = useSpring(my, { stiffness: 32, damping: 28 });
  const parallax = useMotionTemplate`translate(${px}px, ${py}px)`;

  const nodes = useMemo(
    () =>
      homeUniverseNodes.map((n) => {
        const pos = polar(n.angle, n.radius);
        const pathData = curvedPathData(CX, CY, pos.x, pos.y, n.bend);
        const pulsePoints = [0, 0.25, 0.5, 0.75, 1].map((t) =>
          sampleQuadratic(CX, CY, pathData.cpx, pathData.cpy, pos.x, pos.y, t),
        );
        return {
          ...n,
          pos,
          path: pathData.d,
          pulsePoints,
        };
      }),
    [],
  );

  const secondaryNodes = useMemo(
    () =>
      homeUniverseSecondaryNodes.map((n) => ({
        ...n,
        pos: polar(n.angle, n.radius),
      })),
    [],
  );

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.022);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.022);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(null);
  };

  return (
    <div
      ref={ref}
      className="hero-universe"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label="Szervezeti fejlesztési rendszer"
    >
      <div className="hero-universe__ambient" aria-hidden="true" />
      <div className="hero-universe__bloom" aria-hidden="true" />

      <motion.div
        className="hero-universe__stage"
        style={reduced ? undefined : { transform: parallax }}
      >
        {/* Depth layer — back rings, slow counter-rotate */}
        <motion.div
          className="hero-universe__ring-layer hero-universe__ring-layer--back"
          animate={reduced ? undefined : { rotate: -360 }}
          transition={{ duration: 280, repeat: Infinity, ease: 'linear' }}
        >
          <svg className="hero-universe__rings" viewBox="0 0 100 100" aria-hidden="true">
            {ORBITAL_RINGS.slice(0, 4).map((ring, i) => (
              <motion.ellipse
                key={`back-${ring.rx}`}
                cx={CX}
                cy={CY}
                rx={ring.rx}
                ry={ring.ry}
                fill="none"
                stroke="rgba(102,187,106,0.1)"
                strokeWidth="0.1"
                animate={{ opacity: [ring.opacity * 0.6, ring.opacity, ring.opacity * 0.6] }}
                transition={
                  reduced
                    ? { duration: 0.5 }
                    : { duration: ring.duration, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }
                }
              />
            ))}
          </svg>
        </motion.div>

        {/* Mid rings */}
        <svg className="hero-universe__rings hero-universe__rings--mid" viewBox="0 0 100 100" aria-hidden="true">
          {ORBITAL_RINGS.slice(3).map((ring, i) => (
            <motion.ellipse
              key={`mid-${ring.rx}`}
              cx={CX}
              cy={CY}
              rx={ring.rx}
              ry={ring.ry}
              fill="none"
              stroke="rgba(129,199,132,0.14)"
              strokeWidth="0.12"
              strokeDasharray="0.4 1.2"
              animate={{ opacity: [ring.opacity * 0.5, ring.opacity * 1.2, ring.opacity * 0.5] }}
              transition={
                reduced
                  ? { duration: 0.5 }
                  : { duration: ring.duration + 4, repeat: Infinity, ease: 'easeInOut', delay: i * 1.2 }
              }
            />
          ))}
        </svg>

        {/* Stage particles */}
        {!reduced && (
          <svg className="hero-universe__particles" viewBox="0 0 100 100" aria-hidden="true">
            {STAGE_PARTICLES.map((p) => (
              <motion.circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.size}
                fill="rgba(165,214,167,0.5)"
                animate={{
                  opacity: [0.1, 0.55, 0.1],
                  cx: [p.x, p.x + 1.2, p.x],
                  cy: [p.y, p.y - 2, p.y],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: p.delay,
                }}
              />
            ))}
          </svg>
        )}

        {/* Broken organic arc segments */}
        <svg className="hero-universe__arcs hero-universe__arcs--organic" viewBox="0 0 100 100" aria-hidden="true">
          {BROKEN_ARCS.map((arc, i) => (
            <motion.path
              key={`broken-${i}`}
              d={`M ${50 + arc.rx * Math.cos((arc.rotate * Math.PI) / 180)} ${50 + arc.ry * Math.sin((arc.rotate * Math.PI) / 180)} A ${arc.rx} ${arc.ry} 0 1 1 ${50 - arc.rx * 0.6} ${50 + arc.ry * 0.4}`}
              fill="none"
              stroke="rgba(129,199,132,0.1)"
              strokeWidth="0.1"
              strokeDasharray={arc.dash}
              animate={{ opacity: [0.04, 0.12, 0.04], strokeDashoffset: [0, -4, 0] }}
              transition={
                reduced
                  ? { duration: 0.5 }
                  : {
                      opacity: { duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' },
                      strokeDashoffset: { duration: 24 + i * 4, repeat: Infinity, ease: 'linear' },
                    }
              }
            />
          ))}
        </svg>

        {/* Connector lines + light pulses */}
        <svg className="hero-universe__lines" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="uni-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#66bb6a" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#a5d6a7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#66bb6a" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="uni-line-active" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#81c784" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#c8e6c9" stopOpacity="1" />
              <stop offset="100%" stopColor="#81c784" stopOpacity="0.45" />
            </linearGradient>
            <filter id="uni-line-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.15" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {nodes.map((node, i) => {
            const active = hovered === node.id;
            const dimmed = hovered !== null && !active;
            return (
              <g key={node.id} filter={active ? 'url(#uni-line-glow)' : undefined}>
                <motion.path
                  d={node.path}
                  fill="none"
                  stroke={active ? 'url(#uni-line-active)' : 'url(#uni-line)'}
                  strokeWidth={active ? 0.2 : 0.12}
                  strokeLinecap="round"
                  initial={reduced ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: dimmed ? 0.12 : active ? 0.9 : 0.38,
                  }}
                  transition={{ duration: 1.2, delay: 0.15 + i * 0.08, ease }}
                />
                {!reduced && (
                  <motion.circle
                    r="0.28"
                    fill="#dcedc8"
                    filter="url(#uni-line-glow)"
                    animate={{
                      opacity: [0, 0.9, 0.9, 0],
                      cx: node.pulsePoints.map((p) => p.x),
                      cy: node.pulsePoints.map((p) => p.y),
                    }}
                    transition={{
                      duration: 4.5 + i * 0.45,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: 1.8 + i * 0.4,
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Flowing arc sweep */}
        <svg className="hero-universe__arcs" viewBox="0 0 100 100" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.path
              key={i}
              d={`M ${52 + i * 2.5} ${96 - i * 1.5} Q ${74 + i * 1.5} ${58 - i * 4} ${86 - i * 0.8} ${22 + i * 2.5}`}
              fill="none"
              stroke="rgba(102,187,106,0.07)"
              strokeWidth="0.1"
              initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1, opacity: [0.03, 0.1, 0.03] }}
              transition={
                reduced
                  ? { duration: 0.5 }
                  : {
                      pathLength: { duration: 2.5, delay: 0.4 + i * 0.12, ease },
                      opacity: { duration: 8 + i * 1.5, repeat: Infinity, ease: 'easeInOut' },
                    }
              }
            />
          ))}
        </svg>

        {/* Center core */}
        <motion.div
          className="hero-universe__center"
          initial={reduced ? false : { opacity: 0, scale: 0.88 }}
          animate={
            inView || reduced
              ? { opacity: 1, scale: reduced ? 1 : [1, 1.03, 1] }
              : { opacity: 0, scale: 0.88 }
          }
          transition={
            reduced
              ? { duration: 0.8, ease }
              : {
                  opacity: { duration: 0.8, ease },
                  scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }
          }
        >
          <motion.div
            className="hero-universe__center-glow"
            animate={reduced ? undefined : { opacity: [0.45, 0.75, 0.45], scale: [1, 1.1, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="hero-universe__center-halo"
            animate={reduced ? undefined : { opacity: [0.2, 0.4, 0.2], rotate: 360 }}
            transition={{
              opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 120, repeat: Infinity, ease: 'linear' },
            }}
          />
          <div className="hero-universe__center-core">
            <span className="hero-universe__center-title">{homeUniverseCenter.title}</span>
          </div>
          <div className="hero-universe__center-reflection" aria-hidden="true" />
        </motion.div>

        {/* Secondary micro-nodes */}
        <motion.div
          className="hero-universe__secondary-orbit"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 320, repeat: Infinity, ease: 'linear' }}
        >
          {secondaryNodes.map((sn, i) => (
            <motion.span
              key={i}
              className="hero-universe__secondary-node"
              style={{ left: `${sn.pos.x}%`, top: `${sn.pos.y}%` }}
              animate={
                reduced
                  ? undefined
                  : {
                      opacity: [0.25, 0.65, 0.25],
                      scale: [1, 1.2, 1],
                      rotate: -360,
                    }
              }
              transition={{
                opacity: { duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                scale: { duration: 5 + (i % 2), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 },
                rotate: { duration: 320, repeat: Infinity, ease: 'linear' },
              }}
            />
          ))}
        </motion.div>

        {/* Primary orbital nodes */}
        <motion.div
          className="hero-universe__orbit"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 240, repeat: Infinity, ease: 'linear' }}
        >
          {nodes.map((node, i) => {
            const active = hovered === node.id;
            const dimmed = hovered !== null && !active;
            return (
              <motion.div
                key={node.id}
                className="hero-universe__node-slot"
                style={{
                  left: `${node.pos.x}%`,
                  top: `${node.pos.y}%`,
                }}
                animate={
                  reduced
                    ? undefined
                    : {
                        rotate: -360,
                        y: [0, -5, 0],
                        x: [0, 2, 0],
                      }
                }
                transition={
                  reduced
                    ? undefined
                    : {
                        rotate: { duration: 240, repeat: Infinity, ease: 'linear' },
                        y: {
                          duration: node.orbitDuration / 8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.5,
                        },
                        x: {
                          duration: node.orbitDuration / 6,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.35,
                        },
                      }
                }
              >
                <motion.div
                  className={`hero-universe__node${active ? ' is-active' : ''}${dimmed ? ' is-dimmed' : ''}${node.doubleRing ? ' has-double-ring' : ''}`}
                  style={{
                    ['--node-scale' as string]: node.scale,
                    ['--node-opacity' as string]: node.opacity,
                  }}
                  initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                  animate={
                    inView || reduced
                      ? {
                          opacity: dimmed ? 0.5 : 1,
                          scale: active ? 1.14 : 1,
                        }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={
                    reduced
                      ? { duration: 0.5, delay: 0.3 + i * 0.06 }
                      : {
                          opacity: { duration: 0.35 },
                          scale: { duration: 0.4, ease },
                        }
                  }
                >
                  <Link
                    to={node.link}
                    className="hero-universe__node-link"
                    aria-label={`${node.label} — ${node.tooltipText}`}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(node.id)}
                    onBlur={() => setHovered(null)}
                  >
                    <span className="hero-universe__node-glow" />
                    <span className="hero-universe__node-body">
                      <NodeIcon type={node.id} />
                    </span>
                  </Link>

                  <motion.div
                    className="hero-universe__tooltip"
                    role="tooltip"
                    initial={false}
                    animate={{
                      opacity: active ? 1 : 0,
                      y: active ? 0 : 8,
                      scale: active ? 1 : 0.96,
                      visibility: active ? 'visible' : 'hidden',
                    }}
                    transition={{ duration: 0.28, ease }}
                  >
                    <p className="hero-universe__tooltip-title">{node.tooltipTitle}</p>
                    <p className="hero-universe__tooltip-text">{node.tooltipText}</p>
                    <span className="hero-universe__tooltip-cta">
                      Megnyitás <span aria-hidden="true">→</span>
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
