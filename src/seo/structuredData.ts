import { felnottkepzesCategories, felnottkepzesProgrammeGroups } from '../content/felnottkepzes';
import { tanacsadasServices } from '../content/tanacsadas';
import { company } from '../content/company';
import { SITE_NAME, SITE_URL } from './config';
import type { TeamMember } from '../services/content/types';

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const ORG_DESCRIPTION =
  'Vezetési tanácsadás, szervezetfejlesztés, változásmenedzsment, üzleti coaching és engedélyezett felnőttképzés 2008 óta. Nyilvántartásba vételi szám: B/2020/001943, engedélyszám: E/2021/000106.';

const TEAM_KNOWS_ABOUT: Record<string, readonly string[]> = {
  'riz-adam-cmc': [
    'Szervezetfejlesztés',
    'Vezetőfejlesztés',
    'Coaching',
    'Változásmenedzsment',
  ],
  'berta-aniko': [
    'Felnőttképzés',
    'Képzésszervezés',
    'Kompetenciafejlesztés',
    'Pályázati képzési projektek',
  ],
  'biro-gabriella': [
    'Szervezetfejlesztés',
    'Szervezeti kultúra',
    'Coaching',
    'Tréning',
  ],
  'soos-andrea': [
    'Operatív vezetés',
    'Projektmenedzsment',
    'Pénzügyi menedzsment',
  ],
  'szoke-adam': [
    'Szervezetfejlesztés',
    'Vezetői fejlesztés',
    'Csoportos fejlesztés',
    'Coaching',
  ],
};

const MENTALLY_PRODUCT_ID = `${SITE_URL}/mentally#product`;
const MENTALLY_BRAND_ID = `${SITE_URL}/mentally#brand`;

function buildOrganizationNode(options?: { includeMentallyBrand?: boolean }) {
  return {
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': ORGANIZATION_ID,
    name: company.name,
    alternateName: company.brandName,
    legalName: company.legalName,
    url: SITE_URL,
    email: company.email,
    telephone: [company.landlinePhone, company.phone],
    foundingDate: company.foundingYear,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Izsó u. 7. 1/3.',
      addressLocality: 'Budapest',
      postalCode: '1146',
      addressCountry: 'HU',
    },
    vatID: company.taxId,
    taxID: company.taxId,
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'HU-cegjegyzekszam',
        name: 'Cégjegyzékszám',
        value: company.companyRegistration,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'HU-felnottkepzesi-nyilvantartasi-szam',
        name: 'Felnőttképzési nyilvántartási szám',
        value: company.trainingRegistrationNumber,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'HU-felnottkepzesi-engedelyszam',
        name: 'Felnőttképzési engedélyszám',
        value: company.trainingLicenseNumber,
      },
    ],
    sameAs: [...company.sameAs],
    description: ORG_DESCRIPTION,
    knowsAbout: [
      'Szervezetfejlesztés',
      'Vezetői tanácsadás',
      'Felnőttképzés',
      'Kompetenciafejlesztés',
      'Változásmenedzsment',
      ...(options?.includeMentallyBrand ? ['Munkahelyi mentális egészség'] : []),
    ],
    ...(options?.includeMentallyBrand
      ? {
          brand: { '@id': MENTALLY_BRAND_ID },
          makesOffer: { '@id': MENTALLY_PRODUCT_ID },
        }
      : {}),
  };
}

function buildMentallyProductNodes() {
  return [
    {
      '@type': 'Brand',
      '@id': MENTALLY_BRAND_ID,
      name: 'Mentally',
      url: company.mentallyProductUrl,
      sameAs: company.mentallyProductUrl,
    },
    {
      '@type': 'SoftwareApplication',
      '@id': MENTALLY_PRODUCT_ID,
      name: 'Mentally',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: company.mentallyProductUrl,
      sameAs: company.mentallyProductUrl,
      description:
        'Tudományos alapokon nyugvó online mérőeszköz a munkahelyi mentális egészség támogatására.',
      provider: { '@id': ORGANIZATION_ID },
      offers: {
        '@type': 'Offer',
        url: company.mentallyProductUrl,
        offeredBy: { '@id': ORGANIZATION_ID },
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/mentally#webpage`,
      url: `${SITE_URL}/mentally`,
      name: 'Mentally – Rávezető Projekt Kft.',
      inLanguage: 'hu-HU',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': MENTALLY_PRODUCT_ID },
      publisher: { '@id': ORGANIZATION_ID },
    },
  ];
}

type BreadcrumbCrumb = {
  name: string;
  path: string;
};

function buildBreadcrumbNode(crumbs: readonly BreadcrumbCrumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === '/' ? '/' : crumb.path}`,
    })),
  };
}

function hoursToIsoDuration(hoursLabel: string): string | undefined {
  const match = hoursLabel.match(/(\d+)/);
  if (!match) return undefined;
  return `PT${match[1]}H`;
}

type TrainingCatalogItem = {
  title: string;
  hours: string;
  area: string;
};

function buildCourseNode(course: TrainingCatalogItem, index: number) {
  const duration = hoursToIsoDuration(course.hours);

  return {
    '@type': ['Course', 'EducationalOccupationalProgram'],
    '@id': `${SITE_URL}/felnottkepzes#course-${index + 1}`,
    name: course.title,
    description: `${course.title} — akkreditált felnőttképzési program (${course.hours}).`,
    provider: { '@id': ORGANIZATION_ID },
    offers: {
      '@type': 'Offer',
      category: 'Felnőttképzés',
      offeredBy: { '@id': ORGANIZATION_ID },
    },
    educationalCredentialAwarded: 'Felnőttképzési tanúsítvány',
    occupationalCategory: course.area,
    inLanguage: 'hu',
    ...(duration ? { timeRequired: duration } : {}),
  };
}

function buildTrainingCatalogNodes() {
  const courses: TrainingCatalogItem[] = felnottkepzesProgrammeGroups.flatMap((group) =>
    group.items.map((item) => ({
      title: item.title,
      hours: item.hours,
      area: group.title,
    })),
  );

  const courseNodes = courses.map((course, index) => buildCourseNode(course, index));

  return [
    {
      '@type': 'ItemList',
      name: 'Képzési katalógus – Rávezető Projekt Kft.',
      numberOfItems: courses.length,
      itemListElement: courseNodes.map((course, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@id': course['@id'] },
      })),
    },
    ...courseNodes,
    ...felnottkepzesCategories.map((category) => ({
      '@type': 'EducationalOccupationalProgram',
      name: category.title,
      description: category.text,
      provider: { '@id': ORGANIZATION_ID },
      occupationalCategory: 'Felnőttképzés',
      inLanguage: 'hu',
    })),
  ];
}

function buildServiceNodes() {
  return [
    {
      '@type': 'ItemList',
      name: 'Tanácsadási szolgáltatások – Rávezető Projekt Kft.',
      numberOfItems: tanacsadasServices.length,
      itemListElement: tanacsadasServices.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          '@id': `${SITE_URL}/tanacsadas#${service.id}`,
          name: service.label,
          description: service.intro,
          provider: { '@id': ORGANIZATION_ID },
          areaServed: {
            '@type': 'Country',
            name: 'Hungary',
          },
          serviceType: service.label,
          url: `${SITE_URL}/tanacsadas/${service.id}`,
        },
      })),
    },
  ];
}

function buildPersonNodes(team: readonly TeamMember[]) {
  return team.map((member) => ({
    '@type': 'Person',
    '@id': `${SITE_URL}/rolunk#${member.slug}`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    worksFor: { '@id': ORGANIZATION_ID },
    knowsAbout: TEAM_KNOWS_ABOUT[member.slug] ?? ['Szervezetfejlesztés', 'Tanácsadás'],
    url: `${SITE_URL}/rolunk`,
  }));
}

const BREADCRUMB_BY_PATH: Record<string, readonly BreadcrumbCrumb[]> = {
  '/rolunk': [
    { name: 'Főoldal', path: '/' },
    { name: 'Csapatunk', path: '/rolunk' },
  ],
  '/tanacsadas': [
    { name: 'Főoldal', path: '/' },
    { name: 'Tanácsadás', path: '/tanacsadas' },
  ],
  '/felnottkepzes': [
    { name: 'Főoldal', path: '/' },
    { name: 'Felnőttképzés', path: '/felnottkepzes' },
  ],
  '/referenciak': [
    { name: 'Főoldal', path: '/' },
    { name: 'Referenciák', path: '/referenciak' },
  ],
  '/palyazatok': [
    { name: 'Főoldal', path: '/' },
    { name: 'Pályázatok', path: '/palyazatok' },
  ],
  '/kapcsolat': [
    { name: 'Főoldal', path: '/' },
    { name: 'Kapcsolat', path: '/kapcsolat' },
  ],
  '/mentally': [
    { name: 'Főoldal', path: '/' },
    { name: 'Mentally', path: '/mentally' },
  ],
  '/jogi/adatvedelem': [
    { name: 'Főoldal', path: '/' },
    { name: 'Adatvédelem', path: '/jogi/adatvedelem' },
  ],
  '/jogi/impresszum': [
    { name: 'Főoldal', path: '/' },
    { name: 'Impresszum', path: '/jogi/impresszum' },
  ],
  '/jogi/cookie': [
    { name: 'Főoldal', path: '/' },
    { name: 'Cookie tájékoztató', path: '/jogi/cookie' },
  ],
};

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function resolveBreadcrumbPath(path: string): readonly BreadcrumbCrumb[] | null {
  if (BREADCRUMB_BY_PATH[path]) {
    return BREADCRUMB_BY_PATH[path];
  }

  if (path.startsWith('/tanacsadas/')) {
    return BREADCRUMB_BY_PATH['/tanacsadas'];
  }

  if (path.startsWith('/felnottkepzes/')) {
    return BREADCRUMB_BY_PATH['/felnottkepzes'];
  }

  if (path.startsWith('/jogi/')) {
    const segment = path.split('/').pop() ?? '';
    const label =
      segment === 'impresszum'
        ? 'Impresszum'
        : segment === 'cookie'
          ? 'Cookie tájékoztató'
          : segment === 'adatvedelem'
            ? 'Adatvédelem'
            : 'Jogi információk';
    return [
      { name: 'Főoldal', path: '/' },
      { name: label, path },
    ];
  }

  return null;
}

export type StructuredDataContext = {
  team?: readonly TeamMember[];
};

export function resolveStructuredData(
  pathname: string,
  context: StructuredDataContext = {},
): object {
  const path = normalizePath(pathname);
  const isMentallyPage = path === '/mentally';
  const graph: object[] = [buildOrganizationNode({ includeMentallyBrand: isMentallyPage })];

  const crumbs = resolveBreadcrumbPath(path);
  if (crumbs) {
    graph.push(buildBreadcrumbNode(crumbs));
  }

  if (path === '/felnottkepzes' || path.startsWith('/felnottkepzes/')) {
    graph.push(...buildTrainingCatalogNodes());
  }

  if (path === '/tanacsadas' || path.startsWith('/tanacsadas/')) {
    graph.push(...buildServiceNodes());
  }

  if ((path === '/rolunk' || path.startsWith('/rolunk')) && context.team?.length) {
    graph.push(...buildPersonNodes(context.team));
  }

  if (path === '/' || isMentallyPage) {
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': ORGANIZATION_ID },
      inLanguage: 'hu-HU',
    });
  }

  if (isMentallyPage) {
    graph.push(...buildMentallyProductNodes());
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/** @deprecated Use resolveStructuredData — kept for tests */
export function buildOrganizationJsonLd() {
  return buildOrganizationNode();
}
