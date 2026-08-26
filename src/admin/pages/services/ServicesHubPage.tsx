import { Link } from 'react-router-dom';
import AdminPageShell from '../../components/AdminPageShell';
import { IconPages } from '../../components/AdminIcons';

const SECTIONS = [
  {
    to: '/admin/szolgaltatasok/tanacsadas',
    title: 'Tanácsadás',
    description: 'Hero, idézet, szervezetfejlesztés, coaching és záró szekció.',
  },
  {
    to: '/admin/szolgaltatasok/felnottkepzes',
    title: 'Felnőttképzés',
    description: 'Hero, módszertan, kategóriák, képzési programok és záró szekció.',
  },
  {
    to: '/admin/szolgaltatasok/list',
    title: 'Szolgáltatás elemek',
    description: 'Egyedi szolgáltatás-blokkok létrehozása, szerkesztése, sorrendezése.',
  },
] as const;

export default function ServicesHubPage() {
  return (
    <AdminPageShell
      title="Szolgáltatások"
      description="A Tanácsadás és Felnőttképzés oldalak teljes tartalma, valamint az egyedi szolgáltatás elemek kezelése."
    >
      <div className="admin-cards">
        {SECTIONS.map((section) => (
          <Link key={section.to} to={section.to} className="admin-card">
            <div className="admin-card__icon-wrap">
              <IconPages className="admin-card__icon" />
            </div>
            <span className="admin-card__label">{section.title}</span>
            <span className="admin-card__hint">{section.description}</span>
          </Link>
        ))}
      </div>
    </AdminPageShell>
  );
}
