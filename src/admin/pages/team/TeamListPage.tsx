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
            + Új tag
          </Link>
        }
      />

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Pozíció</th>
              <th>Sorrend</th>
              <th>Státusz</th>
              <th className="admin-table__actions-head">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td data-label="Tag">
                  <div className="admin-table__person">
                    <div className="admin-table__avatar-wrap">
                      {member.portrait ? (
                        <img src={member.portrait} alt="" className="admin-table__avatar" />
                      ) : (
                        <span className="admin-table__avatar-fallback">{member.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="admin-table__person-meta">
                      <strong>{member.name}</strong>
                      <span>{member.bio.slice(0, 64)}{member.bio.length > 64 ? '…' : ''}</span>
                    </div>
                  </div>
                </td>
                <td data-label="Pozíció">{member.role}</td>
                <td data-label="Sorrend">{member.order}</td>
                <td data-label="Státusz">
                  <span className={`admin-badge${member.active ? '' : ' admin-badge--muted'}`}>
                    {member.active ? 'Aktív' : 'Inaktív'}
                  </span>
                </td>
                <td className="admin-table__actions" data-label="Műveletek">
                  <Link className="admin-btn admin-btn--sm admin-btn--ghost" to={`/admin/team/${member.id}`}>
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
