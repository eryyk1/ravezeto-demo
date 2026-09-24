import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { FelnottkepzesProgrammeGroup } from '../../services/content/types';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const ALL = 'all';
const EASE = 'cubic-bezier(.22,.8,.2,1)';

const LEGACY_FILTER_CODE: Record<string, string> = {
  munkavallaloi: 'mv',
  stressz: 'st',
  vezetoi: 've',
  mentori: 'me',
  digitalis: 'di',
};

type Props = {
  groups: FelnottkepzesProgrammeGroup[];
};

function animTargets(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>('.g-grp, .g-card')];
}

function runFlip(
  root: HTMLElement,
  first: Map<HTMLElement, DOMRect>,
) {
  animTargets(root).forEach((el) => {
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
}

export default function FelnottkepzesCatalog({ groups }: Props) {
  const reduced = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const flipBeforeRef = useRef<Map<HTMLElement, DOMRect> | null>(null);
  const [filter, setFilter] = useState(ALL);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const activeGroups = useMemo(
    () =>
      groups
        .filter((group) => group.active)
        .sort((a, b) => a.order - b.order)
        .map((group) => ({
          ...group,
          filterCode: group.filterCode || LEGACY_FILTER_CODE[group.id] || group.id,
        })),
    [groups],
  );

  const courseCount = useMemo(
    () => activeGroups.reduce((sum, group) => sum + group.items.length, 0),
    [activeGroups],
  );

  const tabs = useMemo(
    () => [
      { code: ALL, label: 'Mind' },
      ...activeGroups.map((group) => ({ code: group.filterCode, label: group.tab })),
    ],
    [activeGroups],
  );

  const captureFlipStart = useCallback(() => {
    const grid = gridRef.current;
    if (!grid || reduced) return;
    flipBeforeRef.current = new Map(animTargets(grid).map((el) => [el, el.getBoundingClientRect()]));
  }, [reduced]);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    const first = flipBeforeRef.current;
    if (!grid || !first || reduced) {
      flipBeforeRef.current = null;
      return;
    }
    flipBeforeRef.current = null;
    runFlip(grid, first);
  }, [filter, openKey, reduced]);

  const selectFilter = useCallback(
    (code: string) => {
      if (code === filter) return;
      captureFlipStart();
      setOpenKey(null);
      setFilter(code);
    },
    [captureFlipStart, filter],
  );

  const toggleCard = useCallback(
    (key: string) => {
      captureFlipStart();
      setOpenKey((prev) => (prev === key ? null : key));
    },
    [captureFlipStart],
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
              onClick={() => selectFilter(tab.code)}
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
