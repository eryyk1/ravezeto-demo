# Rávezető — URL Redirect Strategy

> Maps all known live WordPress URLs to the new site structure  
> Implement as server redirects (nginx/Apache) or SPA fallback routes at deploy time  
> **Do not modify production WordPress** — this is the target map for the new React site

---

## Primary Page Redirects

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/` | `/` | Home |
| `/fooldal/` | `/` | Legacy home slug |
| `/fooldal-2-2/` | `/` | Old page slug |
| `/csapatunk/` | `/rolunk` | About Us |
| `/magunkrol/` | `/rolunk` | Merge into About |
| `/munkatarsaink/` | `/rolunk` | Team → About |
| `/tanacsadas/` | `/tanacsadas` | Consulting hub |
| `/szolgaltatasaink/` | `/tanacsadas` | Services → Consulting |
| `/szolgaltatasok/` | `/tanacsadas` | New theme slug |
| `/felnottkepzes/` | `/felnottkepzes` | Training |
| `/felnottkepzesek/` | `/felnottkepzes` | New theme slug |
| `/referenciaink/` | `/referenciak` | References |
| `/referenciaink-2/` | `/referenciak` | Old slug |
| `/palyazatok/` | `/palyazatok` | Grants |
| `/mentally/` | `/mentally` | Product page |
| `/kapcsolat/` | `/kapcsolat` | Contact |
| `/kapcsolatok/` | `/kapcsolat` | New theme slug |
| `/csr/` | `/tarsadalmi-felelossegvallalas` | CSR |
| `/impresszum/` | `/jogi/impresszum` | Legal |

---

## Service Detail Redirects

Map old service slugs (from `services` CPT) to new consulting sub-pages:

| Old path | New path |
|----------|----------|
| `/szolgaltatasaink/strategiaalkotas-es-szervezetfejlesztes/` | `/tanacsadas/szervezetfejlesztes` |
| `/szolgaltatasaink/projekttervezes-es-menedzsment/` | `/tanacsadas/projektmenedzsment` |
| `/szolgaltatasaink/human-fejlesztes/` | `/tanacsadas/human-fejlesztes` |
| `/szolgaltatasaink/uzleti-edzes-coaching/` | `/tanacsadas/coaching` |
| `/szolgaltatasaink/munkahelyi-stressz-audit/` | `/tanacsadas/stressz-audit` |
| `/szolgaltatasaink/kutatas/` | `/tanacsadas/kutatas` |
| `/szolgaltatasaink/felnottkepzes/` | `/felnottkepzes` |

---

## Grant / Tender Redirects

| Old URL | New URL |
|---------|---------|
| `/aktualis-ginop-es-vekop-palyazatok/` | `/palyazatok` |
| `/ginop-5-3-1-14-2015-00051/` | `/palyazatok/ginop-5-3-1-14-2015-00051` |
| `/ginop-plusz-3-2-1-21/` | `/palyazatok/ginop-plusz-3-2-1-21` |
| `/képzések-uniós-forrásból/` | `/palyazatok` |

---

## Reference Category Redirects

| Old (inferred from references CPT slugs) | New |
|------------------------------------------|-----|
| `/referenciak/gazdasagi-tarsasagok/` | `/referenciak/gazdasagi-tarsasagok` |
| `/referenciak/kozponti-kozigazgatasi-intezmenyek/` | `/referenciak/kozponti-kozigazgatasi-intezmenyek` |
| `/referenciak/felsooktatasi-intezmenyek/` | `/referenciak/felsooktatasi-intezmenyek` |
| `/referenciak/onkormanyzatok/` | `/referenciak/onkormanyzatok` |
| `/referenciak/nemzetkozi-projektek/` | `/referenciak/nemzetkozi-projektek` |
| `/referenciak/fejleszto-es-kutato-intezetek/` | `/referenciak/fejleszto-es-kutato-intezetek` |
| `/referenciak/ginop-5-3-1/` | `/referenciak/ginop-5-3-1` |

---

## Legal & Utility Redirects

| Old URL | New URL | Action |
|---------|---------|--------|
| `/tajekoztato-cookie-k-hasznalatarol/` | `/jogi/cookie` | 301 |
| `/wp-content/uploads/2025/03/Adatvedelmi_2025.pdf` | `/jogi/adatvedelem` | Link to PDF |
| `/wp-content/uploads/2018/08/GDPR_Kapcsolatok.pdf` | `/jogi/gdpr` | Link to PDF |
| `/sikeres-kuldes/` | `/kapcsolat?submitted=1` | Form success |
| `/rolunk-mondtak/` | `/rolunk#ugyfeleink-mondtak` | Anchor redirect |

---

## Retire / 410 Gone

These URLs should not redirect to meaningful content:

| Old URL | Action | Reason |
|---------|--------|--------|
| `/teszt/` | 410 or redirect `/` | Test page |
| `/empx/` | 410 or `/mentally` | Legacy product — confirm with client |
| `/empx-bevezeto/` | 410 or `/mentally` | Superseded by Mentally |
| `/munkatarsaink/` (duplicate) | → `/rolunk` | Consolidated |
| Spam blog posts (Gamstop etc.) | 410 | SEO spam in backup — never migrate |

---

## Contact Sub-page Redirects

| Old URL | New URL |
|---------|---------|
| `/kapcsolat/kapcsolat-ugyfelszolgalat/` | `/kapcsolat#ugyfelszolgalat` |
| `/kapcsolat/kapcsolat-irodaink/` | `/kapcsolat#iroda` |
| `/kapcsolat/kapcsolat-telefon/` | `/kapcsolat#elerhetoseg` |
| `/kapcsolat/kapcsolat-felnottkepzes/` | `/kapcsolat#felnottkepzes` |

---

## Media & Upload Paths

| Old pattern | New pattern |
|-------------|-------------|
| `/wp-content/uploads/*` | `/assets/*` | Copy to React public folder, redirect or serve statically |

---

## Implementation Notes (Phase 2)

```nginx
# Example nginx redirect block (deploy time only)
location = /magunkrol { return 301 /rolunk; }
location = /szolgaltatasaink { return 301 /tanacsadas; }
location = /kapcsolatok { return 301 /kapcsolat; }
# ... full list generated from this document
```

For SPA (Vite dev / static hosting): use `_redirects` file (Netlify) or `vercel.json` redirects — **only when user explicitly requests deploy**.

During local development (`npm run dev`): React Router handles new URLs only; redirects tested at deploy configuration stage.

---

## Redirect Count Summary

| Category | Count |
|----------|-------|
| Primary pages | 18 |
| Service details | 7 |
| Grants/tenders | 4 |
| Reference categories | 7 |
| Legal/utility | 6 |
| Contact sub-pages | 4 |
| Retire/410 | 5+ |
| **Total** | ~51 redirects |
