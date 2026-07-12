import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { tanacsadasFramework } from '../../content/tanacsadasFramework';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ConsultingFramework.css';

const ease = [0.22, 1, 0.36, 1] as const;

export default function ConsultingFramework() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  const reduced = useReducedMotion();
  const layers = tanacsadasFramework.layers;
  const current = layers[active];

  return (
    <div ref={ref} className="change-framework">
      <div className="change-framework__diagram">
        <svg className="change-framework__svg" viewBox="0 0 400 340" role="img" aria-label="Változás keretrendszere">
          <motion.path
            className="change-framework__spine"
            d="M200 36 L200 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={inView || reduced ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, ease, delay: reduced ? 0 : 0.2 }}
          />

          {layers.map((layer, index) => {
            const width = 116 + index * 46;
            const y = 48 + index * 68;
            const isActive = index === active;

            return (
              <g key={layer.id}>
                <motion.rect
                  x={200 - width / 2}
                  y={y}
                  width={width}
                  height={48}
                  rx={8}
                  className={`change-framework__layer-shape${isActive ? ' is-active' : ''}`}
                  initial={reduced ? false : { opacity: 0, scaleX: 0.85 }}
                  animate={inView || reduced ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.85 }}
                  transition={{ duration: 0.65, ease, delay: reduced ? 0 : 0.15 + index * 0.1 }}
                  style={{ transformOrigin: '200px center' }}
                />
                <text x="200" y={y + 20} className="change-framework__layer-title" textAnchor="middle">
                  {layer.title}
                </text>
                <text x="200" y={y + 34} className="change-framework__layer-tag" textAnchor="middle">
                  {layer.tagline}
                </text>

                {index < layers.length - 1 && (
                  <motion.line
                    x1="200"
                    y1={y + 48}
                    x2="200"
                    y2={y + 68}
                    className="change-framework__connector"
                    initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                    animate={inView || reduced ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, ease, delay: reduced ? 0 : 0.4 + index * 0.1 }}
                  />
                )}

                {'spokes' in layer && layer.spokes && isActive && (
                  <g className="change-framework__spokes">
                    {layer.spokes.map((spoke, spokeIndex) => {
                      const angle = (-70 + spokeIndex * 47) * (Math.PI / 180);
                      const cx = 200 + Math.cos(angle) * (width / 2 + 24);
                      const cy = y + 24 + Math.sin(angle) * 14;
                      return (
                        <g key={spoke}>
                          <motion.line
                            x1="200"
                            y1={y + 24}
                            x2={cx}
                            y2={cy}
                            className="change-framework__spoke-line"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, ease, delay: spokeIndex * 0.06 }}
                          />
                          <circle cx={cx} cy={cy} r="3.5" className="change-framework__spoke-dot" />
                        </g>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        <div className="change-framework__tabs" role="tablist" aria-label="Keretrendszer rétegek">
          {layers.map((layer, index) => (
            <button
              key={layer.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              className={`change-framework__tab${index === active ? ' is-active' : ''}`}
              onClick={() => setActive(index)}
            >
              <span>{String(layer.depth).padStart(2, '0')}</span>
              {layer.title}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={current.id}
        className="change-framework__panel"
        role="tabpanel"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
      >
        <p className="change-framework__panel-tag">{current.tagline}</p>
        <h3>{current.title}</h3>
        <p className="change-framework__panel-summary">{current.summary}</p>
        {'detail' in current && current.detail && (
          <p className="change-framework__panel-detail">{current.detail}</p>
        )}
        {'spokes' in current && current.spokes && (
          <ul className="change-framework__panel-spokes">
            {tanacsadasFramework.layers[2].spokes?.map((spoke) => (
              <li key={spoke}>{spoke}</li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
