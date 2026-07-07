import CountUp from '../../../components/home/CountUp';
import SectionReveal from '../../../components/home/SectionReveal';
import { homeStats } from '../../../content/home';
import './HomeStats.css';

export default function HomeStats() {
  return (
    <SectionReveal className="home-stats" aria-label="Statisztikák">
      <div className="home-stats__glow" aria-hidden="true" />
      <div className="content-wrap">
        <ul className="home-stats__grid">
          {homeStats.map((stat) => (
            <li key={stat.label} className="home-stats__item">
              <span className="home-stats__value">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="home-stats__label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionReveal>
  );
}
