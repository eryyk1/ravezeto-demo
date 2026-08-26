import { useEffect, useMemo, useState } from 'react';

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

export function usePreloadImages(urls: readonly string[]): boolean {
  const key = useMemo(() => urls.join('|'), [urls]);
  const [ready, setReady] = useState(() => urls.length === 0);

  useEffect(() => {
    if (urls.length === 0) {
      setReady(true);
      return;
    }

    let cancelled = false;
    setReady(false);

    Promise.all(urls.map((url) => preloadImage(url))).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [key, urls]);

  return ready;
}
