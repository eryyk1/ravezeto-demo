import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentService, contentStore } from '../../../services/content/store';
import { useCompanySettings } from '../../../services/content/useContent';

export default function SettingsPage() {
  const company = useCompanySettings();
  const { pushToast } = useAdminUi();
  const [form, setForm] = useState(company);

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    contentService.updateCompany(form);
    pushToast('success', 'Beállítások mentve.');
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
      description="Cégadatok és globális weboldal-beállítások."
    >

      <form className="admin-form" onSubmit={handleSave}>
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

        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--primary" type="submit">
            Mentés
          </button>
          <button className="admin-btn admin-btn--danger" type="button" onClick={handleReset}>
            Alapértelmezés visszaállítása
          </button>
        </div>
      </form>
    </AdminPageShell>
  );
}
