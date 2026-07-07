import { PageHero, ContentSection } from '../components/PageSections';

export default function ConsultingPage() {
  return (
    <div className="consulting-page">
      <PageHero
        title="Tanácsadás"
        subtitle="Egyetlen szervezetfejlesztés sem lehet sikeres a változást támogató vezetők és munkatársak nélkül. Ezt az emberközpontú megközelítést garantáljuk minden, általunk vezetett tanácsadási folyamatban."
        accent="purple"
      />

      <ContentSection variant="quote">
        <p>
          <strong>
            „Mindaz, amit látsz, hamarosan megváltozik, sőt megszűnik. Arra gondolj, hány
            változásnak voltál már magad is tanúja.”
          </strong>
        </p>
        <p>Marcus Aurelius római császár kétezer éves üzenete a változások tudatos irányításáról.</p>
      </ContentSection>

      <ContentSection title="Szervezetfejlesztés">
        <h3>Szervezeti kultúra: a sikeres változás alapja</h3>
        <p>
          Meggyőződésünk, hogy egyetlen szervezetfejlesztés sem lehet sikeres a változást értő és
          támogató munkatársak nélkül. Ha a szervezeti kultúra nem változik, nincs esély a
          stratégia sikeres végrehajtására!
        </p>
        <h3>Közös munka, tartós eredmény</h3>
        <p>
          Hiszünk a folyamatalapú megközelítésben. Nem kész megoldásokat kínálunk, hanem
          emberközpontú szervezetfejlesztőként szoros csapatmunkában támogatjuk partnereinket
          céljaik megvalósításában.
        </p>
      </ContentSection>

      <ContentSection variant="quote">
        <p>
          Tanácsadóink nem csupán elméleti szakemberek – valós szervezeti kihívásokban szerzett
          tapasztalattal segítjük ügyfeleinket a változások vezetésében.
        </p>
      </ContentSection>
    </div>
  );
}
