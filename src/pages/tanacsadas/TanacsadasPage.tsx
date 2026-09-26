import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import TanacsadasBody from './TanacsadasBody';
import './tanacsadas.css';

const SECTION_BY_PATH: Record<string, string> = {
  szervezetfejlesztes: 'szervezetfejlesztes',
  valtozasmenedzsment: 'valtozasmenedzsment',
  coaching: 'coaching',
};

export default function TanacsadasPage() {
  const { pathname } = useLocation();
  const meta = useMemo(() => resolvePageMeta('/tanacsadas'), []);
  usePageMeta(meta);

  useEffect(() => {
    const segment = pathname.split('/').filter(Boolean).pop() ?? '';
    const targetId = SECTION_BY_PATH[segment];
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pathname]);

  return <TanacsadasBody />;
}
