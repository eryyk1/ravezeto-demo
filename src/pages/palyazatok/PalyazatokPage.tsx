import { useMemo } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { resolvePageMeta } from '../../seo/pageMeta';
import type { PalyazatokSettings } from '../../services/content/types';
import PalyazatokForm from './PalyazatokForm';
import PalyazatokBody from './PalyazatokBody';
import { palyazatokForm } from './palyazatokContent';
import './palyazatok.css';

const formContent = {
  formSubmit: palyazatokForm.submit,
  formPrivacyText: palyazatokForm.privacyText,
  formPrivacyLink: palyazatokForm.privacyLink,
  formPrivacyLinkLabel: palyazatokForm.privacyLinkLabel,
} as PalyazatokSettings;

export default function PalyazatokPage() {
  const meta = useMemo(() => resolvePageMeta('/palyazatok'), []);
  usePageMeta(meta);

  return (
    <PalyazatokBody formSlot={<PalyazatokForm content={formContent} />} />
  );
}
