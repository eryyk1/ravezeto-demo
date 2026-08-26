import { Link } from 'react-router-dom';
import AdminPageShell from '../../components/AdminPageShell';
import { useDraftReferences } from '../../../services/content/useContent';

export default function ReferencesListPage() {
  const references = useDraftReferences(false);

  return (
    <AdminPageShell
      title="Referenciák"
      description="Ügyfél-vélemények és referencia bejegyzések kezelése."
      actions={
        <>
          <Link className="admin-btn admin-btn--ghost" to="/admin/references/page">
            Oldal szekciók
          </Link>
          <Link className="admin-btn admin-btn--primary" to="/admin/references/new">
            + Új referencia
          </Link>
        </>
      }
    >

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Referencia</th>
              <th>Kapcsolattartó</th>
              <th>Kategória</th>
              <th>Státusz</th>
              <th className="admin-table__actions-head">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {references.map((reference) => (
              <tr key={reference.id}>
                <td data-label="Referencia">
                  <div className="admin-table__person">
                    <div className="admin-table__logo-wrap admin-table__logo-wrap--ref">
                      {reference.logo && reference.logo.startsWith('/') ? (
                        <img src={reference.logo} alt="" className="admin-table__logo" />
                      ) : (
                        <span className="admin-table__logo-fallback">{reference.title.slice(0, 2)}</span>
                      )}
                    </div>
                    <div className="admin-table__person-meta">
                      <strong>{reference.title}</strong>
                      <span>{reference.description || reference.quotes[0]?.slice(0, 72) || '—'}</span>
                    </div>
                  </div>
                </td>
                <td data-label="Kapcsolattartó">{reference.who}</td>
                <td data-label="Kategória">{reference.category || '—'}</td>
                <td data-label="Státusz">
                  <span
                    className={`admin-badge${reference.active ? '' : ' admin-badge--muted'}`}
                  >
                    {reference.active ? 'Aktív' : 'Inaktív'}
                  </span>
                </td>
                <td className="admin-table__actions" data-label="Műveletek">
                  <Link
                    className="admin-btn admin-btn--sm admin-btn--ghost"
                    to={`/admin/references/${reference.id}`}
                  >
                    Szerkesztés
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPageShell>
  );
}
