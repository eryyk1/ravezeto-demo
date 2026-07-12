/**
 * References page content — source: live https://www.ravezeto.hu/referenciaink/
 * Partner quotes: live https://www.ravezeto.hu/csapatunk/ (testimonials, not case studies)
 */

import { referenceClientLogos } from '../../content/partners';

export const referenciakHero = {
  label: 'Referenciák',
  title: 'Büszkék vagyunk partnereink bizalmára!',
} as const;

/** Live display order: ref35 → ref1. First six appear first on the current website. */
export const referenciakFeaturedCount = 6;

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

export const referenciakYearGroups = [
  {
    year: '2025',
    label: 'Frissített partnerlogók — a jelenlegi weboldal sorrendje szerint',
    items: referenceClientLogos.map((item, index) => ({
      ...item,
      year: '2025' as const,
      featured: index < referenciakFeaturedCount,
      hasQuote: Boolean(quoteBySlug[item.slug]),
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
