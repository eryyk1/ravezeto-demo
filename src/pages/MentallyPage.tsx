import { PageHero, ContentSection, ButtonLink } from '../components/PageSections';

export default function MentallyPage() {
  return (
    <div className="mentally-page">
      <PageHero
        title="Mentally"
        subtitle="Kíváncsi csapata állapotára? A Mentally megmutatja vállalata egészségének térképét!"
        accent="gold"
      />

      <ContentSection>
        <p>
          A Mentally egy innovatív eszköz, amely segít feltérképezni a szervezet egészségi
          állapotát, azonosítani a fejlesztendő területeket és támogatni a tudatos
          szervezetfejlesztést.
        </p>
      </ContentSection>

      <ContentSection title="Mit mér a Mentally?">
        <ul className="feature-list">
          <li>Szervezeti kultúra és munkahelyi légkör</li>
          <li>Vezetői és csapatdinamika</li>
          <li>Kommunikációs minták</li>
          <li>Munkavállalói elköteleződés</li>
          <li>Fejlesztési prioritások</li>
        </ul>
      </ContentSection>

      <ContentSection variant="quote">
        <p>
          Erős csapat nélkül nem működnek sem folyamatok, sem rendszerek. A Mentally segít
          láthatóvá tenni, hol van a legnagyobb fejlesztési potenciál.
        </p>
        <ButtonLink to="/kapcsolatok" variant="blue">
          Érdeklődöm
        </ButtonLink>
      </ContentSection>
    </div>
  );
}
