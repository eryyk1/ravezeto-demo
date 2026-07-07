/** /palyazatok — backup: tenders CPT + GINOP references + home intro */

import siteContent from '../data/siteContent.json';
import { euBranding } from '../data/media';

export const palyazatokHero = {
  label: 'Pályázatok',
  title: 'Fejlesszük közösen\nvállalatát',
  intro: siteContent.home.palyazatIntro,
} as const;

export const palyazatokIntro =
  'Évtizedes tapasztalattal rendelkezünk EU-forrásból megvalósuló humánerőforrás- és közigazgatás-fejlesztési projektek, komplex fejlesztési programok tervezésében és menedzsmentjében. Minősített szervezetfejlesztő és képzési szolgáltatóként támogatjuk partnereinket a pályázati folyamat minden szakaszában.';

export const palyazatokServices = [
  'Pályázati előkészítés és tanácsadás',
  'Projektervezés és megvalósíthatósági tanulmány',
  'Projektmenedzsment és végrehajtás támogatása',
  'Szervezetfejlesztés és képzés EU-forrásból',
  'Monitoring és szakmai riportálás',
] as const;

export const palyazatokProjects = [
  {
    title: 'GINOP Plusz 3.2.1-21',
    subtitle:
      'A munkavállalók és vállalatok alkalmazkodóképességének és termelékenységének javítása a munkaerő fejlesztésén keresztül',
    text: 'Humán fejlesztési és képzési projektek támogatása uniós forrásból.',
  },
  {
    title: 'GINOP 5.3.1 — Rugalmas foglalkoztatás',
    subtitle: 'GINOP-5.3.1-14-2015-00051',
    text: 'A Nemzetgazdasági Minisztérium 2014 őszén pályázatot írt ki a rugalmas foglalkoztatás elterjesztése céljából a kis- és középvállalkozások körében. Konzorciumi partnerként — Corex Projektfejlesztési Kft. és Learning Innovation Kft. mellett — komplett átvilágítást biztosítottunk a résztvevő vállalkozások számára. Projekt azonosító: GINOP-5.3.1-14-2015-00051. Támogatás: 309 228 700 Ft.',
  },
] as const;

export const palyazatokEu = {
  image: euBranding.szechenyiBanner,
  alt: 'Széchenyi 2020 — Európai Unió',
  text: 'Támogatott projektjeink az Európai Unió és a Magyar Állam társfinanszírozásával valósultak meg.',
} as const;

export const palyazatokProcess = [
  { step: '01', title: 'Előkészítés', text: 'Igényfelmérés, forrás azonosítás, megvalósíthatóság.' },
  { step: '02', title: 'Tervezés', text: 'Pályázati dokumentáció, projektterv, költségvetés.' },
  { step: '03', title: 'Megvalósítás', text: 'Projektmenedzsment, képzés, szervezetfejlesztés.' },
  { step: '04', title: 'Zárás', text: 'Monitoring, szakmai riportálás, fenntarthatóság.' },
] as const;
