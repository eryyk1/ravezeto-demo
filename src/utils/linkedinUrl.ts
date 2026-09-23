/** Validates LinkedIn profile or company URLs for team member links. */
const LINKEDIN_URL_RE =
  /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9%-._~]+\/?(\?.*)?$/i;

export function isValidLinkedInUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  try {
    const url = new URL(trimmed);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    return LINKEDIN_URL_RE.test(url.origin + url.pathname + url.search);
  } catch {
    return false;
  }
}

export function normalizeLinkedInUrl(value: string | undefined): string | undefined {
  const trimmed = value?.trim() ?? '';
  return trimmed ? trimmed : undefined;
}
