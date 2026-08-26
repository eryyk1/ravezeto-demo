import fs from 'node:fs';
import path from 'node:path';

const src = 'c:/Users/Erikk/Downloads/RAV-honlap-velemenyezes (1).html';
const html = fs.readFileSync(src, 'utf8');
const outDir = path.join(process.cwd(), 'client-reference');
fs.mkdirSync(outDir, { recursive: true });

const re = /iframe id="if-([^"]+)"[^>]*data-doc="([^"]+)"/g;
let m;
while ((m = re.exec(html)) !== null) {
  const slug = m[1];
  const decoded = m[2]
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
  fs.writeFileSync(path.join(outDir, `${slug}.html`), decoded);
  console.log(slug, decoded.length);
}
