# Rávezető — Project Documentation

React + Vite single-page application for [ravezeto.hu](https://www.ravezeto.hu). This document covers structure, development, deployment, content editing, and key integrations.

---

## Project structure

```
ravezeto-react-test/
├── public/                    # Static assets (copied as-is to dist/)
│   ├── assets/
│   │   ├── logo.svg           # Light logo (header/footer on dark backgrounds)
│   │   ├── logo-dark.svg      # Dark logo (scrolled header)
│   │   ├── illustrations/     # SVG service/section illustrations
│   │   ├── images/            # Theme photos (home/, Széchenyi logo, etc.)
│   │   ├── wp-uploads/        # Mirrored WordPress media (team photos, EU banners)
│   │   └── documents/         # Legal PDFs
│   ├── cropped-ravezeto_logo-*.jpg   # Favicons (from live site)
│   ├── og-image.jpg           # Open Graph / Twitter card image
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── App.tsx                # Route definitions
│   ├── main.tsx               # React entry
│   ├── index.css              # Global styles + design tokens
│   ├── components/
│   │   ├── shell/             # Layout, SiteHeader, SiteFooter, PageTransition
│   │   ├── home/              # HeroUniverse galaxy, HomeHeader/Footer, PremiumButton
│   │   ├── consulting/        # Tanácsadás page sections
│   │   ├── training/          # Felnőttképzés sections
│   │   ├── grants/            # Pályázatok sections
│   │   ├── mentally/          # Mentally landing sections
│   │   ├── kapcsolat/         # Contact form, map, details
│   │   ├── pages/             # Shared page primitives (heroes, CTAs, sections)
│   │   ├── seo/               # PageMetaManager
│   │   └── typography/        # DisplayHeading, SectionLabel
│   ├── content/               # Site-wide copy (navigation, company, page data)
│   ├── data/media.ts          # Image path helpers (wpUpload, themeImage)
│   ├── hooks/                 # usePageMeta, useCompactViewport, useReducedMotion
│   ├── pages/                 # One folder per route
│   │   ├── home/
│   │   ├── rolunk/
│   │   ├── tanacsadas/
│   │   ├── felnottkepzes/
│   │   ├── referenciak/
│   │   ├── palyazatok/
│   │   ├── mentally/
│   │   ├── kapcsolat/
│   │   ├── jogi/
│   │   └── NotFoundPage.tsx
│   ├── seo/                   # config.ts, pageMeta.ts
│   └── styles/responsive.css  # Mobile/tablet overrides
├── docs/
│   ├── PRODUCTION_REPORT.md
│   └── REDIRECTS.md           # Legacy WordPress URL map
├── vercel.json                # SPA rewrites + legacy redirects
├── index.html                 # Root HTML, fonts, default meta
├── package.json
└── vite.config.ts
```

---

## Local development

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

Opens at `http://localhost:5173/` with hot reload.

### Preview production build locally

```bash
npm run build
npm run preview
```

### Environment variables

Create `.env` or `.env.local` in the project root:

```env
# Required for contact form submission in production
VITE_FORMSPREE_CONTACT=https://formspree.io/f/YOUR_FORM_ID

# Optional — defaults to https://www.ravezeto.hu
VITE_SITE_URL=https://www.ravezeto.hu
```

Restart the dev server after changing env vars.

---

## Production build

```bash
npm run build
```

Output is written to `dist/`. TypeScript is checked (`tsc -b`) before Vite bundles the app.

---

## Vercel deployment

### 1. Connect repository

1. Push the project to GitHub (or GitLab/Bitbucket).
2. In [Vercel](https://vercel.com), **Add New Project** and import the repo.
3. Set **Root Directory** to `ravezeto-react-test` if the repo contains multiple folders.
4. Framework preset: **Vite** (auto-detected).

### 2. Build settings

| Setting        | Value           |
|----------------|-----------------|
| Build Command  | `npm run build` |
| Output Directory | `dist`        |
| Install Command | `npm install`  |

### 3. Environment variables (Vercel dashboard)

| Name | Value |
|------|-------|
| `VITE_FORMSPREE_CONTACT` | Your Formspree form URL |
| `VITE_SITE_URL` | `https://www.ravezeto.hu` (or preview URL for staging) |

### 4. SPA routing

`vercel.json` at the project root configures:

- **Rewrites** — all non-asset paths serve `index.html` so direct URLs and refresh work.
- **Redirects** — common legacy WordPress paths (e.g. `/csapatunk` → `/rolunk`).

No extra Vercel configuration is needed beyond deploying with this file present.

### 5. Custom domain

1. Vercel → Project → **Settings** → **Domains**
2. Add `www.ravezeto.hu` and `ravezeto.hu`
3. Update DNS per Vercel instructions (A/CNAME records)

### 6. Post-deploy

- Submit `https://www.ravezeto.hu/sitemap.xml` in Google Search Console
- Confirm contact form sends to `info@ravezeto.hu`
- Test deep links: `/rolunk`, `/tanacsadas/coaching`, `/kapcsolat`, etc.

---

## Content editing locations

| Page / area | Primary files |
|-------------|---------------|
| **Navigation & footer links** | `src/content/navigation.ts` |
| **Company contact info** | `src/content/company.ts` |
| **Home hero & sections** | `src/content/home.ts`, `src/content/homeUniverse.ts`, `src/pages/home/sections/` |
| **Rólunk** | `src/content/rolunk.ts`, `src/content/team.ts` |
| **Tanácsadás** | `src/content/tanacsadas.ts`, `src/content/tanacsadasFramework.ts` |
| **Felnőttképzés** | `src/content/felnottkepzes.ts` |
| **Referenciák** | `src/content/referenciak.ts` |
| **Pályázatok** | `src/pages/palyazatok/palyazatokContent.ts` |
| **Mentally** | `src/pages/mentally/mentallyContent.ts` |
| **Kapcsolat** | `src/pages/kapcsolat/kapcsolatContent.ts` |
| **Jogi / legal** | `src/pages/jogi/jogiContent.ts` |
| **SEO titles & descriptions** | `src/seo/pageMeta.ts` |
| **Images (paths)** | `src/data/media.ts` — files live under `public/assets/` |

To change visible text, edit the relevant `content` or `*Content.ts` file and save. No rebuild logic beyond the normal dev HMR / production build.

---

## Contact form configuration

The contact form lives in `src/components/kapcsolat/KapcsolatForm.tsx` and reads its endpoint from `src/pages/kapcsolat/kapcsolatContent.ts`:

```ts
formspreeEndpoint: import.meta.env.VITE_FORMSPREE_CONTACT,
```

### Setup (Formspree)

1. Create a form at [formspree.io](https://formspree.io) targeting `info@ravezeto.hu`.
2. Copy the form URL (e.g. `https://formspree.io/f/abcdefgh`).
3. Set `VITE_FORMSPREE_CONTACT` in `.env.local` (dev) and Vercel env (production).
4. Redeploy after setting production env vars.

Without this variable, the form shows a configuration error and does not submit.

### How to replace the email provider later

The form POSTs JSON to `config.formspreeEndpoint`. To switch providers:

1. **Update the endpoint** in `kapcsolatContent.ts` or rename the env var (e.g. `VITE_CONTACT_FORM_ENDPOINT`).
2. **Adjust the fetch payload** in `KapcsolatForm.tsx` (`handleSubmit`) to match the new API:
   - Field names (name, email, phone, message)
   - Auth headers or API keys if required
   - Success/error response handling
3. **Update this documentation** and Vercel environment variables.
4. **Test** submission end-to-end on staging before switching production.

Compatible alternatives: Netlify Forms, Web3Forms, custom serverless function (Vercel `/api/contact`), Resend + API route, etc.

---

## Important routes and components

### Routes (`src/App.tsx`)

| Path | Page component | Notes |
|------|----------------|-------|
| `/` | `HomePage` | Galaxy hero, custom `HomeHeader` / `HomeFooter` |
| `/rolunk` | `RolunkPage` | About, team, timeline |
| `/tanacsadas/*` | `TanacsadasPage` | Sub-paths scroll to service anchors |
| `/felnottkepzes/*` | `FelnottkepzesPage` | Training programmes |
| `/referenciak` | `ReferenciakPage` | Client references |
| `/palyazatok` | `PalyazatokPage` | EU grants |
| `/mentally` | `MentallyPage` | Product landing; CTA → mentally.team |
| `/kapcsolat` | `KapcsolatPage` | Form + map |
| `/jogi/*` | `JogiPage` | Legal docs + PDF downloads |
| `*` | `NotFoundPage` | Branded 404 |

Legacy paths (`/csapatunk`, `/kapcsolatok`, etc.) redirect via `App.tsx` and `vercel.json`.

### Key shared components

| Component | Role |
|-----------|------|
| `Layout` | Wraps all pages; header/footer except home |
| `SiteHeader` / `SiteFooter` | Subpage chrome |
| `HomeHeader` / `HomeFooter` | Homepage-only chrome |
| `HeroUniverse` | Interactive galaxy navigation on home |
| `PageMetaManager` | Per-route `<title>`, meta, canonical |
| `PremiumButton` | Branded CTA links |
| `InnerPageHero` | Standard inner-page hero |
| `KapcsolatForm` | Contact form with validation |

### Tanácsadás anchor IDs

Footer and deep links use these slugs (must match `tanacsadasServices[].id`):

- `/tanacsadas/szervezetfejlesztes`
- `/tanacsadas/valtozasmenedzsment`
- `/tanacsadas/coaching`

---

## Additional references

- **Production audit:** `docs/PRODUCTION_REPORT.md`
- **Legacy URL redirects:** `docs/REDIRECTS.md`
- **Live reference site:** https://www.ravezeto.hu
