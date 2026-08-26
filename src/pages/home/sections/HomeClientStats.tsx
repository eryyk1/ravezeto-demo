import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/client/ScrollReveal';
import { useHomeStats } from '../../../services/content/useContent';

export default function HomeClientStats() {
  const homeStatsContent = useHomeStats();
  return (
    <section className="panel cardp stick pC">
      <div className="wrap">
        <ScrollReveal as="div" className="kicker">
          {homeStatsContent.kicker}
        </ScrollReveal>
        <ScrollReveal as="h2">{homeStatsContent.title}</ScrollReveal>
        <ScrollReveal className="nums">
          {homeStatsContent.items.map((stat) => (
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
          {homeStatsContent.refsText}{' '}
          <Link to={homeStatsContent.refsLink}>
            {homeStatsContent.refsCta} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
