import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
} from './config';

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
    description: DEFAULT_DESCRIPTION,
  },
  '/rolunk': {
    title: `Rólunk – ${SITE_NAME}`,
    description:
      'Az egyéni és szervezeti minőség és teljesítmény növelésében tudunk segíteni, közös gondolkodással, elhivatott szakemberekkel.',
  },
  '/tanacsadas': {
    title: `Tanácsadás – ${SITE_NAME}`,
    description:
      'Szervezetfejlesztési tanácsadás emberközpontú megközelítéssel: stratégia, vezetőfejlesztés, HR, projektmenedzsment és coaching.',
  },
  '/felnottkepzes': {
    title: `Felnőttképzés – ${SITE_NAME}`,
    description:
      'Minőségi felnőttképzések a XXI. század kulcskompetenciáihoz. Szervezeti és személyes fejlesztő programok vállalatoknak.',
  },
  '/referenciak': {
    title: `Referenciák – ${SITE_NAME}`,
    description:
      'Partnereink és ügyfeleink bizalma. Referenciák köz- és magánszektorból, oktatásból és gazdasági szférából.',
  },
  '/palyazatok': {
    title: `Pályázatok – ${SITE_NAME}`,
    description:
      'EU-forrásból megvalósuló fejlesztési projektek tervezése és menedzsmentje. Nemzetközi és uniós projekttapasztalat.',
  },
  '/mentally': {
    title: `Mentally – ${SITE_NAME}`,
    description:
      'Tudományos alapokon nyugvó online mérőeszköz a munkahelyi mentális egészség támogatására. Ismerje meg a Mentally-t.',
  },
  '/kapcsolat': {
    title: `Kapcsolat – ${SITE_NAME}`,
    description:
      'Keressen minket bizalommal. Iroda: 1146 Budapest, Izsó u. 7. 1/3. Telefon: +36 70/513 4128. E-mail: info@ravezeto.hu',
  },
  '/jogi': {
    title: `Jogi információk – ${SITE_NAME}`,
    description: 'Adatvédelmi tájékoztató, impresszum és jogi dokumentumok.',
    robots: 'noindex, follow',
  },
};

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

  if (path.startsWith('/jogi')) {
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
