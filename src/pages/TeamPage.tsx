import siteContent from '../data/siteContent.json';
import { PageHero, ContentSection } from '../components/PageSections';
import { getInitials, teamPortraits } from '../data/assets';

export default function TeamPage() {
  return (
    <div className="team-page">
      <PageHero
        title="Csapatunk"
        subtitle="Gyorsabban, erősebben, magasabbra! Az egyéni és szervezeti minőség és teljesítmény növelésében tudunk segíteni, közös gondolkodással, elhivatott szakemberekkel."
      />

      <ContentSection variant="quote">
        <p>
          <strong>Citius, Altius, Fortius.</strong> Minden munkaszervezet állandó mozgásban,
          változásban éli mindennapjait. A vállalatok életében megjelenő kihívások a sport
          nyelvén is leírhatók, mert tervezés, felkészülés és kitartás nélkül nincs siker.
        </p>
      </ContentSection>

      <section className="team-grid-section">
        <h2>Munkatársaink</h2>
        <div className="team-grid">
          {siteContent.colleagues.map((member) => {
            const portrait = teamPortraits[member.slug];
            return (
              <article key={member.id} className="team-card">
                {portrait ? (
                  <img src={portrait} alt={member.name} className="team-photo" loading="lazy" />
                ) : (
                  <div className="team-photo placeholder" aria-hidden="true">
                    {getInitials(member.name)}
                  </div>
                )}
                <div className="team-card-body">
                  <h3>{member.name}</h3>
                  <p>{member.bio}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <ContentSection title="Értékeink">
        <p>
          Minőségelvű csapatban gondolkodunk és cselekszünk, ügyfeleinket rávezetjük a megoldás
          útjára és végig is kísérjük azon. Belső meggyőződés a munkáink által saját magunk
          fejlesztése is.
        </p>
      </ContentSection>
    </div>
  );
}
