import fs from 'node:fs';
import path from 'node:path';

export { buildPublishedPayload } from '../../functions/lib/cmsStorage.js';

export function cmsPaths(rootDir) {
  const root = path.resolve(rootDir);
  return {
    root,
    stateFile: path.join(root, 'data', 'cms', 'state.json'),
    publishedFile: path.join(root, 'public', 'cms', 'published.json'),
    uploadsDir: path.join(root, 'public', 'assets', 'uploads', 'cms'),
  };
}

export function readCmsStateFromDisk(rootDir) {
  const { stateFile } = cmsPaths(rootDir);
  if (!fs.existsSync(stateFile)) return null;
  try {
    return JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  } catch {
    return null;
  }
}

export function writeCmsStateToDisk(rootDir, state) {
  const { stateFile, publishedFile } = cmsPaths(rootDir);
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.mkdirSync(path.dirname(publishedFile), { recursive: true });
  fs.writeFileSync(stateFile, `${JSON.stringify(state, null, 2)}\n`, 'utf8');

  const payload = {
    schemaVersion: state.published?.schemaVersion ?? 2,
    generatedAt: new Date().toISOString(),
    buildRef: state.meta?.publishedBuildRef ?? 'live',
    defaultsRevision: state.meta?.defaultsRevision ?? 0,
    published: state.published,
  };
  fs.writeFileSync(publishedFile, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  return payload;
}
