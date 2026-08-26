import { Link } from 'react-router-dom';
import ClientFooter from '../../components/client/ClientFooter';
import GoldMark from '../../components/client/GoldMark';
import ScrollReveal from '../../components/client/ScrollReveal';
import { company as staticCompany } from '../../content/company';
import { useCompanySettings, useKapcsolatContent } from '../../services/content/useContent';
import KapcsolatForm from '../../components/kapcsolat/KapcsolatForm';
import { kapcsolatForm as kapcsolatFormDefaults } from './kapcsolatContent';

function HeroWatermark() {
  return (
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
  );
}

export default function KapcsolatPage() {
  const cmsCompany = useCompanySettings();
  const kapcsolat = useKapcsolatContent();
  const company = {
    ...staticCompany,
    ...cmsCompany,
    mapEmbed: kapcsolat.mapEmbed,
    mapsSearch: kapcsolat.mapsSearch,
  };

  return (
    <>
      <section className="hero">
        <HeroWatermark />
        <div className="wrap">
          <div className="kicker anim">{kapcsolat.hero.label}</div>
          <h1 className="anim">
            {kapcsolat.hero.title.includes('bizalommal') ? (
              <>
                Keressen minket <GoldMark>bizalommal</GoldMark> az alábbi elérhetőségeinken!
              </>
            ) : (
              kapcsolat.hero.title
            )}
          </h1>
          <p className="lead anim">{kapcsolat.hero.intro}</p>
        </div>
      </section>

      <section className="contact">
        <div className="wrap">
          <ScrollReveal className="crow">
            <div className="ck">Telefonszám</div>
            <div>
              <a className="biglink" href={`tel:${company.phoneTel}`}>
                {company.phone}
                <span className="ar">→</span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal className="crow">
            <div className="ck">E-mail</div>
            <div>
              <a className="biglink" href={`mailto:${company.email}`}>
                {company.email}
                <span className="ar">→</span>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal className="crow">
            <div className="ck">Ügyfélszolgálat</div>
            <div className="cbody">
              <strong>{company.address}</strong>
              <br />
              {company.hours.replace('-', '–')}
            </div>
          </ScrollReveal>

          <ScrollReveal className="crow">
            <div className="ck">Irodánk</div>
            <div className="cbody">
              <strong>{company.address}</strong> · {kapcsolat.doorbellNote}
              <br />
              <a href={company.mapsSearch} target="_blank" rel="noopener noreferrer">
                Útvonaltervezés Google Térképen →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="msg">
        <div className="wrap">
          <ScrollReveal className="mgrid">
            <h2>{kapcsolat.formTitle}</h2>
            <div>
              <KapcsolatForm
                config={{
                  ...kapcsolatFormDefaults,
                  title: kapcsolat.formTitle,
                  messages: kapcsolat.formMessages,
                }}
              />
              <p className="fnote">
                Ennek az űrlapnak a kitöltésével hozzájárul, hogy a weblap eltárolja és felhasználja a
                megadott adatokat. <Link to="/jogi/adatvedelem">Adatkezelési szabályzat</Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal className="mapband">
        <iframe
          src={company.mapEmbed}
          title={`Térkép – ${company.address}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </ScrollReveal>

      <ClientFooter />
    </>
  );
}
