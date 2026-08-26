import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import ImageField from '../../components/ImageField';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftRolunk } from '../../../services/content/useContent';

export default function RolunkEditPage() {
  const source = useDraftRolunk();
  const { form, setForm, dirty, markSaved } = useDraftForm(source);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  async function handleSaveDraft() {
    setSaving(true);
    try {
      contentStore.updateRolunk(form);
      markSaved(form);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
      pushToast('success', 'Rólunk piszkozat mentve.');
    } catch {
      pushToast('error', 'A mentés sikertelen.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (dirty) contentStore.updateRolunk(form);
    setPublishing(true);
    try {
      if (dirty) markSaved(form);
      contentStore.publish('Rólunk oldal publikálva');
      pushToast('success', 'Rólunk oldal publikálva.');
    } catch {
      pushToast('error', 'A publikálás sikertelen.');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <AdminPageShell
      title="Rólunk"
      description="A Rólunk oldal szövegei, képei és záró szekciója."
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
          <h2>Hero szekció</h2>
          <AdminField label="Címke" htmlFor="rolunk-hero-label">
            <input
              id="rolunk-hero-label"
              className="admin-input"
              value={form.hero.label}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, label: e.target.value } })}
            />
          </AdminField>
          <div className="admin-form__grid">
            <AdminField label="Cím (első rész)" htmlFor="rolunk-hero-title">
              <input
                id="rolunk-hero-title"
                className="admin-input"
                value={form.hero.title}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Cím (kiemelt rész)" htmlFor="rolunk-hero-mark">
              <input
                id="rolunk-hero-mark"
                className="admin-input"
                value={form.hero.titleMark}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, titleMark: e.target.value } })}
              />
            </AdminField>
          </div>
          <AdminField label="Bevezető" htmlFor="rolunk-hero-intro">
            <textarea
              id="rolunk-hero-intro"
              className="admin-textarea"
              rows={3}
              value={form.hero.intro}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, intro: e.target.value } })}
            />
          </AdminField>
          <ImageField
            label="Hero kép"
            value={form.hero.image}
            onChange={(value) => setForm({ ...form, hero: { ...form.hero, image: value } })}
          />
          <AdminField label="Kép alt szöveg" htmlFor="rolunk-hero-alt">
            <input
              id="rolunk-hero-alt"
              className="admin-input"
              value={form.hero.imageAlt}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, imageAlt: e.target.value } })}
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Történet / mottó</h2>
          <AdminField label="Latin mottó" htmlFor="rolunk-motto">
            <input
              id="rolunk-motto"
              className="admin-input"
              value={form.story.motto}
              onChange={(e) => setForm({ ...form, story: { ...form.story, motto: e.target.value } })}
            />
          </AdminField>
          <AdminField label="Kiemelt idézet" htmlFor="rolunk-pull">
            <textarea
              id="rolunk-pull"
              className="admin-textarea"
              rows={3}
              value={form.story.pullQuote}
              onChange={(e) => setForm({ ...form, story: { ...form.story, pullQuote: e.target.value } })}
            />
          </AdminField>
          {form.story.paragraphs.map((paragraph, index) => (
            <AdminField key={index} label={`Bekezdés ${index + 1}`} htmlFor={`rolunk-p-${index}`}>
              <textarea
                id={`rolunk-p-${index}`}
                className="admin-textarea"
                rows={4}
                value={paragraph}
                onChange={(e) => {
                  const paragraphs = [...form.story.paragraphs];
                  paragraphs[index] = e.target.value;
                  setForm({ ...form, story: { ...form.story, paragraphs } });
                }}
              />
            </AdminField>
          ))}
        </section>

        <section className="admin-panel">
          <h2>Értékeink</h2>
          <AdminField label="Címke" htmlFor="rolunk-values-label">
            <input
              id="rolunk-values-label"
              className="admin-input"
              value={form.values.label}
              onChange={(e) => setForm({ ...form, values: { ...form.values, label: e.target.value } })}
            />
          </AdminField>
          <AdminField label="Cím" htmlFor="rolunk-values-title">
            <input
              id="rolunk-values-title"
              className="admin-input"
              value={form.values.title}
              onChange={(e) => setForm({ ...form, values: { ...form.values, title: e.target.value } })}
            />
          </AdminField>
          <ImageField
            label="Értékek kép"
            value={form.values.image}
            onChange={(value) => setForm({ ...form, values: { ...form.values, image: value } })}
          />
          <AdminField label="Érték címkék (soronként egy)" htmlFor="rolunk-values-labels">
            <textarea
              id="rolunk-values-labels"
              className="admin-textarea"
              rows={6}
              value={form.values.labels.join('\n')}
              onChange={(e) =>
                setForm({
                  ...form,
                  values: {
                    ...form.values,
                    labels: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                  },
                })
              }
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Záró szekció</h2>
          <AdminField label="Záró szöveg (referencia sor)" htmlFor="rolunk-closing">
            <textarea
              id="rolunk-closing"
              className="admin-textarea"
              rows={3}
              value={form.closing}
              onChange={(e) => setForm({ ...form, closing: e.target.value })}
            />
          </AdminField>
          <div className="admin-form__grid">
            <AdminField label="CTA címke" htmlFor="rolunk-close-kicker">
              <input
                id="rolunk-close-kicker"
                className="admin-input"
                value={form.close.kicker}
                onChange={(e) => setForm({ ...form, close: { ...form.close, kicker: e.target.value } })}
              />
            </AdminField>
            <AdminField label="CTA cím" htmlFor="rolunk-close-title">
              <input
                id="rolunk-close-title"
                className="admin-input"
                value={form.close.title}
                onChange={(e) => setForm({ ...form, close: { ...form.close, title: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Gomb szöveg" htmlFor="rolunk-close-cta">
              <input
                id="rolunk-close-cta"
                className="admin-input"
                value={form.close.cta}
                onChange={(e) => setForm({ ...form, close: { ...form.close, cta: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Gomb link" htmlFor="rolunk-close-link">
              <input
                id="rolunk-close-link"
                className="admin-input"
                value={form.close.link}
                onChange={(e) => setForm({ ...form, close: { ...form.close, link: e.target.value } })}
              />
            </AdminField>
          </div>
        </section>
      </form>
    </AdminPageShell>
  );
}
