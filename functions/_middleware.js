/** Returns HTTP 410 Gone for retired/spam URLs (ported from Vercel /api/gone). */

const GONE_PATHS = new Set([
  '/teszt',
  '/csr',
  '/70-uk-gambling-dens-not-on-gamstop-best-web-sites-of-july-2025',
  '/uk-non-gamstop-bookmakers',
  '/best-non-gamstop-casinos-in-typically-the-uk-2025',
  '/online-casino-transaction-methods-deposit-options-2025',
  '/category/egyeb',
  '/category/palyazat',
  '/category/munkatarsak',
  '/category/referenciak',
  '/author/papajcsikaron',
  '/api/gone',
  '/gone',
]);

const GONE_HTML = `<!doctype html>
<html lang="hu">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex, nofollow" />
  <title>410 – Az oldal már nem elérhető</title>
</head>
<body>
  <h1>410 – Az oldal már nem elérhető</h1>
  <p>Ez az URL véglegesen megszűnt.</p>
  <p><a href="/">Vissza a főoldalra</a></p>
</body>
</html>`;

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export async function onRequest(context) {
  const path = normalizePath(new URL(context.request.url).pathname);
  if (!GONE_PATHS.has(path)) {
    return context.next();
  }

  return new Response(GONE_HTML, {
    status: 410,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
