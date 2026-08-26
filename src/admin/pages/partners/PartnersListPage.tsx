import { Link } from 'react-router-dom';
import AdminPageHeader from '../../components/AdminPageHeader';
import { usePartners } from '../../../services/content/useContent';

export default function PartnersListPage() {
  const partners = usePartners(false);

  return (
    <>
      <AdminPageHeader
        title="Partnereink"
        description="Partnerlogók kezelése a Referenciák és Pályázatok oldalakhoz."
        actions={
          <Link className="admin-btn admin-btn--primary" to="/admin/partners/new">
            Új partner
          </Link>
        }
      />

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Logó</th>
              <th>Név</th>
              <th>Sorrend</th>
              <th>Státusz</th>
              <th aria-label="Műveletek" />
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id}>
                <td>
                  {partner.logo ? (
                    <img src={partner.logo} alt="" className="admin-table__logo" />
                  ) : (
                    '—'
                  )}
                </td>
                <td>{partner.name}</td>
                <td>{partner.order}</td>
                <td>
                  <span className={`admin-badge${partner.active ? '' : ' admin-badge--muted'}`}>
                    {partner.active ? 'Aktív' : 'Inaktív'}
                  </span>
                </td>
                <td>
                  <Link className="admin-link" to={`/admin/partners/${partner.id}`}>
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
