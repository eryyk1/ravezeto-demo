/**
 * Fail the build if dist/index.html references missing hashed bundles.
 * Prevents white-screen deploys when HTML and /assets/* are out of sync
 * (Cloudflare SPA fallback then serves index.html for missing .js/.css with 200).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('verify-dist-assets: dist/index.html not found');
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf8');
const refs = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map((m) => m[1]);

if (refs.length === 0) {
  console.error('verify-dist-assets: no /assets/ script or stylesheet references in index.html');
  process.exit(1);
}

const missing = refs.filter((ref) => !fs.existsSync(path.join(distDir, ref.replace(/^\//, ''))));

if (missing.length > 0) {
  console.error('verify-dist-assets: index.html points at files that are not in dist/:');
  for (const ref of missing) console.error(`  - ${ref}`);
  process.exit(1);
}

console.log(`verify-dist-assets: OK (${refs.length} bundle reference(s) match dist/)`);
