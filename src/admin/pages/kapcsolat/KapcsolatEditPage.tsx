import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftKapcsolat } from '../../../services/content/useContent';

export default function KapcsolatEditPage() {
  const source = useDraftKapcsolat();
  const { form, setForm, dirty, markSaved } = useDraftForm(source);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  async function handleSaveDraft() {
    setSaving(true);
    try {
      contentStore.updateDraftSection('kapcsolat', form, 'Kapcsolat oldal mentve');
      markSaved(form);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
      pushToast('success', 'Kapcsolat piszkozat mentve.');
    } catch {
      pushToast('error', 'A mentés sikertelen.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (dirty) {
      contentStore.updateDraftSection('kapcsolat', form, 'Kapcsolat oldal mentve');
      markSaved(form);
    }
    setPublishing(true);
    try {
      contentStore.publish('Kapcsolat oldal publikálva');
      pushToast('success', 'Kapcsolat oldal publikálva.');
    } catch {
      pushToast('error', 'A publikálás sikertelen.');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <AdminPageShell title="Kapcsolat" description="A Kapcsolat oldal hero szekciója, térkép és űrlap szövegei.">
      <AdminSaveBar
        dirty={dirty}
        saving={saving}
        saved={savedFlash}
        publishing={publishing}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />

      <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
        <section className="admin-panel">
          <h2>Hero</h2>
          <AdminField label="Címke" htmlFor="kap-hero-label">
            <input
              id="kap-hero-label"
              className="admin-input"
              value={form.hero.label}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, label: e.target.value } })}
            />
          </AdminField>
          <AdminField label="Cím" htmlFor="kap-hero-title">
            <textarea
              id="kap-hero-title"
              className="admin-textarea"
              rows={2}
              value={form.hero.title}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
            />
          </AdminField>
          <AdminField label="Bevezető" htmlFor="kap-hero-intro">
            <textarea
              id="kap-hero-intro"
              className="admin-textarea"
              rows={3}
              value={form.hero.intro}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, intro: e.target.value } })}
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Térkép és iroda</h2>
          <AdminField label="Google Maps embed URL" htmlFor="kap-map">
            <input
              id="kap-map"
              className="admin-input"
              value={form.mapEmbed}
              onChange={(e) => setForm({ ...form, mapEmbed: e.target.value })}
            />
          </AdminField>
          <AdminField label="Google Maps keresés link" htmlFor="kap-maps-search">
            <input
              id="kap-maps-search"
              className="admin-input"
              value={form.mapsSearch}
              onChange={(e) => setForm({ ...form, mapsSearch: e.target.value })}
            />
          </AdminField>
          <AdminField label="Kapucsengő megjegyzés" htmlFor="kap-doorbell">
            <input
              id="kap-doorbell"
              className="admin-input"
              value={form.doorbellNote}
              onChange={(e) => setForm({ ...form, doorbellNote: e.target.value })}
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Űrlap</h2>
          <AdminField label="Űrlap cím" htmlFor="kap-form-title">
            <input
              id="kap-form-title"
              className="admin-input"
              value={form.formTitle}
              onChange={(e) => setForm({ ...form, formTitle: e.target.value })}
            />
          </AdminField>
          <div className="admin-form__grid">
            <AdminField label="Sikeres üzenet" htmlFor="kap-msg-success">
              <input
                id="kap-msg-success"
                className="admin-input"
                value={form.formMessages.success}
                onChange={(e) =>
                  setForm({
                    ...form,
                    formMessages: { ...form.formMessages, success: e.target.value },
                  })
                }
              />
            </AdminField>
            <AdminField label="Hiba üzenet" htmlFor="kap-msg-error">
              <input
                id="kap-msg-error"
                className="admin-input"
                value={form.formMessages.error}
                onChange={(e) =>
                  setForm({
                    ...form,
                    formMessages: { ...form.formMessages, error: e.target.value },
                  })
                }
              />
            </AdminField>
          </div>
        </section>
      </form>
    </AdminPageShell>
  );
}
