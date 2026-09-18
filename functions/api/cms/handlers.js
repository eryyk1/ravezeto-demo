import { verifyAdminToken, getAdminSecret } from '../../lib/adminAuth.js';
import { jsonResponse } from '../../lib/http.js';
import {
  buildPublishedPayload,
  readCmsState,
  readPublishedFromAssets,
  writeCmsState,
} from '../../lib/cmsStorage.js';

function getBearerToken(request) {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7);
}

async function requireAdmin(request, env) {
  const secret = getAdminSecret(env);
  if (!secret) {
    return { error: jsonResponse({ error: 'Auth not configured' }, 503) };
  }
  const token = getBearerToken(request);
  if (!token) {
    return { error: jsonResponse({ error: 'Unauthorized' }, 401) };
  }
  const payload = await verifyAdminToken(token, secret);
  if (!payload) {
    return { error: jsonResponse({ error: 'Invalid or expired session' }, 401) };
  }
  return { payload };
}

export async function handleCmsPublishedGet(_request, env) {
  const fromKv = await readCmsState(env);
  if (fromKv?.published) {
    return jsonResponse(buildPublishedPayload(fromKv, fromKv.meta?.publishedBuildRef ?? 'live'));
  }

  const fromAssets = await readPublishedFromAssets(env);
  if (fromAssets) {
    return jsonResponse(fromAssets);
  }

  return jsonResponse({ error: 'Published CMS snapshot not found' }, 404);
}

export async function handleCmsStateGet(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;

  const state = await readCmsState(env);
  if (!state) {
    return jsonResponse({ error: 'CMS state not initialized on server' }, 404);
  }
  return jsonResponse({ state });
}

export async function handleCmsStatePut(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (!body?.state || typeof body.state !== 'object') {
    return jsonResponse({ error: 'Missing state object' }, 400);
  }

  const result = await writeCmsState(env, body.state);
  if (!result.ok) {
    return jsonResponse({ error: result.error }, 503);
  }
  return jsonResponse({ ok: true });
}

export async function handleCmsPublishPost(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  if (!body?.state || typeof body.state !== 'object') {
    return jsonResponse({ error: 'Missing state object' }, 400);
  }

  const state = body.state;
  const result = await writeCmsState(env, state);
  if (!result.ok) {
    return jsonResponse({ error: result.error }, 503);
  }

  return jsonResponse({
    ok: true,
    published: buildPublishedPayload(state, state.meta?.publishedBuildRef ?? 'live'),
  });
}
