/** /tanacsadas — backup: template-tanacsadas.php + services CPT */

export const tanacsadasHero = {
  label: 'Tanácsadás',
  title: 'Emberközpontú\nszervezetfejlesztés',
  intro:
    'Egyetlen szervezetfejlesztés sem lehet sikeres a változást támogató vezetők és munkatársak nélkül. Ezt az emberközpontú megközelítést garantáljuk minden, általunk vezetett tanácsadási folyamatban.',
} as const;

export const tanacsadasQuote = {
  text: 'Mindaz, amit látsz, hamarosan megváltozik, sőt megszűnik. Arra gondolj, hány változásnak voltál már magad is tanúja.',
  author: 'Marcus Aurelius',
} as const;

export const tanacsadasAreas = [
  {
    id: 'szervezetfejlesztes',
    label: 'Szervezetfejlesztés',
    question: 'Hová szeretnék eljutni és mennyi idő alatt, milyen utat válasszunk?',
    text: 'Minden szervezet rendelkezik a stratégiai gondolkodás igényével. A megvalósítható stratégia kialakítása és alkalmazása, a szervezet munkavállalóinak és folyamatainak ehhez történő illesztése jelent valódi kihívást. Ehhez a kiemelt vezetői feladathoz biztosítunk szakértői támogatást, a stratégia alkotás folyamatától a cselekvés mozzanatáig.',
    illustration: '/assets/illustrations/illust_strategy.svg',
  },
  {
    id: 'hr-fejlesztes',
    label: 'HR tanácsadás',
    question:
      'Pozitívan befolyásolja-e a szervezeti működést, ha fontos nekem munkatársaim képzettsége, motiváltsága?',
    text: 'Vezetőként nagyon könnyű igent mondani erre a kérdésre, de nehéz tenni is érte a mindennapokban. Munkatársaink a humán szervezeti igények felmérésével és elemzésével, az ebből levezethető humán fejlesztési stratégia megalkotásával, az új munkatársak kiválasztásával, a meglévő munkatársak motiválásával és fejlesztésével támogatják a működés fejlesztését.',
    illustration: '/assets/illustrations/illust_hrdevelopment.svg',
  },
  {
    id: 'vezetofejlesztes',
    label: 'Vezetőfejlesztés',
    question: 'Miben kell fejlődnöm, hogy jobb vezető legyek?',
    text: 'Napjaink vezetői döntési helyzeteikben minden szervezeti támogatás ellenére nap mint nap egyedül maradnak a rájuk háruló felelősséggel. Szakembereink egyéni megközelítésükkel, saját szervezeti vezetői tapasztalatukkal támogatják a vezetői munkavégzést a szervezeti problémák és kihívások, döntési pontok közös elemzésével.',
    illustration: '/assets/illustrations/illust_coaching.svg',
  },
  {
    id: 'coaching',
    label: 'Coaching',
    question: 'Üzleti edzés, coaching — tényleg szükségem van rá?',
    text: 'A személyes és bizalmi kapcsolat vezető és tanácsadó között arra is alkalmas, hogy többféle módszertani eszköz, gyakorlatok és a visszacsatolás révén elősegítse a vezetői készségek és kompetenciák fejlesztését a szervezeti és személyes haszon maximalizálására. Nálunk a coachok tényleg rendelkeznek szervezeti tapasztalattal.',
    illustration: '/assets/illustrations/illust_inner_coaching.svg',
  },
  {
    id: 'valtozasmenedzsment',
    label: 'Változásmenedzsment',
    question: 'Fejlesztésben gondolkodom, projektkeretben? Uniós forrásból?',
    text: 'A munkaszervezetek egyedi fejlesztési céljaikat projektek keretében érik el. Évtizedes tapasztalattal rendelkezünk EU-forrásból megvalósuló humánerőforrás- és közigazgatás-fejlesztési projektek, komplex fejlesztési programok tervezésében és menedzsmentjében. Támogatjuk a szervezetet a felkészülésben, a szabályozás kialakításában, de igény szerint átvállaljuk a részletes tervezési feladatokat is.',
    illustration: '/assets/illustrations/illust_projectmanagement.svg',
  },
] as const;

export const tanacsadasCulture = {
  title: 'Szervezeti kultúra: a sikeres változás alapja',
  paragraphs: [
    'Meggyőződésünk, hogy egyetlen szervezetfejlesztés sem lehet sikeres a változást értő és támogató munkatársak nélkül. Ha a szervezeti kultúra nem változik, nincs esély a stratégia sikeres végrehajtására!',
    'Hiszünk a folyamatalapú megközelítésben. Nem kész megoldásokat kínálunk, hanem emberközpontú szervezetfejlesztőként szoros csapatmunkában támogatjuk partnereinket céljaik megvalósításában.',
  ],
} as const;
