import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceHtml = process.argv[2] ?? 'C:/Users/Erikk/Downloads/RAV-honlap.html';

const bundle = fs.readFileSync(sourceHtml, 'utf8');
const match = bundle.match(/<iframe id="if-felnottkepzes"[^>]*data-doc="([\s\S]*?)"><\/iframe>/);
if (!match) {
  console.error('if-felnottkepzes iframe not found');
  process.exit(1);
}

function decodeEntities(value) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

let doc = decodeEntities(match[1]);
const refDir = path.join(root, 'client-reference');
const imgDir = path.join(root, 'public', 'assets', 'images', 'felnottkepzes');

fs.mkdirSync(imgDir, { recursive: true });

let imageIndex = 0;
doc = doc.replace(/src="(data:image\/([^;]+);base64,([^"]+))"/g, (_full, _dataUrl, mime, base64) => {
  imageIndex += 1;
  const ext =
    mime === 'jpeg' ? 'jpg' : mime === 'png' ? 'png' : mime === 'svg+xml' ? 'svg' : mime;
  const filename = `photo-${String(imageIndex).padStart(2, '0')}.${ext}`;
  fs.writeFileSync(path.join(imgDir, filename), Buffer.from(base64, 'base64'));
  return `src="/assets/images/felnottkepzes/${filename}"`;
});

const styleMatch = doc.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
  fs.writeFileSync(path.join(root, 'src', 'pages', 'felnottkepzes', 'felnottkepzes.css'), styleMatch[1]);
}

const bodyMatch = doc.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
  console.error('body not found');
  process.exit(1);
}

let body = bodyMatch[1];
body = body.replace(/<script[\s\S]*?<\/script>/g, '');
body = body.replace(/<header[\s\S]*?<\/header>/, '');
body = body.replace(/<div class="mmenu"[\s\S]*?<\/div>\s*\n\s*\n/, '');
body = body.replace(/<svg width="0"[\s\S]*?<\/svg>\s*\n\s*\n/, '');

fs.writeFileSync(path.join(refDir, 'felnottkepzes.body.html'), body.trim());
fs.writeFileSync(path.join(refDir, 'felnottkepzes.html'), doc);

console.log(`Extracted felnottkepzes (${doc.length} chars), ${imageIndex} images`);
