import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/home/ScrollReveal';
import { homeQuote } from '../../../content/home';
import './HomeQuote.css';

export default function HomeQuote() {
  return (
    <section className="home-quote home-panel home-panel--card">
      <div className="content-wrap">
        <ScrollReveal className="home-quote__inner">
          <blockquote className="home-quote__text">
            <span className="home-quote__gm" aria-hidden="true">
              „
            </span>
            {homeQuote.text}
            <span className="home-quote__gm" aria-hidden="true">
              ”
            </span>
          </blockquote>
          <p className="home-quote__author">{homeQuote.author}</p>
          <p className="home-quote__context">{homeQuote.context}</p>
          <p className="home-quote__team">
            {homeQuote.teamLine}{' '}
            <Link to={homeQuote.teamLink}>{homeQuote.teamCta} →</Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
