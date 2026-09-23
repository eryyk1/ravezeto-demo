import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = JSON.parse(fs.readFileSync(path.join(root, 'dist/cms/published.json'), 'utf8'));
const adat = pub.published.jogiAdatvedelem.bodyHtml;
const imp = pub.published.jogiImpresszum.bodyHtml;
const img = path.join(root, 'dist/assets/images/csapatunk/img-02.jpg');
const cssFiles = fs.readdirSync(path.join(root, 'dist/assets')).filter((f) => f.endsWith('.css'));
const css = fs.readFileSync(path.join(root, 'dist/assets', cssFiles[0]), 'utf8');

console.log('defaultsRevision', pub.defaultsRevision);
console.log('adatvedelem bodyHtml length', adat.length);
console.log('adat has section f12', adat.includes('id="f12"'));
console.log('impressum bodyHtml length', imp.length);
console.log('hero img-02.jpg bytes', fs.statSync(img).size);
console.log('main CSS has rolunk hero filter:none', /rolunk-page.*hero-sub.*team-photo.*filter:none/i.test(css.replace(/\s/g, '')));
