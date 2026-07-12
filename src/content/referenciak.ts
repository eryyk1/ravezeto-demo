/** /referenciak — source: live https://www.ravezeto.hu/referenciaink/ */

import { themeImage } from '../data/media';
import { referenceClientLogos } from './partners';

export const referenciakHero = {
  label: 'REFERENCIÁK',
  title: 'Büszkék vagyunk partnereink bizalmára!',
  intro:
    'Évtizedes szakmai együttműködések vállalatokkal, intézményekkel és önkormányzatokkal — a legfrissebb partnereink előre kerülnek.',
  image: themeImage('section1_back.png'),
  imageAlt: 'Rávezető Projekt — partnerek és referenciák',
} as const;

/** Verified partner quotes — source: live /csapatunk testimonials (no case-study pages). */
export const referenciakQuotes = [
  {
    id: 'smart-digital',
    slug: 'ref14',
    author: 'Horváth Botond',
    role: 'operatív vezető, Smart Digital Kft.',
    text:
      'Szívesen dolgozom a Rávezető csapatával, mert Mariann és Andi is mindig segítőkész és előre megnyugodhatok, hogy bármilyen képzést is tartanak nekünk, profi trénert küldenek és a kapcsolódó pályázati adminisztráció oldala is pontos és naprakész.',
  },
  {
    id: 'saldo',
    slug: 'ref16',
    author: 'Sarkadi-Nagy András',
    role: 'vezérigazgató, SALDO Pénzügyi Tanácsadó és Informatikai Zrt.',
    text:
      'A GINOP Plusz-3.2.1 pályázat kapcsán kerültünk kapcsolatba a Rávezető Kft. szakértőivel, akik végigkísértek bennünket a pályázat benyújtásától a képzések lebonyolításán át egészen a projekt elszámolásáig.',
  },
  {
    id: 'globomax',
    slug: 'ref22',
    author: 'Amberger Árpád',
    role: 'vezérigazgató, Globomax Zrt.',
    text:
      'A Rávezető Kft.-vel két szervezetfejlesztési projekten dolgoztunk. Egy féléves projekttel az ehhez szükséges alapokat le tudtuk rakni — az ötéves középtávú terv keretében az árbevételünket meg tudtuk duplázni.',
  },
  {
    id: 'sze',
    slug: 'ref9',
    author: 'Váginé Varga Zsuzsa',
    role: 'igazgató, Humánerőforrás Igazgatóság, SZE',
    text:
      'A Széchenyi István Egyetem stratégiai céljainak megvalósítását támogató programban a Rávezető Projekt Kft. hatékony segítséget nyújtott. Kollégáink visszajelzései alapján a program elérte célját.',
  },
] as const;

const quoteBySlug = Object.fromEntries(
  referenciakQuotes.map((quote) => [quote.slug, quote.text]),
) as Record<string, string>;

/** Live display order: ref35 → ref1 (Feb 2025 batch). First six = featured on live site. */
export const referenciakFeaturedCount = 6;

export const referenciakYearGroups = [
  {
    year: '2025',
    label: '2025 — frissített partnerlogók',
    items: referenceClientLogos.map((item, index) => ({
      ...item,
      year: '2025' as const,
      featured: index < referenciakFeaturedCount,
      description: quoteBySlug[item.slug],
    })),
  },
] as const;

export type ReferenciakReference = (typeof referenciakYearGroups)[number]['items'][number];

export const referenciakFilters = [
  { id: 'all', label: 'Összes' },
  { id: 'featured', label: 'Kiemelt' },
  { id: 'quoted', label: 'Ajánlások' },
] as const;

export type ReferenciakFilterId = (typeof referenciakFilters)[number]['id'];

export const referenciakCta = {
  title: 'Legyen Ön is partnerünk!',
  text: 'Szívesen beszélgetünk szervezeti fejlesztési, tanácsadási és képzési igényeiről.',
  cta: 'Kapcsolat',
  link: '/kapcsolat',
} as const;
