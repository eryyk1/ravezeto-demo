/** /felnottkepzes — source: live https://www.ravezeto.hu/felnottkepzesek/ */

import { themeImage } from '../data/media';

export const felnottkepzesHero = {
  label: 'FELNŐTTKÉPZÉS',
  title:
    'Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi kulcskompetenciáit!',
  intro: 'Az év trénerei is nálunk dolgoznak 😊',
  image: themeImage('section1_back.png'),
  imageAlt: 'Rávezető Projekt — felnőttképzés és kompetenciafejlesztés',
} as const;

export const felnottkepzesKeyMessage = {
  label: 'Felnőttképzés',
  title:
    'A munkatársi kiválóság mellett a szervezeti működés fejlesztésében is segítenek a kompetenciafejlesztő képzések',
  text:
    'Képzési programjaink sosem „dobozos” termékek, változatos oktatás-módszertani megoldásokkal (jelenléti tréningek, e-learning tananyag, online tréning elemek, szervezeti modul, follow up szolgáltatások) biztosítjuk a képzések jobb hasznosulását.',
} as const;

export const felnottkepzesCredentials = {
  paragraphs: [
    'A szervezeti teljesítmény növelése optimálisan több tényező együttes fejlesztésével, több eszköz használatával valósítható meg, amelyek közül az egyik legfontosabb a képzés.',
    'Cégünk felnőttképzési engedéllyel rendelkező intézmény.',
    'Tréneri csapatunk sokéves tereptapasztalata, kiemelkedő szakmai tudása garantálja, hogy közvetlen, felszabadult légkörben zajló tréningjeink a lehető legjobban szolgálják a megfogalmazott képzési célokat.',
  ],
} as const;

export const felnottkepzesReg = {
  registration: 'Nyilvántartásba vételi számunk: B/2020/001943',
  license: 'Engedélyszámunk: E/2021/000106',
} as const;

export const felnottkepzesMotto =
  'A munkahelyek legnagyobb kihívása gyakran a hatékony kommunikáció és a csapatmunka hiánya. Célunk, hogy résztvevőink olyan készségeket sajátítsanak el, amelyek révén sikeresen navigálhatnak a munkahelyi kihívások között.';

export const felnottkepzesCategories = [
  {
    id: 'kommunikacio',
    index: '01',
    title: 'Kommunikációs készségfejlesztés',
    text: 'A világ folyamatosan változik, ahogyan a kommunikációs módszerek is. Részletesen foglalkozunk az aktív hallgatás, az érzelmi intelligencia és a hatékony visszajelzés technikáival, hogy a résztvevők magabiztosan tudják kifejezni gondolataikat és érzéseiket.',
    visual: '/assets/illustrations/illust_inner_courses.svg',
  },
  {
    id: 'vezetoi',
    index: '02',
    title: 'Vezetői skillek fejlesztése',
    text: 'A sikeres vezetés kulcsa a megfelelő eszközök és ismeretek birtoklása. Képzésünk során a résztvevők megismerkednek a különböző vezetési stílusokkal és azok alkalmazásával, valamint a konfliktuskezelési és döntéshozatali technikákkal.',
    visual: '/assets/illustrations/illust_coaching.svg',
  },
  {
    id: 'generaciok',
    index: '03',
    title: 'Generációk közötti együttműködés',
    text: 'Képzésünk segít az eltérő korú munkatársak közötti hatékony kommunikáció, megértés és együttműködés kialakításában. A különböző életkorú munkavállalók más-más munkastílust, technológiai tudást és tapasztalatokat hoznak a munkahelyre, ami kihívásokat jelenthet a mindennapi együttműködés során. Célunk, hogy a különböző generációk közötti szakadékot áthidaljuk, és elősegítsük a kölcsönös tiszteleten alapuló, eredményes munkakapcsolatokat.',
    visual: '/assets/illustrations/illust_inner_hrdevelopment.svg',
  },
  {
    id: 'stressz',
    index: '04',
    title: 'Munkahelyi stressz és stresszkezelési technikák',
    text: 'A munkahelyi stressz napjaink egyik legnagyobb kihívása. A mentális egészség megőrzése érdekében tréningjeinken a résztvevők megismerkednek a stresszforrások azonosításának módszereivel és elsajátítják azokat a gyakorlati technikákat, amelyekkel képesek lesznek tudatosan kezelni a kihívásokat, hogyan őrizhetik meg lelki egyensúlyukat és növelhetik teljesítőképességüket a mindennapi munka során.',
    visual: '/assets/illustrations/illust_stress.svg',
  },
] as const;

export const felnottkepzesProcess = {
  label: 'Folyamat',
  title: 'Hogyan dolgozunk?',
  lead:
    'A fejlesztési és képzési igények meghatározását, illesztését és megvalósítását vállalatra szabva, ügyfeleink igényei és meglévő tudásszintje figyelembevételével végezzük.',
  steps: [
    {
      id: 'igeny',
      step: '01',
      title: 'Igényfeltárás',
      text: 'A fejlesztési és képzési igények meghatározása — ügyfeleink céljai és meglévő tudásszintje alapján.',
    },
    {
      id: 'illesztes',
      step: '02',
      title: 'Illesztés és tervezés',
      text: 'A képzési igények illesztése és megvalósításának tervezése vállalatra szabva.',
    },
    {
      id: 'tananyag',
      step: '03',
      title: 'Tananyagfejlesztés',
      text: 'Ennek szerves része a tananyagfejlesztés is — a vállalat kontextusához igazítva.',
    },
    {
      id: 'megvalositas',
      step: '04',
      title: 'Megvalósítás',
      text: 'Jelenléti tréningek, e-learning tananyag, online tréning elemek és szervezeti modul alkalmazása.',
    },
    {
      id: 'followup',
      step: '05',
      title: 'Follow-up',
      text: 'Follow up szolgáltatások a képzések jobb hasznosulásáért.',
    },
  ],
} as const;

export const felnottkepzesProgrammeGroups = [
  {
    id: 'munkavallaloi',
    index: '01',
    title: 'Munkavállalói kompetenciák fejlesztése',
    items: [
      { title: 'Gazdálkodj az időddel!', hours: '24 óra' },
      { title: 'Időgazdálkodás', hours: '16 óra' },
      { title: 'Kommunikációs és együttműködési készségek fejlesztése', hours: '24 óra' },
      { title: 'Kommunikációs tréning', hours: '24 óra' },
      { title: 'Komplex kommunikációs készségek fejlesztése', hours: '42 óra' },
      { title: 'Konfliktuskezelés', hours: '24 óra' },
      { title: 'Konfliktushelyzetek kezelése', hours: '24 óra' },
      { title: 'Konfliktuskezelés és kommunikáció', hours: '30 óra' },
      { title: 'Sikeres szervezeti együttműködés és kommunikáció a gyakorlatban', hours: '16 óra' },
      { title: 'Szervezeti és generációk közötti együttműködés fejlesztése', hours: '30 óra' },
      { title: 'Üzleti kapcsolattartás és kommunikáció', hours: '16 óra' },
    ],
  },
  {
    id: 'stressz',
    index: '02',
    title: 'Stresszkezelés, mentális egészség fejlesztése',
    items: [
      { title: 'A stressz és én', hours: '16 óra' },
      { title: 'Mentálhigiéné és lelki egészségvédelem', hours: '54 óra' },
    ],
  },
  {
    id: 'vezetoi',
    index: '03',
    title: 'Vezetői kompetenciák fejlesztése',
    items: [
      { title: 'Menedzseri szemlélet a vezetői munkában', hours: '16 óra' },
      { title: 'Tudatosság és társas készségek a vezetésben', hours: '16 óra' },
      { title: 'Tudatosság és társas készségek a vezetésben tréning', hours: '24 óra' },
      { title: 'Tudatosság és társas készségek fejlesztése', hours: '20 óra' },
      { title: 'Vezetői kompetenciák fejlesztése', hours: '16 óra' },
      { title: 'Tudatos vezetői működés fejlesztése', hours: '24 óra' },
    ],
  },
  {
    id: 'mentori',
    index: '04',
    title: 'Mentori kompetenciák fejlesztése',
    items: [{ title: 'Munkahelyi mentorok képzése', hours: '16 óra' }],
  },
] as const;

export const felnottkepzesProgrammeCta = {
  label: 'Kapcsolatfelvétel',
  link: '/kapcsolat',
} as const;

export const felnottkepzesContact = {
  customerService: {
    title: 'Ügyfélszolgálat',
    address: '1146 Budapest, Izsó u. 7. 1/3.',
    hours: 'H-P: 9.00-16.00',
  },
  office: {
    title: 'Irodánk',
    address: '1146 Budapest, Izsó u. 7. 1/3.',
    note: '6. kapucsengő',
    mapUrl:
      'https://www.google.com/maps/search/1146+Budapest,+Izs%C3%B3+u.+7.+1%2F3./@47.5082165,19.0917401,200m/data=!3m1!1e3',
  },
} as const;

export const felnottkepzesCta = {
  title: 'Kérjen ajánlatot képzéseinkre!',
  text: 'Vállalatra szabott kompetenciafejlesztő programokkal segítjük szervezete sikerét.',
  cta: 'Kapcsolat',
  link: '/kapcsolat',
} as const;
