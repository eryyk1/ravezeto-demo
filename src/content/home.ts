/** Homepage content — aligned with Rávezető reference design */

import { euBranding, mentallyImages, themeImage } from '../data/media';

export const homeHero = {
  label: 'Vezetési tanácsadás · 2008 óta',
  headlineLines: ['Változásokat', 'vezetünk,', 'együtt!'] as const,
  intro:
    'Vezetési tanácsadók vagyunk, problémákat oldunk meg, közösen hajlítjuk a teret, alakítjuk az egészségesebb vállalati jövőt.',
  ctaPrimary: 'Írjon nekünk',
  ctaPrimaryLink: '/kapcsolat',
  ctaSecondary: 'Szolgáltatásaink',
  ctaSecondaryLink: '#szolgaltatasok',
  fundingLabel: 'Támogatott projektjeink',
} as const;

export const homeTrustPoints = [
  { label: 'Emberközpontú szemlélet' },
  { label: 'Gyakorlati megoldások' },
  { label: 'Mérhető eredmények' },
] as const;

export const homeQuote = {
  text: 'Az optimizmus az igazi erkölcsi bátorság',
  author: 'Ernest Shackleton',
  context:
    'A fenti idézet az egyik kedvencünk a híres felfedezőtől, aki a lehetetlennel dacolva 120 éve megmentette legénységét a jég és fagy fogságából.',
  teamLine:
    'Munkatársaink jelentős szervezeti és vezetői tapasztalattal rendelkező tanácsadók, szakértők.',
  teamLink: '/rolunk',
  teamCta: 'Ismerje meg a csapatot',
} as const;

export const homeReasons = {
  title: 'Hat ok, amiért minket érdemes választani',
  intro:
    '16 évünk, több mint 400 fejlesztési és képzési projektünk nem jöhetett volna létre, ha nem így dolgozunk.',
  items: [
    {
      emphasis: 'LE',
      rest: 'VEZETJÜK',
      subtitle: 'Önnek, mi a valódi probléma',
      text: 'Megmutatjuk, hogy miért szükséges változtatni, a profi szervezeti diagnózis biztosítja, hogy stabil alapokról induljon a változás.',
    },
    {
      emphasis: 'ÁT',
      rest: 'VEZETJÜK',
      subtitle: 'a nehézségeken',
      text: 'Minőségi szakembereink segítségével a változtatási folyamatban törvényszerű elbizonytalanodás fázisát gyorsan meghaladjuk.',
    },
    {
      emphasis: 'VÉGIG',
      rest: 'VEZETJÜK',
      subtitle: 'ügyfeleinket',
      text: 'A teljes változtatási folyamaton, nem hagyjuk magára a tulajdonosokat, vezetőket, támogatjuk a kritikus döntéseket a projekt minden szakaszában.',
    },
    {
      emphasis: 'RÁ',
      rest: 'VEZETJÜK',
      subtitle: 'a megoldásra',
      text: 'Amely a siker felé viszi, a sablonos „tuti megmondás” helyett közös megoldásokat alkotunk.',
    },
    {
      emphasis: 'KI',
      rest: 'VEZETJÜK',
      subtitle: 'a krízisből',
      text: 'Sokszor a kudarctól való félelem akadályozza meg az újítást. Ha már versenyhátrányban van, ha lemaradt, támogatjuk a kilábalásban.',
    },
    {
      emphasis: 'TOVÁBB',
      rest: 'VEZETJÜK',
      subtitle: 'a fejlődés útján',
      text: 'Minden vállalat esetében előre tekintünk, nemcsak a rövidtávú szempontokat vizsgáljuk, erős csapat nélkül nem működnek sem folyamatok, sem rendszerek.',
    },
  ],
} as const;

export const homeMotto =
  'Ha már nem tekintünk hittel, bátorsággal, bizalommal a jövő felé, akkor cégvezetőként, tulajdonosként hogyan formáljuk tovább a vállalati teret, hogyan alkalmazkodunk a piachoz?';

export const homeAbout = {
  image: themeImage('section1_back.png'),
  overlayLines: ['16+ év', '400+ projekt'],
  label: 'Rólunk',
  headline: 'Gyorsabban, erősebben, magasabbra!',
  text:
    'Az egyéni és szervezeti minőség és teljesítmény növelésében tudunk segíteni, közös gondolkodással, elhivatott szakemberekkel.',
  link: '/rolunk',
  cta: 'Ismerje meg a csapatot',
} as const;

export const homeServicesIntro = {
  kicker: 'Szolgáltatásaink',
  title: 'Emberközpontú megközelítés, minden folyamatban.',
  titleLine2: undefined as string | undefined,
  intro: homeMotto,
} as const;

export const homeServices = [
  {
    title: 'Tanácsadás',
    text: 'Egyetlen szervezetfejlesztés sem lehet sikeres a változást támogató vezetők és munkatársak nélkül. Ezt az emberközpontú megközelítést garantáljuk minden, általunk vezetett tanácsadási folyamatban.',
    link: '/tanacsadas',
    cta: 'Bővebben',
    external: false,
    icon: '/assets/illustrations/illust_inner_strategy.svg',
  },
  {
    title: 'Felnőttképzés',
    text: 'Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi kulcskompetenciáit, vezetőknek, munkatársaknak. Az év trénerei is nálunk dolgoznak 😊',
    link: '/felnottkepzes',
    cta: 'Bővebben',
    external: false,
    icon: '/assets/illustrations/illust_inner_courses.svg',
  },
  {
    title: 'Pályázatok',
    text: 'Fejlesszük közösen vállalatát pályázati forrásokból! A Rávezető minősített szervezetfejlesztő és képzési szolgáltatóként számtalan vállalati kihívásban tud segíteni Önnek.',
    link: '/palyazatok',
    cta: 'Bővebben',
    external: false,
    icon: '/assets/illustrations/illust_projectmanagement.svg',
  },
  {
    title: 'Mentally',
    text: 'Kíváncsi csapata állapotára? A Mentally megmutatja vállalata egészségének térképét!',
    link: 'https://mentally.team',
    cta: 'Bővebben',
    external: true,
    icon: '/assets/illustrations/illust_research.svg',
  },
] as const;

export const homeReferencesIntro = {
  label: 'Referenciák',
  title: 'Partnereink bizalmára büszkék vagyunk.',
} as const;

export const homeReferencesMore = {
  title: 'Tekintse meg teljes referencialistánkat!',
  cta: 'Referenciáink',
  link: '/referenciak',
} as const;

export const homeStatsIntro = {
  kicker: 'A megtett út',
  title: 'Számokban.',
  refsText: 'Büszkék vagyunk partnereink bizalmára!',
  refsLink: '/referenciak',
  refsCta: 'Referenciáink',
} as const;

export const homeStats = [
  { value: 16, suffix: '', label: 'év tanácsadói tapasztalat' },
  { value: 400, suffix: '+', label: 'tanácsadási projekt' },
  { value: 200, suffix: '+', label: 'elégedett, visszatérő ügyfél' },
  { value: 250, suffix: '+', label: 'képzési projekt felnőttképző intézményként' },
  { value: 3500, suffix: '+', label: 'résztvevő a képzéseinken' },
  { value: 200, suffix: '+', label: 'együttműködő tanácsadó' },
] as const;

export const homeContactClose = {
  kicker: 'Kapcsolat',
  title: 'Keressen minket bizalommal!',
  cta: 'Írjon nekünk',
  link: '/kapcsolat',
} as const;

export const homeMentally = {
  brand: 'Mentally',
  headline: 'Kíváncsi csapata állapotára?',
  text: 'A Mentally megmutatja vállalata egészségének térképét!',
  cta: 'Bővebben',
  link: '/mentally',
  productImage: mentallyImages.product,
} as const;

export const homeEuMark = {
  image: euBranding.szechenyiLogo,
  alt: 'Széchenyi 2020 — Európai Unió',
  link: '/palyazatok',
} as const;
