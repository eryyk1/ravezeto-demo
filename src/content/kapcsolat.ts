/** /kapcsolat — backup: template_kapcsolatok.php + company data */

import { company } from './company';

export const kapcsolatHero = {
  label: 'Kapcsolat',
  title: 'Keressen minket\nbizalommal',
  intro: 'Keressen minket bizalommal az alábbi elérhetőségeinken!',
} as const;

export const kapcsolatDetails = [
  {
    title: 'Ügyfélszolgálat',
    lines: [company.address, 'H–P: 9.00–16.00'],
  },
  {
    title: 'Irodánk',
    lines: [company.address, '6. kapucsengő'],
  },
  {
    title: 'Elérhetőségek',
    lines: [company.phone, company.email, company.website],
    links: [
      { label: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
      { label: company.email, href: `mailto:${company.email}` },
    ],
  },
  {
    title: 'Felnőttképzés',
    lines: [company.trainingReg, `E-mail: ${company.trainingEmail}`],
    links: [{ label: company.trainingEmail, href: `mailto:${company.trainingEmail}` }],
  },
] as const;

export const kapcsolatForm = {
  title: 'Írjon nekünk',
  intro:
    'Kérjen ajánlatot tanácsadásra, képzésre vagy a Mentally termékre. Munkatársaink 1–2 munkanapon belül válaszolnak.',
  fields: [
    { name: 'name', label: 'Név', type: 'text', required: true },
    { name: 'email', label: 'E-mail', type: 'email', required: true },
    { name: 'phone', label: 'Telefon', type: 'tel', required: false },
    { name: 'subject', label: 'Tárgy', type: 'text', required: true },
    { name: 'message', label: 'Üzenet', type: 'textarea', required: true },
  ],
  submit: 'Üzenet küldése',
  action: 'https://formspree.io/f/YOUR_FORM_ID',
} as const;

export const kapcsolatMap = {
  title: 'Hol talál minket',
  address: company.address,
  embedUrl:
    'https://maps.google.com/maps?q=1146+Budapest+Izs%C3%B3+u.+7.&output=embed',
} as const;

export const kapcsolatImpresszum = {
  title: 'Impresszum',
  lines: [
    `Cégnév: ${company.name}`,
    `Székhely: ${company.address}`,
    `Telefon: ${company.phone}`,
    `E-mail: ${company.email}`,
    `Web: ${company.website}`,
  ],
} as const;
