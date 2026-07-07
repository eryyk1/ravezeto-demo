import siteContent from '../data/siteContent.json';
import { ButtonLink, ReasonGrid, StatGrid } from '../components/PageSections';

export default function HomePage() {
  const { home } = siteContent;

  return (
    <div className="home-page">
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-logo">RÁ<span>vezető</span></div>
          <h1>{home.hero}</h1>
        </div>
      </section>

      <section className="quote-section">
        <blockquote>
          <p>
            <em>{home.quote.text}</em>
          </p>
          <cite>{home.quote.author}</cite>
        </blockquote>
        <hr />
        <p className="quote-context">{home.quote.context}</p>
      </section>

      {home.sections.map((section, index) => (
        <section key={section.title} className={`home-split section-${index + 1}`}>
          <div className="home-split-title">
            <h2>{section.title}</h2>
          </div>
          <div className="home-split-body">
            <p>{section.text}</p>
            <ButtonLink to={section.link} variant={index === 1 ? 'purple' : index === 2 ? 'purple' : 'gold'}>
              Bővebben
            </ButtonLink>
          </div>
        </section>
      ))}

      <section className="motto-band">
        <p>
          Ha már nem tekintünk hittel, bátorsággal, bizalommal a jövő felé, akkor cégvezetőként,
          tulajdonosként hogyan formáljuk tovább a vállalati teret, hogyan alkalmazkodunk a
          piachoz?
        </p>
      </section>

      <ReasonGrid reasons={home.reasons} />

      <section className="grants-preview">
        <div className="grants-preview-title">
          <h2>Pályázatok</h2>
        </div>
        <div className="grants-preview-body">
          <p>{home.palyazatIntro}</p>
          <ButtonLink to="/palyazatok" variant="gold">
            Bővebben
          </ButtonLink>
        </div>
      </section>

      <StatGrid stats={home.stats} />

      <section className="home-split section-references">
        <div className="home-split-title accent-brown">
          <h2>Referenciák</h2>
        </div>
        <div className="home-split-body">
          <p className="lead">Büszkék vagyunk partnereink bizalmára!</p>
          <ButtonLink to="/referenciaink" variant="brown">
            Bővebben
          </ButtonLink>
        </div>
      </section>

      <section className="home-split section-mentally">
        <div className="home-split-title">
          <h2>Mentally</h2>
        </div>
        <div className="home-split-body">
          <p>
            Kíváncsi csapata állapotára? A Mentally megmutatja vállalata egészségének térképét!
          </p>
          <ButtonLink to="/mentally">Bővebben</ButtonLink>
        </div>
      </section>

      <section className="home-split section-contact">
        <div className="home-split-title accent-blue">
          <h2>Kapcsolat</h2>
        </div>
        <div className="home-split-body">
          <p className="lead">Keressen minket bizalommal!</p>
          <ButtonLink to="/kapcsolatok" variant="blue">
            Írjon nekünk
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
