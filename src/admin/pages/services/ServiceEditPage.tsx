import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import ImageField from '../../components/ImageField';
import { useAdminUi } from '../../context/AdminUiContext';
import { createId, serviceItemService } from '../../../services/content/store';
import { useDraftServices } from '../../../services/content/useContent';
import type { ServiceItem } from '../../../services/content/types';

export default function ServiceEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushToast } = useAdminUi();
  const services = useDraftServices(undefined, false);
  const isNew = id === 'new';

  const existing = useMemo(
    () => (isNew ? undefined : services.find((service) => service.id === id)),
    [id, isNew, services],
  );

  const [form, setForm] = useState<ServiceItem>(() =>
    existing ?? {
      id: createId('svc'),
      slug: '',
      section: 'tanacsadas',
      index: String(services.length + 1).padStart(2, '0'),
      label: '',
      title: '',
      intro: '',
      detail: '',
      problems: [''],
      cta: '',
      link: '',
      visual: '',
      image: '',
      order: services.length + 1,
      active: true,
    },
  );

  if (!isNew && !existing) {
    return <Navigate to="/admin/szolgaltatasok/list" replace />;
  }

  function update<K extends keyof ServiceItem>(key: K, value: ServiceItem[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!form.title.trim()) {
      pushToast('error', 'A cím megadása kötelező.');
      return;
    }
    serviceItemService.save({
      ...form,
      slug: form.slug || form.id,
      problems: form.problems.filter(Boolean),
    });
    pushToast('success', 'Szolgáltatás mentve (piszkozat). Publikálás szükséges az éles megjelenéshez.');
    navigate('/admin/szolgaltatasok/list');
  }

  function handleDelete() {
    if (!window.confirm('Biztosan törli ezt a szolgáltatást?')) return;
    serviceItemService.remove(form.id);
    pushToast('success', 'Szolgáltatás törölve.');
    navigate('/admin/szolgaltatasok/list');
  }

  return (
    <AdminPageShell
      title={isNew ? 'Új szolgáltatás' : form.title}
      description="Szolgáltatás elem adatai."
      actions={
        <Link className="admin-btn admin-btn--ghost" to="/admin/szolgaltatasok/list">
          Vissza
        </Link>
      }
    >
      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-form__grid">
          <AdminField label="Szekció" htmlFor="svc-section">
            <select
              id="svc-section"
              className="admin-input"
              value={form.section}
              onChange={(e) => update('section', e.target.value as ServiceItem['section'])}
            >
              <option value="tanacsadas">Tanácsadás</option>
              <option value="felnottkepzes">Felnőttképzés</option>
              <option value="home">Kezdőlap</option>
            </select>
          </AdminField>
          <AdminField label="Index" htmlFor="svc-index">
            <input
              id="svc-index"
              className="admin-input"
              value={form.index}
              onChange={(e) => update('index', e.target.value)}
            />
          </AdminField>
          <AdminField label="Címke" htmlFor="svc-label">
            <input
              id="svc-label"
              className="admin-input"
              value={form.label}
              onChange={(e) => update('label', e.target.value)}
            />
          </AdminField>
          <AdminField label="Cím" htmlFor="svc-title">
            <input
              id="svc-title"
              className="admin-input"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              required
            />
          </AdminField>
        </div>

        <AdminField label="Bevezető" htmlFor="svc-intro">
          <textarea
            id="svc-intro"
            className="admin-textarea"
            rows={4}
            value={form.intro}
            onChange={(e) => update('intro', e.target.value)}
          />
        </AdminField>

        <AdminField label="Részletes szöveg (opcionális)" htmlFor="svc-detail">
          <textarea
            id="svc-detail"
            className="admin-textarea"
            rows={4}
            value={form.detail ?? ''}
            onChange={(e) => update('detail', e.target.value)}
          />
        </AdminField>

        <AdminField label="Pontok / lépések (soronként egy)" htmlFor="svc-problems">
          <textarea
            id="svc-problems"
            className="admin-textarea"
            rows={5}
            value={form.problems.join('\n')}
            onChange={(e) => update('problems', e.target.value.split('\n'))}
          />
        </AdminField>

        <div className="admin-form__grid">
          <AdminField label="CTA szöveg" htmlFor="svc-cta">
            <input
              id="svc-cta"
              className="admin-input"
              value={form.cta ?? ''}
              onChange={(e) => update('cta', e.target.value)}
            />
          </AdminField>
          <AdminField label="Link" htmlFor="svc-link">
            <input
              id="svc-link"
              className="admin-input"
              value={form.link ?? ''}
              onChange={(e) => update('link', e.target.value)}
            />
          </AdminField>
        </div>

        <ImageField
          label="Kép"
          value={form.image ?? ''}
          onChange={(value) => update('image', value)}
        />

        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => update('active', e.target.checked)}
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
    </AdminPageShell>
  );
}
