import { Link } from 'react-router-dom';
import { homeEuMark, homeHero } from '../../content/home';
import './HomeFundingStrip.css';

export default function HomeFundingStrip() {
  return (
    <section className="home-funding" aria-label="Támogatott projektjeink">
      <div className="content-wrap home-funding__inner">
        <p className="home-funding__label">{homeHero.fundingLabel}</p>
        <Link to={homeEuMark.link} className="home-funding__badge">
          <img src={homeEuMark.image} alt={homeEuMark.alt} width={220} height={152} loading="lazy" />
        </Link>
      </div>
    </section>
  );
}
