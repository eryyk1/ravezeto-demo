# Rávezető — Art Direction & Page Concepts

> Full art direction document — not generic wireframes  
> **Status:** Extended specification — awaiting approval before Phase 2  
> Companion: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

---

## Global Art Direction

### Visual North Star

A Hungarian enterprise consulting firm that advises government institutions, universities, and major corporations. The site should feel like it was **commissioned from a senior art director** at a European digital agency — comparable in craft to high-end management consultancy digital presence, but with an **original** visual language rooted in Rávezető's green identity.

### Scroll Experience

The page must **constantly evolve** while scrolling. Each section introduces a new composition — the user never feels they are seeing the same layout twice. Background rhythm follows:

**Warm White → Deep Navy → Light Grey → Warm White → Dark Green → Warm White → Charcoal → Warm White**

### Global Animation Language

| Property | Value |
|----------|-------|
| Library | Framer Motion |
| Easing | `[0.22, 1, 0.36, 1]` (custom cubic-bezier) |
| Section reveal | 800ms, opacity + translateY(24px) |
| Stagger | 60ms between children |
| SVG draw | 1200ms stroke-dashoffset |
| Parallax ratio | 0.05–0.12 (subtle) |
| Page transition | 500ms crossfade + 8px Y |

**Never:** bounce, spin, flash, particle explosions, scroll-jacking.

### Global Interaction Patterns

- Header hides on scroll down past 80px; reveals after 40px scroll up
- Links: underline draws from left on hover
- Buttons: 2px lift + soft shadow, no scale bounce
- Diagrams: nodes subtly float (±6px sine, 5s loop) — disabled on reduced-motion
- Mouse spotlight on heroes only (desktop)

---

## Sitemap (Approved)

```
/                           Főoldal
/rolunk                     Rólunk (About Us)
/tanacsadas                 Tanácsadás hub
  /tanacsadas/szervezetfejlesztes
  /tanacsadas/projektmenedzsment
  /tanacsadas/human-fejlesztes
  /tanacsadas/coaching
  /tanacsadas/stressz-audit
  /tanacsadas/kutatas
/mentally                   Mentally (standalone product)
/felnottkepzes              Felnőttképzés hub
  /felnottkepzes/[program]  25 training programmes
/referenciak                Referenciák (case studies)
  /referenciak/[category]   7 sector categories
/palyazatok                 Pályázatok (Grants)
  /palyazatok/ginop-5-3-1-14-2015-00051
  /palyazatok/ginop-plusz-3-2-1-21
/kapcsolat                  Kapcsolat
/tarsadalmi-felelossegvallalas   CSR (secondary — footer/About link)
/jogi/impresszum
/jogi/adatvedelem
/jogi/cookie
/jogi/gdpr
```

---

## Navigation Structure

### Primary (desktop)

```
[LOGO]   Rólunk   Tanácsadás ▾   Felnőttképzés   Pályázatok   Referenciák   Mentally   Kapcsolat
```

**Tanácsadás dropdown:**
1. Szervezetfejlesztés
2. Projektmenedzsment
3. Humán fejlesztés
4. Coaching
5. Stressz audit
6. Kutatás

### Mobile

Full-screen charcoal overlay. Logo top-left. Staggered link reveal (60ms). Tanácsadás expands as accordion. Fixed bottom CTA: „Kapcsolatfelvétel”.

---

# Page-by-Page Art Direction

---

## 1. Főoldal (Home) — `/`

**Purpose:** Introduce the company. Route visitors to dedicated pages. Do NOT explain everything.

**Content source:** `front-page.php`, SQL page 734, company statistics, Shackleton quote.

### Section 1 — Hero
| Aspect | Direction |
|--------|-----------|
| **Background** | Deep Navy + animated blueprint grid (subtle pulse, 0.3 opacity shift over 8s) |
| **Layout** | Logo mark top-left of hero zone. Oversized typography right-aligned, breaking grid |
| **Typography** | Display H1: „Változásokat vezetünk, együtt!” — each word on its own line at large scale |
| **Images** | None — typography IS the hero |
| **Animation** | Words stagger-reveal on load (100ms). Mouse spotlight follows cursor. Blueprint grid slow drift |
| **Interaction** | Scroll indicator: thin green line animates downward |
| **Transition in** | Fade from black, 600ms |

**WOW SECTION:** Oversized editorial typography + living blueprint grid + mouse-reactive spotlight.

### Section 2 — Quote
| Aspect | Direction |
|--------|-----------|
| **Background** | Warm White |
| **Layout** | Narrow centred column (40ch). Quote breaks out left with oversized opening quotation mark in green |
| **Typography** | Serif italic 1.75rem. Cite: Ernest Shackleton. Context paragraph below at body size, offset right |
| **Animation** | Quote draws in letter-by-letter feel via opacity stagger (not typewriter gimmick) |
| **Illustration** | None |

### Section 3 — Route Introduction (3 pathways)
| Aspect | Direction |
|--------|-----------|
| **Background** | Light Grey |
| **Layout** | **Three completely different compositions** — NOT three equal cards |

**3a — Csapatunk:** Text block cols 1–5. Diagonal green line connector. Illustration `illust_inner_services.svg` overlaps into col 8–12, offset -40px vertically.

**3b — Tanácsadás:** Mirror layout. Text right, illustration left. Purple-navy accent line (secondary, not primary).

**3c — Felnőttképzés:** Full-width horizontal band. Large label left, paragraph centre, CTA right. Single architectural line divides.

| **Animation** | Each pathway reveals on scroll with different direction (left, right, up) |
| **Interaction** | Hover on pathway: illustration SVG stroke brightens to green |

### Section 4 — Motto Band
| Aspect | Direction |
|--------|-----------|
| **Background** | Deep Navy |
| **Typography** | Single sentence, 1.5rem, max 55ch, centred — verbatim from front-page |
| **Animation** | Text fades in only — no movement |

### Section 5 — Six Reasons
| Aspect | Direction |
|--------|-----------|
| **Background** | Warm White + faint blueprint texture |
| **Layout** | **Editorial numbered list** — NOT card grid. Numbers at 4rem in green. Each reason spans full width with unique indent pattern (01 flush left, 02 indent 80px, 03 indent 160px, then reset) |
| **Animation** | SVG connector line draws between reason 01→02→03 on scroll |
| **WOW SECTION:** Animated connector graphics linking all six reasons in sequence |

### Section 6 — Statistics
| Aspect | Direction |
|--------|-----------|
| **Background** | Dark Green |
| **Layout** | Six stats in horizontal band. Numbers oversized. Labels below in uppercase 11px |
| **Animation** | Count-up on scroll enter. Subtle green glow pulse once on complete |
| **Content** | Verbatim: 16 év, 400+, 200+, 250+, 3500+, 200+ |

### Section 7 — Pályázatok Teaser
| Aspect | Direction |
|--------|-----------|
| **Background** | Warm White |
| **Layout** | Asymmetric split 40/60. Left: label + headline. Right: intro paragraph + ghost button |
| **Illustration** | `illust_projectmanagement.svg` floating panel, glass overlay |

### Section 8 — Referenciák + Mentally (dual teaser)
| Aspect | Direction |
|--------|-----------|
| **Background** | Light Grey |
| **Layout** | Two stacked editorial bands — NOT side-by-side cards. Each band: large title left, one-line description + link right |

### Section 9 — Contact CTA
| Aspect | Direction |
|--------|-----------|
| **Background** | Charcoal |
| **Layout** | Centred. „Keressen minket bizalommal!” + primary button |
| **Transition out** | Footer follows seamlessly (dark green) |

---

## 2. Rólunk (About Us) — `/rolunk`

**Purpose:** Team, values, client voice, company philosophy. Merge Csapatunk + Magunkról content.

**Content source:** `template-csapatunk.php`, page 30 (Magunkról), colleagues CPT, testimonials in template.

### Section 1 — Hero
| **Background** | Warm White |
| **Layout** | H1 „Csapatunk” at display scale, bottom-left. Tagline „Gyorsabban, erősebben, magasabbra!” floats top-right at 2rem, breaking grid |
| **WOW** | Split typography hero — two text blocks in tension |

### Section 2 — Citius, Altius, Fortius
| **Background** | Light Grey |
| **Layout** | Long-form paragraph, 65ch, left-aligned. Green vertical rule at left edge |
| **Content** | Verbatim from template |

### Section 3 — Team Portraits
| **Background** | Deep Navy |
| **Layout** | **Editorial masonry** — Ríz Ádám featured at 2× size top-left. Remaining 7 at varied sizes. NOT uniform grid |
| **Images** | Portrait JPGs from uploads. Missing portraits: initials placeholder in green circle (see MISSING_CONTENT) |
| **Animation** | Portraits fade-up staggered. Bio expands on click/tap (accordion) — full SQL bio text |
| **WOW** | Living team wall with scale hierarchy emphasizing leadership |

### Section 4 — Értékeink
| **Background** | Warm White |
| **Layout** | Typography-only section. „ÉRTÉKEINK” at 6rem display size, cropped by viewport edge |
| **Animation** | Letters reveal on scroll |

### Section 5 — Ügyfeleink mondták
| **Background** | Light Grey |
| **Layout** | Magazine pull-quote layout. Each testimonial: large quote, attribution block, horizontal rule. Full verbatim text from template (Horváth Botond, Sarkadi-Nagy András, Amberger Árpád, Váginé Varga Zsuzsa, Arany Mónika) |
| **Animation** | Quotes slide in from alternating sides |

### Section 6 — CSR Link
| **Background** | Dark Green band |
| **Layout** | Single line + link to `/tarsadalmi-felelossegvallalas` |

---

## 3. Tanácsadás Hub — `/tanacsadas`

**Content source:** `template-tanacsadas.php`, services CPT index.

### Section 1 — Hero
| **Background** | Dark Green |
| **Typography** | H1 „Tanácsadás” + intro paragraph (verbatim template opening) |
| **Illustration** | `illust_strategy.svg` at 40% opacity, right edge bleed |

### Section 2 — Marcus Aurelius Quote
| **Background** | Warm White |
| **Layout** | Pull quote, serif, full template text |

### Section 3 — Szervezetfejlesztés Intro
| **Background** | Light Grey |
| **Content** | Verbatim „Szervezeti kultúra" + „Közös munka" blocks from template |

### Section 4 — Service Index
| **Background** | Deep Navy |
| **Layout** | **Numbered vertical index** — 6 services. Each row: 01–06 number in green, title, 2-line excerpt, arrow. Rows alternate text alignment left/right |
| **Animation** | Rows reveal with 80ms stagger. Hover: row background shifts to graphite |
| **WOW** | Interactive strategic service map — hover highlights connector path to service detail |

### Section 5 — Closing Statement
| **Background** | Warm White |
| **Content** | „Tanácsadóink nem csupán elméleti szakemberek..." (verbatim) |

---

## 4. Service Detail Pages — `/tanacsadas/[slug]` (×6)

Each page uses **full SQL content** from services CPT. Each has a **unique layout** and **unique wow section**.

### 4a. Szervezetfejlesztés (`strategiaalkotas-es-szervezetfejlesztes`)
| **Wow** | Strategy framework diagram — 4 nodes (Tervezés, Felkészítés, Együttműködés, Megvalósítás) with animated connectors |
| **Layout** | Split: diagram left 45%, prose right 55% |
| **Background rhythm** | White → Navy → Grey → White |

### 4b. Projektmenedzsment (`projekttervezes-es-menedzsment`)
| **Wow** | Premium process timeline — horizontal scroll on mobile, full width desktop. Phases from SQL content |
| **Illustration** | `illust_projectmanagement.svg` |
| **Background** | Grey hero → White content → Dark Green CTA |

### 4c. Humán fejlesztés (`human-fejlesztes`)
| **Wow** | Question-led typography — each h3 question from SQL at display size, answer below at body |
| **Layout** | Single column editorial, 55ch |
| **Illustration** | `illust_inner_hrdevelopment.svg` |

### 4d. Coaching (`uzleti-edzes-coaching`)
| **Wow** | Floating glass panel with key coaching questions overlaid on dark navy background |
| **Content** | Verbatim h3 questions from SQL |
| **Tone** | Personal, direct — darker palette |

### 4e. Stressz Audit (`munkahelyi-stressz-audit`)
| **Wow** | Data visualisation moment — „1000 milliárd forint GDP-kiesés" stat from SQL at oversized scale |
| **Illustration** | `illust_stress.svg` |
| **Layout** | Data left, bullet benefits right |

### 4f. Kutatás (`kutatas`)
| **Wow** | Research methodology diagram — 5-step cycle (Igény → Terv → Felmérés → Elemzés → Javaslat) |
| **Illustration** | `illust_research.svg` |

---

## 5. Mentally — `/mentally`

**Purpose:** Standalone premium product page. Must feel like a separate product brand within Rávezető.

**Content source:** `template-mentally.php` (all verbatim content).

### Visual Identity (Mentally-specific)
- Slightly lighter navy base (`#121E2E`) vs site default
- Product accent: soft teal-green (secondary to brand green)
- Thought-bubble motif as recurring visual element
- More whitespace than other pages

### Section 1 — Hero
| **Background** | Warm White with subtle radial gradient centre |
| **Typography** | „Mentally" at display scale. Tagline: „Egészséges munkatársak = Versenyképes vállalat!" stacked |
| **WOW** | Product hero with equation-style typography layout |

### Section 2 — Product Definition
| **Background** | Light Grey |
| **Layout** | Split: left image panel (mentallyInfo graphic from theme), right staggered text block — verbatim „A MENTALLY" copy with intentional line breaks preserved |
| **Animation** | Text blocks fade in sequence matching original line structure |

### Section 3 — Thought Bubbles
| **Background** | Deep Navy |
| **Layout** | Six floating cloud panels with verbatim manager thoughts. Scattered composition — NOT grid |
| **Animation** | Clouds drift ±8px on sine loop. Parallax on scroll. Stagger reveal |
| **WOW** | Floating thought-cloud ecosystem — the signature Mentally moment |

### Section 4 — HA BAJ VAN / MIUTÁN BEAVATKOZTUNK
| **Background** | Warm White |
| **Images** | `haBajVan` and `miutanBeavatkoztunk` theme graphics |
| **Layout** | Before/after split with architectural centre line |

### Section 5 — Video
| **Background** | Charcoal |
| **Media** | `themes/RavezetoNewTheme/images/video/Mentally.mp4` |
| **Player** | Custom chrome, green play button, no default browser styling |

### Section 6 — CTA + Form
| **Background** | Dark Green |
| **Content** | „Tegyen csapata mentális egészségéért!" + Mentally form |
| **Panel** | Glass overlay form container |

---

## 6. Felnőttképzés (Training) — `/felnottkepzes`

**Content source:** `template-felnottkepzes.php`, trainings CPT (25 programmes).

### Section 1 — Hero
| **Background** | Light Grey |
| **Typography** | H1 + „Az év trénerei is nálunk dolgoznak 😊" (verbatim) |

### Section 2 — Credentials
| **Background** | Warm White |
| **Content** | B/2020/001943, E/2021/000106, full institution paragraph (verbatim) |
| **Layout** | Credentials in green-bordered floating panel |

### Section 3 — Training Philosophy
| **Background** | Deep Navy |
| **Content** | Full „MUNKATÁRSI KIVÁLÓSÁG" block — verbatim, not shortened |

### Section 4 — Four Training Areas
| **Background** | Warm White |
| **Layout** | **Four unique compositions** for: Kommunikáció, Vezetői skillek, Generációk, Stressz |
| **WOW** | Each area has distinct layout — zigzag, vertical, horizontal, stacked — with `illust_courses.svg` variants |

### Section 5 — Programme Catalogue
| **Background** | Light Grey |
| **Layout** | Filterable list (category tabs). Full programme list from template — all 20+ items with hours |
| **Animation** | Tab switch crossfade. List items stagger reveal |

### Section 6 — Programme Detail Pages (`/felnottkepzes/[slug]`)
| **Content** | Full SQL content per training — duration, curriculum bullets |
| **Layout** | Unique per programme category — not one template |

---

## 7. Referenciák (References) — `/referenciak`

**Purpose:** Enterprise case studies — NOT logo wall only.

**Content source:** references CPT (7 categories), ref1–ref35 posts, logos CPT, client testimonials.

### Section 1 — Hero
| **Background** | Deep Navy |
| **Typography** | „Büszkék vagyunk partnereink bizalmára!" |

### Section 2 — Featured Case Studies
| **Background** | Warm White |
| **Layout** | **3–4 hero case studies** with large imagery, client name, sector, project summary |
| **Sources** | Testimonials (Globomax, SALDO, SZE) + reference category highlights |
| **WOW** | Editorial case study layout — magazine feature style with overlapping image and pull quote |

### Section 3 — Sector Index
| **Background** | Light Grey |
| **Layout** | Seven categories as large typographic links — NOT cards |
| **Categories** | Gazdasági, Közigazgatás, Felsőoktatás, Önkormányzatok, Nemzetközi, Kutató intézetek, GINOP |
| **Animation** | Hover: category name shifts green + arrow appears |

### Section 4 — Logo Trust Strip
| **Background** | Charcoal |
| **Layout** | Slow horizontal marquee — 34 logos. Monochrome white treatment |
| **Note** | Logos support trust — case studies carry the narrative |

### Section 5 — Category Detail (`/referenciak/[slug]`)
| **Background** | Alternating rhythm per scroll |
| **Content** | Full HTML project lists from references CPT — every h3 client entry preserved |
| **Layout** | Timeline-style project list. Each project: client name, year, description |
| **WOW** | Premium timeline interaction — scroll-linked progress line in green |

---

## 8. Pályázatok (Grants) — `/palyazatok`

**Content source:** `template-palyazatok.php`, tenders CPT, palyazat category posts.

### Section 1 — Hero
| **Background** | Dark Green |
| **Content** | Real intro from homepage/SQL — NOT placeholder text |

### Section 2 — Consulting for Grants
| **Background** | Warm White |
| **Content** | Verbatim projektmenedzsment paragraph from template (replace placeholder) |

### Section 3 — Active Tenders
| **Background** | Light Grey |
| **Layout** | Two tender cards — but **asymmetric**, not identical:
  - GINOP-5.3.1-14-2015-00051 (full content from tender 702)
  - GINOP Plusz 3.2.1-21 (full content from tender 591)
| **WOW** | Campaign-style tender layout with project stats (309M Ft support, consortium members) |

### Section 4 — Certification Badges
| **Background** | Deep Navy |
| **Content** | Minősített szolgáltató links (ifka.hu) from post 589 |

### Section 5 — Enquiry Form
| **Background** | Warm White |
| **Form** | Pályázat form (company, contact, email, phone) — see FORMS.md |

---

## 9. Kapcsolat (Contact) — `/kapcsolat`

**Content source:** `template_kapcsolatok.php`, page 740, impresszum page 86.

### Section 1 — Hero
| **Background** | Warm White |
| **Typography** | „Keressen minket bizalommal!" |

### Section 2 — Contact Panels
| **Background** | Light Grey |
| **Layout** | Four offset panels — NOT equal grid. Each panel different size:
  1. Ügyfélszolgálat (large)
  2. Irodánk (medium, overlaps panel 1 by 24px)
  3. Elérhetőségek (medium)
  4. Felnőttképzés reg. (small, green accent border)

### Section 3 — Map + Form
| **Background** | Deep Navy |
| **Layout** | Split: Google Maps link left, contact form right in glass panel |
| **WOW** | Glass overlay form floating on dark background |

### Section 4 — Impresszum
| **Background** | Warm White |
| **Content** | Verbatim from page 86 |

---

## 10. CSR — `/tarsadalmi-felelossegvallalas`

**Content source:** Page 394 (verbatim organisation list 2014–2022).

| **Background rhythm** | White → Navy → Grey |
| **Layout** | Vertical timeline by year. Each year: organisation names |
| **WOW** | Premium timeline with scroll-linked year indicator |

---

## 11. Legal Pages — `/jogi/*`

Minimal editorial. PDF download buttons for adatvédelem and GDPR documents from uploads.

---

# Animation Concepts Summary

| Page | Signature animation |
|------|-------------------|
| Home | Connector line through 6 reasons + stat count-up |
| Rólunk | Masonry portrait stagger |
| Tanácsadás | Service map hover connectors |
| Service detail | Unique per page (timeline / diagram / data viz) |
| Mentally | Floating thought clouds + parallax |
| Felnőttképzés | Tab crossfade catalogue |
| Referenciák | Timeline progress line |
| Pályázatok | Campaign stat reveal |
| Kapcsolat | Glass form panel fade-in |

---

# Transition Concepts

| Transition | Behaviour |
|------------|-----------|
| Page route | Outgoing fades 200ms, incoming fades + rises 400ms |
| Section scroll | IntersectionObserver triggers once per section |
| Service → detail | Shared element: service number persists briefly |
| Menu open | Overlay fades 300ms, links stagger 60ms |
| Form submit | Button text crossfade to success state |

---

**STOP — Awaiting final approval before Phase 2 (React implementation).**
