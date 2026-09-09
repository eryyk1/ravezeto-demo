import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import ImageField from '../../components/ImageField';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftPalyazatok } from '../../../services/content/useContent';
import type { PalyazatokPartnerLogo } from '../../../services/content/types';

export default function PalyazatokEditPage() {
  const source = useDraftPalyazatok();
  const { form, setForm, dirty, markSaved } = useDraftForm(source);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  function updatePartner(index: number, patch: Partial<PalyazatokPartnerLogo>) {
    const partners = form.partners.map((logo, i) =>
      i === index ? { ...logo, ...patch } : logo,
    );
    setForm({ ...form, partners });
  }

  function updateStep(index: 0 | 1 | 2, value: string) {
    const steps = [...form.steps] as [string, string, string];
    steps[index] = value;
    setForm({ ...form, steps });
  }

  async function handleSaveDraft() {
    setSaving(true);
    try {
      contentStore.updatePalyazatok(form);
      markSaved(form);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
      pushToast('success', 'Pályázatok piszkozat mentve.');
    } catch {
      pushToast('error', 'A mentés sikertelen.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (dirty) {
      contentStore.updatePalyazatok(form);
      markSaved(form);
    }
    setPublishing(true);
    try {
      contentStore.publish('Pályázatok oldal publikálva');
      pushToast('success', 'Pályázatok oldal publikálva.');
    } catch {
      pushToast('error', 'A publikálás sikertelen.');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <AdminPageShell
      title="Pályázatok"
      description="A Pályázatok oldal teljes tartalma — hero, határidő, rólunk, partnerek, lépések, kapcsolat és űrlap."
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
          <h2>Hero</h2>
          <AdminField label="Címke" htmlFor="paly-label">
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
          <AdminField label="CTA gomb" htmlFor="paly-cta">
            <input
              id="paly-cta"
              className="admin-input"
              value={form.heroCta}
              onChange={(event) => setForm({ ...form, heroCta: event.target.value })}
            />
          </AdminField>
          <AdminField label="Oldal státusza" htmlFor="paly-active">
            <label className="admin-checkbox">
              <input
                id="paly-active"
                type="checkbox"
                checked={form.active}
                onChange={(event) => setForm({ ...form, active: event.target.checked })}
              />
              Aktív (megjelenik a navigációban)
            </label>
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Határidő / státusz</h2>
          <AdminField label="Üzenet" htmlFor="paly-deadline">
            <input
              id="paly-deadline"
              className="admin-input"
              value={form.deadlineMessage}
              onChange={(event) => setForm({ ...form, deadlineMessage: event.target.value })}
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Rólunk blokk</h2>
          <AdminField label="Szöveg" htmlFor="paly-about">
            <textarea
              id="paly-about"
              className="admin-textarea"
              rows={3}
              value={form.aboutText}
              onChange={(event) => setForm({ ...form, aboutText: event.target.value })}
            />
          </AdminField>
          <div className="admin-form__grid">
            <AdminField label="Link szövege" htmlFor="paly-about-link-label">
              <input
                id="paly-about-link-label"
                className="admin-input"
                value={form.aboutLinkLabel}
                onChange={(event) => setForm({ ...form, aboutLinkLabel: event.target.value })}
              />
            </AdminField>
            <AdminField label="Link URL" htmlFor="paly-about-link">
              <input
                id="paly-about-link"
                className="admin-input"
                value={form.aboutLink}
                onChange={(event) => setForm({ ...form, aboutLink: event.target.value })}
              />
            </AdminField>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Partnerek</h2>
          <AdminField label="Címke" htmlFor="paly-partners-label">
            <input
              id="paly-partners-label"
              className="admin-input"
              value={form.partnersLabel}
              onChange={(event) => setForm({ ...form, partnersLabel: event.target.value })}
            />
          </AdminField>
          {form.partners.map((logo, index) => (
            <div key={index} className="admin-subpanel">
              <h3>Partner {index + 1}</h3>
              <ImageField
                label="Logó"
                value={logo.src}
                onChange={(src) => updatePartner(index, { src })}
              />
              <AdminField label="Alt szöveg" htmlFor={`paly-partner-alt-${index}`}>
                <input
                  id={`paly-partner-alt-${index}`}
                  className="admin-input"
                  value={logo.alt}
                  onChange={(event) => updatePartner(index, { alt: event.target.value })}
                />
              </AdminField>
            </div>
          ))}
          <div className="admin-form__grid">
            <AdminField label="Referenciák link szövege" htmlFor="paly-partners-link-label">
              <input
                id="paly-partners-link-label"
                className="admin-input"
                value={form.partnersLinkLabel}
                onChange={(event) => setForm({ ...form, partnersLinkLabel: event.target.value })}
              />
            </AdminField>
            <AdminField label="Referenciák link URL" htmlFor="paly-partners-link">
              <input
                id="paly-partners-link"
                className="admin-input"
                value={form.partnersLink}
                onChange={(event) => setForm({ ...form, partnersLink: event.target.value })}
              />
            </AdminField>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Hogyan segítünk?</h2>
          <div className="admin-form__grid">
            <AdminField label="Címke" htmlFor="paly-steps-label">
              <input
                id="paly-steps-label"
                className="admin-input"
                value={form.stepsLabel}
                onChange={(event) => setForm({ ...form, stepsLabel: event.target.value })}
              />
            </AdminField>
            <AdminField label="Cím" htmlFor="paly-steps-title">
              <input
                id="paly-steps-title"
                className="admin-input"
                value={form.stepsTitle}
                onChange={(event) => setForm({ ...form, stepsTitle: event.target.value })}
              />
            </AdminField>
          </div>
          {([0, 1, 2] as const).map((index) => (
            <AdminField key={index} label={`Lépés ${index + 1}`} htmlFor={`paly-step-${index}`}>
              <textarea
                id={`paly-step-${index}`}
                className="admin-textarea"
                rows={2}
                value={form.steps[index]}
                onChange={(event) => updateStep(index, event.target.value)}
              />
            </AdminField>
          ))}
        </section>

        <section className="admin-panel">
          <h2>Kapcsolattartó</h2>
          <div className="admin-form__grid">
            <AdminField label="Név" htmlFor="paly-contact-name">
              <input
                id="paly-contact-name"
                className="admin-input"
                value={form.contactName}
                onChange={(event) => setForm({ ...form, contactName: event.target.value })}
              />
            </AdminField>
            <AdminField label="Beosztás" htmlFor="paly-contact-role">
              <input
                id="paly-contact-role"
                className="admin-input"
                value={form.contactRole}
                onChange={(event) => setForm({ ...form, contactRole: event.target.value })}
              />
            </AdminField>
          </div>
          <ImageField
            label="Portré"
            value={form.contactPortrait}
            onChange={(contactPortrait) => setForm({ ...form, contactPortrait })}
          />
          <div className="admin-form__grid">
            <AdminField label="E-mail" htmlFor="paly-contact-email">
              <input
                id="paly-contact-email"
                className="admin-input"
                type="email"
                value={form.contactEmail}
                onChange={(event) => setForm({ ...form, contactEmail: event.target.value })}
              />
            </AdminField>
            <AdminField label="Telefon (megjelenítés)" htmlFor="paly-contact-phone">
              <input
                id="paly-contact-phone"
                className="admin-input"
                value={form.contactPhone}
                onChange={(event) => setForm({ ...form, contactPhone: event.target.value })}
              />
            </AdminField>
            <AdminField label="Telefon (tel:)" htmlFor="paly-contact-phone-tel">
              <input
                id="paly-contact-phone-tel"
                className="admin-input"
                value={form.contactPhoneTel}
                onChange={(event) => setForm({ ...form, contactPhoneTel: event.target.value })}
              />
            </AdminField>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Űrlap</h2>
          <AdminField label="Űrlap cím" htmlFor="paly-form-title">
            <input
              id="paly-form-title"
              className="admin-input"
              value={form.formTitle}
              onChange={(event) => setForm({ ...form, formTitle: event.target.value })}
            />
          </AdminField>
          <AdminField label="Küldés gomb" htmlFor="paly-form-submit">
            <input
              id="paly-form-submit"
              className="admin-input"
              value={form.formSubmit}
              onChange={(event) => setForm({ ...form, formSubmit: event.target.value })}
            />
          </AdminField>
          <AdminField label="Adatkezelési szöveg" htmlFor="paly-form-privacy">
            <textarea
              id="paly-form-privacy"
              className="admin-textarea"
              rows={2}
              value={form.formPrivacyText}
              onChange={(event) => setForm({ ...form, formPrivacyText: event.target.value })}
            />
          </AdminField>
          <div className="admin-form__grid">
            <AdminField label="Adatvédelmi link URL" htmlFor="paly-form-privacy-link">
              <input
                id="paly-form-privacy-link"
                className="admin-input"
                value={form.formPrivacyLink}
                onChange={(event) => setForm({ ...form, formPrivacyLink: event.target.value })}
              />
            </AdminField>
            <AdminField label="Adatvédelmi link szövege" htmlFor="paly-form-privacy-label">
              <input
                id="paly-form-privacy-label"
                className="admin-input"
                value={form.formPrivacyLinkLabel}
                onChange={(event) =>
                  setForm({ ...form, formPrivacyLinkLabel: event.target.value })
                }
              />
            </AdminField>
          </div>
        </section>
      </form>
    </AdminPageShell>
  );
}
