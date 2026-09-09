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

function setupAureliusQuote(reduced: boolean) {
  const au = document.getElementById('aurelius');
  const wrap = document.querySelector('.aurelius-wrap');
  if (!au || !wrap || au.querySelector('span')) return undefined;

  const words = au.textContent?.trim().split(/\s+/) ?? [];
  if (!words.length) return undefined;

  const goldPattern = /^(változás,|megváltozik,|változásnak)$/;
  au.innerHTML = words
    .map((word) => {
      const gold = goldPattern.test(word) ? 'gold' : '';
      return `<span class="${gold}">${word}</span>`;
    })
    .join(' ');

  const spans = [...au.querySelectorAll('span')];

  const light = () => {
    const rect = wrap.getBoundingClientRect();
    const progress = Math.min(
      Math.max((window.innerHeight - rect.top) / (window.innerHeight / 2 + rect.height / 2), 0),
      1,
    );
    const litCount = Math.round(progress * spans.length);
    spans.forEach((span, index) => span.classList.toggle('lit', index < litCount));
  };

  if (reduced) {
    spans.forEach((span) => span.classList.add('lit'));
    return undefined;
  }

  window.addEventListener('scroll', light, { passive: true });
  light();

  return () => window.removeEventListener('scroll', light);
}

function setupReferenciakTestimonials(reduced: boolean) {
  const inner = document.getElementById('tstInner');
  const logos = document.getElementById('tstLogos');
  if (!inner || !logos) return undefined;

  const items = [...inner.querySelectorAll('.tst-item')];
  const btns = [...logos.querySelectorAll('.tst-logo')];
  if (!items.length || !btns.length) return undefined;

  let idx = 0;
  let timer: number | null = null;

  const render = (i: number) => {
    items.forEach((el, j) => el.classList.toggle('on', j === i));
    btns.forEach((b, j) => {
      b.classList.toggle('on', j === i);
      b.setAttribute('aria-selected', String(j === i));
    });
  };

  const show = (i: number) => {
    if (reduced) {
      render(i);
      return;
    }
    inner.classList.add('out');
    window.setTimeout(() => {
      render(i);
      inner.classList.remove('out');
    }, 280);
  };

  const handlers = btns.map((b, i) => {
    const onClick = () => {
      idx = i;
      show(i);
      restart();
    };
    b.addEventListener('click', onClick);
    return () => b.removeEventListener('click', onClick);
  });

  const next = () => {
    idx = (idx + 1) % items.length;
    show(idx);
  };

  const restart = () => {
    if (timer !== null) window.clearInterval(timer);
    if (!reduced) timer = window.setInterval(next, 15000);
  };

  const tstBox = document.querySelector('.tst');
  const pause = () => {
    if (timer !== null) window.clearInterval(timer);
  };
  tstBox?.addEventListener('mouseenter', pause);
  logos.addEventListener('mouseenter', pause);
  tstBox?.addEventListener('mouseleave', restart);
  logos.addEventListener('mouseleave', restart);

  restart();

  return () => {
    handlers.forEach((off) => off());
    if (timer !== null) window.clearInterval(timer);
    tstBox?.removeEventListener('mouseenter', pause);
    logos.removeEventListener('mouseenter', pause);
    tstBox?.removeEventListener('mouseleave', restart);
    logos.removeEventListener('mouseleave', restart);
  };
}

function setupReferenciakLogoHover() {
  const flow = document.querySelector('.lg-flow');
  if (!flow) return undefined;

  const names = [...document.querySelectorAll('.partner-list .pn')] as HTMLElement[];

  const set = (slug: string, on: boolean) => {
    names.forEach((node) => {
      if (node.dataset.p === slug) node.classList.toggle('on', on);
    });
  };

  const cellOf = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return null;
    return target.closest('.cell');
  };

  const onOver = (event: Event) => {
    const cell = cellOf(event.target);
    if (cell instanceof HTMLElement && cell.dataset.p) set(cell.dataset.p, true);
  };

  const onOut = (event: Event) => {
    const cell = cellOf(event.target);
    if (cell instanceof HTMLElement && cell.dataset.p) set(cell.dataset.p, false);
  };

  const onLeave = () => names.forEach((node) => node.classList.remove('on'));

  flow.addEventListener('mouseover', onOver);
  flow.addEventListener('mouseout', onOut);
  flow.addEventListener('mouseleave', onLeave);

  return () => {
    flow.removeEventListener('mouseover', onOver);
    flow.removeEventListener('mouseout', onOut);
    flow.removeEventListener('mouseleave', onLeave);
  };
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
    const cleanupAurelius = setupAureliusQuote(reduced);
    const cleanupDocStamp = setupDocStamp(reduced);
    const cleanupReferenciakTestimonials =
      pathname === '/referenciak' ? setupReferenciakTestimonials(reduced) : undefined;
    const cleanupReferenciakLogoHover =
      pathname === '/referenciak' ? setupReferenciakLogoHover() : undefined;

    return () => {
      cleanupMarks?.();
      cleanupParallax?.();
      cleanupCounters?.();
      cleanupAurelius?.();
      cleanupDocStamp?.();
      cleanupReferenciakTestimonials?.();
      cleanupReferenciakLogoHover?.();
    };
  }, [reduced, pathname]);
}
