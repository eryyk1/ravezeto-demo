import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/client/ScrollReveal';
import { homeQuote } from '../../../content/home';

export default function HomeClientQuote() {
  return (
    <section className="quote cardp stick c-quote">
      <ScrollReveal className="wrap">
        <blockquote>
          <span className="gm">„</span>
          {homeQuote.text}
          <span className="gm">”</span>
        </blockquote>
        <div className="who">{homeQuote.author}</div>
        <p className="why">{homeQuote.context}</p>
        <p className="team-line">
          {homeQuote.teamLine}{' '}
          <Link to={homeQuote.teamLink}>
            {homeQuote.teamCta} →
          </Link>
        </p>
      </ScrollReveal>
    </section>
  );
}
