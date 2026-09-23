import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const impPath = process.argv[2] ?? 'C:/Users/Erikk/Downloads/final-impresszum.html';
const adatPath = process.argv[3] ?? 'C:/Users/Erikk/Downloads/final-adatvedelem.html';
const genPath = path.join(root, 'src/content/jogi/jogiContent.generated.ts');

const impHtml = fs.readFileSync(impPath, 'utf8');
const adatHtml = fs.readFileSync(adatPath, 'utf8');
const gen = fs.readFileSync(genPath, 'utf8');

function extractImpressum(html) {
  const impressumStart = html.indexOf('class="legal"');
  const impressumOpen = html.lastIndexOf('<div', impressumStart);
  const impressumClose = html.indexOf('</section>', impressumStart);
  let body = html.slice(impressumOpen, impressumClose);
  body = body.replace(/^<div class="legal">/, '').replace(/<\/div>\s*$/, '').trim();
  return body
    .replace(/final-adatvedelem\.html/g, '/jogi/adatvedelem')
    .replace(/final-impresszum\.html/g, '/jogi/impresszum');
}

function extractAdat(html) {
  const gridIdx = html.indexOf('class="lgrid"');
  const gridOpen = html.lastIndexOf('<div', gridIdx);
  const gridClose = html.indexOf('</section>', gridIdx);
  let body = html.slice(gridOpen, gridClose);
  body = body.replace(/^<div class="lgrid">/, '').replace(/<\/div>\s*$/, '').trim();
  return body
    .replace(/final-adatvedelem\.html/g, '/jogi/adatvedelem')
    .replace(/final-impresszum\.html/g, '/jogi/impresszum');
}

const impMatch = gen.match(/defaultImpressumBodyHtml = ([\s\S]*?);\r?\nexport const defaultAdatvedelemBodyHtml/);
const adatMatch = gen.match(/defaultAdatvedelemBodyHtml = ([\s\S]*?);\r?\nexport const defaultAdatvedelemHeroLead/);
const storedImp = JSON.parse(impMatch[1]);
const storedAdat = JSON.parse(adatMatch[1]);
const expectedImp = extractImpressum(impHtml);
const expectedAdat = extractAdat(adatHtml);

console.log('impressum equal:', storedImp === expectedImp, 'len', storedImp.length);
console.log('adatvedelem equal:', storedAdat === expectedAdat, 'len', storedAdat.length);
if (storedImp !== expectedImp) {
  console.error('IMPRESSUM MISMATCH');
  process.exit(1);
}
if (storedAdat !== expectedAdat) {
  console.error('ADATVEDELEM MISMATCH');
  process.exit(1);
}
console.log('OK: generated matches source extraction');
