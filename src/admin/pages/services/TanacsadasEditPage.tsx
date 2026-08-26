import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import AdminSaveBar from '../../components/AdminSaveBar';
import ImageField from '../../components/ImageField';
import { useDraftForm } from '../../hooks/useDraftForm';
import { useAdminUi } from '../../context/AdminUiContext';
import { contentStore } from '../../../services/content/store';
import { useDraftTanacsadas } from '../../../services/content/useContent';

export default function TanacsadasEditPage() {
  const source = useDraftTanacsadas();
  const { form, setForm, dirty, markSaved } = useDraftForm(source);
  const { pushToast } = useAdminUi();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  async function handleSaveDraft() {
    setSaving(true);
    try {
      contentStore.updateTanacsadas(form);
      markSaved(form);
      setSavedFlash(true);
      window.setTimeout(() => setSavedFlash(false), 2000);
      pushToast('success', 'Tanácsadás piszkozat mentve.');
    } catch {
      pushToast('error', 'A mentés sikertelen.');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (dirty) contentStore.updateTanacsadas(form);
    setPublishing(true);
    try {
      if (dirty) markSaved(form);
      contentStore.publish('Tanácsadás oldal publikálva');
      pushToast('success', 'Tanácsadás oldal publikálva.');
    } catch {
      pushToast('error', 'A publikálás sikertelen.');
    } finally {
      setPublishing(false);
    }
  }

  return (
    <AdminPageShell
      title="Tanácsadás"
      description="A Tanácsadás oldal szövegei és szekciói."
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
          <AdminField label="Címke" htmlFor="tan-hero-label">
            <input
              id="tan-hero-label"
              className="admin-input"
              value={form.hero.label}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, label: e.target.value } })}
            />
          </AdminField>
          <AdminField label="Cím" htmlFor="tan-hero-title">
            <textarea
              id="tan-hero-title"
              className="admin-textarea"
              rows={3}
              value={form.hero.title}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, title: e.target.value } })}
            />
          </AdminField>
          <AdminField label="Bevezető" htmlFor="tan-hero-intro">
            <textarea
              id="tan-hero-intro"
              className="admin-textarea"
              rows={3}
              value={form.hero.intro}
              onChange={(e) => setForm({ ...form, hero: { ...form.hero, intro: e.target.value } })}
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Idézet (Aurelius)</h2>
          <AdminField label="Szöveg" htmlFor="tan-quote">
            <textarea
              id="tan-quote"
              className="admin-textarea"
              rows={4}
              value={form.quote.text}
              onChange={(e) => setForm({ ...form, quote: { ...form.quote, text: e.target.value } })}
            />
          </AdminField>
          <div className="admin-form__grid">
            <AdminField label="Szerző" htmlFor="tan-quote-author">
              <input
                id="tan-quote-author"
                className="admin-input"
                value={form.quote.author}
                onChange={(e) => setForm({ ...form, quote: { ...form.quote, author: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Megjegyzés" htmlFor="tan-quote-note">
              <input
                id="tan-quote-note"
                className="admin-input"
                value={form.quote.note}
                onChange={(e) => setForm({ ...form, quote: { ...form.quote, note: e.target.value } })}
              />
            </AdminField>
          </div>
        </section>

        <section className="admin-panel">
          <h2>Szervezetfejlesztés</h2>
          <AdminField label="Kiemelt mondat" htmlFor="tan-punch">
            <textarea
              id="tan-punch"
              className="admin-textarea"
              rows={3}
              value={form.szervezetfejlesztes.punch}
              onChange={(e) =>
                setForm({
                  ...form,
                  szervezetfejlesztes: { ...form.szervezetfejlesztes, punch: e.target.value },
                })
              }
            />
          </AdminField>
          {form.szervezetfejlesztes.bands.map((band, bandIndex) => (
            <div key={bandIndex} className="admin-subpanel">
              <h3>Sáv {bandIndex + 1}</h3>
              <AdminField label="Cím" htmlFor={`tan-band-title-${bandIndex}`}>
                <input
                  id={`tan-band-title-${bandIndex}`}
                  className="admin-input"
                  value={band.title}
                  onChange={(e) => {
                    const bands = [...form.szervezetfejlesztes.bands];
                    bands[bandIndex] = { ...bands[bandIndex], title: e.target.value };
                    setForm({ ...form, szervezetfejlesztes: { ...form.szervezetfejlesztes, bands } });
                  }}
                />
              </AdminField>
              {band.paragraphs.map((paragraph, pIndex) => (
                <AdminField key={pIndex} label={`Bekezdés ${pIndex + 1}`} htmlFor={`tan-band-${bandIndex}-p-${pIndex}`}>
                  <textarea
                    id={`tan-band-${bandIndex}-p-${pIndex}`}
                    className="admin-textarea"
                    rows={3}
                    value={paragraph}
                    onChange={(e) => {
                      const bands = [...form.szervezetfejlesztes.bands];
                      const paragraphs = [...bands[bandIndex].paragraphs];
                      paragraphs[pIndex] = e.target.value;
                      bands[bandIndex] = { ...bands[bandIndex], paragraphs };
                      setForm({ ...form, szervezetfejlesztes: { ...form.szervezetfejlesztes, bands } });
                    }}
                  />
                </AdminField>
              ))}
              <ImageField
                label="Fotó"
                value={band.photo ?? ''}
                onChange={(value) => {
                  const bands = [...form.szervezetfejlesztes.bands];
                  bands[bandIndex] = { ...bands[bandIndex], photo: value };
                  setForm({ ...form, szervezetfejlesztes: { ...form.szervezetfejlesztes, bands } });
                }}
                hint={band.photoLabel}
              />
            </div>
          ))}
          <AdminField label="Mottó sor" htmlFor="tan-motto">
            <textarea
              id="tan-motto"
              className="admin-textarea"
              rows={2}
              value={form.motto}
              onChange={(e) => setForm({ ...form, motto: e.target.value })}
            />
          </AdminField>
        </section>

        <section className="admin-panel">
          <h2>Coaching</h2>
          <div className="admin-form__grid">
            <AdminField label="Bevezető (kiemelt)" htmlFor="tan-coach-strong">
              <input
                id="tan-coach-strong"
                className="admin-input"
                value={form.coaching.leadStrong}
                onChange={(e) =>
                  setForm({ ...form, coaching: { ...form.coaching, leadStrong: e.target.value } })
                }
              />
            </AdminField>
            <AdminField label="Bevezető (folytatás)" htmlFor="tan-coach-rest">
              <input
                id="tan-coach-rest"
                className="admin-input"
                value={form.coaching.leadRest}
                onChange={(e) =>
                  setForm({ ...form, coaching: { ...form.coaching, leadRest: e.target.value } })
                }
              />
            </AdminField>
          </div>
          {form.coaching.cards.map((card, cardIndex) => (
            <div key={cardIndex} className="admin-subpanel">
              <h3>Kártya {cardIndex + 1}</h3>
              <AdminField label="Cím" htmlFor={`tan-card-title-${cardIndex}`}>
                <input
                  id={`tan-card-title-${cardIndex}`}
                  className="admin-input"
                  value={card.title}
                  onChange={(e) => {
                    const cards = [...form.coaching.cards];
                    cards[cardIndex] = { ...cards[cardIndex], title: e.target.value };
                    setForm({ ...form, coaching: { ...form.coaching, cards } });
                  }}
                />
              </AdminField>
              {card.paragraphs.map((paragraph, pIndex) => (
                <AdminField key={pIndex} label={`Bekezdés ${pIndex + 1}`} htmlFor={`tan-card-${cardIndex}-p-${pIndex}`}>
                  <textarea
                    id={`tan-card-${cardIndex}-p-${pIndex}`}
                    className="admin-textarea"
                    rows={3}
                    value={paragraph}
                    onChange={(e) => {
                      const cards = [...form.coaching.cards];
                      const paragraphs = [...cards[cardIndex].paragraphs];
                      paragraphs[pIndex] = e.target.value;
                      cards[cardIndex] = { ...cards[cardIndex], paragraphs };
                      setForm({ ...form, coaching: { ...form.coaching, cards } });
                    }}
                  />
                </AdminField>
              ))}
            </div>
          ))}
        </section>

        <section className="admin-panel">
          <h2>Záró szekció</h2>
          <div className="admin-form__grid">
            <AdminField label="Címke" htmlFor="tan-close-kicker">
              <input
                id="tan-close-kicker"
                className="admin-input"
                value={form.close.kicker}
                onChange={(e) => setForm({ ...form, close: { ...form.close, kicker: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Cím" htmlFor="tan-close-title">
              <input
                id="tan-close-title"
                className="admin-input"
                value={form.close.title}
                onChange={(e) => setForm({ ...form, close: { ...form.close, title: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Gomb" htmlFor="tan-close-cta">
              <input
                id="tan-close-cta"
                className="admin-input"
                value={form.close.cta}
                onChange={(e) => setForm({ ...form, close: { ...form.close, cta: e.target.value } })}
              />
            </AdminField>
            <AdminField label="Link" htmlFor="tan-close-link">
              <input
                id="tan-close-link"
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
