import { useEffect, useState } from 'react';

const COMPACT_QUERY = '(max-width: 768px)';

export function useCompactViewport(): boolean {
  const [compact, setCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(COMPACT_QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY);
    const onChange = (event: MediaQueryListEvent) => setCompact(event.matches);

    setCompact(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return compact;
}
