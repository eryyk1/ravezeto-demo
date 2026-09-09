import { Link } from 'react-router-dom';

export default function TanacsadasBody() {
  return (
    <>
      <section className="hero-sub">
        <svg className="hero-wm" viewBox="0 0 100 120" aria-hidden="true"><path d="M14 8 L78 60 L14 112" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div className="lines" aria-hidden="true">
          <svg viewBox="0 0 1440 700" preserveAspectRatio="none">
            <path d="M-20,180 C300,140 520,260 780,220 S1250,120 1460,190" />
            <path d="M-20,320 C260,300 540,400 820,350 S1280,260 1460,330" />
            <path d="M-20,470 C320,450 560,540 840,490 S1300,410 1460,470" />
          </svg>
        </div>
        <div className="wrap">
          <div className="kicker">Tanácsadás</div>
          <h1>Egyetlen szervezetfejlesztés sem lehet sikeres a <span className="mark">változást támogató</span> vezetők és munkatársak nélkül.</h1>
          <p className="lead">Ezt az emberközpontú megközelítést garantáljuk minden, általunk vezetett tanácsadási folyamatban.</p>
        </div>
      </section>

      <div className="aurelius-wrap">
        <div className="aurelius-sticky">
          <div className="wrap">
            <div className="kicker aurelius-label">Kétezer éve is igaz volt</div>
            <p className="aurelius" id="aurelius">Mindaz, amit látsz, hamarosan megváltozik, sőt megszűnik. Arra gondolj, hány változásnak voltál már magad is tanúja. A világ változás, az élet felfogás dolga.</p>
            <div className="aurelius-who">Marcus Aurelius</div>
            <p className="aurelius-why">A változások tudatos irányítása, a változáshoz való alkalmazkodásunk határozza meg sikerességünket.</p>
          </div>
        </div>
      </div>

      <section className="chapter">
        <div className="wrap">
          <div className="ch-head">
                  <h2 className="ch-big">Szervezet<wbr /><b>fejlesztés</b></h2>
          </div>
          <div className="band rev">
            <div className="photo-slot"><img className="ill" src="/assets/images/tanacsadas/img-02.jpg" alt="Tusrajz: fa, amelynek gyökerei a felszín alatt is látszanak – a szervezeti kultúra metaforája" onError={(e) => e.currentTarget.remove()} /><span>🖊 sketch-rajz helye<br />(assets/tanacsadas-kultura.png)</span></div>
            <div className="btxt">
              <h3>Szervezeti kultúra: a sikeres változás alapja</h3>
              <p>A szervezeti kultúra változása nélkül, nincs esély a stratégia sikeres végrehajtására!</p>
              <p>A kultúra jórészt a felszín alatt működik: a kimondatlan szabályokban, a beidegződött reflexekben, abban, ahogyan a szervezetben valójában döntenek és együttműködnek. Munkánk első lépése ezért mindig az, hogy ezt láthatóvá és megbeszélhetővé tegyük.</p>
            </div>
          </div>
          <div className="band flip rev">
            <div className="btxt">
              <h3>Közös munka, tartós eredmény</h3>
              <p>Hiszünk a folyamatalapú megközelítésben. Nem kész megoldásokat kínálunk, hanem szoros csapatmunkában támogatjuk partnereinket céljaik megvalósításában.</p>
              <p>Az eredmények a tanácsadási folyamat során, közös munkával születnek meg. Ügyfeleink mellett állunk a tervezéstől a megvalósításig, biztosítva a szükséges szakmai támogatást minden lépésnél.</p>
            </div>
            <div className="photo-slot"><img className="ill ill2" src="/assets/images/tanacsadas/img-03.jpg" alt="Tusrajz: két kéz együtt rajzol egy közös vonalat" onError={(e) => e.currentTarget.remove()} /><span>🖊 sketch-rajz helye<br />(assets/tanacsadas-kozos-munka.png)</span></div>
          </div>
          <p className="accent-line rev">Tanácsadóink nem csupán elméleti szakemberek – valós szervezeti kihívásokban szerzett tapasztalattal segítjük ügyfeleinket a változások vezetésében.</p>
        </div>
      </section>

      <section className="chapter w alt">
        <div className="wrap">
          <div className="ch-head">
                  <h2 className="ch-big">Változás<wbr /><b>menedzsment</b></h2>
          </div>
          <div className="band rev">
            <div className="photo-slot wide"><img className="ill" src="/assets/images/tanacsadas/img-04.jpg" alt="Tusrajz: két alak kövekkel rakja le az utat, miközben a többiek már járnak rajta – a változást menet közben, együtt építjük" onError={(e) => e.currentTarget.remove()} /><span>🖊 sketch-rajz helye<br />(assets/tanacsadas-valtozas.png)</span></div>
            <p className="vm-lead">A gyorsan változó környezetben különösen fontos a stratégiai gondolkodás és a szervezeti kultúra összehangolása a szervezeti hatékonyság növelése érdekében. Segítünk megtervezni a változást, felkészíteni azokat a vezetőket és munkatársakat, akiken a végrehajtás múlik, és erősíteni az együttműködést a szervezeti egységek között. Ott is ügyfeleink mellett maradunk, ahol a legtöbb változás elakad: a célok eléréséhez szükséges projektek és folyamatok megvalósításánál.</p>
          </div>
        </div>
      </section>

      <section className="chapter">
        <div className="wrap">
          <div className="ch-head">
                  <h2 className="ch-big">Üzleti edzés, <b>coaching</b></h2>
          </div>
          <div className="co-grid">
            <p className="co-lead rev">Napjaink vezetői döntési helyzeteikben minden belső és külső támogatás ellenére nap mint nap egyedül maradnak a rájuk háruló felelősséggel. A személyes és bizalmi kapcsolat vezető és tanácsadó között arra is alkalmas, hogy többféle módszertani eszköz, gyakorlatok és a visszacsatolás révén elősegítse a vezetői készségek és kompetenciák fejlesztését a szervezeti és személyes haszon maximalizálására.</p>
            <div className="chairs rev">
              <div className="co-photo"><img className="ill" src="/assets/images/tanacsadas/img-05.jpg" alt="Tusrajz: két egymással szemben álló fotel – a coaching-beszélgetés tere" onError={(e) => e.currentTarget.remove()} /><span>🖊 sketch-rajz helye<br />(assets/coaching.png)</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="close">
        <div className="wrap rev">
          <svg className="chev-trio" viewBox="0 0 40 46" aria-hidden="true"><path d="M6 40 L20 28 L34 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".35" /><path d="M6 26 L20 14 L34 26" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".2" /><path d="M6 12 L20 0 L34 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".12" transform="translate(0,4)" /></svg>
          <div className="kicker">Kapcsolat</div>
          <h2>Keressen minket bizalommal!</h2>
          <p className="refs">1146 Budapest, Izsó u. 7. 1/3. · info@ravezeto.hu · +36 70/513 4128</p>
          <Link className="btn" to="/kapcsolat">Írjon nekünk</Link>
        </div>
        <footer>
          <div className="wrap">
            <div className="cols">
              <div className="flogo"><img src="/assets/images/tanacsadas/img-06.svg" alt="Rávezető Projekt" /><div className="tag">Változásokat vezetünk, együtt!</div></div>
              <div>1146 Budapest, Izsó u. 7. 1/3.<br /><a href="mailto:info@ravezeto.hu">info@ravezeto.hu</a> · <a href="tel:+36705134128">+36 70/513 4128</a></div>
              <div><a href="https://www.linkedin.com/company/r%C3%A1vezet%C5%91-projekt/" target="_blank" rel="noopener">LinkedIn</a><br /><Link to="/jogi/adatvedelem">Adatvédelem</Link> · <Link to="/jogi/impresszum">Impresszum</Link></div>
            </div>
            <div className="fcred">
            <div className="fdoc"><b>Cégünk felnőttképzési engedéllyel rendelkező intézmény.</b><br />Nyilvántartásba vételi számunk: B/2020/001943 · Engedélyszámunk: E/2021/000106</div>
          </div>
          <div className="copy">© 2026 Rávezető Projekt Kft. · Frissítve: <time dateTime="2026-09-09">2026. szeptember</time></div>
          </div>
        </footer>
      </section>
    </>
  );
}
