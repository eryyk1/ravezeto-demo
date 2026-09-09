import { Link } from 'react-router-dom';

export default function ImpresszumBody() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="kicker">Dokumentumok</div>
          <h1>Impresszum</h1>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <div className="doc rev">
            <div className="ph">Ide kerül a végleges impresszum szövege – élesítés előtt pótlandó.</div>
          </div>
        </div>
      </section>
      
      <footer>
        <div className="wrap">
          <div className="cols">
            <div className="flogo"><img src="/assets/images/impresszum/img-02.svg" alt="Rávezető Projekt" /><div className="tag">Változásokat vezetünk, együtt!</div></div>
            <div>1146 Budapest, Izsó u. 7. 1/3.<br /><a href="mailto:info@ravezeto.hu">info@ravezeto.hu</a> · <a href="tel:+36705134128">+36 70/513 4128</a></div>
            <div><a href="#" target="_blank" rel="noopener">LinkedIn</a><br /><Link to="/jogi/adatvedelem">Adatvédelem</Link> · <Link to="/jogi/impresszum">Impresszum</Link></div>
          </div>
          <div className="fcred">
            <div className="fdoc"><b>Cégünk felnőttképzési engedéllyel rendelkező intézmény.</b><br />Nyilvántartásba vételi számunk: B/2020/001943 · Engedélyszámunk: E/2021/000106</div>
          </div>
          <div className="copy">© 2026 Rávezető Projekt Kft.</div>
        </div>
      </footer>
    </>
  );
}
