import { useCallback, useState } from 'react';
import ScrollReveal from '../../components/client/ScrollReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type ProgrammeItem = {
  title: string;
  hours: string;
};

type ProgrammeGroup = {
  id: string;
  tab: string;
  title: string;
  items: readonly ProgrammeItem[];
};

type TrainingCatalogProps = {
  groups: readonly ProgrammeGroup[];
  trainingCount: number;
  areaCount: number;
};

export default function TrainingCatalog({
  groups,
  trainingCount,
  areaCount,
}: TrainingCatalogProps) {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const active = groups[activeIndex];

  const showTab = useCallback(
    (index: number) => {
      if (index === activeIndex) return;

      if (reduced) {
        setActiveIndex(index);
        return;
      }

      setTransitioning(true);
      window.setTimeout(() => {
        setActiveIndex(index);
        setTransitioning(false);
      }, 280);
    },
    [activeIndex, reduced],
  );

  return (
    <>
      <div className="cat-head">
        <div>
          <ScrollReveal as="div" className="kicker">
            Referencia-képzéseink
          </ScrollReveal>
          <ScrollReveal as="h2" className="sec-t cat-sec-t">
            Képzési katalógus.
          </ScrollReveal>
        </div>
        <ScrollReveal className="cat-count">
          <b>{trainingCount}</b> képzés · <b>{areaCount}</b> terület
        </ScrollReveal>
      </div>

      <ScrollReveal className="cat-tabs" role="tablist" aria-label="Képzési kategóriák">
        {groups.map((group, index) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            className={`cat-tab${index === activeIndex ? ' on' : ''}`}
            aria-selected={index === activeIndex}
            onClick={() => showTab(index)}
          >
            {group.tab}
          </button>
        ))}
      </ScrollReveal>

      <ScrollReveal className="cat-card">
        <div className={`cat-inner${transitioning ? ' out' : ''}`}>
          <h3>{active.title}</h3>
          <ul className="reflist">
            {active.items.map((item) => (
              <li key={item.title}>
                <span className="t">{item.title}</span>
                <span className="dots" aria-hidden="true" />
                <span className="h">{item.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </>
  );
}
