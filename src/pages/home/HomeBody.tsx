import { Link } from 'react-router-dom';

export default function HomeBody() {
  return (
    <>
      <section className="hero cardp stick c-hero">
        <div className="lines" aria-hidden="true">
          <svg viewBox="0 0 1440 700" preserveAspectRatio="none">
            <path d="M-20,180 C300,140 520,260 780,220 S1250,120 1460,190" />
            <path d="M-20,320 C260,300 540,400 820,350 S1280,260 1460,330" />
            <path d="M-20,470 C320,450 560,540 840,490 S1300,410 1460,470" />
          </svg>
        </div>
        <div className="wrap">
          <div>
            <div className="kicker">Emberközpontú szervezetfejlesztés · 2008 óta</div>
            <h1><span className="w1">Változásokat</span> <span className="w2">vezetünk,</span> <span className="w3"><span className="mark">együtt!</span></span></h1>
            <p className="lead">Vezetési tanácsadók vagyunk, problémákat oldunk meg, közösen hajlítjuk a teret, alakítjuk az egészségesebb vállalati jövőt.</p>
            <div className="cta-row">
              <Link className="btn" to="/kapcsolat">Írjon nekünk</Link>
              <a className="textlink" href="#szolgaltatasok">Szolgáltatásaink →</a>
            </div>
          </div>
        </div>
      </section>
      
      <section className="quote cardp stick c-quote">
        <div className="wrap rev">
          <blockquote><span className="gm">„</span>Az optimizmus az igazi erkölcsi bátorság<span className="gm">”</span></blockquote>
          <div className="who">Ernest Shackleton</div>
          <p className="why">Kedvenc idézetünk a híres felfedezőtől, aki a lehetetlennel dacolva 120 éve megmentette legénységét a jég és fagy fogságából. Mi így szeretünk dolgozni.</p>
          <p className="team-line">Munkatársaink jelentős szervezeti és vezetői tapasztalattal rendelkező tanácsadók, szakértők. <Link to="/rolunk">Ismerje meg csapatunkat →</Link></p>
        </div>
      </section>
      
      <section className="cardp c-hatok">
      <div className="hatok-intro">
        <div className="kicker rev">Hat ok, amiért minket érdemes választani</div>
        <p className="sub rev">18 év tapasztalat, több mint 400 fejlesztési és képzési projekt áll mögöttünk. Lépésről-lépésre</p>
      </div>
      <div className="wrap">
        <section className="word-sec"><div className="inner rev">
          <div className="big"><b>LE</b>VEZETJÜK</div>
          <div className="rest">Önnek, mi a valódi probléma</div>
          <p>Megmutatjuk, hogy miért szükséges változtatni, a profi szervezeti diagnózis biztosítja, hogy stabil alapokról induljon a változás.</p>
        </div></section>
        <section className="word-sec"><div className="inner rev">
          <div className="big"><b>ÁT</b>VEZETJÜK</div>
          <div className="rest">a nehézségeken</div>
          <p>Szakembereink segítségével a változtatási folyamatban törvényszerű elbizonytalanodás fázisát gyorsan meghaladjuk.</p>
        </div></section>
        <section className="word-sec"><div className="inner rev">
          <div className="big"><b>VÉGIG</b>VEZETJÜK</div>
          <div className="rest">ügyfeleinket</div>
          <p>A teljes változtatási folyamaton, nem hagyjuk magára a tulajdonosokat, vezetőket, támogatjuk a kritikus döntéseket a projekt minden szakaszában.</p>
        </div></section>
        <section className="word-sec"><div className="inner rev">
          <div className="big"><b>RÁ</b>VEZETJÜK</div>
          <div className="rest">a megoldásra</div>
          <p>Amely a siker felé viszi, a sablonos „tuti megmondás” helyett közös megoldásokat alkotunk.</p>
        </div></section>
        <section className="word-sec"><div className="inner rev">
          <div className="big"><b>KI</b>VEZETJÜK</div>
          <div className="rest">a krízisből</div>
          <p>Sokszor a kudarctól való félelem akadályozza meg az újítást. Ha versenyhátrányban van, vagy már úgy érzi, hogy lemaradt, támogatjuk a kilábalásban.</p>
        </div></section>
        <section className="word-sec"><div className="inner rev">
          <div className="big"><b>TOVÁBB</b>VEZETJÜK</div>
          <div className="rest">a fejlődés útján</div>
          <p>Minden vállalat esetében előre tekintünk, nemcsak a rövidtávú szempontokat vizsgáljuk, erős csapat nélkül nem működnek sem folyamatok, sem rendszerek.</p>
        </div></section>
      </div>
      </section>
      
      
      
      <section className="panel cardp stick pF" id="szolgaltatasok">
        <div className="wrap">
          <div className="fgrid">
            <div className="fintro rev">
              <div className="kicker">Szolgáltatásaink</div>
              <h2>Emberközpontú megközelítés, minden folyamatban.</h2>
              <p className="intro">Ha már nem tekintünk hittel, bátorsággal, bizalommal a jövő felé, akkor cégvezetőként, tulajdonosként hogyan formáljuk tovább a vállalati teret, hogyan alkalmazkodunk a piachoz?</p>
            </div>
            <div className="facc rev">
              <details open>
                <summary><span>Vezetési tanácsadás</span><span className="pm">+</span></summary>
                <div className="body">Egyetlen szervezetfejlesztés sem lehet sikeres a változást támogató vezetők és munkatársak nélkül. Ezt az emberközpontú megközelítést garantáljuk minden, általunk vezetett tanácsadási folyamatban. <Link className="go" to="/tanacsadas">Bővebben →</Link></div>
              </details>
              <details>
                <summary><span>Felnőttképzés</span><span className="pm">+</span></summary>
                <div className="body">Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi kulcskompetenciáit, vezetőknek, munkatársaknak. Az év trénerei is nálunk dolgoznak 😊 <Link className="go" to="/felnottkepzes">Bővebben →</Link></div>
              </details>
              <details>
                <summary><span>Pályázatok</span><span className="pm">+</span></summary>
                <div className="body">Fejlesszük közösen vállalatát pályázati forrásokból! A Rávezető minősített szervezetfejlesztő és képzési szolgáltatóként számtalan vállalati kihívásban tud segíteni Önnek. <Link className="go" to="/palyazatok">Bővebben →</Link></div>
              </details>
              <details>
                <summary><span>Mentally</span><span className="pm">+</span></summary>
                <div className="body">A munkahelyi stressz nem HR-ügy, hanem üzleti kockázat. Tudd meg, mi stresszeli a csapatodat, mielőtt a legjobb embereid felmondanak! <a className="go" href="https://mentally.team" target="_blank" rel="noopener">Bővebben →</a></div>
              </details>
            </div>
          </div>
        </div>
      </section>
      
      <section className="panel cardp stick pC">
        <div className="wrap">
          <div className="kicker rev">A megtett út</div>
          <h2 className="rev">Számokban.</h2>
          <div className="nums rev">
            <div className="stat"><div className="num" data-t="18">18</div><div className="lab">év tanácsadói tapasztalat</div></div>
            <div className="stat"><div className="num" data-t="400" data-s="+">400+</div><div className="lab">tanácsadási projekt</div></div>
            <div className="stat"><div className="num" data-t="200" data-s="+">200+</div><div className="lab">elégedett, visszatérő ügyfél</div></div>
            <div className="stat"><div className="num" data-t="250" data-s="+">250+</div><div className="lab">képzési projekt 10 éve felnőttképző intézményként</div></div>
            <div className="stat"><div className="num" data-t="3500" data-s="+">3500+</div><div className="lab">résztvevő a képzéseinken</div></div>
            <div className="stat"><div className="num" data-t="200" data-s="+">200+</div><div className="lab">együttműködő tanácsadó</div></div>
          </div>
          <p className="refs rev">Büszkék vagyunk partnereink bizalmára! <Link to="/referenciak">Referenciáink →</Link></p>
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
              <div className="flogo"><img src="/assets/images/fooldal/img-02.svg" alt="Rávezető Projekt" /><div className="tag">Változásokat vezetünk, együtt!</div></div>
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
