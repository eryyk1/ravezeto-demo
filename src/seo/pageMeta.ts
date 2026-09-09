import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
} from './config';
import { company } from '../content/company';

export type PageMeta = {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  robots?: string;
};

const PAGE_META: Record<string, Omit<PageMeta, 'canonical'>> = {
  '/': {
    title: DEFAULT_TITLE,
    description:
      'A Rávezető Projekt Kft. emberközpontú szervezetfejlesztéssel és vezetési tanácsadással segíti vállalatát 2008 óta, 400+ lezárt fejlesztési és képzési projekttel.',
  },
  '/rolunk': {
    title: `RÁVezető – Csapatunk`,
    description:
      'Ismerje meg a Rávezető Projekt Kft. tanácsadó csapatát: több éves szervezetfejlesztési és felnőttképzési tapasztalattal segítik vállalata fejlődését.',
  },
  '/tanacsadas': {
    title: `RÁVezető – Tanácsadás`,
    description:
      'A Rávezető Projekt Kft. emberközpontú szervezetfejlesztési tanácsadással támogatja a változást irányító vezetőket és munkatársakat.',
  },
  '/felnottkepzes': {
    title: `RÁVezető – Felnőttképzés`,
    description:
      'A Rávezető Projekt Kft. engedélyes felnőttképzőként kulcskompetencia-fejlesztő tréningeket kínál jelenléti, e-learning és online formában vállalatoknak.',
  },
  '/referenciak': {
    title: `RÁVezető – Referenciák`,
    description:
      'A Rávezető Projekt Kft. 18 éve dolgozik vezető magyar vállalatokkal: 400+ tanácsadási projekt, 200+ visszatérő ügyfél, 3500+ képzési résztvevő.',
  },
  '/palyazatok': {
    title: `RÁVezető – Pályázatok`,
    description:
      'A Rávezető Projekt Kft. díjmentes konzultációval segít cégre szabott, pályázattal támogatott képzési portfóliót összeállítani és megvalósítani.',
  },
  '/mentally': {
    title: `RÁVezető – Mentally`,
    description:
      'Tudományos alapokon nyugvó online mérőeszköz a munkahelyi mentális egészség támogatására. Ismerje meg a Mentally-t.',
  },
  '/kapcsolat': {
    title: `RÁVezető – Kapcsolat`,
    description: `Lépjen kapcsolatba a Rávezető Projekt Kft.-vel: telefon, e-mail és ${company.address}, hétköznap 9 és 16 óra között.`,
  },
  '/jogi/adatvedelem': {
    title: `RÁVezető – Adatvédelem`,
    description:
      'A Rávezető Projekt Kft. adatvédelmi szabályzata. A végleges szöveg feltöltése az oldal élesítése előtt történik meg.',
  },
  '/jogi/impresszum': {
    title: `RÁVezető – Impresszum`,
    description:
      'A Rávezető Projekt Kft. impresszuma. A végleges jogi tartalom feltöltése az oldal élesítése előtt történik meg.',
  },
  '/jogi/cookie': {
    title: `RÁVezető – Cookie tájékoztató`,
    description:
      'A Rávezető Projekt Kft. cookie-k használatáról szóló tájékoztatója.',
  },
  '/jogi': {
    title: `Jogi információk – ${SITE_NAME}`,
    description: 'Adatvédelmi tájékoztató, impresszum és jogi dokumentumok.',
    robots: 'noindex, follow',
  },
};

export { PAGE_META as pageMeta };

const KNOWN_PATH_PREFIXES = [
  '/',
  '/rolunk',
  '/tanacsadas',
  '/felnottkepzes',
  '/referenciak',
  '/palyazatok',
  '/mentally',
  '/kapcsolat',
  '/jogi',
] as const;

function isKnownRoute(path: string): boolean {
  return KNOWN_PATH_PREFIXES.some(
    (prefix) => path === prefix || (prefix !== '/' && path.startsWith(`${prefix}/`)),
  );
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function resolvePageMeta(pathname: string): PageMeta {
  const path = normalizePath(pathname);

  if (PAGE_META[path]) {
    return {
      ...PAGE_META[path],
      canonical: `${SITE_URL}${path === '/' ? '/' : path}`,
      ogImage: OG_IMAGE_URL,
    };
  }

  if (path.startsWith('/tanacsadas')) {
    return {
      ...PAGE_META['/tanacsadas'],
      canonical: `${SITE_URL}${path}`,
      ogImage: OG_IMAGE_URL,
    };
  }

  if (path.startsWith('/felnottkepzes')) {
    return {
      ...PAGE_META['/felnottkepzes'],
      canonical: `${SITE_URL}${path}`,
      ogImage: OG_IMAGE_URL,
    };
  }

  if (path.startsWith('/jogi/')) {
    const jogiPath = path as keyof typeof PAGE_META;
    if (PAGE_META[jogiPath]) {
      return {
        ...PAGE_META[jogiPath],
        canonical: `${SITE_URL}${path}`,
        ogImage: OG_IMAGE_URL,
      };
    }
    return {
      ...PAGE_META['/jogi'],
      canonical: `${SITE_URL}${path}`,
      ogImage: OG_IMAGE_URL,
    };
  }

  if (!isKnownRoute(path)) {
    return {
      title: `Az oldal nem található – ${SITE_NAME}`,
      description: 'A keresett oldal nem található. Térjen vissza a Rávezető főoldalára.',
      canonical: `${SITE_URL}${path}`,
      ogImage: OG_IMAGE_URL,
      robots: 'noindex, nofollow',
    };
  }

  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonical: `${SITE_URL}${path}`,
    ogImage: OG_IMAGE_URL,
  };
}
