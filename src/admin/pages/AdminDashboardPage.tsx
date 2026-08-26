import { Link } from 'react-router-dom';
import AdminPageShell from '../components/AdminPageShell';
import { IconGrant, IconHandshake, IconHome, IconPages, IconStar, IconUsers } from '../components/AdminIcons';
import { formatHuDateTime } from '../../services/content/store';
import { useActivityLog, useCmsMeta, useDraftContent } from '../../services/content/useContent';

export default function AdminDashboardPage() {
  const content = useDraftContent();
  const meta = useCmsMeta();
  const activity = useActivityLog().slice(0, 8);

  const cards = [
    {
      title: 'Szolgáltatások',
      value: content.services.filter((service) => service.active).length,
      hint: `${content.services.length} összesen`,
      to: '/admin/szolgaltatasok',
      icon: IconPages,
    },
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
    {
      title: 'Pályázatok',
      value: content.palyazatok.active ? 'Aktív' : 'Inaktív',
      hint: content.palyazatok.deadlineDate,
      to: '/admin/palyazatok',
      icon: IconGrant,
    },
  ];

  return (
    <AdminPageShell
      title="Dashboard"
      description="Üdvözöljük a Rávezető tartalomkezelő felületén. Itt szerkesztheti a weboldal teljes tartalmát."
    >
      <div className="admin-status-row">
        <span className={`admin-badge${meta.hasUnpublishedChanges ? ' admin-badge--warn' : ''}`}>
          {meta.hasUnpublishedChanges ? 'Van nem publikált piszkozat' : 'Minden publikálva'}
        </span>
        <span className="admin-status-row__meta">
          Utolsó módosítás: {formatHuDateTime(meta.lastModified)}
        </span>
        <span className="admin-status-row__meta">
          Utolsó publikálás: {formatHuDateTime(meta.lastPublished)}
        </span>
      </div>

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
        <div className="admin-panel__head">
          <h2>Legutóbbi tevékenységek</h2>
          <Link className="admin-btn admin-btn--sm admin-btn--ghost" to="/admin/verziok">
            Verzióelőzmények
          </Link>
        </div>
        {activity.length ? (
          <ul className="admin-activity-list">
            {activity.map((entry) => (
              <li key={entry.id}>
                <span>{entry.message}</span>
                <time dateTime={entry.at}>{formatHuDateTime(entry.at)}</time>
              </li>
            ))}
          </ul>
        ) : (
          <p>Még nincs rögzített tevékenység.</p>
        )}
      </section>

      <section className="admin-panel">
        <h2>Gyors útmutató</h2>
        <ul className="admin-list">
          <li>A módosítások először piszkozatként mentődnek — az éles weboldal csak publikálás után frissül.</li>
          <li>A Verzióelőzmények menüpontban korábbi állapotokat tekinthet meg és állíthat vissza.</li>
          <li>A képeket URL-lel vagy feltöltéssel adhatja meg. Nagyobb fájlokhoz később szerveroldali tárhely ajánlott.</li>
        </ul>
      </section>
    </AdminPageShell>
  );
}
