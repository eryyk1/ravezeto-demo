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

const UPLOAD_MAX_BYTES = 2 * 1024 * 1024;
const UPLOAD_ALLOWED = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

export async function handleCmsUploadPost(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.error) return auth.error;

  if (!env?.CMS_UPLOADS) {
    return jsonResponse(
      { error: 'CMS uploads storage (R2) is not configured on the Worker.' },
      503,
    );
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: 'Invalid multipart body' }, 400);
  }

  const file = formData.get('file');
  if (!file || typeof file === 'string') {
    return jsonResponse({ error: 'Missing file upload' }, 400);
  }

  const mime = file.type || 'application/octet-stream';
  const ext = UPLOAD_ALLOWED[mime];
  if (!ext) {
    return jsonResponse({ error: 'Unsupported image type' }, 400);
  }

  const bytes = await file.arrayBuffer();
  if (bytes.byteLength > UPLOAD_MAX_BYTES) {
    return jsonResponse({ error: 'File too large' }, 400);
  }

  const stamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const rand = crypto.getRandomValues(new Uint8Array(4));
  const hex = [...rand].map((b) => b.toString(16).padStart(2, '0')).join('');
  const name = `cms-${stamp}-${hex}.${ext}`;
  const key = `uploads/cms/${name}`;

  await env.CMS_UPLOADS.put(key, bytes, {
    httpMetadata: { contentType: mime },
  });

  return jsonResponse({ url: `/assets/uploads/cms/${name}` });
}

export async function handleCmsUploadAssetGet(request, env, path) {
  if (!env?.CMS_UPLOADS) return null;
  const prefix = '/assets/uploads/cms/';
  if (!path.startsWith(prefix)) return null;
  const fileName = path.slice(prefix.length);
  if (!fileName || fileName.includes('..') || fileName.includes('/')) return null;

  const object = await env.CMS_UPLOADS.get(`uploads/cms/${fileName}`);
  if (!object) return null;

  const headers = new Headers();
  headers.set(
    'Content-Type',
    object.httpMetadata?.contentType || 'application/octet-stream',
  );
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  return new Response(object.body, { status: 200, headers });
}
