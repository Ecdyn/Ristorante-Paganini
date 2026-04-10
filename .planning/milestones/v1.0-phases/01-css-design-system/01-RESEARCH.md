# Phase 1: CSS Design System — Research

**Researched:** 2026-04-06
**Domain:** CSS architecture, design tokens, self-hosted web fonts, WCAG accessibility, responsive layout
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Primary accent color is wine/burgundy (#7A2D3A range) — evokes red wine, confidence, traditional Italian dining
- **D-02:** Site backgrounds are all light/cream throughout (#FBF5F5 warm cream range) — airy, open feel rather than dark/moody
- **D-03:** CTA buttons use solid wine fill with white text — high-visibility, unmistakable click targets
- **D-04:** Text color is dark charcoal/espresso range for readability on light backgrounds
- **D-05:** Moderate heading hierarchy — H1 ~3rem (48px), H2 ~2rem (32px), H3 ~1.375rem (22px), body 1rem (16px) on desktop with ~20% reduction on mobile
- **D-06:** Cormorant Garamond (serif) for all headings H1–H4; Lato (sans-serif) for body text, navigation, buttons, captions, and all other text
- **D-07:** Self-hosted woff2 font files with @font-face and font-display: swap — no Google Fonts CDN requests
- **D-08:** Generous vertical spacing between sections: 80–120px (5rem–7.5rem)
- **D-09:** Narrow content width ~800px max for text sections — 65–75 character reading lines
- **D-10:** Hero and gallery sections can extend to full viewport/container width regardless of the 800px text constraint
- **D-11:** Hero is full-viewport height (100vh) with background photo, dark overlay for text readability, headline and CTAs centered
- **D-12:** Hero image uses eager loading with fetchpriority="high" — it is the LCP element

### Claude's Discretion

- H2 section title styling (uppercase with letter-spacing vs. title case vs. other treatment)
- Section visual separation method (alternating background tints, divider lines, whitespace only, or combination)
- Whether to include a dark section variant (e.g., dark footer) or keep everything light/cream
- Internal spacing within sections (padding, element gaps)
- Exact hex values for the full color token set (derived from the wine/cream direction)
- Spacing scale progression (e.g., 4px base, 8px, 16px, 24px, 32px, etc.)
- Focus indicator styling for accessibility
- Transition/animation token values
- Shadow and border-radius token values

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Site uses semantic HTML5 with single H1 per page and proper heading hierarchy | Typography scale tokens define H1–H4 sizes; CSS file header documents the convention |
| FOUND-02 | CSS design system uses custom properties for colors, spacing, typography, shadows, radii | Full token architecture in `:root` — see Standard Stack section |
| FOUND-03 | Mobile-first responsive layout with touch-friendly navigation and tappable CTAs | Breakpoint pattern and min-width media query approach documented |
| FOUND-07 | Self-hosted web fonts (GDPR-compliant, no Google Fonts CDN) | @font-face declarations with woff2 and font-display: swap; gwfh.mranftl.com source |
| FOUND-09 | WCAG 2.1 AA accessibility: alt text, keyboard nav, color contrast, focus indicators | Contrast verification approach, :focus-visible pattern, prefers-reduced-motion tokens |
| FOUND-10 | All editable content areas marked with clear HTML comments | HTML comment convention documented in CSS file header section |

</phase_requirements>

---

## Summary

Phase 1 establishes the complete visual foundation for the site before a single HTML page is written. The deliverable is a single `assets/css/main.css` file that encodes every visual decision via CSS custom properties, structured according to the CUBE CSS methodology. Any HTML file that links this stylesheet inherits correct typography, colors, spacing, and responsive behavior without additional work.

The architecture is straightforward because the project constraints eliminate all complexity: no build step, no preprocessor, no partials, no framework. The entire CSS lives in one commented file organized into six named layers: design tokens, global/reset, composition, utilities, blocks, and exceptions. The token layer on `:root` drives everything downstream — changing `--color-accent` once updates all CTAs, links, and interactive states across all 9 page files.

Font setup requires downloading woff2 files from google-webfonts-helper for Cormorant Garamond (weights 300, 400, 600) and Lato (weights 400, 700), placing them in `assets/fonts/`, and declaring `@font-face` blocks with `font-display: swap`. No request ever reaches Google Fonts servers, satisfying the GDPR constraint. Validation of WCAG 2.1 AA color contrast must occur before the token values are locked — the wine/cream palette direction is high-contrast by nature, but exact hex values must be verified at webaim.org/resources/contrastchecker before committing.

**Primary recommendation:** Write the `:root` token block first, verify WCAG contrast ratios for each text-on-background combination, then build the six CUBE CSS layers sequentially. The CSS file header must document the HTML comment convention (FOUND-10) before any content work begins.

---

## Standard Stack

### Core

| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|--------------|
| CSS3 + Custom Properties | Living Standard | All styling; design token system | Native cascade; no build step; token-based theming without preprocessor [VERIFIED: MDN] |
| CUBE CSS methodology | N/A (pattern, not library) | File organization; layer naming | Embraces the cascade; proven on static marketing sites; author Andy Bell, actively maintained 2025 [CITED: piccalil.li/blog/cube-css/] |
| woff2 font format | N/A (file format) | Self-hosted web fonts | Superior compression (~30% better than woff); universal support in all 2020+ browsers; single format needed [CITED: web.dev/articles/font-best-practices] |

### Supporting

| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| google-webfonts-helper | Web app (no version) | Download Cormorant Garamond + Lato woff2 files with generated @font-face CSS | One-time font acquisition step |
| webaim.org/resources/contrastchecker | Web app | Verify WCAG 2.1 AA contrast ratios for token color pairs | Before finalizing any color token hex value |
| Browser DevTools | Built-in | Verify no request to fonts.googleapis.com; inspect :root computed values | During and after CSS authoring |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CUBE CSS | Pure BEM | BEM fights the cascade; verbose class names; complicates maintenance for non-developers |
| CUBE CSS | Utility-only (Tailwind mindset) | HTML becomes unreadable for agency staff; contradicts editability requirement |
| Single main.css | Multiple linked CSS files | Extra HTTP requests on static hosts without guaranteed HTTP/2 |
| Self-hosted woff2 | Google Fonts CDN link | DSGVO/GDPR violation risk for German visitors; third-party DNS lookup adds latency |
| CSS custom properties | Sass variables | Requires build step; hard constraint prohibits it |

**Installation (font files only — no npm packages needed):**
```
Visit: https://gwfh.mranftl.com/fonts/cormorant-garamond?subsets=latin
  Select: Latin subset, weights 300 / 400 / 600, include italic for 300 and 400
  Download: woff2 files only
  Place in: assets/fonts/

Visit: https://gwfh.mranftl.com/fonts/lato?subsets=latin
  Select: Latin subset, weights 400 / 700, normal style only
  Download: woff2 files only
  Place in: assets/fonts/
```

---

## Architecture Patterns

### Recommended Project Structure (Phase 1 scope)

```
assets/
├── css/
│   └── main.css        # Sole stylesheet — all design tokens, layout, components
└── fonts/
    ├── cormorant-garamond-v22-latin-300.woff2
    ├── cormorant-garamond-v22-latin-300italic.woff2
    ├── cormorant-garamond-v22-latin-regular.woff2
    ├── cormorant-garamond-v22-latin-italic.woff2
    ├── cormorant-garamond-v22-latin-600.woff2
    ├── lato-v24-latin-regular.woff2
    └── lato-v24-latin-700.woff2
```

### Pattern 1: CUBE CSS Single-File Layer Organization

**What:** Six named sections in `main.css`, separated by block comments with a table of contents in the file header.

**When to use:** This is the mandated structure for this project. Every rule belongs to exactly one layer.

```css
/* Source: piccalil.li/blog/cube-css/ + CLAUDE.md CSS Architecture section */

/* ============================================================
   MAIN.CSS — Ristorante Paganini
   ============================================================

   TABLE OF CONTENTS
   -----------------
   1. DESIGN TOKENS    — CSS custom properties on :root
   2. GLOBAL / RESET   — box-sizing, margin resets, base element styles
   3. COMPOSITION      — layout primitives (.flow, .cluster, .wrapper, .grid)
   4. UTILITIES        — single-purpose classes (.visually-hidden, .text-center)
   5. BLOCKS           — component styles (.header, .hero, .btn, etc.)
   6. EXCEPTIONS       — data-attribute overrides ([data-state="scrolled"])

   EDITABLE CONTENT ZONES
   ----------------------
   HTML files use this comment convention to mark all live data:
     <!-- EDITABLE: [description of what to update] -->
   Examples:
     <!-- EDITABLE: Restaurant phone number -->
     <!-- EDITABLE: Opening hours — update in DE, EN, IT files -->
     <!-- EDITABLE: Menu item name and price -->
     <!-- SYNC: Update this value in de/, en/, and it/ files -->
     <!-- PLACEHOLDER: Replace with real content before launch -->

   ============================================================ */

/* ── 1. DESIGN TOKENS ──────────────────────────────────────── */
:root { ... }

/* ── 2. GLOBAL / RESET ─────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }
body { ... }

/* ── 3. COMPOSITION ────────────────────────────────────────── */
.flow > * + * { margin-block-start: var(--flow-space, 1em); }
.wrapper { ... }
.cluster { ... }

/* ── 4. UTILITIES ──────────────────────────────────────────── */
.visually-hidden { ... }
.text-center { text-align: center; }

/* ── 5. BLOCKS ─────────────────────────────────────────────── */
.header { ... }
.hero { ... }
.btn { ... }

/* ── 6. EXCEPTIONS ─────────────────────────────────────────── */
.header[data-state="scrolled"] { ... }
```

### Pattern 2: Design Token Architecture on `:root`

**What:** All visual decisions encoded as named CSS custom properties. Semantic names (not raw values). Color tokens derived from the locked D-01 through D-04 decisions.

**When to use:** Every value that appears more than once in the CSS must be a token. Every value the owner might want to change must be a token.

```css
/* Source: CLAUDE.md design token section + D-01 through D-12 from CONTEXT.md */

:root {
  /* ── Brand Colors ──────────────────────────────────────── */
  /* Wine/burgundy accent — D-01 locked direction */
  --color-accent:         #7A2D3A;   /* Wine red — CTAs, links, interactive */
  --color-accent-hover:   #5E2230;   /* Darker wine — hover/focus state */
  --color-accent-light:   #9E4455;   /* Lighter wine — decorative accents */

  /* Site backgrounds — D-02 locked direction */
  --color-surface:        #FBF5F5;   /* Warm cream — primary page background */
  --color-surface-alt:    #F5EDEE;   /* Slightly deeper cream — alternate sections */
  --color-surface-dark:   #2C1A1D;   /* Dark espresso — footer, hero overlay */

  /* Text — D-04 locked direction */
  --color-text:           #2A1F20;   /* Dark espresso — primary body text */
  --color-text-muted:     #6B5557;   /* Muted warm brown — captions, secondary */
  --color-text-inverse:   #FBF5F5;   /* Cream — text on dark backgrounds */

  /* UI */
  --color-border:         #DFD0D2;   /* Subtle warm divider */
  --color-overlay:        rgba(28, 12, 14, 0.55); /* Hero dark overlay */

  /* ── Typography ────────────────────────────────────────── */
  --font-heading: 'Cormorant Garamond', Georgia, serif;  /* D-06 */
  --font-body:    'Lato', system-ui, sans-serif;         /* D-06 */

  /* Type scale — D-05 locked */
  --font-size-base:  1rem;          /* 16px — body */
  --font-size-sm:    0.875rem;      /* 14px — captions, legal */
  --font-size-md:    1.125rem;      /* 18px — lead text */
  --font-size-h3:    1.375rem;      /* 22px — H3 */
  --font-size-h2:    2rem;          /* 32px — H2 */
  --font-size-h1:    3rem;          /* 48px — H1 desktop */
  --font-size-hero:  clamp(2.5rem, 6vw, 4.5rem); /* Fluid hero display */

  --line-height-base:    1.6;
  --line-height-heading: 1.15;
  --font-weight-normal:  400;
  --font-weight-semibold: 600;
  --font-weight-bold:    700;

  /* ── Spacing Scale ─────────────────────────────────────── */
  /* 4px base, Fibonacci-adjacent progression — D-08 and D-09 */
  --space-1:   0.25rem;   /*  4px */
  --space-2:   0.5rem;    /*  8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-20:  5rem;      /* 80px  — section spacing min (D-08) */
  --space-24:  6rem;      /* 96px */
  --space-30:  7.5rem;    /* 120px — section spacing max (D-08) */

  /* ── Layout ────────────────────────────────────────────── */
  --wrapper-max:       1200px;    /* Full-width container max */
  --content-max:        800px;    /* Narrow text content max (D-09) */
  --wrapper-padding:   var(--space-6); /* Horizontal page gutter */
  --header-height:     4.5rem;    /* 72px — used for scroll-padding-top */
  --section-spacing:   clamp(var(--space-20), 8vw, var(--space-30)); /* D-08 */

  /* ── Borders & Radius ──────────────────────────────────── */
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:   16px;
  --border-width:  1px;

  /* ── Shadows ───────────────────────────────────────────── */
  --shadow-sm:  0 1px 3px rgba(42, 31, 32, 0.08);
  --shadow-md:  0 4px 12px rgba(42, 31, 32, 0.12);
  --shadow-lg:  0 8px 32px rgba(42, 31, 32, 0.16);

  /* ── Transitions ───────────────────────────────────────── */
  --transition-fast:  150ms ease;
  --transition-base:  250ms ease;
  --transition-slow:  400ms ease;

  /* ── Z-index ───────────────────────────────────────────── */
  --z-header:   100;
  --z-overlay:  200;
  --z-modal:    300;
}
```

**NOTE ON HEX VALUES:** The hex values above for `--color-accent`, `--color-text`, etc. are derived from the locked D-01 through D-04 direction but are proposed by Claude (Claude's Discretion). They MUST be verified for WCAG 2.1 AA compliance before the CSS file is committed. See Pitfall 1 and Validation Architecture sections.

### Pattern 3: @font-face Self-Hosted Declaration

**What:** Declare all font faces in `main.css` with paths relative to the CSS file location. `font-display: swap` prevents invisible text during load.

**When to use:** Mandatory — D-07 locks this approach. No Google Fonts CDN link allowed.

```css
/* Source: web.dev/articles/font-best-practices */

/* Cormorant Garamond — Headings H1–H4 (D-06) */
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('../fonts/cormorant-garamond-v22-latin-300.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('../fonts/cormorant-garamond-v22-latin-300italic.woff2') format('woff2');
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('../fonts/cormorant-garamond-v22-latin-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('../fonts/cormorant-garamond-v22-latin-italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('../fonts/cormorant-garamond-v22-latin-600.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

/* Lato — Body, nav, buttons, captions (D-06) */
@font-face {
  font-family: 'Lato';
  src: url('../fonts/lato-v24-latin-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Lato';
  src: url('../fonts/lato-v24-latin-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**Path note:** `@font-face` `src` paths in CSS are resolved relative to the CSS file location. Since `main.css` lives at `assets/css/main.css`, the path `../fonts/` correctly resolves to `assets/fonts/`.

### Pattern 4: Mobile-First Breakpoints

**What:** Base styles target 320px mobile. Min-width media queries add layout shifts for larger viewports.

```css
/* Source: CLAUDE.md Responsive Breakpoints + MDN media queries */

/* Mobile: base styles — no media query (320px+) */

/* Tablet */
@media (min-width: 48rem) { /* 768px */ }

/* Desktop */
@media (min-width: 64rem) { /* 1024px */ }

/* Wide */
@media (min-width: 80rem) { /* 1280px */ }
```

**Rationale:** `rem`-based breakpoints scale with user font-size preferences. `clamp()` for fluid typography reduces the need for per-breakpoint type overrides.

### Pattern 5: Accessibility Tokens — Focus and Motion

**What:** Focus indicators via `:focus-visible`; transitions disabled via `prefers-reduced-motion`.

```css
/* Source: W3C WCAG 2.1 SC 2.4.7 + MDN prefers-reduced-motion */

/* Focus indicator — keyboard navigation visible, mouse hidden */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* Remove focus ring for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

/* Respect user motion preferences — disable all transitions */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Pattern 6: Hero Section CSS (skeleton only — no HTML yet)

**What:** The hero block CSS that Phase 4 HTML will target. Define the component style here so it exists when HTML is authored.

```css
/* D-11: Full-viewport hero with overlay */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: var(--color-overlay);
  z-index: 1;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: var(--wrapper-max);
  padding-inline: var(--wrapper-padding);
}
```

### Anti-Patterns to Avoid

- **`@import` inside main.css:** Blocks rendering; discovered late by the browser. All font-face and all rules go in one file, no imports.
- **Multiple `<link rel="stylesheet">` files:** Not a CSS authoring concern in Phase 1, but the CSS structure must anticipate this — single file only.
- **Hardcoded hex values in component rules:** Every color used in a component block must reference a token. `color: #7A2D3A` is wrong; `color: var(--color-accent)` is correct.
- **BEM double-underscore everywhere:** CUBE CSS uses BEM-style notation only for block-element relationships inside a component. Do not apply BEM to utilities or composition classes.
- **`font-display: block`:** Hides text during font load; penalizes FCP and CLS metrics.
- **Declaring `@font-face` without specifying `font-weight` and `font-style`:** The browser cannot match the correct file to a CSS font-weight request. Every @font-face block must have explicit `font-weight` and `font-style`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Color contrast verification | Manual calculation | webaim.org contrast checker | WCAG formula is complex; manual calculation errors cause accessibility failures |
| Font file subsetting | Custom Python script | gwfh.mranftl.com (selects Latin at download time) | Subsetting requires HarfBuzz or fonttools; over-engineering for this scope |
| Spacing scale calculation | Ad-hoc px values | Fixed token scale defined in `:root` once | Inconsistent spacing is the #1 cause of "generic template" appearance |
| Responsive typography | Per-breakpoint font-size overrides | `clamp(min, fluid, max)` | `clamp()` eliminates multiple breakpoint rules; native CSS, no JS |

**Key insight:** The value of CSS custom properties is that you hand-roll the token values ONCE on `:root` and then never hand-roll them again. Every component that uses `var(--color-accent)` gets a rebrand for free.

---

## Common Pitfalls

### Pitfall 1: Skipping WCAG Contrast Verification Before Committing Token Values

**What goes wrong:** Hex values are chosen by visual feel (the wine/cream palette "looks high contrast") without measurement. The combination fails 4.5:1 at normal text sizes. The site ships with accessibility failures across all 9 HTML files.

**Why it happens:** The burgundy/cream direction is visually convincing but exact hex values vary. `#7A2D3A` on `#FBF5F5` must be measured, not assumed. Changes at Phase 1 cost one line; changes at Phase 5 cost edits across 9 files.

**How to avoid:** Before committing `main.css`, paste every text-on-background pair into webaim.org/resources/contrastchecker:
- `--color-text` on `--color-surface` (must be >= 4.5:1 for body text)
- `--color-text` on `--color-surface-alt` (alternate section backgrounds)
- `--color-text-inverse` on `--color-surface-dark` (footer/dark sections)
- `--color-text-inverse` on `--color-accent` (button label on button fill)
- `--color-accent` on `--color-surface` (wine link text on cream — must pass 4.5:1)

**Warning signs:** Any pair below 4.5:1 for normal text, or below 3:1 for large text (18px+ or 14px+ bold).

### Pitfall 2: @font-face Path Resolution Confusion

**What goes wrong:** `url('./fonts/...')` works when the HTML file opens CSS directly but breaks when CSS is served from `assets/css/`. The `src` URL in @font-face is relative to the CSS file, not the HTML file.

**Why it happens:** Developers test by opening `index.html` locally and assume the path works in deployment. Static hosts serve `assets/css/main.css` — the relative path must be `../fonts/`, not `./fonts/` or `/fonts/` (absolute paths require knowing the server root).

**How to avoid:** Always use `../fonts/` (one directory up from `assets/css/`) in @font-face src URLs. Verify in browser DevTools Network tab that font files return 200, not 404.

**Warning signs:** DevTools Network tab shows 404 for `.woff2` files; browser falls back to Georgia/system-ui; Cormorant Garamond headings look wrong.

### Pitfall 3: Using `font-display: block` Instead of `swap`

**What goes wrong:** Text is invisible during font load (FOIT — Flash of Invisible Text). Penalizes First Contentful Paint (FCP) and Cumulative Layout Shift (CLS) metrics.

**Why it happens:** Developers confuse "block" with "wait for the font before showing anything" (which sounds correct) but the actual behavior is invisible text, not a pleasant hold.

**How to avoid:** Always `font-display: swap`. `swap` shows text immediately in the fallback font, then swaps when the web font arrives. The brief flash of Georgia/system-ui is acceptable and preferred over invisible text.

### Pitfall 4: Leaving Tokens as "Good Enough" Without Mobile Testing

**What goes wrong:** Typography and spacing tokens look correct at 1280px desktop and 768px tablet but produce horizontal overflow at 320px mobile. The `--font-size-h1: 3rem` token is 48px — on a 320px viewport this is nearly 15% of the screen width per character.

**Why it happens:** Development happens on a desktop monitor. The 320px mobile breakpoint is often forgotten until late. The success criterion explicitly requires no horizontal scroll at 320px.

**How to avoid:** After writing the token block and base styles, test a blank HTML file at exactly 320px viewport width before proceeding to any block styles. Use Chrome DevTools device emulation. The `--font-size-hero: clamp(2.5rem, 6vw, 4.5rem)` pattern eliminates this problem for fluid values; fixed values like `--font-size-h1` may need mobile overrides.

### Pitfall 5: Google Fonts CDN Link Remaining Anywhere

**What goes wrong:** A stray `<link href="https://fonts.googleapis.com/...">` in any HTML file defeats the entire GDPR-compliant font strategy. Even a commented-out link can be accidentally uncommented by an agency developer.

**Why it happens:** Phase 1 delivers CSS only — no HTML yet. But the @font-face pattern must be self-contained so later HTML phases are never tempted to add a Google Fonts CDN link.

**How to avoid:** Document in the CSS file header and HTML comment convention that Google Fonts CDN is prohibited. The HTML comment convention (FOUND-10) should include: `<!-- NEVER ADD: Google Fonts link tags — use self-hosted fonts in assets/fonts/ -->` as a permanent warning.

### Pitfall 6: Missing `font-weight` Descriptor Causing Wrong Font File Loading

**What goes wrong:** A heading styled with `font-weight: 600` renders in Cormorant Garamond 400 (regular) because the browser cannot find a matching @font-face declaration. The browser either fakes bold (algorithmic bold) or falls through to Georgia.

**Why it happens:** @font-face blocks are declared without the `font-weight` descriptor, making all declarations match any weight request.

**How to avoid:** Every @font-face block must explicitly declare `font-weight` and `font-style`. The 7 files listed in the Architecture Patterns section above cover the full weight/style matrix needed.

---

## Code Examples

### Complete `:root` Token Block (Verified Direction)

```css
/* Source: CONTEXT.md D-01 through D-12 + CUBE CSS pattern */
:root {
  /* Colors — verify each pair with webaim.org before finalizing */
  --color-accent:        #7A2D3A;
  --color-accent-hover:  #5E2230;
  --color-accent-light:  #9E4455;
  --color-surface:       #FBF5F5;
  --color-surface-alt:   #F5EDEE;
  --color-surface-dark:  #2C1A1D;
  --color-text:          #2A1F20;
  --color-text-muted:    #6B5557;
  --color-text-inverse:  #FBF5F5;
  --color-border:        #DFD0D2;
  --color-overlay:       rgba(28, 12, 14, 0.55);

  /* Typography */
  --font-heading:        'Cormorant Garamond', Georgia, serif;
  --font-body:           'Lato', system-ui, sans-serif;
  --font-size-sm:        0.875rem;
  --font-size-base:      1rem;
  --font-size-md:        1.125rem;
  --font-size-h3:        1.375rem;
  --font-size-h2:        2rem;
  --font-size-h1:        3rem;
  --font-size-hero:      clamp(2.5rem, 6vw, 4.5rem);
  --line-height-base:    1.6;
  --line-height-heading: 1.15;
  --font-weight-normal:  400;
  --font-weight-semibold: 600;
  --font-weight-bold:    700;

  /* Spacing */
  --space-1:   0.25rem;
  --space-2:   0.5rem;
  --space-3:   0.75rem;
  --space-4:   1rem;
  --space-6:   1.5rem;
  --space-8:   2rem;
  --space-12:  3rem;
  --space-16:  4rem;
  --space-20:  5rem;
  --space-24:  6rem;
  --space-30:  7.5rem;

  /* Layout */
  --wrapper-max:      1200px;
  --content-max:       800px;
  --wrapper-padding:  var(--space-6);
  --header-height:    4.5rem;
  --section-spacing:  clamp(var(--space-20), 8vw, var(--space-30));

  /* UI */
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:   16px;
  --border-width:  1px;
  --shadow-sm:   0 1px 3px rgba(42, 31, 32, 0.08);
  --shadow-md:   0 4px 12px rgba(42, 31, 32, 0.12);
  --shadow-lg:   0 8px 32px rgba(42, 31, 32, 0.16);

  /* Motion */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

  /* Z-index */
  --z-header:  100;
  --z-overlay: 200;
  --z-modal:   300;
}
```

### Composition Layer — Core Primitives

```css
/* Source: piccalil.li/blog/cube-css/ composition pattern */

/* Flow: vertical rhythm between direct children */
.flow > * + * {
  margin-block-start: var(--flow-space, 1em);
}

/* Wrapper: centered container with gutter */
.wrapper {
  width: 100%;
  max-width: var(--wrapper-max);
  margin-inline: auto;
  padding-inline: var(--wrapper-padding);
}

/* Content wrapper: narrow reading width */
.content-wrapper {
  width: 100%;
  max-width: var(--content-max);
  margin-inline: auto;
  padding-inline: var(--wrapper-padding);
}

/* Cluster: horizontal group with gap */
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--cluster-gap, var(--space-4));
  align-items: var(--cluster-align, center);
}

/* Section: standard vertical padding */
.section {
  padding-block: var(--section-spacing);
}

/* Section variant: alternate background */
.section[data-surface="alt"] {
  background-color: var(--color-surface-alt);
}

/* Section variant: dark */
.section[data-surface="dark"] {
  background-color: var(--color-surface-dark);
  color: var(--color-text-inverse);
}
```

### Button Block

```css
/* Source: D-03 — solid wine fill, white text */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-8);
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  text-decoration: none;
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast),
              border-color var(--transition-fast),
              color var(--transition-fast);
  min-height: 44px; /* WCAG touch target minimum */
  white-space: nowrap;
}

/* Primary CTA: wine fill, white text (D-03) */
.btn[data-variant="primary"] {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  border-color: var(--color-accent);
}

.btn[data-variant="primary"]:hover,
.btn[data-variant="primary"]:focus-visible {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

/* Secondary CTA: outlined */
.btn[data-variant="secondary"] {
  background-color: transparent;
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.btn[data-variant="secondary"]:hover,
.btn[data-variant="secondary"]:focus-visible {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
}
```

### HTML Comment Convention (FOUND-10)

```html
<!-- All editable content zones use these comment patterns: -->

<!-- EDITABLE: Restaurant phone number — update in all 3 language files -->
<a href="tel:+493411234567">+49 341 123 45 67</a>

<!-- EDITABLE: Opening hours — update in DE, EN, IT files and JSON-LD block -->
<p>Mo–Fr 11:30–22:30 Uhr</p>

<!-- SYNC: Update this value in de/, en/, and it/ index files -->
<address>Große Fleischergasse 00, 04109 Leipzig</address>

<!-- PLACEHOLDER: Replace with real content before launch -->
<p>Mustertextinhalt</p>

<!-- RESERVATION TOOL: Replace this div with embed code from chosen platform -->
<div class="reservation-placeholder">...</div>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Multiple CSS files with `@import` | Single CSS file with comment sections | Ongoing — no build step projects | Eliminates render-blocking chained imports |
| Google Fonts CDN `<link>` | Self-hosted woff2 via gwfh.mranftl.com | 2021+ (GDPR enforcement increase) | GDPR compliance + 200-300ms performance gain |
| Per-breakpoint font-size overrides | `clamp(min, fluid, max)` | 2020 (clamp() shipped) | Eliminates 3-4 media query rules per heading level |
| `:focus` for all focus styling | `:focus-visible` | 2022 (universal browser support) | Focus ring shows for keyboard only, not mouse clicks |
| `animation: none` inside `prefers-reduced-motion` | `transition-duration: 0.01ms` approach | 2021 (pattern matured) | Disables transitions without breaking CSS logic |
| Squoosh CLI for image processing | Squoosh.app (browser) or ImageMagick CLI | 2023 (Squoosh CLI deprecated) | Squoosh CLI is unmaintained — do not use |

**Deprecated/outdated:**
- Squoosh CLI: deprecated 2023, no longer maintained — use browser Squoosh.app or ImageMagick
- `font-display: block`: Still valid CSS but actively discouraged; causes FOIT (invisible text)
- `@import` in CSS for partials: Still works but blocks rendering — forbidden in this project by CLAUDE.md

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Proposed hex values (`#7A2D3A`, `#2A1F20`, `#FBF5F5`, etc.) achieve WCAG 4.5:1 contrast | Code Examples — token block | Color tokens must be revised before CSS commit; failure propagates to all 9 HTML files |
| A2 | gwfh.mranftl.com provides Cormorant Garamond weight 600 as a separate woff2 file for Latin subset | Architecture Patterns — @font-face | May need to use weight 700 or the full variable font instead; font paths in main.css would change |
| A3 | Cormorant Garamond italic is available at weights 300 and 400 for Latin subset | Architecture Patterns — font file list | Italic @font-face declarations would be removed; headings would use algorithmic italic |
| A4 | H2 section titles are best served with uppercase + letter-spacing treatment (Claude's recommendation) | Architecture Patterns — blocks | User may prefer title-case; affects the `.section-title` block style only, easy to change |

**NOTE:** A1 is the highest-risk assumption. The planner must include a task that explicitly verifies contrast ratios using webaim.org before any token values are finalized.

---

## Open Questions

1. **Dark footer variant**
   - What we know: Claude's Discretion allows a dark section variant; `--color-surface-dark` token is defined
   - What's unclear: Whether the footer uses the dark variant or stays cream like all other sections
   - Recommendation: Default to dark footer (common premium restaurant pattern; provides strong visual closure); can be changed by setting `data-surface="light"` on the footer element

2. **H2 section title treatment**
   - What we know: Claude's Discretion — uppercase + letter-spacing, title-case, or other
   - What's unclear: User preference not gathered
   - Recommendation: Use `text-transform: uppercase; letter-spacing: 0.12em; font-size: var(--font-size-h3)` as section eyebrow labels above the main H2, with the H2 itself in title-case Cormorant Garamond. This is a standard editorial pattern for premium restaurant sites.

3. **Section visual separation method**
   - What we know: Claude's Discretion — alternating tints, dividers, whitespace, or combination
   - What's unclear: User preference not gathered
   - Recommendation: Alternating between `--color-surface` and `--color-surface-alt` with `--section-spacing` vertical padding. No explicit divider lines needed — the alternating backgrounds provide visual rhythm without added DOM elements.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Optional validation tooling | Yes | v24.14.1 | — |
| Python | Optional scripting | Yes | 3.14.3 | — |
| npm / npx | Optional CSS linting install | Yes | 11.11.0 | — |
| Browser (Chrome/Edge) | Manual WCAG contrast verification, DevTools | Assumed yes | — | Firefox |
| gwfh.mranftl.com | Font file download | Web app — assumed available | — | Download directly from Google Fonts, self-host |
| stylelint | CSS linting | Not installed | — | Manual review + browser DevTools |
| Lighthouse CLI | Performance audit | Not installed | — | Chrome DevTools Lighthouse tab |

**Missing dependencies with no fallback:** None that block Phase 1.

**Missing dependencies with fallback:**
- `stylelint` not installed — CSS validation will be manual (browser DevTools computed styles panel + visual inspection)
- `lighthouse` not installed — Core Web Vitals testing deferred to Phase 4 when HTML exists; Chrome DevTools Lighthouse tab is the fallback

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — pure CSS phase; no automated test runner applicable |
| Config file | None required |
| Quick run command | Manual: open test HTML in browser, inspect at 320px + 1280px |
| Full suite command | Manual: WCAG contrast check + DevTools visual inspection |

**Rationale:** This is a CSS-only output phase. There is no JavaScript, no backend, no data layer. Automated testing frameworks (Jest, pytest, etc.) are not applicable to CSS design token validation. The validation strategy is manual visual inspection combined with tool-assisted color contrast verification.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-02 | CSS custom properties cover all design decisions | Manual | Open DevTools, inspect `:root` computed values, verify all token categories present | N/A |
| FOUND-07 | No request to Google Fonts CDN | Manual | DevTools Network tab — filter "fonts.googleapis.com"; must show 0 requests | N/A |
| FOUND-07 | woff2 files return 200 from assets/fonts/ | Manual | DevTools Network tab — filter by font type; all must show 200 | N/A |
| FOUND-09 | WCAG 2.1 AA 4.5:1 contrast for all text pairs | Tool-assisted | webaim.org/resources/contrastchecker — test each color pair listed in Pitfall 1 | N/A |
| FOUND-09 | Focus indicator visible on interactive elements | Manual | Tab through a test HTML page; verify focus ring visible at all interactive elements | N/A |
| FOUND-03 | No horizontal scroll at 320px | Manual | Chrome DevTools > Device emulation > 320px width; no horizontal scrollbar | N/A |
| FOUND-03 | Layout correct at 1280px | Manual | Browser window at 1280px; verify wrapper, content-max, section spacing | N/A |
| FOUND-10 | HTML comment convention documented in CSS header | Manual | Read first 100 lines of main.css; verify comment convention block is present | N/A |

### Sampling Rate

- **Per task commit:** Visual review in browser at 320px and 1280px
- **Per wave merge:** Full WCAG contrast check for all text/background pairs + font loading verification in Network tab
- **Phase gate:** All 8 manual checks above must pass before `/gsd-verify-work`

### Wave 0 Gaps

**This phase has no automated tests to scaffold.** The validation is entirely manual and tool-assisted. Wave 0 work includes:

- [ ] Create `test.html` — a minimal HTML file linking only `assets/css/main.css` with one element per block class, used for all visual validation throughout Phase 1

*(No test framework install needed — browser is the test runner)*

---

## Security Domain

The security enforcement section applies minimally to this phase. Phase 1 produces static CSS and font files with no user input, no authentication, no data processing, and no JavaScript.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | N/A — no auth in this phase |
| V3 Session Management | No | N/A — no sessions |
| V4 Access Control | No | N/A — static assets |
| V5 Input Validation | No | N/A — no user input in CSS |
| V6 Cryptography | No | N/A — no cryptography |

### Relevant Security Considerations (Non-ASVS)

| Concern | Applies | Control |
|---------|---------|---------|
| Third-party font CDN (GDPR) | YES — critical | Self-hosted woff2 only; no CDN link permitted (D-07) |
| CSS custom property injection | No | CSS variables are presentational; not executable |
| Font file integrity | LOW | Files sourced from gwfh.mranftl.com (Google Fonts mirror); verify file sizes are plausible |

---

## Project Constraints (from CLAUDE.md)

The following CLAUDE.md directives are actionable constraints for this phase. The planner MUST verify compliance with each.

| Directive | Constraint | Enforcement |
|-----------|------------|-------------|
| No frameworks | Plain CSS3 only — no Tailwind, no Bootstrap, no CSS-in-JS | No npm packages in this phase |
| No build step | No Sass, Less, PostCSS, or any preprocessor | CSS is plain text; no compilation |
| CUBE CSS methodology | Use Composition/Utility/Block/Exception layer structure | CSS file organized per 6-layer pattern |
| Single `main.css` | All styles in one file; no `@import` partials | One file only at `assets/css/main.css` |
| No `@import` in CSS | Blocks rendering | Verified: no @import except @font-face |
| Self-hosted woff2 only | No Google Fonts CDN link | @font-face with `../fonts/` relative paths |
| `font-display: swap` | Not `block` | Every @font-face declaration uses `swap` |
| `font-display: block` prohibited | Explicitly listed in "What NOT to Use" | Hard rule |
| Mobile-first responsive | Base styles for 320px; min-width media queries | Breakpoints: 48rem, 64rem, 80rem |
| CSS custom properties for all theming | Token-based design system | All visual values on `:root` |
| Agency-friendly HTML comments | FOUND-10 — comment convention documented | CSS file header must document convention |
| Premium design quality | Must not look like a student demo | Typography scale, spacing, and color must convey quality |
| WCAG 2.1 AA accessibility | Color contrast 4.5:1 text, 3:1 UI components | Verify all pairs at webaim.org |

---

## Sources

### Primary (HIGH confidence)
- [piccalil.li/blog/cube-css/](https://piccalil.li/blog/cube-css/) — CUBE CSS methodology: layer structure, composition primitives, utility and block definitions
- [web.dev/articles/font-best-practices](https://web.dev/articles/font-best-practices) — Google official font loading best practices: @font-face pattern, font-display: swap, preload, woff2-only recommendation
- [cube.fyi/](https://cube.fyi/) — CUBE CSS official documentation site
- [MDN Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*) — CSS custom properties specification and inheritance behavior
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) — Accessibility media query for motion reduction
- [W3C WCAG 2.1 SC 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) — Color contrast minimum requirement (4.5:1 normal text, 3:1 large text)
- [W3C WCAG 2.1 SC 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) — Focus Visible requirement
- CLAUDE.md (project file) — mandated CSS architecture, typography, font loading strategy, forbidden patterns
- `.planning/research/STACK.md` — verified stack research for this project (2026-04-06)
- `.planning/research/PITFALLS.md` — domain pitfall research (2026-04-06)

### Secondary (MEDIUM confidence)
- [gwfh.mranftl.com/fonts/cormorant-garamond](https://gwfh.mranftl.com/fonts/cormorant-garamond?subsets=latin) — Google Webfonts Helper: Cormorant Garamond woff2 download (site loaded; content not extractable by WebFetch)
- [fontsource.org/fonts/cormorant-garamond](https://fontsource.org/fonts/cormorant-garamond) — Confirmed Cormorant Garamond weights 300, 400, 500, 600, 700 with italic styles in woff2
- [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) — Standard WCAG contrast verification tool
- [browserux.com — prefers-reduced-motion pattern](https://browserux.com/blog/articles/css-prefers-reduced-motion-accessibility.html) — Transition-duration: 0.01ms approach

### Tertiary (LOW confidence)
- [smashingmagazine.com naming best practices](https://www.smashingmagazine.com/2024/05/naming-best-practices/) — Token naming conventions: primitive vs semantic separation (2024)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — mandated by CLAUDE.md; verified against piccalil.li and web.dev
- Architecture patterns: HIGH — CUBE CSS layers verified at piccalil.li; @font-face pattern verified at web.dev
- Token values: MEDIUM — hex values are Claude proposals derived from locked D-01/D-04 direction; WCAG compliance unverified until measured
- Font weights available: MEDIUM — confirmed via fontsource.org that 300/400/600/700 + italic exist; gwfh.mranftl.com specific filenames are ASSUMED
- Pitfalls: HIGH — drawn from verified domain research in `.planning/research/PITFALLS.md`

**Research date:** 2026-04-06
**Valid until:** 2026-07-06 (stable domain — CSS spec, WCAG 2.1, and CUBE CSS change slowly)
