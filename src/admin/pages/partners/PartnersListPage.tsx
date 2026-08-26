import { Link } from 'react-router-dom';
import AdminPageShell from '../../components/AdminPageShell';
import { usePartners } from '../../../services/content/useContent';

export default function PartnersListPage() {
  const partners = usePartners(false);

  return (
    <AdminPageShell
      title="Partnerek"
      description="Partnerlogók kezelése a Referenciák és Pályázatok oldalakhoz."
      actions={
        <Link className="admin-btn admin-btn--primary" to="/admin/partners/new">
          + Új partner
        </Link>
      }
    >

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Logó</th>
              <th>Partner neve</th>
              <th>Weboldal</th>
              <th>Sorrend</th>
              <th>Státusz</th>
              <th className="admin-table__actions-head">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id}>
                <td data-label="Logó">
                  <div className="admin-table__logo-wrap">
                    {partner.logo ? (
                      <img src={partner.logo} alt="" className="admin-table__logo" />
                    ) : (
                      <span className="admin-table__logo-fallback">—</span>
                    )}
                  </div>
                </td>
                <td data-label="Partner neve">
                  <strong>{partner.name}</strong>
                </td>
                <td data-label="Weboldal">
                  {partner.websiteUrl ? (
                    <a href={partner.websiteUrl} target="_blank" rel="noreferrer" className="admin-link">
                      {partner.websiteUrl.replace(/^https?:\/\//, '')}
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td data-label="Sorrend">{partner.order}</td>
                <td data-label="Státusz">
                  <span className={`admin-badge${partner.active ? '' : ' admin-badge--muted'}`}>
                    {partner.active ? 'Aktív' : 'Inaktív'}
                  </span>
                </td>
                <td className="admin-table__actions" data-label="Műveletek">
                  <Link className="admin-btn admin-btn--sm admin-btn--ghost" to={`/admin/partners/${partner.id}`}>
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
