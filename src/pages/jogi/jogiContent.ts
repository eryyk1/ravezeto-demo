type JogiDocument = {
  label: string;
  href: string;
  description?: string;
};

type JogiPageContent = {
  title: string;
  intro: string;
  body?: readonly string[];
  documents: JogiDocument[];
};

export const jogiPages: Record<string, JogiPageContent> = {
  adatvedelem: {
    title: 'Adatvédelem',
    intro:
      'Az alábbi dokumentumok tartalmazzák a Rávezető Projekt Kft. adatkezelési tájékoztatóit és kapcsolódó nyilatkozatait. A Rávezető Projekt Kft. (Rávezető) engedélyezett felnőttképző intézményként (E/2021/000106, B/2020/001943) kezeli az ügyfelek, képzési résztvevők és weboldal-látogatók személyes adatait a hatályos GDPR és magyar adatvédelmi jogszabályok szerint.',
    body: [
      'Weboldalunk használata során kapcsolatfelvételi űrlapokon, képzési érdeklődés esetén, valamint ügyfélkapcsolati levelezésben kezelhetünk személyes adatokat. Az adatkezelés célja, jogalapja, az érintettek jogai és az adatkezelés időtartama a letölthető adatvédelmi tájékoztatóban kerül részletezésre.',
      'Adatkezeléssel kapcsolatos kérdéseivel forduljon hozzánk az info@ravezeto.hu e-mail címen, vagy postai úton a 1146 Budapest, Izsó u. 7. 1/3. címre.',
    ],
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
      'A Rávezető Projekt Kft. (Rávezető) weboldala sütiket (cookie-kat) használ a megfelelő működés, a biztonság és a felhasználói élmény biztosítása érdekében. Ez az oldal összefoglalja a sütik típusait és kezelését; a részletes adatvédelmi szabályok az adatvédelmi tájékoztatóban érhetők el.',
    body: [
      'A működéshez szükséges sütik biztosítják az oldal alapvető funkcióit (például navigáció, űrlapok). Analitikai sütiket csak a vonatkozó jogszabályoknak megfelelően, megfelelő tájékoztatás mellett alkalmazunk. A sütik beállításait böngészőjében módosíthatja; egyes funkciók ilyenkor korlátozottan érhetők el.',
      'Cookie-kkal és adatkezeléssel kapcsolatos kérdés esetén írjon az info@ravezeto.hu címre.',
    ],
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
