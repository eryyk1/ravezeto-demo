import { PageHero, ContentSection } from '../components/PageSections';

export default function ServicesPage() {
  return (
    <div className="services-page">
      <PageHero
        title="Szolgáltatásaink"
        subtitle="A szervezeti teljesítmény növelése optimálisan több tényező együttes fejlesztésével valósítható meg."
      />

      <ContentSection title="Szervezetfejlesztési tanácsadás">
        <p>
          Ügyfeleink számára igényeik szerint szervezeti stratégiájuk megalkotásában és
          karbantartásában, a szervezeti folyamatok tisztázásában és újjászervezésében, a
          szervezeti megújulást célzó változások kezelésében nyújtunk támogatást.
        </p>
        <p>
          A humán stratégia kidolgozását és frissítését, a fejlesztési és képzési igények
          meghatározását, illesztését és megvalósítását, a szervezet felsővezetőinek személyi
          edzését, valamint a szervezeten belüli projektek szakszerű tervezését és végrehajtását
          végezzük.
        </p>
      </ContentSection>

      <ContentSection title="Projektmenedzsment">
        <p>
          A „hagyományos” projektmenedzsment módszertanok alkalmazása mellett támogatjuk
          ügyfeleinket a komplex vagy nem jól definiálható projektek megvalósítását szolgáló
          iteratív, agilis projektmenedzsment módszerek bevezetésében is.
        </p>
        <p>
          Évtizedes tapasztalattal rendelkezünk EU-forrásból megvalósuló humánerőforrás- és
          közigazgatás-fejlesztési projektek tervezésében és menedzsmentjében.
        </p>
      </ContentSection>

      <ContentSection title="Felnőttképzés">
        <p>
          Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi
          kulcskompetenciáit. Felnőttképző intézményként több mint 250 képzési projektet
          valósítottunk meg.
        </p>
      </ContentSection>
    </div>
  );
}
