import { StaggerGrid, StaggerItem } from '../pages/StaggerReveal';
import type { referenciakQuotes } from '../../pages/referenciak/referenciakContent';
import './ReferenceQuotes.css';

type ReferenceQuotesProps = {
  quotes: typeof referenciakQuotes;
};

export default function ReferenceQuotes({ quotes }: ReferenceQuotesProps) {
  return (
    <StaggerGrid className="reference-quotes">
      {quotes.map((quote) => (
        <StaggerItem key={quote.id}>
          <figure className="reference-quotes__item">
            <blockquote>„{quote.text}"</blockquote>
            <figcaption>
              <strong>{quote.author}</strong>
              <span>{quote.role}</span>
            </figcaption>
          </figure>
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
