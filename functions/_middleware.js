import { GONE_PATHS, goneResponse, normalizePath } from './lib/routing.js';

/** @deprecated Pages Functions middleware — use worker/index.js on Cloudflare Workers deploy. */
export async function onRequest(context) {
  const path = normalizePath(new URL(context.request.url).pathname);
  if (!GONE_PATHS.has(path)) {
    return context.next();
  }

  return goneResponse();
}
