import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/client/ScrollReveal';
import { homeStats, homeStatsIntro } from '../../../content/home';

export default function HomeClientStats() {
  return (
    <section className="panel cardp stick pC">
      <div className="wrap">
        <ScrollReveal as="div" className="kicker">
          {homeStatsIntro.kicker}
        </ScrollReveal>
        <ScrollReveal as="h2">{homeStatsIntro.title}</ScrollReveal>
        <ScrollReveal className="nums">
          {homeStats.map((stat) => (
            <div className="stat" key={stat.label}>
              <div
                className="num"
                data-target={stat.value}
                data-suffix={stat.suffix || undefined}
              >
                {stat.value}
                {stat.suffix}
              </div>
              <div className="lab">{stat.label}</div>
            </div>
          ))}
        </ScrollReveal>
        <ScrollReveal as="p" className="refs">
          {homeStatsIntro.refsText}{' '}
          <Link to={homeStatsIntro.refsLink}>
            {homeStatsIntro.refsCta} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
