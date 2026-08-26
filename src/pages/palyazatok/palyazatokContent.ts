/**
 * Pályázatok page — source: client-reference/palyazatok.html (GINOP Plusz 3.2.1-21)
 */

import { referenceClientLogos } from '../../content/partners';
import { teamPhotos2025 } from '../../data/media';

export const palyazatokHero = {
  label: 'Pályázatok · GINOP Plusz 3.2.1-21',
  q1: 'Mi van, ha képzem a munkavállalóimat és elmennek?',
  q2Lead: 'Ok, de mi van akkor, ha nem képzem és',
  q2Mark: 'maradnak?!',
  lead: 'Támogatott képzések az Év Trénere díj nyerteseivel!',
  cta: 'Lépjen velünk kapcsolatba!',
} as const;

export const palyazatokDeadline = {
  kicker: 'Az új felhívás megjelent!',
  label: 'Benyújtás:',
  date: '2026. május 31.',
} as const;

export const palyazatokTopics = {
  label: 'Támogatott képzési témák',
  title: 'Miben fejlődhet a csapata?',
  cards: [
    {
      id: 'vezetoi',
      title: 'Vezetői kompetenciák fejlesztése',
      text: 'A XXI. századi vezető ismérvei',
    },
    {
      id: 'kommunikacio',
      title: 'Bontsa le a munkahelyi kommunikációs gátakat',
      items: [
        'Generációk között',
        'Ügyfelekkel',
        'Munkatársakkal',
        'Vezető és beosztott között',
      ],
    },
    {
      id: 'stressz',
      title: 'Nagy a nyomás, a munkahelyi stressz?',
      text: 'Ismerjen meg stresszkezelési technikákat',
    },
  ],
} as const;

export const palyazatokFacts = {
  label: 'GINOP Plusz 3.2.1-21',
  title: 'Pályázati tények',
  items: [
    { id: 'meret', symbol: '›', text: 'Mikro-, kis-, közép- és nagyvállalatok' },
    { id: 'bp', symbol: '›', text: 'Budapesti székhellyel rendelkező cégek is' },
    { id: 'tamogatas', value: 70, suffix: '%', text: 'akár 70%-os képzési- és bértámogatás', highlight: true },
    { id: 'eloleg', value: 50, suffix: '%', text: '50% előleg igényelhető', highlight: true },
  ],
} as const;

export const palyazatokAbout = {
  text:
    'A Rávezető 2008 óta működő tanácsadó vállalat, 2014 óta engedéllyel rendelkező felnőttképző intézmény, kompetenciafejlesztési fókusszal.',
  linkLabel: 'Tudjon meg többet rólunk! →',
  link: '/rolunk',
} as const;

const partnerSlugs = ['ref14', 'ref16', 'ref22', 'ref9'] as const;

export const palyazatokPartners = {
  label: 'Együttműködő partnereink:',
  linkLabel: 'További referenciák →',
  link: '/referenciak',
  logos: partnerSlugs
    .map((slug) => referenceClientLogos.find((logo) => logo.slug === slug))
    .filter((logo): logo is (typeof referenceClientLogos)[number] => Boolean(logo)),
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
  portrait: teamPhotos2025['berta-aniko'],
  email: 'kepzes@ravezeto.hu',
  phone: '+36 70/513 4128',
  phoneTel: '+36705134128',
} as const;

export const palyazatokForm = {
  title: 'Lépjen velünk kapcsolatba!',
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_CONTACT as string | undefined,
  privacyText:
    'Ennek az űrlapnak a kitöltésével hozzájárul, hogy a weblap eltárolja és felhasználja a megadott adatokat.',
  privacyLink: '/adatvedelem',
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
