import type { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { verifyAdminToken, getAdminSecret } from './api/lib/adminAuth.js';
import {
  readCmsStateFromDisk,
  writeCmsStateToDisk,
  cmsPaths,
} from './api/lib/cmsStorage.js';

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function getBearer(req: IncomingMessage): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7);
}

async function requireAuth(req: IncomingMessage, res: ServerResponse) {
  const secret = getAdminSecret();
  if (!secret) {
    json(res, 503, { error: 'CMS API: állítsa be az ADMIN_JWT_SECRET értéket a .env.local fájlban.' });
    return null;
  }
  const token = getBearer(req);
  if (!token) {
    json(res, 401, { error: 'Unauthorized' });
    return null;
  }
  const payload = await verifyAdminToken(token, secret);
  if (!payload) {
    json(res, 401, { error: 'Invalid or expired session' });
    return null;
  }
  return payload;
}

export function cmsApiDevPlugin(rootDir: string): Plugin {
  return {
    name: 'ravezeto-cms-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/cms/')) return next();

        const url = new URL(req.url, 'http://local');
        const pathname = url.pathname;

        if (pathname === '/api/cms/published' && req.method === 'GET') {
          const state = readCmsStateFromDisk(rootDir);
          const publishedFile = cmsPaths(rootDir).publishedFile;
          if (fs.existsSync(publishedFile)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            fs.createReadStream(publishedFile).pipe(res);
            return;
          }
          if (state?.published) {
            return json(res, 200, {
              schemaVersion: state.published.schemaVersion ?? 2,
              generatedAt: new Date().toISOString(),
              buildRef: state.meta?.publishedBuildRef ?? 'dev',
              defaultsRevision: state.meta?.defaultsRevision ?? 0,
              published: state.published,
            });
          }
          return json(res, 404, { error: 'Published CMS snapshot not found' });
        }

        if (pathname === '/api/cms/state' && req.method === 'GET') {
          if (!(await requireAuth(req, res))) return;
          const state = readCmsStateFromDisk(rootDir);
          if (!state) return json(res, 404, { error: 'CMS state not initialized on server' });
          return json(res, 200, { state });
        }

        if (pathname === '/api/cms/state' && (req.method === 'PUT' || req.method === 'POST')) {
          if (!(await requireAuth(req, res))) return;
          try {
            const raw = await readBody(req);
            const body = JSON.parse(raw.toString('utf8')) as { state?: unknown };
            if (!body.state || typeof body.state !== 'object') {
              return json(res, 400, { error: 'Missing state object' });
            }
            writeCmsStateToDisk(rootDir, body.state as never);
            return json(res, 200, { ok: true });
          } catch {
            return json(res, 400, { error: 'Invalid JSON body' });
          }
        }

        if (pathname === '/api/cms/publish' && req.method === 'POST') {
          if (!(await requireAuth(req, res))) return;
          try {
            const raw = await readBody(req);
            const body = JSON.parse(raw.toString('utf8')) as { state?: unknown };
            if (!body.state || typeof body.state !== 'object') {
              return json(res, 400, { error: 'Missing state object' });
            }
            const published = writeCmsStateToDisk(rootDir, body.state as never);
            return json(res, 200, { ok: true, published });
          } catch {
            return json(res, 400, { error: 'Invalid JSON body' });
          }
        }

        if (pathname === '/api/cms/upload' && req.method === 'POST') {
          if (!(await requireAuth(req, res))) return;
          return json(res, 501, {
            error:
              'Helyi fájlfeltöltés: használjon /assets/... URL-t, vagy telepítse a PHP CMS API-t. (Dev upload hamarosan.)',
          });
        }

        return json(res, 404, { error: 'Unknown CMS API route' });
      });
    },
  };
}
