import { Link } from 'react-router-dom';
import GoldMark from '../../../components/client/GoldMark';
import HeroLines from '../../../components/client/HeroLines';
import { homeHero } from '../../../content/home';

export default function HomeClientHero() {
  const [w1, w2, w3] = homeHero.headlineLines;

  return (
    <section className="hero cardp stick c-hero">
      <HeroLines />
      <div className="wrap">
        <div>
          <div className="kicker">{homeHero.label}</div>
          <h1>
            <span className="w1">{w1}</span>{' '}
            <span className="w2">{w2}</span>{' '}
            <span className="w3">
              <GoldMark>{w3}</GoldMark>
            </span>
          </h1>
          <p className="lead">{homeHero.intro}</p>
          <div className="cta-row">
            <Link to={homeHero.ctaPrimaryLink} className="btn">
              {homeHero.ctaPrimary}
            </Link>
            <a href={homeHero.ctaSecondaryLink} className="textlink">
              {homeHero.ctaSecondary} →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
