import { useMemo } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import TanacsadasBody from './TanacsadasBody';
import './tanacsadas.css';

export default function TanacsadasPage() {
  const meta = useMemo(() => resolvePageMeta('/tanacsadas'), []);
  usePageMeta(meta);

  return <TanacsadasBody />;
}
