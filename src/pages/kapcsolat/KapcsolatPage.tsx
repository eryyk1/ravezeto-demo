import { useMemo } from 'react';
import KapcsolatForm from '../../components/kapcsolat/KapcsolatForm';
import { usePageMeta } from '../../hooks/usePageMeta';
import { useKapcsolatContent } from '../../services/content/useContent';
import { resolvePageMeta } from '../../seo/pageMeta';
import KapcsolatBody from './KapcsolatBody';
import { kapcsolatForm as kapcsolatFormDefaults } from './kapcsolatContent';
import './kapcsolat.css';

export default function KapcsolatPage() {
  const meta = useMemo(() => resolvePageMeta('/kapcsolat'), []);
  usePageMeta(meta);
  const kapcsolat = useKapcsolatContent();

  const formConfig = useMemo(
    () => ({
      title: kapcsolat.formTitle,
      submitEndpoint: kapcsolatFormDefaults.submitEndpoint,
      fields: kapcsolatFormDefaults.fields,
      submit: kapcsolatFormDefaults.submit,
      messages: kapcsolat.formMessages,
    }),
    [kapcsolat],
  );

  return <KapcsolatBody formSlot={<KapcsolatForm config={formConfig} />} />;
}
