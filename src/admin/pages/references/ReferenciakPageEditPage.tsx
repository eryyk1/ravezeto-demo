import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftReferenciakPage } from '../../../services/content/useContent';

export default function ReferenciakPageEditPage() {
  const source = useDraftReferenciakPage();
  const { form, setForm, dirty, markSaved } = useDraftForm(source);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  async function handleSaveDraft() {
    setSaving(true);
    try {
      contentStore.updateDraftSection('referenciakPage', form, 'Referenciák oldal mentve');
      markSaved(form);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
      pushToast('success', 'Referenciák piszkozat mentve.');
    } catch {
      pushToast('error', 'A mentés sikertelen.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (dirty) {
      contentStore.updateDraftSection('referenciakPage', form, 'Referenciák oldal mentve');
      markSaved(form);
    }
    setPublishing(true);
    try {
      contentStore.publish('Referenciák oldal publikálva');
      pushToast('success', 'Referenciák oldal publikálva.');
    } catch {
      pushToast('error', 'A publikálás sikertelen.');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <AdminPageShell
      title="Referenciák oldal"
      description="A Referenciák oldal hero, statisztika és CTA szekciói. A vélemények külön kezelhetők."
    >
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
          <AdminField label="Címke" htmlFor="ref-hero-label">
            <input
              id="ref-hero-label"
              className="admin-input"
              value={form.hero.label}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, label: e.target.value } })}
            />
          </AdminField>
          <div className="admin-form__grid">
            <AdminField label="Cím" htmlFor="ref-hero-title">
              <input
                id="ref-hero-title"
                className="admin-input"
                value={form.hero.title}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Cím (kiemelt)" htmlFor="ref-hero-mark">
              <input
                id="ref-hero-mark"
                className="admin-input"
                value={form.hero.titleMark}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, titleMark: e.target.value } })}
              />
            </AdminField>
          </div>
          <AdminField label="Bevezető" htmlFor="ref-hero-lead">
            <textarea
              id="ref-hero-lead"
              className="admin-textarea"
              rows={3}
              value={form.hero.lead}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, lead: e.target.value } })}
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Statisztikák</h2>
          {form.stats.map((stat, index) => (
            <div key={stat.label} className="admin-subpanel">
              <h3>{stat.label}</h3>
              <div className="admin-form__grid">
                <AdminField label="Érték" htmlFor={`ref-stat-value-${index}`}>
                  <input
                    id={`ref-stat-value-${index}`}
                    className="admin-input"
                    type="number"
                    value={stat.value}
                    onChange={(e) => {
                      const stats = [...form.stats];
                      stats[index] = { ...stats[index], value: Number(e.target.value) };
                      setForm({ ...form, stats });
                    }}
                  />
                </AdminField>
                <AdminField label="Utótag" htmlFor={`ref-stat-suffix-${index}`}>
                  <input
                    id={`ref-stat-suffix-${index}`}
                    className="admin-input"
                    value={stat.suffix}
                    onChange={(e) => {
                      const stats = [...form.stats];
                      stats[index] = { ...stats[index], suffix: e.target.value };
                      setForm({ ...form, stats });
                    }}
                  />
                </AdminField>
                <AdminField label="Címke" htmlFor={`ref-stat-label-${index}`}>
                  <input
                    id={`ref-stat-label-${index}`}
                    className="admin-input"
                    value={stat.label}
                    onChange={(e) => {
                      const stats = [...form.stats];
                      stats[index] = { ...stats[index], label: e.target.value };
                      setForm({ ...form, stats });
                    }}
                  />
                </AdminField>
              </div>
            </div>
          ))}
        </section>

        <section className="admin-panel">
          <h2>CTA szekció</h2>
          <div className="admin-form__grid">
            <AdminField label="Címke" htmlFor="ref-cta-kicker">
              <input
                id="ref-cta-kicker"
                className="admin-input"
                value={form.cta.kicker}
                onChange={(e) => setForm({ ...form, cta: { ...form.cta, kicker: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Cím" htmlFor="ref-cta-title">
              <input
                id="ref-cta-title"
                className="admin-input"
                value={form.cta.title}
                onChange={(e) => setForm({ ...form, cta: { ...form.cta, title: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Gomb" htmlFor="ref-cta-btn">
              <input
                id="ref-cta-btn"
                className="admin-input"
                value={form.cta.btnLabel}
                onChange={(e) => setForm({ ...form, cta: { ...form.cta, btnLabel: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Link" htmlFor="ref-cta-link">
              <input
                id="ref-cta-link"
                className="admin-input"
                value={form.cta.link}
                onChange={(e) => setForm({ ...form, cta: { ...form.cta, link: e.target.value } })}
              />
            </AdminField>
          </div>
          <AdminField label="Szöveg" htmlFor="ref-cta-text">
            <textarea
              id="ref-cta-text"
              className="admin-textarea"
              rows={3}
              value={form.cta.text}
              onChange={(e) => setForm({ ...form, cta: { ...form.cta, text: e.target.value } })}
            />
          </AdminField>
        </section>
      </form>
    </AdminPageShell>
  );
}
