/** Canonical public site URL (HTTPS + www). */
export const RAVEZETO_SITE_URL = 'https://www.ravezeto.hu';

const BARE_DOMAIN = 'ravezeto.hu';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Plain text (hero lead): linkify bare ravezeto.hu for mobile data detectors. */
export function normalizeLegalPlainText(text: string): string {
  if (!text.includes(BARE_DOMAIN)) return escapeHtml(text);
  const escaped = escapeHtml(text);
  return escaped.replace(
    /(?<![@/])(?<![\w.])(?:www\.)?ravezeto\.hu(?![\w.])/gi,
    (match) =>
      `<a href="${RAVEZETO_SITE_URL}">${match.toLowerCase().includes('www.') ? 'www.ravezeto.hu' : BARE_DOMAIN}</a>`,
  );
}

/**
 * CMS legal HTML: fix scheme-less site hrefs and linkify bare domain text
 * (avoids iOS opening http://ravezeto.hu → Cloudflare Host Error).
 */
export function normalizeLegalHtml(html: string): string {
  if (!html.trim()) return html;

  let out = html;

  out = out.replace(/href=(["'])([^"']+)\1/gi, (match, quote, rawHref) => {
    const href = rawHref.trim();
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(href)) return match;
    if (/^www\.ravezeto\.hu\/?$/i.test(href)) {
      return `href=${quote}${RAVEZETO_SITE_URL}${quote}`;
    }
    if (/^ravezeto\.hu\/?$/i.test(href)) {
      return `href=${quote}${RAVEZETO_SITE_URL}${quote}`;
    }
    return match;
  });

  const segments = out.split(/(<a\b[\s\S]*?<\/a>)/gi);
  out = segments
    .map((segment, index) => {
      if (index % 2 === 1) return segment;
      return segment.replace(/(?<![@/])(?<![\w.])(?:www\.)?ravezeto\.hu(?![\w.])/gi, (match) => {
        const label = match.toLowerCase().includes('www.') ? 'www.ravezeto.hu' : BARE_DOMAIN;
        return `<a href="${RAVEZETO_SITE_URL}">${label}</a>`;
      });
    })
    .join('');

  return out;
}
