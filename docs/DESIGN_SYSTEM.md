# Rávezető — Design System

> Companion to [ART_DIRECTION.md](./ART_DIRECTION.md)  
> **Status:** Approved direction — implementation pending

---

## 1. Brand Principles

| Principle | Meaning |
|-----------|---------|
| **Professional** | Institutional credibility; no playful startup tropes |
| **Confident** | Declarative typography, decisive layout, no hedging |
| **Strategic** | Diagrams, frameworks, process visualisation support content |
| **Premium** | Refinement through restraint — not luxury gold or gloss |
| **Human** | Real portraits, authentic testimonials, warm white surfaces |
| **Trustworthy** | Consistent rhythm, honest content, enterprise case studies |

### Anti-patterns (never use)

- Tailwind default card grids
- Purple/pink startup gradients
- Luxury serif + gold palette
- Bright saturated accent colours
- Identical section spacing repeated 4+ times
- AI marketing copy tone (“unlock”, “supercharge”, “game-changing”)
- Rounded-everything SaaS UI
- Stock photo placeholders

---

## 2. Logo

| Property | Value |
|----------|-------|
| Asset | `themes/RavezetoNewTheme/images/home/logo.png` |
| Treatment | Never alter proportions, colours, or clear space |
| Header size | 36–44px height (desktop), 32px (mobile) |
| Footer | Full wordmark on dark green background |
| Favicon | Derived from logo mark only — not redesigned |

**Phase 2 task:** Sample dominant green from logo pixels → set `--green-primary` token.

**Historical reference (existing theme CSS):** `#268396`, `#1DABC6` — teal-adjacent greens used on buttons. New system anchors on logo green; teals may appear only as secondary diagram accents.

---

## 3. Colour Palette

### 3.1 Core Tokens

| Token | Role | Hex (provisional*) | Usage |
|-------|------|-------------------|-------|
| `--green-primary` | Logo green | `#2A6B52` | CTAs, active nav, accent lines, stat highlights |
| `--green-dark` | Deep brand | `#1B4536` | Hero bands, footer, dark green sections |
| `--navy-deep` | Enterprise dark | `#0E1A2B` | Primary dark sections, header |
| `--graphite` | Charcoal UI | `#1C1F24` | Alternate dark sections |
| `--white-warm` | Primary light | `#F7F5F2` | Body backgrounds |
| `--grey-light` | Secondary light | `#ECEAE6` | Alternating sections |
| `--grey-mid` | Borders | `#C8C4BC` | Dividers, input borders |
| `--text-primary` | Body | `#1A1A18` | Paragraphs on light |
| `--text-secondary` | Meta | `#5A5F66` | Captions, labels |
| `--text-on-dark` | Light copy | `#F7F5F2` | Text on dark surfaces |
| `--text-muted-dark` | Secondary on dark | `#A8B0B8` | Supporting text on navy |

\*Final hex values confirmed after logo sampling in Phase 2.

### 3.2 Semantic Colours

| Token | Value | Use |
|-------|-------|-----|
| `--success` | `--green-primary` | Form success |
| `--error` | `#8B3A3A` | Form errors (muted, not bright red) |
| `--focus-ring` | `--green-primary` at 40% opacity | Accessibility |

### 3.3 Section Rhythm (mandatory)

Every page alternates backgrounds — **no long white stretches**:

```
Warm White → Deep Navy → Light Grey → Warm White → Dark Green → Warm White → Charcoal → Warm White
```

Each section must differ visually: texture, typography scale, or diagram — not just background swap.

---

## 4. Typography

### 4.1 Typefaces

| Role | Primary choice | Fallback | Licence note |
|------|---------------|----------|--------------|
| **Display** | Söhne Breit | Inter Tight, system-ui | Commercial — confirm budget |
| **Headings** | Söhne / Inter (600–700) | system-ui | |
| **Body** | Söhne / Source Sans 3 (400–500) | system-ui | Open fallback available |
| **Quotes** | Libre Baskerville (italic) | Georgia | Open source |

**Open-source alternative stack** (if commercial fonts unavailable):
- Display: **Instrument Sans** or **DM Sans**
- Body: **Source Sans 3**
- Quotes: **Libre Baskerville**

### 4.2 Type Scale

| Element | Desktop | Mobile | Weight | Notes |
|---------|---------|--------|--------|-------|
| Display H1 | clamp(3.5rem, 9vw, 8rem) | clamp(2.5rem, 12vw, 4rem) | 600 | Editorial moments |
| H1 (page) | clamp(2.5rem, 5vw, 4.5rem) | clamp(2rem, 8vw, 3rem) | 600 | |
| H2 | clamp(1.75rem, 3vw, 2.75rem) | 1.5rem | 600 | |
| H3 | 1.25–1.5rem | 1.125rem | 600 | |
| Body | 1.0625rem (17px) | 1rem | 400 | line-height 1.65 |
| Lead | 1.25–1.375rem | 1.125rem | 400 | max 40ch |
| Label | 0.6875rem (11px) | same | 600 | uppercase, 0.12em tracking |
| Stat number | clamp(2.5rem, 5vw, 4rem) | 2rem | 600 | tabular nums |

### 4.3 Typography as Design

- At least **one oversized typographic section per page** where text replaces imagery
- Pull quotes at 1.5–2rem serif italic
- Hungarian hyphenation: `hyphens: auto; lang: hu`
- Max body width: **65ch**; intro leads: **40ch**

---

## 5. Spacing & Grid

| Token | Value |
|-------|-------|
| Base unit | 8px |
| Section padding Y (desktop) | 120px – 160px |
| Section padding Y (mobile) | 64px – 80px |
| Content max-width | 1280px |
| Prose max-width | 720px |
| Grid | 12 columns, 24px gutter (desktop) |

**Layout rules:**
- Never use identical padding on 3+ consecutive sections
- Offset content blocks by 1–2 columns intentionally
- Allow elements to overlap by 40–80px where art direction specifies
- Whitespace is strategic — not empty filler

---

## 6. Visual Motifs

| Motif | CSS/SVG approach | Purpose |
|-------|------------------|---------|
| Blueprint grid | 1px lines, 4% opacity, 40px spacing | Strategic consulting identity |
| Architectural lines | SVG paths, stroke 1px | Section transitions |
| Connector lines | SVG stroke-dasharray animation | Link stats, process steps |
| Noise texture | 2–3% opacity PNG overlay | Depth on dark sections |
| Soft spotlight | radial-gradient follows cursor | Hero focus |
| Glass panel | backdrop-filter blur(12px), 6% white | Floating info on imagery |
| Org nodes | SVG circles + lines | Mentally, consulting maps |

---

## 7. Component Library

### 7.1 Global

```
SiteHeader          — fixed, hide on scroll down, reveal on scroll up
SiteFooter          — dark green, 5 columns
MobileMenuOverlay   — full-screen, staggered nav reveal
SectionShell        — enforces background token + padding
BlueprintBg         — optional section backdrop
NoiseOverlay        — dark section texture layer
PageTransition      — route change fade + slight Y shift
CursorSpotlight     — hero only, reduced-motion off
```

### 7.2 Typography Components

```
DisplayHeading      — clamp-sized H1
SectionLabel        — uppercase kicker
ProseBlock          — renders backup HTML safely
QuoteBlock          — serif italic + cite
PullQuote           — magazine-style testimonial
StatDisplay         — number + label, count-up
```

### 7.3 Navigation & CTA

```
PrimaryNav          — horizontal, green active underline
NavDropdown         — Tanácsadás services
FooterNav           — grouped links
PrimaryButton       — green fill, 999px radius, subtle lift
SecondaryButton     — outline on dark
TextLink            — animated underline
Breadcrumbs         — on service/detail pages
```

### 7.4 Content Components

```
HeroEditorial       — typographic hero, no card
AsymmetricSplit     — offset 2-column
ReasonPanel         — 6 unique homepage variants
ServiceIndexRow     — numbered list, not cards
ServiceDetailLayout — 6 unique page templates
TeamPortrait        — editorial photo + bio
TestimonialBlock    — full client quote
CaseStudyCard       — enterprise reference format
CaseStudyDetail     — expanded project narrative
LogoMarquee         — slow infinite scroll
TrainingAreaBlock   — 4 unique Felnőttképzés sections
TrainingCatalogue   — filterable programme list
TenderHero          — GINOP campaign layout
DocumentDownload    — PDF with icon
CSRTimeline         — year-based philanthropy
ContactBlock        — offset contact panels
```

### 7.5 Diagram & Motion Components

```
ConnectorLine       — SVG draw on scroll
ProcessTimeline     — horizontal consulting flow
OrgFramework        — interactive node graph
BlueprintDiagram    — static strategic illustration
FloatingPanel       — glass overlay info card
ParallaxLayer       — subtle depth (0.05–0.12 ratio)
GridPulse           — subtle animated blueprint grid
VideoPlayer         — Mentally.mp4 custom chrome
```

### 7.6 Forms

```
ContactForm         — name, email, message
PalyazatForm        — company, contact, email, phone
MentallyForm        — same fields as pályázat
FormField           — consistent styling
FormSuccess         — confirmation state
FormError           — inline validation
```

---

## 8. Imagery Guidelines

| Type | Source | Treatment |
|------|--------|-----------|
| Team portraits | `uploads/` portrait JPGs | Natural colour, no heavy filters |
| Partner logos | `uploads/` + logos CPT | Monochrome on dark, full colour on light |
| SVG illustrations | `uploads/2016–2017/` | Brand green stroke accents |
| Mentally graphics | `themes/.../images/` | Product-specific palette |
| Case study images | ref1–ref35 posts + references | Editorial crop, overlap layouts |
| Video | `themes/.../Mentally.mp4` | Custom player, no default browser chrome styling |

**Never:** stock photos, AI-generated imagery, generic office clichés.

---

## 9. Accessibility

- WCAG 2.1 AA contrast minimum on all text
- Focus rings visible (green)
- `prefers-reduced-motion`: disable parallax, line draw, floating nodes, count-up
- Semantic HTML: one H1 per page, logical heading order
- Form labels always visible (no placeholder-only labels)
- Video: captions if transcript available (flag in missing content)

---

## 10. Technology Notes (Phase 2 only)

- React + Vite + TypeScript
- Framer Motion for animation
- CSS Modules or vanilla CSS with design tokens — **not Tailwind utility layout**
- Content from `CONTENT_INVENTORY.json`
- Images copied from read-only backup to `public/assets/`
