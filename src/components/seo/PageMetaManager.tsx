import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';

export default function PageMetaManager() {
  const { pathname } = useLocation();

  const meta = useMemo(() => resolvePageMeta(pathname), [pathname]);

  usePageMeta(meta);

  return null;
}
