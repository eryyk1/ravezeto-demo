import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import AdminField from '../../components/AdminField';
import AdminPageShell from '../../components/AdminPageShell';
import ImageField from '../../components/ImageField';
import { useAdminUi } from '../../context/AdminUiContext';
import { createId, partnerService } from '../../../services/content/store';
import { usePartners } from '../../../services/content/useContent';
import type { Partner } from '../../../services/content/types';

export default function PartnerEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushToast } = useAdminUi();
  const partners = usePartners(false);
  const isNew = id === 'new';
  const existing = useMemo(
    () => (isNew ? undefined : partners.find((partner) => partner.id === id)),
    [id, isNew, partners],
  );

  const [form, setForm] = useState<Partner>(
    () =>
      existing ?? {
        id: createId('partner'),
        slug: '',
        name: '',
        logo: '',
        websiteUrl: '',
        order: partners.length + 1,
        active: true,
      },
  );

  if (!isNew && !existing) return <Navigate to="/admin/partners" replace />;

  function update<K extends keyof Partner>(key: K, value: Partner[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.logo.trim()) {
      pushToast('error', 'A név és logó megadása kötelező.');
      return;
    }
    partnerService.save({
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
    });
    pushToast('success', 'Partner mentve.');
    navigate('/admin/partners');
  }

  function handleDelete() {
    if (!window.confirm('Biztosan törli ezt a partnert?')) return;
    partnerService.remove(form.id);
    pushToast('success', 'Partner törölve.');
    navigate('/admin/partners');
  }

  return (
    <AdminPageShell
      title={isNew ? 'Új partner' : form.name}
      description="Partnerlogó és adatok szerkesztése."
      actions={
        <Link className="admin-btn admin-btn--ghost" to="/admin/partners">
          Vissza
        </Link>
      }
    >

      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-form__grid">
          <AdminField label="Név" htmlFor="partner-name">
            <input
              id="partner-name"
              className="admin-input"
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Slug" htmlFor="partner-slug">
            <input
              id="partner-slug"
              className="admin-input"
              value={form.slug}
              onChange={(event) => update('slug', event.target.value)}
            />
          </AdminField>
          <AdminField label="Weboldal URL" htmlFor="partner-url">
            <input
              id="partner-url"
              className="admin-input"
              type="url"
              value={form.websiteUrl ?? ''}
              onChange={(event) => update('websiteUrl', event.target.value)}
            />
          </AdminField>
          <AdminField label="Sorrend" htmlFor="partner-order">
            <input
              id="partner-order"
              className="admin-input"
              type="number"
              min={1}
              value={form.order}
              onChange={(event) => update('order', Number(event.target.value))}
            />
          </AdminField>
        </div>

        <ImageField
          label="Logó"
          value={form.logo}
          onChange={(value) => update('logo', value)}
        />

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
    </AdminPageShell>
  );
}
