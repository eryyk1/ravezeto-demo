/** Homepage content — backup wording + reference mockup structure */

export const homeHero = {
  label: 'Stratégia. Emberek. Változás.',
  headlineLines: ['Változásokat', 'vezetünk,', 'együtt!'] as const,
  intro:
    '16 évünk, több mint 400 fejlesztési és képzési projektünk nem jöhetett volna létre, ha nem így dolgozunk.',
  ctaPrimary: 'Ismerje meg szolgáltatásainkat',
  ctaPrimaryLink: '/tanacsadas',
  ctaSecondary: 'Rólunk',
  ctaSecondaryLink: '/rolunk',
  image: '/assets/images/section1_back.png',
  fundingLabel: 'Támogatott projektjeink',
} as const;

export const homeTrustPoints = [
  { label: 'Emberközpontú szemlélet', icon: '/assets/images/teamIcon.png' },
  { label: 'Gyakorlati megoldások', icon: '/assets/images/chessIcon.png' },
  { label: 'Mérhető eredmények', icon: '/assets/images/crownIcon.png' },
] as const;

export const homeQuote = {
  text: 'Az optimizmus az igazi erkölcsi bátorság',
  author: 'Ernest Shackleton',
  context:
    'A fenti idézet az egyik kedvencünk a híres felfedezőtől, aki a lehetetlennel dacolva 120 éve megmentette legénységét a jég és fagy fogságából.',
} as const;

export const homeAbout = {
  label: 'Rólunk',
  overlayLines: ['Emberek.', 'Kapcsolatok.', 'Fejlődés.'] as const,
  headline:
    'Hisszük, hogy a tartós siker kulcsa az emberekben és a kapcsolatokban rejlik.',
  text: 'Elhivatott szakembereinkkel és közös gondolkodással ebben tudunk nekik segíteni. Vezetési tanácsadók vagyunk, problémákat oldunk meg, közösen hajlítjuk a teret, alakítjuk az egészségesebb vállalati jövőt.',
  cta: 'Ismerje meg csapatunkat',
  link: '/rolunk',
  image: '/assets/images/section1_back.png',
} as const;

export const homeServicesIntro = {
  title: 'Komplex megoldások',
  titleLine2: 'szervezeteknek és embereknek',
} as const;

export const homeServices = [
  {
    title: 'Szervezetfejlesztés',
    text: 'A megvalósítható stratégia kialakításától a cselekvésig támogatjuk ügyfeleinket.',
    link: '/tanacsadas/szervezetfejlesztes',
    icon: '/assets/illustrations/illust_strategy.svg',
  },
  {
    title: 'HR tanácsadás',
    text: 'Humán szervezeti igények felmérésével és fejlesztési stratégia megalkotásával támogatjuk a működést.',
    link: '/tanacsadas/hr-fejlesztes',
    icon: '/assets/illustrations/illust_hrdevelopment.svg',
  },
  {
    title: 'Vezetőfejlesztés',
    text: 'Szakembereink egyéni megközelítésükkel támogatják a vezetői munkavégzést és a kritikus döntéseket.',
    link: '/tanacsadas/vezetofejlesztes',
    icon: '/assets/illustrations/illust_coaching.svg',
  },
  {
    title: 'Képzések',
    text: 'Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi kulcskompetenciáit.',
    link: '/felnottkepzes',
    icon: '/assets/illustrations/illust_courses.svg',
  },
  {
    title: 'Pályázati tanácsadás',
    text: 'Fejlesszük közösen vállalatát pályázati forrásokból minősített szolgáltatóként.',
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

export const homeStats = [
  { value: 16, suffix: '', label: 'év tanácsadói tapasztalat' },
  { value: 400, suffix: '+', label: 'tanácsadási projekt' },
  { value: 200, suffix: '+', label: 'elégedett, visszatérő ügyfél' },
  { value: 3500, suffix: '+', label: 'képzésen résztvevő' },
  { value: 200, suffix: '+', label: 'együttműködő tanácsadó' },
] as const;

export const homeReferencesIntro = {
  label: 'Referenciák',
  title: 'Együttműködések, amelyekre büszkék vagyunk',
} as const;

export const homeReferenceCards = [
  {
    category: 'Gazdasági társaságok',
    excerpt: 'Deloitte — munkaerőpiaci helyzet komplex vizsgálata és foglalkoztatási stratégia.',
    image: '/assets/images/hero/section0_back.png',
    link: '/referenciak',
  },
  {
    category: 'Közigazgatási intézmények',
    excerpt: 'Miniszterelnökség — kiemelt projektek vizsgálata és stratégiai tanácsadás.',
    image: '/assets/images/section1_back.png',
    link: '/referenciak',
  },
  {
    category: 'Felsőoktatási intézmények',
    excerpt: 'Egyetemi partnerségek — kompetenciafejlesztő képzések és projektmenedzsment.',
    image: '/assets/images/references/corvinus.jpg',
    link: '/referenciak',
  },
  {
    category: 'Önkormányzatok',
    excerpt: 'Önkormányzati szervezetfejlesztés és területi együttműködési programok.',
    image: '/assets/images/kapcsolat_hatter1.png',
    link: '/referenciak',
  },
] as const;

export const homeReferencesMore = {
  title: 'További esettanulmányok és referenciák',
  cta: 'Megnézem',
  link: '/referenciak',
} as const;

export const homeMentally = {
  brand: 'Mentally',
  headline: 'Digitális támogatás a mentális egészségért és a fejlődésért.',
  text: 'A Mentally egy tudományos alapokon nyugvó online mérőeszköz, amely azonnali személyes visszajelzést ad minden munkavállalónak, miközben átfogó képet nyújt a vezetőknek a vállalat állapotáról.',
  cta: 'Felfedezem',
  link: '/mentally',
  image: '/assets/images/mentally.webp',
  productImage: '/assets/images/mentally1_grouped.png',
} as const;

export const homeEuMark = {
  image: '/assets/images/szechenyi-2020-full.png',
  alt: 'Széchenyi 2020 — Európai Unió',
  link: '/palyazatok',
} as const;

export const homeQuoteVisual = {
  ship: '/assets/images/paralax_harom_flat_rev.png',
  boat: '/assets/images/boatIcon.png',
} as const;
