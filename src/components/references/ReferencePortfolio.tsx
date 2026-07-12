import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type {
  ReferenciakFilterId,
  ReferenciakReference,
  referenciakFilters,
} from '../../pages/referenciak/referenciakContent';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import './ReferencePortfolio.css';

type ReferencePortfolioProps = {
  year: string;
  label: string;
  items: readonly ReferenciakReference[];
  filters: typeof referenciakFilters;
};

const ease = [0.22, 1, 0.36, 1] as const;

function filterItems(items: readonly ReferenciakReference[], filter: ReferenciakFilterId) {
  if (filter === 'featured') {
    return items.filter((item) => item.featured);
  }
  if (filter === 'quoted') {
    return items.filter((item) => item.hasQuote);
  }
  return items;
}

export default function ReferencePortfolio({
  year,
  label,
  items,
  filters,
}: ReferencePortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<ReferenciakFilterId>('all');
  const reduced = useReducedMotion();

  const visibleItems = useMemo(
    () => filterItems(items, activeFilter),
    [items, activeFilter],
  );

  return (
    <section className="reference-portfolio">
      <header className="reference-portfolio__head">
        <div>
          <span className="reference-portfolio__year">{year}</span>
          <p className="reference-portfolio__label">{label}</p>
        </div>

        <div className="reference-portfolio__filters" role="tablist" aria-label="Referencia szűrők">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.id}
              className={`reference-portfolio__filter${activeFilter === filter.id ? ' reference-portfolio__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </header>

      <motion.ul layout={!reduced} className="reference-portfolio__grid" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item, index) => (
            <motion.li
              key={item.slug}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease, delay: reduced ? 0 : Math.min(index * 0.03, 0.24) }}
              className="reference-portfolio__item"
            >
              <figure className="reference-portfolio__logo">
                <img src={item.logo} alt={item.name} loading="lazy" decoding="async" />
              </figure>
              <span className="reference-portfolio__name">{item.name}</span>
              {item.hasQuote && <span className="reference-portfolio__badge">Partneri ajánlás</span>}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
