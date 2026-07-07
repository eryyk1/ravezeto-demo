import { useEffect, useRef, useState } from 'react';

type ScrollDirection = 'up' | 'down' | 'none';

export function useScrollDirection(threshold = 80): {
  direction: ScrollDirection;
  scrollY: number;
} {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<ScrollDirection>('none');
  const lastY = useRef(0);
  const accumulated = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (Math.abs(delta) > 4) {
        accumulated.current += delta;
        if (accumulated.current > threshold) {
          setDirection('down');
          accumulated.current = 0;
        } else if (accumulated.current < -40) {
          setDirection('up');
          accumulated.current = 0;
        }
        lastY.current = y;
      }

      setScrollY(y);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { direction, scrollY };
}
