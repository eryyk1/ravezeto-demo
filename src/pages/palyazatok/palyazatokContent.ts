/**
 * Grants page content — source: live https://www.ravezeto.hu/palyazatok/
 * International projects: references CPT „Nemzetközi projektek” (live site content)
 */

export const palyazatokHero = {
  label: 'Pályázatok',
  title: 'Pályázatok',
} as const;

export const palyazatokStatusMessage =
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

export const palyazatokInternational = {
  label: 'Nemzetközi projektek',
  title: 'Nemzetközi projektek',
  visual: '/assets/illustrations/illust_inner_international.svg',
  projects: [
    {
      id: 'ess-georgia',
      title: 'ESS Grúzia',
      period: '2015–2016',
      description:
        'Eastern Partnership Integration and Cooperation (EaPIC) 2013, GE/20 Capacity Building of the Employment Support Services (ESS) in Georgia (2015-2016)',
    },
    {
      id: 'croatia-admin',
      title: 'Horvát Közigazgatási Minisztérium (Ministarstvo Uprave)',
      period: '2014',
      activities: [
        '„Modernising Public Administration with EU Structural and Investment Funds” – Workshop (2014)',
        'Turning strategies into practice: European Structural and Investment Funds project management – practical experience on project implementation – Workshop (2014)',
      ],
    },
    {
      id: 'croatia-justice',
      title: 'Horvát Igazságügyi Minisztérium (Ministarstvo Pravosuda)',
      period: '2014',
      description:
        '„Planning European Structural and Investment Funds key projects in the field of justice” – Workshop (2014)',
    },
  ],
} as const;
