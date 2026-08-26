import { Link } from 'react-router-dom';
import AdminPageHeader from '../../components/AdminPageHeader';
import { useReferences } from '../../../services/content/useContent';

export default function ReferencesListPage() {
  const references = useReferences(false);

  return (
    <>
      <AdminPageHeader
        title="Referenciák"
        description="Ügyfél-vélemények és referencia bejegyzések kezelése."
        actions={
          <Link className="admin-btn admin-btn--primary" to="/admin/references/new">
            Új referencia
          </Link>
        }
      />

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cég / cím</th>
              <th>Kapcsolattartó</th>
              <th>Kategória</th>
              <th>Státusz</th>
              <th aria-label="Műveletek" />
            </tr>
          </thead>
          <tbody>
            {references.map((reference) => (
              <tr key={reference.id}>
                <td>{reference.title}</td>
                <td>{reference.who}</td>
                <td>{reference.category || '—'}</td>
                <td>
                  <span
                    className={`admin-badge${reference.active ? '' : ' admin-badge--muted'}`}
                  >
                    {reference.active ? 'Aktív' : 'Inaktív'}
                  </span>
                </td>
                <td>
                  <Link className="admin-link" to={`/admin/references/${reference.id}`}>
                    Szerkesztés
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
