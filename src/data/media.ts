/** Page images extracted from client HTML bundle → public/assets/images/{page}/ */

export function pageImage(page: string, file: string): string {
  return `/assets/images/${page}/${file.replace(/^\//, '')}`;
}

/** @deprecated Legacy WordPress mirror — do not use for new content */
export function wpUpload(relativePath: string): string {
  return `/assets/wp-uploads/${relativePath.replace(/^\//, '')}`;
}

/** @deprecated Legacy theme folder — do not use for new content */
export function themeImage(relativePath: string): string {
  return `/assets/images/home/${relativePath.replace(/^\//, '')}`;
}

export const teamPhotos2025 = {
  'riz-adam-cmc': '',
  'berta-aniko': '',
  'biro-gabriella': '',
  'soos-andrea': '',
  'szoke-adam': '',
} as const;

export const mentallyImages = {
  product: themeImage('mentally1_grouped.png'),
  before: themeImage('negativumok01.webp'),
  after: themeImage('pozitivumok01.webp'),
  brand: themeImage('mentally.webp'),
} as const;

export const rolunkImages = {
  values: pageImage('csapatunk', 'img-03.jpg'),
} as const;

export const euBranding = {
  szechenyiLogo: '/assets/images/Szechenyi-2020-logo.png',
} as const;

export const illustrations = {
  courses: '/assets/illustrations/illust_courses.svg',
  innerCourses: '/assets/illustrations/illust_inner_courses.svg',
  innerTraining: '/assets/illustrations/illust_inner_traininglist.svg',
  coaching: '/assets/illustrations/illust_coaching.svg',
  innerHr: '/assets/illustrations/illust_inner_hrdevelopment.svg',
  stress: '/assets/illustrations/illust_stress.svg',
  innerServices: '/assets/illustrations/illust_inner_services.svg',
  innerOngoing: '/assets/illustrations/illust_inner_ongoing.svg',
} as const;
