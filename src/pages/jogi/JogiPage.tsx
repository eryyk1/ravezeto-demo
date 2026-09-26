import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import { useJogiAdatvedelemContent, useJogiImpresszumContent } from '../../services/content/useContent';
import JogiDocumentBody from './JogiDocumentBody';
import './jogi.css';

function resolveSlug(pathname: string): string | null {
  const segment = pathname.split('/').filter(Boolean).pop();
  return segment && segment !== 'jogi' ? segment : null;
}

export default function JogiPage() {
  const { pathname } = useLocation();
  const slug = resolveSlug(pathname) ?? 'adatvedelem';
  const metaPath = `/jogi/${slug}`;
  const meta = useMemo(() => resolvePageMeta(metaPath), [metaPath]);
  usePageMeta(meta);

  const impresszum = useJogiImpresszumContent();
  const adatvedelem = useJogiAdatvedelemContent();

  const variant =
    slug === 'impresszum' ? 'impresszum' : slug === 'cookie' ? 'cookie' : 'adatvedelem';

  return (
    <JogiDocumentBody
      variant={variant}
      impresszum={impresszum}
      adatvedelem={adatvedelem}
      logoSrc={
        variant === 'impresszum'
          ? '/assets/images/impresszum/img-02.svg'
          : '/assets/images/adatvedelem/img-02.svg'
      }
    />
  );
}
