const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_MESSAGE = 5000;

export function validateContactPayload(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Érvénytelen kérés.' };
  }

  if (body.website) {
    return { ok: false, error: 'Érvénytelen kérés.' };
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (!name) {
    return { ok: false, error: 'Ez a mező kötelező.' };
  }
  if (name.length > MAX_NAME) {
    return { ok: false, error: 'A név túl hosszú.' };
  }

  if (!email) {
    return { ok: false, error: 'Ez a mező kötelező.' };
  }
  if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    return { ok: false, error: 'Érvénytelen e-mail cím.' };
  }

  if (phone.length > MAX_PHONE) {
    return { ok: false, error: 'A telefonszám túl hosszú.' };
  }

  if (!message) {
    return { ok: false, error: 'Ez a mező kötelező.' };
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: 'Az üzenet túl hosszú.' };
  }

  return {
    ok: true,
    data: { name, email, phone: phone || undefined, message },
  };
}

function readOrigin(headers) {
  if (typeof headers.get === 'function') {
    return headers.get('Origin');
  }
  return headers.origin ?? headers.Origin ?? null;
}

export function isSameOriginRequest(request) {
  const origin = readOrigin(request.headers);
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
