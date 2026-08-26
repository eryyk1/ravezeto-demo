import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from './useReducedMotion';

export function useScrollReveal() {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    const els = document.querySelectorAll('.rev, .tagrow, .ch-big');

    if (reduced) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    els.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 3) * 0.08}s`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, [reduced, pathname]);
}
