import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { rolunkTestimonials } from '../../content/rolunk';
import './RolunkTestimonials.css';

type RolunkTestimonialsProps = {
  items: typeof rolunkTestimonials;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function RolunkTestimonials({ items }: RolunkTestimonialsProps) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = items[active];

  return (
    <div className="rolunk-testimonials-editorial">
      <div className="rolunk-testimonials-editorial__nav" role="tablist" aria-label="Ügyfél vélemények">
        {items.map((item, index) => (
          <button
            key={item.author}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={`rolunk-testimonials-editorial__tab${index === active ? ' is-active' : ''}`}
            onClick={() => setActive(index)}
          >
            <span className="rolunk-testimonials-editorial__tab-name">{item.author}</span>
            <span className="rolunk-testimonials-editorial__tab-role">{item.role}</span>
          </button>
        ))}
      </div>

      <div className="rolunk-testimonials-editorial__panel" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.author}
            className="rolunk-testimonials-editorial__quote"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease }}
          >
            <p>„{current.quote}"</p>
            <footer>
              <strong>{current.author}</strong>
              <span>{current.role}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="rolunk-testimonials-editorial__controls" aria-hidden="true">
          {items.map((item, index) => (
            <button
              key={`dot-${item.author}`}
              type="button"
              className={`rolunk-testimonials-editorial__dot${index === active ? ' is-active' : ''}`}
              onClick={() => setActive(index)}
              tabIndex={-1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
