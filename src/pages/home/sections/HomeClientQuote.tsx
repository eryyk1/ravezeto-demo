import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/client/ScrollReveal';
import { useHomeQuote } from '../../../services/content/useContent';

export default function HomeClientQuote() {
  const homeQuote = useHomeQuote();
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
