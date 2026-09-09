/**
 * Post-build: inject per-route title, meta, canonical and Organization JSON-LD
 * into static HTML shells so non-JS crawlers see correct SEO on main routes.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const siteUrl = 'https://www.ravezeto.hu';
const ogImage = `${siteUrl}/og-image.svg`;

const ROUTES = [
  {
    path: '/rolunk',
    title: 'RÁVezető – Csapatunk',
    description:
      'Ismerje meg a Rávezető Projekt Kft. tanácsadó csapatát: több éves szervezetfejlesztési és felnőttképzési tapasztalattal segítik vállalata fejlődését.',
  },
  {
    path: '/tanacsadas',
    title: 'RÁVezető – Tanácsadás',
    description:
      'A Rávezető Projekt Kft. emberközpontú szervezetfejlesztési tanácsadással támogatja a változást irányító vezetőket és munkatársakat.',
  },
  {
    path: '/felnottkepzes',
    title: 'RÁVezető – Felnőttképzés',
    description:
      'A Rávezető Projekt Kft. engedélyes felnőttképzőként kulcskompetencia-fejlesztő tréningeket kínál jelenléti, e-learning és online formában vállalatoknak.',
  },
  {
    path: '/referenciak',
    title: 'RÁVezető – Referenciák',
    description:
      'A Rávezető Projekt Kft. 18 éve dolgozik vezető magyar vállalatokkal: 400+ tanácsadási projekt, 200+ visszatérő ügyfél, 3500+ képzési résztvevő.',
  },
  {
    path: '/palyazatok',
    title: 'RÁVezető – Pályázatok',
    description:
      'A Rávezető Projekt Kft. díjmentes konzultációval segít cégre szabott, pályázattal támogatott képzési portfóliót összeállítani és megvalósítani.',
  },
  {
    path: '/mentally',
    title: 'RÁVezető – Mentally',
    description:
      'Tudományos alapokon nyugvó online mérőeszköz a munkahelyi mentális egészség támogatására. Ismerje meg a Mentally-t.',
  },
  {
    path: '/kapcsolat',
    title: 'RÁVezető – Kapcsolat',
    description:
      'Lépjen kapcsolatba a Rávezető Projekt Kft.-vel: telefon, e-mail és 1146 Budapest, Izsó utca 7. alatti iroda, hétköznap 9 és 16 óra között.',
  },
  {
    path: '/jogi/adatvedelem',
    title: 'RÁVezető – Adatvédelem',
    description:
      'A Rávezető Projekt Kft. adatvédelmi tájékoztatói és adatkezelési gyakorlata. Engedélyezett felnőttképző intézmény (E/2021/000106, B/2020/001943).',
  },
  {
    path: '/jogi/impresszum',
    title: 'RÁVezető – Impresszum',
    description:
      'A Rávezető Projekt Kft. hivatalos elérhetőségei, cégadatok és jogi dokumentumai.',
  },
  {
    path: '/jogi/cookie',
    title: 'RÁVezető – Cookie tájékoztató',
    description:
      'A Rávezető Projekt Kft. cookie-k használatáról szóló tájékoztatója.',
  },
];

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'EducationalOrganization'],
  name: 'RÁvezető Projekt Kft.',
  legalName:
    'Rávezető Projekt Tanácsadó és Szolgáltató Korlátolt Felelősségű Társaság',
  url: siteUrl,
  taxID: '14448304-2-42',
  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'HU-cegjegyzekszam',
      name: 'Cégjegyzékszám',
      value: '01-09-904298',
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'HU-felnottkepzesi-nyilvantartasi-szam',
      name: 'Felnőttképzési nyilvántartási szám',
      value: 'B/2020/001943',
    },
    {
      '@type': 'PropertyValue',
      propertyID: 'HU-felnottkepzesi-engedelyszam',
      name: 'Felnőttképzési engedélyszám',
      value: 'E/2021/000106',
    },
  ],
};

function injectSeo(html, route) {
  const canonical = `${siteUrl}${route.path}`;
  let next = html;

  next = next.replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);
  next = next.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${route.description}" />`,
  );
  next = next.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`,
  );
  next = next.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`,
  );
  next = next.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`,
  );
  next = next.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`,
  );
  next = next.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`,
  );
  next = next.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`,
  );

  const jsonLd = `<script type="application/ld+json" data-prerender="organization">${JSON.stringify(ORG_JSON_LD)}</script>`;
  if (!next.includes('data-prerender="organization"')) {
    next = next.replace('</head>', `  ${jsonLd}\n  </head>`);
  }

  return next;
}

const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.warn('prerender-seo: dist/index.html not found, skipping');
  process.exit(0);
}

const baseHtml = fs.readFileSync(indexPath, 'utf8');

for (const route of ROUTES) {
  const outDir = path.join(distDir, route.path.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), injectSeo(baseHtml, route), 'utf8');
}

console.log(`prerender-seo: wrote ${ROUTES.length} route shells`);
