/** /rolunk — backup: magunkrol page + csapatunk template + colleagues CPT */

import siteContent from '../data/siteContent.json';
import { teamMembers } from './team';

export const rolunkHero = {
  label: 'Rólunk',
  title: 'Gyorsabban,\nerősebben,\nmagasabbra!',
  intro:
    'Az egyéni és szervezeti minőség és teljesítmény növelésében tudunk segíteni, közös gondolkodással, elhivatott szakemberekkel.',
} as const;

export const rolunkStory = {
  label: 'Történetünk',
  title: 'Citius, Altius, Fortius.',
  paragraphs: [
    siteContent.pages.magunkrol.content.split('<!--more-->')[0].trim(),
    'Munkatársaink és szakértőink jelentős szervezeti tapasztalattal rendelkező tanácsadók, projekttervezők és menedzserek. Minőségelvű csapatban gondolkodunk és cselekszünk, ügyfeleinket rávezetjük a megoldás útjára és végig is kísérjük azon.',
    'Belső meggyőződés a munkáink által saját magunk fejlesztése is. Gyorsabban, magasabbra, erősebben!',
  ],
} as const;

export const rolunkValues = {
  label: 'Értékeink',
  title: 'Amiben hiszünk',
  items: siteContent.home.reasons.map((r) => ({
    title: r.title.charAt(0) + r.title.slice(1).toLowerCase(),
    text: r.text,
  })),
} as const;

export const rolunkTeam = {
  label: 'Csapatunk',
  title: 'Munkatársaink',
  intro:
    'Vezetési tanácsadók vagyunk, problémákat oldunk meg, közösen hajlítjuk a teret, alakítjuk az egészségesebb vállalati jövőt.',
  members: teamMembers,
} as const;

export const rolunkTimeline = [
  {
    year: '2008',
    title: 'Tanácsadó vállalat',
    text: 'A Rávezető 2008 óta működő tanácsadó vállalat, szervezetfejlesztési fókusszal.',
  },
  {
    year: '2014',
    title: 'Felnőttképző intézmény',
    text: '2014 óta engedéllyel rendelkező felnőttképző intézmény, kompetenciafejlesztési fókusszal.',
  },
  {
    year: '2020',
    title: 'Nyilvántartásba vétel',
    text: 'Nyilvántartásba vételi szám: B/2020/001943 — minőségi, szabályozott képzési programok.',
  },
  {
    year: '2021',
    title: 'Képzési engedély',
    text: 'Engedélyszám: E/2021/000106 — akkreditált felnőttképzési szolgáltatások.',
  },
] as const;

export const rolunkTestimonials = [
  {
    quote:
      'A Rávezető csapata profi szervezeti diagnózist végzett, amely stabil alapot adott a változáshoz.',
    author: 'Horváth Botond',
    role: 'Smart Digital Kft.',
  },
  {
    quote:
      'Egyéni megközelítésükkel támogatták vezetői döntéseinket a kritikus pontokon.',
    author: 'Sarkadi-Nagy András',
    role: 'SALDO Zrt.',
  },
  {
    quote: 'Közös gondolkodással, elhivatott szakemberekkel dolgoztunk együtt.',
    author: 'Amberger Árpád',
    role: 'Globomax Zrt.',
  },
] as const;
