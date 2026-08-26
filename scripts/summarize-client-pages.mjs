import fs from 'node:fs';
import path from 'node:path';

const dir = path.join(process.cwd(), 'client-reference');
for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith('.html')) continue;
  const slug = file.replace('.html', '');
  const h = fs.readFileSync(path.join(dir, file), 'utf8');
  const body = h.match(/<body>([\s\S]*)<\/body>/)?.[1] ?? '';
  const clean = body
    .replace(/src="data:[^"]+"/g, 'src="[DATA]"')
    .replace(/base64,[A-Za-z0-9+/=\s]{80,}/g, '[B64]');
  const tags = [...clean.matchAll(/<(section|header|footer)[^>]*class="([^"]*)"/g)].map((m) => `${m[1]}.${m[2].split(' ')[0]}`);
  const h1 = clean.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log(`\n${slug}: ${h1 ?? '(no h1)'}`);
  console.log(' ', tags.join(' → '));
}
