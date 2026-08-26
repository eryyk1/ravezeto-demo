import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'client-reference');
const out = path.join(process.cwd(), 'src/styles/client-design.css');
const seen = new Set();
const blocks = [];

for (const file of fs.readdirSync(dir).sort()) {
  if (!file.endsWith('.html')) continue;
  const html = fs.readFileSync(path.join(dir, file), 'utf8');
  const styles = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  for (const css of styles) {
    const key = css.trim();
    if (seen.has(key)) continue;
    seen.add(key);
    blocks.push(`/* --- from ${file} --- */\n${css}`);
  }
}

fs.writeFileSync(out, blocks.join('\n\n'));
console.log('Wrote', out, 'blocks:', blocks.length, 'bytes:', fs.statSync(out).size);
