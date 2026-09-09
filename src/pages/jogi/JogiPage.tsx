import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import AdatvedelemBody from './AdatvedelemBody';
import ImpresszumBody from './ImpresszumBody';
import './jogi.css';

function resolveSlug(pathname: string): string | null {
  const segment = pathname.split('/').filter(Boolean).pop();
  return segment && segment !== 'jogi' ? segment : null;
}

export default function JogiPage() {
  const { pathname } = useLocation();
  const slug = resolveSlug(pathname);
  const isImpresszum = slug === 'impresszum';
  const metaPath = isImpresszum ? '/jogi/impresszum' : '/jogi/adatvedelem';
  const meta = useMemo(() => resolvePageMeta(metaPath), [metaPath]);
  usePageMeta(meta);

  return isImpresszum ? <ImpresszumBody /> : <AdatvedelemBody />;
}
