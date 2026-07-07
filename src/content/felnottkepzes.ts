/** /felnottkepzes — backup: template-felnottkepzes.php + services CPT felnottkepzes */

export const felnottkepzesHero = {
  label: 'Felnőttképzés',
  title: 'Minőségi képzések\na XXI. századra',
  intro:
    'Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi kulcskompetenciáit, vezetőknek, munkatársaknak. Az év trénerei is nálunk dolgoznak.',
} as const;

export const felnottkepzesReg = {
  registration: 'Nyilvántartásba vételi számunk: B/2020/001943',
  license: 'Engedélyszámunk: E/2021/000106',
  legacy: 'Felnőttképzési nyilvántartási számunk: E-000362/2014',
} as const;

export const felnottkepzesIntro =
  'Cégünk felnőttképzési engedéllyel rendelkező intézmény. A fejlesztési és képzési igények meghatározását, illesztését és megvalósítását szervezetre, illetve személyre szabva, ügyfeleink valós igényei és meglévő tudásszintje figyelembevételével végezzük.';

export const felnottkepzesCategories = [
  {
    title: 'Kommunikációs készségfejlesztés',
    text: 'Komplex kommunikációs készségek fejlesztése, együttműködés és konfliktuskezelés.',
    illustration: '/assets/illustrations/illust_inner_courses.svg',
  },
  {
    title: 'Vezetői skillek fejlesztése',
    text: 'Tudatos vezetői működés, döntéshozatal és csapatirányítás fejlesztése.',
    illustration: '/assets/illustrations/illust_coaching.svg',
  },
  {
    title: 'Generációk közötti együttműködés',
    text: 'Különböző generációk hatékony együttműködése a szervezeten belül.',
    illustration: '/assets/illustrations/illust_inner_personal.svg',
  },
  {
    title: 'Munkahelyi stressz és stresszkezelés',
    text: 'Stresszkezelési technikák, mentálhigiéné és lelki egészségvédelem.',
    illustration: '/assets/illustrations/illust_stress.svg',
  },
] as const;

export const felnottkepzesProgrammes = [
  { title: 'Gazdálkodj az időddel!', hours: '24 óra' },
  { title: 'Komplex kommunikációs készségek fejlesztése', hours: '42 óra' },
  { title: 'Mentálhigiéné és lelki egészségvédelem', hours: '54 óra' },
  { title: 'Tudatos vezetői működés fejlesztése', hours: '24 óra' },
  { title: 'Munkahelyi mentorok képzése', hours: '16 óra' },
  { title: 'Projektmenedzsment alapok', hours: '32 óra' },
  { title: 'Változásmenedzsment tréning', hours: '16 óra' },
  { title: 'Együttműködés és csapatmunka fejlesztése', hours: '24 óra' },
] as const;
