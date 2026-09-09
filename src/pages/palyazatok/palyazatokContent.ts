/**
 * Pályázatok page — source: client-reference/palyazatok.html (GINOP Plusz 3.2.1-21)
 */


export const palyazatokHero = {
  label: 'Pályázatok · GINOP Plusz 3.2.1-21',
  q1: 'Mi van, ha képzem a munkavállalóimat és elmennek?',
  q2Lead: 'Ok, de mi van akkor, ha nem képzem és',
  q2Mark: 'maradnak?!',
  lead: 'Támogatott képzések az Év Trénere díj nyerteseivel!',
  cta: 'Lépjen velünk kapcsolatba!',
} as const;

export const palyazatokAbout = {
  text:
    'A Rávezető 2008 óta működő tanácsadó vállalat, 2014 óta engedéllyel rendelkező felnőttképző intézmény, kompetenciafejlesztési fókusszal.',
  linkLabel: 'Tudjon meg többet rólunk! →',
  link: '/rolunk',
} as const;

export const palyazatokPartners = {
  label: 'Együttműködő partnereink:',
  linkLabel: 'További referenciák →',
  link: '/referenciak',
  logos: [
    {
      src: '/assets/images/palyazatok/img-02.jpg',
      alt: 'SALDO Pénzügyi Tanácsadó és Informatikai Zrt.',
    },
    {
      src: '/assets/images/palyazatok/img-03.jpg',
      alt: 'Smart Digital Kft.',
    },
    {
      src: '/assets/images/palyazatok/img-04.png',
      alt: 'Globomax Zrt.',
    },
    {
      src: '/assets/images/palyazatok/img-05.png',
      alt: 'ATEV Fehérjefeldolgozó Zrt.',
    },
    {
      src: '/assets/images/palyazatok/img-06.png',
      alt: 'Budapest Gyógyfürdői és Hévizei Zrt.',
    },
  ],
} as const;

export const palyazatokSteps = {
  label: 'Hogyan segítünk?',
  title: 'Díjmentes konzultációval indulunk',
  steps: [
    'Díjmentes konzultáció,',
    'ami alapján segítünk összeállítani a cégre szabott képzési portfólióját,',
    'és végigkísérjük a benyújtás és a megvalósítás során!',
  ],
} as const;

export const palyazatokContact = {
  name: 'Berta Anikó',
  role: 'Projektmenedzser',
  portrait: '/assets/images/palyazatok/img-07.jpg',
  email: 'kepzes@ravezeto.hu',
  phone: '+36 70/513 4128',
  phoneTel: '+36705134128',
} as const;

export const palyazatokForm = {
  title: 'Lépjen velünk kapcsolatba!',
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_CONTACT as string | undefined,
  privacyText:
    'Ennek az űrlapnak a kitöltésével hozzájárul, hogy a weblap eltárolja és felhasználja a megadott adatokat.',
  privacyLink: '/jogi/adatvedelem',
  privacyLinkLabel: 'Adatkezelési szabályzat',
  submit: 'Küldés →',
  messages: {
    success: 'Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.',
    error: 'Hiba történt. Kérjük próbálja újra később.',
    required: 'Ez a mező kötelező.',
    invalidEmail: 'Érvénytelen e-mail cím.',
    notConfigured:
      'Az űrlap jelenleg nincs konfigurálva. Kérjük írjon közvetlenül a kepzes@ravezeto.hu címre.',
  },
} as const;
