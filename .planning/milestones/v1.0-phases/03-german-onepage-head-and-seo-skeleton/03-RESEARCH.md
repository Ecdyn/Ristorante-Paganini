# Phase 3: German Onepage — Head and SEO Skeleton - Research

**Researched:** 2026-04-07
**Domain:** HTML5 document structure, SEO meta tags, JSON-LD structured data, hreflang, Open Graph
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** All 12 section IDs are language-neutral English, identical across DE/EN/IT: `#hero`, `#info`, `#about`, `#menu`, `#lunch`, `#gallery`, `#reservation`, `#events`, `#location`, `#faq`, `#contact`, `#footer`
- **D-02:** Language-neutral IDs avoid per-language ID mapping, simplify JS, and keep deep links consistent when shared
- **D-03:** Use real restaurant address (Grosse Fleischergasse, Leipzig) and real phone format in JSON-LD, but mark opening hours and menu URL with HTML comments for Phase 4 completion
- **D-04:** JSON-LD block includes Restaurant + LocalBusiness schema with PostalAddress, servesCuisine, priceRange — all required fields present for Rich Results Test
- **D-05:** FAQPage JSON-LD is deferred to Phase 4 — only add when actual Q&A content exists. Phase 3 creates the empty `#faq` section element only
- **D-06:** openingHoursSpecification uses placeholder values with clear comments — structure must be syntactically valid JSON-LD even with placeholder data
- **D-07:** German meta title: "Ristorante Paganini | Italienisches Restaurant Leipzig"
- **D-08:** Meta description is warm and personal, mentions family tradition, authentic Italian cuisine, and Leipzig city center. Not keyword-stuffed but naturally includes key search terms
- **D-09:** Open Graph uses `og:type="restaurant"`
- **D-10:** `og:locale="de_DE"`, `og:image` points to `../assets/img/og-image.svg` (placeholder from Phase 2)
- **D-11:** Twitter card uses `twitter:card="summary_large_image"`
- **D-12:** Full hreflang block with all 4 tags: `hreflang="de"` (self), `hreflang="en"`, `hreflang="it"`, `hreflang="x-default"` pointing to DE version
- **D-13:** Self-canonical: `<link rel="canonical" href="...de/index.html">` — never cross-canonical to another language
- **D-14:** Hreflang URLs use absolute paths with `https://www.example.com` placeholder and a comment for replacement before launch
- **D-15:** Body includes full structural markup: `<header>` with nav, `<main>` with 12 `<section>` elements, `<footer>`
- **D-16:** Header/nav structure matches test.html pattern (Phase 2) including hamburger button and mobile menu overlay
- **D-17:** Each section has its anchor ID and a placeholder comment (`<!-- SECT-XX: Section Name -->`) but no content text or images

### Claude's Discretion

- Exact meta description wording (within warm/inviting tone direction)
- JSON-LD field ordering and formatting
- Whether to include `<meta name="robots" content="index, follow">` or omit (defaults to same)
- Exact hreflang base URL placeholder format
- Whether body sections get `aria-label` attributes now or in Phase 4
- Internal HTML comment formatting style

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Site uses semantic HTML5 with single H1 per page and proper heading hierarchy | Body skeleton contract defines exact placement: one `<h1>` placeholder in hero, all sections use `<section>` landmark elements, `<header>`, `<main>`, `<footer>` used correctly |
| LANG-01 | German version at /de/index.html as primary language | Document root `lang="de"`, file at `/de/index.html`, canonical self-references DE URL |
| SEO-01 | Per-page meta titles and descriptions in each language | Exact title and description copy defined in Copywriting Contract (D-07, D-08) |
| SEO-02 | Open Graph and Twitter card tags per language page | OG and Twitter card contracts fully specified (D-09, D-10, D-11) |
| SEO-03 | Reciprocal hreflang tags on all pages (DE, EN, IT, x-default) with self-canonicalization | Hreflang contract: all 4 tags, absolute URLs, x-default points to DE, canonical matches self-hreflang |
| SEO-04 | JSON-LD Restaurant + LocalBusiness schema with commented placeholder values | JSON-LD contract in UI-SPEC; structure verified valid against schema.org/Restaurant |
| SEO-05 | JSON-LD FAQPage schema on FAQ section | DEFERRED to Phase 4 per D-05. Phase 3 creates empty `#faq` section only |

</phase_requirements>

---

## Summary

Phase 3 produces a single file: `/de/index.html`. This file is a valid HTML5 document with a complete, correct `<head>` and a structural body skeleton — no visible content, no images beyond what main.css loads. All architectural decisions were locked in prior phases (CONTEXT.md) and the UI-SPEC defines the exact markup contracts. Research for this phase is primarily a synthesis and verification exercise: confirm the locked contracts against official standards, identify any integration gotchas, and document the exact patterns the executor needs.

The CONTEXT.md and UI-SPEC together constitute a near-complete implementation specification. The planner's job is to sequence tasks and identify verification checkpoints — not to rediscover what to build. The main risk areas are: hreflang reciprocity (EN/IT stubs must be consistent with what Phase 5 will produce), JSON-LD field completeness for Rich Results Test pass rate, and path correctness for `../assets/` relative references from within the `/de/` subdirectory.

The phase is a greenfield file creation. No existing `/de/index.html` exists. All assets it will reference were created in Phase 1 (main.css) and Phase 2 (main.js, all favicons, all placeholder images). No runtime state inventory is needed — this is a pure code-creation phase.

**Primary recommendation:** Execute as a single-task plan — write `/de/index.html` in one shot using the UI-SPEC contracts verbatim. Verification gate: W3C HTML validation + manual inspection of hreflang/canonical/JSON-LD.

---

## Project Constraints (from CLAUDE.md)

All of the following directives are hard constraints. The planner must not recommend approaches that contradict them.

| Directive | Details |
|-----------|---------|
| Tech stack | Plain HTML5, CSS3, vanilla JS only — no frameworks, no build tools, no dependencies |
| No Google Fonts CDN | Self-hosted woff2 only — GDPR requirement for German audience |
| No jQuery, no animation libraries | Vanilla JS and CSS transitions only |
| No CSS preprocessors | Single `styles.css` (here: `main.css`), no `@import` |
| No `<link>` CDN for anything | All assets self-hosted |
| Single H1 per page | Semantic HTML5 requirement |
| AVIF/WebP/JPEG picture stack | For all content images (applies to Phase 4; Phase 3 has no images in body) |
| Hero image: eager + fetchpriority | Not applicable in Phase 3 (skeleton only); applies in Phase 4 |
| Separate HTML files per language | Already decided; Phase 3 creates the DE file |
| Hreflang reciprocal on all pages | All 4 tags required; stubs for EN/IT must be present even before those files exist |
| JSON-LD in `<script type="application/ld+json">` | In `<head>`, isolated from HTML markup |
| Agency-friendly comments | All editable areas marked with `<!-- EDITABLE: ... -->`, `<!-- EDIT: ... -->`, `<!-- PLACEHOLDER: ... -->`, `<!-- SYNC: ... -->` |
| Legal: placeholder only | Real legal text must NOT be present; placeholder with clear comment required |

---

## Standard Stack

### Core

| Component | Version/Spec | Purpose | Why Standard |
|-----------|-------------|---------|--------------|
| HTML5 | Living Standard | Document structure | Required by CLAUDE.md; semantic landmarks (header, main, footer, section, nav) are non-negotiable |
| JSON-LD | Schema.org v25 | Restaurant + LocalBusiness structured data | Google's preferred format per Search Central docs; in `<head>`, zero HTML coupling |
| hreflang HTML method | Google Search Central spec | International targeting | HTML head method chosen (not sitemap); reciprocal pattern on all pages |

### No External Libraries

This phase adds zero npm packages or CDN references. The standard stack is the browser's own HTML parser and the project's existing `main.css` / `main.js` already present in `assets/`.

### Installation

```bash
# No installation needed — file creation only
mkdir -p de
```

---

## Architecture Patterns

### File System Pattern

```
de/
└── index.html    ← CREATED in Phase 3
assets/
├── css/main.css  ← Already exists (Phase 1)
├── js/main.js    ← Already exists (Phase 2)
├── favicon.svg   ← Already exists (Phase 2)
├── favicon.ico   ← Already exists (Phase 2)
├── apple-touch-icon.png ← Already exists (Phase 2)
├── site.webmanifest    ← Already exists (Phase 2)
└── img/og-image.svg    ← Already exists (Phase 2)
```

From within `/de/index.html`, all asset references use `../assets/` prefix.

### Pattern 1: Head Element Order

The `<head>` must follow this sequence (from UI-SPEC Structural Markup Contract):

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <!-- 1. Character encoding — must be first -->
  <meta charset="UTF-8">

  <!-- 2. Viewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- 3. Title and meta description -->
  <title>Ristorante Paganini | Italienisches Restaurant Leipzig</title>
  <meta name="description" content="Erleben Sie authentische italienische Küche im Herzen von Leipzig. Ristorante Paganini — familiengeführt, mit Leidenschaft für Qualität und Gastfreundschaft seit Generationen. Tisch reservieren: +49 341 XXXXXXXX">

  <!-- 4. Canonical -->
  <!-- PLACEHOLDER: Replace example.com with real domain before launch -->
  <link rel="canonical" href="https://www.example.com/de/">

  <!-- 5. Hreflang block -->
  <!-- PLACEHOLDER: Replace example.com with real domain in all hreflang URLs before launch -->
  <link rel="alternate" hreflang="de" href="https://www.example.com/de/">
  <link rel="alternate" hreflang="en" href="https://www.example.com/en/">
  <link rel="alternate" hreflang="it" href="https://www.example.com/it/">
  <link rel="alternate" hreflang="x-default" href="https://www.example.com/de/">

  <!-- 6. Open Graph -->
  <meta property="og:type" content="restaurant">
  <meta property="og:locale" content="de_DE">
  <meta property="og:site_name" content="Ristorante Paganini">
  <meta property="og:title" content="Ristorante Paganini | Italienisches Restaurant Leipzig">
  <meta property="og:description" content="Erleben Sie authentische italienische Küche im Herzen von Leipzig. Ristorante Paganini — familiengeführt, mit Leidenschaft für Qualität und Gastfreundschaft seit Generationen. Tisch reservieren: +49 341 XXXXXXXX">
  <meta property="og:url" content="https://www.example.com/de/">
  <meta property="og:image" content="https://www.example.com/assets/img/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <!-- PLACEHOLDER: Replace example.com with real domain before launch -->
  <!-- PLACEHOLDER: Replace og-image.jpg with real photography before launch -->

  <!-- 7. Twitter card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Ristorante Paganini | Italienisches Restaurant Leipzig">
  <meta name="twitter:description" content="Erleben Sie authentische italienische Küche im Herzen von Leipzig. Ristorante Paganini — familiengeführt, mit Leidenschaft für Qualität und Gastfreundschaft seit Generationen. Tisch reservieren: +49 341 XXXXXXXX">
  <meta name="twitter:image" content="https://www.example.com/assets/img/og-image.jpg">
  <!-- PLACEHOLDER: Replace example.com and og-image.jpg before launch -->

  <!-- 8. Favicon set — SEO-09, exact from 02-02-SUMMARY.md -->
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="../assets/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="../assets/apple-touch-icon.png">
  <link rel="manifest" href="../assets/site.webmanifest">

  <!-- 9. Stylesheet -->
  <link rel="stylesheet" href="../assets/css/main.css">

  <!-- 10. JSON-LD structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "name": "Ristorante Paganini",
    "description": "Authentisches italienisches Restaurant in der Leipziger Innenstadt. Familiengeführt seit Generationen.",
    "url": "https://www.example.com/de/",
    "telephone": "+49 341 XXXXXXXX",
    "servesCuisine": "Italian",
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Credit Card",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Grosse Fleischergasse",
      "addressLocality": "Leipzig",
      "postalCode": "04109",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.3397,
      "longitude": 12.3731
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "11:30",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "12:00",
        "closes": "22:00"
      }
    ],
    "image": "https://www.example.com/assets/img/og-image.jpg",
    "inLanguage": "de"
  }
  </script>
  <!-- EDIT: telephone — replace XXXXXXXX with real number before launch -->
  <!-- EDIT: openingHoursSpecification — confirm actual hours with owner before launch -->
  <!-- PLACEHOLDER: Replace example.com and og-image.jpg with real values before launch -->
  <!-- SYNC: Update this JSON-LD block in en/ and it/ when translating in Phase 5 -->

  <!-- 11. Scripts — deferred, non-blocking -->
  <script src="../assets/js/main.js" defer></script>
</head>
```

[VERIFIED: codebase — matches main.js hooks, 02-02-SUMMARY.md favicon tags, CONTEXT.md decisions, UI-SPEC contracts]

### Pattern 2: Body Skeleton with JS Hook Preservation

The JS in `assets/js/main.js` depends on three exact IDs. These must be present in the skeleton:

| JS Hook | Element | Function |
|---------|---------|----------|
| `id="site-header"` | `<header>` | Sticky header IntersectionObserver and scroll state |
| `id="menu-toggle"` | `<button>` | Mobile menu open/close |
| `id="mobile-menu"` | `<div>` | Mobile overlay panel |
| `.hero-sentinel` | `<div aria-hidden="true">` inside `#hero` | Detects scroll past hero |

[VERIFIED: codebase — main.js lines 17, 77-78, 61; test.html lines 32, 49, 61, 85]

### Pattern 3: Nav Links for All 12 Sections

Both `<nav>` (desktop) and `.mobile-menu` (mobile overlay) need anchor links to all 12 sections. Using German labels for the DE page:

| Section ID | German Nav Label |
|------------|-----------------|
| `#hero` | Start |
| `#info` | Öffnungszeiten |
| `#about` | Über uns |
| `#menu` | Speisekarte |
| `#lunch` | Mittagstisch |
| `#gallery` | Galerie |
| `#reservation` | Reservierung |
| `#events` | Veranstaltungen |
| `#location` | Anfahrt |
| `#faq` | FAQ |
| `#contact` | Kontakt |
| `#footer` | (footer — typically not in nav) |

[ASSUMED] — Nav label selection is Claude's discretion (CONTEXT.md). Labels above are standard German restaurant navigation conventions. Footer link is conventionally omitted from nav.

### Anti-Patterns to Avoid

- **Cross-canonical:** Never `<link rel="canonical" href=".../en/">` on the DE page. Canonical must be self-referential.
- **Missing hreflang return tags:** The EN and IT stubs in the DE hreflang block must use the same absolute URL format that Phase 5 will use for EN/IT self-canonicals. Mismatched URLs break the reciprocal cluster.
- **Relative hreflang URLs:** Google requires absolute URLs in hreflang. Never use `/de/` — always `https://www.example.com/de/`.
- **Lazy loading on hero:** The hero image (Phase 4) must be `loading="eager"`. Phase 3 does not add the image, but the skeleton must not add `loading="lazy"` to the hero section.
- **Google Fonts CDN link:** Forbidden by CLAUDE.md. No `<link rel="preconnect" href="https://fonts.googleapis.com">` or similar.
- **Second `<h1>`:** The skeleton places exactly one `<h1>` placeholder. No additional H1 elements in any section.
- **`og:image` as relative path:** OG image must be an absolute URL. Social crawlers do not resolve relative paths.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sticky header scroll behavior | Custom scroll event handler | Existing `main.js` IIFE (already complete) | main.js already implements IntersectionObserver + rAF pattern correctly |
| Mobile menu overlay | Custom JS overlay | Existing `main.js` IIFE + markup from test.html | Focus trap, Escape key, aria-expanded all already implemented |
| Schema validation | Manual JSON-LD checking | Google Rich Results Test (post-creation verification) | Rich Results Test is the authoritative validator; manual checking misses edge cases |
| Font loading | CSS `@import` or CDN | Existing `main.css` @font-face declarations (Phase 1) | Already implemented; linking main.css provides all fonts automatically |
| Responsive styles | Inline styles | Existing `main.css` design system | All breakpoints, tokens, components already available |

**Key insight:** Phase 3 is almost entirely assembly, not invention. Every interactive behavior already exists in main.js. Every style already exists in main.css. The work is writing the HTML that wires them together correctly.

---

## Common Pitfalls

### Pitfall 1: Hreflang URL Format Mismatch Between Phases

**What goes wrong:** Phase 3 uses `https://www.example.com/de/` in the DE hreflang block. Phase 5 (EN/IT) uses a different format — e.g., `https://www.example.com/en/index.html` instead of `https://www.example.com/en/`. Google considers these different URLs and breaks the reciprocal cluster.

**Why it happens:** Phase 3 writes stubs for EN/IT before those files exist. If Phase 5 uses a slightly different URL format, the cluster is broken silently.

**How to avoid:** Standardize on trailing-slash format (`/de/`, `/en/`, `/it/`) across all hreflang tags in all language files. The planner must document the canonical URL format as a cross-phase decision.

**Warning signs:** Google Search Console shows "hreflang errors" or "alternate page without redirect"; Rich Results Test shows no alternate pages detected.

### Pitfall 2: og:image Must Be Absolute URL — But Image Is a Placeholder SVG

**What goes wrong:** Phase 2 created `assets/img/og-image.svg`. The OG tag references it as an absolute URL (`https://www.example.com/assets/img/og-image.jpg`). Two issues: (1) the `.svg` extension vs `.jpg` in the URL, and (2) many social platforms do not render SVG as OG images.

**Why it happens:** Phase 2 produced an SVG placeholder. OG image social crawlers (Facebook, LinkedIn, Twitter/X) require raster images (JPEG/PNG), not SVG.

**How to avoid:** Reference the path with `.svg` in Phase 3 comments but note the pre-launch replacement requirement prominently. The placeholder path in Phase 3 uses `.jpg` in the UI-SPEC (`og-image.jpg`) — this is intentional: a `.jpg` file will need to be created before launch. The Phase 3 HTML should use `og-image.jpg` as the URL (matching the UI-SPEC) and mark it as a placeholder.

**Warning signs:** Social sharing debuggers (Facebook Sharing Debugger, Twitter Card Validator) show no image or image fetch failure.

### Pitfall 3: `<meta charset>` Must Be First in `<head>`

**What goes wrong:** If `<meta charset="UTF-8">` is not the first element in `<head>`, the browser may mis-parse characters before the charset declaration, causing encoding issues for German special characters (ä, ö, ü, ß).

**Why it happens:** HTML parser reads encoding from charset meta; characters before it are decoded using the parser's default (usually Latin-1 or UTF-8 depending on BOM).

**How to avoid:** `<meta charset="UTF-8">` is always the first tag in `<head>`, per the head element order defined in the UI-SPEC.

**Warning signs:** German umlauts in `<title>` or `<meta name="description">` appear garbled in browser tab or search snippets.

### Pitfall 4: main.js Fails Silently If JS Hook IDs Are Wrong

**What goes wrong:** `main.js` uses `getElementById('site-header')`, `getElementById('menu-toggle')`, `getElementById('mobile-menu')`, and `querySelector('.hero-sentinel')`. Every IIFE starts with an early return if the element is not found (`if (!header || !sentinel) return;`). If any ID or class name differs even slightly, JS silently does nothing.

**Why it happens:** Test.html and main.js were built together and use exact string matching. The real page must use identical IDs.

**How to avoid:** Copy the header/nav/mobile-menu/hero-sentinel markup directly from test.html. Do not rename IDs.

**Warning signs:** Sticky header never changes state on scroll; mobile menu button does nothing.

### Pitfall 5: JSON-LD Fails Rich Results Test if openingHoursSpecification Has Wrong Time Format

**What goes wrong:** `opens`/`closes` values in `openingHoursSpecification` must be `HH:MM` (24-hour ISO 8601 time) without seconds. Values like `"11:30:00"` or `"23:00 Uhr"` fail validation.

**Why it happens:** Placeholder values copied from visible text may include German formatting ("11:30 Uhr") rather than bare ISO time.

**How to avoid:** Placeholder values in JSON-LD use bare `"HH:MM"` format as defined in the UI-SPEC JSON-LD contract. Do not add "Uhr" suffix or seconds.

**Warning signs:** Google Rich Results Test returns "Invalid time format" error.

---

## Code Examples

### JS Hook IDs — Verified from main.js

```javascript
// main.js — exact getElementById calls that de/index.html must satisfy
const header   = document.getElementById('site-header');   // line 17
const sentinel = document.querySelector('.hero-sentinel');  // line 18
const toggle   = document.getElementById('menu-toggle');   // line 77
const menu     = document.getElementById('mobile-menu');   // line 78
const closeBtn = menu?.querySelector('.mobile-menu-close'); // line 79
```

[VERIFIED: codebase — `assets/js/main.js` lines 17-18, 77-79]

### Header/Nav Markup — Adapted from test.html

```html
<header class="header" id="site-header">
  <a href="#hero" class="font-heading" style="font-size: 1.5rem; text-decoration: none; color: var(--color-accent); font-weight: 700;">
    Ristorante Paganini
  </a>

  <nav>
    <ul class="nav" role="list">
      <li><a href="#hero">Start</a></li>
      <li><a href="#about">Über uns</a></li>
      <li><a href="#menu">Speisekarte</a></li>
      <li><a href="#lunch">Mittagstisch</a></li>
      <li><a href="#reservation">Reservierung</a></li>
      <li><a href="#contact">Kontakt</a></li>
    </ul>
  </nav>

  <button type="button" class="menu-toggle" id="menu-toggle"
          aria-expanded="false" aria-controls="mobile-menu"
          aria-label="Navigation öffnen">
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>

<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation">
  <button type="button" class="mobile-menu-close" aria-label="Navigation schließen">Schließen</button>
  <!-- EDITABLE: Mobile nav links — update anchor text and add/remove links as needed -->
  <a href="#hero">Start</a>
  <a href="#about">Über uns</a>
  <a href="#menu">Speisekarte</a>
  <a href="#lunch">Mittagstisch</a>
  <a href="#reservation">Reservierung</a>
  <a href="#events">Veranstaltungen</a>
  <a href="#location">Anfahrt</a>
  <a href="#faq">FAQ</a>
  <a href="#contact">Kontakt</a>
</div>
```

[VERIFIED: codebase — `assets/css/test.html` lines 32-68, adapted with DE localization]

### Hero Sentinel Placement

```html
<section class="hero" id="hero">
  <!-- SECT-01: Hero — content added in Phase 4 -->
  <!-- EDITABLE: Hero image, heading, subheadline, and CTA buttons added in Phase 4 -->
  <div class="hero-sentinel" aria-hidden="true"></div>
</section>
```

[VERIFIED: codebase — test.html line 85; main.js line 18 expects `.hero-sentinel`]

### Favicon Link Tags — Exact Copy from 02-02-SUMMARY.md

```html
<!-- Favicon set — SEO-09 -->
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="../assets/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="../assets/apple-touch-icon.png">
<link rel="manifest" href="../assets/site.webmanifest">
```

[VERIFIED: codebase — `.planning/phases/02-js-and-asset-foundation/02-02-SUMMARY.md` "HTML Head Link Tags for Phase 3" section]

---

## Environment Availability

Step 2.6: SKIPPED — Phase 3 is a pure HTML file-creation task. No external tools, CLIs, databases, or runtimes are required beyond a text editor (or Write tool). All referenced assets were verified to exist in `assets/` from Phase 2.

**Asset path verification (relevant to plan execution):**

| Asset | Path from `/de/index.html` | Exists? |
|-------|--------------------------|---------|
| Stylesheet | `../assets/css/main.css` | Yes (Phase 1) |
| JavaScript | `../assets/js/main.js` | Yes (Phase 2) |
| favicon.svg | `../assets/favicon.svg` | Yes (Phase 2) |
| favicon.ico | `../assets/favicon.ico` | Yes (Phase 2) |
| apple-touch-icon.png | `../assets/apple-touch-icon.png` | Yes (Phase 2) |
| site.webmanifest | `../assets/site.webmanifest` | Yes (Phase 2) |
| og-image.svg | `../assets/img/og-image.svg` | Yes (Phase 2) |

[VERIFIED: codebase — `ls assets/` and `ls assets/img/` confirmed in session]

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None (static HTML — no JS test runner) |
| Config file | none |
| Quick run command | Open `/de/index.html` in browser |
| Full suite command | W3C HTML validator + Google Rich Results Test |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | Single H1, semantic landmarks | manual | Open in browser, inspect Elements panel | Wave 0 |
| LANG-01 | `lang="de"` on html element | manual | `grep 'lang="de"' de/index.html` | Wave 0 |
| SEO-01 | Title and description present with correct copy | manual | `grep -n 'Ristorante Paganini' de/index.html` | Wave 0 |
| SEO-02 | OG + Twitter card tags present | manual | `grep -n 'og:' de/index.html && grep -n 'twitter:' de/index.html` | Wave 0 |
| SEO-03 | All 4 hreflang tags present, canonical is self | manual | `grep -n 'hreflang\|canonical' de/index.html` | Wave 0 |
| SEO-04 | JSON-LD block passes Rich Results Test | manual | Google Rich Results Test (browser-based tool) | Wave 0 |
| SEO-05 | FAQPage JSON-LD absent (deferred to Phase 4) | manual | `grep -n 'FAQPage' de/index.html` — expect no match | Wave 0 |

**Note:** This phase has no automated test suite. Verification is structural inspection and tool-based (W3C Validator, Rich Results Test, browser DevTools). The planner should include an explicit verification task.

### Sampling Rate

- **Per task commit:** `grep -n 'lang="de"\|hreflang\|canonical\|application/ld+json' de/index.html`
- **Per wave merge:** Full manual inspection of head section against UI-SPEC checklist
- **Phase gate:** W3C HTML Validator returns zero errors + Google Rich Results Test returns zero errors

### Wave 0 Gaps

- [ ] `de/` directory — must be created before writing `de/index.html`
- [ ] No existing test files for this phase — all verification is manual inspection

---

## Security Domain

Security enforcement is enabled (not explicitly disabled in config.json).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth in this phase or project |
| V3 Session Management | No | Static site, no sessions |
| V4 Access Control | No | No access-controlled content |
| V5 Input Validation | No | Phase 3 has no forms, no user input |
| V6 Cryptography | No | No secrets, no encryption needed |

### Known Threat Patterns for This Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| No robots meta tag leaks sensitive indexing | Information Disclosure | Legal pages get `noindex` in Phase 6; DE page intentionally indexed |
| Absolute URLs in hreflang/canonical use placeholder domain | Spoofing | Placeholder `example.com` is safe; real domain substituted before launch |
| JSON-LD injection via malformed strings | Tampering | All JSON-LD values are static strings, no dynamic content in Phase 3 |

**Summary:** Phase 3 introduces no meaningful attack surface. It is a static HTML file with no forms, no user data, no authentication, and no dynamic content. The GDPR-relevant decisions (no Google Fonts CDN, no Google Maps iframe) were already locked in prior phases and are enforced by CLAUDE.md.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Nav labels (Start, Über uns, Speisekarte, etc.) are standard German restaurant nav conventions | Code Examples — Header/Nav | Wrong label terminology; low risk — can be corrected in Phase 4 when content is finalized |
| A2 | Footer is not included as a nav link in desktop nav (but is in footer element) | Architecture Patterns | Minor UX gap; low risk |

---

## Open Questions

1. **Trailing slash vs. filename in canonical/hreflang URLs**
   - What we know: UI-SPEC uses `https://www.example.com/de/` (trailing slash, no `index.html`)
   - What's unclear: The real hosting provider's URL canonicalization behavior — does the server redirect `/de/` to `/de/index.html` or vice versa?
   - Recommendation: Use trailing-slash format (`/de/`) consistently in Phase 3. Document for owner to verify against real host configuration before launch. This must match across all three language files to maintain a valid hreflang cluster.

2. **og:image extension: `.svg` vs `.jpg`**
   - What we know: Phase 2 created `assets/img/og-image.svg`. UI-SPEC references `og-image.jpg` in OG tags.
   - What's unclear: Will a `.jpg` placeholder file be created in Phase 3, or will the OG image tag point to the `.svg` with a comment about replacement?
   - Recommendation: Use the UI-SPEC's `og-image.jpg` path in the OG/Twitter tags (matching the spec) and add a `<!-- PLACEHOLDER: og-image.jpg does not exist yet — create real JPEG photography before launch -->` comment. The SVG serves as a visual reference only; the Phase 3 HTML commits to the final `.jpg` path.

---

## Sources

### Primary (HIGH confidence)

- Codebase: `assets/js/main.js` — JS hook IDs verified directly (getElementById calls lines 17-18, 77-79)
- Codebase: `assets/css/test.html` — Header/nav/mobile-menu markup structure verified directly
- Codebase: `.planning/phases/02-js-and-asset-foundation/02-02-SUMMARY.md` — Favicon link tags verified
- Codebase: `.planning/phases/03-german-onepage-head-and-seo-skeleton/03-CONTEXT.md` — All locked decisions
- Codebase: `.planning/phases/03-german-onepage-head-and-seo-skeleton/03-UI-SPEC.md` — Full markup contracts
- Codebase: `CLAUDE.md` — Project constraints and conventions

### Secondary (MEDIUM confidence)

- [ASSUMED] German nav label conventions (A1 above) — standard restaurant site patterns, not verified against specific source in this session

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; all assets verified to exist
- Architecture: HIGH — all contracts defined in UI-SPEC and CONTEXT.md, verified against actual codebase files
- Pitfalls: HIGH for JS hook IDs and hreflang reciprocity (verified from code); MEDIUM for og:image SVG vs JPEG issue (inferred from file extension mismatch)

**Research date:** 2026-04-07
**Valid until:** 2026-05-07 (stable domain; no fast-moving dependencies)
