# Technology Stack

**Project:** Ristorante Paganini — Premium Multilingual Static Restaurant Website
**Domain:** Static HTML/CSS/vanilla JS restaurant site
**Researched:** 2026-04-06
**Confidence:** HIGH (verified against web.dev, schema.org, Google Search Central, MDN, Evil Martians)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| HTML5 | Living Standard | Document structure | Semantic sectioning elements (main, article, section, nav, header, footer) are non-negotiable for accessibility and SEO. Single H1 per page, proper landmark roles. |
| CSS3 + Custom Properties | Living Standard | All styling, theming, responsive layout | Custom properties (CSS variables) enable a token-based design system without a preprocessor. Native cascade + specificity managed via CUBE CSS methodology. |
| Vanilla JavaScript (ES2020+) | No transpile needed | Sticky header, mobile menu, smooth scroll, IntersectionObserver lazy loading, language redirect | Every target browser (2020+) supports the required APIs natively. No build step, no bundler, no transpiler. |
| JSON-LD | Schema.org v25 | Structured data (Restaurant, LocalBusiness, PostalAddress, OpeningHoursSpecification) | Google's preferred structured data format. Placed in `<script type="application/ld+json">` in `<head>`. Isolated from HTML markup, easy to update. |

### CSS Architecture: CUBE CSS Methodology

**Use CUBE CSS** (Composition, Utility, Block, Exception) — not pure BEM, not Tailwind, not SMACSS.

**Why CUBE CSS for this project:**
- Embraces the cascade rather than fighting it — perfect for a no-framework, no-build site
- Uses CSS custom properties (design tokens) as the primary theming mechanism
- Proven on static sites, blogs, and marketing sites of exactly this complexity
- Blocks (components) are named clearly; exceptions use `data-` attributes, giving JS clean hooks
- Author: Andy Bell (piccalil.li) — actively maintained philosophy as of 2025

**Layer structure (one `styles.css` file, partitioned by comments):**
1. **Design tokens** — all `--variables` defined on `:root`
2. **Global/reset** — `box-sizing`, margin resets, base typography on `body`
3. **Composition** — layout skeletons (`.flow`, `.cluster`, `.stack`, `.grid`, `.wrapper`)
4. **Utilities** — single-purpose classes (`.text-center`, `.visually-hidden`, `.sr-only`)
5. **Blocks** — component styles (`.header`, `.hero`, `.menu-section`, `.gallery`, etc.)
6. **Exceptions** — `[data-state]` overrides

**What NOT to use:**
- Do not use BEM double-underscore/double-hyphen naming exclusively — it produces verbose class names and fights the cascade
- Do not use utility-only CSS (Tailwind mindset without Tailwind) — HTML becomes unreadable and non-editable by agency staff
- Do not use `@import` for CSS partials — single `styles.css` file avoids extra HTTP requests on a static host without HTTP/2 guarantee

### CSS Custom Properties (Design Tokens)

Define all tokens on `:root`. Semantic layer over raw values. Minimum token set:

```css
:root {
  /* ── Brand Colors ───────────────────────────── */
  --color-primary:       #1a1a18;   /* near-black — body text, dominant dark */
  --color-accent:        #8b6914;   /* warm gold — CTAs, headings accent */
  --color-accent-light:  #c9a84c;   /* lighter gold — hover states */
  --color-surface:       #faf8f4;   /* warm white — page background */
  --color-surface-alt:   #f0ebe0;   /* warm cream — alternate section backgrounds */
  --color-text:          #2c2c2a;   /* primary body text */
  --color-text-muted:    #6b6860;   /* secondary text, captions */
  --color-border:        #e0d9cc;   /* subtle dividers */

  /* ── Typography ─────────────────────────────── */
  --font-heading:        'Cormorant Garamond', Georgia, serif;
  --font-body:           'Lato', system-ui, sans-serif;
  --font-size-base:      1rem;       /* 16px */
  --font-size-sm:        0.875rem;
  --font-size-lg:        1.125rem;
  --font-size-xl:        1.5rem;
  --font-size-2xl:       2rem;
  --font-size-3xl:       clamp(2.5rem, 5vw, 4rem);   /* fluid heading */
  --font-size-hero:      clamp(3rem, 7vw, 6rem);      /* hero display */
  --line-height-base:    1.6;
  --line-height-heading: 1.1;
  --font-weight-normal:  400;
  --font-weight-medium:  500;
  --font-weight-bold:    700;

  /* ── Spacing ────────────────────────────────── */
  --space-1:   0.25rem;   /*  4px */
  --space-2:   0.5rem;    /*  8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-6:   1.5rem;    /* 24px */
  --space-8:   2rem;      /* 32px */
  --space-12:  3rem;      /* 48px */
  --space-16:  4rem;      /* 64px */
  --space-24:  6rem;      /* 96px */
  --space-32:  8rem;      /* 128px */

  /* ── Layout ─────────────────────────────────── */
  --wrapper-max:         1200px;
  --wrapper-padding:     var(--space-6);
  --header-height:       4.5rem;   /* 72px — used for scroll-padding-top offset */

  /* ── Borders & Radius ───────────────────────── */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --border-width: 1px;

  /* ── Transitions ────────────────────────────── */
  --transition-fast:    150ms ease;
  --transition-base:    250ms ease;
  --transition-slow:    400ms ease;

  /* ── Z-index ────────────────────────────────── */
  --z-header:   100;
  --z-overlay:  200;
  --z-modal:    300;
}
```

**Rationale:** Semantic token naming (`--color-accent` not `--gold`) means tokens remain valid after a rebrand. The `clamp()` values for headings eliminate breakpoint-specific font-size rules.

### Typography

**Heading font: Cormorant Garamond**
- High-contrast oldstyle serif — conveys Italian elegance, warmth, and refinement
- Available as variable font (woff2) — single file covers all weights/styles
- Available on Google Fonts and via google-webfonts-helper for self-hosting
- Use for: H1–H4, navigation brand name, section labels, quote callouts

**Body font: Lato**
- Humanist sans-serif — warm, readable, approachable at small sizes
- Excellent multilingual Latin coverage (German, English, Italian)
- Lightweight: Regular (400) + Bold (700) subset = ~25KB total
- Use for: body copy, navigation links, buttons, captions, meta info

**Font pairing rationale:** Cormorant Garamond + Lato is a recognized premium pairing. The display serif conveys heritage; the humanist sans reads cleanly in body text. Avoids the cliché of an all-serif layout while maintaining elegance.

**Do not use:** Playfair Display (too common, slightly dated in 2025 for this category), Montserrat (overused in restaurant templates), any Google Fonts loaded via the CDN `<link>` tag without preconnect.

### Font Loading Strategy

**Recommendation: Self-host fonts as woff2 files using google-webfonts-helper.**

**Why self-host:**
- Eliminates third-party DNS lookup and connection to `fonts.googleapis.com` + `fonts.gstatic.com`
- No GDPR/DSGVO risk from Google Fonts CDN loading (relevant for German audience)
- Full control over file serving, caching headers, and subsetting
- Performance: 200–300ms faster first paint on cold cache (verified in multiple 2025 studies)

**How to obtain files:**
- Tool: https://gwfh.mranftl.com (google-webfonts-helper) — select Latin subset, download woff2 only
- Cormorant Garamond: variable font (woff2-variations) if available, else Regular + Light + SemiBold weights
- Lato: Regular (400) + Bold (700), Latin subset only

**Implementation pattern:**

```html
<!-- In <head>, before external CSS, after meta tags -->
<style>
  /* Inline @font-face declarations eliminate render-blocking discovery delay */
  @font-face {
    font-family: 'Cormorant Garamond';
    src: url('/fonts/cormorant-garamond-v22-latin-regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Cormorant Garamond';
    src: url('/fonts/cormorant-garamond-v22-latin-600.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Lato';
    src: url('/fonts/lato-v24-latin-regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Lato';
    src: url('/fonts/lato-v24-latin-700.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
</style>

<!-- Preload only the two fonts used above the fold (heading + body regular) -->
<link rel="preload" href="/fonts/cormorant-garamond-v22-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/lato-v24-latin-regular.woff2" as="font" type="font/woff2" crossorigin>
```

**`font-display: swap`** is correct here: the restaurant brand requires web fonts to display, not a fallback-forever approach. Swap shows text immediately in system font, then swaps when the web font loads. Pair with `size-adjust` on the `@font-face` fallback to reduce layout shift (optional, low priority).

**Do not use `font-display: block`** — hides text during load, penalizes FCP and CLS metrics.
**Do not use the Google Fonts CDN URL** — DSGVO violation risk for German visitors.

### Images

**Formats:** AVIF (primary) → WebP (fallback) → JPEG/PNG (legacy fallback)

**Why this stack:**
- AVIF: 50% smaller than JPEG at equivalent quality (2025 browser support: Chrome 85+, Firefox 93+, Safari 16+, Edge 121+)
- WebP: 25–35% smaller than JPEG, covers all browsers that don't support AVIF
- JPEG/PNG fallback: ensures IE11 and very old Safari don't break (very low traffic for a Leipzig restaurant, but correct practice)

**HTML pattern — always use `<picture>` for content images:**

```html
<picture>
  <source srcset="/images/hero-interior.avif" type="image/avif">
  <source srcset="/images/hero-interior.webp" type="image/webp">
  <img
    src="/images/hero-interior.jpg"
    alt="Elegant interior of Ristorante Paganini with candlelit tables"
    width="1400"
    height="800"
    loading="eager"
    fetchpriority="high"
  >
</picture>
```

**Lazy loading pattern — below-the-fold images:**

```html
<picture>
  <source srcset="/images/gallery-pasta.avif" type="image/avif">
  <source srcset="/images/gallery-pasta.webp" type="image/webp">
  <img
    src="/images/gallery-pasta.jpg"
    alt="Handmade tagliatelle with truffle cream sauce"
    width="800"
    height="600"
    loading="lazy"
    decoding="async"
  >
</picture>
```

**Critical rules:**
- Always set explicit `width` and `height` attributes — prevents CLS (layout shift)
- Hero image: `loading="eager"` + `fetchpriority="high"` — it is the LCP element
- Gallery and below-fold: `loading="lazy"` + `decoding="async"`
- Never use CSS `background-image` for content images — use `<img>` for LCP-eligible images

**Image preparation tool:** Use **Squoosh.app** (browser-based, free, no CLI needed) for manual batch preparation. For each source image: export AVIF at quality 60–70, WebP at quality 75–80, JPEG at quality 80–85. Alternatively, **ImageMagick** via command line for batch conversion: `magick convert input.jpg -quality 70 output.avif`. The Squoosh CLI is deprecated (2023) and should not be used.

**Recommended image sizes:**
- Hero: 1400×800 (desktop), 768×500 (mobile via `srcset` + `sizes`)
- Gallery grid: 800×600
- Section backgrounds: 1200×600
- Logo: SVG (vector, no raster needed)

### Structured Data (JSON-LD)

**Use `@type: "Restaurant"`** — the most specific applicable subtype of LocalBusiness. Google's documentation explicitly recommends using the most specific type.

**Place the JSON-LD `<script>` block in `<head>`** — Google supports both `<head>` and `<body>`, but `<head>` placement is the conventional and recommended location.

**Include one JSON-LD block per language page** with localized content (name, description, servesCuisine in the page language).

**Minimum viable schema for this project:**

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Ristorante Paganini",
  "description": "Authentisches italienisches Restaurant in Leipzig. Handgemachte Pasta, Steinofenpizza, Antipasti und Wein.",
  "url": "https://www.ristorante-paganini-leipzig.de/",
  "telephone": "+49-341-XXXXXXX",
  "email": "info@ristorante-paganini-leipzig.de",
  "servesCuisine": ["Italian", "Mediterranean"],
  "priceRange": "€€",
  "acceptsReservations": "True",
  "hasMenu": "https://www.ristorante-paganini-leipzig.de/menu.pdf",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Große Fleischergasse XX",
    "addressLocality": "Leipzig",
    "postalCode": "04109",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.34140,
    "longitude": 12.37490
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "11:30",
      "closes": "22:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday","Sunday"],
      "opens": "12:00",
      "closes": "23:00"
    }
  ],
  "image": [
    "https://www.ristorante-paganini-leipzig.de/images/interior-main.jpg",
    "https://www.ristorante-paganini-leipzig.de/images/terrace.jpg"
  ],
  "sameAs": [
    "https://www.instagram.com/PLACEHOLDER"
  ]
}
```

**Important:** Keep `openingHoursSpecification` data synchronized with the visible HTML content. Mismatches cause Google Search Console warnings. Mark these as editable placeholders with HTML comments.

### Favicon and Manifest Setup

**Minimal modern approach (2026-current, per Evil Martians research):**

Files required:
1. `favicon.ico` — 32×32px, for legacy browser tab support
2. `icon.svg` — vector, for modern browsers; can include dark mode variant via `@media (prefers-color-scheme: dark)` inside the SVG
3. `apple-touch-icon.png` — 180×180px
4. `icon-192.png` — 192×192px (Android PWA)
5. `icon-512.png` — 512×512px (Android PWA splash)
6. `manifest.webmanifest` — PWA manifest (use `.webmanifest` extension per spec, not `.json`)

HTML `<head>` tags:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
```

`manifest.webmanifest` content:

```json
{
  "name": "Ristorante Paganini",
  "short_name": "Paganini",
  "icons": [
    { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
    { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" },
    { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512", "purpose": "maskable" }
  ],
  "theme_color": "#1a1a18",
  "background_color": "#faf8f4",
  "display": "browser"
}
```

**Do not** generate 20+ favicon sizes with online favicon generators — it adds unnecessary `<link>` clutter and file weight. The 4-tag approach above covers 99%+ of real-world devices.

### Multilingual / Hreflang Strategy

**Structure: separate HTML files per language** (already confirmed in PROJECT.md):
- `/de/index.html` — German (primary)
- `/en/index.html` — English
- `/it/index.html` — Italian
- `/index.html` — root redirect (JS language detection, defaults to DE)

**Hreflang implementation: HTML `<head>` method** (not XML sitemap method).

Each language page must include a self-referencing hreflang plus all alternates:

```html
<!-- In /de/index.html -->
<link rel="canonical" href="https://www.ristorante-paganini-leipzig.de/de/">
<link rel="alternate" hreflang="de" href="https://www.ristorante-paganini-leipzig.de/de/">
<link rel="alternate" hreflang="en" href="https://www.ristorante-paganini-leipzig.de/en/">
<link rel="alternate" hreflang="it" href="https://www.ristorante-paganini-leipzig.de/it/">
<link rel="alternate" hreflang="x-default" href="https://www.ristorante-paganini-leipzig.de/de/">
```

**Critical rules:**
- Every language page must include the full set of 4 `<link rel="alternate">` tags (self + all others + x-default)
- `hreflang="x-default"` points to the German version (primary market)
- Do NOT use canonical to point one language to another — each is its own canonical URL
- Language codes: `de`, `en`, `it` — no region suffixes needed unless targeting specific countries distinctly
- Studies show 75% of hreflang implementations have errors; missing return tags (reciprocal links on all pages) is the most common mistake

**Root redirect (`/index.html`) pattern:**

```javascript
// Lightweight language redirect — no library needed
(function() {
  const lang = navigator.language || navigator.userLanguage || 'de';
  const supported = ['de', 'en', 'it'];
  const code = lang.substring(0, 2).toLowerCase();
  const target = supported.includes(code) ? code : 'de';
  window.location.replace('/' + target + '/');
})();
```

### Vanilla JavaScript Patterns

**Principle: use browser APIs directly, no library, no framework.**

All modern browsers (2020+) support: `IntersectionObserver`, `position: sticky`, `CSS.supports()`, `querySelectorAll`, `classList`, `dataset`, `matchMedia`, `fetch`.

#### Sticky Header with Scroll-Triggered State

Use CSS `position: sticky` for the actual sticking behavior — zero JS needed for the stick itself. Use `IntersectionObserver` to detect when the page scrolls past the hero so the header can adopt a "scrolled" appearance (background fill, shadow).

```javascript
// Sentinel element placed at top of <main>, observed via IntersectionObserver
const sentinel = document.getElementById('scroll-sentinel');
const header = document.querySelector('.header');

const observer = new IntersectionObserver(
  ([entry]) => {
    header.classList.toggle('header--scrolled', !entry.isIntersecting);
  },
  { threshold: 0, rootMargin: '0px' }
);

if (sentinel) observer.observe(sentinel);
```

**Why IntersectionObserver over scroll event listener:** Runs off main thread, zero jank. Scroll listeners fire dozens of times per second and block rendering.

#### Mobile Navigation Menu

```javascript
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-menu');

toggle.addEventListener('click', () => {
  const isOpen = nav.getAttribute('aria-expanded') === 'true';
  nav.setAttribute('aria-expanded', String(!isOpen));
  toggle.setAttribute('aria-expanded', String(!isOpen));
  document.body.classList.toggle('nav-open', !isOpen);
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!toggle.contains(e.target) && !nav.contains(e.target)) {
    nav.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    nav.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    toggle.focus();
  }
});
```

**Use `aria-expanded` on both the toggle button and the nav element** — required for screen reader accessibility. Drive CSS with attribute selectors, not class toggles, for the open/close state of the menu itself.

#### Smooth Scrolling

Use CSS-only. No JS scroll animation needed:

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

Set `scroll-padding-top` on `html` to account for the sticky header:

```css
html {
  scroll-padding-top: var(--header-height);
}
```

**Do not use JavaScript `scrollIntoView()` or custom scroll animation** — the CSS approach respects `prefers-reduced-motion` automatically, has no jank, and requires zero JS.

#### Lazy Loading

Use native `loading="lazy"` on all below-fold `<img>` elements. This is sufficient for 2025+ browsers (Chrome 76+, Firefox 75+, Safari 15.4+).

For enhanced behavior (fade-in on reveal), use `IntersectionObserver` as a progressive enhancement:

```javascript
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        imageObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px' });

  lazyImages.forEach(img => imageObserver.observe(img));
}
```

CSS companion:

```css
img[loading="lazy"] {
  opacity: 0;
  transition: opacity var(--transition-slow);
}
img[loading="lazy"].loaded {
  opacity: 1;
}
```

### Responsive Breakpoints

Mobile-first (min-width). Three primary breakpoints:

```css
/* Mobile: default (no media query) — 0px+ */
/* Tablet: 768px+ */
@media (min-width: 48rem) { /* 768px */ }
/* Desktop: 1024px+ */
@media (min-width: 64rem) { /* 1024px */ }
/* Wide: 1280px+ */
@media (min-width: 80rem) { /* 1280px */ }
```

**Use `rem` units for breakpoints** — scales with user font-size preferences. Use `clamp()` for fluid typography instead of per-breakpoint font-size overrides.

### SEO Meta Tags

Each language page `<head>` requires:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ristorante Paganini Leipzig — Authentisches Italienisches Restaurant</title>
<meta name="description" content="[max 160 chars, localized]">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.ristorante-paganini-leipzig.de/de/">

<!-- Open Graph -->
<meta property="og:type" content="restaurant.restaurant">
<meta property="og:title" content="[page title]">
<meta property="og:description" content="[description]">
<meta property="og:image" content="https://www.ristorante-paganini-leipzig.de/images/og-image.jpg">
<meta property="og:url" content="[canonical URL]">
<meta property="og:locale" content="de_DE">
<meta property="og:locale:alternate" content="en_US">
<meta property="og:locale:alternate" content="it_IT">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[page title]">
<meta name="twitter:description" content="[description]">
<meta name="twitter:image" content="[og:image URL]">

<!-- Language alternates -->
<link rel="alternate" hreflang="de" href="[DE URL]">
<link rel="alternate" hreflang="en" href="[EN URL]">
<link rel="alternate" hreflang="it" href="[IT URL]">
<link rel="alternate" hreflang="x-default" href="[DE URL]">
```

---

## Alternatives Considered

| Recommended | Alternative | Why Not Alternative |
|-------------|-------------|---------------------|
| Self-hosted woff2 fonts | Google Fonts CDN | DSGVO/GDPR risk for German visitors; third-party DNS lookup adds latency; no control over caching |
| CUBE CSS methodology | Pure BEM | BEM fights the cascade, produces verbose class names, complicates maintenance for non-developers |
| CSS `position: sticky` + IntersectionObserver | scroll event listener for sticky header | Scroll listeners block main thread, cause jank; IO is async and off main thread |
| CSS `scroll-behavior: smooth` | JS scroll animation library | CSS approach is zero-JS, respects `prefers-reduced-motion` natively, no dependency to maintain |
| Native `loading="lazy"` | vanilla-lazyload library | Browser-native lazy loading has universal support as of 2024; library adds 2.4kB weight for no benefit |
| AVIF → WebP → JPEG fallback stack | WebP only | AVIF is 20–50% smaller than WebP; modern browsers support it; fallback costs nothing extra |
| Separate HTML files per language | JS-based language switching on one page | Separate files enable proper hreflang, independent indexing, no JS failure mode for language |
| `manifest.webmanifest` (4 link tags) | Full favicon generator (20+ sizes) | 99%+ device coverage with 4 tags; extra sizes add noise without benefit |
| ImageMagick CLI / Squoosh.app for image prep | Squoosh CLI | Squoosh CLI deprecated in 2023, no longer maintained |
| `font-display: swap` | `font-display: block` | Block hides text during load — penalizes FCP and CLS; swap shows text immediately |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Google Fonts `<link>` CDN tag | DSGVO violation risk for German users; third-party connection cost | Self-host as woff2 via google-webfonts-helper |
| jQuery | 87KB for functionality fully covered by vanilla JS DOM APIs | Vanilla JS with `querySelector`, `classList`, `addEventListener` |
| Animation libraries (GSAP, AOS, etc.) | Heavy, render-blocking, fights Core Web Vitals; explicitly out of scope | CSS transitions + `@keyframes` + IntersectionObserver for scroll reveals |
| CSS preprocessors (Sass, Less) | Require build step; no build step is a hard constraint | CSS custom properties cover all theming needs natively |
| Squoosh CLI | Deprecated 2023, unmaintained | Squoosh.app (browser) or ImageMagick CLI |
| `srcset` without `width` + `height` attributes | Causes CLS (layout shift), hurts Core Web Vitals | Always include explicit `width` and `height` on every `<img>` |
| `<img loading="lazy">` on hero/LCP image | Delays the LCP element — opposite of intended effect | Use `loading="eager"` + `fetchpriority="high"` on hero image |
| Multiple `<link rel="stylesheet">` files | Extra HTTP requests on static hosts without guaranteed HTTP/2 | Single `styles.css` with clearly commented sections |
| CSS `@import` within stylesheets | Blocks rendering; discovered late by browser | Concatenate into single file or use `<link>` in HTML |
| `font-display: block` | Invisible text during load, penalizes FCP | `font-display: swap` |
| Translating via JS on one HTML file | Breaks SEO: one URL, no hreflang, one canonical | Separate HTML files per language |
| `hreflang` only on some pages | Google ignores entire cluster if any page in cluster is missing | Every language page must have complete hreflang set |

---

## File/Folder Structure

```
/
├── index.html                    ← Root redirect (JS language detection)
├── de/
│   ├── index.html                ← German main page
│   ├── impressum.html
│   └── datenschutz.html
├── en/
│   ├── index.html                ← English main page
│   ├── privacy.html
│   └── legal.html
├── it/
│   ├── index.html                ← Italian main page
│   ├── privacy.html
│   └── note-legali.html
├── assets/
│   ├── css/
│   │   └── styles.css            ← Single stylesheet
│   ├── js/
│   │   └── main.js               ← Single script, deferred
│   ├── fonts/
│   │   ├── cormorant-garamond-*.woff2
│   │   └── lato-*.woff2
│   └── images/
│       ├── hero-interior.avif
│       ├── hero-interior.webp
│       ├── hero-interior.jpg
│       └── ...
├── favicon.ico
├── icon.svg
├── apple-touch-icon.png
├── icon-192.png
├── icon-512.png
├── manifest.webmanifest
├── sitemap.xml
└── robots.txt
```

**Single `main.js` loaded with `defer`:**

```html
<script src="/assets/js/main.js" defer></script>
```

`defer` ensures the script executes after HTML is parsed but before `DOMContentLoaded` — no need for `DOMContentLoaded` event listener wrapping inside the script.

---

## Confidence Assessment

| Area | Confidence | Verification Source |
|------|------------|---------------------|
| CSS CUBE CSS methodology | HIGH | piccalil.li official docs, actively maintained 2025 |
| Font loading strategy (self-host, inline @font-face, preload) | HIGH | web.dev/articles/font-best-practices (Google official) |
| AVIF/WebP/JPEG picture element stack | HIGH | MDN, web.dev, multiple 2025 sources confirm |
| JSON-LD Restaurant schema | HIGH | schema.org/Restaurant, Google Search Central docs |
| Favicon 4-tag approach | HIGH | Evil Martians guide, updated 2024/2026 |
| Hreflang HTML head method | HIGH | Google Search Central docs |
| IntersectionObserver for sticky/lazy | HIGH | MDN, Smashing Magazine, CSS-Tricks |
| CSS scroll-behavior smooth | HIGH | MDN, universal browser support confirmed |
| Cormorant Garamond + Lato pairing | MEDIUM | Verified as established pairing; specific to project tone judgment |
| CSS custom properties token structure | HIGH | Standard practice, multiple authoritative sources |
| Native loading="lazy" sufficiency | HIGH | Browser support data: Chrome 76+, Firefox 75+, Safari 15.4+ |

---

## Sources

- https://web.dev/articles/font-best-practices — Font loading best practices (Google official, HIGH confidence)
- https://piccalil.li/blog/cube-css/ — CUBE CSS methodology by Andy Bell
- https://developers.google.com/search/docs/appearance/structured-data/local-business — LocalBusiness structured data (Google Search Central)
- https://schema.org/Restaurant — Restaurant schema properties
- https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs — Favicon minimal approach (updated 2024/2026)
- https://developers.google.com/search/docs/specialty/international/localized-versions — Hreflang official docs
- https://gwfh.mranftl.com — google-webfonts-helper for self-hosting Google Fonts
- https://squoosh.app — Browser-based image compression tool
- https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/ — IntersectionObserver sticky header pattern
- https://css-tricks.com/smooth-scrolling-accessibility/ — Smooth scroll accessibility
- https://browserux.com/blog/articles/css-prefers-reduced-motion-accessibility.html — prefers-reduced-motion CSS pattern
- https://www.corewebvitals.io/pagespeed/self-host-google-fonts — Self-hosted fonts and Core Web Vitals
- https://medium.com/walmartglobaltech/lazy-loading-using-intersection-observer-6764ab32e776 — IntersectionObserver lazy loading

---

*Stack research for: Premium multilingual static restaurant website (HTML/CSS/vanilla JS, no framework, no build step)*
*Researched: 2026-04-06*
