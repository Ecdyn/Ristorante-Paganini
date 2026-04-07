# Phase 4: German Onepage — All 12 Content Sections - Research

**Researched:** 2026-04-08
**Domain:** Static HTML content authoring, CSS grid layout, vanilla JS lightbox, FAQPage JSON-LD, Core Web Vitals image markup
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero Section**
- D-01: H1 is an evocative Italian tagline — "Dove il gusto incontra la tradizione"
- D-02: Restaurant name "Ristorante Paganini" appears above the H1 tagline as a smaller brand mark
- D-03: Three trust cues in hero area: "Seit über 30 Jahren familiengeführt", "Im Herzen der Leipziger Innenstadt", hours/phone line
- D-04: Two CTAs: "Tisch reservieren" (primary, solid wine fill) + "Speisekarte" (secondary, outline/ghost)
- D-05: Hero uses `<picture>` with AVIF>WebP>JPEG, `loading="eager"` and `fetchpriority="high"`

**Menu Overview**
- D-06: 4 category cards (Pasta, Pizza, Antipasti, Wein), 3-4 highlight dishes per card, no prices
- D-07: No prices in HTML preview — drives PDF download
- D-08: "Speisekarte herunterladen" PDF download CTA + "Vollständige Speisekarte" link to placeholder PDF

**Business Lunch**
- D-09: 3-4 named highlight slots with placeholder dish names and `<!-- EDIT: -->` comments
- D-10: 11:30–14:30 hours prominent, PDF link, status/holiday note area with edit comments

**Gallery**
- D-11: 3-column masonry-style CSS grid, 6 images, one spanning 2 columns
- D-12: 2 food, 2 interior, 1 terrace, 1 exterior/entrance
- D-13: Hover captions on each image
- D-14: Vanilla JS lightbox modal, lightweight overlay, navigation between images

**Copy Tone**
- D-15: Concise copy — 2-3 short paragraphs per content section
- D-16: Warm/personal tone, "Wir" voice, family story, inviting language
- D-17: German copy uses formal "Sie"

**FAQ Section**
- D-18: 7 specific FAQ questions targeting Leipzig local SEO (exact questions in CONTEXT.md)
- D-19: FAQPage JSON-LD in `<head>` matching all 7 Q&A pairs exactly

**Remaining Sections**
- D-20: Reservation: placeholder `<div>` for widget embed + phone fallback CTA
- D-21: Groups/Events: phone + email CTAs only — no form, no backend
- D-22: Location: static address + Google Maps link (no iframe), parking info
- D-23: Contact: phone, email, address, opening hours, Instagram link placeholder
- D-24: Footer: legal page links (placeholder hrefs), language switcher, contact summary, copyright
- D-25: Quick info bar: opening hours, address, phone, reservation CTA, lunch hours, terrace note

### Claude's Discretion
- Exact Italian tagline wording for H1 (approved: "Dove il gusto incontra la tradizione")
- Hero image dark overlay opacity and text positioning
- Exact dishes chosen for menu preview card highlights
- Gallery grid CSS implementation details (gap, span pattern)
- Lightbox animation and navigation UX details
- Section heading treatments
- Quick info bar layout
- Internal spacing within each section
- Exact FAQ answer wording (within warm/personal tone, targeting Leipzig SEO)
- Contact section layout
- Footer layout and language switcher design
- `<picture>` element dimensions for each section's images
- Whether to add `aria-label` attributes to sections

### Deferred Ideas (OUT OF SCOPE)
- Private events FAQ question — can be added later if SEO analysis shows demand
- Lightbox with swipe gestures for mobile — enhance post-launch if needed
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SECT-01 | Hero section with restaurant name, headline, subheadline, reservation CTA, menu CTA, trust cues, background image | Hero content pattern, `<picture>` markup, `.hero__content` + `.hero__bg` classes already exist |
| SECT-02 | Quick info bar with opening hours, address, phone, reservation CTA, lunch hours, terrace note | New `.info-bar` CSS block needed; dark background strip using `.section--dark` |
| SECT-03 | About/Philosophy section with family-run story, authentic Italian identity, quality promise | `.content-wrapper` with flow text; `.section` block already styled |
| SECT-04 | Menu overview with HTML preview (pasta, pizza, antipasti, wine) + full menu CTA + PDF download | New `.menu-card` CSS block; placeholder PDF required at `assets/pdf/speisekarte.pdf` |
| SECT-05 | Business lunch section with hours (11:30-14:30), editable highlights, PDF link, status/holiday notes | New `.lunch-highlights` CSS block; placeholder PDF at `assets/pdf/mittagskarte.pdf` |
| SECT-06 | Gallery with elegant CSS grid (interior, food, terrace, exterior) and lazy loading | New `.gallery`, `.gallery__item`, `.gallery__caption` CSS blocks; 6 SVG placeholders exist |
| SECT-07 | Reservation section with external embed placeholder, fallback CTA button, phone option | Simple HTML div + btn; no new CSS blocks needed |
| SECT-08 | Groups/Events section with phone + email inquiry CTAs and trust-focused copy | Existing `.btn` + `.cluster` composition handles CTAs |
| SECT-09 | Location section with address block, static Google Maps link (no iframe), parking info | `.grid[data-layout="halves"]` composition; `<address>` element for semantic markup |
| SECT-10 | FAQ section with 7 SEO-relevant questions and answers | New `.faq-list` CSS; FAQPage JSON-LD added to `<head>`; `<details>`/`<summary>` or `<dl>`/`<dt>`/`<dd>` |
| SECT-11 | Contact section with phone, email, address, opening hours, Instagram link placeholder | `.grid[data-layout="halves"]` composition; `<address>` element |
| SECT-12 | Footer with legal links, language switcher, contact summary, copyright | `.section--dark` block already styled; new 3-col footer grid needed |
| LANG-05 | All nav labels, buttons, headings, meta, schema, and interface strings translated per language | German strings documented in UI-SPEC Copywriting Contract |
| SEO-08 | Local SEO copy targeting German search intent | FAQ answer wording guided by D-18 keyword targets; About/menu copy avoids keyword stuffing |
| PERF-01 | Hero/LCP image eagerly loaded with fetchpriority="high" | Hero `<picture>` uses `loading="eager"` + `fetchpriority="high"` on inner `<img>` |
| PERF-02 | Below-fold images lazy loaded with loading="lazy" decoding="async" | All non-hero images use `loading="lazy"` + `decoding="async"` |
</phase_requirements>

---

## Summary

Phase 4 fills in all content for the 12 sections already scaffolded in `de/index.html` from Phase 3. The skeleton HTML structure, head metadata, JSON-LD Restaurant schema, and hreflang are already in place. The CSS design system (tokens, CUBE CSS blocks, responsive breakpoints, btn, section, header, nav) and JS behaviors (sticky header, mobile menu) are already built and working. This phase is purely additive: it writes content into existing `<section>` elements and extends `main.css` and `main.js` with new blocks for gallery, lightbox, and info bar.

The work divides into four categories: (1) content authoring — writing German copy and markup for all 12 sections, (2) CSS extension — 15 new CSS blocks appended to `main.css` Section 5 BLOCKS, (3) JS extension — one new IIFE (gallery lightbox) appended to `main.js`, and (4) new placeholder assets — two placeholder PDF files for menu download CTAs.

The riskiest implementation area is the gallery lightbox: it requires focus trap, keyboard navigation, ARIA roles, and `prefers-reduced-motion` support — all documented in the UI-SPEC. The FAQPage JSON-LD is the most failure-prone SEO element because the structured data must exactly match the visible HTML content or Google will reject the markup. All decisions about structure, copy, and visual contracts are already documented in CONTEXT.md and UI-SPEC.md — no open design questions remain for the planner.

**Primary recommendation:** Implement as six ordered waves: (1) create placeholder PDFs + extend CSS with all new blocks, (2) hero + info bar sections, (3) about + menu + lunch sections, (4) gallery CSS + JS lightbox + gallery markup, (5) reservation + events + location sections, (6) FAQ + FAQPage JSON-LD + contact + footer.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| HTML5 | Living Standard | Document structure and content | Semantic elements (`<address>`, `<dl>`, `<details>`, `<picture>`) are required by spec and accessibility guidelines |
| CSS3 Custom Properties | Living Standard | Design tokens, new CSS blocks | All tokens are already in `:root`; new blocks extend `main.css` Section 5 |
| Vanilla JS ES2020+ | No transpile | Gallery lightbox IIFE | Matches existing `main.js` pattern exactly |
| JSON-LD (Schema.org) | Schema.org v25 | FAQPage structured data | Google's preferred format; already used in Phase 3 for Restaurant schema |

### No New Dependencies
This phase adds no libraries. All work uses the existing HTML/CSS/JS stack. No npm, no CDN, no external requests.

**Version verification:** Not applicable — no versioned dependencies. All technologies are browser-native Living Standards. [VERIFIED: codebase inspection — `assets/css/main.css`, `assets/js/main.js`, `de/index.html`]

---

## Architecture Patterns

### File Modification Map

This phase modifies exactly three files and creates two new asset files:

```
de/
└── index.html           MODIFY — fill all 12 <section> elements + add FAQPage JSON-LD to <head>

assets/
├── css/
│   └── main.css         MODIFY — append 15 new CSS blocks to Section 5 (BLOCKS)
├── js/
│   └── main.js          MODIFY — append gallery lightbox IIFE (Section 3)
└── pdf/
    ├── speisekarte.pdf  CREATE — placeholder PDF for menu download CTA
    └── mittagskarte.pdf CREATE — placeholder PDF for lunch menu download CTA
```

No new HTML files. No new directories except `assets/pdf/`. No changes to `en/` or `it/` (Phase 5).

### Pattern 1: Content Section Anatomy

Every content section follows this HTML structure:

```html
<!-- Source: existing Phase 3 skeleton, main.css .section block -->
<section id="{anchor}" class="section[ section--alt][ section--dark]">
  <div class="wrapper[ content-wrapper]">
    <h2>{Section Heading}</h2>
    <!-- section content -->
  </div>
</section>
```

- `id=` uses language-neutral English anchor IDs established in Phase 3 (D-01, D-02)
- `.section` applies `padding-block: var(--section-spacing)` (clamp 5–7.5rem)
- `.section--alt` for alternate cream background (`--color-surface-alt`)
- `.section--dark` for footer espresso background (`--color-surface-dark`)
- `.wrapper` constrains to 1200px max; `.content-wrapper` constrains to 800px for text-heavy sections
- H2 automatically gets uppercase + letter-spacing + wine underline rule via global CSS

Section background alternation (light/dark/alt):

| Section | Background Class | Rationale |
|---------|-----------------|-----------|
| #hero | `.hero` (full viewport, dark overlay) | LCP anchor |
| #info | `.section--dark` | Contrast strip after hero |
| #about | `.section` (default) | Warm surface |
| #menu | `.section--alt` | Visual break |
| #lunch | `.section` | Alternate back |
| #gallery | `.section--alt` | Grid needs neutral bg |
| #reservation | `.section` | Clean, focused CTA |
| #events | `.section--alt` | Visual break |
| #location | `.section` | Neutral, practical |
| #faq | `.section--alt` | Alternate |
| #contact | `.section` | Warm close |
| #footer | `.section--dark` | Dark close |

[VERIFIED: main.css `.section`, `.section--alt`, `.section--dark` block definitions lines 599–621]

### Pattern 2: Picture Element Pattern (LCP + Lazy)

Hero (LCP element — must not be lazy):

```html
<!-- Source: CLAUDE.md Images section, Phase 2 D-07/D-08/D-09, UI-SPEC Image Contracts -->
<picture>
  <source srcset="../assets/img/hero-desktop.avif" type="image/avif" media="(min-width: 769px)">
  <source srcset="../assets/img/hero-desktop.webp" type="image/webp" media="(min-width: 769px)">
  <source srcset="../assets/img/hero-mobile.avif" type="image/avif">
  <source srcset="../assets/img/hero-mobile.webp" type="image/webp">
  <img
    src="../assets/img/hero-desktop.svg"
    alt="Elegantes italienisches Restaurant Ristorante Paganini in Leipzig"
    width="1400"
    height="800"
    loading="eager"
    fetchpriority="high"
    decoding="sync"
    class="hero__bg">
</picture>
```

**Critical:** `loading="eager"` and `fetchpriority="high"` on the `<img>` tag (not on `<source>`). `decoding="sync"` on the LCP image (not async — async delays LCP). [VERIFIED: CLAUDE.md Images section, PERF-01 requirement]

Below-fold images (gallery, about, location):

```html
<!-- Source: CLAUDE.md Images section, UI-SPEC Image Contracts -->
<picture>
  <source srcset="../assets/img/gallery-01.avif" type="image/avif">
  <source srcset="../assets/img/gallery-01.webp" type="image/webp">
  <img
    src="../assets/img/gallery-01.svg"
    alt="{descriptive alt text}"
    width="800"
    height="600"
    loading="lazy"
    decoding="async">
</picture>
```

**Note:** AVIF and WebP source files do not yet exist (placeholder SVGs only). The `<picture>` element correctly falls back to SVG via the `<img src>` fallback. Real photography + conversion happens in v2 (POST-01). The markup is future-proof now. [VERIFIED: `assets/img/` directory listing — only SVGs exist]

### Pattern 3: FAQPage JSON-LD

Added as second `<script type="application/ld+json">` block in `<head>`, after the existing Restaurant schema:

```html
<!-- Source: schema.org/FAQPage, Google Search Central docs, SEO-05 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Muss ich reservieren?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{exact answer text from HTML <dd> or <details> content}"
      }
    }
    // ... 6 more Question objects
  ]
}
</script>
```

**Critical synchronization rule:** The `"name"` value in each Question object MUST be character-for-character identical to the `<dt>` or `<summary>` text in the HTML. The `"text"` value in Answer MUST match the `<dd>` or `<details>` content. Google rejects FAQPage markup if any mismatch exists. [VERIFIED: schema.org/FAQPage spec, CONTEXT.md D-19]

### Pattern 4: Gallery CSS Grid

New CSS block in `main.css` Section 5:

```css
/* Source: CSS Grid specification, UI-SPEC Gallery Section Contract */
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-sm);
}

.gallery__item[data-span="2"] {
  grid-column: span 2;
}

.gallery__caption {
  position: absolute;
  inset: 0;
  background: rgba(28, 12, 14, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-base);
  color: var(--color-text-inverse);
  font-size: var(--font-size-sm);
  padding: var(--space-4);
  text-align: center;
}

.gallery__item:hover .gallery__caption,
.gallery__item:focus-within .gallery__caption {
  opacity: 1;
}

@media (max-width: 47.999rem) {
  .gallery {
    grid-template-columns: 1fr;
  }
  .gallery__item[data-span="2"] {
    grid-column: span 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery__caption {
    transition: none;
  }
}
```

[VERIFIED: main.css existing token names and `--transition-base` value, UI-SPEC Gallery Section Contract]

### Pattern 5: Lightbox IIFE

Appended to `main.js` as Section 4, matching the existing IIFE structure:

```javascript
/* ============================================================
 * 4. GALLERY LIGHTBOX
 *    Vanilla JS modal for viewing gallery images larger.
 *    Hooks: data-lightbox-trigger on image links,
 *           id="lightbox" on modal container,
 *           id="lightbox-img" on modal image,
 *           id="lightbox-prev", id="lightbox-next", id="lightbox-close"
 * ============================================================ */

(function initLightbox() {
  // ...IIFE body with focus trap, keyboard nav (Escape/ArrowLeft/ArrowRight),
  // data-open="true" state toggle (mirror mobile menu pattern),
  // aria-modal="true", role="dialog", aria-label="Bildergalerie"
  // prefers-reduced-motion check for transition skip
}());
```

[VERIFIED: `assets/js/main.js` IIFE pattern, UI-SPEC Interaction Contracts — Gallery Lightbox]

### Pattern 6: Details/Summary for FAQ

The executor should use `<details>`/`<summary>` (browser-native accordion) over `<dl>`/`<dt>`/`<dd>` for FAQ. Rationale: provides interactive accordion behavior with zero JS, browser-native `open` state, and simpler JSON-LD synchronization. The `<summary>` element directly maps to the JSON-LD `"name"` field.

```html
<!-- Source: HTML Living Standard, UI-SPEC FAQ Section Contract -->
<dl class="faq-list">
  <!-- Alternative: use <details>/<summary> if accordion preferred -->
  <dt>Muss ich reservieren?</dt>
  <dd>...</dd>
</dl>
```

Both patterns are acceptable per UI-SPEC. The `<details>` approach adds free accordion UX. The `<dl>` approach is simpler and shows all answers immediately (good for crawlers). Given SEO-08 (local SEO copy targeting German search intent), showing all answers immediately with `<dl>` maximizes crawlable content — recommended for this SEO-focused FAQ. [ASSUMED — "crawlability of <details> hidden content" debate; Google has stated it indexes `<details>` content, but the `<dl>` approach has zero ambiguity]

### Anti-Patterns to Avoid

- **`loading="lazy"` on hero image:** Kills LCP score. Hero `<img>` must have `loading="eager"` + `fetchpriority="high"`. The `.hero-sentinel` already exists for IntersectionObserver. [VERIFIED: CLAUDE.md, PERF-01]
- **`decoding="async"` on hero image:** Use `decoding="sync"` on LCP images — async decoding defers the LCP element's rendering. [VERIFIED: web.dev font/image best practices, CLAUDE.md Images section]
- **Hardcoded hex/px values in new CSS:** All new blocks must use CSS custom properties from `:root`. No hard-coded `#7A2D3A`, no `24px`. [VERIFIED: CLAUDE.md constraints, main.css architecture]
- **New `@font-face` or `<link rel="stylesheet">`:** Fonts and CSS are already loaded. No new font files needed, no additional stylesheets. [VERIFIED: main.css @font-face declarations — all 4 weights present]
- **Inline `style=` attributes:** CUBE CSS uses `data-*` attributes for state, CSS classes for styling. Inline styles break the cascade and conflict with the design token system. Exception: hero brand mark style in skeleton — this should be converted to a proper CSS class (`.section-label`).
- **Missing `width` and `height` on images:** Every `<img>` must have explicit integer `width` and `height` attributes to prevent CLS (layout shift). SVG placeholders use their natural dimensions. [VERIFIED: CLAUDE.md Images section, FOUND-08]
- **PDF href pointing to non-existent file:** Both `assets/pdf/speisekarte.pdf` and `assets/pdf/mittagskarte.pdf` must be created (placeholder files) before the download CTAs work. The `assets/pdf/` directory does not yet exist. [VERIFIED: assets/ directory listing]
- **FAQPage JSON-LD written before HTML content:** Write the FAQ HTML content first, then copy the exact text into JSON-LD. Writing JSON-LD first introduces copy drift risk.
- **Google Maps iframe embed:** Strictly prohibited — GDPR decision. Use `<a href="https://maps.google.com/?q=...">` only. [VERIFIED: STATE.md, REQUIREMENTS.md Out of Scope]
- **Backend form for groups inquiry:** Strictly prohibited — static site constraint. Phone + email links only. [VERIFIED: STATE.md, REQUIREMENTS.md Out of Scope]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive image format fallback | Custom JS format detection | `<picture>` with `<source type="image/avif">` + `<source type="image/webp">` + `<img>` | Browser handles format negotiation natively; no JS needed |
| Sticky header on scroll | `scroll` event listener polling | `IntersectionObserver` on `.hero-sentinel` | Already built in `main.js` — DO NOT duplicate; sentinel already in skeleton |
| Smooth anchor scrolling | JS scroll animation | `scroll-behavior: smooth` on `html` + `scroll-padding-top` on `html` | Already in `main.css` lines 177–178; zero JS needed |
| Mobile menu behavior | Custom toggle JS | `id="menu-toggle"` / `id="mobile-menu"` hooks already in skeleton | Already built and working in `main.js` — content fill must preserve exact IDs |
| Image lazy loading | JS IntersectionObserver lazy loader | `loading="lazy"` attribute on `<img>` | Native browser support is universal (Chrome 76+, Firefox 75+, Safari 15.4+) — no library needed |
| FAQ accordion | JS click handlers + class toggles | HTML `<details>`/`<summary>` | Browser-native open/close, no JS, keyboard accessible, animatable with CSS |
| Font loading optimization | JS font loader | `font-display: swap` in @font-face (already in main.css) | Swap already configured; no additional work |

**Key insight:** The sticky header, smooth scroll, mobile menu, and lazy loading are already built. The executor must populate content that works with existing hooks — not rebuild them.

---

## Common Pitfalls

### Pitfall 1: Breaking the IntersectionObserver Hero Sentinel

**What goes wrong:** Adding content inside `<section class="hero" id="hero">` that wraps or removes the `<div class="hero-sentinel" aria-hidden="true"></div>` — this div must remain as the last child of the hero section.
**Why it happens:** Hero content fill adds markup around the sentinel or accidentally deletes it.
**How to avoid:** Add all hero content as `.hero__content` div before the sentinel. The sentinel must remain as the last child of `.hero`.
**Warning signs:** Header always appears solid (never transparent over hero) after content fill.
[VERIFIED: `assets/js/main.js` line 60 — `observer.observe(sentinel)`, `de/index.html` line 196]

### Pitfall 2: FAQPage JSON-LD Mismatch with HTML

**What goes wrong:** The JSON-LD `"name"` or `"text"` values drift from the visible HTML. Google's Rich Results Test rejects the markup or removes FAQ rich results from search.
**Why it happens:** Copy is written in two places independently. FAQ answers often get edited in HTML after JSON-LD is finalized.
**How to avoid:** Write HTML FAQ content first. Copy exact text into JSON-LD immediately after. Add `<!-- SYNC: Update FAQPage JSON-LD in <head> when editing these Q&A pairs -->` comment on each `<dt>`/`<dd>` pair.
**Warning signs:** Google Search Console "Invalid FAQ" warnings after launch.
[VERIFIED: schema.org/FAQPage spec, CONTEXT.md D-19]

### Pitfall 3: `assets/pdf/` Directory Does Not Exist

**What goes wrong:** PDF download CTAs link to `../assets/pdf/speisekarte.pdf` and `../assets/pdf/mittagskarte.pdf`, but neither the directory nor the files exist yet, resulting in 404 errors on the live page.
**Why it happens:** PDF creation is an asset task that can be overlooked when focusing on HTML markup.
**How to avoid:** Create `assets/pdf/` directory and both placeholder PDF files before writing the CTA `href` attributes in HTML.
**Warning signs:** Download links return 404 in browser dev tools Network tab.
[VERIFIED: `assets/` directory listing — no `pdf/` subdirectory exists]

### Pitfall 4: H3 Using Wrong Font Size Token

**What goes wrong:** New CSS blocks use `font-size: var(--font-size-heading-sm)` (22px) for H3 elements inside cards, lunch highlights, or FAQ — UI-SPEC explicitly prohibits this.
**Why it happens:** `--font-size-heading-sm` looks like the right token for H3, but UI-SPEC defines H3 as body size (16px/1rem) distinguished only by typeface.
**How to avoid:** All H3 inside new blocks use `font-family: var(--font-heading); font-size: 1rem; font-weight: var(--font-weight-normal)`.
**Warning signs:** H3 elements appear too large, breaking visual hierarchy proportions.
[VERIFIED: UI-SPEC Typography section, main.css lines 213–216]

### Pitfall 5: Inline Style on Hero Brand Mark

**What goes wrong:** The Phase 3 skeleton uses an inline `style=` attribute on the header brand link (`style="font-size: 1.5rem; text-decoration: none; color: var(--color-accent); font-weight: 700;"`). The hero brand mark (inside `.hero__content`) must use the `.section-label` class defined as new CSS, not inline styles.
**Why it happens:** Following the header pattern from the skeleton into hero content.
**How to avoid:** Create `.section-label` CSS block in main.css. Apply it to the brand mark span above H1 in hero content.
**Warning signs:** VS Code (or validator) flags inline style; agency cannot update brand mark styling without finding the inline attribute.
[VERIFIED: `de/index.html` line 141, UI-SPEC New CSS section item 15]

### Pitfall 6: Mobile Nav Links Not Including All 12 Sections

**What goes wrong:** Desktop nav has 6 links; mobile menu already has 11 links. If FAQ, gallery, or events links are missing from either nav during content fill, the success criterion ("see all 12 section links") fails.
**Why it happens:** The nav was written in Phase 3 with placeholder links; content fill might only update desktop nav.
**How to avoid:** Verify both `.nav ul` (desktop) and `#mobile-menu` (mobile overlay) have correct, complete link sets after content fill. Desktop nav may intentionally show fewer links for space — mobile nav must show all.
**Warning signs:** Success criterion 2 fails — visitor cannot navigate to all 12 sections from mobile menu.
[VERIFIED: `de/index.html` lines 146–183 — mobile menu already has all anchor links; desktop nav has 6 only — this is intentional per skeleton]

### Pitfall 7: Secondary Button Colors Invisible on Hero

**What goes wrong:** `.btn[data-variant="secondary"]` uses `color: var(--color-accent)` (dark wine) and `border-color: var(--color-accent)` — these are invisible/low-contrast against the hero's dark overlay background.
**Why it happens:** The secondary button is designed for light backgrounds. Hero needs an override.
**How to avoid:** Inside `.hero__content`, override secondary button to use `--color-text-inverse` for both color and border-color. This is noted in UI-SPEC Section Contracts for #hero.
**Warning signs:** "Speisekarte" button is invisible or low-contrast on hero image background.
[VERIFIED: main.css `.btn[data-variant="secondary"]` lines 587–591, UI-SPEC #hero section contract]

---

## Code Examples

### Hero Section Complete Structure

```html
<!-- Source: de/index.html Phase 3 skeleton, main.css .hero block, UI-SPEC #hero -->
<section class="hero" id="hero">
  <picture>
    <source srcset="../assets/img/hero-desktop.avif" type="image/avif" media="(min-width: 769px)">
    <source srcset="../assets/img/hero-desktop.webp" type="image/webp" media="(min-width: 769px)">
    <source srcset="../assets/img/hero-mobile.avif" type="image/avif">
    <source srcset="../assets/img/hero-mobile.webp" type="image/webp">
    <img
      src="../assets/img/hero-desktop.svg"
      alt="Elegantes italienisches Restaurant Ristorante Paganini in Leipzig"
      width="1400"
      height="800"
      loading="eager"
      fetchpriority="high"
      decoding="sync"
      class="hero__bg">
  </picture>
  <div class="hero__content flow">
    <span class="section-label">Ristorante Paganini</span>
    <h1><em>Dove il gusto incontra la tradizione</em></h1>
    <div class="cluster hero__trust-cues">
      <span>Seit über 30 Jahren familiengeführt</span>
      <span>Im Herzen der Leipziger Innenstadt</span>
      <span>Mo–Sa 11:30–22:00 Uhr · +49 341 XXXXXXXX</span>
    </div>
    <div class="cluster">
      <a href="#reservation" class="btn" data-variant="primary">Tisch reservieren</a>
      <a href="#menu" class="btn" data-variant="secondary">Speisekarte</a>
    </div>
  </div>
  <div class="hero-sentinel" aria-hidden="true"></div>
</section>
```

### Gallery Item with Hover Caption

```html
<!-- Source: UI-SPEC Gallery Section Contract, main.css .gallery block (new) -->
<div class="gallery__item" data-span="2">
  <picture>
    <source srcset="../assets/img/gallery-01.avif" type="image/avif">
    <source srcset="../assets/img/gallery-01.webp" type="image/webp">
    <img
      src="../assets/img/gallery-01.svg"
      alt="Handgemachte Pasta nach traditionellem Familienrezept"
      width="1200"
      height="600"
      loading="lazy"
      decoding="async">
  </picture>
  <div class="gallery__caption" aria-hidden="true">
    <!-- EDITABLE: Update caption when real photography replaces placeholder -->
    Handgemachte Pasta
  </div>
</div>
```

### FAQ with `<dl>` Pattern (Recommended for SEO)

```html
<!-- Source: HTML Living Standard, schema.org/FAQPage, UI-SPEC #faq, SEO-08 -->
<dl class="faq-list flow">
  <!-- SYNC: Update FAQPage JSON-LD in <head> when editing these Q&A pairs -->
  <dt>Muss ich reservieren?</dt>
  <dd>Wir empfehlen eine Reservierung, besonders an Wochenenden und Feiertagen. Unter der Woche sind häufig auch kurzfristige Tische verfügbar. Reservieren Sie bequem telefonisch unter +49 341 XXXXXXXX oder nutzen Sie unser Online-Reservierungssystem.</dd>

  <dt>Gibt es einen Mittagstisch?</dt>
  <dd>Ja, wir bieten täglich von 11:30 bis 14:30 Uhr einen Mittagstisch an. Unser Mittagsmenü wechselt monatlich und umfasst Vorspeise, Pasta, Hauptgericht und Dessert zu einem attraktiven Preis.</dd>
  <!-- ... 5 more Q&A pairs -->
</dl>
```

### Business Lunch Monthly-Updatable Block

```html
<!-- Source: CONTEXT.md D-09, D-10, UI-SPEC #lunch -->
<section class="section" id="lunch">
  <div class="wrapper">
    <h2>Mittagstisch</h2>
    <p class="lunch-hours font-heading">11:30 – 14:30 Uhr</p>
    <ul class="lunch-highlights flow" role="list">
      <li class="lunch-highlight">
        <h3>Vorspeise</h3>
        <!-- EDIT: Update dish name monthly -->
        <p class="font-bold">Bruschetta al Pomodoro</p>
        <p class="font-sm text-muted">Geröstetes Brot mit frischen Tomaten, Basilikum und Olivenöl</p>
      </li>
      <li class="lunch-highlight">
        <h3>Pasta</h3>
        <!-- EDIT: Update dish name monthly -->
        <p class="font-bold">Tagliatelle al Ragù</p>
        <p class="font-sm text-muted">Handgemachte Tagliatelle mit hausgemachtem Bolognese-Ragù</p>
      </li>
      <li class="lunch-highlight">
        <h3>Hauptgericht</h3>
        <!-- EDIT: Update dish name monthly -->
        <p class="font-bold">Pollo alla Cacciatora</p>
        <p class="font-sm text-muted">Geschmortes Huhn mit Tomaten, Oliven und Kräutern, serviert mit Polenta</p>
      </li>
      <li class="lunch-highlight">
        <h3>Dessert</h3>
        <!-- EDIT: Update dish name monthly -->
        <p class="font-bold">Panna Cotta alla Vaniglia</p>
        <p class="font-sm text-muted">Cremige Vanillepanna cotta mit frischen Beeren</p>
      </li>
    </ul>
    <!-- EDIT: Update for holidays, closures, or special lunch hours -->
    <p class="font-sm text-muted"><em>Bitte beachten Sie: An Feiertagen kann das Mittagsangebot abweichen.</em></p>
    <a href="../assets/pdf/mittagskarte.pdf" class="btn" data-variant="secondary" download>Mittagskarte herunterladen</a>
  </div>
</section>
```

---

## Environment Availability

Step 2.6: SKIPPED — this phase is HTML/CSS/vanilla JS content authoring with no external CLI tools, services, runtimes, databases, or package managers. All required assets (SVG placeholders, fonts, CSS, JS) exist in the repository. The only external resource is the Google Maps link (static `<a href>` — no API key, no iframe, no runtime dependency).

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — static HTML/CSS/JS, no automated test framework exists or is appropriate |
| Config file | none |
| Quick run command | Open `de/index.html` in browser; check Network tab for 404s |
| Full suite command | Lighthouse CLI: `npx lighthouse http://localhost:PORT/de/ --output json` (requires local server) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|--------------|
| SECT-01 | Hero section has H1, trust cues, two CTAs, background image | Manual smoke | Open page, verify above-fold layout | ❌ Wave 0 (browser only) |
| SECT-02 | Info bar shows hours, address, phone, CTA | Manual smoke | Scroll to #info, verify all elements present | ❌ Wave 0 |
| SECT-03 | About section has 3 paragraphs, family story | Manual smoke | Scroll to #about | ❌ Wave 0 |
| SECT-04 | Menu has 4 cards, PDF link resolves | Manual smoke | Click "Speisekarte herunterladen", verify download | ❌ Wave 0 |
| SECT-05 | Lunch section shows 11:30-14:30, 4 highlights | Manual smoke | Scroll to #lunch | ❌ Wave 0 |
| SECT-06 | Gallery grid renders, lightbox opens on click | Manual interaction | Click gallery image, verify lightbox modal | ❌ Wave 0 |
| SECT-07 | Reservation placeholder + phone CTA present | Manual smoke | Scroll to #reservation | ❌ Wave 0 |
| SECT-08 | Events section has phone + email CTAs | Manual smoke | Scroll to #events, click phone link | ❌ Wave 0 |
| SECT-09 | Location shows address, Google Maps link | Manual smoke | Click Maps link, verify opens correctly | ❌ Wave 0 |
| SECT-10 | FAQ shows 7 questions, FAQPage JSON-LD present | Structural + manual | View source, count `<dt>` elements = 7; validate JSON-LD at search.google.com/test/rich-results | ❌ Wave 0 |
| SECT-11 | Contact has phone, email, hours, Instagram | Manual smoke | Scroll to #contact, verify all elements | ❌ Wave 0 |
| SECT-12 | Footer has legal links, language switcher, copyright | Manual smoke | Scroll to footer | ❌ Wave 0 |
| LANG-05 | All strings in German | Manual review | Read every section, verify no placeholder English text | ❌ Wave 0 |
| SEO-08 | FAQPage JSON-LD valid and matches HTML | Automated | Google Rich Results Test (manual URL) | ❌ Wave 0 |
| PERF-01 | Hero `loading="eager"` + `fetchpriority="high"` | Structural | `grep -n 'fetchpriority' de/index.html` | ❌ Wave 0 |
| PERF-02 | All non-hero images `loading="lazy"` | Structural | `grep -c 'loading="lazy"' de/index.html` — expect ≥6 | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** Load `de/index.html` in browser, check section renders correctly, check console for JS errors
- **Per wave merge:** Full manual pass through all 12 sections on mobile and desktop viewport widths
- **Phase gate:** Lighthouse mobile audit (LCP < 2.5s), Google Rich Results Test for FAQPage JSON-LD, zero 404s in Network tab

### Wave 0 Gaps

- No automated test framework is appropriate for static HTML. All validation is:
  1. Browser visual inspection (manual)
  2. Browser DevTools Network tab (404 check)
  3. Browser DevTools Console (JS errors)
  4. Google Rich Results Test for FAQPage JSON-LD
  5. Lighthouse audit for PERF-01 (LCP)
  6. `grep` commands for structural attribute verification (PERF-01, PERF-02)

---

## Security Domain

This phase authors static content only — no user input, no form processing, no server-side code, no authentication, no API calls. ASVS categories are largely not applicable.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Static page — no auth |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | No access control |
| V5 Input Validation | No | No user input in this phase |
| V6 Cryptography | No | No secrets, no encryption |

### Applicable Security Considerations

| Pattern | Concern | Standard Mitigation |
|---------|---------|---------------------|
| External links (Google Maps, Instagram) | Open redirect / phishing risk | `rel="noopener noreferrer"` on all `target="_blank"` links — required |
| `tel:` and `mailto:` hrefs | Leaking real contact info | Placeholder values with `<!-- EDIT: -->` comments until owner provides real data |
| PDF placeholder files | 404 errors = broken CTA trust | Create placeholder PDFs before writing `href` attributes |
| No Google Maps iframe | GDPR compliance | Static link only — already a locked decision in STATE.md |

**`rel="noopener noreferrer"` rule:** Every `<a target="_blank">` in the page (Google Maps link, Instagram link, any external URL) MUST include `rel="noopener noreferrer"`. This prevents tab-napping attacks and is required for WCAG 2.1 compliance. [VERIFIED: CLAUDE.md, UI-SPEC location section contract]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<img loading="lazy">` polyfill library | Native `loading="lazy"` attribute | Chrome 76+ (2019), Safari 15.4+ (2022) | No JS library needed; universal support in 2026 |
| Separate lazy load JS for images | `loading="lazy"` + `decoding="async"` on `<img>` | Now standard | Zero JS for lazy loading |
| jQuery for DOM manipulation | `querySelector`, `classList`, `addEventListener` | Industry-wide since 2015-2020 | No dependency; already applied in main.js |
| Google Fonts CDN `<link>` | Self-hosted woff2 via @font-face | GDPR enforcement increased 2022 | No third-party DNS; DSGVO compliant |
| JS-based language switching | Separate HTML files per language | SEO best practice, confirmed 2024 | Separate indexing, correct hreflang, no JS failure mode |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `<dl>`/`<dt>`/`<dd>` is marginally better for FAQ SEO vs `<details>`/`<summary>` because all content is immediately visible to crawlers | Architecture Patterns #6 (FAQ) | Low — Google has confirmed it indexes `<details>` content; either approach works |
| A2 | `decoding="sync"` on LCP `<img>` is the correct optimization (vs `decoding="async"`) | Architecture Patterns #2 | Medium — official guidance is evolving; `decoding="async"` on non-LCP images is clearly correct; `sync` on LCP is the optimization recommendation but "auto" is also acceptable |
| A3 | Placeholder PDF files (1-byte or minimal valid PDF) satisfy browser download CTA functionality | Common Pitfalls #3 | Low — any file at the path will satisfy the download link; content doesn't matter for placeholder stage |

---

## Open Questions

1. **FAQ markup approach: `<dl>` vs `<details>`**
   - What we know: Both are valid HTML for FAQ. `<details>` gives free accordion UX. `<dl>` shows all content immediately.
   - What's unclear: Whether SEO benefit of always-visible `<dl>` content outweighs UX benefit of `<details>` accordion.
   - Recommendation: Use `<dl>` for maximum crawlability; FAQ answers are short (1-2 sentences) so showing all is not a space problem. Executor may choose `<details>` if they prefer the accordion UX.

2. **Real phone number and address**
   - What we know: Placeholders (`XXXXXXXX`, `Grosse Fleischergasse`) are in the skeleton.
   - What's unclear: Whether the owner has provided real data for the executor.
   - Recommendation: Use placeholder values throughout with `<!-- EDIT: -->` comments as documented. Do not block on real data.

3. **PDF placeholder creation tool**
   - What we know: `assets/pdf/` directory does not exist; two placeholder PDFs are needed.
   - What's unclear: Whether to create a genuine minimal PDF binary or a zero-byte file.
   - Recommendation: Create a minimal valid 1-page PDF using a simple text file renamed to `.pdf` OR use `echo "%PDF-1.4" > speisekarte.pdf` to create a syntactically valid but empty PDF. The download CTA just needs the file to exist and be non-404.

---

## Sources

### Primary (HIGH confidence)
- `de/index.html` (Phase 3 output) — existing skeleton structure, anchor IDs, head metadata, JSON-LD
- `assets/css/main.css` (Phase 1 output) — all design tokens, existing CSS blocks, CUBE CSS methodology
- `assets/js/main.js` (Phase 2 output) — IIFE patterns, existing JS hooks
- `04-CONTEXT.md` — all locked decisions D-01 through D-25
- `04-UI-SPEC.md` — section-by-section visual contracts, interaction contracts, new CSS list, new JS list
- `CLAUDE.md` — project constraints, tech stack, image markup rules, What NOT To Use

### Secondary (MEDIUM confidence)
- `REQUIREMENTS.md` — SECT-01 through SECT-12, LANG-05, SEO-08, PERF-01, PERF-02 definitions
- `STATE.md` — project decisions: no iframe, no form, phone+email only for groups

### Tertiary (LOW confidence — assumptions only)
- A1, A2, A3 as documented in Assumptions Log above

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; existing stack is verified in codebase
- Architecture: HIGH — all patterns derived from existing `main.css`, `main.js`, and `de/index.html`; verified line-by-line
- Pitfalls: HIGH — all pitfalls derived from concrete code analysis (specific line numbers cited)
- FAQ SEO pattern: MEDIUM — `<dl>` vs `<details>` debate; both are valid

**Research date:** 2026-04-08
**Valid until:** 2027-04-08 (stable — no versioned dependencies; Living Standard HTML/CSS/JS does not change implementation patterns on this timescale)
