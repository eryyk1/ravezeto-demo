import { Link } from 'react-router-dom';
import AdminPageShell from '../components/AdminPageShell';
import { IconHome, IconHandshake, IconStar, IconUsers } from '../components/AdminIcons';
import { useSiteContent } from '../../services/content/useContent';

export default function AdminDashboardPage() {
  const content = useSiteContent();

  const cards = [
    {
      title: 'Csapat tagok',
      value: content.team.filter((member) => member.active).length,
      hint: `${content.team.length} összesen`,
      to: '/admin/team',
      icon: IconUsers,
    },
    {
      title: 'Partnerek',
      value: content.partners.filter((partner) => partner.active).length,
      hint: `${content.partners.length} logó`,
      to: '/admin/partners',
      icon: IconHandshake,
    },
    {
      title: 'Referenciák',
      value: content.references.filter((reference) => reference.active).length,
      hint: `${content.references.length} vélemény`,
      to: '/admin/references',
      icon: IconStar,
    },
    {
      title: 'Kezdőlap',
      value: 'Szerkesztés',
      hint: content.homeHero.headlineLines.join(' '),
      to: '/admin/home',
      icon: IconHome,
    },
  ];

  return (
    <AdminPageShell
      title="Dashboard"
      description="Üdvözöljük a Rávezető tartalomkezelő felületén. Itt szerkesztheti a weboldal fő tartalmait."
    >

      <div className="admin-cards">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.to} to={card.to} className="admin-card">
              <div className="admin-card__icon-wrap">
                <Icon className="admin-card__icon" />
              </div>
              <span className="admin-card__label">{card.title}</span>
              <strong className="admin-card__value">{card.value}</strong>
              <span className="admin-card__hint">{card.hint}</span>
            </Link>
          );
        })}
      </div>

      <section className="admin-panel">
        <h2>Gyors útmutató</h2>
        <ul className="admin-list">
          <li>A módosítások mentés után azonnal megjelennek a weboldalon (ugyanabban a böngészőben).</li>
          <li>Éles környezetben a Supabase csatlakoztatása után a tartalom minden látogató számára szinkronizálódik.</li>
          <li>A képeket URL-lel vagy feltöltéssel adhatja meg. Nagyobb méretű fájlokhoz később Supabase Storage ajánlott.</li>
        </ul>
      </section>
    </AdminPageShell>
  );
}
