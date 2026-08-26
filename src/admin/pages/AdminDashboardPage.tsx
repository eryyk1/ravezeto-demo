import { Link } from 'react-router-dom';
import AdminPageHeader from '../components/AdminPageHeader';
import { useSiteContent } from '../../services/content/useContent';

export default function AdminDashboardPage() {
  const content = useSiteContent();

  const cards = [
    {
      title: 'Csapat tagok',
      value: content.team.filter((member) => member.active).length,
      hint: `${content.team.length} összesen`,
      to: '/admin/team',
    },
    {
      title: 'Partnerek',
      value: content.partners.filter((partner) => partner.active).length,
      hint: `${content.partners.length} logó`,
      to: '/admin/partners',
    },
    {
      title: 'Referenciák',
      value: content.references.filter((reference) => reference.active).length,
      hint: `${content.references.length} vélemény`,
      to: '/admin/references',
    },
    {
      title: 'Kezdőlap',
      value: 'Szerkesztés',
      hint: content.homeHero.headlineLines.join(' '),
      to: '/admin/home',
    },
  ];

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Üdvözöljük a Rávezető tartalomkezelő felületén. Itt szerkesztheti a weboldal fő tartalmait."
      />

      <div className="admin-cards">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="admin-card">
            <span className="admin-card__label">{card.title}</span>
            <strong className="admin-card__value">{card.value}</strong>
            <span className="admin-card__hint">{card.hint}</span>
          </Link>
        ))}
      </div>

      <section className="admin-panel">
        <h2>Gyors útmutató</h2>
        <ul className="admin-list">
          <li>A módosítások mentés után azonnal megjelennek a weboldalon (ugyanabban a böngészőben).</li>
          <li>Éles környezetben a Supabase csatlakoztatása után a tartalom minden látogató számára szinkronizálódik.</li>
          <li>A képeket URL-lel vagy feltöltéssel adhatja meg. Nagyobb méretű fájlokhoz később Supabase Storage ajánlott.</li>
        </ul>
      </section>
    </>
  );
}
