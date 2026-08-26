import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

type Testimonial = {
  logo: string;
  who: string;
  quotes: readonly string[];
};

type TestimonialDeckProps = {
  items: readonly Testimonial[];
};

const ROTATE_MS = 15000;

export default function TestimonialDeck({ items }: TestimonialDeckProps) {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const active = items[activeIndex];

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const showIndex = useCallback(
    (index: number) => {
      if (index === activeIndex) return;

      if (reduced) {
        setActiveIndex(index);
        return;
      }

      setTransitioning(true);
      window.setTimeout(() => {
        setActiveIndex(index);
        setTransitioning(false);
      }, 280);
    },
    [activeIndex, reduced],
  );

  const restartTimer = useCallback(() => {
    clearTimer();
    if (reduced) return;

    timerRef.current = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % items.length;
        if (reduced) return next;

        setTransitioning(true);
        window.setTimeout(() => setTransitioning(false), 280);
        return next;
      });
    }, ROTATE_MS);
  }, [clearTimer, items.length, reduced]);

  useEffect(() => {
    restartTimer();
    return clearTimer;
  }, [clearTimer, restartTimer]);

  const pause = () => clearTimer();
  const resume = () => restartTimer();

  return (
    <>
      <div className="tst rev" onMouseEnter={pause} onMouseLeave={resume}>
        <div className="tst-card">
          <div className={`tst-inner${transitioning ? ' out' : ''}`}>
            <blockquote className="tst-quote">
              {active.quotes.map((quote) => (
                <p key={quote.slice(0, 40)}>{quote}</p>
              ))}
            </blockquote>
            <div className="tst-who">{active.who}</div>
          </div>
        </div>
      </div>

      <div
        className="tst-logos rev"
        role="tablist"
        aria-label="Ügyfél-vélemények választása"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        {items.map((item, index) => (
          <button
            key={item.logo}
            type="button"
            role="tab"
            className={`tst-logo${index === activeIndex ? ' on' : ''}`}
            aria-selected={index === activeIndex}
            onClick={() => {
              showIndex(index);
              restartTimer();
            }}
          >
            {item.logo}
          </button>
        ))}
      </div>
    </>
  );
}
