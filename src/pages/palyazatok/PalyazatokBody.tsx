import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type PalyazatokBodyProps = {
  formSlot?: ReactNode;
};

export default function PalyazatokBody({ formSlot }: PalyazatokBodyProps) {
  return (
    <>
      <section className="hero">
        <svg className="hero-wm" viewBox="0 0 100 120" aria-hidden="true"><path d="M14 8 L78 60 L14 112" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div className="wrap">
          <div className="kicker">Pályázatok · GINOP Plusz 3.2.1-21</div>
          <h1><span className="q1">Mi van, ha képzem a munkavállalóimat és elmennek?</span>
            <span className="q2">Ok, de mi van akkor, ha nem képzem és <span className="mark">maradnak?!</span></span></h1>
          <p className="lead anim">Támogatott képzések az Év Trénere díj nyerteseivel!</p>
          <div className="cta-row anim">
            <a className="btn" href="#urlap">Lépjen velünk kapcsolatba!</a>
          </div>
        </div>
      </section>
      
      <section className="deadline-sec">
        <div className="wrap">
          <div className="deadline rev">
            <b>Jelenleg nincs elérhető képzési pályázat</b>
          </div>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <div className="about rev">
            <p>A Rávezető 2008 óta működő tanácsadó vállalat, 2014 óta engedéllyel rendelkező felnőttképző intézmény, kompetenciafejlesztési fókusszal.</p>
            <Link to="/rolunk">Tudjon meg többet rólunk! →</Link>
          </div>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <div className="partners rev">
            <span className="pl">Együttműködő partnereink:</span>
            <img className="plogo" src="/assets/images/palyazatok/img-02.jpg" alt="SALDO Pénzügyi Tanácsadó és Informatikai Zrt." loading="lazy" />
            <img className="plogo" src="/assets/images/palyazatok/img-03.jpg" alt="Smart Digital Kft." loading="lazy" />
            <img className="plogo" src="/assets/images/palyazatok/img-04.png" alt="Globomax Zrt." loading="lazy" />
            <img className="plogo" src="/assets/images/palyazatok/img-05.png" alt="ATEV Fehérjefeldolgozó Zrt." loading="lazy" />
            <img className="plogo" src="/assets/images/palyazatok/img-06.png" alt="Budapest Gyógyfürdői és Hévizei Zrt." loading="lazy" />
            <Link to="/referenciak">További referenciák →</Link>
          </div>
        </div>
      </section>
      
      <section className="sec">
        <div className="wrap">
          <div className="head rev">
            <div className="kicker">Hogyan segítünk?</div>
            <h2>Díjmentes konzultációval indulunk</h2>
          </div>
          <div className="steps rev">
            <div className="step">
              <div className="idx">01</div>
              <p>Díjmentes konzultáció,</p>
            </div>
            <div className="ssep" aria-hidden="true">&gt;</div>
            <div className="step">
              <div className="idx">02</div>
              <p>ami alapján segítünk összeállítani a cégre szabott képzési portfólióját,</p>
            </div>
            <div className="ssep" aria-hidden="true">&gt;</div>
            <div className="step">
              <div className="idx">03</div>
              <p>és végigkísérjük a benyújtás és a megvalósítás során!</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="sec" id="urlap">
        <div className="wrap">
          <div className="duo rev">
            <div className="kontakt">
              <svg className="k-chev" viewBox="0 0 100 120" aria-hidden="true"><path d="M14 8 L78 60 L14 112" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <svg className="kc-crown" viewBox="0 0 64 42" aria-hidden="true"><path d="M10 30 L17 13 L25 26 L32 8 L39 26 L47 13 L54 30 Z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" /><path d="M13 36 H51" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
              <div className="kc">
                <span className="l1">Keep calm</span>
                <span className="l2">and</span>
                <span className="l1">call <b>Rávezető</b></span>
              </div>
              <div className="pwrap"><img src="/assets/images/palyazatok/img-07.jpg" alt="Berta Anikó portréja" onError={(e) => e.currentTarget.remove()} /></div>
              <div>
                <h2>Berta Anikó</h2>
                <div className="role">Projektmenedzser</div>
              </div>
              <div className="elms">
                E-mail: <a href="mailto:kepzes@ravezeto.hu">kepzes@ravezeto.hu</a><br />
                Telefon: <a href="tel:+36705134128">+36 70/513 4128</a>
              </div>
            </div>
            <div className="form">
              <h2>Lépjen velünk kapcsolatba!</h2>
              {formSlot}
            </div>
          </div>
        </div>
      </section>
      
      <footer>
        <div className="wrap">
          <div className="cols">
            <div className="flogo"><img src="/assets/images/palyazatok/img-08.svg" alt="Rávezető Projekt" /><div className="tag">Változásokat vezetünk, együtt!</div></div>
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
