# Rávezető CMS — production architecture

## 1. Old architecture (before this work)

- **CMS state:** `localStorage` key `ravezeto_cms_v5` (legacy `v1`–`v4` migrated/purged).
- **Public site:** Read `published` from the same in-browser store after optional fetch of `/cms/published.json`.
- **Build snapshot:** `npm run build` writes `public/cms/published.json` from **code defaults only** (`createDefaultContent()`), not from admin edits.
- **Bug:** `syncPublishedFromServer()` ignored `payload.published` and reset to defaults only.
- **Images:** `ImageField` stored **base64 data URLs** in CMS JSON (localStorage), not suitable for production.
- **Admin auth:** JWT via `/api/admin/login` (Worker, Vite dev plugin, or PHP on shared hosting); client caches token in `sessionStorage`; server validates via `GET /api/admin/session`.
- **Contact:** `/api/contact` → Resend on Worker/Vite dev; **PHP shared hosting** uses `mail()` or SMTP via `api/contact/`.

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
| `sessionStorage` (`ravezeto_admin_session`) | Client cache of server-issued JWT only; validated via `/api/admin/session` |

## 8. Hosting configuration

### PHP (typical shared hosting)

1. Deploy `dist/` contents into the web **`public/`** tree (see layout below).
2. Ensure these API folders exist under the web root:
   - `api/cms/` — `index.php`, `lib.php`, `.htaccess`, **`config.php`** (from `config.example.php`)
   - `api/admin/` — `index.php`, `lib.php`, `.htaccess` (uses the **same** `api/cms/config.php` for secrets)
   - `api/contact/` — `index.php`, `lib.php`, `.htaccess` (same `config.php`; PHP `mail()` or SMTP)
3. Set **`root_path`** in `config.php` to the project root (folder containing `data/` and `public/`).
4. Configure **server-side only** (host env vars and/or `config.php` keys — never commit real values):
   - `ADMIN_JWT_SECRET` / `jwt_secret` — signs admin JWT and verifies CMS admin routes
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD` — primary admin
   - Optional: `CLIENT_ADMIN_EMAIL`, `CLIENT_ADMIN_PASSWORD`
   - Contact: `contact_from_email` / `CONTACT_FROM_EMAIL` (required on PHP; use an `@ravezeto.hu` address the host allows)
   - Optional: `contact_to_email` / `CONTACT_TO_EMAIL` — defaults to **`info@ravezeto.hu`** when empty
   - Optional SMTP (when `mail()` is unavailable or unreliable): `contact_smtp_host`, `contact_smtp_user`, `contact_smtp_password`, `contact_smtp_port`, `contact_smtp_encryption` (`tls`, `ssl`, or empty)
5. Writable by PHP: **`data/cms/`**, **`public/cms/`**, **`public/assets/uploads/cms/`**
6. **PHP 8.0+**, Apache **`mod_rewrite`** + `AllowOverride` for the **document root** `.htaccess` (SPA fallback), `api/cms/.htaccess`, `api/admin/.htaccess`, and `api/contact/.htaccess`.

**Admin auth endpoints (PHP, no Node):**

| Method | URL | Response |
|--------|-----|----------|
| POST | `/api/admin/login` | `{ accessToken, expiresAt, user }` + HttpOnly cookie `ravezeto_admin_jwt` |
| GET | `/api/admin/session` | `Authorization: Bearer <token>` → `{ user, expiresAt }` |
| POST | `/api/admin/logout` | `{ ok: true }` (clears HttpOnly cookie) |

The React admin still sends **`Bearer`** from `sessionStorage` (unchanged contract). The cookie is an extra server-side session hint; **authority is the JWT verified on the server**, not browser localStorage.

**Contact form (PHP, no Node):**

| Method | URL | Body (JSON) | Response |
|--------|-----|-------------|----------|
| POST | `/api/contact` | `{ name, email, message, phone?, website }` | `{ ok: true }` or `{ error }` |

- **`website`** is a honeypot; non-empty values are rejected (same as Worker).
- **Same-origin** check when `Origin` is sent; no broad CORS headers.
- Email is sent with PHP **`mail()`** (default) or **SMTP** (when configured) to the server inbox (default `info@ravezeto.hu`); visitor **`Reply-To`** is their validated email.
- Messages are **not stored** on disk (same as Worker).

**Upload layout (matches `lib.php` paths):**

```text
/home/USER/ravezeto/              ← root_path in config.php
├── data/cms/                     ← writable; state.json
└── public/                       ← document root
    ├── index.html                ← from dist/
    ├── cms/published.json
    ├── assets/
    └── api/
        ├── cms/config.php        ← single config for CMS + admin
        ├── cms/index.php …
        ├── admin/index.php …
        └── contact/index.php …
```

### Cloudflare Workers

1. `npm run build && npx wrangler deploy` (only when ready — do not deploy until configured).
2. Uncomment and fill in `wrangler.jsonc`:
   - **`CMS_KV`** — live CMS publish/read (required for admin publish).
   - **`CMS_UPLOADS`** (R2) — `/api/cms/upload` and serving `/assets/uploads/cms/*`.
3. Worker secrets / vars: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`, optional `CLIENT_ADMIN_*`, **`RESEND_API_KEY`**, **`CONTACT_FROM_EMAIL`**.
4. Contact on Workers: **`POST /api/contact-submit.php`** and **`POST /api/contact`** both use Resend (`functions/api/contact.js`). PHP mail is **not** used on Cloudflare.
5. After first deploy with KV, publish once from `/admin` to sync CMS state (or import KV from dev export if you add a migration later).

### Contact form

- **`POST /api/contact`** on Worker **or** PHP (`public/api/contact/`) when deploying to shared hosting (e.g. `dev.ravezeto.hu`).

## 9. Environment variables (server-side only)

| Variable | Used for |
|----------|----------|
| `ADMIN_EMAIL` | Admin login |
| `ADMIN_PASSWORD` | Admin login |
| `ADMIN_JWT_SECRET` | JWT sign/verify (admin + CMS API) |
| `CLIENT_ADMIN_*` | Optional second admin |
| `RESEND_API_KEY` | Contact email on **Cloudflare Worker** only |
| `CONTACT_FROM_EMAIL` | PHP/Worker sender address |
| `CONTACT_TO_EMAIL` | Optional inbox override (PHP default: `info@ravezeto.hu`) |
| `CONTACT_SMTP_*` | Optional PHP SMTP (host, port, user, password, encryption) |

Optional frontend (only if using Supabase auth instead of API login):

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

Never put SMTP passwords, Resend keys, or admin passwords in Vite `VITE_*` client vars.

## 10. Deployment steps

1. `npm ci`
2. `npm run build` (generates `dist/`, updates `public/cms/published.json` from `data/cms/state.json` if present)
3. Upload/deploy `dist/` (includes `api/cms/`, `api/admin/`, `api/contact/`) + create `api/cms/config.php` + writable `data/cms/`
4. Add contact keys to `config.php` (or host env): at minimum `contact_from_email`; add SMTP keys if the host requires authenticated SMTP
5. First publish from `/admin` to create server state
6. Verify in private window: public site shows published text
7. Test contact form on `/kapcsolat` (see safe test steps below)

**Safe contact test on dev (`dev.ravezeto.hu`):**

1. Confirm `api/contact/index.php` exists and `config.php` has contact mail settings (no secrets in git or browser).
2. Open `/kapcsolat`, submit with a **distinct test subject line in the message** (e.g. “DEV test – please ignore”) and your own email as the visitor address.
3. Expect success copy: “Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot.”
4. Check **`info@ravezeto.hu`** (or `contact_to_email`) for the message; use **Reply** to confirm `Reply-To` is the visitor email.
5. Optional API check without secrets: `POST /api/contact` with `{}` → **400**; honeypot `website` filled → **400**; missing `contact_from_email` → **503**.

## 9b. PHP `config.php` keys (contact)

| Key | Env fallback | Purpose |
|-----|--------------|---------|
| `contact_from_email` | `CONTACT_FROM_EMAIL` | **Required** — envelope/from address (typically `@ravezeto.hu`) |
| `contact_from_name` | `CONTACT_FROM_NAME` | Display name (default: Rávezető weboldal) |
| `contact_to_email` | `CONTACT_TO_EMAIL` | Recipient (optional; default `info@ravezeto.hu`) |
| `contact_transport` | `CONTACT_TRANSPORT` | `mail`, `smtp`, or empty (auto) |
| `contact_smtp_host` | `CONTACT_SMTP_HOST` | SMTP server hostname |
| `contact_smtp_port` | `CONTACT_SMTP_PORT` | Usually `587` (TLS) or `465` (SSL) |
| `contact_smtp_encryption` | `CONTACT_SMTP_ENCRYPTION` | `tls`, `ssl`, or empty |
| `contact_smtp_user` | `CONTACT_SMTP_USER` | SMTP username (often full email) |
| `contact_smtp_password` | `CONTACT_SMTP_PASSWORD` | SMTP password (server-only) |

**Transport choice:** On typical shared hosting, start with **`mail()`** only (`contact_from_email` set, SMTP keys empty). If messages do not arrive or `mail()` returns false, set **`contact_transport` → `smtp`** and fill SMTP fields from the hosting control panel (outgoing mail / mailbox credentials). Literal values in `config.php` work without environment variables (same pattern as admin credentials).

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
- **Contact form** on PHP requires `contact_from_email` (and SMTP if `mail()` is not reliable on the host).
- **Admin auth on PHP** requires `api/admin/` deployed alongside `api/cms/` and the same `config.php` secrets as CMS.
- **Dev image upload** falls back to base64 unless PHP API is available.
- **Entity list pages** (team/partners/references) still save draft locally until publish pushes full state.

## Regenerate logo assets (Referenciák)

If partner marquee images are missing:

```bash
node scripts/extract-referenciak-images.mjs "path/to/RAV-honlap.html"
```
