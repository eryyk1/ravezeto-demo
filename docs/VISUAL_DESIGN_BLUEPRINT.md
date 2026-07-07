# Rávezető — Visual Design Blueprint

> **Status:** Visual concept for approval — **NO REACT CODE**  
> **Goal:** Award-winning creative agency craft — handcrafted, never Tailwind-template  
> **Companion docs:** [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) · [ART_DIRECTION.md](./ART_DIRECTION.md)

---

## How to Read This Document

Each page blueprint includes:
- **Hero composition** — spatial layout, not just copy
- **Section order** — scroll sequence with background rhythm
- **ASCII sketch** — approximate layout (not pixel-perfect)
- **Visual hierarchy** — what the eye sees 1st, 2nd, 3rd
- **Typography dominance** — which type scale leads
- **Background treatment** — colour, texture, motion
- **Image / illustration placement**
- **Animation & interaction**
- **Section transitions**
- **WHY + emotion** — purpose and feeling per section

---

# PART 1 — Complete Component Map

Every reusable component in the design system. **No generic Card/Grid primitives.**

---

## 1.1 Global Shell

### `SiteHeader`
| Property | Spec |
|----------|------|
| **Purpose** | Persistent navigation without dominating content |
| **Variants** | `transparent-on-hero` · `solid-navy` · `hidden-scroll-down` |
| **Spacing** | Height 56px. Logo 40px. Nav gap 32px. Padding X 48px |
| **Behaviour** | Transparent over dark heroes → solid navy after 120px scroll. Hides on scroll down >80px. Reveals on scroll up >40px |
| **Animation** | Transform translateY, 300ms ease. Nav underline draws on hover (200ms) |
| **Mobile** | Hamburger → full-screen `MobileMenuOverlay`. Logo stays visible |

**WHY:** Enterprise sites feel confident when navigation recedes during reading.  
**Emotion:** Control, professionalism.

---

### `MobileMenuOverlay`
| Property | Spec |
|----------|------|
| **Purpose** | Full-focus navigation on small screens |
| **Variants** | Single variant — charcoal `#1C1F24` background |
| **Spacing** | Links 48px apart. Padding 32px |
| **Animation** | Overlay fade 300ms. Links stagger reveal 60ms each, from opacity 0 + translateX(-16px) |
| **Mobile** | Native experience — this IS the mobile nav |

---

### `SiteFooter`
| Property | Spec |
|----------|------|
| **Purpose** | Trust closure — contact, legal, service links |
| **Variants** | `standard` (5-column) · `minimal` (legal pages only) |
| **Spacing** | Padding Y 80px. Column gap 48px. Logo margin-bottom 24px |
| **Background** | Dark Green `#1B4536` + 2% noise overlay |
| **Animation** | None — stable anchor |
| **Mobile** | Stack columns. Accordion for service links |

**WHY:** Footer grounds the experience after premium scroll journey.  
**Emotion:** Stability, permanence.

---

### `SectionShell`
| Property | Spec |
|----------|------|
| **Purpose** | Enforces background rhythm + vertical padding per section |
| **Variants** | `warm-white` · `navy-deep` · `grey-light` · `green-dark` · `graphite` |
| **Spacing** | Padding Y: 120–160px desktop / 64–80px mobile. Never identical on 3+ consecutive sections |
| **Behaviour** | Wraps all page sections. Applies texture layer if specified |

---

### `PageTransition`
| Property | Spec |
|----------|------|
| **Purpose** | Route changes feel intentional, not jarring |
| **Animation** | Outgoing: opacity 1→0, 200ms. Incoming: opacity 0→1 + translateY(8px→0), 400ms, ease `[0.22,1,0.36,1]` |

---

## 1.2 Background & Atmosphere

### `BlueprintGrid`
| **Purpose** | Strategic consulting identity — implies planning, precision |
| **Variants** | `static` (4% opacity lines, 40px grid) · `animated` (0.3 opacity pulse over 8s) · `localised` (hero only) |
| **Spacing** | Full bleed. Never competes with text — always behind content |
| **Animation** | Slow opacity oscillation. Disabled on `prefers-reduced-motion` |
| **Mobile** | Same grid, tighter 32px spacing |

**Emotion:** Intelligence, method.

---

### `NoiseOverlay`
| **Purpose** | Premium depth on dark sections — avoids flat digital feel |
| **Variants** | `light` (2%) · `medium` (3%) on charcoal/navy |
| **Behaviour** | Fixed PNG tile, pointer-events none |

---

### `MeshGradient`
| **Purpose** | Subtle atmospheric colour on hero/CTA — never startup-purple |
| **Variants** | `green-navy` (green-primary 8% + navy 12%, blurred 120px) · `green-charcoal` |
| **Animation** | Slow drift: background-position shift over 20s loop |
| **Mobile** | Reduced blur radius for performance |

---

### `ArchitecturalLine`
| **Purpose** | Section dividers with intention — not horizontal rules |
| **Variants** | `horizontal-offset` · `vertical-accent` · `corner-intersection` (L-shape at section join) |
| **Animation** | Draw on scroll: stroke-dashoffset 1200ms |
| **Spacing** | Offset from grid by 24–48px — never centred by default |

---

### `CursorSpotlight`
| **Purpose** | Draws eye to hero typography on desktop |
| **Behaviour** | Radial gradient 400px follows pointer, green 6% opacity, lerp 0.08 |
| **Mobile** | Disabled |

---

## 1.3 Typography Components

### `HeroEditorial`
| **Purpose** | Full-viewport typographic statement — no hero image cliché |
| **Variants** | `split-dual` (two text blocks in tension) · `stacked-centre` · `offset-left` · `equation` (Mentally) |
| **Typography** | Display H1 clamp(3.5rem, 9vw, 8rem). Label above in 11px uppercase green |
| **Spacing** | Min-height 85vh. Content offset from exact centre by 8–12% |
| **Animation** | Word/line stagger 80–100ms. Label fades first |
| **Mobile** | Scale down 40%. Maintain line breaks intentionally |

**Emotion:** Authority, arrival.

---

### `SectionLabel`
| **Purpose** | Orient visitor within long pages |
| **Typography** | 11px, uppercase, letter-spacing 0.12em, green-primary |
| **Spacing** | Margin-bottom 16px. Always above H2, never floating alone |

---

### `DisplayHeading`
| **Purpose** | Oversized typographic moments replacing imagery |
| **Variants** | `full-bleed-crop` (text clipped by viewport edge) · `standard` |
| **Typography** | clamp(3rem, 8vw, 7rem), weight 600 |

---

### `QuoteBlock`
| **Purpose** | Human credibility — Shackleton, Aurelius, client voice |
| **Variants** | `centred-serif` · `offset-pull` (magazine margin) · `dark-on-navy` |
| **Typography** | Libre Baskerville italic 1.5–1.75rem. Cite 0.875rem uppercase tracking |
| **Spacing** | Max-width 40–55ch. Oversized `"` in green at -0.2em |
| **Animation** | Opacity stagger per line, 600ms |

**Emotion:** Reflection, wisdom, trust.

---

### `ProseBlock`
| **Purpose** | Render backup HTML content faithfully — long-form expertise |
| **Typography** | 17px body, 1.65 line-height, max 65ch |
| **Variants** | `on-light` · `on-dark` (muted secondary colour for body) |
| **Spacing** | Paragraph margin-bottom 1.25em. H3 margin-top 2em |

---

### `PullQuote`
| **Purpose** | Break long case study / testimonial text |
| **Variants** | `inline-magazine` (floats left, 45% width) · `full-band` |
| **Typography** | 1.5rem serif italic. Green left border 3px |

---

## 1.4 Data & Trust Components

### `StatisticDashboard`
| **Purpose** | Enterprise credibility — 16 years, 400+ projects |
| **Variants** | `horizontal-band` (6 stats row) · `featured-trio` · `single-hero-stat` (stress audit page) |
| **Typography** | Number: clamp(2.5rem, 5vw, 4rem) tabular-nums. Label: 11px uppercase |
| **Spacing** | Stats gap 48px. Band padding 80px Y |
| **Background** | Dark green. Optional subtle grid under numbers |
| **Animation** | Count-up 0→value over 2000ms on enter viewport. Single green glow pulse on complete |
| **Mobile** | 2×3 grid or horizontal scroll snap — NOT stacked cards |

**Emotion:** Proof, scale, confidence.

---

### `Timeline`
| **Purpose** | CSR history, reference projects, process phases |
| **Variants** | `vertical-scroll-linked` (progress line follows scroll) · `horizontal-process` · `year-rail` |
| **Spacing** | Node gap 64px. Line 2px green. Node 12px circle |
| **Animation** | Progress line height tied to scroll progress. Nodes fade in at 60% line reach |
| **Mobile** | Vertical only. Line left-aligned |

**Emotion:** Journey, legacy, thoroughness.

---

### `ConnectorLine`
| **Purpose** | Link related concepts — 6 reasons, service map, org framework |
| **Variants** | `svg-path-draw` · `straight-segment` · `branching-tree` |
| **Animation** | stroke-dashoffset 0→length over 1200ms on scroll trigger |
| **Mobile** | Simplified paths — fewer curves |

---

## 1.5 Content Layout Components

### `EditorialSection`
| **Purpose** | Primary content carrier — asymmetric, never card-based |
| **Variants** | `text-left-visual-right` · `text-right-visual-left` · `text-only-wide` · `narrow-centre` |
| **Spacing** | Asymmetric columns: 5/7, 4/8, 7/5 — never 6/6 |
| **Behaviour** | Visual may overlap text by 40–80px |
| **Mobile** | Stack: visual first OR text first per art direction |

---

### `AsymmetricSplit`
| **Purpose** | Two-zone composition with intentional imbalance |
| **Variants** | 7 combinations documented per page — no two identical on same page |
| **Spacing** | Gap 0–24px (overlap) or 48px (separated) |

---

### `FloatingPanel`
| **Purpose** | Glass overlay info on imagery/diagrams |
| **Variants** | `glass-light` (blur 12px, 6% white) · `glass-dark` (8% black on light bg) |
| **Spacing** | Padding 32px. Border 1px white 10% |
| **Behaviour** | Subtle translateY float ±4px on idle loop |
| **Mobile** | Full width below visual, no overlap |

**Use sparingly:** Contact form, coaching questions, grant stats.

---

### `RouteGateway`
| **Purpose** | Homepage pathways to dedicated pages — NOT feature cards |
| **Variants** | `diagonal-split` · `horizontal-band` · `mirror-asymmetric` |
| **Spacing** | Each gateway unique height: 40vh, 32vh, 24vh |
| **Interaction** | Illustration stroke brightens green on hover. Arrow translates 4px |
| **Animation** | Reveal from different directions: left, right, up |

---

### `ReasonSequence`
| **Purpose** | Homepage 6 reasons — editorial list, not grid |
| **Variants** | 6 indent patterns (0, 80, 160, 0, 80, 160 px) |
| **Typography** | Number 4rem green. Title uppercase 14px. Body 16px |
| **Animation** | ConnectorLine links 01→06 on scroll |

---

## 1.6 Service & Strategy Components

### `ServiceFramework`
| **Purpose** | Interactive consulting capability map on /tanacsadas |
| **Variants** | `hub-map` (6 nodes) · `detail-diagram` (per service page) |
| **Layout** | SVG nodes + labels. Hover highlights path to detail page |
| **Animation** | Nodes pulse once on enter. Path draw on hover 400ms |
| **Mobile** | Vertical numbered list — map collapses to index |

**Emotion:** Systematic expertise.

---

### `ProcessDiagram`
| **Purpose** | Project management, research methodology, consulting flow |
| **Variants** | `horizontal-5-step` · `cycle-4-node` · `vertical-phase` |
| **Illustration** | `illust_projectmanagement.svg` integrated as background element |
| **Animation** | Steps illuminate sequentially on scroll (200ms stagger) |

---

### `OrgMap`
| **Purpose** | Mentally product, team ecosystem, stakeholder diagram |
| **Variants** | `node-float` (6–8 nodes, connected) · `hub-spoke` |
| **Animation** | Nodes float ±6px sine loop. Connector lines subtle opacity pulse |
| **Mobile** | Static diagram, no float |

---

### `ServiceIndexRow`
| **Purpose** | Consulting hub service list |
| **Variants** | `align-left` · `align-right` alternating |
| **Spacing** | Row height 80px min. Number + title + excerpt + arrow |
| **Interaction** | Row background shifts graphite on hover. Arrow draws |

---

### `TrainingAreaBlock`
| **Purpose** | 4 Felnőttképzés areas — each unique layout |
| **Variants** | `zigzag` · `vertical-stack` · `horizontal-scroll` · `overlap-image` |
| **Content** | Verbatim from template — Kommunikáció, Vezetői, Generációk, Stressz |

---

### `TrainingCatalogue`
| **Purpose** | 20+ programmes with hours |
| **Variants** | `tabbed-filter` (3 categories) · `expandable-list` |
| **Behaviour** | Tab crossfade 300ms. List stagger 40ms |
| **Mobile** | Accordion by category |

---

## 1.7 Case Study & Reference Components

### `CaseStudyFeature`
| **Purpose** | Hero reference stories — NOT logo wall |
| **Variants** | `magazine-spread` (image 60% + quote overlap) · `text-dominant` · `stat-led` |
| **Content** | Globomax, SALDO, SZE testimonials + project narrative |
| **Spacing** | Min-height 70vh per featured case |
| **Typography** | Client name 14px uppercase. Quote 1.75rem serif |
| **Animation** | Image parallax 0.08. Quote slides from offset |

**Emotion:** Proven results, partnership.

---

### `CaseStudyList`
| **Purpose** | Category detail — full SQL project entries |
| **Variants** | `timeline-project` (client h3 + description) · `accordion-year` |
| **Spacing** | Project gap 48px. Client name H3 1.25rem green |

---

### `LogoMarquee`
| **Purpose** | Secondary trust signal — supports case studies, never leads |
| **Variants** | `monochrome-white` on charcoal · `muted-color` on light grey |
| **Animation** | Infinite scroll 60s linear. Pauses on hover |
| **Spacing** | Logo height 48px. Gap 64px |
| **Mobile** | Same speed, smaller logos 36px |

---

### `SectorGateway`
| **Purpose** | 7 reference categories as typographic links |
| **Typography** | Category name 2rem. Project count 14px muted |
| **Interaction** | Name shifts green + arrow on hover |
| **Layout** | Vertical stack with architectural lines between — NOT grid |

---

## 1.8 Product-Specific (Mentally)

### `ThoughtCloud`
| **Purpose** | Manager anxiety quotes — signature Mentally visual |
| **Variants** | `standard` · `bigger` (template had size variants) |
| **Layout** | Scattered absolute positions — composed chaos, not grid |
| **Animation** | Float ±8px sine 4s. Stagger reveal 100ms. Parallax 0.06 on scroll |
| **Mobile** | Reduced to 4 clouds, vertical stack with slight offset |

**Emotion:** Recognition — „this is my reality."

---

### `BeforeAfterSplit`
| **Purpose** | „HA BAJ VAN" / „MIUTÁN BEAVATKOZTUNK" |
| **Layout** | 50/50 with architectural centre line. Theme graphics haBajVan / miutanBeavatkoztunk |
| **Animation** | Centre line draws on scroll. Panels fade from opposite sides |

---

### `ProductVideoFrame`
| **Purpose** | Mentally.mp4 custom player |
| **Behaviour** | Charcoal frame, green play button, no browser default chrome |
| **Spacing** | 16:9 max-width 960px centred |

---

## 1.9 Forms & CTA

### `CTABand`
| **Purpose** | Conversion moment without startup urgency |
| **Variants** | `centred-statement` · `split-text-button` · `dark-green-full` |
| **Typography** | Statement 1.5–2rem. Button primary green |
| **Spacing** | Padding 80–120px Y |
| **Animation** | Button subtle glow on scroll enter |

**Emotion:** Invitation, not pressure.

---

### `ContactPanel`
| **Purpose** | Offset contact info blocks |
| **Variants** | 4 sizes: `large` · `medium` · `medium-overlap` · `small-accent` |
| **Layout** | Intentional overlap 24px between panels 1 & 2 |
| **Mobile** | Stack with overlap removed |

---

### `ContactForm` / `PalyazatForm` / `MentallyForm`
| **Purpose** | Lead capture — matches WP field spec |
| **Variants** | `inline-light` · `glass-on-dark` |
| **Spacing** | Field gap 24px. Input height 48px. Border grey-mid, focus green |
| **Animation** | Success: button text crossfade. Error: field shake 4px once |
| **Mobile** | Full width fields |

---

### `DocumentDownload`
| **Purpose** | PDF links — adatvédelem, GDPR, GINOP docs |
| **Layout** | Icon + filename + file size. Green underline on hover |

---

## 1.10 Team & People

### `TeamPortrait`
| **Purpose** | Human face of consultancy |
| **Variants** | `featured-large` (Ríz Ádám 2×) · `standard` · `initials-placeholder` |
| **Layout** | Masonry — varied aspect containers, NOT uniform grid |
| **Interaction** | Click/tap expands bio accordion — full SQL text |
| **Animation** | Fade-up stagger 80ms |

**Emotion:** Trust, accessibility, expertise.

---

### `TestimonialStrip`
| **Purpose** | Long client quotes |
| **Variants** | `magazine-pull` · `full-band-dark` |
| **Spacing** | 80px padding between testimonials. Rule 1px between |

---

## 1.11 Component Dependency Map

```
SiteHeader
├── MobileMenuOverlay
└── NavDropdown (Tanácsadás)

SectionShell
├── BlueprintGrid
├── NoiseOverlay
├── MeshGradient
└── ArchitecturalLine

HeroEditorial
├── CursorSpotlight
├── BlueprintGrid
└── SectionLabel

EditorialSection
├── ProseBlock
├── FloatingPanel
└── [illustration assets]

StatisticDashboard
└── ConnectorLine

ServiceFramework
├── ConnectorLine
└── ServiceIndexRow

CaseStudyFeature
├── PullQuote
└── LogoMarquee (secondary)

Mentally page
├── ThoughtCloud
├── BeforeAfterSplit
├── ProductVideoFrame
└── MentallyForm

Contact page
├── ContactPanel
├── ContactForm (FloatingPanel)
└── DocumentDownload
```

---

# PART 2 — Global Visual Rhythm Reference

Every page follows this palette rotation (minimum 4 tones per page):

```
① Warm White  #F7F5F2
② Deep Navy    #0E1A2B
③ Light Grey   #ECEAE6
④ Dark Green   #1B4536
⑤ Charcoal     #1C1F24
```

**Rule:** No two adjacent sections share identical background + identical layout pattern.

**Transition vocabulary:**
| From → To | Transition element |
|-----------|-------------------|
| White → Navy | ArchitecturalLine draw + 40px overlap fade |
| Navy → Grey | Mesh gradient bleed (green 4%) at top edge |
| Grey → White | Offset content continues 24px into next section |
| White → Green | Stat band — numbers act as bridge |
| Green → White | Pull quote breaks colour block |
| Any → Charcoal | Noise overlay intensifies 2→3% |

---

# PART 3 — Page Visual Blueprints

---

## PAGE 1: Főoldal (Home) — `/`

**Page emotion arc:** Arrival → Curiosity → Trust → Direction

**WOW moment:** Section 5 — Six Reasons with animated ConnectorLine drawing through all six items as user scrolls.

---

### HERO (Section 1)
**Background:** Deep Navy + animated BlueprintGrid + MeshGradient green-navy  
**Why:** Immediate enterprise gravitas. Visitor knows this is serious consultancy.  
**Emotion:** Arrival, authority.

```
┌─────────────────────────────────────────────────────────────────┐
│ [LOGO]                                    [nav · · · · · · ·]  │
│                                                                 │
│     ░░░ blueprint grid (animated, subtle) ░░░░░░░░░░░░░░░░░  │
│                                                                 │
│                    Változásokat          ← Display H1           │
│                    vezetünk,             ← each line breaks     │
│                    együtt!               ← offset right 15%     │
│                                                                 │
│     ○ spotlight follows cursor (desktop)                        │
│                                                                 │
│                                          │ scroll indicator    │
└─────────────────────────────────────────────────────────────────┘
```

| Aspect | Detail |
|--------|--------|
| **Hierarchy** | 1. Headline 2. Logo 3. Scroll cue |
| **Typography** | Display H1 dominant. No subhead — headline IS the message |
| **Images** | None |
| **Animation** | Lines stagger 100ms. Grid pulse 8s. Spotlight lerp |
| **→ Transition** | Headline crops at bottom edge. White quote section pulls up with 24px overlap |

---

### QUOTE (Section 2)
**Background:** Warm White  
**Why:** Pause after bold arrival. Human wisdom before business.  
**Emotion:** Reflection, depth.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│         "  Az optimizmus az igazi erkölcsi bátorság"            │
│              Ernest Shackleton          ← serif italic          │
│         ─────────────────────                                   │
│              [context paragraph, offset right, 50ch]            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

| **Hierarchy** | Quote → Author → Context |
| **Typography** | Serif italic leads. Body secondary |
| **→ Transition** | ArchitecturalLine horizontal, offset left 10% |

---

### ROUTE GATEWAYS (Section 3) — Csapatunk · Tanácsadás · Felnőttképzés
**Background:** Light Grey  
**Why:** Homepage routes — does NOT explain services, only opens doors.  
**Emotion:** Curiosity, forward motion.

```
┌─────────────────────────────────────────────────────────────────┐
│  Csapatunk                              ┌──────────────────┐     │
│  [2-line excerpt]                       │  illust_services │     │
│  Bővebben →                             │  (SVG, overlap)  │     │
│  ╲ green diagonal connector             └──────────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐                  Tanácsadás              │
│  │ illust_strategy  │                  [excerpt]                │
│  └──────────────────┘                  Bővebben →             │
├─────────────────────────────────────────────────────────────────┤
│  Felnőttképzés  │  [excerpt spans centre]  │  Bővebben →       │
│  ═══════════════ architectural full-width line ═══════════════ │
└─────────────────────────────────────────────────────────────────┘
```

| **Hierarchy** | Section title → Excerpt → CTA arrow |
| **Illustrations** | `illust_inner_services.svg`, `illust_strategy.svg` |
| **Interaction** | SVG stroke → green on hover |
| **→ Transition** | Third gateway bleeds into navy motto band |

---

### MOTTO BAND (Section 4)
**Background:** Deep Navy  
**Why:** Emotional bridge — the „why change" question.  
**Emotion:** Urgency without fear.

```
┌─────────────────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│     Ha már nem tekintünk hittel, bátorsággal, bizalommal...     │
│                    (centred, 55ch, 1.25rem)                     │
└─────────────────────────────────────────────────────────────────┘
```

---

### SIX REASONS (Section 5) ★ WOW
**Background:** Warm White + faint BlueprintGrid  
**Why:** Differentiation — why Rávezető specifically.  
**Emotion:** Confidence, systematic partnership.

```
┌─────────────────────────────────────────────────────────────────┐
│  01 ─── LEVEZETJÜK ÖNNEK...                                       │
│       [body text]                                               │
│         ╲                                                       │
│          ╲── connector SVG draws on scroll ──╲                   │
│  02 ───── ÁTVEZETJÜK... (indent 80px)                          │
│  03 ───────── VÉGIGVEZETJÜK... (indent 160px)                    │
│  04 ─── RÁVEZETJÜK...                                             │
│  05 ───── KIVEZETJÜK...                                           │
│  06 ───────── TOVÁBBVEZETJÜK...                                   │
└─────────────────────────────────────────────────────────────────┘
```

| **Animation** | ConnectorLine draws 01→06, 1200ms, scroll-triggered |
| **→ Transition** | Line completes into green stat band |

---

### STATISTICS (Section 6)
**Background:** Dark Green + noise  
**Why:** Proof at scale — numbers anchor trust.  
**Emotion:** Credibility, scale.

```
┌─────────────────────────────────────────────────────────────────┐
│   16        400+       200+       250+       3500+      200+   │
│   ÉV        PROJEKT    ÜGYFÉL     KÉPZÉS     RÉSZTVEVŐ  TANÁCS.│
│   ↑ count-up animation on enter                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### PÁLYÁZAT TEASER (Section 7)
**Background:** Warm White  
**Layout:** 40/60 asymmetric. FloatingPanel with project SVG.

---

### DUAL TEASER (Section 8) — Referenciák + Mentally
**Background:** Light Grey  
**Layout:** Two horizontal editorial bands — NOT side-by-side cards.

---

### CONTACT CTA (Section 9)
**Background:** Charcoal  
**CTABand:** „Keressen minket bizalommal!" → Kapcsolat

---

### FOOTER (Section 10)
**Background:** Dark Green

---

## PAGE 2: Rólunk (About) — `/rolunk`

**Page emotion arc:** Identity → Humanity → Proof of partnership  
**WOW moment:** Section 3 — Team masonry with Ríz Ádám 2× featured portrait.

---

### HERO
**Background:** Warm White  
**Layout:** Split-dual HeroEditorial

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Csapatunk                    Gyorsabban, erősebben,             │
│  (Display H1                  magasabbra!                       │
│   bottom-left)                (2rem, top-right, breaks grid)    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Emotion:** Athletic excellence — Citius, Altius, Fortius spirit.

---

### CITIUS BLOCK (Section 2)
**Background:** Light Grey · ProseBlock 65ch · Green vertical rule left  
**Content:** Verbatim Citius Altius Fortius paragraph  
**Emotion:** Philosophy, movement.

---

### TEAM MASONRY (Section 3) ★ WOW
**Background:** Deep Navy

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌──────┐  ┌──────┐                           │
│  │             │  │ Bíró │  │ Soós │                           │
│  │  RÍZ ÁDÁM   │  └──────┘  └──────┘                           │
│  │  (2× size)  │  ┌──────┐  ┌──────┐  ┌──────┐                │
│  │             │  │Molnár│  │Szalay│  │ Hal. │ ← initials     │
│  └─────────────┘  └──────┘  └──────┘  └──────┘                │
│  click → bio accordion (full SQL text)                          │
└─────────────────────────────────────────────────────────────────┘
```

**Interaction:** Bio expand accordion 400ms ease  
**→ Transition:** Masonry fades to white Értékeink typographic section

---

### ÉRTÉKEINK (Section 4)
**Background:** Warm White  
**Typography-only:** „ÉRTÉKEINK" cropped by viewport right edge at 6rem  
**Emotion:** Values without decoration — confidence in words.

---

### TESTIMONIALS (Section 5)
**Background:** Light Grey  
**Layout:** Magazine PullQuote × 5 — full verbatim client quotes  
**Emotion:** Validated trust.

---

### CSR LINK (Section 6)
**Background:** Dark Green band — single line + link  
**→ Footer**

---

## PAGE 3: Tanácsadás Hub — `/tanacsadas`

**WOW moment:** Section 4 — Interactive ServiceFramework map with hover path draw.

---

### HERO
**Background:** Dark Green + `illust_strategy.svg` 40% opacity right bleed  
**Typography:** H1 + intro paragraph verbatim

---

### AURELIUS QUOTE (Section 2)
**Background:** Warm White · QuoteBlock centred-serif

---

### PROSE INTRO (Section 3)
**Background:** Light Grey · ProseBlock — Szervezeti kultúra + Közös munka

---

### SERVICE MAP (Section 4) ★ WOW
**Background:** Deep Navy

```
┌─────────────────────────────────────────────────────────────────┐
│         ┌──────┐                                                │
│    01 ──┤ Szervezetfejlesztés ──────────────────→               │
│         └──────┘         ╲                                      │
│                    ┌──────┐                                     │
│    02 ─────────────┤ Projektmenedzsment                          │
│                    └──────┘                                     │
│    (SVG nodes + hover draws path to node, 400ms)                │
│    03–06 alternating left/right ServiceIndexRow                   │
└─────────────────────────────────────────────────────────────────┘
```

**Interaction:** Hover node → connector animates → arrow appears  
**Emotion:** Systematic capability.

---

### CLOSING (Section 5)
**Background:** Warm White · „Tanácsadóink nem csupán elméleti..."

---

## PAGE 4–9: Service Detail Pages

Each page: unique WOW + unique layout. Shared: breadcrumb, ProseBlock for SQL content, CTABand at end.

| Page | WOW Component | Layout signature |
|------|---------------|------------------|
| **Szervezetfejlesztés** | 4-node Strategy Framework diagram | Diagram 45% left, prose 55% right |
| **Projektmenedzsment** | Horizontal ProcessDiagram timeline | Grey hero → timeline scroll → white prose |
| **Humán fejlesztés** | Question-led DisplayHeading sequence | Each h3 question oversized, answer below |
| **Coaching** | FloatingPanel glass with 3 questions on navy | Dark personal tone |
| **Stressz audit** | Single-hero-stat „1000 milliárd Ft" | Data-led split + `illust_stress.svg` |
| **Kutatás** | 5-step research cycle diagram | `illust_research.svg` + cycle animation |

**Section rhythm per service page (example Projektmenedzsment):**
```
Grey hero → Navy diagram WOW → White prose → Green CTA → White footer link
```

---

## PAGE 10: Mentally — `/mentally`

**Standalone product identity. Lighter navy. More whitespace.**  
**WOW moment:** Section 3 — ThoughtCloud scattered ecosystem.

---

### HERO
**Background:** Warm White + radial MeshGradient centre  
**Layout:** Equation-style HeroEditorial

```
┌─────────────────────────────────────────────────────────────────┐
│  Mentally (Display)                                             │
│                                                                 │
│  Egészséges munkatársak                                         │
│           =                                                     │
│  Versenyképes vállalat!                                         │
└─────────────────────────────────────────────────────────────────┘
```

**Emotion:** Clarity, product confidence.

---

### PRODUCT DEF (Section 2)
**Background:** Light Grey  
**Layout:** Theme mentallyInfo graphic left 40%, staggered verbatim text right

---

### THOUGHT CLOUDS (Section 3) ★ WOW
**Background:** Deep Navy (product tint `#121E2E`)

```
┌─────────────────────────────────────────────────────────────────┐
│     ┌─────────────┐                    ┌──────────────────┐    │
│     │ „Senki nem  │      ┌──────────┐  │ „Miért nem       │    │
│     │  vállalja.."│      │„Már megint│  │  tudunk..."     │    │
│     └─────────────┘      │ felmondott"│  └──────────────────┘    │
│              ┌──────────────────┐    └──────────┘              │
│              │ „Valamit rosszul   │                             │
│              │  csinálunk..."     │   (6 clouds, float ±8px)    │
│              └──────────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
```

**Animation:** Float sine 4s. Parallax 0.06. Stagger reveal 100ms  
**Emotion:** Recognition — visceral manager empathy.

---

### BEFORE / AFTER (Section 4)
**Background:** Warm White · BeforeAfterSplit with theme graphics

---

### VIDEO (Section 5)
**Background:** Charcoal · ProductVideoFrame centred

---

### CTA + FORM (Section 6)
**Background:** Dark Green · FloatingPanel glass form  
**Emotion:** Invitation to act.

---

## PAGE 11: Felnőttképzés — `/felnottkepzes`

**WOW moment:** Section 4 — Four TrainingAreaBlocks, each with unique layout geometry.

---

### HERO → CREDENTIALS → PHILOSOPHY
```
White hero → White credentials panel (green border) → Navy philosophy prose
```

---

### FOUR AREAS (Section 4) ★ WOW
**Background:** Warm White

| Area | Layout variant |
|------|----------------|
| Kommunikáció | Zigzag: text left, SVG right, offset -32px |
| Vezetői skillek | Vertical stack, large number „02" |
| Generációk | Horizontal scroll snap on mobile |
| Stressz | Overlap: SVG bleeds into text column |

---

### CATALOGUE (Section 5)
**Background:** Light Grey · TrainingCatalogue tabbed — full 20+ programmes verbatim

---

## PAGE 12: Referenciák — `/referenciak`

**WOW moment:** Section 2 — CaseStudyFeature magazine spreads (NOT logo grid).

---

### HERO
**Background:** Deep Navy · „Büszkék vagyunk partnereink bizalmára!"

---

### FEATURED CASES (Section 2) ★ WOW
**Background:** Warm White

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌────────────────────────┐                                     │
│  │  [project image]       │   „Szívesen dolgozom a Rávezető     │
│  │                        │    csapatával..."                  │
│  └───────────┬────────────┘   Horváth Botond · Smart Digital   │
│              │ overlap                                          │
│  ──── Amberger Árpád · Globomax (reversed layout) ────         │
│  ──── Sarkadi-Nagy · SALDO (stat-led: 309M Ft project) ────    │
└─────────────────────────────────────────────────────────────────┘
```

**Emotion:** Proven enterprise partnership.

---

### SECTOR GATEWAY (Section 3)
**Background:** Light Grey · SectorGateway typographic list × 7

---

### LOGO MARQUEE (Section 4)
**Background:** Charcoal · LogoMarquee secondary — monochrome, slow

---

### CATEGORY DETAIL pages
**WOW:** Timeline scroll-linked progress through project list  
**Content:** Full SQL h3 client entries — nothing shortened

---

## PAGE 13: Pályázatok — `/palyazatok`

**WOW moment:** Section 3 — Campaign-style tender layout with consortium diagram + 309M Ft stat.

---

### HERO → PROSE → TENDERS
```
Dark green hero → White consulting prose → Grey asymmetric tender layouts (2)
```

**Tender layout (GINOP 5.3.1):**
```
┌─────────────────────────────────────────────────────────────────┐
│  GINOP-5.3.1-14-2015-00051                                      │
│  ┌─────────────┐   Támogatás: 309 205 653 Ft                    │
│  │ consortium  │   Kedvezményezett: Corex Projekt Kft.          │
│  │ diagram     │   + Rávezető Projekt Kft.                      │
│  └─────────────┘   [PDF download] [Google Form external link]   │
└─────────────────────────────────────────────────────────────────┘
```

---

### CERTIFICATION + FORM
**Navy badges (ifka.hu) → White PalyazatForm**

---

## PAGE 14: Kapcsolat — `/kapcsolat`

**WOW moment:** Section 3 — Glass form panel on navy.

---

### HERO → CONTACT PANELS → FORM
```
White hero → Grey offset ContactPanels (4 sizes, 24px overlap)
→ Navy + ContactForm in FloatingPanel glass → White impresszum
```

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌──────────────────┐                                           │
│  │ Ügyfélszolgálat  │  ┌─────────────┐                         │
│  │ (large)          │──│ Irodánk     │ ← 24px overlap          │
│  └──────────────────┘  └─────────────┘                         │
│  ┌─────────────┐  ┌────────────────┐                           │
│  │ Elérhetőség │  │ Felnőttképzés  │ ← green border accent     │
│  └─────────────┘  └────────────────┘                           │
├─────────────────────────────────────────────────────────────────┤
│  ░ NAVY ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│              ┌─────────────────────────┐                        │
│              │  GLASS FORM PANEL       │                        │
│              │  name / email / message │                        │
│              └─────────────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## PAGE 15: CSR — `/tarsadalmi-felelossegvallalas`

**WOW:** Timeline scroll-linked year rail (2014→2022 organisations)  
**Content:** Page 394 verbatim — never placeholder

---

## PAGE 16: Legal — `/jogi/*`

**Minimal EditorialSection + DocumentDownload. Light grey background. No wow needed — clarity is the goal.**

---

# PART 4 — Mobile Adaptation Summary

| Component | Mobile behaviour |
|-----------|------------------|
| HeroEditorial | Scale 60%, maintain intentional line breaks |
| BlueprintGrid | 32px grid, static not animated |
| ConnectorLine | Simplified paths |
| ServiceFramework | Collapses to ServiceIndexRow list |
| ThoughtCloud | 4 clouds, vertical stack |
| Team masonry | 1 column, Ríz Ádám still first full-width |
| LogoMarquee | Smaller logos, same speed |
| StatisticDashboard | 2×3 grid or horizontal snap |
| FloatingPanel | No overlap — stacks below visual |
| CaseStudyFeature | Image above quote, no overlap |

---

# PART 5 — Anti-Pattern Checklist (Implementation Gate)

Before Phase 2, verify no page contains:
- [ ] 3+ identical card components
- [ ] 6/6 column equal splits
- [ ] Icon + title + text rows (generic features)
- [ ] Pure white section >100vh without texture
- [ ] Tailwind `grid-cols-3 gap-6` pattern
- [ ] Rounded-xl shadow-lg cards
- [ ] Gradient purple/pink backgrounds
- [ ] AI marketing copy not from inventory

---

# PART 6 — Approval Checklist

- [ ] Component map complete (40+ components)
- [ ] All 8 primary pages have visual blueprints
- [ ] Every page has named WOW moment
- [ ] Every section has WHY + emotion
- [ ] Mobile adaptation documented
- [ ] Anti-pattern gate defined

---

**STOP — Awaiting visual blueprint approval before Phase 2 (React implementation).**

When approved, say **"Start Phase 2"** to begin handcrafted implementation per this blueprint.
