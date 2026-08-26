import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageHeader from '../../components/AdminPageHeader';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentService } from '../../../services/content/store';
import { useHomeHero } from '../../../services/content/useContent';

export default function HomeEditPage() {
  const hero = useHomeHero();
  const { pushToast } = useAdminUi();
  const [form, setForm] = useState(hero);

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    contentService.updateHomeHero(form);
    pushToast('success', 'Kezdőlap hero szekció mentve.');
  }

  return (
    <>
      <AdminPageHeader
        title="Kezdőlap"
        description="A főoldal hero szekció címe, szövege és gombjai."
      />

      <form className="admin-form" onSubmit={handleSave}>
        <AdminField label="Felső címke" htmlFor="hero-label">
          <input
            id="hero-label"
            className="admin-input"
            value={form.label}
            onChange={(event) => setForm({ ...form, label: event.target.value })}
          />
        </AdminField>

        <div className="admin-form__grid">
          {form.headlineLines.map((line, index) => (
            <AdminField key={index} label={`Cím sor ${index + 1}`} htmlFor={`hero-line-${index}`}>
              <input
                id={`hero-line-${index}`}
                className="admin-input"
                value={line}
                onChange={(event) => {
                  const headlineLines = [...form.headlineLines] as [string, string, string];
                  headlineLines[index] = event.target.value;
                  setForm({ ...form, headlineLines });
                }}
              />
            </AdminField>
          ))}
        </div>

        <AdminField label="Bevezető szöveg" htmlFor="hero-intro">
          <textarea
            id="hero-intro"
            className="admin-textarea"
            rows={4}
            value={form.intro}
            onChange={(event) => setForm({ ...form, intro: event.target.value })}
          />
        </AdminField>

        <div className="admin-form__grid">
          <AdminField label="Elsődleges gomb" htmlFor="hero-cta1">
            <input
              id="hero-cta1"
              className="admin-input"
              value={form.ctaPrimary}
              onChange={(event) => setForm({ ...form, ctaPrimary: event.target.value })}
            />
          </AdminField>
          <AdminField label="Elsődleges gomb link" htmlFor="hero-cta1-link">
            <input
              id="hero-cta1-link"
              className="admin-input"
              value={form.ctaPrimaryLink}
              onChange={(event) => setForm({ ...form, ctaPrimaryLink: event.target.value })}
            />
          </AdminField>
          <AdminField label="Másodlagos gomb" htmlFor="hero-cta2">
            <input
              id="hero-cta2"
              className="admin-input"
              value={form.ctaSecondary}
              onChange={(event) => setForm({ ...form, ctaSecondary: event.target.value })}
            />
          </AdminField>
          <AdminField label="Másodlagos gomb link" htmlFor="hero-cta2-link">
            <input
              id="hero-cta2-link"
              className="admin-input"
              value={form.ctaSecondaryLink}
              onChange={(event) => setForm({ ...form, ctaSecondaryLink: event.target.value })}
            />
          </AdminField>
        </div>

        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--primary" type="submit">
            Mentés
          </button>
        </div>
      </form>
    </>
  );
}
