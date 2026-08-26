import { Link } from 'react-router-dom';
import AdminPageShell from '../../components/AdminPageShell';
import ReorderControls from '../../components/ReorderControls';
import { serviceItemService } from '../../../services/content/store';
import { useDraftServices } from '../../../services/content/useContent';

export default function ServiceListPage() {
  const services = useDraftServices(undefined, false);

  function move(id: string, direction: -1 | 1) {
    const index = services.findIndex((service) => service.id === id);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= services.length) return;
    const ids = services.map((service) => service.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];
    serviceItemService.reorder(ids);
  }

  return (
    <AdminPageShell
      title="Szolgáltatás elemek"
      description="Egyedi szolgáltatás-blokkok kezelése, sorrendezése és státusza."
      actions={
        <>
          <Link className="admin-btn admin-btn--ghost" to="/admin/szolgaltatasok">
            Vissza
          </Link>
          <Link className="admin-btn admin-btn--primary" to="/admin/szolgaltatasok/list/new">
            + Új szolgáltatás
          </Link>
        </>
      }
    >
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Szolgáltatás</th>
              <th>Szekció</th>
              <th>Sorrend</th>
              <th>Státusz</th>
              <th className="admin-table__actions-head">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id}>
                <td data-label="Szolgáltatás">
                  <strong>{service.title}</strong>
                  <span className="admin-table__sub">{service.label}</span>
                </td>
                <td data-label="Szekció">{service.section}</td>
                <td data-label="Sorrend">
                  <div className="admin-table__reorder">
                    <span>{service.order}</span>
                    <ReorderControls
                      disableUp={index === 0}
                      disableDown={index === services.length - 1}
                      onMoveUp={() => move(service.id, -1)}
                      onMoveDown={() => move(service.id, 1)}
                    />
                  </div>
                </td>
                <td data-label="Státusz">
                  <span className={`admin-badge${service.active ? '' : ' admin-badge--muted'}`}>
                    {service.active ? 'Aktív' : 'Inaktív'}
                  </span>
                </td>
                <td className="admin-table__actions" data-label="Műveletek">
                  <Link
                    className="admin-btn admin-btn--sm admin-btn--ghost"
                    to={`/admin/szolgaltatasok/list/${service.id}`}
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
