import { useMemo } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import HomeBody from './HomeBody';
import './client-prototype.css';

export default function HomePage() {
  const meta = useMemo(() => resolvePageMeta('/'), []);
  usePageMeta(meta);

  return <HomeBody />;
}
