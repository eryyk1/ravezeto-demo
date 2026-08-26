import { Link } from 'react-router-dom';
import AdminPageHeader from '../../components/AdminPageHeader';
import { useTeamMembers } from '../../../services/content/useContent';

export default function TeamListPage() {
  const members = useTeamMembers(false);

  return (
    <>
      <AdminPageHeader
        title="Csapat"
        description="Csapattagok neve, pozíciója, leírása és profilképe."
        actions={
          <Link className="admin-btn admin-btn--primary" to="/admin/team/new">
            Új tag
          </Link>
        }
      />

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Név</th>
              <th>Pozíció</th>
              <th>Sorrend</th>
              <th>Státusz</th>
              <th aria-label="Műveletek" />
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="admin-table__person">
                    {member.portrait ? (
                      <img src={member.portrait} alt="" className="admin-table__avatar" />
                    ) : null}
                    <span>{member.name}</span>
                  </div>
                </td>
                <td>{member.role}</td>
                <td>{member.order}</td>
                <td>
                  <span className={`admin-badge${member.active ? '' : ' admin-badge--muted'}`}>
                    {member.active ? 'Aktív' : 'Inaktív'}
                  </span>
                </td>
                <td>
                  <Link className="admin-link" to={`/admin/team/${member.id}`}>
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
