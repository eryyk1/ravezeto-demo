import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import ImageField from '../../components/ImageField';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftContent } from '../../../services/content/useContent';

export default function FelnottkepzesEditPage() {
  const draft = useDraftContent();
  const source = draft.felnottkepzes;
  const { form, setForm, dirty, markSaved } = useDraftForm(source);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  async function saveAll(draftOnly: boolean) {
    if (dirty) {
      contentStore.updateFelnottkepzes(form);
      markSaved(form);
    }
    if (!draftOnly) contentStore.publish('Felnőttképzés oldal publikálva');
  }

  async function handleSaveDraft() {
    setSaving(true);
    try {
      await saveAll(true);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
      pushToast('success', 'Felnőttképzés piszkozat mentve.');
    } catch {
      pushToast('error', 'A mentés sikertelen.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    setPublishing(true);
    try {
      await saveAll(false);
      pushToast('success', 'Felnőttképzés oldal publikálva.');
    } catch {
      pushToast('error', 'A publikálás sikertelen.');
    } finally {
      setPublishing(false);
    }
  }

  function updateCategories(updater: typeof draft.felnottkepzesCategories) {
    contentStore.updateDraftSection('felnottkepzesCategories', updater, 'Felnőttképzés kategóriák mentve');
  }

  return (
    <AdminPageShell
      title="Felnőttképzés"
      description="A Felnőttképzés oldal szövegei, kategóriái és programjai."
      actions={
        <Link className="admin-btn admin-btn--ghost" to="/admin/szolgaltatasok">
          Vissza
        </Link>
      }
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
          <AdminField label="Címke" htmlFor="fk-hero-label">
            <input
              id="fk-hero-label"
              className="admin-input"
              value={form.hero.label}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, label: e.target.value } })}
            />
          </AdminField>
          <div className="admin-form__grid">
            <AdminField label="Cím (első rész)" htmlFor="fk-hero-lead">
              <input
                id="fk-hero-lead"
                className="admin-input"
                value={form.hero.titleLead}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, titleLead: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Cím (kiemelt)" htmlFor="fk-hero-mark">
              <input
                id="fk-hero-mark"
                className="admin-input"
                value={form.hero.titleMark}
                onChange={(e) => setForm({ ...form, hero: { ...form.hero, titleMark: e.target.value } })}
              />
            </AdminField>
          </div>
          <AdminField label="Díj sor" htmlFor="fk-hero-award">
            <input
              id="fk-hero-award"
              className="admin-input"
              value={form.hero.awardLine}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, awardLine: e.target.value } })}
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Kulcsüzenet és módszertan</h2>
          <AdminField label="Címke" htmlFor="fk-km-label">
            <input
              id="fk-km-label"
              className="admin-input"
              value={form.keyMessage.label}
              onChange={(e) =>
                setForm({ ...form, keyMessage: { ...form.keyMessage, label: e.target.value } })
              }
            />
          </AdminField>
          <AdminField label="Cím" htmlFor="fk-km-title">
            <input
              id="fk-km-title"
              className="admin-input"
              value={form.keyMessage.title}
              onChange={(e) =>
                setForm({ ...form, keyMessage: { ...form.keyMessage, title: e.target.value } })
              }
            />
          </AdminField>
          <AdminField label="Szöveg" htmlFor="fk-km-text">
            <textarea
              id="fk-km-text"
              className="admin-textarea"
              rows={4}
              value={form.keyMessage.text}
              onChange={(e) =>
                setForm({ ...form, keyMessage: { ...form.keyMessage, text: e.target.value } })
              }
            />
          </AdminField>
          <AdminField label="Módszer címkék (soronként egy)" htmlFor="fk-tags">
            <textarea
              id="fk-tags"
              className="admin-textarea"
              rows={4}
              value={form.methodTags.join('\n')}
              onChange={(e) =>
                setForm({
                  ...form,
                  methodTags: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                })
              }
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Minősítések és folyamat</h2>
          {form.credentials.paragraphs.map((paragraph, index) => (
            <AdminField key={index} label={`Bekezdés ${index + 1}`} htmlFor={`fk-cred-${index}`}>
              <textarea
                id={`fk-cred-${index}`}
                className="admin-textarea"
                rows={3}
                value={paragraph}
                onChange={(e) => {
                  const paragraphs = [...form.credentials.paragraphs];
                  paragraphs[index] = e.target.value;
                  setForm({ ...form, credentials: { paragraphs } });
                }}
              />
            </AdminField>
          ))}
          <AdminField label="Nyilvántartás" htmlFor="fk-reg">
            <input
              id="fk-reg"
              className="admin-input"
              value={form.registration}
              onChange={(e) => setForm({ ...form, registration: e.target.value })}
            />
          </AdminField>
          <AdminField label="Engedély" htmlFor="fk-license">
            <input
              id="fk-license"
              className="admin-input"
              value={form.license}
              onChange={(e) => setForm({ ...form, license: e.target.value })}
            />
          </AdminField>
          <AdminField label="Mottó" htmlFor="fk-motto">
            <textarea
              id="fk-motto"
              className="admin-textarea"
              rows={2}
              value={form.motto}
              onChange={(e) => setForm({ ...form, motto: e.target.value })}
            />
          </AdminField>
          <AdminField label="Folyamat bevezető" htmlFor="fk-process">
            <textarea
              id="fk-process"
              className="admin-textarea"
              rows={2}
              value={form.processLead}
              onChange={(e) => setForm({ ...form, processLead: e.target.value })}
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Kategóriák</h2>
          {draft.felnottkepzesCategories.map((category, index) => (
            <div key={category.id} className="admin-subpanel">
              <h3>
                {category.index}. {category.title}
              </h3>
              <AdminField label="Cím" htmlFor={`fk-cat-title-${category.id}`}>
                <input
                  id={`fk-cat-title-${category.id}`}
                  className="admin-input"
                  value={category.title}
                  onChange={(e) => {
                    const next = [...draft.felnottkepzesCategories];
                    next[index] = { ...next[index], title: e.target.value };
                    updateCategories(next);
                  }}
                />
              </AdminField>
              <AdminField label="Leírás" htmlFor={`fk-cat-text-${category.id}`}>
                <textarea
                  id={`fk-cat-text-${category.id}`}
                  className="admin-textarea"
                  rows={3}
                  value={category.text}
                  onChange={(e) => {
                    const next = [...draft.felnottkepzesCategories];
                    next[index] = { ...next[index], text: e.target.value };
                    updateCategories(next);
                  }}
                />
              </AdminField>
              <ImageField
                label="Kép"
                value={category.image ?? ''}
                onChange={(value) => {
                  const next = [...draft.felnottkepzesCategories];
                  next[index] = { ...next[index], image: value };
                  updateCategories(next);
                }}
              />
            </div>
          ))}
        </section>

        <section className="admin-panel">
          <h2>Záró szekció</h2>
          <div className="admin-form__grid">
            <AdminField label="Címke" htmlFor="fk-close-kicker">
              <input
                id="fk-close-kicker"
                className="admin-input"
                value={form.close.kicker}
                onChange={(e) => setForm({ ...form, close: { ...form.close, kicker: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Cím" htmlFor="fk-close-title">
              <input
                id="fk-close-title"
                className="admin-input"
                value={form.close.title}
                onChange={(e) => setForm({ ...form, close: { ...form.close, title: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Gomb" htmlFor="fk-close-cta">
              <input
                id="fk-close-cta"
                className="admin-input"
                value={form.close.cta}
                onChange={(e) => setForm({ ...form, close: { ...form.close, cta: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Link" htmlFor="fk-close-link">
              <input
                id="fk-close-link"
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
