import { useState } from 'react';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftContent } from '../../../services/content/useContent';
import type { SiteContent } from '../../../services/content/types';

export default function HomeEditPage() {
  const draft = useDraftContent();
  const heroForm = useDraftForm(draft.homeHero);
  const quoteForm = useDraftForm(draft.homeQuote);
  const reasonsForm = useDraftForm(draft.homeReasons);
  const servicesIntroForm = useDraftForm(draft.homeServicesIntro);
  const statsForm = useDraftForm(draft.homeStats);
  const closeForm = useDraftForm(draft.homeContactClose);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const dirty =
    heroForm.dirty ||
    quoteForm.dirty ||
    reasonsForm.dirty ||
    servicesIntroForm.dirty ||
    statsForm.dirty ||
    closeForm.dirty;

  function applyDraftUpdates() {
    const next: SiteContent = {
      ...contentStore.getDraft(),
      homeHero: heroForm.form,
      homeQuote: quoteForm.form,
      homeReasons: reasonsForm.form,
      homeServicesIntro: servicesIntroForm.form,
      homeStats: statsForm.form,
      homeContactClose: closeForm.form,
    };
    contentStore.saveDraft(next, 'Kezdőlap szekciók mentve', 'home');
    heroForm.markSaved(heroForm.form);
    quoteForm.markSaved(quoteForm.form);
    reasonsForm.markSaved(reasonsForm.form);
    servicesIntroForm.markSaved(servicesIntroForm.form);
    statsForm.markSaved(statsForm.form);
    closeForm.markSaved(closeForm.form);
  }

  async function handleSaveDraft() {
    setSaving(true);
    try {
      applyDraftUpdates();
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
      pushToast('success', 'Kezdőlap piszkozat mentve.');
    } catch {
      pushToast('error', 'A mentés sikertelen.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    setPublishing(true);
    try {
      if (dirty) applyDraftUpdates();
      contentStore.publish('Kezdőlap publikálva');
      pushToast('success', 'Kezdőlap publikálva.');
    } catch {
      pushToast('error', 'A publikálás sikertelen.');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <AdminPageShell
      title="Kezdőlap"
      description="A főoldal összes szerkeszthető szekciója."
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
          <AdminField label="Felső címke" htmlFor="hero-label">
            <input
              id="hero-label"
              className="admin-input"
              value={heroForm.form.label}
              onChange={(e) => heroForm.setForm({ ...heroForm.form, label: e.target.value })}
            />
          </AdminField>
          <div className="admin-form__grid">
            {heroForm.form.headlineLines.map((line, index) => (
              <AdminField key={index} label={`Cím sor ${index + 1}`} htmlFor={`hero-line-${index}`}>
                <input
                  id={`hero-line-${index}`}
                  className="admin-input"
                  value={line}
                  onChange={(e) => {
                    const headlineLines = [...heroForm.form.headlineLines] as [string, string, string];
                    headlineLines[index] = e.target.value;
                    heroForm.setForm({ ...heroForm.form, headlineLines });
                  }}
                />
              </AdminField>
            ))}
          </div>
          <AdminField label="Bevezető" htmlFor="hero-intro">
            <textarea
              id="hero-intro"
              className="admin-textarea"
              rows={3}
              value={heroForm.form.intro}
              onChange={(e) => heroForm.setForm({ ...heroForm.form, intro: e.target.value })}
            />
          </AdminField>
          <div className="admin-form__grid">
            <AdminField label="Elsődleges gomb" htmlFor="hero-cta1">
              <input
                id="hero-cta1"
                className="admin-input"
                value={heroForm.form.ctaPrimary}
                onChange={(e) => heroForm.setForm({ ...heroForm.form, ctaPrimary: e.target.value })}
              />
            </AdminField>
            <AdminField label="Elsődleges link" htmlFor="hero-cta1-link">
              <input
                id="hero-cta1-link"
                className="admin-input"
                value={heroForm.form.ctaPrimaryLink}
                onChange={(e) => heroForm.setForm({ ...heroForm.form, ctaPrimaryLink: e.target.value })}
              />
            </AdminField>
            <AdminField label="Másodlagos gomb" htmlFor="hero-cta2">
              <input
                id="hero-cta2"
                className="admin-input"
                value={heroForm.form.ctaSecondary}
                onChange={(e) => heroForm.setForm({ ...heroForm.form, ctaSecondary: e.target.value })}
              />
            </AdminField>
            <AdminField label="Másodlagos link" htmlFor="hero-cta2-link">
              <input
                id="hero-cta2-link"
                className="admin-input"
                value={heroForm.form.ctaSecondaryLink}
                onChange={(e) => heroForm.setForm({ ...heroForm.form, ctaSecondaryLink: e.target.value })}
              />
            </AdminField>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Idézet szekció</h2>
          <AdminField label="Idézet" htmlFor="home-quote">
            <textarea
              id="home-quote"
              className="admin-textarea"
              rows={3}
              value={quoteForm.form.text}
              onChange={(e) => quoteForm.setForm({ ...quoteForm.form, text: e.target.value })}
            />
          </AdminField>
          <div className="admin-form__grid">
            <AdminField label="Szerző" htmlFor="home-quote-author">
              <input
                id="home-quote-author"
                className="admin-input"
                value={quoteForm.form.author}
                onChange={(e) => quoteForm.setForm({ ...quoteForm.form, author: e.target.value })}
              />
            </AdminField>
            <AdminField label="Kontextus" htmlFor="home-quote-context">
              <input
                id="home-quote-context"
                className="admin-input"
                value={quoteForm.form.context}
                onChange={(e) => quoteForm.setForm({ ...quoteForm.form, context: e.target.value })}
              />
            </AdminField>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Miért mi? szekció</h2>
          <AdminField label="Cím" htmlFor="home-reasons-title">
            <input
              id="home-reasons-title"
              className="admin-input"
              value={reasonsForm.form.title}
              onChange={(e) => reasonsForm.setForm({ ...reasonsForm.form, title: e.target.value })}
            />
          </AdminField>
          <AdminField label="Bevezető" htmlFor="home-reasons-intro">
            <textarea
              id="home-reasons-intro"
              className="admin-textarea"
              rows={3}
              value={reasonsForm.form.intro}
              onChange={(e) => reasonsForm.setForm({ ...reasonsForm.form, intro: e.target.value })}
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Szolgáltatások bevezető</h2>
          <AdminField label="Címke" htmlFor="home-svc-kicker">
            <input
              id="home-svc-kicker"
              className="admin-input"
              value={servicesIntroForm.form.kicker}
              onChange={(e) =>
                servicesIntroForm.setForm({ ...servicesIntroForm.form, kicker: e.target.value })
              }
            />
          </AdminField>
          <AdminField label="Cím" htmlFor="home-svc-title">
            <input
              id="home-svc-title"
              className="admin-input"
              value={servicesIntroForm.form.title}
              onChange={(e) =>
                servicesIntroForm.setForm({ ...servicesIntroForm.form, title: e.target.value })
              }
            />
          </AdminField>
          <AdminField label="Bevezető" htmlFor="home-svc-intro">
            <textarea
              id="home-svc-intro"
              className="admin-textarea"
              rows={3}
              value={servicesIntroForm.form.intro}
              onChange={(e) =>
                servicesIntroForm.setForm({ ...servicesIntroForm.form, intro: e.target.value })
              }
            />
          </AdminField>
          <p className="admin-panel__lead">
            Az egyes szolgáltatás kártyák a Kezdőlap szolgáltatás elemek között szerkeszthetők (section: home).
          </p>
        </section>

        <section className="admin-panel">
          <h2>Statisztikák</h2>
          <div className="admin-form__grid">
            <AdminField label="Címke" htmlFor="home-stats-kicker">
              <input
                id="home-stats-kicker"
                className="admin-input"
                value={statsForm.form.kicker}
                onChange={(e) => statsForm.setForm({ ...statsForm.form, kicker: e.target.value })}
              />
            </AdminField>
            <AdminField label="Cím" htmlFor="home-stats-title">
              <input
                id="home-stats-title"
                className="admin-input"
                value={statsForm.form.title}
                onChange={(e) => statsForm.setForm({ ...statsForm.form, title: e.target.value })}
              />
            </AdminField>
          </div>
          {statsForm.form.items.map((stat, index) => (
            <div key={stat.label} className="admin-subpanel">
              <h3>{stat.label}</h3>
              <div className="admin-form__grid">
                <AdminField label="Érték" htmlFor={`home-stat-value-${index}`}>
                  <input
                    id={`home-stat-value-${index}`}
                    className="admin-input"
                    type="number"
                    value={stat.value}
                    onChange={(e) => {
                      const items = [...statsForm.form.items];
                      items[index] = { ...items[index], value: Number(e.target.value) };
                      statsForm.setForm({ ...statsForm.form, items });
                    }}
                  />
                </AdminField>
                <AdminField label="Utótag" htmlFor={`home-stat-suffix-${index}`}>
                  <input
                    id={`home-stat-suffix-${index}`}
                    className="admin-input"
                    value={stat.suffix}
                    onChange={(e) => {
                      const items = [...statsForm.form.items];
                      items[index] = { ...items[index], suffix: e.target.value };
                      statsForm.setForm({ ...statsForm.form, items });
                    }}
                  />
                </AdminField>
                <AdminField label="Címke" htmlFor={`home-stat-label-${index}`}>
                  <input
                    id={`home-stat-label-${index}`}
                    className="admin-input"
                    value={stat.label}
                    onChange={(e) => {
                      const items = [...statsForm.form.items];
                      items[index] = { ...items[index], label: e.target.value };
                      statsForm.setForm({ ...statsForm.form, items });
                    }}
                  />
                </AdminField>
              </div>
            </div>
          ))}
        </section>

        <section className="admin-panel">
          <h2>Záró szekció</h2>
          <div className="admin-form__grid">
            <AdminField label="Címke" htmlFor="home-close-kicker">
              <input
                id="home-close-kicker"
                className="admin-input"
                value={closeForm.form.kicker}
                onChange={(e) => closeForm.setForm({ ...closeForm.form, kicker: e.target.value })}
              />
            </AdminField>
            <AdminField label="Cím" htmlFor="home-close-title">
              <input
                id="home-close-title"
                className="admin-input"
                value={closeForm.form.title}
                onChange={(e) => closeForm.setForm({ ...closeForm.form, title: e.target.value })}
              />
            </AdminField>
            <AdminField label="Gomb" htmlFor="home-close-cta">
              <input
                id="home-close-cta"
                className="admin-input"
                value={closeForm.form.cta}
                onChange={(e) => closeForm.setForm({ ...closeForm.form, cta: e.target.value })}
              />
            </AdminField>
            <AdminField label="Link" htmlFor="home-close-link">
              <input
                id="home-close-link"
                className="admin-input"
                value={closeForm.form.link}
                onChange={(e) => closeForm.setForm({ ...closeForm.form, link: e.target.value })}
              />
            </AdminField>
          </div>
        </section>
      </form>
    </AdminPageShell>
  );
}
