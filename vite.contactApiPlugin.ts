import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';
import { sendContactEmail } from './functions/lib/contactEmail.js';
import { isSameOriginRequest, validateContactPayload } from './functions/lib/contactValidation.js';

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

function contactApiMiddleware() {
  return async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (req.url !== '/api/contact' || req.method !== 'POST') {
      return next();
    }

    const host = req.headers.host ?? 'localhost';
    const fakeRequest = {
      headers: req.headers,
      url: `http://${host}${req.url}`,
    };

    if (!isSameOriginRequest(fakeRequest)) {
      json(res, 403, { error: 'Forbidden' });
      return;
    }

    let body: unknown;
    try {
      body = JSON.parse(await readBody(req));
    } catch {
      json(res, 400, { error: 'Érvénytelen kérés.' });
      return;
    }

    const validation = validateContactPayload(body);
    if (!validation.ok) {
      json(res, 400, { error: validation.error });
      return;
    }

    const env = {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    };

    const result = await sendContactEmail(env, validation.data);
    if (!result.ok) {
      json(res, result.status ?? 502, { error: result.error });
      return;
    }

    json(res, 200, { ok: true });
  };
}

export function contactApiDevPlugin(): Plugin {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      logContactApiStatus();
      server.middlewares.use(contactApiMiddleware());
    },
    configurePreviewServer(server) {
      logContactApiStatus();
      server.middlewares.use(contactApiMiddleware());
    },
  };
}

function logContactApiStatus() {
  const hasKey = Boolean(process.env.RESEND_API_KEY);
  const hasFrom = Boolean(process.env.CONTACT_FROM_EMAIL);

  if (hasKey && hasFrom) {
    console.log('[contact-api] Local contact form email configured');
    return;
  }

  console.warn(
    '[contact-api] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL. Add them to .env.local for local form testing.',
  );
}
