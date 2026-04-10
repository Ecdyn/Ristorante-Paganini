# Phase 4: German Onepage — All 12 Content Sections - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Populate every content section (hero through footer) in `/de/index.html` with full German copy, CTAs, and performance-correct image markup. The HTML skeleton with all 12 section elements, head metadata, JSON-LD, and hreflang already exists from Phase 3. This phase fills in all content, adds FAQPage JSON-LD, and makes the German page a complete, functional restaurant page that a real visitor can use.

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- **D-01:** H1 is an evocative Italian tagline (e.g., "Dove il gusto incontra la tradizione") — atmospheric, bold, emotional first impression
- **D-02:** Restaurant name "Ristorante Paganini" appears above the H1 tagline as a smaller brand mark — identity first, then atmosphere
- **D-03:** Three trust cues visible in hero area: family heritage badge ("Seit über 30 Jahren familiengeführt"), location badge ("Im Herzen der Leipziger Innenstadt"), and quick hours/phone line
- **D-04:** Two CTAs side-by-side: primary "Tisch reservieren" (solid wine fill) + secondary "Speisekarte" (outline/ghost button) — clear hierarchy, covers both intents
- **D-05:** Hero image uses `<picture>` with AVIF>WebP>JPEG fallback, `loading="eager"` and `fetchpriority="high"` (LCP element, per Phase 1 D-12)

### Menu Overview
- **D-06:** 4 category cards (Pasta, Pizza, Antipasti, Wein) each showing 3-4 highlight dishes with short descriptions — scannable, appetizing HTML preview
- **D-07:** No prices in the HTML menu preview — drives PDF download, avoids maintenance burden of syncing HTML prices with real menu
- **D-08:** "Speisekarte herunterladen" PDF download CTA + "Vollständige Speisekarte" link to a placeholder PDF file

### Business Lunch
- **D-09:** 3-4 named highlight slots ("Vorspeise", "Pasta", "Hauptgericht", "Dessert") with placeholder dish names and clear `<!-- EDIT: -->` comments — agency updates dish names monthly
- **D-10:** Shows 11:30–14:30 hours prominently, PDF link for full lunch menu, status/holiday note area with edit comments

### Gallery
- **D-11:** 3-column masonry-style CSS grid with 6 images, one image spanning 2 columns for visual interest — uses existing 6 gallery SVG placeholders
- **D-12:** Mixed showcase subjects: 2 food, 2 interior, 1 terrace, 1 exterior/entrance
- **D-13:** Hover captions on each image — text appears on hover/tap with descriptive context, alt text handles accessibility
- **D-14:** Vanilla JS lightbox modal — lightweight overlay for viewing images larger on click, with navigation between images

### Copy Tone & Length
- **D-15:** Concise copy: 2-3 short paragraphs per content section — scannable, mobile-friendly, lets visuals and CTAs dominate. About section gets slightly more for storytelling
- **D-16:** Warm & personal tone: "Wir" (we) voice, family story woven in, inviting language — matches 30+ year family heritage, feels like the owner is speaking
- **D-17:** German copy uses "Sie" (formal you) for addressing visitors — premium positioning, respectful

### FAQ Section
- **D-18:** 7 FAQ questions targeting Leipzig local SEO:
  1. "Muss ich reservieren?" — targets 'restaurant reservieren leipzig'
  2. "Gibt es einen Mittagstisch?" — targets 'mittagstisch leipzig'
  3. "Wo kann ich parken?" — targets 'parken innenstadt leipzig'
  4. "Gibt es vegetarische/vegane Gerichte?" — dietary inclusivity
  5. "Haben Sie eine Terrasse?" — targets 'restaurant mit terrasse leipzig'
  6. "Welche Zahlungsmethoden akzeptieren Sie?" — practical trust
  7. "Sind Hunde willkommen?" — common Leipzig search query
- **D-19:** FAQPage JSON-LD schema added to `<head>` matching all 7 Q&A pairs exactly (deferred from Phase 3 D-05)

### Remaining Sections (already decided by constraints)
- **D-20:** Reservation section: placeholder `<div>` for external widget embed + "Rufen Sie uns an" phone fallback CTA — no live widget until v2
- **D-21:** Groups/Events section: phone + email inquiry CTAs only, trust-focused copy — no form, no backend (STATE.md decision)
- **D-22:** Location section: static address block + Google Maps link (no iframe per GDPR decision), parking info (Große Fleischergasse, Brühl Center ~200m, public paid parking)
- **D-23:** Contact section: phone, email, address, opening hours, Instagram link placeholder
- **D-24:** Footer: legal page links (placeholder hrefs for Phase 6), language switcher links (DE/EN/IT), contact summary, copyright with current year
- **D-25:** Quick info bar (#info): opening hours, address, phone, reservation CTA, lunch hours, terrace seasonal note — compact, utility-focused strip

### Claude's Discretion
- Exact Italian tagline wording for H1 (within the emotional/evocative direction)
- Hero image dark overlay opacity and text positioning
- Exact dishes chosen for menu preview card highlights
- Gallery grid CSS implementation details (gap, span pattern)
- Lightbox animation and navigation UX details
- Section heading treatments (uppercase, letter-spacing, decorative elements)
- Quick info bar layout (horizontal strip vs icon grid)
- Internal spacing within each section
- Exact FAQ answer wording (within warm/personal tone, targeting Leipzig SEO)
- Contact section layout (single column vs two-column)
- Footer layout and language switcher design
- `<picture>` element dimensions for each section's images
- Whether to add `aria-label` attributes to sections

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Page Skeleton
- `de/index.html` — Phase 3 skeleton with all 12 section elements, head metadata, JSON-LD Restaurant/LocalBusiness, hreflang — content goes INTO these existing elements
- `.planning/phases/03-german-onepage-head-and-seo-skeleton/03-CONTEXT.md` — Phase 3 decisions on anchor IDs (D-01/D-02), JSON-LD structure (D-03–D-06), meta content (D-07–D-11)

### CSS Design System
- `assets/css/main.css` — All design tokens, CUBE CSS blocks, responsive breakpoints — content sections MUST use existing classes and tokens
- `.planning/phases/01-css-design-system/01-CONTEXT.md` — Phase 1 decisions on color palette, typography, spacing, hero layout

### JS Behaviors & Assets
- `assets/js/main.js` — Sticky header + mobile menu JS, expects specific element IDs and `data-` attributes
- `assets/css/test.html` — Reference implementation for header/nav/mobile-menu markup
- `.planning/phases/02-js-and-asset-foundation/02-CONTEXT.md` — Phase 2 decisions on image strategy (D-07–D-09), placeholder images, `<picture>` pattern

### Image Assets
- `assets/img/` — 6 gallery SVGs, hero-desktop.svg, hero-mobile.svg, about-bg.svg, og-image.svg already exist as placeholders

### Requirements
- `.planning/REQUIREMENTS.md` — SECT-01 through SECT-12, LANG-05, SEO-08, PERF-01, PERF-02 define the specific requirements this phase must satisfy

### SEO & Structured Data
- `CLAUDE.md` — "Structured Data (JSON-LD)" section for FAQPage schema requirements
- `CLAUDE.md` — "Images" section for `<picture>` element pattern, eager vs lazy rules
- `CLAUDE.md` — "SEO Meta Tags" section for local SEO copy guidelines

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `assets/css/main.css` — Complete CUBE CSS system with `.hero`, `.nav`, `.header`, utility classes, responsive breakpoints, all design tokens ready
- `assets/js/main.js` — 143 lines, sticky header + mobile menu IIFEs already working with `id="site-header"`, `id="menu-toggle"`, `id="mobile-menu"`, `.hero-sentinel`
- `assets/img/` — 10 SVG placeholders ready (hero-desktop, hero-mobile, about-bg, 6 gallery, og-image)
- `assets/css/test.html` — Working reference for header/nav/hamburger/mobile-menu markup pattern

### Established Patterns
- CUBE CSS methodology with `data-*` attribute state management
- IDs for JS hooks, classes for CSS styling
- `<!-- EDITABLE: ... -->` comment convention for agency-editable content (already in skeleton)
- `<script defer>` for non-blocking JS loading
- Language-neutral section IDs: `#hero`, `#info`, `#about`, `#menu`, `#lunch`, `#gallery`, `#reservation`, `#events`, `#location`, `#faq`, `#contact`, `#footer`

### Integration Points
- Content fills existing `<section>` elements in `de/index.html` — no new structural elements needed
- FAQPage JSON-LD added as new `<script type="application/ld+json">` block in `<head>`
- Gallery lightbox JS added to `assets/js/main.js` (extends existing file)
- New placeholder PDF file needed at `assets/pdf/speisekarte.pdf` (or similar path) for menu download CTA
- Hover caption CSS added to `assets/css/main.css` (extends existing file)

</code_context>

<specifics>
## Specific Ideas

- Hero uses an Italian tagline as H1 for atmospheric impact — the restaurant name sits above it as a brand mark, not as the heading
- Gallery lightbox should be vanilla JS and lightweight — it will become more valuable when real photography replaces SVG placeholders post-launch
- FAQ questions specifically target Leipzig local search intent ("mittagstisch leipzig", "parken innenstadt leipzig", "restaurant mit terrasse leipzig")
- All editable content areas maintain the `<!-- EDIT: -->` and `<!-- EDITABLE: -->` comment convention from Phase 3

</specifics>

<deferred>
## Deferred Ideas

- Private events FAQ question ("Kann man bei euch Feiern ausrichten?") — considered but dropped from initial 7; can be added later if SEO analysis shows demand
- Lightbox with swipe gestures for mobile — keep initial implementation simple with tap navigation, enhance post-launch if needed

</deferred>

---

*Phase: 04-german-onepage-all-12-content-sections*
*Context gathered: 2026-04-08*
