/**
 * Build-time snapshot of published CMS defaults.
 * Deployed visitors load this instead of stale browser localStorage.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDefaultContent } from '../src/services/content/defaults';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'cms');
const outFile = path.join(outDir, 'published.json');

const published = createDefaultContent();
const payload = {
  schemaVersion: published.schemaVersion,
  generatedAt: new Date().toISOString(),
  buildRef: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? 'local',
  published,
};

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`generate-cms-snapshot: wrote ${path.relative(root, outFile)}`);
