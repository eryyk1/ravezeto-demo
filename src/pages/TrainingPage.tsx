import { PageHero, ContentSection } from '../components/PageSections';
import siteContent from '../data/siteContent.json';

export default function TrainingPage() {
  return (
    <div className="training-page">
      <PageHero
        title="Felnőttképzés"
        subtitle="Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi kulcskompetenciáit, vezetőknek, munkatársaknak."
        accent="purple"
      />

      <ContentSection>
        <p>
          A Rávezető minősített felnőttképző intézményként több mint 250 képzési projektet
          valósított meg az elmúlt évtizedben, több mint 3500 résztvevővel.
        </p>
        <p>{siteContent.company.trainingReg}</p>
      </ContentSection>

      <ContentSection title="Képzési területek">
        <ul className="feature-list">
          <li>Vezetői és szervezeti fejlesztés</li>
          <li>Kommunikáció és együttműködés</li>
          <li>Projektmenedzsment és változáskezelés</li>
          <li>Humán erőforrás-fejlesztés</li>
          <li>EU-forrásból finanszírozott képzések</li>
        </ul>
      </ContentSection>

      <ContentSection variant="quote">
        <p>
          Az év trénerei is nálunk dolgoznak – interaktív, gyakorlatias, hasznos képzéseket
          tartunk, amelyekből könnyen levonhatók a következtetések.
        </p>
      </ContentSection>
    </div>
  );
}
