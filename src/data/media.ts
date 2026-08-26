/** WordPress upload paths — mirrored under public/assets/wp-uploads/ */

export function wpUpload(relativePath: string): string {
  return `/assets/wp-uploads/${relativePath.replace(/^\//, '')}`;
}

export function themeImage(relativePath: string): string {
  return `/assets/images/home/${relativePath.replace(/^\//, '')}`;
}

export const teamPhotos2025 = {
  'riz-adam-cmc': wpUpload('2025/02/MG_1333.jpg'),
  'berta-aniko': wpUpload('2025/02/IMG_0070-scaled.jpeg'),
  'biro-gabriella': wpUpload('2025/02/MG_0645-scaled.jpg'),
  'soos-andrea': wpUpload('2025/02/MG_1458.jpg'),
  'szoke-adam': wpUpload('2025/02/MG_1055.jpg'),
} as const;

export const mentallyImages = {
  product: themeImage('mentally1_grouped.png'),
  before: themeImage('negativumok01.webp'),
  after: themeImage('pozitivumok01.webp'),
  brand: themeImage('mentally.webp'),
} as const;

export const rolunkImages = {
  values: themeImage('ertekeink.png'),
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
