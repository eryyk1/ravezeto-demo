export type JogiDocument = {
  label: string;
  href: string;
  description?: string;
};

export type JogiPageContent = {
  title: string;
  intro: string;
  documents: JogiDocument[];
};

export const jogiPages: Record<string, JogiPageContent> = {
  adatvedelem: {
    title: 'Adatvédelem',
    intro:
      'Az alábbi dokumentumok tartalmazzák a Rávezető Projekt Kft. adatkezelési tájékoztatóit és kapcsolódó nyilatkozatait.',
    documents: [
      {
        label: 'Adatvédelmi tájékoztató (2025)',
        href: '/assets/documents/Adatvedelmi_2025.pdf',
        description: 'PDF letöltés — aktuális adatvédelmi tájékoztató',
      },
    ],
  },
  impresszum: {
    title: 'Impresszum',
    intro:
      'A Rávezető Projekt Kft. hivatalos elérhetőségei és jogi adatai. Kapcsolódó dokumentumok letölthetők az alábbi linkeken.',
    documents: [
      {
        label: 'Adatvédelmi tájékoztató (2025)',
        href: '/assets/documents/Adatvedelmi_2025.pdf',
        description: 'PDF letöltés',
      },
      {
        label: 'GDPR — Kapcsolatok',
        href: '/assets/documents/GDPR_Kapcsolatok.pdf',
        description: 'PDF letöltés — GDPR kapcsolattartási nyilatkozat',
      },
    ],
  },
  gdpr: {
    title: 'GDPR',
    intro: 'GDPR kapcsolódó dokumentumok.',
    documents: [
      {
        label: 'GDPR — Kapcsolatok',
        href: '/assets/documents/GDPR_Kapcsolatok.pdf',
        description: 'PDF letöltés',
      },
    ],
  },
  cookie: {
    title: 'Cookie tájékoztató',
    intro:
      'Ez az oldal a sütik (cookie-k) használatáról szóló tájékoztatót tartalmazza. A részletes adatkezelési szabályok az adatvédelmi dokumentumban érhetők el.',
    documents: [
      {
        label: 'Adatvédelmi tájékoztató (2025)',
        href: '/assets/documents/Adatvedelmi_2025.pdf',
        description: 'PDF letöltés — tartalmazza a cookie-kra vonatkozó rendelkezéseket',
      },
    ],
  },
};

export const jogiFallback: JogiPageContent = {
  title: 'Jogi információk',
  intro: 'Válasszon az alábbi jogi dokumentumok közül.',
  documents: [
    {
      label: 'Adatvédelem',
      href: '/jogi/adatvedelem',
    },
    {
      label: 'Impresszum',
      href: '/jogi/impresszum',
    },
    {
      label: 'GDPR — Kapcsolatok (PDF)',
      href: '/assets/documents/GDPR_Kapcsolatok.pdf',
    },
  ],
};
