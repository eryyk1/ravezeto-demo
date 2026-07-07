import './HeroBackground.css';

const DUST = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left: `${4 + ((i * 11) % 94)}%`,
  top: `${3 + ((i * 19) % 92)}%`,
  size: 1 + (i % 4),
  delay: `${(i * 1.1) % 14}s`,
  duration: `${22 + (i % 9)}s`,
  opacity: 0.15 + (i % 5) * 0.08,
}));

const GALAXY_DUST = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${55 + ((i * 7) % 42)}%`,
  top: `${8 + ((i * 13) % 84)}%`,
  size: 1 + (i % 2),
  delay: `${(i * 1.4) % 12}s`,
  duration: `${26 + (i % 6)}s`,
}));

type HeroBackgroundProps = {
  reduced?: boolean;
};

export default function HeroBackground({ reduced = false }: HeroBackgroundProps) {
  return (
    <div className={`hero-bg${reduced ? ' hero-bg--static' : ''}`} aria-hidden="true">
      {/* Layer 1 — forest gradient */}
      <div className="hero-bg__gradient" />

      {/* Layer 2 — volumetric light sources */}
      <div className="hero-bg__glow hero-bg__glow--a" />
      <div className="hero-bg__glow hero-bg__glow--b" />
      <div className="hero-bg__glow hero-bg__glow--c" />
      <div className="hero-bg__glow hero-bg__glow--d" />

      {/* Layer 3 — animated fog */}
      <div className="hero-bg__fog hero-bg__fog--a" />
      <div className="hero-bg__fog hero-bg__fog--b" />

      {/* Layer 4 — noise texture */}
      <div className="hero-bg__noise" />

      {/* Layer 5 — drifting particles */}
      {!reduced &&
        DUST.map((p) => (
          <span
            key={p.id}
            className="hero-bg__dust"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: p.opacity,
            }}
          />
        ))}

      {!reduced &&
        GALAXY_DUST.map((p) => (
          <span
            key={`g-${p.id}`}
            className="hero-bg__dust hero-bg__dust--galaxy"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}

      {/* Layer 6 — flowing curves */}
      <div className="hero-bg__flows" />

      {/* Layer 7 — vignette */}
      <div className="hero-bg__vignette" />
    </div>
  );
}
