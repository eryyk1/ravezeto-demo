import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const adatPath =
  process.argv[2] ??
  path.join(process.env.USERPROFILE ?? '', 'Downloads', 'final-adatvedelem.html');
const storedPath = path.join(root, 'src/content/jogi/defaultAdatvedelemBody.html');
const leadPath = path.join(root, 'src/content/jogi/defaultAdatvedelemLead.txt');

function extractBody(html) {
  const gridIdx = html.indexOf('class="lgrid"');
  if (gridIdx < 0) throw new Error('no lgrid');
  const gridOpen = html.lastIndexOf('<div', gridIdx);
  const gridClose = html.indexOf('</section>', gridIdx);
  let body = html.slice(gridOpen, gridClose);
  body = body.replace(/^<div class="lgrid">/, '').replace(/<\/div>\s*$/, '').trim();
  return body
    .replace(/final-adatvedelem\.html/g, '/jogi/adatvedelem')
    .replace(/final-impresszum\.html/g, '/jogi/impresszum');
}

function extractLead(html) {
  const m = html.match(/<p class="hlead">([\s\S]*?)<\/p>/);
  return m ? m[1].trim() : '';
}

const html = fs.readFileSync(adatPath, 'utf8');
const expectedBody = extractBody(html);
const expectedLead = extractLead(html);
const storedBody = fs.readFileSync(storedPath, 'utf8');
const storedLead = fs.readFileSync(leadPath, 'utf8').trim();

const bodyOk = expectedBody === storedBody;
const leadOk = expectedLead === storedLead;
console.log('Source:', adatPath);
console.log('Body match:', bodyOk, 'length', storedBody.length);
console.log('Lead match:', leadOk);
if (!bodyOk || !leadOk) process.exit(1);
console.log('OK');
