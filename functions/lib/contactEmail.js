const CONTACT_TO = 'info@ravezeto.hu';
const CONTACT_SUBJECT = 'Új kapcsolatfelvétel – Rávezető weboldal';
/** Verified Resend domain sender; override with CONTACT_FROM_EMAIL env var if needed. */
const DEFAULT_CONTACT_FROM = 'Rávezető weboldal <weboldal@ravezeto.hu>';

function buildEmailText({ name, email, phone, message }) {
  const lines = [
    'Új kapcsolatfelvételi üzenet érkezett a Rávezető weboldalról.',
    '',
    `Név: ${name}`,
    `E-mail: ${email}`,
  ];

  if (phone) {
    lines.push(`Telefonszám: ${phone}`);
  }

  lines.push('', 'Üzenet:', message);
  return lines.join('\n');
}

export async function sendContactEmail(env, payload) {
  const apiKey = env?.RESEND_API_KEY?.trim();
  const from = (env?.CONTACT_FROM_EMAIL?.trim() || DEFAULT_CONTACT_FROM).trim();

  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      error:
        'Az űrlap jelenleg nincs konfigurálva. Kérjük írjon közvetlenül az info@ravezeto.hu címre.',
    };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_TO],
      reply_to: payload.email,
      subject: CONTACT_SUBJECT,
      text: buildEmailText(payload),
    }),
  });

  if (!response.ok) {
    let detail = '';
    try {
      const errBody = await response.json();
      if (errBody && typeof errBody.message === 'string') {
        detail = errBody.message;
      }
    } catch {
      /* ignore parse errors */
    }
    console.error('[contact-email] Resend error', response.status, detail || response.statusText);
    return {
      ok: false,
      status: 502,
      error: 'Hiba történt. Kérjük próbálja újra később.',
    };
  }

  return { ok: true };
}
