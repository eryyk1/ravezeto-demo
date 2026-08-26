import { useState } from 'react';
import { contentStore, formatHuDateTime } from '../../services/content/store';
import { useContentVersions } from '../../services/content/useContent';
import { useAdminUi } from '../context/AdminUiContext';

export default function VersionHistoryPanel() {
  const versions = useContentVersions();
  const { pushToast } = useAdminUi();
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(false);

  const preview = versions.find((version) => version.id === previewId);

  function handleRestore(versionId: string, label: string) {
    const confirmed = window.confirm(
      `Biztosan visszaállítja ezt a verziót?\n\n${label}\n\nA jelenlegi tartalom megmarad az előzményekben, és egy új verzió jön létre a visszaállított tartalommal.`,
    );
    if (!confirmed) return;

    setRestoring(true);
    const ok = contentStore.restoreVersion(versionId);
    setRestoring(false);
    if (ok) {
      pushToast('success', 'Verzió visszaállítva és publikálva.');
      setPreviewId(null);
    } else {
      pushToast('error', 'A verzió visszaállítása sikertelen.');
    }
  }

  if (!versions.length) {
    return (
      <section className="admin-panel admin-panel--empty">
        <h2>Verzióelőzmények</h2>
        <p>Még nincs mentett verzió. A publikálás után itt jelennek meg az előzmények.</p>
      </section>
    );
  }

  return (
    <section className="admin-panel">
      <h2>Verzióelőzmények</h2>
      <p className="admin-panel__lead">
        Korábbi publikált állapotok. A visszaállítás új verziót hoz létre — semmi nem törlődik.
      </p>

      <ul className="admin-version-list">
        {versions.map((version) => (
          <li key={version.id} className="admin-version-list__item">
            <div className="admin-version-list__meta">
              <strong>{version.label}</strong>
              <span>{formatHuDateTime(version.createdAt)}</span>
            </div>
            <div className="admin-version-list__actions">
              <button
                type="button"
                className="admin-btn admin-btn--sm admin-btn--ghost"
                onClick={() => setPreviewId(previewId === version.id ? null : version.id)}
              >
                {previewId === version.id ? 'Elrejtés' : 'Előnézet'}
              </button>
              <button
                type="button"
                className="admin-btn admin-btn--sm admin-btn--primary"
                disabled={restoring}
                onClick={() => handleRestore(version.id, version.label)}
              >
                Visszaállítás
              </button>
            </div>
          </li>
        ))}
      </ul>

      {preview ? (
        <div className="admin-version-preview">
          <h3>Előnézet: {preview.label}</h3>
          <dl className="admin-version-preview__grid">
            <div>
              <dt>Kezdőlap cím</dt>
              <dd>{preview.snapshot.homeHero.headlineLines.join(' ')}</dd>
            </div>
            <div>
              <dt>Rólunk cím</dt>
              <dd>
                {preview.snapshot.rolunk.hero.title} {preview.snapshot.rolunk.hero.titleMark}
              </dd>
            </div>
            <div>
              <dt>Csapat</dt>
              <dd>{preview.snapshot.team.filter((m) => m.active).length} aktív tag</dd>
            </div>
            <div>
              <dt>Szolgáltatások</dt>
              <dd>{preview.snapshot.services.filter((s) => s.active).length} aktív</dd>
            </div>
          </dl>
        </div>
      ) : null}
    </section>
  );
}
