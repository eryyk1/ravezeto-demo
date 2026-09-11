/**
 * Generates routing rules for Vercel (vercel.json) and Cloudflare Workers static assets
 * (public/_redirects, public/_headers).
 *
 * Routing decisions (confirmed):
 * - /mentally stays on-site (NO external 301 to mentally.team)
 * - /referenciaink → /referenciak, /csapatunk → /rolunk (canonical React paths)
 * - HTTP 410 gone paths: worker/index.js
 * - SEO prerender routes: worker/index.js (Workers _redirects do not support 200 rewrites)
 * - SPA fallback: wrangler.jsonc assets.not_found_handling = single-page-application
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRERENDER_ROUTES } from '../functions/lib/routing.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(rootDir, 'public');

const permanent = (source, destination) => [
  { source, destination, permanent: true },
  ...(source.endsWith('/') ? [] : [{ source: `${source}/`, destination, permanent: true }]),
];

/** Vercel redirects require destination; 410 is handled via rewrite → /api/gone */
const GONE_PATHS = [
  '/teszt',
  '/csr',
  '/70-uk-gambling-dens-not-on-gamstop-best-web-sites-of-july-2025',
  '/uk-non-gamstop-bookmakers',
  '/best-non-gamstop-casinos-in-typically-the-uk-2025',
  '/online-casino-transaction-methods-deposit-options-2025',
  '/category/egyeb',
  '/category/palyazat',
  '/category/munkatarsak',
  '/category/referenciak',
  '/author/papajcsikaron',
];

const goneRewrites = GONE_PATHS.flatMap((source) => [
  { source, destination: '/api/gone' },
  ...(source.endsWith('/') ? [] : [{ source: `${source}/`, destination: '/api/gone' }]),
]);

const rules = [];

// Reference detail pages: ref1, ref3–ref35 (ref2 never existed)
for (let n = 1; n <= 35; n++) {
  if (n === 2) continue;
  rules.push(...permanent(`/ref${n}`, '/referenciak'));
}

// Staff bios + thin listing → /rolunk
for (const slug of [
  'riz-adam-cmc',
  'biro-gabriella',
  'duleba-marianna',
  'soos-andrea',
  'szoke-adam',
  'munkatarsaink',
  'csapatunk',
  'magunkrol',
]) {
  rules.push(...permanent(`/${slug}`, '/rolunk'));
}

// Primary legacy slugs
for (const [from, to] of [
  ['/fooldal', '/'],
  ['/fooldal-2-2', '/'],
  ['/szolgaltatasaink', '/tanacsadas'],
  ['/szolgaltatasok', '/tanacsadas'],
  ['/felnottkepzesek', '/felnottkepzes'],
  ['/referenciaink', '/referenciak'],
  ['/referenciaink-2', '/referenciak'],
  ['/kapcsolatok', '/kapcsolat'],
  ['/ginop-plusz-3-2-1-21', '/palyazatok'],
  ['/aktualis-ginop-es-vekop-palyazatok', '/palyazatok'],
  ['/rolunk-mondtak', '/referenciak'],
  ['/impresszum', '/jogi/impresszum'],
  ['/adatvedelem', '/jogi/adatvedelem'],
  ['/tajekoztato-cookie-k-hasznalatarol', '/jogi/cookie'],
  ['/sikeres-kuldes', '/kapcsolat?submitted=1'],
]) {
  rules.push(...permanent(from, to));
}

// Contact sub-pages
for (const slug of [
  'kapcsolat-ugyfelszolgalat',
  'kapcsolat-irodaink',
  'kapcsolat-telefon',
  'kapcsolat-felnottkepzes',
]) {
  rules.push(...permanent(`/kapcsolat/${slug}`, '/kapcsolat'));
}

// External product domains (no React routes)
for (const [from, dest] of [
  ['/empx', 'https://empx.hu/'],
  ['/empx-bevezeto', 'https://empx.hu/'],
]) {
  rules.push(...permanent(from, dest));
}

// PDF legacy paths (keep existing)
rules.push(
  ...permanent(
    '/wp-content/uploads/2025/03/Adatvedelmi_2025.pdf',
    '/assets/documents/Adatvedelmi_2025.pdf',
  ),
  ...permanent(
    '/wp-content/uploads/2018/08/GDPR_Kapcsolatok.pdf',
    '/assets/documents/GDPR_Kapcsolatok.pdf',
  ),
);

// Deduplicate by source
const seen = new Set();
const deduped = rules.filter((r) => {
  if (seen.has(r.source)) return false;
  seen.add(r.source);
  return true;
});

deduped.sort((a, b) => a.source.localeCompare(b.source));

for (const rule of deduped) {
  if (!rule.source || typeof rule.destination !== 'string' || !rule.destination) {
    throw new Error(`Invalid redirect rule: ${JSON.stringify(rule)}`);
  }
}

const prerenderRouteList = [...PRERENDER_ROUTES];

const prerenderRewrites = prerenderRouteList.map((route) => ({
  source: route,
  destination: `${route}/index.html`,
}));

const vercelConfig = {
  redirects: deduped,
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ],
    },
  ],
  rewrites: [
    ...goneRewrites,
    ...prerenderRewrites,
    {
      source: '/((?!assets/|api/).*)',
      destination: '/index.html',
    },
  ],
  functions: {
    'api/**/*.js': {
      memory: 128,
      maxDuration: 10,
    },
  },
};

const vercelJsonPath = path.join(rootDir, 'vercel.json');
const generatedPath = path.join(rootDir, 'vercel.redirects.generated.json');

fs.writeFileSync(vercelJsonPath, `${JSON.stringify(vercelConfig, null, 2)}\n`, 'utf8');
fs.writeFileSync(generatedPath, `${JSON.stringify(deduped, null, 2)}\n`, 'utf8');

// Cloudflare Workers static assets: public/_redirects (copied to dist/ by Vite)
// Only 301 redirects — no 200 rewrites (unsupported / causes infinite loops with /*).
const cloudflareRedirectLines = [
  '# Generated by scripts/generate-vercel-redirects.mjs — do not edit by hand',
  '# Legacy 301 redirects only. SPA + SEO prerender handled by worker/index.js + wrangler.jsonc.',
  ...deduped.map((rule) => `${rule.source} ${rule.destination} 301`),
];

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, '_redirects'), `${cloudflareRedirectLines.join('\n')}\n`, 'utf8');

// Cloudflare Pages: public/_headers
const cloudflareHeaders = `# Generated by scripts/generate-vercel-redirects.mjs — do not edit by hand
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
`;

fs.writeFileSync(path.join(publicDir, '_headers'), cloudflareHeaders, 'utf8');

console.log('Wrote', deduped.length, 'redirect rules to vercel.json');
console.log('Wrote public/_redirects and public/_headers for Cloudflare Workers static assets');
