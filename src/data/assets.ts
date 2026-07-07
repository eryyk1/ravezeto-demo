import { wpUpload } from './media';

/** @deprecated Use teamMembers from content/team.ts and wpUpload paths */
export const teamPortraits: Record<string, string> = {};

export const logoImages: Record<string, string> = {
  tszc: wpUpload('2023/01/tszc.jpg'),
  vemkh: wpUpload('2023/01/vemkh-1.jpg'),
  obudaie: wpUpload('2023/01/OE-1.jpg'),
  pmkh: wpUpload('2023/01/PMKH-1.jpg'),
  nkfih: wpUpload('2023/01/nkfih.jpg'),
  szechenyi: wpUpload('2018/06/ref_14.png'),
  te: wpUpload('2023/01/tf2.jpg'),
  nav: wpUpload('2023/01/nav-2.jpg'),
  globomax: wpUpload('2023/01/globomax.jpg'),
};

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
