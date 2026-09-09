import { useMemo } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import ReferenciakBody from './ReferenciakBody';
import './referenciak.css';

export default function ReferenciakPage() {
  const meta = useMemo(() => resolvePageMeta('/referenciak'), []);
  usePageMeta(meta);

  return <ReferenciakBody />;
}
