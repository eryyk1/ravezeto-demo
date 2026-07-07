import { partnerLogos, referenceClientLogos } from './partners';

/** /referenciak — backup: references CPT + referenciaink-2 page */

export const referenciakHero = {
  label: 'Referenciák',
  title: 'Büszkék vagyunk\npartnereink bizalmára',
  intro:
    'Cégünk teljesítményének értékét ügyfeleink véleménye, elégedettsége határozza meg. Együttműködéseinkre büszkék vagyunk.',
} as const;

export const referenciakCategories = [
  {
    id: 'gazdasagi',
    title: 'Gazdasági társaságok',
    illustration: '/assets/illustrations/illust_inner_references_economic.svg',
    cases: [
      {
        client: 'Deloitte Üzletviteli és Vezetési Tanácsadó Zrt.',
        year: '2017',
        text: 'Szakértői tevékenység Debrecen Város munkaerőpiaci helyzetének komplex vizsgálata és a kapcsolódó foglalkoztatási stratégia valamint akcióterv elkészítésében.',
      },
      {
        client: 'KOPINT-DATORG Kft.',
        year: '2016',
        text: 'Szakértői tevékenység a KÖFOP-1.2.1 sz. „Ügyfélkapcsolati rendszerek fejlesztése” megnevezésű projekthez kapcsolódóan.',
      },
      {
        client: 'Rail Cargo Hungaria Árufuvarozási Zrt.',
        year: '2014',
        text: '„GREEN INTERMODAL FREIGHT TRANSPORT CLUSTER OPERATION” feladatok ellátásához szakértői támogatás.',
      },
    ],
  },
  {
    id: 'kozigazgatas',
    title: 'Központi közigazgatási intézmények',
    illustration: '/assets/illustrations/illust_inner_references_government.svg',
    cases: [
      {
        client: 'Miniszterelnökség',
        year: '2015',
        text: 'A programozási időszakok kiemelt/kiemelt eljárásrendű projektjeinek vizsgálata.',
      },
      {
        client: 'Nemzeti Fogyasztóvédelmi Hatóság',
        year: '2014–2015',
        text: 'A fogyasztóvédelmi intézményrendszer szervezeti működésének fejlesztése című kiemelt projekt előkészítési feladatainak ellátása.',
      },
      {
        client: 'Belügyminisztérium',
        year: '2015',
        text: 'ÁROP-2.2.23 projekt keretében kompetenciafejlesztő tréningek megtartása, forgatókönyvek és tematikák összeállítása.',
      },
    ],
  },
  {
    id: 'felsooktatas',
    title: 'Felsőoktatási intézmények',
    illustration: '/assets/illustrations/illust_inner_references_highereducation.svg',
    cases: [
      {
        client: 'Széchenyi István Egyetem',
        year: '2015',
        text: 'TÁMOP projektek keretében minőségi kritériumok meghatározása, kutatásmenedzsmenti szervezetfejlesztés.',
      },
      {
        client: 'Nemzeti Közszolgálati Egyetem',
        year: '2014–2016',
        text: 'Projektmenedzsment tanácsadás és megvalósíthatósági tanulmányok elkészítése.',
      },
      {
        client: 'Miskolci Egyetem',
        year: '2015',
        text: 'Hallgatói szolgáltatás minőségbiztosítás és validáció. Képzési programok validálása.',
      },
    ],
  },
  {
    id: 'onkormanyzatok',
    title: 'Önkormányzatok',
    illustration: '/assets/illustrations/illust_inner_municipalities.svg',
    cases: [
      {
        client: 'Veszprém Megyei Jogú Város Önkormányzata',
        year: '2015',
        text: 'ÁROP projekt keretében tréning megtartása, esélyegyenlőségi kerekasztal lebonyolítása, horizontális szempontok érvényesítése.',
      },
      {
        client: 'Derecske Város Önkormányzata',
        year: '2015',
        text: 'ÁROP projekthez kapcsolódó koordinációs, szervezési és lebonyolítási feladatok ellátása.',
      },
      {
        client: 'Bicske Város Önkormányzata',
        year: '2015',
        text: '„Területi együttműködést segítő programok kialakítása Bicske Járásban” című projekt megvalósításában való közreműködés.',
      },
    ],
  },
  {
    id: 'nemzetkozi',
    title: 'Nemzetközi projektek',
    illustration: '/assets/illustrations/illust_inner_international.svg',
    cases: [
      {
        client: 'ESS Grúzia',
        year: '2015–2016',
        text: 'Eastern Partnership Integration and Cooperation — Capacity Building of the Employment Support Services in Georgia.',
      },
      {
        client: 'Horvát Közigazgatási Minisztérium',
        year: '2014',
        text: '„Modernising Public Administration with EU Structural and Investment Funds” — Workshop.',
      },
    ],
  },
] as const;

export const referenciakPartners = [...partnerLogos];

export const referenciakClientLogos = referenceClientLogos;
