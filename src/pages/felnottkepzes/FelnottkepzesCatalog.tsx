import { useCallback, useMemo, useRef, useState } from 'react';
import type { FelnottkepzesProgrammeGroup } from '../../services/content/types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ALL = 'all';
const EASE = 'cubic-bezier(.22,.8,.2,1)';

type Props = {
  groups: FelnottkepzesProgrammeGroup[];
};

function animTargets(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>('.g-grp, .g-card')];
}

export default function FelnottkepzesCatalog({ groups }: Props) {
  const reduced = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState(ALL);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const activeGroups = useMemo(
    () => groups.filter((g) => g.active).sort((a, b) => a.order - b.order),
    [groups],
  );

  const courseCount = useMemo(
    () => activeGroups.reduce((sum, g) => sum + g.items.length, 0),
    [activeGroups],
  );

  const tabs = useMemo(
    () => [{ code: ALL, label: 'Mind' }, ...activeGroups.map((g) => ({ code: g.filterCode, label: g.tab }))],
    [activeGroups],
  );

  const flip = useCallback(
    (mutate: () => void) => {
      const grid = gridRef.current;
      if (!grid || reduced) {
        mutate();
        return;
      }

      const els = animTargets(grid);
      const first = new Map(els.map((el) => [el, el.getBoundingClientRect()]));
      mutate();

      els.forEach((el) => {
        const from = first.get(el);
        const to = el.getBoundingClientRect();
        if (!to.width) return;
        if (!from?.width) {
          el.animate([{ opacity: 0, transform: 'scale(.94)' }, { opacity: 1, transform: 'none' }], {
            duration: 480,
            easing: EASE,
          });
          return;
        }
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], {
            duration: 620,
            easing: EASE,
          });
        }
      });
    },
    [reduced],
  );

  const setFilterWithAnim = useCallback(
    async (code: string) => {
      const grid = gridRef.current;
      if (!grid) {
        setFilter(code);
        setOpenKey(null);
        return;
      }

      const match = (cat: string) => code === ALL || cat === code;
      const secs = [...grid.querySelectorAll<HTMLElement>('.g-sec')];
      const leaving = secs.filter(
        (sec) => !sec.classList.contains('gone') && !match(sec.dataset.cat ?? ''),
      );

      if (!reduced && leaving.length) {
        await Promise.all(
          leaving.map((sec) =>
            sec
              .animate(
                [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.97)' }],
                { duration: 220, easing: 'ease-in', fill: 'forwards' },
              )
              .finished.catch(() => undefined),
          ),
        );
      }

      flip(() => {
        setFilter(code);
        setOpenKey(null);
      });

      leaving.forEach((sec) => sec.getAnimations().forEach((a) => a.cancel()));
    },
    [flip, reduced],
  );

  const toggleCard = useCallback(
    (key: string) => {
      flip(() => {
        setOpenKey((prev) => (prev === key ? null : key));
      });
    },
    [flip],
  );

  return (
    <>
      <div className="cat-head">
        <div>
          <h2 className="sec-t rev" style={{ marginBottom: 0 }}>
            Képzéseink.
          </h2>
        </div>
        <div className="cat-count rev">
          <b>{courseCount}</b> képzés · <b>{activeGroups.length}</b> terület
        </div>
      </div>
      <div className="cat-tabs rev" role="tablist" aria-label="Képzési területek">
        {tabs.map((tab) => {
          const selected = tab.code === filter;
          return (
            <button
              key={tab.code}
              type="button"
              role="tab"
              className={`cat-tab${selected ? ' on' : ''}`}
              aria-selected={selected}
              data-cat={tab.code}
              onClick={() => void setFilterWithAnim(tab.code)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="cat-grid rev" ref={gridRef}>
        {activeGroups.map((group) => {
          const visible = filter === ALL || filter === group.filterCode;
          return (
            <div
              key={group.id}
              className={`g-sec${visible ? '' : ' gone'}`}
              data-cat={group.filterCode}
            >
              <h3 className="g-grp">{group.title}</h3>
              <div className="g-grid">
                {group.items.map((item) => {
                  const key = `${group.id}:${item.title}`;
                  const open = openKey === key;
                  return (
                    <article key={key} className={`g-card${open ? ' open' : ''}`}>
                      <button
                        type="button"
                        className="g-head"
                        aria-expanded={open}
                        onClick={() => toggleCard(key)}
                      >
                        <span className="g-title">{item.title}</span>
                        <span className="g-more">
                          <span className="lm">Leírás</span>
                          <span className="ll">Bezárás</span> <i aria-hidden="true">›</i>
                        </span>
                      </button>
                      {item.description ? (
                        <div className="g-body">
                          <p>{item.description}</p>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
