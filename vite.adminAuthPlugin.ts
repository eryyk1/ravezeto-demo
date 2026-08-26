import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';
import {
  getAdminSecret,
  signAdminToken,
  validateAdminCredentials,
  verifyAdminToken,
} from './api/lib/adminAuth.js';

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function adminAuthMiddleware() {
  return async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (!req.url?.startsWith('/api/admin/')) return next();

        const secret = getAdminSecret();
        if (!secret) {
          json(res, 503, {
            error:
              'Helyi admin auth: hozzon létre .env.local fájlt ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_JWT_SECRET értékekkel.',
          });
          return;
        }

        if (req.url === '/api/admin/login' && req.method === 'POST') {
          try {
            const raw = await readBody(req);
            const body = JSON.parse(raw) as { email?: string; password?: string };
            const email = String(body.email ?? '').trim();
            const password = String(body.password ?? '');

            if (!email || !password) {
              json(res, 400, { error: 'Email és jelszó megadása kötelező.' });
              return;
            }

            if (!validateAdminCredentials(email, password)) {
              json(res, 401, { error: 'Hibás email vagy jelszó.' });
              return;
            }

            const ttlMs = 8 * 60 * 60 * 1000;
            const expiresAt = Date.now() + ttlMs;
            const accessToken = signAdminToken({ sub: 'admin', email }, secret, ttlMs);
            json(res, 200, {
              accessToken,
              expiresAt,
              user: { id: 'admin', email },
            });
          } catch {
            json(res, 400, { error: 'Érvénytelen kérés.' });
          }
          return;
        }

        if (req.url === '/api/admin/session' && req.method === 'GET') {
          const header = req.headers.authorization;
          const token = header?.startsWith('Bearer ') ? header.slice(7) : null;
          if (!token) {
            json(res, 401, { error: 'Unauthorized' });
            return;
          }
          const payload = verifyAdminToken(token, secret);
          if (!payload) {
            json(res, 401, { error: 'Invalid or expired session' });
            return;
          }
          json(res, 200, {
            user: { id: payload.sub, email: payload.email },
            expiresAt: payload.exp,
          });
          return;
        }

        json(res, 404, { error: 'Not found' });
  };
}

export function adminAuthDevPlugin(): Plugin {
  return {
    name: 'admin-auth-dev-api',
    configureServer(server) {
      logAdminAuthStatus();
      server.middlewares.use(adminAuthMiddleware());
    },
    configurePreviewServer(server) {
      logAdminAuthStatus();
      server.middlewares.use(adminAuthMiddleware());
    },
  };
}

function logAdminAuthStatus() {
  const hasEmail = Boolean(process.env.ADMIN_EMAIL);
  const hasPassword = Boolean(process.env.ADMIN_PASSWORD);
  const hasSecret = Boolean(getAdminSecret());

  if (hasEmail && hasPassword && hasSecret) {
    console.log(`[admin-auth] Local admin login configured for ${process.env.ADMIN_EMAIL}`);
    return;
  }

  console.warn(
    '[admin-auth] Missing ADMIN_EMAIL, ADMIN_PASSWORD, or ADMIN_JWT_SECRET. Create .env.local and restart the dev server.',
  );
}
