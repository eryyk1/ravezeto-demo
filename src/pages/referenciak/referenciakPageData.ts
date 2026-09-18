/**
 * Logo flow + partner list — structure from final-referenciak.html (source of truth).
 * Image paths use extracted assets under public/assets/images/referenciak/.
 */
import { pageImage } from '../../data/media';

export type ReferenciakLogoCell = {
  slug: string;
  name: string;
  logo: string;
};

const img = (file: string) => pageImage('referenciak', file);

/** First marquee row (forward animation) */
export const REFERENCIAK_LOGO_TRACK_A: ReferenciakLogoCell[] = [
  { slug: 'atev', name: 'ATEV Fehérjefeldolgozó Zrt.', logo: img('img-02.png') },
  { slug: 'baudekor', name: 'BauDekor Kft.', logo: img('img-03.jpg') },
  { slug: 'bgyh', name: 'Budapest Gyógyfürdői és Hévizei Zrt.', logo: img('img-04.png') },
  { slug: 'dku', name: 'Digitális Kormányzati Ügynökség Zrt.', logo: img('img-05.png') },
  { slug: 'dyntell', name: 'Dyntell Kft.', logo: img('img-06.png') },
  { slug: 'egis', name: 'Egis Gyógyszergyár Zrt.', logo: img('img-07.jpg') },
  { slug: 'equinox', name: 'Equinox Consulting Kft.', logo: img('img-08.jpg') },
  { slug: 'ex-ante', name: 'Ex Ante Kft.', logo: img('img-09.png') },
  { slug: 'globomax', name: 'Globomax Zrt.', logo: img('img-10.png') },
  { slug: 'hd-direkt', name: 'HD Direkt Hungary Kft.', logo: img('img-11.jpg') },
  { slug: 'kemence', name: 'Kemence Pékség', logo: img('img-12.jpg') },
  { slug: 'konigsberg', name: 'Königsberg Consulting Kft.', logo: img('img-13.png') },
  { slug: 'kszk', name: 'Kormányzati Szolgáltató Központ Nonprofit Kft.', logo: img('img-14.png') },
  { slug: 'lechner', name: 'Lechner Tudásközpont', logo: img('img-15.png') },
  { slug: 'mmsz', name: 'Magyar Máltai Szeretetszolgálat', logo: img('img-16.jpg') },
  { slug: 'te', name: 'Magyar Testnevelési és Sporttudományi Egyetem', logo: img('img-17.jpg') },
  { slug: 'mna-group', name: 'MNA GROUP Kft.', logo: img('img-18.png') },
  { slug: 'mome', name: 'Moholy-Nagy Művészeti Egyetem', logo: img('img-19.png') },
];

/** Second marquee row (reverse animation) */
export const REFERENCIAK_LOGO_TRACK_B: ReferenciakLogoCell[] = [
  { slug: 'nngyk', name: 'Nemzeti Népegészségügyi és Gyógyszerészeti Központ', logo: img('img-38.png') },
  { slug: 'nffku', name: 'Nemzetközi Fejlesztési és Forráskoordinációs Ügynökség Zrt.', logo: img('img-39.png') },
  { slug: 'oe', name: 'Óbudai Egyetem', logo: img('img-40.jpg') },
  { slug: 'okfo', name: 'Országos Kórházi Főigazgatóság', logo: img('img-41.png') },
  { slug: 'profikomp', name: 'Profikomp Környezettechnika Zrt.', logo: img('img-42.jpg') },
  { slug: 'rc-hungaria', name: 'RC Hungária Kft.', logo: img('img-43.png') },
  { slug: 'saldo', name: 'SALDO Pénzügyi Tanácsadó és Informatikai Zrt.', logo: img('img-44.jpg') },
  { slug: 'sbt', name: 'SBT Protect Kft.', logo: img('img-45.jpg') },
  { slug: 'smart-digital', name: 'Smart Digital Kft.', logo: img('img-46.jpg') },
  { slug: 'soproni-egyetem', name: 'Soproni Egyetem', logo: img('img-47.png') },
  { slug: 'sszc', name: 'Soproni Szakképzési Centrum', logo: img('img-48.png') },
  { slug: 'sze', name: 'Széchenyi István Egyetem', logo: img('img-49.png') },
  { slug: 'tszc', name: 'Tatabányai Szakképzési Centrum', logo: img('img-50.jpg') },
  { slug: 'universitas-gyor', name: 'Universitas-Győr Nonprofit Kft.', logo: img('img-51.jpg') },
  { slug: 'vajda-papir', name: 'Vajda-Papír Kft.', logo: img('img-52.jpg') },
  { slug: 'vksz', name: 'Veszprémi Közüzemi Szolgáltató Zrt.', logo: img('img-53.png') },
  { slug: 'zengo', name: 'Zengo Kft.', logo: img('img-54.png') },
  { slug: 'future-fm', name: 'Future FM Zrt.', logo: img('img-46.jpg') },
];

/** Partner names for the list below the logo flow (final-referenciak.html order) */
export const REFERENCIAK_PARTNER_LIST: { slug: string; name: string }[] = [
  { slug: 'atev', name: 'ATEV Fehérjefeldolgozó Zrt.' },
  { slug: 'baudekor', name: 'BauDekor Kft.' },
  { slug: 'bgyh', name: 'Budapest Gyógyfürdői és Hévizei Zrt.' },
  { slug: 'dku', name: 'Digitális Kormányzati Ügynökség Zrt.' },
  { slug: 'dyntell', name: 'Dyntell Kft.' },
  { slug: 'egis', name: 'Egis Gyógyszergyár Zrt.' },
  { slug: 'equinox', name: 'Equinox Consulting Kft.' },
  { slug: 'ex-ante', name: 'Ex Ante Kft.' },
  { slug: 'future-fm', name: 'Future FM Zrt.' },
  { slug: 'globomax', name: 'Globomax Zrt.' },
  { slug: 'hd-direkt', name: 'HD Direkt Hungary Kft.' },
  { slug: 'kemence', name: 'Kemence Pékség' },
  { slug: 'konigsberg', name: 'Königsberg Consulting Kft.' },
  { slug: 'kszk', name: 'Kormányzati Szolgáltató Központ Nonprofit Kft.' },
  { slug: 'lechner', name: 'Lechner Tudásközpont' },
  { slug: 'mmsz', name: 'Magyar Máltai Szeretetszolgálat' },
  { slug: 'te', name: 'Magyar Testnevelési és Sporttudományi Egyetem' },
  { slug: 'mna-group', name: 'MNA GROUP Kft.' },
  { slug: 'mome', name: 'Moholy-Nagy Művészeti Egyetem' },
  { slug: 'nngyk', name: 'Nemzeti Népegészségügyi és Gyógyszerészeti Központ' },
  { slug: 'nffku', name: 'Nemzetközi Fejlesztési és Forráskoordinációs Ügynökség Zrt.' },
  { slug: 'oe', name: 'Óbudai Egyetem' },
  { slug: 'okfo', name: 'Országos Kórházi Főigazgatóság' },
  { slug: 'profikomp', name: 'Profikomp Környezettechnika Zrt.' },
  { slug: 'rc-hungaria', name: 'RC Hungária Kft.' },
  { slug: 'saldo', name: 'SALDO Pénzügyi Tanácsadó és Informatikai Zrt.' },
  { slug: 'sbt', name: 'SBT Protect Kft.' },
  { slug: 'smart-digital', name: 'Smart Digital Kft.' },
  { slug: 'soproni-egyetem', name: 'Soproni Egyetem' },
  { slug: 'sszc', name: 'Soproni Szakképzési Centrum' },
  { slug: 'sze', name: 'Széchenyi István Egyetem' },
  { slug: 'tszc', name: 'Tatabányai Szakképzési Centrum' },
  { slug: 'universitas-gyor', name: 'Universitas-Győr Nonprofit Kft.' },
  { slug: 'vajda-papir', name: 'Vajda-Papír Kft.' },
  { slug: 'vksz', name: 'Veszprémi Közüzemi Szolgáltató Zrt.' },
  { slug: 'zengo', name: 'Zengo Kft.' },
];
