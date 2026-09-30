const CMS_KV_KEY = 'cms:state';

export function buildPublishedPayload(state, buildRef = 'live') {
  return {
    schemaVersion: state.published?.schemaVersion ?? 2,
    generatedAt: new Date().toISOString(),
    buildRef,
    defaultsRevision: state.meta?.defaultsRevision ?? 0,
    published: state.published,
  };
}

export async function readCmsState(env) {
  if (env?.CMS_KV) {
    const raw = await env.CMS_KV.get(CMS_KV_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
  }
  return null;
}

function buildCmsStateFromPublishedSnapshot(snapshot) {
  if (!snapshot?.published) return null;
  const published = snapshot.published;
  const generatedAt = snapshot.generatedAt ?? new Date().toISOString();
  return {
    storageVersion: 5,
    draft: published,
    published,
    versions: [],
    activity: [],
    meta: {
      lastModified: generatedAt,
      lastPublished: generatedAt,
      hasUnpublishedChanges: false,
      publishedBuildRef: snapshot.buildRef ?? 'live',
      defaultsRevision: snapshot.defaultsRevision ?? 0,
    },
  };
}

export async function readOrInitializeCmsState(env) {
  const existing = await readCmsState(env);
  if (existing) return existing;

  const snapshot = await readPublishedFromAssets(env);
  const seeded = buildCmsStateFromPublishedSnapshot(snapshot);
  if (!seeded) return null;

  const write = await writeCmsState(env, seeded);
  if (!write.ok) return null;
  return seeded;
}

export async function writeCmsState(env, state) {
  if (!env?.CMS_KV) {
    return { ok: false, error: 'CMS_KV binding is not configured on the Worker.' };
  }
  await env.CMS_KV.put(CMS_KV_KEY, JSON.stringify(state));
  return { ok: true };
}

export async function readPublishedFromAssets(env) {
  if (!env?.ASSETS) return null;
  try {
    const response = await env.ASSETS.fetch(new URL('https://cms.local/cms/published.json'));
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
