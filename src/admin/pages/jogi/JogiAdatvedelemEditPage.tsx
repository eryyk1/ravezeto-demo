import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftJogiAdatvedelem } from '../../../services/content/useContent';

export default function JogiAdatvedelemEditPage() {
  const source = useDraftJogiAdatvedelem();
  const { form, setForm, dirty, markSaved } = useDraftForm(source);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  async function handleSaveDraft() {
    setSaving(true);
    try {
      contentStore.updateDraftSection('jogiAdatvedelem', form, 'Adatkezelés mentve');
      markSaved(form);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
      pushToast('success', 'Adatkezelés piszkozat mentve.');
    } catch {
      pushToast('error', 'A mentés sikertelen.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (dirty) {
      contentStore.updateDraftSection('jogiAdatvedelem', form, 'Adatkezelés mentve');
      markSaved(form);
    }
    setPublishing(true);
    try {
      const result = await contentStore.publishToServer('Adatkezelés publikálva');
      if (result.ok) pushToast('success', 'Adatkezelés publikálva a szerverre.');
      else pushToast('error', result.error);
    } catch {
      pushToast('error', 'A publikálás sikertelen.');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <AdminPageShell
      title="Adatkezelés"
      description="A /jogi/adatvedelem oldal tartalma: bevezető szöveg és HTML (tartalomjegyzék + fejezetek)."
    >
      <AdminSaveBar
        dirty={dirty}
        saving={saving}
        saved={savedFlash}
        publishing={publishing}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />

      <AdminField label="Hero bevezető">
        <textarea
          className="admin-textarea"
          rows={4}
          value={form.heroLead}
          onChange={(event) => setForm({ ...form, heroLead: event.target.value })}
        />
      </AdminField>

      <AdminField
        label="Tartalom (HTML)"
        hint="A .lgrid blokk belseje — tartalomjegyzék és jogi fejezetek."
      >
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
