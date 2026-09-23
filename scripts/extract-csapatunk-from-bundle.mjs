import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceHtml =
  process.argv[2] ??
  path.join(process.env.USERPROFILE ?? '', 'Downloads', 'RAV-honlap-velemenyezes (2).html');

const outDir = path.join(root, 'client-reference');
const imgDir = path.join(root, 'public', 'assets', 'images', 'csapatunk');

const bundle = fs.readFileSync(sourceHtml, 'utf8');
const match = bundle.match(/<iframe id="if-csapatunk"[^>]*data-doc="([\s\S]*?)"><\/iframe>/);
if (!match) {
  console.error('Missing if-csapatunk iframe in', sourceHtml);
  process.exit(1);
}

let doc = match[1]
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, '&');

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(imgDir, { recursive: true });

function mimeToExt(mime) {
  if (mime === 'jpeg') return 'jpg';
  if (mime === 'png') return 'png';
  if (mime === 'svg+xml') return 'svg';
  if (mime === 'webp') return 'webp';
  return mime;
}

let imageIndex = 0;
doc = doc.replace(/src="(data:image\/([^;]+);base64,([^"]+))"/g, (_full, _dataUrl, mime, base64) => {
  imageIndex += 1;
  const ext = mimeToExt(mime);
  const filename = `img-${String(imageIndex).padStart(2, '0')}.${ext}`;
  fs.writeFileSync(path.join(imgDir, filename), Buffer.from(base64, 'base64'));
  return `src="/assets/images/csapatunk/${filename}"`;
});

fs.writeFileSync(path.join(outDir, 'csapatunk.html'), doc);

const styleMatch = doc.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  fs.writeFileSync(path.join(outDir, 'csapatunk.styles.css'), styleMatch[1].trim());
}

const bodyMatch = doc.match(/<body>([\s\S]*?)<\/body>/);
if (bodyMatch) {
  let body = bodyMatch[1];
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<header[\s\S]*?<\/header>/i, '');
  body = body.replace(/<div class="mmenu"[\s\S]*?<\/div>\s*/i, '');
  body = body.replace(/<svg width="0"[\s\S]*?<\/svg>\s*/i, '');
  fs.writeFileSync(path.join(outDir, 'csapatunk.body.html'), body.trim());
}

console.log(`Source: ${sourceHtml}`);
console.log(`Wrote ${imageIndex} images to ${imgDir}`);
console.log(`Wrote ${path.join(outDir, 'csapatunk.html')}`);
