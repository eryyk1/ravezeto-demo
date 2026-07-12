/**
 * Mentally page content — source: live https://www.ravezeto.hu/mentally/
 * Premium landing; full product experience at https://mentally.team
 */

import { mentallyImages } from '../../data/media';

export const mentallyHero = {
  label: 'Mentally',
  title: 'Egészséges munkatársak\n= versenyképes vállalat!',
  intro: 'Csak egészséges munkavállalók működtethetnek igazán egészséges vállalatot!',
} as const;

export const mentallyWhatIs = {
  eyebrow: 'A Mentally',
  title: 'Tudományos alapokon nyugvó online mérőeszköz',
  description:
    'Azonnali személyes visszajelzést ad minden munkavállalónak saját mentális egészségéről, miközben átfogó képet nyújt a vezetőknek a vállalat állapotáról — támogatva az egyéni fejlődést és a vezetői döntéseket.',
  brandImage: mentallyImages.brand,
  productImage: mentallyImages.product,
} as const;

export const mentallyBenefits = {
  eyebrow: 'Előnyök',
  title: 'Mentális védernyő a munkahelyen',
  items: [
    {
      id: 'feedback',
      title: 'Azonnali visszajelzés',
      text: 'Minden munkavállaló saját mentális egészségéről kap személyes visszajelzést.',
    },
    {
      id: 'overview',
      title: 'Vezetői áttekintés',
      text: 'Átfogó képet nyújt a vezetőknek a vállalat állapotáról.',
    },
    {
      id: 'decisions',
      title: 'Támogatott döntések',
      text: 'Segíti az egyéni fejlődést és a vezetői döntéseket.',
    },
  ],
  comparison: {
    beforeLabel: 'Ha baj van…',
    beforeImage: mentallyImages.before,
    afterLabel: 'Miután beavatkoztunk…',
    afterImage: mentallyImages.after,
  },
} as const;

export const mentallyCta = {
  title: 'Ismerje meg a Mentally-t',
  lead: 'Kíváncsi csapata állapotára? A Mentally megmutatja vállalata egészségének térképét!',
  button: 'Megnyitás',
  url: 'https://mentally.team',
} as const;
