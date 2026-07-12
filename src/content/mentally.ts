/** /mentally — source: live https://www.ravezeto.hu/mentally/ */

import { mentallyImages } from '../data/media';

export const mentallyHero = {
  label: 'Mentally',
  title: 'Egészséges munkatársak\n= versenyképes vállalat!',
  intro: 'Csak egészséges munkavállalók működtethetnek igazán egészséges vállalatot!',
} as const;

export const mentallyProduct = {
  title: 'A MENTALLY',
  paragraphs: [
    'egy tudományos alapokon nyugvó online mérőeszköz, amely azonnali személyes visszajelzést ad minden munkavállalónak saját mentális egészségéről, miközben átfogó képet nyújt a vezetőknek a vállalat állapotáról, így támogatva mind az egyéni fejlődést, mind a vezetői döntéseket.',
  ],
} as const;

export const mentallyThoughtsIntro = 'Az Ön fejében is elhangzottak már ezek a gondolatok?';

export const mentallyThoughts = [
  'Senki nem vállalja a felelősséget a hibákért…',
  'Már megint felmondott egy kulcsemberünk…',
  'Miért nem tudunk profitálni a túlórákból?',
  'Hiába emeltünk fizetést, még mindig magas a fluktuáció…',
  'Valamit nagyon rosszul csinálunk, de nem tudom, hogy mit…',
  'A ma reggeli meetingen már senki sem szólalt meg...',
] as const;

export const mentallySections = [
  {
    label: 'HA BAJ VAN...',
    title: 'Mentális védernyőnk a munkahelyen',
    image: mentallyImages.before,
  },
  {
    label: 'MIUTÁN BEAVATKOZTUNK...',
    title: '',
    image: mentallyImages.after,
  },
] as const;

export const mentallyProductImage = mentallyImages.product;

export const mentallyCta = {
  title: 'Tegyen csapata mentális egészségéért!',
  text: 'Kérjen személyes konzultációt tanácsadóinktól.',
  cta: 'Kapcsolatfelvétel',
  link: '/kapcsolat',
} as const;
