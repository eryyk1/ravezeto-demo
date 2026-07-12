/** /rolunk — source: live https://www.ravezeto.hu/csapatunk/ + homepage stats */

import { company } from './company';
import { homeAbout } from './home';
import { felnottkepzesReg } from './felnottkepzes';
import { homeStats } from './home';
import { themeImage, rolunkImages } from '../data/media';
import { teamMembers } from './team';

export const rolunkHero = {
  label: 'RÓLUNK',
  title: 'Gyorsabban, erősebben, magasabbra!',
  intro:
    'Az egyéni és szervezeti minőség és teljesítmény növelésében tudunk segíteni, közös gondolkodással, elhivatott szakemberekkel.',
  image: themeImage('section1_back.png'),
  imageAlt: 'Rávezető Projekt csapat és munkakörnyezet',
} as const;

export const rolunkStory = {
  label: 'Történetünk',
  title: 'Citius, Altius, Fortius.',
  pullQuote: 'Minden munkaszervezet állandó mozgásban, változásban éli mindennapjait.',
  paragraphs: [
    'A vállalatok életében megjelenő kihívások a sport nyelvén is leírhatók, mert tervezés, felkészülés és kitartás nélkül nincs siker, a teljesítmény mérhető, az eredmény pedig igazolja a szervezet létét, erejét, befolyását.',
  ],
  image: teamMembers[0].portrait,
  imageAlt: 'Ríz Ádám CMC — Rávezető Projekt',
  motto: 'Citius, Altius, Fortius.',
} as const;

export const rolunkValues = {
  label: 'Értékeink',
  title: 'ÉRTÉKEINK',
  image: rolunkImages.values,
} as const;

/** Verified milestones only — dated entries from live public pages; undated stats marked „Ma” */
export const rolunkTimeline = {
  label: 'Mérföldkövek',
  title: 'Úton a változások felé',
  lead: '16 évünk, több mint 400 fejlesztési és képzési projektünk nem jöhetett volna létre, ha nem így dolgozunk.',
  items: [
    {
      year: '2020',
      title: 'Felnőttképzési intézmény',
      text: `Nyilvántartásba vétel: ${felnottkepzesReg.registration.replace('Nyilvántartásba vételi számunk: ', '')}`,
    },
    {
      year: '2021',
      title: 'Felnőttképzési engedély',
      text: `Engedélyszám: ${felnottkepzesReg.license.replace('Engedélyszámunk: ', '')}`,
    },
    {
      year: 'Ma',
      title: `${homeStats[0].value} ${homeStats[0].label}`,
      text: `Több mint ${homeStats[1].value}${homeStats[1].suffix} ${homeStats[1].label} — ${company.name}`,
    },
    {
      year: 'Ma',
      title: `${homeStats[3].value}${homeStats[3].suffix} ${homeStats[3].label}`,
      text: `Több mint ${homeStats[4].value}${homeStats[4].suffix} ${homeStats[4].label} a programjainkon.`,
    },
  ],
} as const;

export const rolunkTeam = {
  label: 'Csapatunk',
  title: 'Munkatársaink',
  members: teamMembers,
} as const;

export const rolunkTestimonials = [
  {
    quote:
      'Szívesen dolgozom a Rávezető csapatával, mert Mariann és Andi is mindig segítőkész és előre megnyugodhatok, hogy bármilyen képzést is tartanak nekünk, profi trénert küldenek és a kapcsolódó pályázati adminisztráció oldala is pontos és naprakész. Kedves Ádám, Andi és Mariann! Külön örülök, hogy igazi partnerként tekinthetek rátok és segítetek a mi igényeinkre is tényleges megoldást adni. Köszönjük az eddigi együttműködést és remélem, hogy még sok közös eredményes projektben lesz részünk!',
    author: 'Horváth Botond',
    role: 'operatív vezető, Smart Digital Kft.',
  },
  {
    quote:
      'A GINOP Plusz-3.2.1 pályázat kapcsán kerültünk kapcsolatba a Rávezető Kft. szakértőivel, akik végigkísértek bennünket a pályázat benyújtásától a képzések lebonyolításán át egészen a projekt elszámolásáig. Rugalmasságuk, precizitásuk és segítőkész hozzáállásuk nagyban megkönnyítette az együttműködést, és segítettek eligazodni a túlszabályozott, bürokratikus előírások között. Profi, jól összehangolt csapat, akikkel öröm volt együtt dolgozni.',
    author: 'Sarkadi-Nagy András',
    role: 'vezérigazgató, SALDO Pénzügyi Tanácsadó és Informatikai Zrt.',
  },
  {
    quote:
      'A Rávezető Kft.-vel két szervezetfejlesztési projekten dolgoztunk. 2021 elején új fejlődési pályára akartuk állítani a 25 éve működő cégünket. Ehhez konszenzuson alapuló jövőképre, közös alapértékek meghatározására, és lényeges szervezeti változásokra is szükség volt. Egy féléves projekttel az ehhez szükséges alapokat le tudtuk rakni. Így utólag visszatekintve látszik, hogy az ötéves középtávú terv keretében az árbevételünket meg tudtuk duplázni, és stabil fejlődési pályára állítottuk a céget.',
    author: 'Amberger Árpád',
    role: 'vezérigazgató, Globomax Zrt.',
  },
  {
    quote:
      'A Széchenyi István Egyetem stratégiai céljainak megvalósítását támogató programban a Rávezető Projekt Kft. hatékony segítséget nyújtott, melyet ezúton is köszönünk! Ádám és Kollégái nagy hangsúlyt fektettek a fejlesztési és képzési igényeink megismerésére, ezáltal az intézményünkre tervezett, egyéni program valósulhatott meg. Kollégáink és vezető társaink visszajelzései alapján a program elérte célját, nem csak szakmailag értékes, de élményekben is gazdag napokat töltöttünk együtt. Ádámék professzionalizmusa, szakmai felkészültsége meggyőző, emberi hozzáállásukkal olyan érzésünk volt, mintha már régóta közeli kollégák lennénk, kiváló együttműködéssel, egymást inspirálva. Egészen biztos vagyok, hogy fogunk még együtt dolgozni új, az Egyetemünk és Kollégáink fejlődését szolgáló programok megvalósításán :)!',
    author: 'Váginé Varga Zsuzsa',
    role: 'igazgató, Humánerőforrás Igazgatóság, SZE',
  },
  {
    quote:
      'A Rávezető Projekt Kft. szakértőivel 2019-2020 között a szervezeti kultúrafejlesztési program során dolgoztam együtt, ami a közös érték, kultúra, szemléletváltás megújulását alapozta meg a területi közigazgatás szervezetrendszerében. A Rávezető Projekt Kft. igényes és alapos munkával feltárta a szervezet célját, törekvését, szervezeti kultúra képességét és hatékonyságát, ehhez az állapothoz igazította a közös érték, kultúra, szemléletváltás megújulását célzó fejlesztési programokat. Szakértői magas szakmai színvonalon dolgoztak, külön figyelmet fordítottak a szervezeti kultúrafejlesztés aktuális trendjeire, változatos andragógiai-didaktikai és fejlesztési megoldásokra. Általuk eredményesen megvalósult több ezer, különböző szakterületen munkát végző munkatárs fejlesztése a szervezeti változások aktív támogatása céljából.',
    author: 'Arany Mónika',
    role: 'főosztályvezető (2019-2020)',
  },
] as const;

export const rolunkClosing =
  'Munkatársaink jelentős szervezeti és vezetői tapasztalattal rendelkező tanácsadók, szakértők. Szeretjük a projekteket és belső meggyőződésünk a munkáink által saját magunk fejlesztése is.';

export const rolunkCta = {
  title: company.tagline,
  text: homeAbout.text,
  cta: 'Kapcsolat',
  link: '/kapcsolat',
} as const;
