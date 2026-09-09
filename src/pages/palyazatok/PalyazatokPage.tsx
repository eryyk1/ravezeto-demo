import { useMemo } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import { usePalyazatokContent } from '../../services/content/useContent';
import PalyazatokForm from './PalyazatokForm';
import PalyazatokBody from './PalyazatokBody';
import './palyazatok.css';

export default function PalyazatokPage() {
  const meta = useMemo(() => resolvePageMeta('/palyazatok'), []);
  usePageMeta(meta);
  const content = usePalyazatokContent();

  return (
    <PalyazatokBody
      content={content}
      formSlot={<PalyazatokForm content={content} />}
    />
  );
}
