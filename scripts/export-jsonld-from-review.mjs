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

const outDir = new URL('../docs/review-extract/', import.meta.url);
fs.mkdirSync(outDir, { recursive: true });

for (let i = 0; i < docMatches.length; i++) {
  const id = idMatches[i] ?? `page-${i}`;
  const decoded = docMatches[i];
  const blocks = [...decoded.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) =>
    m[1].trim(),
  );
  if (blocks.length) {
    fs.writeFileSync(new URL(`${id}.jsonld`, outDir), blocks.join('\n\n---\n\n'), 'utf8');
    console.log(id, blocks.length, 'blocks');
  }
}
