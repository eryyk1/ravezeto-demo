/** Partner & reference logos — source: live https://www.ravezeto.hu/referenciaink/ (2025/02, newest first) */

import { wpUpload } from '../data/media';

export type PartnerLogo = {
  id: number;
  name: string;
  slug: string;
  logo: string;
};

/**
 * Live display order: ref35 → ref1 (Feb 2025 batch first, oldest last).
 * No ref2 on the current website.
 */
export const referenceClientLogos = [
  { slug: 'ref35', name: 'ATEV', logo: wpUpload('2025/02/ATEV_processed.png') },
  { slug: 'ref34', name: 'BGYH', logo: wpUpload('2025/02/BGYH-new.png') },
  { slug: 'ref33', name: 'DKU', logo: wpUpload('2025/02/DKU-new.png') },
  { slug: 'ref32', name: 'KSZK', logo: wpUpload('2025/02/KSZK-1-new.png') },
  { slug: 'ref31', name: 'Lechner', logo: wpUpload('2025/02/Lechner-new.png') },
  { slug: 'ref30', name: 'NFFKU', logo: wpUpload('2025/02/NFFKU-new.png') },
  { slug: 'ref29', name: 'RC Hungaria', logo: wpUpload('2025/02/rc-hungaria-new.png') },
  { slug: 'ref28', name: 'Vajda Papír', logo: wpUpload('2025/02/Vajda_Papir-new.png') },
  { slug: 'ref27', name: 'VKSZ', logo: wpUpload('2025/02/vksz-new.png') },
  { slug: 'ref26', name: 'BauDekor', logo: wpUpload('2025/02/BauDekor-new.png') },
  { slug: 'ref25', name: 'Dyntell', logo: wpUpload('2025/02/Dyntell-new.png') },
  { slug: 'ref24', name: 'Equinox Consulting', logo: wpUpload('2025/02/Equinox-Consulting-Kft-new.png') },
  { slug: 'ref23', name: 'Ex Ante', logo: wpUpload('2025/02/Ex-Ante-Kft-new.png') },
  { slug: 'ref22', name: 'Globomax', logo: wpUpload('2025/02/globomax-new.png') },
  { slug: 'ref21', name: 'HD Direkt', logo: wpUpload('2025/02/HD-Direkt-Hungary-new.png') },
  { slug: 'ref20', name: 'Kemence', logo: wpUpload('2025/02/kemence.png') },
  { slug: 'ref19', name: 'Konigsberg Consulting', logo: wpUpload('2025/02/Konigsberg-Consulting-new.png') },
  { slug: 'ref18', name: 'MNA Group', logo: wpUpload('2025/02/MNA-GROUP-Kft-new.png') },
  { slug: 'ref17', name: 'Profikomp', logo: wpUpload('2025/02/Profikomp-new.png') },
  { slug: 'ref16', name: 'SALDO', logo: wpUpload('2025/02/SALDO-new.png') },
  { slug: 'ref15', name: 'SBT Protect', logo: wpUpload('2025/02/SBT_processed.png') },
  { slug: 'ref14', name: 'Smart Digital', logo: wpUpload('2025/02/Smart_Digital-new.png') },
  { slug: 'ref13', name: 'Zengo', logo: wpUpload('2025/02/Zengo-new.png') },
  { slug: 'ref12', name: 'MOME', logo: wpUpload('2025/02/mome.png') },
  { slug: 'ref11', name: 'Óbudai Egyetem', logo: wpUpload('2025/02/OE-new.png') },
  { slug: 'ref10', name: 'Soproni Egyetem', logo: wpUpload('2025/02/Soproni-Egyetem-new.png') },
  { slug: 'ref9', name: 'Széchenyi István Egyetem', logo: wpUpload('2025/02/sze_logo-new.png') },
  { slug: 'ref8', name: 'SSZC', logo: wpUpload('2025/02/SSZC-new.png') },
  { slug: 'ref7', name: 'Tudományegyetem', logo: wpUpload('2025/02/TE-new.png') },
  { slug: 'ref6', name: 'TSZC', logo: wpUpload('2025/02/tszc-new.png') },
  { slug: 'ref5', name: 'Nyugat-Magyarországi Egyetem', logo: wpUpload('2025/02/univgyor.png') },
  { slug: 'ref4', name: 'MMSZ', logo: wpUpload('2025/02/mmsz-new.png') },
  { slug: 'ref3', name: 'NNGYK', logo: wpUpload('2025/02/NNGYK-new.png') },
  { slug: 'ref1', name: 'OKFO', logo: wpUpload('2025/02/OKFO-new.png') },
] as const;

/** logos CPT — institutional partners (prefer 2025 assets where available) */
export const partnerLogos: PartnerLogo[] = [
  { id: 558, name: 'SBT Protect', slug: 'sbt-protect', logo: wpUpload('2025/02/SBT_processed.png') },
  { id: 520, name: 'Globomax', slug: 'globomax', logo: wpUpload('2025/02/globomax-new.png') },
  { id: 546, name: 'Óbudai Egyetem', slug: 'obudaie', logo: wpUpload('2025/02/OE-new.png') },
  { id: 567, name: 'TSZC', slug: 'tszc', logo: wpUpload('2025/02/tszc-new.png') },
  { id: 564, name: 'Tudományegyetem', slug: 'te', logo: wpUpload('2025/02/TE-new.png') },
  { id: 534, name: 'MMSZ', slug: 'malta', logo: wpUpload('2025/02/mmsz-new.png') },
  { id: 544, name: 'Corvinus', slug: 'corvinus', logo: wpUpload('2021/01/corvinus_nagy2-e1611570746573.jpg') },
  { id: 384, name: 'Deloitte', slug: 'deloite', logo: wpUpload('2018/06/ref_01.png') },
  { id: 552, name: 'Bolko', slug: 'bolko', logo: wpUpload('2021/02/Bolko.jpg') },
  { id: 497, name: 'DJP', slug: 'djp', logo: wpUpload('2019/12/DJP-e1575969875461.jpg') },
  { id: 503, name: 'EJF', slug: 'ejf', logo: wpUpload('2019/12/EJF-e1575970508303.jpg') },
  { id: 525, name: 'HRDirekt', slug: 'hrdirekt', logo: wpUpload('2023/01/hrdirekt-2.png') },
  { id: 528, name: 'IFKA', slug: 'ifka', logo: wpUpload('2021/03/Képkivágás.png') },
  { id: 531, name: 'Kevi', slug: 'kevi', logo: wpUpload('2019/12/Kevi-e1575970885822.jpg') },
  { id: 537, name: 'Matehetsz', slug: 'matehetsz', logo: wpUpload('2021/01/matehetsz-e1611751139435.jpg') },
  { id: 540, name: 'NAV', slug: 'nav', logo: wpUpload('2023/01/nav-2.jpg') },
  { id: 543, name: 'NKFIH', slug: 'nkfih', logo: wpUpload('2023/01/nkfih.jpg') },
  { id: 549, name: 'P2M', slug: 'p2m', logo: wpUpload('2023/01/p2m-1.jpg') },
  { id: 555, name: 'PMKH', slug: 'pmkh', logo: wpUpload('2023/01/PMKH-1.jpg') },
  { id: 561, name: 'Széchenyi', slug: 'szechenyi', logo: wpUpload('2018/06/ref_14.png') },
  { id: 570, name: 'VEMKH', slug: 'vemkh', logo: wpUpload('2023/01/vemkh-1.jpg') },
];
