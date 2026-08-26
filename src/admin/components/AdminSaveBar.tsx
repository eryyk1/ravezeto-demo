import { useCmsMeta } from '../../services/content/useContent';

type AdminSaveBarProps = {
  dirty: boolean;
  saving: boolean;
  saved?: boolean;
  onSaveDraft: () => void | Promise<void>;
  onPublish?: () => void | Promise<void>;
  publishing?: boolean;
};

export default function AdminSaveBar({
  dirty,
  saving,
  saved = false,
  onSaveDraft,
  onPublish,
  publishing = false,
}: AdminSaveBarProps) {
  const meta = useCmsMeta();

  return (
    <div className="admin-save-bar">
      <div className="admin-save-bar__status">
        {saving ? (
          <span className="admin-save-bar__hint admin-save-bar__hint--loading">Mentés folyamatban…</span>
        ) : publishing ? (
          <span className="admin-save-bar__hint admin-save-bar__hint--loading">Publikálás folyamatban…</span>
        ) : saved ? (
          <span className="admin-save-bar__hint admin-save-bar__hint--success">Mentve</span>
        ) : dirty ? (
          <span className="admin-save-bar__hint admin-save-bar__hint--dirty">Nem mentett módosítások</span>
        ) : meta.hasUnpublishedChanges ? (
          <span className="admin-save-bar__hint admin-save-bar__hint--draft">Piszkozat — még nincs publikálva</span>
        ) : (
          <span className="admin-save-bar__hint">Minden változás publikálva</span>
        )}
      </div>
      <div className="admin-save-bar__actions">
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          disabled={!dirty || saving || publishing}
          onClick={() => void onSaveDraft()}
        >
          {saving ? 'Mentés…' : 'Piszkozat mentése'}
        </button>
        {onPublish ? (
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            disabled={saving || publishing}
            onClick={() => void onPublish()}
          >
            {publishing ? 'Publikálás…' : 'Publikálás'}
          </button>
        ) : null}
      </div>
    </div>
  );
}
