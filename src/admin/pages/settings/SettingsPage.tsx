import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftCompanySettings } from '../../../services/content/useContent';

export default function SettingsPage() {
  const source = useDraftCompanySettings();
  const { form, setForm, dirty, markSaved } = useDraftForm(source);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  async function handleSaveDraft() {
    setSaving(true);
    try {
      contentStore.updateCompany(form);
      markSaved(form);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
      pushToast('success', 'Beállítások piszkozat mentve.');
    } catch {
      pushToast('error', 'A mentés sikertelen.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (dirty) {
      contentStore.updateCompany(form);
      markSaved(form);
    }
    setPublishing(true);
    try {
      contentStore.publish('Beállítások publikálva');
      pushToast('success', 'Beállítások publikálva.');
    } catch {
      pushToast('error', 'A publikálás sikertelen.');
    } finally {
      setPublishing(false);
    }
  }

  function handleReset() {
    if (!window.confirm('Biztosan visszaállítja az összes tartalmat az alapértelmezett értékekre?')) {
      return;
    }
    contentStore.resetToDefaults();
    pushToast('info', 'Tartalom visszaállítva az alapértelmezett értékekre.');
  }

  return (
    <AdminPageShell
      title="Beállítások"
      description="Cégadatok — e-mail, telefon, cím és szlogen. Publikálás után érvényesül a weboldalon."
    >
      <AdminSaveBar
        dirty={dirty}
        saving={saving}
        saved={savedFlash}
        publishing={publishing}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
      />

      <form className="admin-form" onSubmit={(event) => event.preventDefault()}>
        <section className="admin-panel">
          <h2>Cégadatok</h2>
          <div className="admin-form__grid">
            <AdminField label="Cégnév" htmlFor="company-name">
              <input
                id="company-name"
                className="admin-input"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </AdminField>
            <AdminField label="Szlogen" htmlFor="company-tagline">
              <input
                id="company-tagline"
                className="admin-input"
                value={form.tagline}
                onChange={(event) => setForm({ ...form, tagline: event.target.value })}
              />
            </AdminField>
            <AdminField label="Email" htmlFor="company-email">
              <input
                id="company-email"
                className="admin-input"
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
            </AdminField>
            <AdminField label="Telefon" htmlFor="company-phone">
              <input
                id="company-phone"
                className="admin-input"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
              />
            </AdminField>
            <AdminField label="Telefon (tel:)" htmlFor="company-phone-tel">
              <input
                id="company-phone-tel"
                className="admin-input"
                value={form.phoneTel}
                onChange={(event) => setForm({ ...form, phoneTel: event.target.value })}
              />
            </AdminField>
            <AdminField label="Facebook URL" htmlFor="company-facebook">
              <input
                id="company-facebook"
                className="admin-input"
                type="url"
                value={form.facebook}
                onChange={(event) => setForm({ ...form, facebook: event.target.value })}
              />
            </AdminField>
          </div>

          <AdminField label="Cím" htmlFor="company-address">
            <input
              id="company-address"
              className="admin-input"
              value={form.address}
              onChange={(event) => setForm({ ...form, address: event.target.value })}
            />
          </AdminField>

          <AdminField label="Nyitvatartás" htmlFor="company-hours">
            <input
              id="company-hours"
              className="admin-input"
              value={form.hours}
              onChange={(event) => setForm({ ...form, hours: event.target.value })}
            />
          </AdminField>
        </section>

        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--danger" type="button" onClick={handleReset}>
            Alapértelmezés visszaállítása
          </button>
        </div>
      </form>
    </AdminPageShell>
  );
}
