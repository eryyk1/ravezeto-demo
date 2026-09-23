import { useEffect } from 'react';

/** Highlights the active entry in `.ltoc` while scrolling legal sections. */
export function useJogiTocSpy(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.ltoc a'));
    if (!links.length) return;

    const sections = links
      .map((link) => {
        const href = link.getAttribute('href');
        if (!href?.startsWith('#')) return null;
        return document.getElementById(href.slice(1));
      })
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => link.classList.remove('on'));
          const active = links.find(
            (link) => link.getAttribute('href') === `#${entry.target.id}`,
          );
          active?.classList.add('on');
        });
      },
      { rootMargin: '-18% 0px -72% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);
}
