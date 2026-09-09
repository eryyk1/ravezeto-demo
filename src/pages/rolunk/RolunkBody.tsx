import { Link } from 'react-router-dom';

export default function RolunkBody() {
  return (
    <>
      <section className="hero-sub">
        <svg className="hero-wm" viewBox="0 0 100 120" aria-hidden="true"><path d="M14 8 L78 60 L14 112" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div className="wrap">
          <div className="kicker">Csapatunk</div>
          <h1>Gyorsabban, erősebben, <span className="mark">magasabbra!</span></h1>
          <p className="lead">Az egyéni és szervezeti minőség és teljesítmény növelésében tudunk segíteni, közös gondolkodással, elhivatott szakemberekkel.</p>
        </div>
        <div className="wrap" style={{ marginTop: '3rem' }}>
          <div className="team-photo rev"><img src="/assets/images/csapatunk/img-02.jpg" alt="A Rávezető Projekt csapata az irodában" /></div>
        </div>
      </section>
      
      <section className="sec sec-w motto-sec">
        <div className="motto-art" aria-hidden="true">
          <svg viewBox="0 0 200 170" fill="none">
            <path d="M20 160 L80 100 L140 160 H106 L80 134 L54 160 Z" fill="#9DAD52" opacity=".1" />
            <path d="M20 116 L80 56 L140 116 H106 L80 90 L54 116 Z" fill="#75833A" opacity=".14" />
            <path d="M50 62 L80 32 L110 62 H91 L80 51 L69 62 Z" fill="#D6A548" opacity=".22" />
          </svg>
        </div>
        <div className="wrap motto rev">
          <div className="latin"><span className="gm">„</span>Citius, Altius, Fortius.<span className="gm">”</span></div>
          <p>Minden munkaszervezet állandó mozgásban, változásban éli mindennapjait. A vállalatok életében megjelenő kihívások a sport nyelvén is leírhatók, mert tervezés, felkészülés és kitartás nélkül nincs siker, a teljesítmény mérhető, az eredmény pedig igazolja a szervezet létét, erejét, befolyását.</p>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <h2 className="sec-t rev">Munkatársaink</h2>
          <div className="team-grid">
            <article className="member rev">
              <h3>Ríz Ádám CMC</h3>
              <a className="li-link" href="#" target="_blank" rel="noopener" aria-label="Ríz Ádám LinkedIn profilja"><span className="li-badge" aria-hidden="true">in</span>LinkedIn profil</a>
              <p className="bio">18 éve dolgozom tanácsadóként, nagyon szeretem a munkámat. Öröm tanácsadással fejleszteni azt a vállalatot, amely emberközpontú fejlesztésekben gondolkodik, és igyekszik a munkahelyi hétköznapokat jobbá tenni. Mert tényleg megéri.</p>
            </article>
            <article className="member rev">
              <h3>Berta Anikó</h3>
              <a className="li-link" href="#" target="_blank" rel="noopener" aria-label="Berta Anikó LinkedIn profilja"><span className="li-badge" aria-hidden="true">in</span>LinkedIn profil</a>
              <p className="bio">2018 óta foglalkozom felnőttképzések szervezésével és lebonyolításával. A képzési folyamatot a tervezéstől a megvalósításig végigkísérem, ügyelve arra, hogy a programok az ügyfelek valós igényeire épüljenek, szakmailag magas színvonalúak legyenek, és minden jogszabályi előírásnak megfeleljenek.</p>
            </article>
            <article className="member rev">
              <h3>Bíró Gabriella</h3>
              <a className="li-link" href="#" target="_blank" rel="noopener" aria-label="Bíró Gabriella LinkedIn profilja"><span className="li-badge" aria-hidden="true">in</span>LinkedIn profil</a>
              <p className="bio">1992-től dolgozom szervezetfejlesztés területén. 1989-ben megismerkedtem az OD szervezetfejlesztés módszerével, azóta közreműködtem szervezeti kultúraváltás folyamataiban, vezettem tréningeket, workshopokat, és szervezeti folyamatok fejlesztése részeként coachként dolgoztam vezetőkkel. A kulturális antropológia területén szerzett ismereteimet törekszem alkalmazni, szemlélődöm, tanulok és értelmezek.</p>
            </article>
            <article className="member rev">
              <h3>Soós Andrea</h3>
              <a className="li-link" href="#" target="_blank" rel="noopener" aria-label="Soós Andrea LinkedIn profilja"><span className="li-badge" aria-hidden="true">in</span>LinkedIn profil</a>
              <p className="bio">A korábbi munkahelyeken szerzett változatos tapasztalatokat felhasználva a cég operatív vezetésében veszek részt. A projektek menedzsmentjén felül azért is felelek, hogy a cég pénzügyei rendben legyenek. Számomra fontos, hogy a minőségi munkavégzés kiemelt szempont a Rávezetőnél, ami együtt jár az ügyfeleink és a velünk együtt dolgozó szakértők elégedettségével.</p>
            </article>
            <article className="member rev">
              <h3>Szőke Ádám</h3>
              <a className="li-link" href="#" target="_blank" rel="noopener" aria-label="Szőke Ádám LinkedIn profilja"><span className="li-badge" aria-hidden="true">in</span>LinkedIn profil</a>
              <p className="bio">A Rávezetőben elsősorban szervezetfejlesztési projekteken dolgozom tanácsadóként, amelyben nagy segítséget nyújt a korábban 9 év alatt szerzett vezetői tapasztalatom egy felsőoktatási intézményben. Rendszergondolkodásom, empátiám kiegészült a szervezetfejlesztés képzésen szerzett strukturált ismeretekkel, amelyeket még tovább bővítve igyekszem több szemszögből és eszközzel megközelíteni az egyéni-, csoportos- és szervezeti problémákat.</p>
            </article>
          </div>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <div className="kicker rev">Értékeink</div>
          <h2 className="sec-t rev">Ami minden munkánkat vezeti.</h2>
          <div className="values-img rev"><img src="/assets/images/csapatunk/img-03.jpg" alt="Értékeink kézzel rajzolt mozaikja: Kreativitás, Csapatmunka, Problémamegoldás, Minőségelvűség, Szakmai tisztesség, Módszertani sokszínűség" onError={(e) => e.currentTarget.remove()} /></div>
        </div>
      </section>
      
      <section className="close">
        <div className="wrap rev">
          <svg className="chev-trio" viewBox="0 0 40 46" aria-hidden="true"><path d="M6 40 L20 28 L34 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".35" /><path d="M6 26 L20 14 L34 26" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".2" /><path d="M6 12 L20 0 L34 12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".12" transform="translate(0,4)" /></svg>
          <div className="kicker">Kapcsolat</div>
          <h2>Dolgozzunk együtt!</h2>
          <p className="refs">Munkatársaink jelentős szervezeti és vezetői tapasztalattal rendelkező tanácsadók, szakértők. Szeretjük a projekteket és belső meggyőződésünk a munkáink által saját magunk fejlesztése is.</p>
          <Link className="btn" to="/kapcsolat">Írjon nekünk</Link>
        </div>
        <footer>
          <div className="wrap">
            <div className="cols">
              <div className="flogo"><img src="/assets/images/csapatunk/img-04.svg" alt="Rávezető Projekt" /><div className="tag">Változásokat vezetünk, együtt!</div></div>
              <div>1146 Budapest, Izsó u. 7. 1/3.<br /><a href="mailto:info@ravezeto.hu">info@ravezeto.hu</a> · <a href="tel:+36705134128">+36 70/513 4128</a></div>
              <div><a href="#" target="_blank" rel="noopener">LinkedIn</a><br /><Link to="/jogi/adatvedelem">Adatvédelem</Link> · <Link to="/jogi/impresszum">Impresszum</Link></div>
            </div>
            <div className="fcred">
            <div className="fdoc"><b>Cégünk felnőttképzési engedéllyel rendelkező intézmény.</b><br />Nyilvántartásba vételi számunk: B/2020/001943 · Engedélyszámunk: E/2021/000106</div>
          </div>
          <div className="copy">© 2026 Rávezető Projekt Kft.</div>
          </div>
        </footer>
      </section>
    </>
  );
}
