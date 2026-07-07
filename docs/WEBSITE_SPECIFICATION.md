# Rávezető Projekt Kft. — Website Specification (Phase 1)

> **Status:** Approved workflow — extended specification complete — **NO REACT CODE YET**  
> **Generated:** 2026-07-06 | **Updated:** 2026-07-06  
> **Documentation index:** [README.md](./README.md)

| Document | Purpose |
|----------|---------|
| [CONTENT_INVENTORY.md](./CONTENT_INVENTORY.md) | Full verbatim backup content |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Colours, typography, components |
| [ART_DIRECTION.md](./ART_DIRECTION.md) | Page art direction + wow sections |
| [REDIRECTS.md](./REDIRECTS.md) | URL redirect map |
| [FORMS.md](./FORMS.md) | Form handling recommendation |
| [MISSING_CONTENT.md](./MISSING_CONTENT.md) | Missing content register |

---

## Executive Summary

This specification defines a complete digital rebranding of **Rávezető Projekt Kft.** — not a reskin of the existing WordPress theme, and not a generic React landing page.

The new site must read as a **flagship portfolio** for an enterprise consulting and adult-training firm: premium, confident, strategic, professional, human — comparable to top-tier management consultancies, without copying any existing site.

**Constraints confirmed:**
- Logo remains exactly as-is (source: `themes/RavezetoNewTheme/images/home/logo.png`)
- Primary brand colour = green from the logo
- All body copy sourced from backup — no AI-generated marketing replacement
- Homepage introduces and routes; detail lives on dedicated pages
- Each major service/page has its own visual identity

---

## Part A — Content Inventory Summary

Full verbatim content is in `docs/CONTENT_INVENTORY.md` (human-readable) and `docs/CONTENT_INVENTORY.json` (structured). Below is the index only.

### A.1 Backup Sources Analysed

| Source | Location | Notes |
|--------|----------|-------|
| SQL database | `ravezeto.hu_wpvivid-*_backup_db.sql` | 696 posts total, 198 published |
| Uploads | `uploads/` | 733 files (682 images, 6 PDFs) |
| Active theme | `themes/RavezetoNewTheme/` | 224 theme images, 12 content templates |
| Package info | `wpvivid_package_info.json` | WP 6.8.5, PHP 8.4.22 |

### A.2 Content Types Extracted

| Type | Count | Use on new site |
|------|-------|-----------------|
| Pages | 29 | Primary page content |
| Services (`services`) | 7 | Individual service detail pages |
| References (`references`) | 7 | Reference category pages |
| Colleagues | 8 | Team page |
| Logos | 34 | References / trust strip |
| Trainings (`trainings`) | 25 | Felnőttképzés catalogue |
| Trainings main/strategy | 8 | Training taxonomy |
| Tenders (`tenders`) | 2 | Pályázat landing pages |
| EMPX posts | 6 | Legacy/alternate product content |
| Blog posts | 44 | Optional news/archive |
| Nav menu items | 19 | Navigation reconstruction |

### A.3 Company Contact (verbatim)

```
Cégnév: RÁvezető Projekt Kft.
Székhely: 1146 Budapest, Izsó u. 7. 1/3.
Telefon: +36 70 513 4128 / 06 1 798 80 33
E-mail: info@ravezeto.hu / kepzes@ravezeto.hu (pályázat)
Web: www.ravezeto.hu
Felnőttképzés (legacy): E-000362/2014
Felnőttképzés (current template): B/2020/001943, E/2021/000106
Ügyfélszolgálat: H-P 9.00–16.00, 6. kapucsengő
Facebook: https://www.facebook.com/profile.php?id=100063907730525
```

### A.4 Services (from SQL — full content in inventory)

1. **Projekttervezés és menedzsment** (`projekttervezes-es-menedzsment`)
2. **Stratégiaalkotás és szervezetfejlesztés** (`strategiaalkotas-es-szervezetfejlesztes`)
3. **Humán fejlesztés** (`human-fejlesztes`)
4. **Üzleti edzés, coaching** (`uzleti-edzes-coaching`)
5. **Felnőttképzés** (`felnottkepzes`) — service CPT
6. **Munkahelyi Stressz Audit** (`munkahelyi-stressz-audit`)
7. **Kutatás, Felmérés** (`kutatas`)

### A.5 Reference Categories (from SQL)

1. Gazdasági társaságok
2. Központi közigazgatási intézmények
3. Felsőoktatási intézmények
4. Önkormányzatok
5. Nemzetközi projektek
6. Fejlesztő- és kutató intézetek
7. GINOP 5.3.1

### A.6 Team Members (from SQL)

| Name | Slug | Portrait (uploads path) |
|------|------|-------------------------|
| Ríz Ádám | veztek-keresztnev2 | 2017/01/Riz-Adam.jpg |
| Bíró Gabriella | biro-gabriella | 2016/06/portrait_biro_gabriella.jpg |
| Duleba Marianna | duleba-marianna | *(missing from uploads — see Missing Content)* |
| Halász Krisztina | halasz-krisztina | *(missing)* |
| Mázásné Dinnyés Hajnalka | mazasne-dinnyes-hajnalka | *(missing)* |
| Soós Andrea | soos-andrea | 2019/12/portrait_soos_andrea-e1575455494622.jpg |
| Molnár Zsolt | molnar-zsolt | 2019/12/portrait_molnar_zsolt-e1575460119239.jpg |
| Dr. Szalay Árpád | dr-szalay-arpad | 2020/01/portrait_szalay_arpad-e1579080209295.jpg |

### A.7 Downloadable Documents (uploads/)

| File | Purpose |
|------|---------|
| `2017/04/palyazati_lehetosegek.pdf` | Pályázati lehetőségek |
| `2017/06/PR_Ravezeto_Projekt_Kft_0531_02.pdf` | PR anyag |
| `2018/05/RAvezeto_belso_adatkezelesi_szab.pdf` | Belső adatkezelési szabályzat |
| `2018/08/GDPR_Kapcsolatok.pdf` | GDPR / kapcsolatok |
| `2025/02/Ginop-5.3.1.-14.pdf` | GINOP projekt dokumentum |
| `2025/03/Adatvedelmi_2025.pdf` | Adatvédelmi tájékoztató |

### A.8 Key Statistics (homepage — verbatim from front-page.php)

- 16 év tanácsadói tapasztalat
- Több mint 400 tanácsadási projekt
- Több mint 200 elégedett, visszatérő ügyfél
- Több mint 250 képzési projekt (10 éve felnőttképző intézményként)
- Több mint 3500 résztvevő a képzéseinken
- Több mint 200 együttműködő tanácsadó

### A.9 Illustrations & Graphics (uploads + theme)

- **43 SVG illustrations** in uploads (2016–2017): service icons, inner pages, EMPX, references
- **224 theme images**: homepage backgrounds, Mentally graphics, partner logos, buttons, arrows, video (`images/video/Mentally.mp4`)
- **34 partner logo CPT entries** with JPG attachments in uploads/2023/01 and older

---

## Part B — Sitemap

```
/ ................................................ Főoldal (introduction + routing)
│
├── /rolunk ...................................... Csapatunk (team, values, testimonials)
│
├── /tanacsadas .................................. Tanácsadás (hub)
│   ├── /tanacsadas/szervezetfejlesztes .......... Stratégiaalkotás és szervezetfejlesztés
│   ├── /tanacsadas/projektmenedzsment ........... Projekttervezés és menedzsment
│   ├── /tanacsadas/human-fejlesztes ............. Humán fejlesztés
│   ├── /tanacsadas/coaching ..................... Üzleti edzés, coaching
│   ├── /tanacsadas/stressz-audit ................ Munkahelyi Stressz Audit
│   └── /tanacsadas/kutatas ...................... Kutatás, Felmérés
│
├── /felnottkepzes ............................... Felnőttképzés (hub)
│   └── /felnottkepzes/[slug] .................... Individual training programmes (25)
│
├── /palyazatok .................................. Pályázatok (hub)
│   ├── /palyazatok/ginop-5-3-1-14-2015-00051 .... GINOP tender page
│   └── /palyazatok/ginop-plusz-3-2-1-21 ......... GINOP Plusz tender page
│
├── /referenciak ................................. Referenciák (hub)
│   └── /referenciak/[category-slug] ............... 7 reference categories
│
├── /mentally .................................... Mentally product page
│
├── /tarsadalmi-felelossegvallalas ............... CSR / Társadalmi felelősségvállalás
│
├── /kapcsolat ................................... Kapcsolat + forms
│
└── /jogi ........................................ Legal footer cluster
    ├── /jogi/impresszum
    ├── /jogi/adatvedelem .......................... Adatvedelmi_2025.pdf
    ├── /jogi/cookie
    └── /jogi/gdpr ............................... GDPR_Kapcsolatok.pdf
```

**Retired / redirect from old URLs:**
- `/magunkrol` → merge into `/rolunk` or redirect
- `/szolgaltatasok`, `/szolgaltatasaink` → `/tanacsadas`
- `/felnottkepzesek` → `/felnottkepzes`
- `/kapcsolatok` → `/kapcsolat`
- `/referenciaink` → `/referenciak`

---

## Part C — Navigation Structure

### C.1 Primary Navigation (desktop)

```
[LOGO]    Rólunk    Tanácsadás ▾    Felnőttképzés    Pályázatok    Referenciák    Mentally    Kapcsolat
```

**Tanácsadás dropdown:**
- Szervezetfejlesztés
- Projektmenedzsment
- Humán fejlesztés
- Coaching
- Stressz audit
- Kutatás

### C.2 Footer Navigation

```
Oszlop 1: Logo + tagline „Változásokat vezetünk, együtt!”
Oszlop 2: Szolgáltatások (6 links)
Oszlop 3: Cég (Rólunk, Referenciák, CSR, Pályázatok)
Oszlop 4: Elérhetőség + social
Oszlop 5: Jogi (Impresszum, Adatvédelem, Cookie, GDPR)
```

### C.3 Mobile Navigation

- Full-screen overlay, dark graphite background
- Staggered text reveal per item
- Accordion for Tanácsadás sub-items
- Persistent CTA: „Kapcsolatfelvétel”

---

## Part D — Page Hierarchy & Content Mapping

| Page | Primary source | Template reference | Background rhythm |
|------|---------------|-------------------|-------------------|
| Főoldal | front-page.php + SQL page 734 | front-page.php | dark → white → grey → white → dark green |
| Rólunk | template-csapatunk.php + colleagues CPT | template-csapatunk.php | white |
| Tanácsadás hub | template-tanacsadas.php + services | template-tanacsadas.php | dark |
| Service detail ×6 | services CPT (full HTML) | — | alternating per service |
| Felnőttképzés hub | template-felnottkepzes.php + trainings | template-felnottkepzes.php | light grey |
| Training detail ×25 | trainings CPT | — | white |
| Pályázatok hub | template-palyazatok.php + tenders | template-palyazatok.php | dark green |
| Tender detail ×2 | tenders CPT (591, 702) | — | white |
| Referenciák hub | template-referenciak.php + logos | template-referenciak.php | dark |
| Reference category ×7 | references CPT | — | light grey |
| Mentally | template-mentally.php | template-mentally.php | white + product accent |
| CSR | page 394 + template | template-tarsadalmi-felelossegunk.php | dark |
| Kapcsolat | template_kapcsolatok.php + page 740 | template_kapcsolatok.php | white |
| Jogi pages | pages 86, 331 + PDFs | — | light grey |

---

## Part E — Design System

### E.1 Brand Personality Matrix

| Attribute | Expression |
|-----------|------------|
| Premium | Restrained palette, generous whitespace (not empty), refined motion |
| Confident | Oversized headlines, declarative copy placement, strong vertical rhythm |
| Strategic | Blueprint grids, connector lines, diagram motifs |
| Professional | Structured information hierarchy, no decorative clutter |
| Human | Real portraits, authentic testimonials, warm white surfaces |
| Enterprise | Deep navy/graphite sections, institutional trust signals |

**Avoid:** luxury gold aesthetics, startup gradients, agency case-study clichés, beauty/wellness softness, Tailwind defaults, AI marketing tone.

### E.2 Colour Palette

> **Note:** Exact hex values for Primary Green and Dark Green must be sampled from `logo.png` during build. Provisional values below are directional placeholders pending logo extraction.

| Token | Role | Provisional hex | Usage |
|-------|------|-----------------|-------|
| `--green-primary` | Logo green | `#2D6B4F` *(sample)* | CTAs, active nav, accent lines |
| `--green-dark` | Deep brand green | `#1A4535` *(sample)* | Hero backgrounds, footer bands |
| `--navy-deep` | Enterprise anchor | `#0E1A2B` | Dark sections, header |
| `--graphite` | UI dark neutral | `#1C1F24` | Alternate dark sections |
| `--white-warm` | Primary light surface | `#F7F5F2` | Body backgrounds |
| `--grey-light` | Secondary surface | `#ECEAE6` | Alternating sections |
| `--grey-mid` | Borders, dividers | `#C8C4BC` | Subtle separators |
| `--text-primary` | Body text | `#1A1A18` | Paragraphs |
| `--text-secondary` | Supporting text | `#5A5F66` | Captions, meta |
| `--text-on-dark` | Light on dark | `#F7F5F2` | Dark section copy |

**Page rhythm (mandatory alternation):**
```
white → dark (navy/graphite) → light grey → white → dark green → white
```
No section longer than 1 viewport on plain white without texture, diagram, or typographic feature.

### E.3 Typography

| Role | Typeface (proposed) | Fallback | Notes |
|------|---------------------|----------|-------|
| Display / H1 | **Söhne Breit** or **Neue Haas Grotesk Display** | system-ui | Editorial oversized moments |
| Headings H2–H4 | **Söhne** or **Inter** (600–700) | sans-serif | Clean enterprise |
| Body | **Söhne** or **Source Sans 3** (400–500) | sans-serif | Long-form readability |
| Accent / Quotes | **Libre Baskerville** or **Lora** (italic) | serif | Testimonials, Shackleton quote |

**Typographic rules:**
- H1:  clamp(3rem, 8vw, 7rem) on hero sections — typography AS design
- Section labels: uppercase, letter-spacing 0.12em, 11–12px, green-primary
- Max line length: 65ch body, 40ch intro leads
- Hungarian hyphenation enabled

### E.4 Spacing & Grid

- Base unit: **8px**
- Section padding: 120–160px vertical (desktop), 64–80px (mobile)
- **Asymmetric grid:** 12-column with intentional offset (e.g. content col 2–7, visual col 8–12 overlapping)
- No uniform card grids — each section defines its own composition

### E.5 Visual Motifs (purpose-driven)

| Motif | Purpose | Implementation |
|-------|---------|----------------|
| Blueprint grid | Strategic consulting identity | CSS background, 1px lines at 4% opacity |
| Connector SVG lines | Show relationships between services/stats | Animated stroke-dashoffset |
| Org-map nodes | Team / service ecosystem | Floating nodes with parallax |
| Architectural lines | Section dividers | 1px rules with offset intersections |
| Noise texture | Premium depth on dark sections | 2–3% opacity PNG overlay |
| Soft spotlight | Draw focus to hero typography | Radial gradient, mouse-reactive |
| Glass panel | Floating content on imagery | backdrop-blur 12px, 8% white |

---

## Part F — UI Component Library

### F.1 Global Components

| Component | Description |
|-----------|-------------|
| `SiteHeader` | Fixed, hides on scroll down, reveals on scroll up. Logo left, nav center-right, mobile overlay |
| `SiteFooter` | 5-column, dark green background, logo, links, contact |
| `SectionShell` | Wrapper enforcing background rhythm token + vertical padding |
| `BlueprintBackground` | Optional section backdrop |
| `NoiseOverlay` | Dark section texture |
| `PrimaryButton` | Green fill, subtle lift on hover |
| `GhostButton` | Outline on dark backgrounds |
| `TextLink` | Underline animation, green accent |
| `SectionLabel` | Uppercase kicker above headings |
| `DividerLine` | Architectural intersection divider |

### F.2 Content Components

| Component | Description |
|-----------|-------------|
| `HeroEditorial` | Full-viewport typographic hero, no card layout |
| `QuoteBlock` | Serif italic + attribution (Shackleton, Aurelius quotes) |
| `StatCounter` | Animated number + label (400+, 16 év, etc.) |
| `ReasonPanel` | Single reason from homepage — unique layout per index |
| `ServiceTeaser` | Asymmetric split with illustration SVG |
| `TeamPortrait` | Photo + name + bio, editorial stagger |
| `TestimonialStrip` | Full-width pull quote with attribution |
| `LogoMarquee` | Slow horizontal partner logos (not grid cards) |
| `ReferenceCategoryBlock` | Category title + project list from SQL |
| `TrainingCatalogue` | Filterable list — not card grid |
| `DocumentDownload` | PDF link with file icon |
| `ContactForm` | Name, email, message (from functions.php spec) |
| `PalyazatForm` | Company, contact, email, phone (from functions.php) |
| `MentallyForm` | Same as pályázat form fields |
| `VideoEmbed` | Mentally.mp4 player |

### F.3 Diagram Components

| Component | Description |
|-----------|-------------|
| `ConnectorLine` | SVG path between nodes, draw animation |
| `NodeGraph` | Interactive floating nodes (Mentally, services map) |
| `ProcessTimeline` | Horizontal consulting process (diagnose → implement) |
| `OrgChartAbstract` | Non-literal organisational map for tanácsadás |

---

## Part G — Animation Concept (Framer Motion)

**Principle:** Elegant, expensive, never flashy.

| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| Page enter | Route change | 600ms | `[0.22, 1, 0.36, 1]` |
| Section reveal | Scroll into view (once) | 800ms | same |
| Stagger children | Lists, nav items | 60ms stagger | same |
| SVG line draw | Scroll 30% | 1200ms | linear |
| Parallax background | Scroll | subtle 0.05–0.15 ratio | — |
| Mouse spotlight | Hero pointer move | 16ms throttle | lerp 0.08 |
| Floating nodes | Idle + scroll | sine wave ±8px | 4s loop |
| Stat count-up | In view | 2000ms | easeOut |
| Header hide/show | Scroll direction | 300ms | ease |
| Menu overlay | Open/close | 400ms | stagger text |

**Reduced motion:** Respect `prefers-reduced-motion` — disable parallax, line draw, floating.

---

## Part H — Page Wireframes

Wireframes describe **composition**, not final visual design. Each page has a unique layout.

---

### H.1 Főoldal (/)

**Purpose:** Introduce brand, establish trust, route to dedicated pages — NOT explain everything.

```
┌─────────────────────────────────────────────────────────────┐
│ [HEADER — navy, logo, nav]                                   │
├─────────────────────────────────────────────────────────────┤
│ ░ DARK HERO ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                                              │
│     RÁVEZETŐ          blueprint grid bg                      │
│     (logo mark)                                              │
│                                                              │
│     Változásokat          ← oversized typography             │
│     vezetünk,                                                │
│     együtt!                                                  │
│                                                              │
│     [soft spotlight follows cursor]                          │
│                                          [scroll indicator]  │
├─────────────────────────────────────────────────────────────┤
│ WHITE — Quote band (narrow, centered)                        │
│     „Az optimizmus az igazi erkölcsi bátorság"               │
│     Ernest Shackleton                                        │
│     [context paragraph — full width below, offset left]      │
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREY — Route panel (NOT 3 equal cards)                 │
│                                                              │
│  Csapatunk ──────────────►  [diagonal split]                 │
│  [text block]                  [illustration SVG offset]     │
│  [Bővebben →]                                                │
│                                                              │
│  ─── architectural line ───                                │
│                                                              │
│  Tanácsadás ◄────────────  [mirror asymmetry]                │
│                                                              │
│  Felnőttképzés ─── [third unique composition]                │
├─────────────────────────────────────────────────────────────┤
│ DARK — Motto band (full bleed)                               │
│  „Ha már nem tekintünk hittel..." (Marcus Aurelius context)  │
├─────────────────────────────────────────────────────────────┤
│ WHITE — 6 Reasons (editorial list, NOT card grid)            │
│  01 LEVEZETJÜK...     [connector line to 02]                 │
│  02 ÁTVEZETJÜK...     [offset typography]                   │
│  ... (unique treatment per item)                             │
├─────────────────────────────────────────────────────────────┤
│ DARK GREEN — Stats strip                                     │
│  16 ÉV  |  400+  |  200+  |  250+  |  3500+  |  200+         │
│  [animated count-up on scroll]                               │
├─────────────────────────────────────────────────────────────┤
│ WHITE — Pályázatok teaser (single horizontal band)            │
│  [text left] ──► [CTA right]                                 │
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREY — Referenciák + Mentally (stacked, not side-by-side cards) │
├─────────────────────────────────────────────────────────────┤
│ DARK — Kapcsolat CTA                                         │
│  „Keressen minket bizalommal!"  [Írjon nekünk →]             │
├─────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                     │
└─────────────────────────────────────────────────────────────┘
```

---

### H.2 Rólunk / Csapatunk (/rolunk)

```
┌─────────────────────────────────────────────────────────────┐
│ WHITE hero — left-aligned H1 „Csapatunk"                     │
│ right: „Gyorsabban, erősebben, magasabbra!" (large type)     │
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREY — Citius, Altius, Fortius block                   │
├─────────────────────────────────────────────────────────────┤
│ DARK — Team portraits (editorial masonry, NOT uniform grid)  │
│  [Ríz Ádám — featured large]                                 │
│  [remaining 7 — staggered sizes]                             │
│  each: photo + name + full bio (from SQL)                    │
├─────────────────────────────────────────────────────────────┤
│ WHITE — Értékeink (typography-led, no image)                 │
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREY — Ügyfeleink mondták (full testimonials SQL)      │
│  pull quotes with attribution — magazine layout              │
│  Horváth Botond, Sarkadi-Nagy András, Amberger Árpád, etc.  │
└─────────────────────────────────────────────────────────────┘
```

---

### H.3 Tanácsadás Hub (/tanacsadas)

```
┌─────────────────────────────────────────────────────────────┐
│ DARK GREEN hero — H1 + intro paragraph (from template)       │
├─────────────────────────────────────────────────────────────┤
│ WHITE — Marcus Aurelius quote band                           │
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREY — Service index (6 items, vertical editorial list)│
│  each row: number + title + 2-line excerpt + arrow           │
│  [NOT cards — alternating left/right alignment]              │
├─────────────────────────────────────────────────────────────┤
│ DARK — „Tanácsadóink nem csupán elméleti szakemberek..."     │
└─────────────────────────────────────────────────────────────┘
```

---

### H.4 Service Detail (/tanacsadas/[slug]) — 6 unique layouts

Each service page uses content from `services` CPT verbatim. Layout varies:

| Service | Layout concept |
|---------|---------------|
| Szervezetfejlesztés | Split: large typography left, content right, strategy SVG |
| Projektmenedzsment | Timeline diagram + process steps |
| Humán fejlesztés | Question-led headings (from SQL h3 questions) |
| Coaching | Dark section + personal tone, portrait optional |
| Stressz audit | Data-led (GDP 1000 milliárd stat from SQL) |
| Kutatás | Research diagram + methodology list |

---

### H.5 Felnőttképzés Hub (/felnottkepzes)

```
┌─────────────────────────────────────────────────────────────┐
│ LIGHT GREY hero — H1 + „Az év trénerei is nálunk dolgoznak"  │
├─────────────────────────────────────────────────────────────┤
│ WHITE — Registration numbers (B/2020/001943, E/2021/000106)  │
│ full training philosophy paragraph (verbatim from template)  │
├─────────────────────────────────────────────────────────────┤
│ DARK — 4 training areas (from template, NOT equal cards)     │
│  Kommunikáció | Vezetői skillek | Generációk | Stressz       │
│  [each: unique composition — stagger, overlap, illustration]   │
├─────────────────────────────────────────────────────────────┤
│ WHITE — Referencia képzéseink (full catalogue list from tpl) │
│  3 categories, 20+ programmes with hours                   │
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREY — Contact strip (address, hours)                  │
└─────────────────────────────────────────────────────────────┘
```

---

### H.6 Pályázatok Hub (/palyazatok)

```
┌─────────────────────────────────────────────────────────────┐
│ DARK GREEN hero — „Fejlesszük közösen vállalatát..."         │
├─────────────────────────────────────────────────────────────┤
│ WHITE — Tanácsadási tevékenységeink (real content, NOT placeholder) │
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREY — Aktuális pályázataink                           │
│  [GINOP-5.3.1-14-2015-00051] → tender detail                 │
│  [GINOP Plusz 3.2.1-21] → tender detail                      │
│  each: title + excerpt + PDF download if available           │
├─────────────────────────────────────────────────────────────┤
│ DARK — Pályázat enquiry form (from palyazatForm-enquiry.php) │
└─────────────────────────────────────────────────────────────┘
```

---

### H.7 Referenciák Hub (/referenciak)

```
┌─────────────────────────────────────────────────────────────┐
│ DARK hero — „Büszkék vagyunk partnereink bizalmára!"         │
├─────────────────────────────────────────────────────────────┤
│ WHITE — Logo marquee (34 logos, slow scroll, not grid)       │
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREY — Category index (7 categories)                   │
│  each links to /referenciak/[slug] with project count        │
├─────────────────────────────────────────────────────────────┤
│ DARK — Partner logo wall (offset masonry from section-ref)   │
└─────────────────────────────────────────────────────────────┘
```

---

### H.8 Reference Category (/referenciak/[slug])

Full HTML project lists from `references` CPT — editorial long-form with h3 client names.

---

### H.9 Mentally (/mentally)

```
┌─────────────────────────────────────────────────────────────┐
│ WHITE hero — „Egészséges munkatársak = Versenyképes vállalat"│
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREE — Product explanation (A MENTALLY block, verbatim)│
├─────────────────────────────────────────────────────────────┤
│ DARK — Thought bubbles (6 gondolatok from template)          │
│  floating cloud layout with subtle parallax                  │
├─────────────────────────────────────────────────────────────┤
│ WHITE — „HA BAJ VAN..." / „MIUTÁN BEAVATKOZTUNK..."          │
│  [haBajVan / miutanBeavatkoztunk graphics from theme]        │
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREY — Video (Mentally.mp4 from theme)                 │
├─────────────────────────────────────────────────────────────┤
│ DARK GREEN — CTA + Mentally form                             │
└─────────────────────────────────────────────────────────────┘
```

---

### H.10 CSR (/tarsadalmi-felelossegvallalas)

Content from page 394 (verbatim list of supported organisations 2014–2022). Layout: timeline format, not cards.

---

### H.11 Kapcsolat (/kapcsolat)

```
┌─────────────────────────────────────────────────────────────┐
│ WHITE hero — „Keressen minket bizalommal!"                   │
├─────────────────────────────────────────────────────────────┤
│ DARK — 4 contact blocks (offset, not equal cards)            │
│  Ügyfélszolgálat | Irodánk | Telefon/email | Felnőttképzés   │
├─────────────────────────────────────────────────────────────┤
│ LIGHT GREY — Map link + contact form                         │
├─────────────────────────────────────────────────────────────┤
│ WHITE — Impresszum block (from page 86)                      │
└─────────────────────────────────────────────────────────────┘
```

---

### H.12 Jogi Pages (/jogi/*)

Minimal editorial layout. PDF download buttons for adatvédelem and GDPR.

---

## Part I — Reusable Components List (Build Checklist)

```
Global
  □ SiteHeader
  □ SiteFooter
  □ MobileMenu
  □ SectionShell
  □ BlueprintBackground
  □ NoiseOverlay
  □ PageTransition

Typography
  □ DisplayHeading
  □ SectionLabel
  □ QuoteBlock
  □ PullQuote
  □ BodyProse (renders HTML from SQL safely)

Navigation
  □ PrimaryNav
  □ DropdownNav
  □ FooterNav
  □ Breadcrumbs

CTA
  □ PrimaryButton
  □ GhostButton
  □ TextLink
  □ ScrollIndicator

Content
  □ HeroEditorial
  □ AsymmetricSplit
  □ StatCounter
  □ ReasonPanel (×6 variants)
  □ ServiceTeaser
  □ ServiceDetailLayout (×6 variants)
  □ TeamPortrait
  □ TestimonialBlock
  □ LogoMarquee
  □ LogoMasonry
  □ ReferenceCategoryList
  □ TrainingAreaBlock (×4 variants)
  □ TrainingCatalogue
  □ TenderCard
  □ DocumentDownload
  □ CSRTimeline

Forms
  □ ContactForm
  □ PalyazatForm
  □ MentallyForm
  □ FormSuccess / FormError states

Media
  □ OptimizedImage
  □ SvgIllustration
  □ VideoPlayer

Diagrams / Motion
  □ ConnectorLine
  □ NodeGraph
  □ ProcessTimeline
  □ ParallaxLayer
  □ MouseSpotlight
  □ CountUpStat
```

---

## Part J — Missing Content List

Items requiring client input or asset recovery before build:

| # | Item | Status | Action needed |
|---|------|--------|---------------|
| 1 | Primary green hex value | ⚠️ | Sample from logo.png during build |
| 2 | Portrait: Duleba Marianna | ❌ Missing JPG in uploads | Provide photo or confirm use initials |
| 3 | Portrait: Halász Krisztina | ❌ Missing JPG in uploads | Provide photo |
| 4 | Portrait: Mázásné Dinnyés Hajnalka | ❌ Missing JPG in uploads | Provide photo |
| 5 | Pályázatok page placeholder text | ⚠️ | Template has „Ultra jok vagyunk..." — replace with real content from tenders CPT |
| 6 | Szolgáltatásaink page placeholder text | ⚠️ | Same placeholder issue — use services CPT content |
| 7 | CSR page placeholder text | ⚠️ | Replace with page 394 content |
| 8 | Aktuális pályázat blog posts | ⚠️ | Category `palyazat` — verify live post list (SQL category posts) |
| 9 | buszkek_vagyunk category posts | ⚠️ | CSR section queries this — extract from SQL posts in category |
| 10 | referenciak category posts (logo images) | ✔ | 34 logos in CPT + uploads |
| 11 | Mentally product graphics | ✔ | In theme/images (haBajVan, miutanBeavatkoztunk, etc.) |
| 12 | Mentally.mp4 video | ✔ | theme/images/video/Mentally.mp4 |
| 13 | Trainings CPT (25 items) | ✔ | In SQL — needs inclusion in inventory JSON v2 |
| 14 | EMPX content | ℹ️ | 6 posts — decide if retained or archived |
| 15 | Blog/news (44 posts) | ℹ️ | Decide if news section needed |
| 16 | Széchenyi 2020 logo banner | ℹ️ | front-page.php links to GINOP page — confirm retain |
| 17 | External form (GINOP Google Form) | ✔ | URL in tender post 591: forms.gle/VQA4YtYU8knR4q9T7 |
| 18 | Minősített szolgáltató badges | ✔ | Links in post 589 (ifka.hu portals) |
| 19 | Font licensing | ⚠️ | Confirm budget for Söhne / commercial fonts vs open alternatives |
| 20 | Form backend | ⚠️ | WP used wp_mail to info@ravezeto.hu — decide API/email service for React |

---

## Part K — Technical Notes (for future build phase)

- **Stack:** React + Vite + TypeScript + Framer Motion (when approved)
- **No Tailwind utility-first layout** — custom CSS modules or styled system aligned to design tokens
- **Content:** Import from `CONTENT_INVENTORY.json` — zero AI rewrite
- **Images:** Copy from read-only `uploads/` and `themes/RavezetoNewTheme/images/`
- **Routing:** React Router matching sitemap above
- **SEO:** Preserve slug redirects from old WordPress URLs
- **Language:** Hungarian (hu), single locale

---

## Part L — Approval Checklist

Before Phase 2 (development) begins, please confirm:

- [ ] Sitemap structure
- [ ] Navigation hierarchy (especially Tanácsadás dropdown)
- [ ] Colour direction (green primary + navy/graphite rhythm)
- [ ] Typography choices (or alternatives)
- [ ] Wireframe compositions per page
- [ ] Missing content resolution plan (items J1–J20)
- [ ] Retire/redirect old URL mapping
- [ ] Form handling approach

---

**Approved items:** Sitemap, navigation, colour/typography direction, art direction approach, missing content strategy, redirects, form handling.

**Extended deliverables:** [ART_DIRECTION.md](./ART_DIRECTION.md) · [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) · [VISUAL_DESIGN_BLUEPRINT.md](./VISUAL_DESIGN_BLUEPRINT.md) · [MISSING_CONTENT.md](./MISSING_CONTENT.md)

**STOP — Awaiting final approval before Phase 2 (React implementation).**
