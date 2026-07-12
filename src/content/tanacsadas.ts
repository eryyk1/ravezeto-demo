/** /tanacsadas — source: live https://www.ravezeto.hu/tanacsadas/ */

import { themeImage } from '../data/media';

export const tanacsadasHero = {
  label: 'TANÁCSADÁS',
  title:
    'Egyetlen szervezetfejlesztés sem lehet sikeres a változást támogató vezetők és munkatársak nélkül.',
  intro:
    'Ezt az emberközpontú megközelítést garantáljuk minden, általunk vezetett tanácsadási folyamatban.',
  image: themeImage('section1_back.png'),
  imageAlt: 'Rávezető Projekt — szervezetfejlesztés és tanácsadás',
} as const;

export const tanacsadasQuote = {
  text: 'Mindaz, amit látsz, hamarosan megváltozik, sőt megszűnik. Arra gondolj, hány változásnak voltál már magad is tanúja. A világ változás, az élet felfogás dolga.',
  author: 'Marcus Aurelius római császár',
  note:
    'kétezer éves üzenete, hogy a változások tudatos irányítása, a változáshoz való hozzáállásunk, alkalmazkodásunk határozza meg sikerességünket.',
} as const;

export const tanacsadasMotto =
  'Tanácsadóink nem csupán elméleti szakemberek – valós szervezeti kihívásokban szerzett tapasztalattal segítjük ügyfeleinket a változások vezetésében.';

export const tanacsadasServices = [
  {
    id: 'szervezetfejlesztes',
    index: '01',
    label: 'Szervezetfejlesztés',
    title: 'Szervezeti kultúra: a sikeres változás alapja',
    intro:
      'Meggyőződésünk, hogy egyetlen szervezetfejlesztés sem lehet sikeres a változást értő és támogató munkatársak nélkül.',
    detail:
      'Hiszünk a folyamatalapú megközelítésben. Nem kész megoldásokat kínálunk, hanem emberközpontú szervezetfejlesztőként szoros csapatmunkában támogatjuk partnereinket céljaik megvalósításában. Az eredmények a tanácsadási folyamat során, közös munkával születnek meg.',
    problems: [
      'Ha a szervezeti kultúra nem változik, nincs esély a stratégia sikeres végrehajtására.',
      'Közös munka, tartós eredmény — a tervezéstől a megvalósításig.',
    ],
    cta: 'Kapcsolatfelvétel',
    link: '/kapcsolat',
    visual: '/assets/illustrations/illust_strategy.svg',
  },
  {
    id: 'valtozasmenedzsment',
    index: '02',
    label: 'Változásmenedzsment',
    title: 'A változás útja velünk',
    intro:
      'A gyorsan változó környezetben különösen fontos a stratégiai gondolkodás és a szervezeti kultúra összehangolása a szervezeti hatékonyság növelése érdekében. Szakértői támogatásunk kiterjed:',
    problems: [
      'A változások stratégiai tervezésére',
      'A változást támogató munkatársak felkészítésére',
      'A szervezeti együttműködés fejlesztésére',
      'A célok eléréséhez szükséges projektek és folyamatok megvalósításának szakszerű és megbízható elősegítésére',
    ],
    cta: 'Kapcsolatfelvétel',
    link: '/kapcsolat',
    visual: '/assets/illustrations/illust_projectmanagement.svg',
  },
  {
    id: 'coaching',
    index: '03',
    label: 'Coaching',
    title: 'Üzleti edzés, coaching — nemcsak „magányos” vezetőknek',
    intro:
      'Napjaink vezetői döntési helyzeteikben minden belső és külső támogatás ellenére nap mint nap egyedül maradnak a rájuk háruló felelősséggel.',
    detail:
      'Nálunk a coachok tényleg rendelkeznek szervezeti tapasztalattal! Egyedi megközelítéssel, módszertannal saját vezetői tapasztalatukra is támaszkodva támogatják a vezetői munkavégzést a szervezeti problémák és kihívások, döntési pontok, korábbi és jelenidejű döntések közös elemzésével.',
    problems: [
      'Döntéseink szempontjai, elemzésük előtte (és néha utána)',
      'Fejlődésem útja, hogy jobb vezető legyek — a vezetői készségek és kompetenciák fejlesztése a szervezeti és személyes haszon maximalizálására.',
    ],
    cta: 'Kapcsolatfelvétel',
    link: '/kapcsolat',
    visual: '/assets/illustrations/illust_coaching.svg',
  },
] as const;

export const tanacsadasProcess = {
  label: 'Folyamat',
  title: 'A tanácsadási út',
  lead: 'Ügyfeleink mellett állunk a tervezéstől a megvalósításig, biztosítva a szükséges szakmai támogatást minden lépésnél.',
  steps: [
    {
      id: 'tervezes',
      step: '01',
      title: 'Stratégiai tervezés',
      text: 'A változások stratégiai tervezésére — a tervezéstől induló közös munkával.',
    },
    {
      id: 'felkeszites',
      step: '02',
      title: 'Felkészítés',
      text: 'A változást támogató munkatársak felkészítésére.',
    },
    {
      id: 'egyuttmukodes',
      step: '03',
      title: 'Együttműködés',
      text: 'A szervezeti együttműködés fejlesztésére.',
    },
    {
      id: 'megvalositas',
      step: '04',
      title: 'Megvalósítás',
      text: 'A célok eléréséhez szükséges projektek és folyamatok megvalósításának szakszerű és megbízható elősegítésére.',
    },
    {
      id: 'tamogatas',
      step: '05',
      title: 'Folyamatos támogatás',
      text: 'A szükséges szakmai támogatás biztosítása minden lépésnél — a megvalósításig.',
    },
  ],
} as const;

export const tanacsadasCta = {
  title: 'Változásokat vezetünk, együtt!',
  text: 'Közösen hajlítjuk a teret, alakítjuk az egészségesebb vállalati jövőt.',
  cta: 'Kapcsolat',
  link: '/kapcsolat',
} as const;
