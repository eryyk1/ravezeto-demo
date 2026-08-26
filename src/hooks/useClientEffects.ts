import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from './useReducedMotion';

const SVG_NS = 'http://www.w3.org/2000/svg';

function setupGoldMarks() {
  document.querySelectorAll('.mark:not(.marks)').forEach((el) => {
    el.classList.add('marks');

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 200 20');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('filter', 'url(#skrough2)');
    svg.setAttribute('aria-hidden', 'true');

    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', 'M4,12 C50,7 120,15 196,9');
    path.setAttribute('pathLength', '300');
    path.setAttribute('stroke-dasharray', '300');
    path.setAttribute('stroke-dashoffset', '300');
    svg.appendChild(path);
    el.appendChild(svg);
  });

  const drawIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('rect,path').forEach((node) => {
          (node as SVGGeometryElement).style.strokeDashoffset = '0';
        });
        drawIo.unobserve(entry.target);
      });
    },
    { threshold: 0.35 },
  );

  document.querySelectorAll('.marks > svg').forEach((svg) => drawIo.observe(svg));

  return () => drawIo.disconnect();
}

function setupGhostSpans() {
  document.querySelectorAll('.word-sec .big').forEach((big) => {
    if (big.querySelector('.ghost')) return;

    const ghost = document.createElement('span');
    ghost.className = 'ghost';
    ghost.setAttribute('aria-hidden', 'true');
    ghost.textContent = big.textContent;
    big.appendChild(ghost);
  });
}

function setupLinesParallax() {
  const lines = document.querySelector('.lines') as HTMLElement | null;
  if (!lines) return undefined;

  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      lines.style.transform = `translateY(${window.scrollY * 0.12}px)`;
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

function setupGoldLineDraw() {
  const path = document.querySelector('.lines path:nth-child(3)') as SVGPathElement | null;
  if (!path) return;

  path.setAttribute('pathLength', '600');
  path.style.strokeDasharray = '600';
  path.style.strokeDashoffset = '600';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 2.5s ease .4s';
      path.style.strokeDashoffset = '0';
    });
  });
}

function setupStatCounters(reduced: boolean) {
  if (reduced) return undefined;

  const so = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        so.unobserve(entry.target);

        const el = entry.target as HTMLElement;
        const dataset = el.dataset;
        const target = Number(dataset.target ?? dataset.t);
        const suffix = dataset.suffix ?? dataset.s ?? '';
        if (Number.isNaN(target)) return;

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1200, 1);
          const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
          el.textContent = `${value}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll('.stat .num[data-target], .stat .num[data-t], .tstat .num[data-target], .tstat .num[data-t]').forEach((el) => {
    so.observe(el);
  });

  return () => so.disconnect();
}

function setupDocStamp(reduced: boolean) {
  const docs = document.querySelectorAll('.doc');
  if (!docs.length) return undefined;

  if (reduced) {
    docs.forEach((doc) => doc.classList.add('stamped'));
    return undefined;
  }

  docs.forEach((doc) => {
    doc.querySelectorAll('.num').forEach((numEl) => {
      const text = numEl.textContent ?? '';
      if (numEl.querySelector('span')) return;

      numEl.textContent = '';
      [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.transition = `opacity .22s ease ${index * 0.045}s`;
        numEl.appendChild(span);
      });
    });
  });

  const docIo = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('stamped');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 },
  );

  docs.forEach((doc) => docIo.observe(doc));

  return () => docIo.disconnect();
}

export function useClientEffects() {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    const cleanupMarks = setupGoldMarks();
    setupGhostSpans();

    const cleanupParallax = reduced ? undefined : setupLinesParallax();
    if (!reduced) setupGoldLineDraw();
    const cleanupCounters = setupStatCounters(reduced);
    const cleanupDocStamp = setupDocStamp(reduced);

    return () => {
      cleanupMarks?.();
      cleanupParallax?.();
      cleanupCounters?.();
      cleanupDocStamp?.();
    };
  }, [reduced, pathname]);
}
