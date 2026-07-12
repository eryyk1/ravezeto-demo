import { company } from '../content/company';

export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ??
  'https://www.ravezeto.hu';

export const SITE_NAME = 'Rávezető';

export const DEFAULT_TITLE = `${SITE_NAME} – ${company.tagline}`;

export const DEFAULT_DESCRIPTION =
  'RÁvezető Projekt Kft. – Vezetési tanácsadás, szervezetfejlesztés és felnőttképzés. 16 év tapasztalat, 400+ fejlesztési projekt.';

export const OG_IMAGE_PATH = '/og-image.jpg';

export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

export const OG_LOCALE = 'hu_HU';
