import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const sourceHtml =
  process.argv[2] ?? path.join(process.env.USERPROFILE ?? '', 'Downloads', 'final-felnottkepzes.html');

const html = fs.readFileSync(sourceHtml, 'utf8');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) {
  console.error('No <style> block found');
  process.exit(1);
}

let css = styleMatch[1];

// Drop standalone-page chrome (site uses ClientHeader).
css = css.replace(/\/\* NAV[\s\S]*?(?=\/\* HERO)/, '');
css = css.replace(/\/\* Mobil menü[\s\S]*?(?=\/\* Rajzolt akcentus)/, '');

css = css.replace(/\bbody::after/g, '.page-felnottkepzes::after');
css = css.replace(/\bbody\.mopen[\s\S]*?\{[^}]*\}/g, '');
css = css.replace(/^body\{/m, '.page-felnottkepzes{');
css = css.replace(/^html\{/m, '/* html scroll on document */ html{');
css = css.replace(/^\*\{[^}]+\}/m, '.page-felnottkepzes,.page-felnottkepzes *{box-sizing:border-box}');
css = css.replace(/^h1,h2,h3,\.btn\{/m, '.page-felnottkepzes h1,.page-felnottkepzes h2,.page-felnottkepzes h3,.page-felnottkepzes .btn{');
css = css.replace(/^a\{/m, '.page-felnottkepzes a{');
css = css.replace(/^img\{/m, '.page-felnottkepzes img{');

const scoped = `/* Extracted from final-felnottkepzes.html — page shell */\n.page-felnottkepzes{position:relative;min-height:100%;background:var(--bg);color:var(--ink);font-family:'Mulish',sans-serif;font-size:1.0625rem;line-height:1.7;hyphens:none}\n.page-felnottkepzes h1,.page-felnottkepzes h2,.page-felnottkepzes h3,.page-felnottkepzes .btn{font-family:'Urbanist',sans-serif;hyphens:none}\n.page-felnottkepzes img{max-width:100%}\n\n${css}`;

const cssOut = path.join(root, 'src', 'pages', 'felnottkepzes', 'felnottkepzes.css');
fs.writeFileSync(cssOut, scoped);

let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (!bodyMatch) {
  console.error('No body found');
  process.exit(1);
}

let body = bodyMatch[1];
body = body.replace(/<script[\s\S]*?<\/script>/g, '');
body = body.replace(/<header[\s\S]*?<\/header>/, '');
body = body.replace(/<div class="mmenu"[\s\S]*?<\/div>\s*\n\s*\n/, '');
body = body.replace(/<svg width="0"[\s\S]*?<\/svg>\s*\n\s*\n/, '');
body = body.replace(/src="assets\//g, 'src="/assets/images/felnottkepzes/');
body = body.replace(/src="assets\/logo-ravezeto\.svg"/g, 'src="/assets/logo-ravezeto.svg"');

const refDir = path.join(root, 'client-reference');
fs.mkdirSync(refDir, { recursive: true });
fs.writeFileSync(path.join(refDir, 'felnottkepzes-final.body.html'), body.trim());

const imgDir = path.join(root, 'public', 'assets', 'images', 'felnottkepzes');
fs.mkdirSync(imgDir, { recursive: true });

const htmlDir = path.dirname(sourceHtml);
const assetNames = [
  'fk-terem.png',
  'fk-kommunikacio.png',
  'fk-vezetoi.png',
  'fk-generaciok.png',
  'fk-stressz.png',
];
const legacyMap = {
  'fk-terem.png': 'img-02.jpg',
  'fk-kommunikacio.png': 'img-03.jpg',
  'fk-vezetoi.png': 'img-04.jpg',
  'fk-generaciok.png': 'img-05.jpg',
  'fk-stressz.png': 'img-06.jpg',
};

for (const name of assetNames) {
  const dest = path.join(imgDir, name);
  const fromHtml = path.join(htmlDir, 'assets', name);
  const fromLegacy = path.join(imgDir, legacyMap[name]);
  if (fs.existsSync(fromHtml)) {
    fs.copyFileSync(fromHtml, dest);
    console.log(`Copied ${name} from HTML assets folder`);
  } else if (fs.existsSync(fromLegacy)) {
    fs.copyFileSync(fromLegacy, dest);
    console.log(`Created ${name} from ${legacyMap[name]} (RAV extract sketch)`);
  } else {
    console.warn(`Missing source for ${name}`);
  }
}

console.log(`Wrote ${cssOut} and client-reference/felnottkepzes-final.body.html`);
