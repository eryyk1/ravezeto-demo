/** /kapcsolat — source: live https://www.ravezeto.hu/kapcsolatok/ */

import { company } from './company';

export const kapcsolatHero = {
  label: 'Kapcsolat',
  title: 'Keressen minket\nbizalommal',
  intro: 'Keressen minket bizalommal az alábbi elérhetőségeinken!',
} as const;

export const kapcsolatDetails = [
  {
    title: 'Ügyfélszolgálat',
    lines: [company.address, 'H-P: 9.00-16.00'],
  },
  {
    title: 'Irodánk',
    lines: [company.address, '6. kapucsengő'],
    links: [
      {
        label: company.address,
        href: 'https://www.google.com/maps/search/1146+Budapest,+Izs%C3%B3+u.+7.+1%2F3./@47.5082165,19.0917401,200m/data=!3m1!1e3',
      },
    ],
  },
  {
    title: 'Telefonszám',
    lines: [company.phone],
    links: [{ label: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` }],
  },
] as const;

export const kapcsolatForm = {
  title: 'Üzenet',
  fields: [
    { name: 'name', label: 'Név', type: 'text', required: true, placeholder: 'Név *' },
    { name: 'email', label: 'Email cím', type: 'email', required: true, placeholder: 'Email cím *' },
    { name: 'message', label: 'Üzenet', type: 'textarea', required: true, placeholder: 'Üzenet *' },
  ],
  submit: 'Küldés',
  action: 'https://ravezeto.hu/wp-admin/admin-ajax.php',
} as const;
