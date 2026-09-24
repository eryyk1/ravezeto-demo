import { useMemo } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import FelnottkepzesBody from './FelnottkepzesBody';
import './felnottkepzes.css';

export default function FelnottkepzesPage() {
  const meta = useMemo(() => resolvePageMeta('/felnottkepzes'), []);
  usePageMeta(meta);
  return <FelnottkepzesBody />;
}
