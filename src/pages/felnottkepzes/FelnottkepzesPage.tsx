import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import StructuredDataManager from '../../components/seo/StructuredDataManager';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import './felnottkepzes.css';

export default function FelnottkepzesPage() {
  const meta = useMemo(() => resolvePageMeta('/felnottkepzes'), []);
  usePageMeta(meta);

  return (
    <>
      <StructuredDataManager />

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
            <span className="g">›</span>
            Az év trénerei is nálunk dolgoznak
          </p>
        </div>
      </section>

      <section className="sec sec-w">
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
              📷 tréningterem – jelenetfotó helye
              <br />
              (tompított, meleg tónus)
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
            <div className="note">
              Cégünk felnőttképzési engedéllyel rendelkező intézmény.
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

      <section className="sec sec-w">
        <div className="wrap">
          <div className="kicker rev">Főbb képzési területeink</div>
          <h2 className="sec-t rev">
            Négy terület, amelyben a legerősebbek vagyunk.
          </h2>
          <div className="band rev">
            <div className="photo-slot">📷 kommunikációs tréning – jelenetfotó helye</div>
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
            <div className="photo-slot">📷 vezetői tréning – jelenetfotó helye</div>
          </div>
          <div className="band rev">
            <div className="photo-slot">📷 generációs workshop – jelenetfotó helye</div>
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
            <div className="photo-slot">📷 stresszkezelési tréning – jelenetfotó helye</div>
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
          <div
            className="cat-tabs rev"
            id="catTabs"
            role="tablist"
            aria-label="Képzési kategóriák"
          >
            <button
              type="button"
              className="cat-tab on"
              role="tab"
              aria-selected={true}
            >
              Munkavállalói kompetenciák
            </button>
            <button type="button" className="cat-tab" role="tab" aria-selected={false}>
              Stresszkezelés
            </button>
            <button type="button" className="cat-tab" role="tab" aria-selected={false}>
              Vezetői kompetenciák
            </button>
            <button type="button" className="cat-tab" role="tab" aria-selected={false}>
              Mentori kompetenciák
            </button>
          </div>
          <div className="cat-card rev">
            <div className="cat-inner" id="catInner">
              <h3>Munkavállalói kompetenciák fejlesztése</h3>
              <ul className="reflist">
                <li>
                  <span className="t">Gazdálkodj az időddel!</span>
                  <span className="dots" />
                  <span className="h">24 óra</span>
                </li>
                <li>
                  <span className="t">Időgazdálkodás</span>
                  <span className="dots" />
                  <span className="h">16 óra</span>
                </li>
                <li>
                  <span className="t">
                    Kommunikációs és együttműködési készségek fejlesztése
                  </span>
                  <span className="dots" />
                  <span className="h">24 óra</span>
                </li>
                <li>
                  <span className="t">Kommunikációs tréning</span>
                  <span className="dots" />
                  <span className="h">24 óra</span>
                </li>
                <li>
                  <span className="t">Komplex kommunikációs készségek fejlesztése</span>
                  <span className="dots" />
                  <span className="h">42 óra</span>
                </li>
                <li>
                  <span className="t">Konfliktuskezelés</span>
                  <span className="dots" />
                  <span className="h">24 óra</span>
                </li>
                <li>
                  <span className="t">Konfliktushelyzetek kezelése</span>
                  <span className="dots" />
                  <span className="h">24 óra</span>
                </li>
                <li>
                  <span className="t">Konfliktuskezelés és kommunikáció</span>
                  <span className="dots" />
                  <span className="h">30 óra</span>
                </li>
                <li>
                  <span className="t">
                    Sikeres szervezeti együttműködés és kommunikáció a gyakorlatban
                  </span>
                  <span className="dots" />
                  <span className="h">16 óra</span>
                </li>
                <li>
                  <span className="t">
                    Szervezeti és generációk közötti együttműködés fejlesztése
                  </span>
                  <span className="dots" />
                  <span className="h">30 óra</span>
                </li>
                <li>
                  <span className="t">Üzleti kapcsolattartás és kommunikáció</span>
                  <span className="dots" />
                  <span className="h">16 óra</span>
                </li>
              </ul>
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
                rel="noopener noreferrer"
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
                <img src="/assets/logo.svg" alt="Rávezető Projekt" />
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
                  href="https://www.facebook.com/profile.php?id=100063907730525"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
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
              <div className="eu-slot">
                <img
                  src="/assets/images/Szechenyi-2020-logo.png"
                  alt="Széchenyi 2020 – Európai Unió támogatás"
                  onError={(e) => e.currentTarget.remove()}
                />
                <span>Széchenyi 2020 / EU logó helye</span>
              </div>
            </div>
            <div className="copy">© 2026 Rávezető Projekt Kft.</div>
          </div>
        </footer>
      </section>
    </>
  );
}
