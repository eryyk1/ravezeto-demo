import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';
import { getAdminSecret, isAdminAuthConfigured, signAdminToken } from './api/lib/adminAuth.js';
import { requireActiveAdmin, requireFoadmin } from './api/lib/adminAccess.js';
import { readAdminUsersFromDisk, writeAdminUsersToDisk } from './api/lib/adminUserStore.js';
import {
  ADMIN_ROLES,
  authenticateAdminUser,
  createAdminUser,
  deleteAdminUser,
  listAdminUsers,
  resetAdminUserPassword,
  updateAdminUser,
} from './functions/lib/adminUsersService.js';
import { ADMIN_SESSION_TTL_MS } from './api/lib/sessionConfig.js';

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

function userStoreDeps(rootDir: string) {
  const env = process.env;
  return {
    env,
    readUsers: () => readAdminUsersFromDisk(rootDir),
    writeUsers: (record: unknown) => writeAdminUsersToDisk(rootDir, record as never),
  };
}

function adminAuthMiddleware(rootDir: string) {
  return async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url?.startsWith('/api/admin/')) return next();

    const url = new URL(req.url, 'http://local');
    const pathname = url.pathname;

    const secret = getAdminSecret();
    if (!secret) {
      json(res, 503, {
        error:
          'Helyi admin auth: hozzon létre .env.local fájlt ADMIN_JWT_SECRET és bootstrap/legacy jelszó értékekkel.',
      });
      return;
    }

    if (pathname === '/api/admin/login' && req.method === 'POST') {
      if (!isAdminAuthConfigured()) {
        json(res, 503, { error: 'Az admin bejelentkezés nincs konfigurálva.' });
        return;
      }
      try {
        const raw = await readBody(req);
        const body = JSON.parse(raw) as { email?: string; password?: string };
        const email = String(body.email ?? '').trim();
        const password = String(body.password ?? '');

        if (!email || !password) {
          json(res, 400, { error: 'Email és jelszó megadása kötelező.' });
          return;
        }

        const deps = userStoreDeps(rootDir);
        const user = await authenticateAdminUser(email, password, deps);
        if (!user) {
          json(res, 401, { error: 'Hibás email vagy jelszó.' });
          return;
        }

        const ttlMs = ADMIN_SESSION_TTL_MS;
        const expiresAt = Date.now() + ttlMs;
        const accessToken = signAdminToken(
          { sub: user.id, email: user.email, role: user.role },
          secret,
          ttlMs,
        );
        json(res, 200, {
          accessToken,
          expiresAt,
          user: { id: user.id, email: user.email, role: user.role },
        });
      } catch {
        json(res, 400, { error: 'Érvénytelen kérés.' });
      }
      return;
    }

    if (pathname === '/api/admin/session' && req.method === 'GET') {
      const auth = await requireActiveAdmin(req, rootDir);
      if (auth.status) {
        json(res, auth.status, auth.body);
        return;
      }
      json(res, 200, { user: auth.user, expiresAt: auth.payload.exp });
      return;
    }

    if (pathname === '/api/admin/logout' && req.method === 'POST') {
      json(res, 200, { ok: true });
      return;
    }

    const usersMatch = pathname.match(/^\/api\/admin\/users(?:\/([^/]+))?(?:\/(password))?$/);
    if (usersMatch) {
      const userId = usersMatch[1];
      const sub = usersMatch[2];
      const deps = userStoreDeps(rootDir);

      if (!userId && req.method === 'GET') {
        const auth = await requireFoadmin(req, rootDir);
        if (auth.status) return json(res, auth.status, auth.body);
        const users = await listAdminUsers(deps.readUsers);
        return json(res, 200, { users });
      }

      if (!userId && req.method === 'POST') {
        const auth = await requireFoadmin(req, rootDir);
        if (auth.status) return json(res, auth.status, auth.body);
        try {
          const raw = await readBody(req);
          const body = JSON.parse(raw) as { email?: string; password?: string; role?: string };
          const role =
            body.role === ADMIN_ROLES.FOADMIN ? ADMIN_ROLES.FOADMIN : ADMIN_ROLES.ADMIN;
          const result = await createAdminUser(
            { email: String(body.email ?? ''), password: String(body.password ?? ''), role },
            deps.readUsers,
            deps.writeUsers,
          );
          if (!result.ok) return json(res, result.status ?? 400, { error: result.error });
          return json(res, 201, { user: result.user });
        } catch {
          return json(res, 400, { error: 'Érvénytelen kérés.' });
        }
      }

      if (userId && sub === 'password' && req.method === 'POST') {
        const auth = await requireFoadmin(req, rootDir);
        if (auth.status) return json(res, auth.status, auth.body);
        try {
          const raw = await readBody(req);
          const body = JSON.parse(raw) as { password?: string };
          const result = await resetAdminUserPassword(
            userId,
            String(body.password ?? ''),
            deps.readUsers,
            deps.writeUsers,
            auth.user,
          );
          if (!result.ok) return json(res, result.status ?? 400, { error: result.error });
          return json(res, 200, { ok: true });
        } catch {
          return json(res, 400, { error: 'Érvénytelen kérés.' });
        }
      }

      if (userId && !sub && req.method === 'PATCH') {
        const auth = await requireFoadmin(req, rootDir);
        if (auth.status) return json(res, auth.status, auth.body);
        try {
          const raw = await readBody(req);
          const body = JSON.parse(raw) as { active?: boolean; role?: string };
          const patch: { active?: boolean; role?: string } = {};
          if (body.active !== undefined) patch.active = Boolean(body.active);
          if (body.role !== undefined) patch.role = body.role;
          const result = await updateAdminUser(
            userId,
            patch,
            deps.readUsers,
            deps.writeUsers,
            auth.user,
          );
          if (!result.ok) return json(res, result.status ?? 400, { error: result.error });
          return json(res, 200, { user: result.user });
        } catch {
          return json(res, 400, { error: 'Érvénytelen kérés.' });
        }
      }

      if (userId && !sub && req.method === 'DELETE') {
        const auth = await requireFoadmin(req, rootDir);
        if (auth.status) return json(res, auth.status, auth.body);
        const result = await deleteAdminUser(
          userId,
          deps.readUsers,
          deps.writeUsers,
          auth.user,
        );
        if (!result.ok) return json(res, result.status ?? 400, { error: result.error });
        return json(res, 200, { ok: true });
      }

      return json(res, 405, { error: 'Method not allowed' });
    }

    json(res, 404, { error: 'Not found' });
  };
}

export function adminAuthDevPlugin(rootDir: string): Plugin {
  return {
    name: 'admin-auth-dev-api',
    configureServer(server) {
      logAdminAuthStatus();
      server.middlewares.use(adminAuthMiddleware(rootDir));
    },
    configurePreviewServer(server) {
      logAdminAuthStatus();
      server.middlewares.use(adminAuthMiddleware(rootDir));
    },
  };
}

function logAdminAuthStatus() {
  const hasSecret = Boolean(getAdminSecret());
  const hasBootstrap = Boolean(process.env.ADMIN_BOOTSTRAP_PASSWORD);
  const hasLegacy = Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);

  if (hasSecret && (hasBootstrap || hasLegacy)) {
    const email = process.env.ADMIN_BOOTSTRAP_EMAIL ?? process.env.ADMIN_EMAIL ?? '(email)';
    console.log(`[admin-auth] Local multi-user admin configured (${email})`);
    return;
  }

  console.warn(
    '[admin-auth] Missing ADMIN_JWT_SECRET and/or bootstrap/legacy password. Create .env.local and restart.',
  );
}
