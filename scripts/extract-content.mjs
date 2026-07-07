import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKUP_ROOT = path.resolve(__dirname, '../..');
const SQL_FILE = path.join(BACKUP_ROOT, 'ravezeto.hu_wpvivid-62f3de7a6aed8_2026-07-06-10-38_backup_db.sql');
const UPLOADS_DIR = path.join(BACKUP_ROOT, 'uploads');
const OUT_DIR = path.resolve(__dirname, '../src/data');
const INVENTORY_FILE = path.resolve(__dirname, '../CONTENT_INVENTORY.md');

function parseInsertValues(line) {
  const match = line.match(/INSERT INTO `wp_posts` VALUES \((.+)\);?\s*$/);
  if (!match) return null;

  const values = [];
  let current = '';
  let inString = false;
  let escaped = false;

  for (let i = 0; i < match[1].length; i++) {
    const ch = match[1][i];
    if (escaped) {
      current += ch;
      escaped = false;
      continue;
    }
    if (ch === '\\') {
      current += ch;
      escaped = true;
      continue;
    }
    if (ch === "'") {
      inString = !inString;
      current += ch;
      continue;
    }
    if (ch === ',' && !inString) {
      values.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  if (current) values.push(current.trim());

  const unquote = (v) => {
    if (v === 'NULL') return null;
    if (v.startsWith("'") && v.endsWith("'")) {
      return v.slice(1, -1).replace(/\\'/g, "'").replace(/\\n/g, '\n').replace(/\\r/g, '\r');
    }
    return v;
  };

  if (values.length < 22) return null;

  return {
    id: parseInt(values[0], 10),
    postAuthor: unquote(values[1]),
    postDate: unquote(values[2]),
    postContent: unquote(values[4]),
    postTitle: unquote(values[5]),
    postStatus: unquote(values[7]),
    postName: unquote(values[11]),
    postParent: parseInt(values[17], 10) || 0,
    guid: unquote(values[18]),
    menuOrder: parseInt(values[19], 10) || 0,
    postType: unquote(values[20]),
  };
}

function stripHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#038;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function collectUploads(dir, base = '') {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectUploads(full, rel));
    } else if (/\.(svg|jpg|jpeg|png|gif|webp)$/i.test(entry.name)) {
      const stat = fs.statSync(full);
      results.push({ path: rel.replace(/\\/g, '/'), size: stat.size, ext: path.extname(entry.name).toLowerCase() });
    }
  }
  return results;
}

const sql = fs.readFileSync(SQL_FILE, 'utf8');
const lines = sql.split('\n');
const posts = [];

for (const line of lines) {
  if (!line.startsWith('INSERT INTO `wp_posts`')) continue;
  const parsed = parseInsertValues(line);
  if (parsed && parsed.postStatus === 'publish') posts.push(parsed);
}

const pages = posts.filter((p) => p.postType === 'page');
const colleagues = posts.filter((p) => p.postType === 'colleagues');
const logos = posts.filter((p) => p.postType === 'logos');
const attachments = posts.filter((p) => p.postType === 'attachment' && p.postContent === '');

const mainPages = pages.filter((p) =>
  ['fooldal', 'csapatunk', 'tanacsadas', 'felnottkepzesek', 'szolgaltatasok', 'palyazatok', 'referenciaink', 'mentally', 'kapcsolatok', 'magunkrol', 'csr', 'impresszum'].includes(p.postName)
);

const uploads = collectUploads(UPLOADS_DIR);

const siteContent = {
  company: {
    name: 'RÁvezető Projekt Kft.',
    tagline: 'Változásokat vezetünk, együtt!',
    address: '1146 Budapest, Izsó u. 7. 1/3.',
    phone: '+36 70/513 4128',
    email: 'info@ravezeto.hu',
    website: 'www.ravezeto.hu',
    trainingReg: 'Felnőttképzési nyilvántartási számunk: E-000362/2014',
    facebook: 'https://www.facebook.com/profile.php?id=100063907730525',
  },
  navigation: [
    { label: 'Főoldal', path: '/' },
    { label: 'Csapatunk', path: '/csapatunk' },
    { label: 'Tanácsadás', path: '/tanacsadas' },
    { label: 'Felnőttképzés', path: '/felnottkepzesek' },
    { label: 'Szolgáltatásaink', path: '/szolgaltatasok' },
    { label: 'Pályázatok', path: '/palyazatok' },
    { label: 'Referenciák', path: '/referenciaink' },
    { label: 'Mentally', path: '/mentally' },
    { label: 'Kapcsolat', path: '/kapcsolatok' },
  ],
  home: {
    hero: 'Változásokat vezetünk, együtt!',
    quote: {
      text: '"Az optimizmus az igazi erkölcsi bátorság"',
      author: 'Ernest Shackleton',
      context: 'A fenti idézet az egyik kedvencünk a híres felfedezőtől, aki a lehetetlennel dacolva 120 éve megmentette legénységét a jég és fagy fogságából.',
    },
    sections: [
      {
        title: 'Csapatunk',
        text: 'Vezetési tanácsadók vagyunk, problémákat oldunk meg, közösen hajlítjuk a teret, alakítjuk az egészségesebb vállalati jövőt.',
        link: '/csapatunk',
      },
      {
        title: 'Tanácsadás',
        text: 'Egyetlen szervezetfejlesztés sem lehet sikeres a változást támogató vezetők és munkatársak nélkül. Ezt az emberközpontú megközelítést garantáljuk minden, általunk vezetett tanácsadási folyamatban.',
        link: '/tanacsadas',
      },
      {
        title: 'Felnőttképzés',
        text: 'Minőségi képzéseink segítségével fejlesztjük a XXI. század munkahelyi kulcskompetenciáit, vezetőknek, munkatársaknak. Az év trénerei is nálunk dolgoznak.',
        link: '/felnottkepzesek',
      },
    ],
    reasons: [
      { title: 'LEVEZETJÜK ÖNNEK, MI A VALÓDI PROBLÉMA', text: 'Megmutatjuk, hogy miért szükséges változtatni, a profi szervezeti diagnózis biztosítja, hogy stabil alapokról induljon a változás.' },
      { title: 'ÁTVEZETJÜK A NEHÉZSÉGEKEN', text: 'Minőségi szakembereink segítségével a változtatási folyamatban törvényszerű elbizonytalanodás fázisát gyorsan meghaladjuk.' },
      { title: 'VÉGIGVEZETJÜK ÜGYFELEINKET', text: 'a teljes változtatási folyamaton, nem hagyjuk magára a tulajdonosokat, vezetőket, támogatjuk a kritikus döntéseket a projekt minden szakaszában.' },
      { title: 'RÁVEZETJÜK A MEGOLDÁSRA', text: 'amely a siker felé viszi, a sablonos tuti megmondás helyett közös megoldásokat alkotunk.' },
      { title: 'KIVEZETJÜK A KRÍZISBŐL', text: 'Sokszor a kudarctól való félelem akadályozza meg az újítást. Ha már versenyhátrányban van, ha lemaradt, támogatjuk a kilábalásban.' },
      { title: 'TOVÁBBVEZETJÜK A FEJLŐDÉS ÚTJÁN', text: 'Minden vállalat esetében előre tekintünk, nemcsak a rövidtávú szempontokat vizsgáljuk, erős csapat nélkül nem működnek sem folyamatok, sem rendszerek.' },
    ],
    stats: [
      '16 ÉV TANÁCSADÓI TAPASZTALAT',
      'TÖBB MINT 400 TANÁCSADÁSI PROJEKT',
      'TÖBB MINT 200 ELÉGEDETT, VISSZATÉRŐ ÜGYFÉL',
      'TÖBB MINT 250 KÉPZÉSI PROJEKT 10 ÉVE FELNŐTTKÉPZŐ INTÉZMÉNYKÉNT',
      'TÖBB MINT 3500 RÉSZTVEVŐ A KÉPZÉSEINKEN',
      'TÖBB MINT 200 EGYÜTTMŰKÖDŐ TANÁCSADÓ',
    ],
    palyazatIntro: 'Fejlesszük közösen vállalatát pályázati forrásokból! A Rávezető minősített szervezetfejlesztő és képzési szolgáltatóként számtalan vállalati kihívásban tud segíteni Önnek.',
  },
  colleagues: colleagues
    .sort((a, b) => a.menuOrder - b.menuOrder)
    .map((c) => ({
      id: c.id,
      name: c.postTitle,
      slug: c.postName,
      bio: stripHtml(c.postContent),
    })),
  logos: logos.map((l) => ({ id: l.id, name: l.postTitle, slug: l.postName })),
  pages: Object.fromEntries(
    mainPages.map((p) => [
      p.postName,
      {
        id: p.id,
        title: p.postTitle,
        slug: p.postName,
        content: stripHtml(p.postContent),
        rawContent: p.postContent,
      },
    ])
  ),
  uploadsAvailable: uploads,
  uploadsMissingNote: 'A backup uploads mappa csak SVG illusztrációkat tartalmaz. A JPG/PNG médiafájlok (portrék, logók) a WPvivid zip csomagban vannak, de nem kerültek kicsomagolásra.',
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'siteContent.json'), JSON.stringify(siteContent, null, 2));

const inventory = `# Rávezető – Content Inventory

> Generated from read-only WordPress backup analysis  
> Source: \`ravezeto.hu_wpvivid-62f3de7a6aed8_2026-07-06-10-38_backup_db.sql\`  
> Date: ${new Date().toISOString().split('T')[0]}

## Backup Overview

| Item | Value |
|------|-------|
| WordPress version | 6.8.5 |
| PHP version | 8.4.22 |
| MySQL version | 10.6.27 |
| Active theme | RavezetoNewTheme |
| Uploads in backup | ${uploads.length} files (${uploads.filter((u) => u.ext === '.svg').length} SVG) |

## Site Navigation (Main Menu)

${siteContent.navigation.map((n) => `- **${n.label}** → \`${n.path}\``).join('\n')}

## Published Pages (${pages.length} total, ${mainPages.length} primary)

| ID | Title | Slug |
|----|-------|------|
${mainPages.map((p) => `| ${p.id} | ${p.postTitle} | ${p.postName} |`).join('\n')}

## Team Members / Colleagues (${colleagues.length})

| Name | Slug |
|------|------|
${colleagues.sort((a, b) => a.menuOrder - b.menuOrder).map((c) => `| ${c.postTitle} | ${c.postName} |`).join('\n')}

## Reference Logos (${logos.length} published)

${logos.map((l) => `- ${l.postTitle} (\`${l.postName}\`)`).join('\n')}

## Contact Information

- **Company:** ${siteContent.company.name}
- **Address:** ${siteContent.company.address}
- **Phone:** ${siteContent.company.phone}
- **Email:** ${siteContent.company.email}
- **Training registration:** ${siteContent.company.trainingReg}

## Uploads Folder Analysis

### Available locally (${uploads.length} files)

${uploads.map((u) => `- \`uploads/${u.path}\` (${u.ext}, ${Math.round(u.size / 1024)} KB)`).join('\n')}

### Referenced in SQL but NOT in local uploads

The following image types are referenced in the database but the JPG/PNG files are not present in the extracted uploads folder (likely in the WPvivid zip archive \`ravezeto.hu_wpvivid-*_backup_uploads.part001.zip\`):

- Team portraits (e.g. \`2016/06/portrait_biro_gabriella.jpg\`, \`2017/01/Riz-Adam.jpg\`)
- Client logos (e.g. \`2023/01/OE.jpg\`, \`2023/01/tszc.jpg\`)
- Banner images (e.g. \`2024/12/esba.jpg\`)

## Homepage Content Sections

1. Hero: "${siteContent.home.hero}"
2. Quote: ${siteContent.home.quote.text} – ${siteContent.home.quote.author}
3. Csapatunk, Tanácsadás, Felnőttképzés sections
4. 6 reasons to choose Rávezető
5. Pályázatok section
6. Statistics (16 years, 400+ projects, etc.)
7. Referenciák, Mentally, Kapcsolat sections

## Theme Templates (reference)

- \`front-page.php\` – Homepage layout
- \`template-csapatunk.php\` – Team page
- \`template-tanacsadas.php\` – Consulting
- \`template-felnottkepzes.php\` – Adult education
- \`template-szolgaltatasaink.php\` – Services
- \`template-palyazatok.php\` – Grants
- \`template-referenciak.php\` – References
- \`template-mentally.php\` – Mentally product
- \`template_kapcsolatok.php\` – Contact
`;

fs.writeFileSync(INVENTORY_FILE, inventory);

console.log('Content inventory written to CONTENT_INVENTORY.md');
console.log('Site content JSON written to src/data/siteContent.json');
console.log(`Pages: ${pages.length}, Colleagues: ${colleagues.length}, Logos: ${logos.length}, Uploads: ${uploads.length}`);
