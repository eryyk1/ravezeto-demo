/** /palyazatok — grants page content */

import { euBranding } from '../data/media';

export const palyazatokHero = {
  label: 'Pályázatok',
  title: 'Pályázatok',
  intro: '',
} as const;

export const palyazatokNoOpenGrants =
  'Jelenleg nincs olyan nyitott pályázati lehetőség, amelyben együtt tudnánk működni. Amennyiben új lehetőség nyílik, ezen az oldalon tájékoztatjuk partnereinket.';

export const palyazatokConsulting = {
  label: 'Tanácsadási tevékenységeink',
  title: 'Nemzetközi és uniós projektek',
  paragraphs: [
    'Fejlesztésben gondolkodom, projektkeretben? Uniós forrásból?',
    'A munkaszervezetek egyedi fejlesztési céljaikat projektek keretében érik el. A hiányzó, vagy nem elég fejlett szabályozás, a projekt logikától eltérő szervezeti kultúra, a felkészült menedzserek hiánya akadályt képezhet a sikeres megvalósításban.',
    'A „hagyományos” projekt menedzsment módszertanok alkalmazása mellett támogatjuk ügyfeleinket a komplex vagy nem jól definiálható projektek megvalósítását szolgáló iteratív, agilis projektmenedzsment módszerek bevezetésében is. Támogatjuk a szervezetet a felkészülésben, a szabályozás kialakításában, de igény szerint átvállaljuk a részletes tervezési és menedzsment feladatokat is.',
    'Évtizedes tapasztalattal rendelkezünk EU-forrásból (ÁROP, TÁMOP) megvalósuló humánerőforrás- és közigazgatás-fejlesztési projektek, komplex fejlesztési programok tervezésében, menedzsmentjében.',
  ],
} as const;

export const palyazatokEu = {
  image: euBranding.szechenyiBanner,
  alt: 'Széchenyi 2020 — Európai Unió',
  text: 'Támogatott projektjeink az Európai Unió és a Magyar Állam társfinanszírozásával valósultak meg.',
} as const;
