import { homeQuote, homeQuoteVisual } from '../../../content/home';
import SectionReveal from '../../../components/home/SectionReveal';
import './HomeQuote.css';

export default function HomeQuote() {
  return (
    <SectionReveal className="home-quote" aria-label="Idézet">
      <div className="home-quote__inner content-wrap">
        <span className="home-quote__mark" aria-hidden="true">
          „
        </span>

        <div className="home-quote__content">
          <blockquote className="home-quote__text">{homeQuote.text}</blockquote>
          <cite className="home-quote__author">— {homeQuote.author}</cite>
        </div>

        <div className="home-quote__visual" aria-hidden="true">
          <img
            className="home-quote__ship"
            src={homeQuoteVisual.ship}
            alt=""
            width={320}
            height={180}
            loading="lazy"
          />
          <img
            className="home-quote__boat"
            src={homeQuoteVisual.boat}
            alt=""
            width={64}
            height={64}
            loading="lazy"
          />
        </div>
      </div>
    </SectionReveal>
  );
}
