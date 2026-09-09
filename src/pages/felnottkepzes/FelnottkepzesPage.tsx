import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { resolvePageMeta } from '../../seo/pageMeta';
import './felnottkepzes.css';

const CATALOG = [
  {
    tab: 'Munkavállalói kompetenciák',
    title: 'Munkavállalói kompetenciák fejlesztése',
    items: [
      ['Gazdálkodj az időddel!', '24 óra'],
      ['Időgazdálkodás', '16 óra'],
      ['Kommunikációs és együttműködési készségek fejlesztése', '24 óra'],
      ['Kommunikációs tréning', '24 óra'],
      ['Komplex kommunikációs készségek fejlesztése', '42 óra'],
      ['Konfliktuskezelés', '24 óra'],
      ['Konfliktushelyzetek kezelése', '24 óra'],
      ['Konfliktuskezelés és kommunikáció', '30 óra'],
      ['Sikeres szervezeti együttműködés és kommunikáció a gyakorlatban', '16 óra'],
      ['Szervezeti és generációk közötti együttműködés fejlesztése', '30 óra'],
      ['Üzleti kapcsolattartás és kommunikáció', '16 óra'],
    ],
  },
  {
    tab: 'Stresszkezelés',
    title: 'Stresszkezelés, mentális egészség fejlesztése',
    items: [
      ['A stressz és én', '16 óra'],
      ['Mentálhigiéné és lelki egészségvédelem', '54 óra'],
    ],
  },
  {
    tab: 'Vezetői kompetenciák',
    title: 'Vezetői kompetenciák fejlesztése',
    items: [
      ['Menedzseri szemlélet a vezetői munkában', '16 óra'],
      ['Tudatosság és társas készségek a vezetésben', '16 óra'],
      ['Tudatosság és társas készségek a vezetésben tréning', '24 óra'],
      ['Tudatosság és társas készségek fejlesztése', '20 óra'],
      ['Vezetői kompetenciák fejlesztése', '16 óra'],
      ['Tudatos vezetői működés fejlesztése', '24 óra'],
    ],
  },
  {
    tab: 'Mentori kompetenciák',
    title: 'Mentori kompetenciák fejlesztése',
    items: [['Munkahelyi mentorok képzése', '16 óra']],
  },
] as const;

export default function FelnottkepzesPage() {
  const meta = useMemo(() => resolvePageMeta('/felnottkepzes'), []);
  usePageMeta(meta);
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [catalogTransition, setCatalogTransition] = useState(false);

  const showTab = useCallback(
    (index: number) => {
      if (index === activeTab) return;

      if (reduced) {
        setActiveTab(index);
        return;
      }

      setCatalogTransition(true);
      window.setTimeout(() => {
        setActiveTab(index);
        setCatalogTransition(false);
      }, 280);
    },
    [activeTab, reduced],
  );

  return (
    <>
      <section className="hero-sub">
        <svg className="hero-wm" viewBox="0 0 100 120" aria-hidden="true">
          <path
            d="M14 8 L78 60 L14 112"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="wrap">
          <div className="kicker">Felnőttképzés</div>
          <h1>
            Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi{' '}
            <span className="mark">kulcskompetenciáit!</span>
          </h1>
          <p className="award-line">
            <span className="g">›</span>Az év trénerei is nálunk dolgoznak
          </p>
          <a
            className="award-proof"
            href="https://www.linkedin.com/feed/update/urn:li:activity:7159842612516921345/"
            target="_blank"
            rel="noopener"
          >
            Megnézem a bizonyítékot →
          </a>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="band flip rev">
            <div>
              <h2 className="sec-t2">
                A munkatársi kiválóság mellett a szervezeti működés fejlesztésében is
                segítenek a kompetenciafejlesztő képzések.
              </h2>
              <p className="mut">
                A szervezeti teljesítmény növelése optimálisan több tényező együttes
                fejlesztésével, több eszköz használatával valósítható meg, amelyek közül
                az egyik legfontosabb a képzés.
              </p>
              <p className="mut" style={{ marginTop: '1rem' }}>
                A fejlesztési és képzési igények meghatározását, illesztését és
                megvalósítását vállalatra szabva, ügyfeleink igényei és meglévő
                tudásszintje figyelembevételével végezzük. Ennek szerves része a
                tananyagfejlesztés is.
              </p>
            </div>
            <div className="photo-slot">
              <img
                className="ill"
                src="/assets/images/felnottkepzes/img-02.jpg"
                alt="Tusrajz: tréner a flipchartnál, félkörben ülő résztvevők"
              />
            </div>
          </div>
          <div className="mid rev">
            <p>
              Képzési programjaink sosem „dobozos” termékek, változatos
              oktatás-módszertani megoldásokkal biztosítjuk a képzések jobb
              hasznosulását.
            </p>
            <div className="tagrow" aria-label="Oktatás-módszertani megoldásaink">
              <span className="tag">Jelenléti tréningek</span>
              <span className="tag">E-learning tananyag</span>
              <span className="tag">Online tréning elemek</span>
              <span className="tag">Szervezeti modul</span>
              <span className="tag">Follow up szolgáltatások</span>
            </div>
            <p style={{ marginTop: '1.4rem' }}>
              Tréneri csapatunk sokéves tereptapasztalata, kiemelkedő szakmai tudása
              garantálja, hogy közvetlen, felszabadult légkörben zajló tréningjeink a
              lehető legjobban szolgálják a megfogalmazott képzési célokat.
            </p>
          </div>
          <div className="doc rev">
            <div className="toplab">Engedélyezett felnőttképző intézmény</div>
            <div className="grid">
              <div>
                <div className="lab">Nyilvántartásba vételi számunk</div>
                <div className="num">B/2020/001943</div>
              </div>
              <div>
                <div className="lab">Engedélyszámunk</div>
                <div className="num">E/2021/000106</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec strip">
        <div className="wrap rev">
          <p>
            A munkahelyek legnagyobb kihívása gyakran a hatékony kommunikáció és a
            csapatmunka hiánya. Célunk, hogy résztvevőink olyan készségeket
            sajátítsanak el, amelyek révén sikeresen navigálhatnak a munkahelyi
            kihívások között.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="kicker rev">Főbb képzési területeink</div>
          <h2 className="sec-t rev">
            Négy terület, amelyben a legerősebbek vagyunk.
          </h2>
          <div className="band rev">
            <div className="photo-slot">
              <img
                className="ill"
                src="/assets/images/felnottkepzes/img-03.jpg"
                alt="Tusrajz: két beszélgető alak, beszédbuborékaik összeérnek"
              />
            </div>
            <div>
              <h3>Kommunikációs készségfejlesztés</h3>
              <p>
                A világ folyamatosan változik, ahogyan a kommunikációs módszerek is.
                Részletesen foglalkozunk az aktív hallgatás, az érzelmi intelligencia
                és a hatékony visszajelzés technikáival, hogy a résztvevők
                magabiztosan tudják kifejezni gondolataikat és érzéseiket.
              </p>
            </div>
          </div>
          <div className="band flip rev">
            <div>
              <h3>Vezetői skillek fejlesztése</h3>
              <p>
                A sikeres vezetés kulcsa a megfelelő eszközök és ismeretek
                birtoklása. Képzésünk során a résztvevők megismerkednek a különböző
                vezetési stílusokkal és azok alkalmazásával, valamint a
                konfliktuskezelési és döntéshozatali technikákkal.
              </p>
            </div>
            <div className="photo-slot">
              <img
                className="ill"
                src="/assets/images/felnottkepzes/img-04.jpg"
                alt="Tusrajz: karmester alak, pálcája nyomán felfelé ívelő vonalak"
              />
            </div>
          </div>
          <div className="band rev">
            <div className="photo-slot">
              <img
                className="ill"
                src="/assets/images/felnottkepzes/img-05.jpg"
                alt="Tusrajz: két oldalról épülő híd, középen arany zárókő"
              />
            </div>
            <div>
              <h3>Generációk közötti együttműködés</h3>
              <p>
                Képzésünk segít az eltérő korú munkatársak közötti hatékony
                kommunikáció, megértés és együttműködés kialakításában. A különböző
                életkorú munkavállalók más-más munkastílust, technológiai tudást és
                tapasztalatokat hoznak a munkahelyre, ami kihívásokat jelenthet a
                mindennapi együttműködés során. Célunk, hogy a különböző generációk
                közötti szakadékot áthidaljuk, és elősegítsük a kölcsönös tiszteleten
                alapuló, eredményes munkakapcsolatokat.
              </p>
            </div>
          </div>
          <div className="band flip rev">
            <div>
              <h3>Munkahelyi stressz – stresszkezelési technikák</h3>
              <p>
                A munkahelyi stressz napjaink egyik legnagyobb kihívása. A mentális
                egészség megőrzése érdekében tréningjeinken a résztvevők
                megismerkednek a stresszforrások azonosításának módszereivel és
                elsajátítják azokat a gyakorlati technikákat, amelyekkel képesek
                lesznek tudatosan kezelni a kihívásokat, hogyan őrizhetik meg lelki
                egyensúlyukat és növelhetik teljesítőképességüket a mindennapi munka
                során.
              </p>
            </div>
            <div className="photo-slot">
              <img
                className="ill"
                src="/assets/images/felnottkepzes/img-06.jpg"
                alt="Tusrajz: kusza vonal kisimul nyugodt vonallá"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="cat-head">
            <div>
              <div className="kicker rev">Referencia-képzéseink</div>
              <h2 className="sec-t rev" style={{ marginBottom: 0 }}>
                Képzési katalógus.
              </h2>
            </div>
            <div className="cat-count rev">
              <b>20</b> képzés · <b>4</b> terület
            </div>
          </div>
          <div className="cat-tabs rev" role="tablist" aria-label="Képzési kategóriák">
            {CATALOG.map((group, index) => (
              <button
                key={group.tab}
                type="button"
                role="tab"
                className={`cat-tab${index === activeTab ? ' on' : ''}`}
                aria-selected={index === activeTab}
                onClick={() => showTab(index)}
              >
                {group.tab}
              </button>
            ))}
          </div>
          <div className="cat-card rev">
            <div className={`cat-inner${catalogTransition ? ' out' : ''}`}>
              {CATALOG.map((group, index) => (
                <div
                  key={group.tab}
                  className={`cat-panel${index === activeTab ? ' on' : ''}`}
                >
                  <h3>{group.title}</h3>
                  <ul className="reflist">
                    {group.items.map(([title, hours]) => (
                      <li key={title}>
                        <span className="t">{title}</span>
                        <span className="dots" />
                        <span className="h">{hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-w">
        <div className="wrap">
          <div className="kicker rev">Elérhetőségeink</div>
          <h2 className="sec-t rev">Ügyfélszolgálat és iroda.</h2>
          <div className="duo">
            <article className="info rev">
              <h3>Ügyfélszolgálat</h3>
              <p className="big">1146 Budapest, Izsó u. 7. 1/3.</p>
              <p>H–P: 9.00–16.00</p>
            </article>
            <article className="info rev">
              <h3>Irodánk</h3>
              <p className="big">1146 Budapest, Izsó u. 7. 1/3.</p>
              <p>6. kapucsengő</p>
              <a
                className="map"
                href="https://www.google.com/maps/search/1146+Budapest,+Izs%C3%B3+u.+7.+1%2F3."
                target="_blank"
                rel="noopener"
              >
                Megnyitás térképen →
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="close">
        <div className="wrap rev">
          <svg className="chev-trio" viewBox="0 0 40 46" aria-hidden="true">
            <path
              d="M6 40 L20 28 L34 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".35"
            />
            <path
              d="M6 26 L20 14 L34 26"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".2"
            />
            <path
              d="M6 12 L20 0 L34 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity=".12"
              transform="translate(0,4)"
            />
          </svg>
          <div className="kicker">Kapcsolat</div>
          <h2>Képezzük együtt csapatát!</h2>
          <p className="refs">
            1146 Budapest, Izsó u. 7. 1/3. · info@ravezeto.hu · +36 70/513 4128
          </p>
          <Link to="/kapcsolat" className="btn">
            Írjon nekünk
          </Link>
        </div>
        <footer>
          <div className="wrap">
            <div className="cols">
              <div className="flogo">
                <img src="/assets/images/felnottkepzes/img-07.svg" alt="Rávezető Projekt Kft." />
                <div className="tag">Változásokat vezetünk, együtt!</div>
              </div>
              <div>
                1146 Budapest, Izsó u. 7. 1/3.
                <br />
                <a href="mailto:info@ravezeto.hu">info@ravezeto.hu</a> ·{' '}
                <a href="tel:+36705134128">+36 70/513 4128</a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/company/r%C3%A1vezet%C5%91-projekt/"
                  target="_blank"
                  rel="noopener"
                >
                  LinkedIn
                </a>
                <br />
                <Link to="/jogi/adatvedelem">Adatvédelem</Link> ·{' '}
                <Link to="/jogi/impresszum">Impresszum</Link>
              </div>
            </div>
            <div className="fcred">
              <div className="fdoc">
                <b>Cégünk felnőttképzési engedéllyel rendelkező intézmény.</b>
                <br />
                Nyilvántartásba vételi számunk: B/2020/001943 · Engedélyszámunk:
                E/2021/000106
              </div>
            </div>
            <div className="copy">© 2026 Rávezető Projekt Kft.</div>
          </div>
        </footer>
      </section>
    </>
  );
}
