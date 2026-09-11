const CONTACT_TO = 'info@ravezeto.hu';
const CONTACT_SUBJECT = 'New contact form message – Rávezető';

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
  const from = env?.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !from) {
    return {
      ok: false,
      status: 503,
      error:
        'Az űrlap küldés nincs konfigurálva. Állítsa be a RESEND_API_KEY és CONTACT_FROM_EMAIL változókat a Cloudflare Worker környezeti változóiban.',
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
    return {
      ok: false,
      status: 502,
      error: 'Hiba történt. Kérjük próbálja újra később.',
    };
  }

  return { ok: true };
}
