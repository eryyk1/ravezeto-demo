import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftJogiImpresszum } from '../../../services/content/useContent';
import { normalizeLegalHtml } from '../../../utils/legalHtml';
import { defaultJogiImpresszum } from '../../../content/jogi/jogiDefaults';

export default function JogiImpresszumEditPage() {
  const source = useDraftJogiImpresszum();
  const { form, setForm, dirty, markSaved } = useDraftForm(source);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  /** Loads the bundled default text into this form only. Nothing is saved or published until the editor does so. */
  function handleLoadBundledDefault() {
    const confirmed = window.confirm(
      'Az űrlap jelenlegi szövege felülíródik a kódban szereplő, legújabb impresszum szöveggel. ' +
        'Ez csak az űrlapot módosítja: a piszkozat és a publikált tartalom csak a Mentés / Publikálás gombbal változik. Folytatja?',
    );
    if (!confirmed) return;
    setForm({ ...form, bodyHtml: defaultJogiImpresszum.bodyHtml });
    pushToast('success', 'A legújabb szöveg betöltve az űrlapba — ellenőrizze, majd mentse vagy publikálja.');
  }

  async function handleSaveDraft() {
    setSaving(true);
    try {
      const next = { ...form, bodyHtml: normalizeLegalHtml(form.bodyHtml) };
      contentStore.updateDraftSection('jogiImpresszum', next, 'Impresszum mentve');
      markSaved(next);
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
      const next = { ...form, bodyHtml: normalizeLegalHtml(form.bodyHtml) };
      contentStore.updateDraftSection('jogiImpresszum', next, 'Impresszum mentve');
      markSaved(next);
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

      <p>
        <button type="button" className="admin-btn" onClick={handleLoadBundledDefault}>
          A kódban szereplő legújabb szöveg betöltése az űrlapba
        </button>
      </p>

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
