/** /tanacsadas — aligned with TanacsadasBody.tsx */

import { themeImage } from '../data/media';

export const tanacsadasHero = {
  label: 'Tanácsadás',
  title:
    'Egyetlen szervezetfejlesztés sem lehet sikeres a változást támogató vezetők és munkatársak nélkül.',
  intro:
    'Ezt az emberközpontú megközelítést garantáljuk minden, általunk vezetett tanácsadási folyamatban.',
  image: themeImage('section1_back.png'),
  imageAlt: 'Rávezető Projekt — szervezetfejlesztés és tanácsadás',
} as const;

export const tanacsadasQuote = {
  kicker: 'Kétezer éve is igaz volt',
  text: 'Mindaz, amit látsz, hamarosan megváltozik, sőt megszűnik. Arra gondolj, hány változásnak voltál már magad is tanúja. A világ változás, az élet felfogás dolga.',
  author: 'Marcus Aurelius',
  note:
    'A változások tudatos irányítása, a változáshoz való alkalmazkodásunk határozza meg sikerességünket.',
} as const;

export const tanacsadasMotto =
  'Tanácsadóink nem csupán elméleti szakemberek – valós szervezeti kihívásokban szerzett tapasztalattal segítjük ügyfeleinket a változások vezetésében.';

export const tanacsadasSzervezetfejlesztes = {
  punch: tanacsadasMotto,
  bands: [
    {
      title: 'Szervezeti kultúra: a sikeres változás alapja',
      paragraphs: [
        'A szervezeti kultúra változása nélkül, nincs esély a stratégia sikeres végrehajtására!',
        'A kultúra jórészt a felszín alatt működik: a kimondatlan szabályokban, a beidegződött reflexekben, abban, ahogyan a szervezetben valójában döntenek és együttműködnek. Munkánk első lépése ezért mindig az, hogy ezt láthatóvá és megbeszélhetővé tegyük.',
      ],
      photoLabel: '🖊 sketch-rajz helye\n(assets/tanacsadas-kultura.png)',
    },
    {
      title: 'Közös munka, tartós eredmény',
      paragraphs: [
        'Hiszünk a folyamatalapú megközelítésben. Nem kész megoldásokat kínálunk, hanem szoros csapatmunkában támogatjuk partnereinket céljaik megvalósításában.',
        'Az eredmények a tanácsadási folyamat során, közös munkával születnek meg. Ügyfeleink mellett állunk a tervezéstől a megvalósításig, biztosítva a szükséges szakmai támogatást minden lépésnél.',
      ],
      photoLabel: '🖊 sketch-rajz helye\n(assets/tanacsadas-kozos-munka.png)',
    },
  ],
} as const;

export const tanacsadasValtozasmenedzsment = {
  lead:
    'A gyorsan változó környezetben különösen fontos a stratégiai gondolkodás és a szervezeti kultúra összehangolása a szervezeti hatékonyság növelése érdekében. Segítünk megtervezni a változást, felkészíteni azokat a vezetőket és munkatársakat, akiken a végrehajtás múlik, és erősíteni az együttműködést a szervezeti egységek között. Ott is ügyfeleink mellett maradunk, ahol a legtöbb változás elakad: a célok eléréséhez szükséges projektek és folyamatok megvalósításánál.',
  photoLabel: '🖊 sketch-rajz helye\n(assets/tanacsadas-valtozas.png)',
} as const;

export const tanacsadasCoaching = {
  lead:
    'Napjaink vezetői döntési helyzeteikben minden belső és külső támogatás ellenére nap mint nap egyedül maradnak a rájuk háruló felelősséggel. A személyes és bizalmi kapcsolat vezető és tanácsadó között arra is alkalmas, hogy többféle módszertani eszköz, gyakorlatok és a visszacsatolás révén elősegítse a vezetői készségek és kompetenciák fejlesztését a szervezeti és személyes haszon maximalizálására.',
  photoLabel: '🖊 sketch-rajz helye\n(assets/coaching.png)',
} as const;

/** Legacy service cards — kept for services admin list */
export const tanacsadasServices = [
  {
    id: 'szervezetfejlesztes',
    index: '01',
    label: 'Szervezetfejlesztés',
    title: 'Szervezeti kultúra: a sikeres változás alapja',
    intro:
      'A szervezeti kultúra változása nélkül, nincs esély a stratégia sikeres végrehajtására!',
    detail:
      'Hiszünk a folyamatalapú megközelítésben. Nem kész megoldásokat kínálunk, hanem szoros csapatmunkában támogatjuk partnereinket céljaik megvalósításában.',
    problems: [
      'A kultúra jórészt a felszín alatt működik — munkánk első lépése, hogy ezt láthatóvá tegyük.',
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
    title: 'Változás menedzsment',
    intro: tanacsadasValtozasmenedzsment.lead,
    problems: [],
    cta: 'Kapcsolatfelvétel',
    link: '/kapcsolat',
    visual: '/assets/illustrations/illust_projectmanagement.svg',
  },
  {
    id: 'coaching',
    index: '03',
    label: 'Coaching',
    title: 'Üzleti edzés, coaching',
    intro: tanacsadasCoaching.lead,
    problems: [],
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

export const tanacsadasClose = {
  kicker: 'Kapcsolat',
  title: 'Keressen minket bizalommal!',
  cta: 'Írjon nekünk',
  link: '/kapcsolat',
} as const;
