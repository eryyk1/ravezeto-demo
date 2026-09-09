/**
 * Generates redirect rules for vercel.json from MI-Térkép handover (adapted to React routes).
 *
 * Routing decisions (confirmed):
 * - /mentally stays on-site (NO external 301 to mentally.team)
 * - /referenciaink → /referenciak, /csapatunk → /rolunk (canonical React paths)
 */
import fs from 'node:fs';

const permanent = (source, destination) => [
  { source, destination, permanent: true },
  ...(source.endsWith('/') ? [] : [{ source: `${source}/`, destination, permanent: true }]),
];

const gone = (source) => [
  { source, statusCode: 410 },
  ...(source.endsWith('/') ? [] : [{ source: `${source}/`, statusCode: 410 }]),
];

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

// 410 Gone — test, spam, taxonomy
for (const path of [
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
]) {
  rules.push(...gone(path));
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

const out = new URL('../vercel.redirects.generated.json', import.meta.url);
fs.writeFileSync(out, JSON.stringify(deduped, null, 2), 'utf8');
console.log('Wrote', deduped.length, 'redirect rules to', out.pathname);
