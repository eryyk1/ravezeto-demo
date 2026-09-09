/** Returns HTTP 410 Gone for retired/spam URLs (rewritten by vercel.json). */
export default function handler(_req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.status(410).send(`<!doctype html>
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
</html>`);
}
