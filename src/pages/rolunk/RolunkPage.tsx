import { useMemo } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import RolunkBody from './RolunkBody';
import './rolunk.css';

export default function RolunkPage() {
  const meta = useMemo(() => resolvePageMeta('/rolunk'), []);
  usePageMeta(meta);

  return <RolunkBody />;
}
