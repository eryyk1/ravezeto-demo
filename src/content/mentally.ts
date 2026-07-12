/** /mentally — premium landing, external product at mentally.team */

import { mentallyImages } from '../data/media';

export const mentallyHero = {
  label: 'Mentally',
  title: 'Egészséges munkatársak\n= versenyképes vállalat!',
  intro: 'Csak egészséges munkavállalók működtethetnek igazán egészséges vállalatot!',
} as const;

export const mentallyLanding = {
  eyebrow: 'A Mentally',
  title: 'Tudományos alapokon nyugvó online mérőeszköz',
  description:
    'Azonnali személyes visszajelzést ad minden munkavállalónak saját mentális egészségéről, miközben átfogó képet nyújt a vezetőknek a vállalat állapotáról — támogatva az egyéni fejlődést és a vezetői döntéseket.',
  image: mentallyImages.brand,
  cta: 'Megnyitás',
  ctaUrl: 'https://mentally.team',
} as const;
