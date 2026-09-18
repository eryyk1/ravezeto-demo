import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceHtml =
  process.argv[2] ?? path.join(process.env.USERPROFILE ?? '', 'Downloads', 'RAV-honlap.html');

const bundle = fs.readFileSync(sourceHtml, 'utf8');
const match = bundle.match(/<iframe id="if-referenciak"[^>]*data-doc="([\s\S]*?)"><\/iframe>/);
if (!match) {
  console.error('Missing if-referenciak iframe in', sourceHtml);
  process.exit(1);
}

let doc = match[1]
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&amp;/g, '&');

const imgDir = path.join(root, 'public', 'assets', 'images', 'referenciak');
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
  return `src="/assets/images/referenciak/${filename}"`;
});

console.log(`Wrote ${imageIndex} images to ${imgDir}`);
