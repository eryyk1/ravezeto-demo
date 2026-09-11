import { handleAdminLogin } from '../functions/api/admin/login.js';
import { handleAdminSession } from '../functions/api/admin/session.js';
import { handleContactSubmit } from '../functions/api/contact.js';
import {
  GONE_PATHS,
  PRERENDER_ROUTES,
  goneResponse,
  normalizePath,
} from '../functions/lib/routing.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = normalizePath(url.pathname);

    if (GONE_PATHS.has(path)) {
      return goneResponse();
    }

    if (path === '/api/admin/login' && request.method === 'POST') {
      return handleAdminLogin(request, env);
    }

    if (path === '/api/admin/session' && request.method === 'GET') {
      return handleAdminSession(request, env);
    }

    if (path === '/api/contact' && request.method === 'POST') {
      return handleContactSubmit(request, env);
    }

    if (request.method === 'GET' && PRERENDER_ROUTES.has(path)) {
      const prerenderUrl = new URL(request.url);
      prerenderUrl.pathname = `${path}/index.html`;
      return env.ASSETS.fetch(new Request(prerenderUrl, request));
    }

    return env.ASSETS.fetch(request);
  },
};
