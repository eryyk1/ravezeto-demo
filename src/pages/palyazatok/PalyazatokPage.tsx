import { Link } from 'react-router-dom';
import ClientClose from '../../components/client/ClientClose';
import GoldMark from '../../components/client/GoldMark';
import ScrollReveal from '../../components/client/ScrollReveal';
import {
  palyazatokConsulting,
  palyazatokHero,
  palyazatokInternational,
  palyazatokStatusMessage,
} from './palyazatokContent';

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

export default function PalyazatokPage() {
  return (
    <>
      <section className="hero">
        <HeroWatermark />
        <div className="wrap">
          <div className="kicker">{palyazatokHero.label}</div>
          <h1>
            <span className="q1">Fejlesztésben gondolkodik, projektkeretben?</span>
            <span className="q2">
              Uniós forrásból is segítünk — <GoldMark>együtt</GoldMark> a sikerig.
            </span>
          </h1>
          <p className="lead anim">Pályázati és nemzetközi projekt-támogatás tapasztalt szakemberekkel.</p>
          <div className="cta-row anim">
            <Link to="/kapcsolat" className="btn">
              Lépjen velünk kapcsolatba!
            </Link>
          </div>
        </div>
      </section>

      <section className="deadline-sec">
        <div className="wrap">
          <ScrollReveal className="deadline">
            <span className="k">Aktuális helyzet</span>
            <b>{palyazatokStatusMessage}</b>
          </ScrollReveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <ScrollReveal className="head">
            <div className="kicker">{palyazatokConsulting.label}</div>
            <h2>{palyazatokConsulting.title}</h2>
          </ScrollReveal>
          <div className="about">
            {palyazatokConsulting.paragraphs.map((paragraph) => (
              <ScrollReveal as="p" key={paragraph.slice(0, 32)}>
                {paragraph}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <ScrollReveal className="head">
            <div className="kicker">{palyazatokInternational.label}</div>
            <h2>{palyazatokInternational.title}</h2>
          </ScrollReveal>
          <div className="cards3">
            {palyazatokInternational.projects.map((project, index) => (
              <ScrollReveal key={project.id} className="tcard">
                <div className="idx">{String(index + 1).padStart(2, '0')}</div>
                <h3>{project.title}</h3>
                {'period' in project && project.period && <p>{project.period}</p>}
                {'description' in project && project.description && <p>{project.description}</p>}
                {'activities' in project && project.activities && (
                  <ul>
                    {project.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ClientClose
        kicker="Pályázatok"
        title="Kérdése van a pályázati lehetőségekről?"
        btnLabel="Kapcsolatfelvétel"
        btnTo="/kapcsolat"
      />
    </>
  );
}
