/** Change framework layers — live https://www.ravezeto.hu/tanacsadas/ */

export const tanacsadasFramework = {
  label: 'Változás keretrendszere',
  title: 'Rétegzett átalakulási modell',
  intro:
    'A szervezeti kultúrától a vezetői támogatásig — összekapcsolt fázisokban, közös munkával.',
  layers: [
    {
      id: 'kultura',
      depth: 1,
      title: 'Szervezeti kultúra',
      tagline: 'A sikeres változás alapja',
      summary:
        'Egyetlen szervezetfejlesztés sem lehet sikeres a változást értő és támogató munkatársak nélkül.',
      detail:
        'Ha a szervezeti kultúra nem változik, nincs esély a stratégia sikeres végrehajtására.',
    },
    {
      id: 'kozosmunka',
      depth: 2,
      title: 'Közös munka',
      tagline: 'Folyamatalapú megközelítés',
      summary:
        'Nem kész megoldásokat kínálunk — az eredmények a tanácsadási folyamat során, közös munkával születnek meg.',
      detail:
        'Ügyfeleink mellett állunk a tervezéstől a megvalósításig.',
    },
    {
      id: 'valtozas',
      depth: 3,
      title: 'Változásmenedzsment',
      tagline: 'Stratégiai összehangolás',
      summary:
        'A gyorsan változó környezetben a stratégiai gondolkodás és a szervezeti kultúra összehangolása kulcsfontosságú.',
      spokes: [
        'A változások stratégiai tervezésére',
        'A változást támogató munkatársak felkészítésére',
        'A szervezeti együttműködés fejlesztésére',
        'A célok eléréséhez szükséges projektek és folyamatok megvalósításának elősegítésére',
      ],
    },
    {
      id: 'coaching',
      depth: 4,
      title: 'Üzleti edzés, coaching',
      tagline: 'Vezetői támogatás',
      summary:
        'Szervezeti tapasztalattal rendelkező coachok támogatják a kritikus döntéseket és a vezetői fejlődést.',
      detail:
        'Egyedi megközelítéssel, közös elemzéssel és visszacsatolással.',
    },
  ],
} as const;
