import { useCallback, useMemo, useState } from 'react';
import type { FelnottkepzesProgrammeGroup } from '../../services/content/types';

type Props = {
  groups: FelnottkepzesProgrammeGroup[];
};

const ALL_FILTER = 'all';

export default function FelnottkepzesCatalog({ groups }: Props) {
  const activeGroups = useMemo(
    () => groups.filter((g) => g.active).sort((a, b) => a.order - b.order),
    [groups],
  );

  const courseCount = useMemo(
    () => activeGroups.reduce((sum, g) => sum + g.items.length, 0),
    [activeGroups],
  );

  const tabs = useMemo(
    () => [
      { code: ALL_FILTER, label: 'Mind' },
      ...activeGroups.map((g) => ({ code: g.filterCode, label: g.tab })),
    ],
    [activeGroups],
  );

  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggleCard = useCallback((key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  }, []);

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
          const selected = tab.code === activeFilter;
          return (
            <button
              key={tab.code}
              type="button"
              role="tab"
              className={`cat-tab${selected ? ' on' : ''}`}
              aria-selected={selected}
              onClick={() => {
                setActiveFilter(tab.code);
                setOpenKey(null);
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="cat-grid rev">
        {activeGroups.map((group) => {
          const visible = activeFilter === ALL_FILTER || activeFilter === group.filterCode;
          return (
            <div
              key={group.id}
              className={`g-sec${visible ? '' : ' gone'}`}
              data-cat={group.filterCode}
              hidden={!visible}
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
                          <span className="ll">Bezárás</span>{' '}
                          <i aria-hidden="true">›</i>
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
