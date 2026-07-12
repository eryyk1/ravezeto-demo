/** /palyazatok — source: live https://www.ravezeto.hu/palyazatok/ + homepage section3 */

import { euBranding } from '../data/media';

export const palyazatokHero = {
  label: 'Pályázatok',
  title: 'Pályázatok',
  intro:
    'Fejlesszük közösen vállalatát pályázati forrásokból!\n\nA Rávezető minősített szervezetfejlesztő és képzési szolgáltatóként számtalan vállalati kihívásban tud segíteni Önnek.',
} as const;

export const palyazatokConsulting = {
  label: 'Tanácsadási tevékenységeink',
  paragraphs: [
    'Fejlesztésben gondolkodom, projektkeretben? Uniós forrásból?',
    'A munkaszervezetek egyedi fejlesztési céljaikat projektek keretében érik el. A hiányzó, vagy nem elég fejlett szabályozás, a projekt logikától eltérő szervezeti kultúra, a felkészült menedzserek hiánya akadályt képezhet a sikeres megvalósításban.',
    'A „hagyományos” projekt menedzsment módszertanok alkalmazása mellett támogatjuk ügyfeleinket a komplex vagy nem jól definiálható projektek megvalósítását szolgáló iteratív, agilis projektmenedzsment módszerek bevezetésében is. Támogatjuk a szervezetet a felkészülésben, a szabályozás kialakításában, de igény szerint átvállaljuk a részletes tervezési és menedzsment feladatokat is.',
    'Évtizedes tapasztalattal rendelkezünk EU-forrásból (ÁROP, TÁMOP) megvalósuló humánerőforrás- és közigazgatás-fejlesztési projektek, komplex fejlesztési programok tervezésében, menedzsmentjében.',
  ],
} as const;

export const palyazatokProjects = [
  {
    title: 'GINOP Plusz 3.2.1-21',
    subtitle:
      '„A munkavállalók és vállalatok alkalmazkodóképességének és termelékenységének javítása a munkaerő fejlesztésén keresztül”',
    link: 'https://www.ravezeto.hu/ginop-plusz-3-2-1-21/',
  },
] as const;

export const palyazatokEu = {
  image: euBranding.szechenyiBanner,
  alt: 'Széchenyi 2020 — Európai Unió',
  text: 'Támogatott projektjeink az Európai Unió és a Magyar Állam társfinanszírozásával valósultak meg.',
} as const;
