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
