/** Consulting framework — live https://www.ravezeto.hu/tanacsadas/ services only */

export const tanacsadasFramework = {
  label: 'Megközelítésünk',
  title: 'A változás útja velünk',
  intro:
    'Emberközpontú tanácsadási folyamatunk a szervezeti kultúrától a vezetői támogatásig — lépésről lépésre, közös munkával.',
  steps: [
    {
      id: 'kultura',
      step: '01',
      title: 'Szervezeti kultúra',
      subtitle: 'A sikeres változás alapja',
      summary:
        'Meggyőződésünk, hogy egyetlen szervezetfejlesztés sem lehet sikeres a változást értő és támogató munkatársak nélkül.',
      detail:
        'Ha a szervezeti kultúra nem változik, nincs esély a stratégia sikeres végrehajtására.',
    },
    {
      id: 'kozosmunka',
      step: '02',
      title: 'Közös munka',
      subtitle: 'Tartós eredmény',
      summary:
        'Folyamatalapú, emberközpontú megközelítés — nem kész megoldásokat kínálunk, hanem szoros csapatmunkában támogatjuk partnereinket.',
      detail:
        'Az eredmények a tanácsadási folyamat során, közös munkával születnek meg.',
    },
    {
      id: 'valtozas',
      step: '03',
      title: 'Változásmenedzsment',
      subtitle: 'Stratégiai támogatás',
      summary:
        'A gyorsan változó környezetben a stratégiai gondolkodás és a szervezeti kultúra összehangolása kulcsfontosságú.',
      pillars: [
        'A változások stratégiai tervezésére',
        'A változást támogató munkatársak felkészítésére',
        'A szervezeti együttműködés fejlesztésére',
        'A célok eléréséhez szükséges projektek és folyamatok megvalósításának elősegítésére',
      ],
    },
    {
      id: 'coaching',
      step: '04',
      title: 'Üzleti edzés, coaching',
      subtitle: 'Vezetői támogatás',
      summary:
        'Nemcsak „magányos” vezetőknek — szervezeti tapasztalattal rendelkező coachok támogatják a kritikus döntéseket.',
      detail:
        'Egyedi megközelítéssel, közös elemzéssel és visszacsatolással fejlesztjük a vezetői kompetenciákat.',
    },
  ],
} as const;
