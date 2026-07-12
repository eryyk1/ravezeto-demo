/** Homepage content — non-hero sections from live https://www.ravezeto.hu */

export const homeHero = {
  label: 'Stratégia. Emberek. Változás.',
  headlineLines: ['Változásokat', 'vezetünk,', 'együtt!'] as const,
  intro:
    '16 évünk, több mint 400 fejlesztési és képzési projektünk nem jöhetett volna létre, ha nem így dolgozunk.',
  ctaPrimary: 'Ismerje meg szolgáltatásainkat',
  ctaPrimaryLink: '/tanacsadas',
  ctaSecondary: 'Rólunk',
  ctaSecondaryLink: '/rolunk',
  image: '/assets/images/home/section1_back.png',
  fundingLabel: 'Támogatott projektjeink',
} as const;

export const homeTrustPoints = [
  { label: 'Emberközpontú szemlélet', icon: '/assets/images/home/teamIcon.png' },
  { label: 'Gyakorlati megoldások', icon: '/assets/images/home/chessIcon.png' },
  { label: 'Mérhető eredmények', icon: '/assets/images/home/crownIcon.png' },
] as const;

export const homeQuote = {
  text: 'Az optimizmus az igazi erkölcsi bátorság',
  author: 'Ernest Shackleton',
  context:
    'A fenti idézet az egyik kedvencünk a híres felfedezőtől, aki a lehetetlennel dacolva 120 éve megmentette legénységét a jég és fagy fogságából.',
} as const;

export const homeAbout = {
  label: 'Csapatunk',
  overlayLines: [] as const,
  headline: 'Vezetési tanácsadók vagyunk, problémákat oldunk meg.',
  text: 'Közösen hajlítjuk a teret, alakítjuk az egészségesebb vállalati jövőt.',
  cta: 'Bővebben',
  link: '/rolunk',
  image: '/assets/images/home/section1_back.png',
} as const;

export const homeMotto =
  'Ha már nem tekintünk hittel, bátorsággal, bizalommal a jövő felé, akkor cégvezetőként, tulajdonosként hogyan formáljuk tovább a vállalati teret, hogyan alkalmazkodunk a piachoz?';

export const homeServicesIntro = {
  title: 'Szolgáltatásaink',
  titleLine2: '',
} as const;

export const homeServices = [
  {
    title: 'Tanácsadás',
    text: 'Egyetlen szervezetfejlesztés sem lehet sikeres a változást támogató vezetők és munkatársak nélkül. Ezt az emberközpontú megközelítést garantáljuk minden, általunk vezetett tanácsadási folyamatban.',
    link: '/tanacsadas',
    icon: '/assets/illustrations/illust_strategy.svg',
  },
  {
    title: 'Felnőttképzés',
    text: 'Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi kulcskompetenciáit, vezetőknek, munkatársaknak. Az év trénerei is nálunk dolgoznak 😊',
    link: '/felnottkepzes',
    icon: '/assets/illustrations/illust_courses.svg',
  },
  {
    title: 'Pályázati tanácsadás',
    text: 'Fejlesszük közösen vállalatát pályázati forrásokból! A Rávezető minősített szervezetfejlesztő és képzési szolgáltatóként számtalan vállalati kihívásban tud segíteni Önnek.',
    link: '/palyazatok',
    icon: '/assets/illustrations/illust_projectmanagement.svg',
  },
  {
    title: 'Mentally',
    text: 'Kíváncsi csapata állapotára? A Mentally megmutatja vállalata egészségének térképét!',
    link: '/mentally',
    icon: '/assets/illustrations/illust_empx_0_logo.svg',
  },
] as const;

export const homeReasons = {
  title: 'Hat ok, amiért minket érdemes választani',
  intro:
    '16 évünk, több mint 400 fejlesztési és képzési projektünk nem jöhetett volna létre, ha nem így dolgozunk',
  items: [
    {
      title: 'Levezetjük Önnek, mi a valódi probléma',
      text: 'Megmutatjuk, hogy miért szükséges változtatni, a profi szervezeti diagnózis biztosítja, hogy stabil alapokról induljon a változás.',
    },
    {
      title: 'Átvezetjük a nehézségeken',
      text: 'Minőségi szakembereink segítségével a változtatási folyamatban törvényszerű elbizonytalanodás fázisát gyorsan meghaladjuk.',
    },
    {
      title: 'Végigvezetjük ügyfeleinket',
      text: 'A teljes változtatási folyamaton, nem hagyjuk magára a tulajdonosokat, vezetőket, támogatjuk a kritikus döntéseket a projekt minden szakaszában.',
    },
    {
      title: 'Rávezetjük a megoldásra',
      text: 'Amely a siker felé viszi, a sablonos tuti megmondás helyett közös megoldásokat alkotunk.',
    },
    {
      title: 'Kivezetjük a krízisből',
      text: 'Sokszor a kudarctól való félelem akadályozza meg az újítást. Ha már versenyhátrányban van, ha lemaradt, támogatjuk a kilábalásban.',
    },
    {
      title: 'Továbbvezetjük a fejlődés útján',
      text: 'Minden vállalat esetében előre tekintünk, nemcsak a rövidtávú szempontokat vizsgáljuk, erős csapat nélkül nem működnek sem folyamatok, sem rendszerek.',
    },
  ],
} as const;

export const homePalyazat = {
  label: 'Pályázatok',
  intro:
    'Fejlesszük közösen vállalatát pályázati forrásokból!\n\nA Rávezető minősített szervezetfejlesztő és képzési szolgáltatóként számtalan vállalati kihívásban tud segíteni Önnek.',
  link: '/palyazatok',
  cta: 'Bővebben',
} as const;

export const homeStats = [
  { value: 16, suffix: '', label: 'év tanácsadói tapasztalat' },
  { value: 400, suffix: '+', label: 'tanácsadási projekt' },
  { value: 200, suffix: '+', label: 'elégedett, visszatérő ügyfél' },
  { value: 250, suffix: '+', label: 'képzési projekt felnőttképző intézményként' },
  { value: 3500, suffix: '+', label: 'képzésen résztvevő' },
  { value: 200, suffix: '+', label: 'együttműködő tanácsadó' },
] as const;

export const homeReferencesIntro = {
  label: 'Referenciák',
  title: 'Büszkék vagyunk partnereink bizalmára!',
} as const;

export const homeReferencesMore = {
  title: 'Partnereink és referenciáink',
  cta: 'Bővebben',
  link: '/referenciak',
} as const;

export const homeMentally = {
  brand: 'Mentally',
  headline: 'Kíváncsi csapata állapotára?',
  text: 'A Mentally megmutatja vállalata egészségének térképét!',
  cta: 'Bővebben',
  link: '/mentally',
  image: '/assets/images/mentally.webp',
  productImage: '/assets/images/mentally1_grouped.png',
} as const;

export const homeContact = {
  label: 'Kapcsolat',
  title: 'Keressen minket bizalommal!',
  cta: 'Írjon nekünk',
  link: '/kapcsolat',
} as const;

export const homeEuMark = {
  image: '/assets/images/Szechenyi-2020-logo.png',
  alt: 'Széchenyi 2020 — Európai Unió',
  link: '/palyazatok',
} as const;

export const homeQuoteVisual = {
  ship: '/assets/images/home/paralax_harom_flat_rev.png',
  boat: '/assets/images/home/boatIcon.png',
} as const;
