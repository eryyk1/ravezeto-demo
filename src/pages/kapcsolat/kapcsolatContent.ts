/**
 * Contact page content — source: live https://www.ravezeto.hu/kapcsolatok/
 * Form: Formspree → info@ravezeto.hu (set VITE_FORMSPREE_CONTACT in .env)
 */

export const kapcsolatHero = {
  label: 'Kapcsolat',
  title: 'Keressen minket\nbizalommal',
  intro: 'Keressen minket bizalommal az alábbi elérhetőségeinken!',
} as const;

export const kapcsolatAddress = '1146 Budapest, Izsó u. 7. 1/3.';
export const kapcsolatHours = 'H-P: 9.00-16.00';
export const kapcsolatPhone = '+36 70/513 4128';
export const kapcsolatEmail = 'info@ravezeto.hu';

export const kapcsolatMapsSearch =
  'https://www.google.com/maps/search/1146+Budapest,+Izs%C3%B3+u.+7.+1%2F3./@47.5082165,19.0917401,200m/data=!3m1!1e3';

export const kapcsolatMapEmbed =
  'https://maps.google.com/maps?q=1146+Budapest,+Izs%C3%B3+u.+7.+1/3.&hl=hu&z=16&ie=UTF8&iwloc=&output=embed';

export const kapcsolatDetails = [
  {
    id: 'service',
    title: 'Ügyfélszolgálat',
    lines: [kapcsolatAddress, kapcsolatHours],
  },
  {
    id: 'office',
    title: 'Irodánk',
    lines: [kapcsolatAddress, '6. kapucsengő'],
    links: [{ label: kapcsolatAddress, href: kapcsolatMapsSearch }],
  },
  {
    id: 'phone',
    title: 'Telefonszám',
    lines: [kapcsolatPhone],
    links: [{ label: kapcsolatPhone, href: 'tel:+36705134128' }],
  },
  {
    id: 'email',
    title: 'E-mail',
    lines: [kapcsolatEmail],
    links: [{ label: kapcsolatEmail, href: `mailto:${kapcsolatEmail}` }],
  },
] as const;

export const kapcsolatForm = {
  title: 'Üzenet',
  recipient: kapcsolatEmail,
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
