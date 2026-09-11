import { jsonResponse } from '../lib/http.js';
import { sendContactEmail } from '../lib/contactEmail.js';
import { isSameOriginRequest, validateContactPayload } from '../lib/contactValidation.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!isSameOriginRequest(request)) {
    return jsonResponse({ error: 'Forbidden' }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Érvénytelen kérés.' }, 400);
  }

  const validation = validateContactPayload(body);
  if (!validation.ok) {
    return jsonResponse({ error: validation.error }, 400);
  }

  const result = await sendContactEmail(env, validation.data);
  if (!result.ok) {
    return jsonResponse({ error: result.error }, result.status);
  }

  return jsonResponse({ ok: true });
}
