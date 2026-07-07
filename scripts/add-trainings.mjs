import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inv = JSON.parse(fs.readFileSync(path.join(__dirname, '../docs/CONTENT_INVENTORY.json'), 'utf8'));
const sql = fs.readFileSync(path.join(__dirname, '../../ravezeto.hu_wpvivid-62f3de7a6aed8_2026-07-06-10-38_backup_db.sql'), 'utf8');

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
    if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/\\'/g, "'").replace(/\\n/g, '\n');
    return v;
  };
  if (values.length < 22) return null;
  return {
    id: parseInt(values[0], 10),
    title: unquote(values[5]),
    slug: unquote(values[11]),
    content: unquote(values[4]),
    status: unquote(values[7]),
    type: unquote(values[20]),
    order: parseInt(values[19], 10) || 0,
  };
}

const extraTypes = ['trainings', 'trainingsmain', 'trainingsstrategy', 'tenders', 'empx'];
const posts = [];
for (const line of sql.split('\n')) {
  if (!line.startsWith('INSERT INTO `wp_posts`')) continue;
  const p = parseInsertValues(line);
  if (p && p.status === 'publish' && extraTypes.includes(p.type)) posts.push(p);
}

inv.trainings = posts.filter((p) => p.type === 'trainings').sort((a, b) => a.title.localeCompare(b.title, 'hu'));
inv.tenders = posts.filter((p) => p.type === 'tenders');
inv.empx = posts.filter((p) => p.type === 'empx');
inv.trainingsMeta = {
  main: posts.filter((p) => p.type === 'trainingsmain'),
  strategy: posts.filter((p) => p.type === 'trainingsstrategy'),
};

fs.writeFileSync(path.join(__dirname, '../docs/CONTENT_INVENTORY.json'), JSON.stringify(inv, null, 2));
console.log(`trainings: ${inv.trainings.length}, tenders: ${inv.tenders.length}, empx: ${inv.empx.length}`);
