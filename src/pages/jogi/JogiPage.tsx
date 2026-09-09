import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import JogiDocumentBody from './JogiDocumentBody';
import { jogiPages } from './jogiContent';
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

  const content = jogiPages[slug] ?? jogiPages.adatvedelem;

  return (
    <JogiDocumentBody
      content={content}
      showCompanyDetails={slug === 'impresszum'}
      logoSrc={
        slug === 'impresszum'
          ? '/assets/images/impresszum/img-02.svg'
          : '/assets/images/adatvedelem/img-02.svg'
      }
    />
  );
}
