# Architecture Research

**Domain:** Multilingual static restaurant website (no framework, no build step)
**Researched:** 2026-04-06
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER / CLIENT                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   / (root)          /de/          /en/          /it/            │
│   index.html   ─►  index.html    index.html    index.html       │
│   (redirect)        (DE page)    (EN page)     (IT page)        │
│                                                                  │
│                  impressum.html  legal.html   legale.html       │
│                  datenschutz.html privacy.html privacy-it.html  │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                        SHARED ASSETS LAYER                       │
├──────────────────┬──────────────────┬───────────────────────────┤
│   assets/css/    │   assets/js/     │   assets/img/             │
│                  │                  │                            │
│  main.css        │  main.js         │  hero/                    │
│  (single file    │  (single entry   │  gallery/                 │
│   with :root     │   with IIFE      │  menu/                    │
│   variables)     │   modules)       │  og/                      │
├──────────────────┴──────────────────┴───────────────────────────┤
│                       STATIC DELIVERY LAYER                      │
│          Any static host (Netlify / GitHub Pages / SFTP)         │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `/index.html` (root) | Browser language detection, redirect to /de/ (default) or /en/ /it/ | Reads `navigator.languages`, writes `window.location` |
| `/de/index.html` | Full DE onepage: all 12 sections, DE meta, DE JSON-LD, hreflang | Links to `/de/` legal pages; references shared `assets/` |
| `/en/index.html` | Full EN onepage: all 12 sections, EN meta, EN JSON-LD, hreflang | Links to `/en/` legal pages; references shared `assets/` |
| `/it/index.html` | Full IT onepage: all 12 sections, IT meta, IT JSON-LD, hreflang | Links to `/it/` legal pages; references shared `assets/` |
| `/de/impressum.html` | DE legal: Impressum placeholder | References shared `assets/` |
| `/de/datenschutz.html` | DE legal: Datenschutz placeholder | References shared `assets/` |
| `/en/legal.html` | EN legal: Imprint placeholder | References shared `assets/` |
| `/en/privacy.html` | EN legal: Privacy placeholder | References shared `assets/` |
| `/it/legale.html` | IT legal: Informazioni legali placeholder | References shared `assets/` |
| `/it/privacy.html` | IT legal: Privacy placeholder | References shared `assets/` |
| `assets/css/main.css` | All visual styling: design tokens, layout, components, responsive | Referenced by all HTML pages via relative path |
| `assets/js/main.js` | Sticky header, mobile menu, smooth scroll, lazy init | Referenced by all HTML pages via relative path |
| `assets/img/` | All images, organized by section | Referenced in HTML with relative paths |
| `sitemap.xml` | All page URLs with hreflang alternates for search engines | Consumed by Googlebot / search crawlers |
| `robots.txt` | Crawl directives | Consumed by Googlebot / search crawlers |

## Recommended Project Structure

```
/ (site root)
├── index.html                    # Root redirect — language detection only
├── sitemap.xml                   # All URLs, all languages
├── robots.txt                    # Allow all, point to sitemap
│
├── de/
│   ├── index.html                # German onepage (primary language)
│   ├── impressum.html            # Impressum (DE legal requirement)
│   └── datenschutz.html          # Datenschutzerklärung
│
├── en/
│   ├── index.html                # English onepage
│   ├── legal.html                # Imprint
│   └── privacy.html              # Privacy Policy
│
├── it/
│   ├── index.html                # Italian onepage
│   ├── legale.html               # Informazioni legali
│   └── privacy.html              # Privacy (IT)
│
└── assets/
    ├── css/
    │   └── main.css              # Single CSS file — full design system
    ├── js/
    │   └── main.js               # Single JS file — all behavior
    ├── img/
    │   ├── hero/
    │   │   ├── hero-desktop.webp
    │   │   └── hero-mobile.webp
    │   ├── gallery/
    │   │   ├── interior-1.webp
    │   │   ├── interior-2.webp
    │   │   ├── food-pasta.webp
    │   │   ├── food-pizza.webp
    │   │   ├── terrace-1.webp
    │   │   └── exterior-1.webp
    │   ├── menu/
    │   │   └── menu-preview.webp  # Static menu card image
    │   └── og/
    │       └── og-image.jpg       # Open Graph / social share image (1200x630)
    └── pdf/
        ├── speisekarte.pdf        # Full menu PDF (DE)
        ├── menu-en.pdf            # Full menu PDF (EN)
        ├── menu-it.pdf            # Full menu PDF (IT)
        ├── mittagstisch.pdf       # Business lunch PDF (DE)
        └── lunch-en.pdf           # Business lunch PDF (EN)
```

### Structure Rationale

- **`/index.html` at root:** Pure redirect only — no content, no styling. Contains only a `<script>` that reads `navigator.languages`, maps to DE/EN/IT, and sets `window.location`. Falls back to `/de/` if language is unrecognized. This file is never indexed (noindex meta + robots).
- **`/de/`, `/en/`, `/it/` subdirectories:** Each language gets its own URL namespace. Every page is independently crawlable and indexable. Hreflang tags cross-reference all three. German is the primary language with the most SEO-optimized copy.
- **`assets/` at root, shared across all languages:** CSS, JS, and images are referenced by all language pages via relative paths (`../assets/css/main.css` from inside a language folder). No duplication of static assets.
- **Single `main.css`:** No build step, no CSS @import waterfall, no module fragmentation. All styles in one file ordered by: design tokens → reset → typography → layout → components → sections → utilities → media queries. Authoring is straightforward; the file stays manageable at restaurant-site scale (~600-900 lines).
- **Single `main.js`:** All behavior in one file using IIFE-wrapped modules or revealing module pattern. No ES module import/export required. Script tag is `defer` at end of `<head>` or before `</body>`.
- **`assets/img/` organized by section:** Keeps images findable during content updates. All images should be served as WebP with appropriate fallbacks. OG image isolated in `/og/` because it has unique size requirements.
- **`assets/pdf/`:** PDFs (menu, lunch) are language-specific because the content itself changes. Stored alongside images for a single coherent assets directory.

## Architectural Patterns

### Pattern 1: Separate HTML Files Per Language (Not JS-Based Switching)

**What:** Each language version is a fully self-contained HTML file. The language switch in the footer/header is a plain `<a href="/en/index.html">` link — not a JavaScript toggle.

**When to use:** Always, for this project. This is the only SEO-correct approach for a static site.

**Trade-offs:** Three times the HTML to maintain, but each page is independently indexable, properly canonicalized, and served without JavaScript. Googlebot does not need to execute JS to discover content. Each page can have its own meta title, description, OG tags, and JSON-LD in the correct language.

**Example (hreflang block in every `<head>`):**
```html
<link rel="canonical" href="https://ristorante-paganini.de/de/" />
<link rel="alternate" hreflang="de" href="https://ristorante-paganini.de/de/" />
<link rel="alternate" hreflang="en" href="https://ristorante-paganini.de/en/" />
<link rel="alternate" hreflang="it" href="https://ristorante-paganini.de/it/" />
<link rel="alternate" hreflang="x-default" href="https://ristorante-paganini.de/de/" />
```

Every page must include self-referencing hreflang AND all three language alternates. Missing return tags invalidate the entire hreflang cluster.

### Pattern 2: CSS Design Token System at `:root`

**What:** All colors, typography scale, spacing units, and transition values are defined as CSS custom properties at `:root`. Components reference tokens, never raw values.

**When to use:** From day one. Establishes a consistent visual language and makes global restyling (e.g., adjusting brand color) a single-line change.

**Trade-offs:** None for this project scale. CSS custom properties are supported in all modern browsers. No build step required.

**Example (top of `main.css`):**
```css
:root {
  /* Brand Colors */
  --color-primary: #8B1A1A;       /* Deep Italian red — CTAs, accents */
  --color-secondary: #F5F0E8;     /* Warm cream — backgrounds */
  --color-text: #1A1A1A;          /* Near-black body text */
  --color-text-muted: #6B6B6B;    /* Secondary text */
  --color-surface: #FFFFFF;       /* Card/section backgrounds */
  --color-border: #E8E0D0;        /* Subtle dividers */

  /* Typography */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Lato', system-ui, sans-serif;
  --text-base: 1rem;              /* 16px */
  --text-sm: 0.875rem;
  --text-lg: 1.125rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 3rem;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 8rem;

  /* Layout */
  --container-max: 1200px;
  --section-padding: var(--space-xl) var(--space-md);
}
```

### Pattern 3: IIFE Revealing Module Pattern for JavaScript

**What:** Each behavioral concern (sticky header, mobile menu, smooth scroll, gallery lightbox) is written as a self-contained IIFE or named revealing module inside a single `main.js`. No global variable pollution.

**When to use:** For a no-build static site with a small amount of behavior. Avoids the complexity of ES module `type="module"` without sacrificing encapsulation.

**Trade-offs:** Slightly more verbose than ES modules but requires zero tooling. Script load order is explicit (one file, top to bottom). Works in all browsers without polyfills.

**Example:**
```javascript
// main.js
(function() {
  'use strict';

  // --- Sticky Header ---
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function() {
    header.classList.toggle('is-sticky', window.scrollY > 80);
  }, { passive: true });

  // --- Mobile Menu Toggle ---
  var menuToggle = document.querySelector('.menu-toggle');
  var navMenu = document.querySelector('.nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      var isOpen = navMenu.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
```

### Pattern 4: Root Redirect With Language Detection

**What:** `/index.html` contains only a minimal redirect script. It reads `navigator.languages`, normalizes to ISO 639-1 codes, maps to supported languages (de/en/it), defaults to DE, and sets `window.location.replace()` to avoid a back-button loop.

**When to use:** Only for the root redirect file. Never perform language-based redirects on any other page.

**Trade-offs:** JavaScript-dependent redirect means search engines see the redirect script, not a content page. This is acceptable because this file has `<meta name="robots" content="noindex">` and all real content is in language subdirectories.

**Example:**
```html
<!-- /index.html — no content, no styling, redirect only -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex, nofollow">
  <title>Ristorante Paganini</title>
  <noscript>
    <meta http-equiv="refresh" content="0; url=/de/">
  </noscript>
</head>
<body>
<script>
(function() {
  var supported = ['de', 'en', 'it'];
  var langs = navigator.languages || [navigator.language || 'de'];
  var lang = 'de'; // default
  for (var i = 0; i < langs.length; i++) {
    var code = langs[i].toLowerCase().split('-')[0];
    if (supported.indexOf(code) !== -1) { lang = code; break; }
  }
  window.location.replace('/' + lang + '/');
})();
</script>
</body>
</html>
```

### Pattern 5: HTML Comment Markers for Editable Content

**What:** All live data placeholders (phone, address, opening hours, reservation URL, map embed URL, PDF links) are wrapped in clearly labeled HTML comments so an agency or developer can locate and update them without reading the entire file.

**When to use:** Throughout all HTML files. This is a maintenance architecture decision, not a visual one.

**Trade-offs:** Adds comment verbosity to HTML. The tradeoff is explicitly required by the project (agency-friendly editability).

**Example:**
```html
<!-- EDITABLE: Phone number — update in header, contact section, and footer -->
<a href="tel:+493412345678">+49 341 234567</a>

<!-- EDITABLE: Reservation embed URL — replace src with actual booking system -->
<iframe src="PLACEHOLDER_RESERVATION_EMBED_URL" ...></iframe>

<!-- EDITABLE: Business lunch PDF — update monthly -->
<a href="../assets/pdf/mittagstisch.pdf" download>Mittagskarte downloaden</a>
```

## Data Flow

### Page Load Flow

```
Browser requests /
    ↓
/index.html (root redirect)
    ↓ reads navigator.languages
    ↓ window.location.replace('/de/')
    ↓
/de/index.html loads
    ↓ <link rel="stylesheet" href="../assets/css/main.css">
    ↓ <script defer src="../assets/js/main.js">
    ↓ <img loading="lazy" src="../assets/img/hero/...">
    ↓
Browser renders page
    ↓ JS initializes: sticky header, mobile menu, smooth scroll
    ↓ Lazy images load as user scrolls
```

### Language Switch Flow

```
User on /de/index.html
    ↓ clicks "EN" in footer language switcher
    ↓ <a href="/en/index.html"> (plain link, no JS)
    ↓
Browser requests /en/index.html
    ↓ Separate fully-translated HTML file
    ↓ Same shared assets/ (CSS, JS, images)
    ↓
Browser renders EN page
```

### Content Update Flow (No CMS)

```
Developer opens /de/index.html in editor
    ↓ Finds <!-- EDITABLE: ... --> comment block
    ↓ Updates content
    ↓ Opens /en/index.html and /it/index.html
    ↓ Makes equivalent update in both
    ↓ Uploads changed HTML files to static host
    ↓
Done — no build step, no deploy pipeline
```

### SEO Data Flow

```
Googlebot crawls sitemap.xml
    ↓ Discovers /de/, /en/, /it/ URLs
    ↓ Crawls each independently
    ↓ Reads <link rel="alternate" hreflang="..."> in <head>
    ↓ Reads <script type="application/ld+json"> JSON-LD in <head>
    ↓ Reads <meta name="description">, OG tags, canonical
    ↓
Google indexes each language page separately
    ↓ Serves DE page for German searches
    ↓ Serves EN page for English searches
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (static site) | Single CSS file, single JS file, inline content — no changes needed |
| Adding 4th language | Duplicate one language folder, translate HTML, add hreflang entry everywhere, add to sitemap |
| Adding new sections | Add HTML section to all 3 language files, add CSS rules to main.css, update sitemap if new page |
| Moving to CMS eventually | HTML structure is clean semantic markup; can be templated into any static site generator without visual changes |

### Scaling Priorities

1. **First bottleneck — content parity:** When content changes (menu, hours, events), all three language files must be updated. A simple checklist or diff-based workflow is sufficient at this scale.
2. **Second bottleneck — image weight:** As gallery grows, WebP format and lazy loading mitigate this. No structural change needed.

## Anti-Patterns

### Anti-Pattern 1: JavaScript-Based Language Switching

**What people do:** Build one HTML file and use JavaScript to swap text based on a language variable or URL parameter (e.g., `?lang=en`).

**Why it's wrong:** Search engines cannot reliably index JS-swapped content as separate pages. Each language version does not get its own URL, canonical tag, or hreflang entry. Mobile users without JS get no content. This approach loses all multilingual SEO value.

**Do this instead:** Separate HTML file per language, each with its own URL in its own subdirectory.

### Anti-Pattern 2: Duplicating Assets Per Language

**What people do:** Copy `main.css`, `main.js`, and all images into each language folder (`/de/assets/`, `/en/assets/`, `/it/assets/`).

**Why it's wrong:** Three-way asset duplication means style changes must be made in three places. Drift is inevitable. Cache invalidation becomes complex. Total file size on the server triples for no reason.

**Do this instead:** One `assets/` directory at the root, referenced by all language pages via relative paths (`../assets/`).

### Anti-Pattern 3: Single CSS File Per Section (Without Build Step)

**What people do:** Split CSS into many small component files (`header.css`, `hero.css`, `menu.css`, `footer.css`) and load each with a separate `<link>` tag.

**Why it's wrong:** Multiple CSS `<link>` tags are render-blocking and create additional HTTP requests. Without a bundler to concatenate them, this measurably harms Core Web Vitals (LCP, FCP). Testing shows 300–400ms extra delay per additional CSS file on slow connections.

**Do this instead:** One `main.css` file, well-organized internally with comment-based section headers. At restaurant-site scale this stays manageable without tooling.

### Anti-Pattern 4: Canonical Tags Pointing Across Languages

**What people do:** Set `<link rel="canonical">` on the EN and IT pages pointing back to the DE page, treating DE as the "master."

**Why it's wrong:** This tells Google the EN and IT pages are duplicates of DE and should not be indexed separately. It directly contradicts the purpose of hreflang and eliminates multilingual SEO value.

**Do this instead:** Every language page canonicalizes to itself. `/en/index.html` canonical points to `https://domain.de/en/`. The hreflang cluster on each page handles the cross-language relationship.

### Anti-Pattern 5: Inline Styles for Brand Values

**What people do:** Write `style="color: #8B1A1A; font-family: 'Playfair Display', serif"` directly on elements to match the design.

**Why it's wrong:** Brand color or font changes require a find-and-replace across all HTML files in all three language versions. Inline styles also defeat CSS cascade and specificity architecture.

**Do this instead:** All brand values live in CSS custom properties at `:root` in `main.css`. HTML uses semantic classes only.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Reservation system (e.g., OpenTable, TheFork, custom) | `<iframe>` embed in reservation section with placeholder `src` | Must be swappable without HTML restructure; fallback CTA required if embed fails |
| Google Maps | `<iframe>` embed in location section with placeholder `src` | Static embed URL, no Maps JS API required |
| Instagram | Profile URL link only — no embed widget | Embed widgets require JS and have aggressive rate limits; link is sufficient |
| Google Fonts | `<link rel="preconnect" href="https://fonts.googleapis.com">` + stylesheet `<link>` in `<head>` | Preconnect reduces FTTFB; consider self-hosting fonts for maximum performance |
| Google Analytics / Tag Manager | Optional `<script>` snippet in `<head>` — add after content is live | Do not add during development; confirm GDPR consent flow before enabling |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Language pages → Shared CSS | HTML `<link rel="stylesheet" href="../assets/css/main.css">` | Relative path requires the language folder depth to be exactly one level deep (never nest deeper) |
| Language pages → Shared JS | HTML `<script defer src="../assets/js/main.js">` | `defer` ensures JS runs after DOM is parsed; never use `async` for behavior-dependent scripts |
| Language pages → Images | HTML `<img src="../assets/img/...">` with `loading="lazy"` | Hero image should NOT be lazy loaded — it's above the fold and needed for LCP |
| Language pages → PDFs | HTML `<a href="../assets/pdf/...">` | PDFs are language-specific; naming convention must be clear |
| Root redirect → Language pages | `window.location.replace('/de/')` | `replace()` not `href` — prevents back-button loop to redirect page |
| Sitemap → All pages | Static XML listing all language URLs | Must be updated when pages are added; no automation at this scale |

## Build Order (Phase Dependencies)

The site has no build step, so "build order" means authoring order — what must exist before what.

```
1. assets/css/main.css          — Design tokens and base styles
        ↓ required by
2. One language page (de/)      — Develop full visual design against DE
        ↓ proven correct, then
3. EN and IT pages              — Duplicate DE, translate all content
        ↓ all 3 pages exist, then
4. Legal pages (all languages)  — Simpler pages, reference same CSS
        ↓ all content pages done, then
5. root/index.html (redirect)   — Only meaningful once /de/ exists
        ↓ site structure finalized, then
6. sitemap.xml + robots.txt     — List all final URLs
```

**Key dependency:** CSS design tokens must be finalized before translating to EN/IT pages, otherwise a color or spacing change forces triple-edits. Establish the visual system in DE first.

## Sources

- [Building a Multilingual Static Website - ByteGoblin](https://bytegoblin.io/blog/building-a-multilingual-static-website-a-step-by-step-guide) — folder structure patterns
- [Modular CSS and different ways to structure your stylesheets - Go Make Things](https://gomakethings.com/modular-css-and-different-ways-to-structure-your-stylesheets/) — CSS architecture for no-build sites
- [Localized Versions of your Pages - Google Search Central](https://developers.google.com/search/docs/specialty/international/localized-versions) — authoritative hreflang guidance
- [Hreflang for Multilingual SEO - Anchor Team](https://www.anchor.team/blog/hreflang-for-multilingual-seo-implementation-guide) — implementation details
- [Hreflang Tags: Ultimate 2026 Guide - ClickRank](https://www.clickrank.ai/hreflang-tags-complete-guide/) — reciprocal linking rules
- [CSS Custom Properties - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties) — design token system
- [Restaurant Schema Markup - restaurant-website-builder.com](https://www.restaurant-website-builder.com/implement-restaurant-schema-markup) — JSON-LD structured data for restaurants
- [Schema Markup Guide 2025 - SEO Design Lab](https://seodesignlab.com/schema-markup-with-json-ld-guide-2025/) — JSON-LD placement and format
- [The vanilla JS revealing module pattern - Go Make Things](https://gomakethings.com/the-vanilla-js-revealing-module-pattern/) — JS organization without build tools
- [Browser Language Detection - javaspring.net](https://www.javaspring.net/blog/how-to-get-the-browser-language-using-javascript/) — navigator.languages pattern

---
*Architecture research for: Multilingual static restaurant website — Ristorante Paganini*
*Researched: 2026-04-06*
