import ClientFooter from '../../components/client/ClientFooter';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type KapcsolatBodyProps = {
  formSlot?: ReactNode;
};

export default function KapcsolatBody({ formSlot }: KapcsolatBodyProps) {
  return (
    <>
      <section className="hero">
        <svg className="hero-wm" viewBox="0 0 100 120" aria-hidden="true"><path d="M14 8 L78 60 L14 112" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div className="wrap">
          <div className="kicker anim">Kapcsolat · Írjon nekünk</div>
          <h1 className="anim">Keressen minket <span className="mark">bizalommal</span> az alábbi elérhetőségeinken!</h1>
          <p className="lead anim">Kérdése van, vagy időpontot egyeztetne? Válassza az Önnek kényelmes csatornát – örömmel válaszolunk.</p>
        </div>
      </section>

      <section className="contact">
        <div className="wrap">
          <div className="crow rev">
            <div className="ck">Telefonszám</div>
            <div><a className="biglink" href="tel:+36705134128">+36 70/513 4128<span className="ar">→</span></a></div>
          </div>
          <div className="crow rev">
            <div className="ck">E-mail</div>
            <div><a className="biglink" href="mailto:info@ravezeto.hu">info@ravezeto.hu<span className="ar">→</span></a></div>
          </div>
          <div className="crow rev">
            <div className="ck">Ügyfélszolgálat</div>
            <div className="cbody"><strong>1146 Budapest, Izsó u. 7. 1/3.</strong><br />H–P: 9.00–16.00</div>
          </div>
          <div className="crow rev">
            <div className="ck">Irodánk</div>
            <div className="cbody"><strong>1146 Budapest, Izsó u. 7. 1/3.</strong> · 6. kapucsengő<br /><a href="https://www.google.com/maps/dir//1146+Budapest,+Izs%C3%B3+u.+7." target="_blank" rel="noopener">Útvonaltervezés Google Térképen →</a></div>
          </div>
        </div>
      </section>

      <section className="msg">
        <div className="wrap">
          <div className="mgrid rev">
            <h2>Üzenet</h2>
            <div>
              {formSlot}
              <p className="fnote">Ennek az űrlapnak a kitöltésével hozzájárul, hogy a weblap eltárolja és felhasználja a megadott adatokat. <Link to="/jogi/adatvedelem">Adatkezelési szabályzat</Link></p>
            </div>
          </div>
        </div>
      </section>


      <div className="mapband rev">
        <iframe src="https://www.google.com/maps?q=1146+Budapest,+Izs%C3%B3+u.+7.&output=embed" title="Térkép – 1146 Budapest, Izsó u. 7." loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>

      <ClientFooter />
    </>
  );
}
