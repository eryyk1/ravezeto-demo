/**
 * Full backup content extraction — read-only analysis script.
 * Outputs: docs/CONTENT_INVENTORY.json + docs/CONTENT_INVENTORY.md
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '..');
const BACKUP = path.resolve(PROJECT, '..');
const SQL_FILE = path.join(BACKUP, 'ravezeto.hu_wpvivid-62f3de7a6aed8_2026-07-06-10-38_backup_db.sql');
const UPLOADS = path.join(BACKUP, 'uploads');
const THEME = path.join(BACKUP, 'themes', 'RavezetoNewTheme');
const OUT_JSON = path.join(PROJECT, 'docs', 'CONTENT_INVENTORY.json');
const OUT_MD = path.join(PROJECT, 'docs', 'CONTENT_INVENTORY.md');

function parseInsertValues(line) {
  const match = line.match(/INSERT INTO `wp_posts` VALUES \((.+)\);?\s*$/);
  if (!match) return null;
  const values = [];
  let current = '';
  let inString = false;
  let escaped = false;
  for (let i = 0; i < match[1].length; i++) {
    const ch = match[1][i];
    if (escaped) { current += ch; escaped = false; continue; }
    if (ch === '\\') { current += ch; escaped = true; continue; }
    if (ch === "'") { inString = !inString; current += ch; continue; }
    if (ch === ',' && !inString) { values.push(current.trim()); current = ''; continue; }
    current += ch;
  }
  if (current) values.push(current.trim());
  const unquote = (v) => {
    if (v === 'NULL') return null;
    if (v.startsWith("'") && v.endsWith("'")) {
      return v.slice(1, -1).replace(/\\'/g, "'").replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');
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
    postExcerpt: unquote(values[6]),
    postStatus: unquote(values[7]),
    postName: unquote(values[11]),
    postParent: parseInt(values[17], 10) || 0,
    guid: unquote(values[18]),
    menuOrder: parseInt(values[19], 10) || 0,
    postType: unquote(values[20]),
    mimeType: unquote(values[21]) || '',
  };
}

function parsePostmeta(line) {
  const m = line.match(/INSERT INTO `wp_postmeta` VALUES \((\d+),(\d+),'([^']*(?:''[^']*)*)','([^']*(?:''[^']*)*)'\)/);
  if (!m) return null;
  return {
    metaId: parseInt(m[1], 10),
    postId: parseInt(m[2], 10),
    metaKey: m[3].replace(/''/g, "'"),
    metaValue: m[4].replace(/''/g, "'"),
  };
}

function collectFiles(dir, base = '', exts = null) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectFiles(full, rel, exts));
    else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!exts || exts.includes(ext)) {
        const stat = fs.statSync(full);
        results.push({ path: rel.replace(/\\/g, '/'), ext, size: stat.size });
      }
    }
  }
  return results;
}

function extractThemeHardcoded() {
  const templates = [
    'front-page.php', 'template-csapatunk.php', 'template-tanacsadas.php',
    'template-felnottkepzes.php', 'template-szolgaltatasaink.php',
    'template-palyazatok.php', 'template-referenciak.php', 'template-mentally.php',
    'template_kapcsolatok.php', 'template-tarsadalmi-felelossegunk.php',
    'footer.php', 'header.php',
  ];
  const hardcoded = {};
  for (const t of templates) {
    const fp = path.join(THEME, t);
    if (fs.existsSync(fp)) hardcoded[t] = fs.readFileSync(fp, 'utf8');
  }
  return hardcoded;
}

const sql = fs.readFileSync(SQL_FILE, 'utf8');
const posts = [];
const postmeta = [];

for (const line of sql.split('\n')) {
  if (line.startsWith('INSERT INTO `wp_posts`')) {
    const p = parseInsertValues(line);
    if (p) posts.push(p);
  }
  if (line.startsWith('INSERT INTO `wp_postmeta`')) {
    const m = parsePostmeta(line);
    if (m) postmeta.push(m);
  }
}

const metaByPost = {};
for (const m of postmeta) {
  if (!metaByPost[m.postId]) metaByPost[m.postId] = {};
  metaByPost[m.postId][m.metaKey] = m.metaValue;
}

const published = posts.filter((p) => p.postStatus === 'publish');
const byType = {};
for (const p of published) {
  if (!byType[p.postType]) byType[p.postType] = [];
  byType[p.postType].push(p);
}

// Attach meta to posts
function enrichPost(p) {
  const meta = metaByPost[p.id] || {};
  const thumbId = meta._thumbnail_id;
  let thumbnail = null;
  if (thumbId) {
    const att = posts.find((x) => x.id === parseInt(thumbId, 10));
    if (att) {
      const attMeta = metaByPost[att.id] || {};
      thumbnail = attMeta._wp_attached_file || att.guid;
    }
  }
  return {
    id: p.id,
    title: p.postTitle,
    slug: p.postName,
    content: p.postContent,
    excerpt: p.postExcerpt,
    parent: p.postParent,
    menuOrder: p.menuOrder,
    date: p.postDate,
    guid: p.guid,
    mimeType: p.mimeType,
    meta: {
      thumbnail,
      palyazatPdf: meta.palyazat_pdf ? (metaByPost[parseInt(meta.palyazat_pdf, 10)]?._wp_attached_file || meta.palyazat_pdf) : null,
      attachedFile: meta._wp_attached_file || null,
    },
  };
}

// Menu items with linked pages
const menuItems = (byType.nav_menu_item || [])
  .map(enrichPost)
  .sort((a, b) => a.menuOrder - b.menuOrder);

for (const item of menuItems) {
  const meta = metaByPost[item.id] || {};
  item.menuMeta = {
    url: meta._menu_item_url,
    objectId: meta._menu_item_object_id,
    object: meta._menu_item_object,
    type: meta._menu_item_type,
    parent: meta._menu_item_menu_item_parent,
  };
  if (meta._menu_item_object_id) {
    const linked = posts.find((p) => p.id === parseInt(meta._menu_item_object_id, 10));
    if (linked) {
      item.linkedPage = { id: linked.id, title: linked.postTitle, slug: linked.postName, type: linked.postType };
    }
  }
}

// Attachments / documents
const attachments = (byType.attachment || []).map(enrichPost);
const pdfs = attachments.filter((a) => a.mimeType === 'application/pdf' || a.meta.attachedFile?.endsWith('.pdf'));
const images = attachments.filter((a) => a.mimeType?.startsWith('image/'));

// Uploads inventory
const allUploadFiles = collectFiles(UPLOADS);
const uploadImages = allUploadFiles.filter((f) => ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(f.ext));
const uploadPdfs = allUploadFiles.filter((f) => f.ext === '.pdf');

// Theme images
const themeImages = collectFiles(path.join(THEME, 'images'), 'theme/images', ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']);

const inventory = {
  generatedAt: new Date().toISOString(),
  source: {
    sql: path.basename(SQL_FILE),
    uploadsPath: 'uploads/',
    theme: 'RavezetoNewTheme',
    wpVersion: '6.8.5',
  },
  counts: {
    totalPosts: posts.length,
    publishedPosts: published.length,
    byType: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, v.length])),
    uploadFiles: allUploadFiles.length,
    uploadImages: uploadImages.length,
    uploadPdfs: uploadPdfs.length,
    themeImages: themeImages.length,
  },
  company: {
    name: 'RÁvezető Projekt Kft.',
    address: '1146 Budapest, Izsó u. 7. 1/3.',
    postalAddress: '1146 Budapest, Izsó u. 7. 1/3.',
    phone: '+36 70 513 4128',
    phoneAlt: '06 1 798 80 33',
    email: 'info@ravezeto.hu',
    website: 'www.ravezeto.hu',
    trainingReg: 'Felnőttképzési nyilvántartási számunk: E-000362/2014',
    facebook: 'https://www.facebook.com/profile.php?id=100063907730525',
    officeHours: 'H-P: 9.00-16.00',
    doorbell: '6. kapucsengő',
  },
  navigation: {
    menuName: 'Main Menu',
    items: menuItems,
  },
  pages: (byType.page || []).map(enrichPost).sort((a, b) => a.title.localeCompare(b.title, 'hu')),
  services: (byType.services || []).map(enrichPost).sort((a, b) => a.menuOrder - b.menuOrder),
  references: (byType.references || []).map(enrichPost).sort((a, b) => a.menuOrder - b.menuOrder),
  colleagues: (byType.colleagues || []).map(enrichPost).sort((a, b) => a.menuOrder - b.menuOrder),
  logos: (byType.logos || []).map(enrichPost).sort((a, b) => a.title.localeCompare(b.title, 'hu')),
  blogPosts: (byType.post || []).map(enrichPost),
  categories: [
    { id: 15, name: 'Palyazat', slug: 'palyazat' },
    { id: 16, name: 'munkatarsak', slug: 'munkatarsak' },
    { id: 17, name: 'referenciák', slug: 'referenciak' },
  ],
  documents: pdfs.map((d) => ({
    id: d.id,
    title: d.title,
    file: d.meta.attachedFile,
    url: d.guid,
  })),
  media: {
    sqlAttachments: { images: images.length, pdfs: pdfs.length },
    uploadsOnDisk: { images: uploadImages.length, pdfs: uploadPdfs.length, total: allUploadFiles.length },
    themeImages,
    uploadImagesSample: uploadImages.slice(0, 50),
    uploadPdfs,
  },
  themeHardcodedFiles: Object.keys(extractThemeHardcoded()),
};

// Write JSON
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_JSON, JSON.stringify(inventory, null, 2));

// Write markdown — full content, no summarization
let md = `# Rávezető Projekt Kft. — Complete Content Inventory\n\n`;
md += `> Generated: ${inventory.generatedAt}\n`;
md += `> Source: WordPress backup (read-only analysis)\n\n`;
md += `---\n\n`;

md += `## 1. Backup Summary\n\n`;
md += `| Metric | Value |\n|--------|-------|\n`;
for (const [k, v] of Object.entries(inventory.counts)) {
  if (typeof v === 'object') md += `| ${k} | ${JSON.stringify(v)} |\n`;
  else md += `| ${k} | ${v} |\n`;
}

md += `\n## 2. Company Contact Information\n\n`;
for (const [k, v] of Object.entries(inventory.company)) {
  md += `- **${k}:** ${v}\n`;
}

md += `\n## 3. Navigation Structure\n\n`;
for (const item of menuItems) {
  md += `### ${item.menuOrder}. ${item.title || '(submenu)'}\n`;
  md += `- Slug: \`${item.slug}\`\n`;
  if (item.linkedPage) md += `- Links to: ${item.linkedPage.title} (\`${item.linkedPage.slug}\`, type: ${item.linkedPage.type})\n`;
  if (item.menuMeta?.url) md += `- URL: ${item.menuMeta.url}\n`;
  if (item.menuMeta?.parent && item.menuMeta.parent !== '0') md += `- Parent menu item ID: ${item.menuMeta.parent}\n`;
  md += `\n`;
}

md += `\n## 4. All Published Pages (${inventory.pages.length})\n\n`;
for (const page of inventory.pages) {
  md += `---\n\n### ${page.title}\n\n`;
  md += `- **ID:** ${page.id}\n`;
  md += `- **Slug:** \`${page.slug}\`\n`;
  md += `- **Parent page ID:** ${page.parent || 'none'}\n`;
  md += `- **Last modified context:** ${page.date}\n\n`;
  md += `#### Content\n\n`;
  md += page.content ? `${page.content}\n\n` : `*(empty)*\n\n`;
}

md += `\n## 5. Services (${inventory.services.length})\n\n`;
for (const svc of inventory.services) {
  md += `---\n\n### ${svc.title}\n\n`;
  md += `- **ID:** ${svc.id} | **Slug:** \`${svc.slug}\` | **Order:** ${svc.menuOrder}\n\n`;
  md += `#### Content\n\n${svc.content}\n\n`;
}

md += `\n## 6. References (${inventory.references.length})\n\n`;
for (const ref of inventory.references) {
  md += `---\n\n### ${ref.title}\n\n`;
  md += `- **ID:** ${ref.id} | **Slug:** \`${ref.slug}\` | **Order:** ${ref.menuOrder}\n\n`;
  md += `#### Content\n\n${ref.content}\n\n`;
}

md += `\n## 7. Team Members / Colleagues (${inventory.colleagues.length})\n\n`;
for (const c of inventory.colleagues) {
  md += `---\n\n### ${c.title}\n\n`;
  md += `- **ID:** ${c.id} | **Slug:** \`${c.slug}\` | **Order:** ${c.menuOrder}\n`;
  if (c.meta.thumbnail) md += `- **Portrait:** \`uploads/${c.meta.thumbnail}\`\n`;
  md += `\n#### Bio\n\n${c.content}\n\n`;
}

md += `\n## 8. Partner Logos (${inventory.logos.length})\n\n`;
for (const logo of inventory.logos) {
  md += `- **${logo.title}** (\`${logo.slug}\`, ID: ${logo.id})`;
  if (logo.meta.thumbnail) md += ` — image: \`uploads/${logo.meta.thumbnail}\``;
  md += `\n`;
}

md += `\n## 9. Downloadable Documents (${inventory.documents.length})\n\n`;
for (const doc of inventory.documents) {
  md += `- **${doc.title}** — \`uploads/${doc.file}\`\n`;
}

md += `\n## 10. Homepage Hardcoded Content (from front-page.php)\n\n`;
md += `\`\`\`\n${extractThemeHardcoded()['front-page.php'] || 'N/A'}\n\`\`\`\n`;

md += `\n## 11. Theme Template Files (reference)\n\n`;
for (const f of inventory.themeHardcodedFiles) {
  md += `- \`themes/RavezetoNewTheme/${f}\`\n`;
}

md += `\n## 12. Media Inventory\n\n`;
md += `### Uploads on disk\n\n`;
md += `- Total files: ${allUploadFiles.length}\n`;
md += `- Images: ${uploadImages.length}\n`;
md += `- PDFs: ${uploadPdfs.length}\n\n`;
md += `### PDF files in uploads\n\n`;
for (const p of uploadPdfs) md += `- \`uploads/${p.path}\`\n`;
md += `\n### Theme images\n\n`;
for (const t of themeImages) md += `- \`themes/RavezetoNewTheme/${t.path}\`\n`;

fs.writeFileSync(OUT_MD, md);
console.log('Done:', OUT_JSON);
console.log('Done:', OUT_MD);
console.log('Counts:', JSON.stringify(inventory.counts, null, 2));
