import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentService } from '../../../services/content/store';
import { usePalyazatokSettings } from '../../../services/content/useContent';

export default function PalyazatokEditPage() {
  const settings = usePalyazatokSettings();
  const { pushToast } = useAdminUi();
  const [form, setForm] = useState(settings);

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    contentService.updatePalyazatok(form);
    pushToast('success', 'Pályázatok tartalom mentve.');
  }

  return (
    <AdminPageShell
      title="Pályázatok"
      description="A Pályázatok oldal fő szövegei. A publikus oldal elrendezése változatlan marad."
    >

      <form className="admin-form" onSubmit={handleSave}>
        <AdminField label="Hero címke" htmlFor="paly-label">
          <input
            id="paly-label"
            className="admin-input"
            value={form.heroLabel}
            onChange={(event) => setForm({ ...form, heroLabel: event.target.value })}
          />
        </AdminField>
        <AdminField label="Első kérdés (q1)" htmlFor="paly-q1">
          <textarea
            id="paly-q1"
            className="admin-textarea"
            rows={2}
            value={form.q1}
            onChange={(event) => setForm({ ...form, q1: event.target.value })}
          />
        </AdminField>
        <div className="admin-form__grid">
          <AdminField label="Második kérdés eleje" htmlFor="paly-q2">
            <input
              id="paly-q2"
              className="admin-input"
              value={form.q2Lead}
              onChange={(event) => setForm({ ...form, q2Lead: event.target.value })}
            />
          </AdminField>
          <AdminField label="Kiemelt szó" htmlFor="paly-q2-mark">
            <input
              id="paly-q2-mark"
              className="admin-input"
              value={form.q2Mark}
              onChange={(event) => setForm({ ...form, q2Mark: event.target.value })}
            />
          </AdminField>
        </div>
        <AdminField label="Alcím" htmlFor="paly-lead">
          <input
            id="paly-lead"
            className="admin-input"
            value={form.lead}
            onChange={(event) => setForm({ ...form, lead: event.target.value })}
          />
        </AdminField>
        <div className="admin-form__grid">
          <AdminField label="Határidő címke" htmlFor="paly-deadline-k">
            <input
              id="paly-deadline-k"
              className="admin-input"
              value={form.deadlineKicker}
              onChange={(event) => setForm({ ...form, deadlineKicker: event.target.value })}
            />
          </AdminField>
          <AdminField label="Határidő dátum" htmlFor="paly-deadline-d">
            <input
              id="paly-deadline-d"
              className="admin-input"
              value={form.deadlineDate}
              onChange={(event) => setForm({ ...form, deadlineDate: event.target.value })}
            />
          </AdminField>
        </div>

        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--primary" type="submit">
            Mentés
          </button>
        </div>
      </form>
    </AdminPageShell>
  );
}
