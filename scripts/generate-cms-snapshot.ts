/**
 * Build-time snapshot of published CMS defaults.
 * Deployed visitors load this instead of stale browser localStorage.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_DEFAULTS_REVISION } from '../src/services/content/constants';
import { createDefaultContent } from '../src/services/content/defaults';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'cms');
const outFile = path.join(outDir, 'published.json');
const stateFile = path.join(root, 'data', 'cms', 'state.json');

function loadPublishedFromProductionState() {
  if (!existsSync(stateFile)) return null;
  try {
    const state = JSON.parse(readFileSync(stateFile, 'utf8')) as {
      published?: ReturnType<typeof createDefaultContent>;
      meta?: { defaultsRevision?: number; publishedBuildRef?: string };
    };
    if (state.published) return state;
  } catch {
    return null;
  }
  return null;
}

function loadExistingSnapshotRevision(): number | null {
  if (!existsSync(outFile)) return null;
  try {
    const existing = JSON.parse(readFileSync(outFile, 'utf8')) as { defaultsRevision?: number };
    return typeof existing.defaultsRevision === 'number' ? existing.defaultsRevision : 0;
  } catch {
    return null;
  }
}

const productionState = loadPublishedFromProductionState();
const existingRevision = loadExistingSnapshotRevision();
if (!productionState && existingRevision !== null && existingRevision >= CONTENT_DEFAULTS_REVISION) {
  console.log(
    `generate-cms-snapshot: keeping ${path.relative(root, outFile)} (rev ${existingRevision}, no ${path.relative(root, stateFile)})`,
  );
  process.exit(0);
}
if (!productionState && existingRevision !== null && existingRevision < CONTENT_DEFAULTS_REVISION) {
  console.log(
    `generate-cms-snapshot: refreshing ${path.relative(root, outFile)} (${existingRevision} → ${CONTENT_DEFAULTS_REVISION})`,
  );
}
const published = productionState?.published ?? createDefaultContent();
const payload = {
  schemaVersion: published.schemaVersion,
  generatedAt: new Date().toISOString(),
  buildRef: (
    process.env.CF_PAGES_COMMIT_SHA ??
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.GITHUB_SHA ??
    'local'
  ).slice(0, 7),
  defaultsRevision:
    productionState?.meta?.defaultsRevision ?? CONTENT_DEFAULTS_REVISION,
  published,
};

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`generate-cms-snapshot: wrote ${path.relative(root, outFile)}`);
