export type NavItem = {
  label: string;
  path: string;
};

/** Primary navigation */
export const primaryNav: NavItem[] = [
  { label: 'Rólunk', path: '/rolunk' },
  { label: 'Tanácsadás', path: '/tanacsadas' },
  { label: 'Mentally', path: '/mentally' },
  { label: 'Felnőttképzés', path: '/felnottkepzes' },
  { label: 'Referenciák', path: '/referenciak' },
  { label: 'Pályázatok', path: '/palyazatok' },
  { label: 'Kapcsolat', path: '/kapcsolat' },
];

export const footerNav = {
  services: [
    { label: 'Szervezetfejlesztés', path: '/tanacsadas/szervezetfejlesztes' },
    { label: 'Változásmenedzsment', path: '/tanacsadas/valtozasmenedzsment' },
    { label: 'Coaching', path: '/tanacsadas/coaching' },
  ],
  company: [
    { label: 'Rólunk', path: '/rolunk' },
    { label: 'Referenciák', path: '/referenciak' },
    { label: 'Pályázatok', path: '/palyazatok' },
    { label: 'Mentally', path: '/mentally' },
    { label: 'Kapcsolat', path: '/kapcsolat' },
  ],
  legal: [
    { label: 'Adatvédelem', path: '/jogi/adatvedelem' },
    { label: 'Impresszum', path: '/jogi/impresszum' },
  ],
} as const;
