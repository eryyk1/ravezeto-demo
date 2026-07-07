import { PageHero, ContentSection } from '../components/PageSections';

export default function GrantsPage() {
  return (
    <div className="grants-page">
      <PageHero
        title="Pályázatok"
        subtitle="Fejlesszük közösen vállalatát pályázati forrásokból! A Rávezető minősített szervezetfejlesztő és képzési szolgáltatóként számtalan vállalati kihívásban tud segíteni Önnek."
      />

      <ContentSection>
        <p>
          A Rávezető Projekt Kft. minősített szervezetfejlesztő és képzési szolgáltatóként
          számos uniós és hazai pályázati programban támogatja partnereit.
        </p>
      </ContentSection>

      <ContentSection title="Aktuális lehetőségek">
        <ul className="feature-list">
          <li>GINOP és VEKOP pályázatok</li>
          <li>Szervezetfejlesztési és képzési projektek</li>
          <li>Pályázati adminisztráció támogatása</li>
          <li>Projektmegvalósítás és tanácsadás</li>
        </ul>
      </ContentSection>

      <ContentSection variant="quote">
        <p>
          Több mint 400 tanácsadási projekt tapasztalata biztosítja, hogy partnereink a
          pályázati folyamat minden szakaszában számíthatnak ránk.
        </p>
      </ContentSection>
    </div>
  );
}
