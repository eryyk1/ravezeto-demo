import fs from 'node:fs';

const path = String.raw`c:\Users\Erikk\Downloads\RAV-honlap-velemenyezes (2).html`;
const content = fs.readFileSync(path, 'utf8');

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

const docMatches = [...content.matchAll(/data-doc="([^"]+)"/g)].map((m) => decodeEntities(m[1]));
const idMatches = [...content.matchAll(/id="if-([^"]+)"/g)].map((m) => m[1]);

console.log('docs:', docMatches.length, 'ids:', idMatches.length);

for (let i = 0; i < docMatches.length; i++) {
  const decoded = docMatches[i];
  const id = idMatches[i] ?? `page-${i}`;
  const pick = (re) => decoded.match(re)?.[1] ?? null;
  const title = pick(/<title>([^<]+)<\/title>/);
  const desc = pick(/<meta name="description" content="([^"]+)"/);
  const canon = pick(/<link rel="canonical" href="([^"]+)"/);
  const ogTitle = pick(/<meta property="og:title" content="([^"]+)"/);
  const ogDesc = pick(/<meta property="og:description" content="([^"]+)"/);
  const ogUrl = pick(/<meta property="og:url" content="([^"]+)"/);
  const ogImg = pick(/<meta property="og:image" content="([^"]+)"/);
  const h1s = [...decoded.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  );
  const jsonLd = [...decoded.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => m[1].trim().slice(0, 200),
  );

  console.log('\n===', id, '===');
  console.log('title:', title);
  console.log('description:', desc);
  console.log('canonical:', canon);
  console.log('og:title:', ogTitle);
  console.log('og:description:', ogDesc);
  console.log('og:url:', ogUrl);
  console.log('og:image:', ogImg);
  console.log('h1 count:', h1s.length, h1s);
  console.log('json-ld blocks:', jsonLd.length);
  if (jsonLd[0]) console.log('json-ld sample:', jsonLd[0]);

  const fullJsonLd = [...decoded.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => m[1].trim(),
  );
  for (const block of fullJsonLd) {
    console.log('--- full json-ld ---');
    console.log(block.slice(0, 1500));
  }
}
