import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftJogiImpresszum } from '../../../services/content/useContent';

export default function JogiImpresszumEditPage() {
  const source = useDraftJogiImpresszum();
  const { form, setForm, dirty, markSaved } = useDraftForm(source);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  async function handleSaveDraft() {
    setSaving(true);
    try {
      contentStore.updateDraftSection('jogiImpresszum', form, 'Impresszum mentve');
      markSaved(form);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
      pushToast('success', 'Impresszum piszkozat mentve.');
    } catch {
      pushToast('error', 'A mentés sikertelen.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (dirty) {
      contentStore.updateDraftSection('jogiImpresszum', form, 'Impresszum mentve');
      markSaved(form);
    }
    setPublishing(true);
    try {
      const result = await contentStore.publishToServer('Impresszum publikálva');
      if (result.ok) pushToast('success', 'Impresszum publikálva a szerverre.');
      else pushToast('error', result.error);
    } catch {
      pushToast('error', 'A publikálás sikertelen.');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <AdminPageShell
      title="Impresszum"
      description="A /jogi/impresszum oldal HTML tartalma. A formázás (táblázatok, linkek, fejezetek) megmarad."
    >
      <AdminSaveBar
        dirty={dirty}
        saving={saving}
        saved={savedFlash}
        publishing={publishing}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />

      <AdminField label="Tartalom (HTML)" hint="A .legal blokk belseje — fejezetek, táblázatok, linkek.">
        <textarea
          className="admin-textarea admin-textarea--tall admin-textarea--mono"
          rows={28}
          value={form.bodyHtml}
          onChange={(event) => setForm({ ...form, bodyHtml: event.target.value })}
          spellCheck={false}
        />
      </AdminField>
    </AdminPageShell>
  );
}
