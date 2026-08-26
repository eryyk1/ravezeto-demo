import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import AdminField from '../../components/AdminField';
import AdminPageHeader from '../../components/AdminPageHeader';
import ImageField from '../../components/ImageField';
import { useAdminUi } from '../../context/AdminUiContext';
import { createId, teamService } from '../../../services/content/store';
import { useTeamMembers } from '../../../services/content/useContent';
import type { TeamMember } from '../../../services/content/types';

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function TeamEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pushToast } = useAdminUi();
  const members = useTeamMembers(false);
  const isNew = id === 'new';

  const existing = useMemo(
    () => (isNew ? undefined : members.find((member) => member.id === id)),
    [id, isNew, members],
  );

  const [form, setForm] = useState<TeamMember>(() =>
    existing ?? {
      id: createId('team'),
      name: '',
      slug: '',
      role: '',
      bio: '',
      portrait: '',
      order: members.length + 1,
      active: true,
    },
  );

  if (!isNew && !existing) {
    return <Navigate to="/admin/team" replace />;
  }

  function update<K extends keyof TeamMember>(key: K, value: TeamMember[K]) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === 'name' && (isNew || !current.slug)) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  }

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || !form.bio.trim()) {
      pushToast('error', 'A név és leírás megadása kötelező.');
      return;
    }
    teamService.save({ ...form, slug: form.slug || slugify(form.name) });
    pushToast('success', 'Csapattag mentve.');
    navigate('/admin/team');
  }

  function handleDelete() {
    if (!window.confirm('Biztosan törli ezt a csapattagot?')) return;
    teamService.remove(form.id);
    pushToast('success', 'Csapattag törölve.');
    navigate('/admin/team');
  }

  return (
    <>
      <AdminPageHeader
        title={isNew ? 'Új csapattag' : form.name}
        description="Csapattag adatainak szerkesztése."
        actions={
          <Link className="admin-btn admin-btn--ghost" to="/admin/team">
            Vissza
          </Link>
        }
      />

      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-form__grid">
          <AdminField label="Név" htmlFor="team-name">
            <input
              id="team-name"
              className="admin-input"
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              required
            />
          </AdminField>

          <AdminField label="Pozíció" htmlFor="team-role">
            <input
              id="team-role"
              className="admin-input"
              value={form.role}
              onChange={(event) => update('role', event.target.value)}
            />
          </AdminField>

          <AdminField label="Slug" htmlFor="team-slug" hint="URL-barát azonosító">
            <input
              id="team-slug"
              className="admin-input"
              value={form.slug}
              onChange={(event) => update('slug', event.target.value)}
            />
          </AdminField>

          <AdminField label="Sorrend" htmlFor="team-order">
            <input
              id="team-order"
              className="admin-input"
              type="number"
              min={1}
              value={form.order}
              onChange={(event) => update('order', Number(event.target.value))}
            />
          </AdminField>
        </div>

        <AdminField label="Leírás" htmlFor="team-bio">
          <textarea
            id="team-bio"
            className="admin-textarea"
            rows={6}
            value={form.bio}
            onChange={(event) => update('bio', event.target.value)}
            required
          />
        </AdminField>

        <ImageField
          label="Profilkép"
          value={form.portrait}
          onChange={(value) => update('portrait', value)}
          hint="Használhat meglévő útvonalat (/assets/...) vagy töltsön fel képet."
        />

        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(event) => update('active', event.target.checked)}
          />
          <span>Aktív a weboldalon</span>
        </label>

        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={Boolean(form.featured)}
            onChange={(event) => update('featured', event.target.checked)}
          />
          <span>Kiemelt tag (pl. coaching fotó)</span>
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
