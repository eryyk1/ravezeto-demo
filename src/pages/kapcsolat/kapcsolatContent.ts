import { company } from '../../content/company';

export const kapcsolatHero = {
  label: 'Kapcsolat',
  title: 'Keressen minket\nbizalommal',
  intro: 'Keressen minket bizalommal az alábbi elérhetőségeinken!',
} as const;

export const kapcsolatDetails = [
  {
    id: 'service',
    title: 'Ügyfélszolgálat',
    lines: [company.address, company.hours],
  },
  {
    id: 'office',
    title: 'Irodánk',
    lines: [company.address, '6. kapucsengő'],
    links: [{ label: company.address, href: company.mapsSearch }],
  },
  {
    id: 'phone',
    title: 'Telefonszám',
    lines: [company.phone],
    links: [{ label: company.phone, href: `tel:${company.phoneTel}` }],
  },
  {
    id: 'email',
    title: 'E-mail',
    lines: [company.email],
    links: [{ label: company.email, href: `mailto:${company.email}` }],
  },
] as const;

export const kapcsolatForm = {
  title: 'Üzenet',
  recipient: company.email,
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_CONTACT as string | undefined,
  fields: {
    name: { label: 'Név', required: true },
    email: { label: 'Email', required: true },
    phone: { label: 'Telefonszám', required: false },
    message: { label: 'Üzenet', required: true },
  },
  submit: 'Küldés',
  messages: {
    success: 'Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.',
    error: 'Hiba történt. Kérjük próbálja újra később.',
    required: 'Ez a mező kötelező.',
    invalidEmail: 'Érvénytelen e-mail cím.',
    notConfigured: 'Az űrlap jelenleg nincs konfigurálva. Kérjük írjon közvetlenül az info@ravezeto.hu címre.',
  },
} as const;
