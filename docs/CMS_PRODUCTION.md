# Rávezető CMS — production architecture

## 1. Old architecture (before this work)

- **CMS state:** `localStorage` key `ravezeto_cms_v5` (legacy `v1`–`v4` migrated/purged).
- **Public site:** Read `published` from the same in-browser store after optional fetch of `/cms/published.json`.
- **Build snapshot:** `npm run build` writes `public/cms/published.json` from **code defaults only** (`createDefaultContent()`), not from admin edits.
- **Bug:** `syncPublishedFromServer()` ignored `payload.published` and reset to defaults only.
- **Images:** `ImageField` stored **base64 data URLs** in CMS JSON (localStorage), not suitable for production.
- **Admin auth:** JWT via `/api/admin/login` (Worker or Vite dev plugin); session in `sessionStorage`.
- **Contact:** `/api/contact` → Resend (Worker / dev plugin).

## 2. What was wrong

| Issue | Impact |
|--------|--------|
| localStorage as source of truth | Edits visible only on the admin’s browser |
| Broken published sync | Deployed `/cms/published.json` never applied real content |
| No server publish API | “Publikálás” did not update shared production data |
| Base64 images in CMS | Large, non-portable, not shared across devices |

## 3. New architecture (hybrid, hosting-aware)

```
ADMIN UI → publishToServer() → POST /api/cms/publish → persistent storage
PUBLIC   → GET /api/cms/published (fallback: /cms/published.json)
```

**Shared hosting (PHP — Option A):**

- `public/api/cms/index.php` writes:
  - `data/cms/state.json` (full CMS: draft, published, versions, activity)
  - `public/cms/published.json` (public snapshot)
- Image uploads: `POST /api/cms/upload` → `public/assets/uploads/cms/*`

**Cloudflare Workers (Option B — already in repo):**

- Same routes in `worker/index.js` → `functions/api/cms/handlers.js`
- Persistent storage requires **Workers KV** binding `CMS_KV` (see `wrangler.jsonc` comment).
- Without KV, publish returns **503** with a clear error (no silent localStorage-only production).

**Local dev:**

- `vite.cmsApiPlugin.ts` mirrors PHP file storage under `data/cms/` + `public/cms/published.json`.

## 4. Where production data lives

| Hosting | Authoritative store | Public read |
|---------|---------------------|-------------|
| PHP shared | `data/cms/state.json` | `/cms/published.json` + `/api/cms/published` |
| Cloudflare + KV | KV key `cms:state` | `/api/cms/published` (+ static fallback) |
| Static-only (no API) | Build-time `public/cms/published.json` only | No live admin publish |

## 5. Admin ↔ server

- `GET /api/cms/state` (Bearer JWT) — load full state after login
- `PUT /api/cms/state` — save draft (optional; publish includes full state)
- `POST /api/cms/publish` — publish draft to shared storage
- `POST /api/cms/upload` — image file (PHP); dev returns 501 → fallback base64 locally only

Client: `src/services/content/cmsApi.ts`, `contentStore.publishToServer()`.

## 6. Public site data flow

- On load: `contentStore.syncPublishedFromServer()` → **`/api/cms/published`**, then `/cms/published.json`.
- **Public routes do not read localStorage for content.**
- Admin routes may still cache draft in `localStorage` for UX/offline editing.

## 7. localStorage usage now

| Key | Purpose |
|-----|---------|
| `ravezeto_cms_v5` | Admin draft/cache only (not public source of truth) |
| `sessionStorage` admin JWT | Session only |

## 8. Hosting configuration

### PHP (typical shared hosting)

1. Deploy `dist/` contents to web root (or point vhost to `dist`).
2. Copy `public/api/cms/` PHP files into web-accessible `/api/cms/`.
3. Copy `config.example.php` → `config.php`; set `root_path` to project root (folder containing `data/` and `public/`).
4. Set **`ADMIN_JWT_SECRET`** in server env (must match admin login signer).
5. Ensure **`data/cms/`** and **`public/assets/uploads/cms/`** are writable by PHP.
6. Configure existing admin login (same secrets as Worker: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`).

Apache: `.htaccess` in `/api/cms/` routes to `index.php`.

### Cloudflare Workers

1. `npm run build && npx wrangler deploy`
2. Add KV namespace, bind as `CMS_KV` in `wrangler.jsonc`.
3. Set secrets: `ADMIN_*`, `RESEND_*`, `ADMIN_JWT_SECRET`.

### Contact form

- Still **`POST /api/contact`** on Worker; on PHP-only host you need equivalent PHP endpoint or proxy (not included — add if moving off Cloudflare).

## 9. Environment variables (server-side only)

| Variable | Used for |
|----------|----------|
| `ADMIN_EMAIL` | Admin login |
| `ADMIN_PASSWORD` | Admin login |
| `ADMIN_JWT_SECRET` | JWT sign/verify (admin + CMS API) |
| `CLIENT_ADMIN_*` | Optional second admin |
| `RESEND_API_KEY` | Contact email |
| `CONTACT_FROM_EMAIL` | Contact sender |

Optional frontend (only if using Supabase auth instead of API login):

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

Never put Resend or admin passwords in Vite `VITE_*` client vars.

## 10. Deployment steps

1. `npm ci`
2. `npm run build` (generates `dist/`, updates `public/cms/published.json` from `data/cms/state.json` if present)
3. Upload/deploy `dist/` + PHP API + writable `data/cms/`
4. First publish from `/admin` to create server state
5. Verify in private window: public site shows published text

## 11. Database setup

**None required** for default JSON file CMS. Optional future: MySQL blob for `state.json` if host forbids file writes outside DB.

## 12. Build status

Run after changes:

```bash
npm run build
```

## 13. Remaining limitations

- **First publish** required before `GET /api/cms/state` returns data on empty server.
- **Cloudflare** publish needs KV configured; otherwise use PHP hosting or static snapshot-only.
- **Contact form** on pure PHP hosting needs a PHP port of `/api/contact` if Worker is not used.
- **Dev image upload** falls back to base64 unless PHP API is available.
- **Entity list pages** (team/partners/references) still save draft locally until publish pushes full state.

## Regenerate logo assets (Referenciák)

If partner marquee images are missing:

```bash
node scripts/extract-referenciak-images.mjs "path/to/RAV-honlap.html"
```
