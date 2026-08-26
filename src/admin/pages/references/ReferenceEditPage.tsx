import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import AdminField from '../../components/AdminField';
import AdminPageHeader from '../../components/AdminPageHeader';
import { useAdminUi } from '../../context/AdminUiContext';
import { createId, referenceService } from '../../../services/content/store';
import { useReferences } from '../../../services/content/useContent';
import type { Reference } from '../../../services/content/types';

export default function ReferenceEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushToast } = useAdminUi();
  const references = useReferences(false);
  const isNew = id === 'new';
  const existing = useMemo(
    () => (isNew ? undefined : references.find((reference) => reference.id === id)),
    [id, isNew, references],
  );

  const [form, setForm] = useState<Reference>(
    () =>
      existing ?? {
        id: createId('reference'),
        title: '',
        description: '',
        logo: '',
        who: '',
        quotes: [''],
        category: '',
        order: references.length + 1,
        active: true,
      },
  );

  if (!isNew && !existing) return <Navigate to="/admin/references" replace />;

  function update<K extends keyof Reference>(key: K, value: Reference[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateQuote(index: number, value: string) {
    setForm((current) => {
      const quotes = [...current.quotes];
      quotes[index] = value;
      return { ...current, quotes };
    });
  }

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    const quotes = form.quotes.map((quote) => quote.trim()).filter(Boolean);
    if (!form.title.trim() || !form.who.trim() || !quotes.length) {
      pushToast('error', 'A cím, kapcsolattartó és legalább egy idézet kötelező.');
      return;
    }
    referenceService.save({
      ...form,
      quotes,
      description: form.description || quotes[0].slice(0, 140),
      logo: form.logo || form.title,
    });
    pushToast('success', 'Referencia mentve.');
    navigate('/admin/references');
  }

  function handleDelete() {
    if (!window.confirm('Biztosan törli ezt a referenciát?')) return;
    referenceService.remove(form.id);
    pushToast('success', 'Referencia törölve.');
    navigate('/admin/references');
  }

  return (
    <>
      <AdminPageHeader
        title={isNew ? 'Új referencia' : form.title}
        description="Ügyfél-vélemény szerkesztése."
        actions={
          <Link className="admin-btn admin-btn--ghost" to="/admin/references">
            Vissza
          </Link>
        }
      />

      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-form__grid">
          <AdminField label="Cég / cím" htmlFor="ref-title">
            <input
              id="ref-title"
              className="admin-input"
              value={form.title}
              onChange={(event) => update('title', event.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Kapcsolattartó" htmlFor="ref-who">
            <input
              id="ref-who"
              className="admin-input"
              value={form.who}
              onChange={(event) => update('who', event.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Kategória" htmlFor="ref-category">
            <input
              id="ref-category"
              className="admin-input"
              value={form.category ?? ''}
              onChange={(event) => update('category', event.target.value)}
            />
          </AdminField>
          <AdminField label="Sorrend" htmlFor="ref-order">
            <input
              id="ref-order"
              className="admin-input"
              type="number"
              min={1}
              value={form.order}
              onChange={(event) => update('order', Number(event.target.value))}
            />
          </AdminField>
        </div>

        <AdminField label="Rövid leírás" htmlFor="ref-desc">
          <textarea
            id="ref-desc"
            className="admin-textarea"
            rows={3}
            value={form.description}
            onChange={(event) => update('description', event.target.value)}
          />
        </AdminField>

        {form.quotes.map((quote, index) => (
          <AdminField key={index} label={`Idézet ${index + 1}`} htmlFor={`ref-quote-${index}`}>
            <textarea
              id={`ref-quote-${index}`}
              className="admin-textarea"
              rows={4}
              value={quote}
              onChange={(event) => updateQuote(index, event.target.value)}
            />
          </AdminField>
        ))}

        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={() => update('quotes', [...form.quotes, ''])}
        >
          + További bekezdés
        </button>

        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(event) => update('active', event.target.checked)}
          />
          <span>Aktív a weboldalon</span>
        </label>

        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--primary" type="submit">
            Mentés
          </button>
          {!isNew ? (
            <button className="admin-btn admin-btn--danger" type="button" onClick={handleDelete}>
              Törlés
            </button>
          ) : null}
        </div>
      </form>
    </>
  );
}
