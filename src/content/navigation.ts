/** Primary navigation — client pill nav order (Kapcsolat + Mentally handled in header) */
export const primaryNav = [
  { label: 'Csapatunk', path: '/rolunk' },
  { label: 'Tanácsadás', path: '/tanacsadas' },
  { label: 'Felnőttképzés', path: '/felnottkepzes' },
  { label: 'Referenciák', path: '/referenciak' },
  { label: 'Pályázatok', path: '/palyazatok' },
] as const;

export const footerNav = {
  services: [
    { label: 'Szervezetfejlesztés', path: '/tanacsadas/szervezetfejlesztes' },
    { label: 'Változásmenedzsment', path: '/tanacsadas/valtozasmenedzsment' },
    { label: 'Coaching', path: '/tanacsadas/coaching' },
  ],
  company: [
    { label: 'Csapatunk', path: '/rolunk' },
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
