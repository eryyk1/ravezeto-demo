import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceHtml = process.argv[2] ?? 'C:/Users/Erikk/Downloads/RAV-honlap.html';

const PAGE_MAP = [
  { iframe: 'if-fooldal', slug: 'fooldal', cssDir: 'home', cssFile: 'client-prototype.css' },
  { iframe: 'if-csapatunk', slug: 'csapatunk', cssDir: 'rolunk', cssFile: 'rolunk.css' },
  { iframe: 'if-tanacsadas', slug: 'tanacsadas', cssDir: 'tanacsadas', cssFile: 'tanacsadas.css' },
  { iframe: 'if-felnottkepzes', slug: 'felnottkepzes', cssDir: 'felnottkepzes', cssFile: 'felnottkepzes.css' },
  { iframe: 'if-referenciak', slug: 'referenciak', cssDir: 'referenciak', cssFile: 'referenciak.css' },
  { iframe: 'if-palyazatok', slug: 'palyazatok', cssDir: 'palyazatok', cssFile: 'palyazatok.css' },
  { iframe: 'if-kapcsolat', slug: 'kapcsolat', cssDir: 'kapcsolat', cssFile: 'kapcsolat.css' },
  { iframe: 'if-adatvedelem', slug: 'adatvedelem', cssDir: 'jogi', cssFile: 'jogi.css' },
  { iframe: 'if-impresszum', slug: 'impresszum', cssDir: 'jogi', cssFile: 'jogi-impresszum.css' },
];

const bundle = fs.readFileSync(sourceHtml, 'utf8');

function decodeEntities(value) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

function mimeToExt(mime) {
  if (mime === 'jpeg') return 'jpg';
  if (mime === 'png') return 'png';
  if (mime === 'svg+xml') return 'svg';
  if (mime === 'webp') return 'webp';
  return mime;
}

for (const page of PAGE_MAP) {
  const re = new RegExp(`<iframe id="${page.iframe}"[^>]*data-doc="([\\s\\S]*?)"><\\/iframe>`);
  const match = bundle.match(re);
  if (!match) {
    console.error(`Missing iframe: ${page.iframe}`);
    continue;
  }

  let doc = decodeEntities(match[1]);
  const refDir = path.join(root, 'client-reference');
  const imgDir = path.join(root, 'public', 'assets', 'images', page.slug);
  fs.mkdirSync(imgDir, { recursive: true });

  let imageIndex = 0;
  doc = doc.replace(/src="(data:image\/([^;]+);base64,([^"]+))"/g, (_full, _dataUrl, mime, base64) => {
    imageIndex += 1;
    const ext = mimeToExt(mime);
    const filename = `img-${String(imageIndex).padStart(2, '0')}.${ext}`;
    fs.writeFileSync(path.join(imgDir, filename), Buffer.from(base64, 'base64'));
    return `src="/assets/images/${page.slug}/${filename}"`;
  });

  const styleMatch = doc.match(/<style>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    const cssPath = path.join(root, 'src', 'pages', page.cssDir, page.cssFile);
    fs.mkdirSync(path.dirname(cssPath), { recursive: true });
    fs.writeFileSync(cssPath, styleMatch[1]);
  }

  const bodyMatch = doc.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  if (!bodyMatch) {
    console.error(`No body in ${page.slug}`);
    continue;
  }

  let body = bodyMatch[1];
  const scripts = [...body.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1].trim());
  body = body.replace(/<script[\s\S]*?<\/script>/g, '');
  body = body.replace(/<header[\s\S]*?<\/header>/, '');
  body = body.replace(/<div class="mmenu"[\s\S]*?<\/div>\s*\n\s*\n/, '');
  body = body.replace(/<svg width="0"[\s\S]*?<\/svg>\s*\n\s*\n/, '');

  fs.writeFileSync(path.join(refDir, `${page.slug}.body.html`), body.trim());
  fs.writeFileSync(path.join(refDir, `${page.slug}.html`), doc);
  if (scripts.length) {
    fs.writeFileSync(path.join(refDir, `${page.slug}.scripts.js`), scripts.join('\n\n// ---\n\n'));
  }

  console.log(`${page.slug}: ${doc.length} chars, ${imageIndex} images, ${scripts.length} scripts`);
}
