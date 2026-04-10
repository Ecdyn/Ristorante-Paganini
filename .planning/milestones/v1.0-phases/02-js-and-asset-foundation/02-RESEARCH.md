# Phase 2: JS and Asset Foundation - Research

**Researched:** 2026-04-07
**Domain:** Vanilla JavaScript behaviors, favicon assets, placeholder images, static asset pipeline
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Header hides on scroll down, reappears on scroll up — IntersectionObserver on sentinel element, NOT scroll event listeners
- **D-02:** Header is transparent over hero section, gains solid `--color-surface` background with `--shadow-sm` once scrolled past hero
- **D-03:** Transition between transparent and solid states uses `--transition-slow` (400ms ease) on background-color and box-shadow
- **D-04:** Full-screen overlay menu — covers entire viewport, dark `--color-surface-dark` background, large Cormorant Garamond nav links, close button
- **D-05:** Anchor links in mobile menu auto-close overlay and smooth-scroll to target — no manual close required
- **D-06:** Hamburger toggle must have correct `aria-expanded` state and be keyboard-navigable
- **D-07:** Placeholder images are solid color blocks (SVG files) with text labels using palette token colors
- **D-08:** All images in flat `assets/img/` directory, naming convention: `{section}-{variant}.{format}`
- **D-09:** `<picture>` element with AVIF > WebP > JPEG fallback, explicit `width` and `height` on every `<img>`
- **D-10:** Favicon is stylized serif "P" monogram in wine color (#7A2D3A)
- **D-11:** Four-tag favicon approach: SVG, ICO, apple-touch-icon PNG, webmanifest
- **D-12:** webmanifest `theme_color` and `background_color` both set to #7A2D3A

### Claude's Discretion

- Exact scroll threshold/sensitivity for header hide/show
- Mobile menu open/close animation style and duration
- Hamburger icon design (three-line vs animated transform)
- Smooth scroll easing and scroll-padding-top value for sticky header offset
- Placeholder image color choices within established palette
- Specific image dimension sets for each section type
- SVG favicon exact letterform and styling details
- ICO generation approach (conversion from SVG)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-04 | Sticky header with smooth show/hide behavior on scroll | IntersectionObserver sentinel pattern documented below; CSS data-attribute contract verified in existing main.css |
| FOUND-05 | Responsive hamburger mobile menu with accessible toggle | aria-expanded, focus trap, Escape key, 44px touch target — all documented in UI-SPEC and WCAG pattern |
| FOUND-06 | Smooth anchor scrolling with scroll-padding for sticky header offset | `scroll-behavior: smooth` + `scroll-padding-top: var(--header-height)` already in main.css global reset |
| FOUND-08 | AVIF/WebP/JPEG picture elements with explicit width/height attributes | Picture element pattern documented; placeholder SVG strategy confirmed as zero-dependency approach |
| PERF-03 | No render-blocking JavaScript | `<script defer>` in `<head>` is the complete solution; confirmed pattern |
| PERF-04 | Minimal vanilla JS (mobile menu, sticky header, language redirect only) | Single main.js file containing only three behaviors; language redirect is Phase 7 |
| SEO-09 | Favicon setup (SVG + ICO + apple-touch-icon + webmanifest) | Four-file set fully specified; webmanifest structure confirmed |
</phase_requirements>

---

## Summary

Phase 2 is a pure infrastructure phase. It creates `assets/js/main.js`, the `assets/img/` placeholder image directory, and the four favicon files. No HTML content pages are built. Everything produced here is consumed by Phase 3 (German page skeleton) onward.

The JavaScript architecture is fully specified before research began: IntersectionObserver for sticky header, data-attribute CSS contract for states, full-screen overlay mobile menu with focus trap, and CSS `scroll-behavior: smooth` (zero JS). The existing `main.css` from Phase 1 already includes `scroll-padding-top: var(--header-height)` and `scroll-behavior: smooth` in the global reset — confirmed by reading the file directly. The CSS data-attribute hooks (`[data-state="scrolled"]`, `[data-state="hidden"]` on `.header`) are already defined in the exceptions layer.

The placeholder image strategy uses SVG files — correct for a zero-photography, no-build-step project. SVGs are text files, committable to git, require no external tools, and render at any size. They serve as clearly-marked slots until real AVIF/WebP/JPEG photography arrives post-launch.

**Primary recommendation:** Write `assets/js/main.js` with three self-contained IIFE or module-pattern blocks (header observer, mobile menu, no-op smooth scroll since CSS handles it), generate SVG placeholders programmatically, and produce the four favicon files using path-based SVG with an inline `<text>` or `<path>` element for the "P" letterform.

---

## Standard Stack

### Core

| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|-------------|
| Vanilla JS (ES2020+) | No transpile | main.js behaviors | Hard constraint from CLAUDE.md; all target browsers support ES2020 natively |
| IntersectionObserver API | Native browser | Sentinel-based sticky header | Off main thread, no scroll listener jank; confirmed universal support Chrome 51+, Firefox 55+, Safari 12.1+ |
| CSS scroll-behavior: smooth | CSS3 Living Standard | Anchor link scrolling | Already in main.css; zero JS; respects prefers-reduced-motion via existing override |
| SVG | 1.1/2.0 | Placeholder images + favicon | No external tools needed; text format; scales perfectly |
| webmanifest | W3C Web App Manifest | PWA/browser chrome integration | Required for SEO-09; theme_color drives Android browser bar tinting |

[VERIFIED: reading assets/css/main.css directly — scroll-behavior and scroll-padding-top confirmed on lines 177-179]
[VERIFIED: reading assets/css/main.css directly — data-state hooks confirmed on lines 556-563]

### Supporting

| Technology | Version | Purpose | When to Use |
|------------|---------|---------|-------------|
| `<picture>` element | HTML5 Living Standard | AVIF/WebP/JPEG fallback stack | Every content image in Phase 3 onward; pattern defined in D-09/UI-SPEC |
| `defer` attribute on `<script>` | HTML5 | Non-blocking JS load | Only loading strategy for main.js per PERF-03 |
| `aria-expanded` + `role="dialog"` | ARIA 1.2 | Mobile menu accessibility | Mandatory for FOUND-05; keyboard nav + screen reader support |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| IntersectionObserver sentinel | scroll event listener | scroll listener blocks main thread, causes jank — explicitly forbidden in CLAUDE.md |
| SVG placeholder images | Solid-color JPEG/PNG placeholders | SVG is text, no binary file, no tool required, clearly labeled — better for static repo |
| CSS scroll-behavior | JS scroll animation | JS approach adds weight; CSS is zero-JS and respects prefers-reduced-motion natively |
| focus trap via keydown handler | focus-trap-tabbable library | Library adds dependency; project constraint is no dependencies |

**Installation:** None. No packages. No build step. [VERIFIED: CLAUDE.md constraint — "no frameworks, no build tools, no dependencies"]

---

## Architecture Patterns

### File Structure Produced by This Phase

```
assets/
├── js/
│   └── main.js                    # Single JS file, all behaviors
├── img/
│   ├── hero-desktop.svg           # Placeholder: 1400x800
│   ├── hero-mobile.svg            # Placeholder: 768x500
│   ├── gallery-01.svg             # Placeholder: 800x600
│   ├── gallery-02.svg             # Placeholder: 800x600
│   ├── gallery-03.svg             # Placeholder: 800x600
│   ├── gallery-04.svg             # Placeholder: 800x600
│   ├── gallery-05.svg             # Placeholder: 800x600
│   ├── gallery-06.svg             # Placeholder: 800x600
│   ├── about-bg.svg               # Placeholder: 1200x600
│   └── og-image.svg               # Placeholder: 1200x630
├── favicon.svg                    # Scalable "P" monogram
├── favicon.ico                    # 32x32+16x16 multi-resolution
├── apple-touch-icon.png           # 180x180 PNG
└── site.webmanifest               # PWA manifest
```

Note: Real AVIF/WebP/JPEG photography replaces SVG placeholders in POST-01 (post-launch). The naming convention (`{section}-{variant}.{format}`) means real files drop in without any HTML changes.

### Pattern 1: IntersectionObserver Sticky Header

**What:** A 1px sentinel `<div>` sits at the bottom of the hero section. When it leaves the viewport (user scrolled past hero), JS sets `data-state="scrolled"` on `<header>`. When it re-enters, the attribute is removed.

**When to use:** Any time header state depends on scroll position.

**HTML structure expected (Phase 3):**
```html
<header class="header" id="site-header">
  <!-- nav content -->
</header>
<main>
  <section class="hero" id="home">
    <!-- hero content -->
    <div class="hero-sentinel" aria-hidden="true"></div>
  </section>
</main>
```

**JS pattern:**
```javascript
// Source: CLAUDE.md "Vanilla JavaScript Patterns" + UI-SPEC interaction contract
(function initStickyHeader() {
  const header = document.getElementById('site-header');
  const sentinel = document.querySelector('.hero-sentinel');
  if (!header || !sentinel) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      header.dataset.state = entry.isIntersecting ? '' : 'scrolled';
      // Remove attribute entirely when back at top for clean CSS state
      if (entry.isIntersecting) {
        delete header.dataset.state;
      }
    },
    { threshold: 0 }
  );
  observer.observe(sentinel);
}());
```

**CSS hook (already in main.css, lines 556-563):**
```css
.header[data-state="scrolled"] {
  box-shadow: var(--shadow-md);
}
.header[data-state="hidden"] {
  transform: translateY(-100%);
}
```

**Note:** The UI-SPEC specifies the header contract uses `data-scrolled` attribute (not `data-state="scrolled"`). The existing CSS in main.css uses `data-state="scrolled"`. The planner must decide which attribute name to use and ensure JS and CSS are consistent. See Open Questions.

[VERIFIED: reading assets/css/main.css lines 556-563 directly]
[CITED: UI-SPEC line 126 — `data-scrolled` naming]

### Pattern 2: Full-Screen Overlay Mobile Menu

**What:** A `<div id="mobile-menu" role="dialog">` overlays the entire viewport when hamburger is tapped. Focus is trapped inside. Escape, close button, and anchor clicks all dismiss it.

**JS pattern:**
```javascript
// Source: UI-SPEC interaction contract + WCAG 2.1 keyboard navigation pattern
(function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const FOCUSABLE = 'a[href], button:not([disabled])';

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    menu.dataset.open = 'true';
    document.body.style.overflow = 'hidden';
    // Move focus to first focusable element inside overlay
    const firstFocusable = menu.querySelector(FOCUSABLE);
    if (firstFocusable) firstFocusable.focus();
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    delete menu.dataset.open;
    document.body.style.overflow = '';
    toggle.focus(); // Return focus to trigger
  }

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  // Close on anchor link click (auto-navigate + close)
  menu.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Focus trap — cycle Tab within overlay
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = [...menu.querySelectorAll(FOCUSABLE)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}());
```

[CITED: UI-SPEC lines 138-160 — full interaction contract]

### Pattern 3: SVG Placeholder Image Generation

**What:** SVG text files that display section name and dimensions as colored rectangles. No external tools required.

**SVG template:**
```xml
<!-- Source: D-07 + UI-SPEC Asset Production Contract -->
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="800" viewBox="0 0 1400 800">
  <rect width="1400" height="800" fill="#F5EDEE" stroke="#DFD0D2" stroke-width="2" stroke-dasharray="8,4"/>
  <text x="700" y="390" font-family="Lato, sans-serif" font-size="18" fill="#6B5557"
        text-anchor="middle" dominant-baseline="middle">Hero — 1400×800</text>
  <text x="700" y="420" font-family="Lato, sans-serif" font-size="13" fill="#6B5557"
        text-anchor="middle" dominant-baseline="middle">PLACEHOLDER: Replace with real photography before launch</text>
</svg>
```

### Pattern 4: Favicon SVG

**What:** 32x32 viewbox SVG with cream background rectangle and wine-colored "P" path.

**Approach:** Use SVG `<text>` element referencing a generic serif fallback (Cormorant Garamond won't be available in favicon context anyway). Alternatively, trace the "P" letterform as a `<path>` for pixel-perfect rendering. The simpler `<text>` approach is acceptable for placeholder quality — the real favicon should use a path before launch.

```xml
<!-- Source: D-10, D-11, UI-SPEC Favicon section -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#FBF5F5"/>
  <text x="16" y="24" font-family="Georgia, serif" font-size="22" font-weight="400"
        fill="#7A2D3A" text-anchor="middle">P</text>
</svg>
```

### Pattern 5: site.webmanifest

```json
{
  "name": "Ristorante Paganini",
  "short_name": "Paganini",
  "icons": [
    { "src": "apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ],
  "theme_color": "#7A2D3A",
  "background_color": "#7A2D3A",
  "display": "browser"
}
```

[VERIFIED: UI-SPEC lines 247-259 — exact content specified]

### Anti-Patterns to Avoid

- **scroll event listener for header:** Blocks main thread, causes jank. Use IntersectionObserver only.
- **Inline event handlers (`onclick=`):** Forbidden by project convention; all handlers in main.js only.
- **`<script>` tags in `<body>`:** Use `<script defer>` in `<head>` only.
- **Class toggling for JS state:** CUBE CSS convention uses `data-` attributes for exceptions/state — toggle `data-state` not class names.
- **Importing fonts in SVG favicons:** Favicon rendering context won't load external fonts; use Georgia/serif fallback.
- **`loading="lazy"` on hero image:** Hero is the LCP element — must use `loading="eager" fetchpriority="high"`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Non-blocking JS loading | Async module loader | `defer` attribute | Single attribute; zero complexity; exact same result |
| Smooth scroll | JS scroll animation with easing | CSS `scroll-behavior: smooth` | Already in main.css; prefers-reduced-motion respected automatically |
| Scroll offset for sticky header | JS scroll position math | `scroll-padding-top: var(--header-height)` | Already in main.css line 177; CSS handles it |
| Focus trap library | Custom focusable-elements walker | Manual `querySelectorAll(FOCUSABLE)` + keydown | Project has zero-dependency constraint; the focus trap needed here is simple (nav links + close button only) |
| AVIF/WebP image conversion tools | Squoosh CLI (deprecated 2023) | Squoosh.app (browser) or ImageMagick CLI | Phase 2 uses SVG placeholders; real conversion is POST-01 |
| ICO conversion | Python pillow script or custom | Any free SVG-to-ICO web tool or ImageMagick | Single one-time conversion; not automatable in no-build pipeline |

**Key insight:** This phase's complexity is entirely in the JS interaction contracts. The hard parts (CSS state hooks, design tokens, font loading) are already done in Phase 1. Phase 2 wires them up.

---

## Common Pitfalls

### Pitfall 1: data-attribute naming mismatch between JS and CSS

**What goes wrong:** JS sets `data-scrolled="true"` but CSS selector is `[data-state="scrolled"]` — header state never applies visually.
**Why it happens:** The UI-SPEC uses `data-scrolled` naming while main.css uses `data-state="scrolled"`. Both are in the codebase and they differ.
**How to avoid:** Pick one convention before writing any code. Recommendation: use `data-state="scrolled"` to match the existing main.css exceptions block (lines 556-563) and avoid editing the already-complete CSS file.
**Warning signs:** Header scrolls but box-shadow never appears in browser DevTools.

[VERIFIED: Confirmed mismatch between main.css line 556 (`[data-state="scrolled"]`) and UI-SPEC line 126 (`data-scrolled`) by reading both files directly]

### Pitfall 2: Smooth scroll broken by scroll-padding-top missing

**What goes wrong:** Anchored sections scroll to the correct element but the sticky header overlaps the section heading.
**Why it happens:** Forgetting to add `scroll-padding-top` to `<html>`.
**How to avoid:** Already solved — main.css line 177 sets `scroll-padding-top: var(--header-height)`. No action required in Phase 2.
**Warning signs:** Section headings appear under the sticky header after clicking anchor nav links.

[VERIFIED: main.css line 177 confirmed]

### Pitfall 3: Mobile menu focus escapes overlay

**What goes wrong:** Tab key from last link inside overlay focuses browser chrome or page elements behind the overlay — keyboard trap incomplete.
**Why it happens:** Focus trap must explicitly intercept Tab + Shift+Tab at boundaries.
**How to avoid:** Implement Tab keydown handler that checks `document.activeElement` against first/last focusable elements and wraps manually.
**Warning signs:** DevTools Accessibility panel shows no focus containment; Tab from close button reaches page background.

### Pitfall 4: `aria-expanded` not updated on menu close via anchor click

**What goes wrong:** User taps a nav link, menu closes visually, but `aria-expanded` stays `"true"` — screen readers announce menu as open when it isn't.
**Why it happens:** Close triggered by link click doesn't call the same `closeMenu()` function that resets aria state.
**How to avoid:** Route all close paths through a single `closeMenu()` function that always sets `aria-expanded="false"`.

### Pitfall 5: body overflow:hidden not restored after menu close

**What goes wrong:** Page permanently loses scroll after menu is used.
**Why it happens:** If close path has an exception, the `overflow: hidden` set on `<body>` is never cleared.
**How to avoid:** Restore `document.body.style.overflow = ''` in every close code path — the single `closeMenu()` function handles this.

### Pitfall 6: Path resolution from language subdirectories

**What goes wrong:** `<script src="assets/js/main.js">` works from root but 404s when page is at `/de/index.html`.
**Why it happens:** Relative paths resolve from the HTML file's directory. From `/de/`, `assets/js/main.js` resolves to `/de/assets/js/main.js` which doesn't exist.
**How to avoid:** Use `../assets/js/main.js` for all pages in language subdirectories (`/de/`, `/en/`, `/it/`). Consistently apply the same relative-path convention to CSS, fonts, images, and favicons.

[CITED: UI-SPEC Implementation Notes item 7 — "relative paths from the page's own directory"]

### Pitfall 7: SVG favicon using live `<text>` with webfont reference

**What goes wrong:** Favicon looks correct in dev (font cached) but renders as blank "P" in a different font at small sizes in browser tab — because Cormorant Garamond isn't loaded in the favicon rendering context.
**Why it happens:** Browser favicon renders in isolation; webfonts don't apply.
**How to avoid:** Use Georgia or a generic `serif` fallback in favicon SVG `<text>` element, OR convert letterform to a `<path>` before launch. The `<text>` approach with Georgia fallback is acceptable for development; path is preferred for production.

---

## Code Examples

### main.js File Structure

```javascript
// assets/js/main.js
// Ristorante Paganini — all interactive behaviors
// Single file, no dependencies, ES2020+, loaded via defer

/* ============================================================
 * 1. STICKY HEADER — IntersectionObserver on hero sentinel
 * ============================================================ */
(function initStickyHeader() {
  // ... (see Pattern 1 above)
}());

/* ============================================================
 * 2. MOBILE MENU — full-screen overlay with focus trap
 * ============================================================ */
(function initMobileMenu() {
  // ... (see Pattern 2 above)
}());

/* ============================================================
 * 3. SMOOTH SCROLL — handled by CSS; no JS needed
 *    scroll-behavior: smooth + scroll-padding-top already in
 *    main.css global reset (lines 177-179)
 * ============================================================ */
// No JS required — CSS handles this completely
```

### HTML head link tags for favicons (all pages Phase 3 onward)

```html
<!-- Favicon set — SEO-09 -->
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="../assets/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="../assets/apple-touch-icon.png">
<link rel="manifest" href="../assets/site.webmanifest">
```

Note: paths use `../assets/` (relative from `/de/`, `/en/`, `/it/` subdirectories).

### apple-touch-icon.png generation

No build pipeline. Two approaches:
1. Open `favicon.svg` in browser, screenshot at 180x180, save as PNG (manual)
2. Use ImageMagick: `magick favicon.svg -resize 180x180 apple-touch-icon.png`
3. Use Squoosh.app or any free SVG-to-PNG tool online

The file will be a static binary asset committed directly to the repo.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `onscroll` event listener for sticky header | IntersectionObserver sentinel | Chrome 51+ (2016), wide adoption ~2019 | Eliminates main-thread blocking scroll handlers |
| JavaScript scroll animation libraries | CSS `scroll-behavior: smooth` | Safari support landed in 14.1 (2021); universal by 2022 | Zero JS for smooth scrolling |
| Multiple favicon sizes (16, 32, 48, 57, 72, 96, 128, 180, 192, 512...) | 4-file minimal set: SVG + ICO + apple-touch-icon + webmanifest | Evil Martians guide 2021, updated 2024 | 99%+ device coverage with 4 files instead of 20+ |
| Native `<img loading="lazy">` not reliable | Native lazy loading universally supported | Chrome 76+ (2019), Firefox 75+ (2020), Safari 15.4+ (2022) | No lazy-loading library needed |

**Deprecated/outdated:**
- `Squoosh CLI`: Deprecated 2023, unmaintained. Use Squoosh.app (browser) or ImageMagick CLI instead. [CITED: CLAUDE.md "What NOT to Use" table]
- jQuery: 87KB; all needed APIs are native ES2020. [CITED: CLAUDE.md "What NOT to Use" table]

---

## Runtime State Inventory

Step 2.5: SKIPPED — this is not a rename/refactor/migration phase. Phase 2 creates new files only.

---

## Environment Availability

Phase 2 is purely code and static file creation. No external services, databases, or runtime dependencies. The only optional tool is ImageMagick for ICO/PNG favicon conversion from SVG.

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Node.js / npm | Package installs | N/A | N/A | No packages needed |
| ImageMagick | favicon.ico + apple-touch-icon.png from SVG | Not verified | — | Manual: use online SVG-to-ICO/PNG tool (e.g., favicon.io, convertio.co) |
| Browser (Chrome/Safari) | Lighthouse test for PERF-03 | Assumed present | — | No fallback needed |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:**
- ImageMagick (ICO/PNG generation): fallback is any free online SVG-to-ICO/PNG converter. The generated files are committed as binary assets; the tool is only needed once.

---

## Validation Architecture

`nyquist_validation` is enabled (key absent from config defaults to enabled).

### Test Framework

This project has no existing test infrastructure. Phase 2 is vanilla HTML/CSS/JS with no module system or package.json — standard JS test frameworks (Jest, Vitest) require Node.js module resolution.

| Property | Value |
|----------|-------|
| Framework | None — manual browser testing + Lighthouse |
| Config file | None — Wave 0 gap |
| Quick run command | Open `assets/css/test.html` in browser (visual smoke test) |
| Full suite command | Lighthouse CLI or browser DevTools Lighthouse panel |

**Rationale for manual testing:** The behaviors in this phase (IntersectionObserver, focus trap, CSS transitions) are UI interaction behaviors that require a real browser DOM. A headless unit test of the JS functions is possible but would require a DOM shim (jsdom) and adds a dependency that violates the project constraint of no build tools.

The pragmatic verification approach is:
1. Open a test HTML page in Chrome and Safari Mobile (real browser)
2. Verify sticky header state transitions visually
3. Verify mobile menu open/close/keyboard behavior
4. Run Lighthouse to confirm PERF-03 (no render-blocking JS)

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-04 | Header gets `data-state="scrolled"` on scroll past hero | Manual browser | Open test.html, scroll down | ❌ Wave 0 |
| FOUND-05 | Hamburger toggles `aria-expanded`, focus trap works, Escape closes | Manual browser | Open test.html, use keyboard | ❌ Wave 0 |
| FOUND-06 | Anchor click scrolls smoothly, header doesn't obscure heading | Manual browser | Open test.html, click nav links | ❌ Wave 0 |
| FOUND-08 | picture elements have AVIF/WebP/JPEG sources, all img have width+height | HTML validator | W3C validator on test page | ❌ Wave 0 |
| PERF-03 | No render-blocking JS in Lighthouse report | Automated (Lighthouse) | `npx lighthouse file:///.../test.html --only-categories=performance` | ❌ Wave 0 |
| PERF-04 | main.js is the only script, no inline scripts | Code review / grep | `grep -r "<script" de/index.html` (Phase 3 onward) | N/A Phase 2 |
| SEO-09 | Four favicon link tags present, webmanifest valid JSON | HTML validator + browser | Check browser tab icon appears | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** Open `assets/css/test.html` in browser, visually verify changed behavior
- **Per wave merge:** Full Lighthouse run on test page
- **Phase gate:** Manual checklist of all 5 success criteria before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `assets/css/test.html` — needs a minimal test harness page with header, hero sentinel, mobile menu markup, and nav anchor links so behaviors can be tested without waiting for Phase 3 HTML page
- [ ] Lighthouse can run against test.html once it has correct script/link references

Note: `assets/css/test.html` already exists (seen in directory listing) but its current content is unknown — may already serve as a test harness from Phase 1, or may need expansion to include JS test scaffolding.

---

## Security Domain

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Not applicable — static site, no login |
| V3 Session Management | No | Not applicable — no sessions |
| V4 Access Control | No | Not applicable — all content public |
| V5 Input Validation | No | Phase 2 has no user input; no forms in this phase |
| V6 Cryptography | No | Not applicable — no secrets, no encryption |

**Threat patterns relevant to Phase 2:**

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Malicious anchor `href` in mobile menu | Tampering | All anchor hrefs are hardcoded in HTML (not user-provided); no dynamic href construction in JS |
| XSS via `innerHTML` in JS | Tampering | Do not use `innerHTML` to inject any content; use `dataset` attribute manipulation only |
| Clickjacking via overlay | Spoofing | `role="dialog" aria-modal="true"` on overlay is correct; no X-Frame-Options needed on static assets |

Phase 2 security surface is minimal. The only JS actions are toggling `dataset` properties and `body.style.overflow` — no DOM injection, no fetch calls, no user data handled.

---

## Project Constraints (from CLAUDE.md)

All directives below are binding on the planner and executor:

| Constraint | Directive |
|------------|-----------|
| Tech stack | Plain HTML5, CSS3, vanilla JavaScript ONLY — no frameworks, no build tools, no npm packages |
| Single JS file | `assets/js/main.js` — all behaviors in one file, `defer` attribute, zero inline scripts |
| Single CSS file | `assets/css/main.css` — do not split; no `@import` |
| No Google Fonts CDN | Self-hosted woff2 only — already done in Phase 1 |
| No jQuery | Use vanilla JS DOM APIs |
| No animation libraries | GSAP, AOS, etc. forbidden — CSS transitions only |
| No Squoosh CLI | Deprecated 2023 — use Squoosh.app (browser) or ImageMagick |
| Hero image | `loading="eager" fetchpriority="high"` — NEVER lazy load the LCP element |
| `width` + `height` on every `<img>` | Prevents CLS — mandatory |
| CUBE CSS `data-` attributes | JS toggles `data-` attributes for state; CSS selects on them |
| Relative paths from language dirs | `../assets/` prefix for all assets referenced from `/de/`, `/en/`, `/it/` |
| No `font-display: block` | Use `font-display: swap` only — already set in Phase 1 |
| Agency-friendly HTML comments | Mark editable areas, placeholders, and sync-required values |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `assets/css/test.html` exists but content is unknown — may need extension for JS testing | Validation Architecture | Low: worst case is creating a new test file |
| A2 | `favicon.ico` will be a 32x32 single-resolution ICO for simplicity; multi-resolution (32+16) is better practice | Architecture Patterns | Low: multi-resolution ICO is trivially generated; 32x32 alone is acceptable for all modern browsers |
| A3 | apple-touch-icon.png will be generated from favicon SVG using a manual/online tool rather than ImageMagick (tool availability not confirmed) | Environment Availability | Low: result is identical regardless of tool used |

[ASSUMED: A1-A3 — based on reasonable inference, not verified]

---

## Open Questions (RESOLVED)

1. **data-attribute naming: `data-scrolled` (UI-SPEC) vs `data-state="scrolled"` (main.css)**
   - What we know: main.css exceptions block (lines 556-563) uses `[data-state="scrolled"]` and `[data-state="hidden"]`. UI-SPEC uses `data-scrolled="true"`.
   - What's unclear: Which should the JS use?
   - Recommendation: Use `data-state="scrolled"` to match the already-written CSS. No CSS edit required. The UI-SPEC naming was an approximation; the CSS file is the ground truth.

2. **Does main.js need a "scroll up/down detection" for the `data-state="hidden"` behavior?**
   - What we know: D-01 says "header hides on scroll down, reappears on scroll up." main.css has `[data-state="hidden"]` with `transform: translateY(-100%)`. But the UI-SPEC describes only two states: transparent and scrolled (solid). The hide/show directional behavior would require tracking scroll direction.
   - What's unclear: Is the hide-on-scroll-down behavior actually required, or just the transparent-vs-solid toggle?
   - Recommendation: Implement both states. Use a `lastScrollY` variable to detect scroll direction. Set `data-state="hidden"` when scrolling down past hero; `data-state="scrolled"` when scrolling up past hero; remove attribute when at top. The CSS for `hidden` is already present.

3. **apple-touch-icon.png generation tooling**
   - What we know: No build pipeline. ImageMagick availability on developer machine unconfirmed.
   - What's unclear: What tool is available?
   - Recommendation: Generate via Squoosh.app (browser-based) or note the online fallback in the task. The file is a one-time binary asset — generation method doesn't affect quality.

---

## Sources

### Primary (HIGH confidence)
- `assets/css/main.css` — Read directly: confirmed scroll-behavior, scroll-padding-top, data-state CSS hooks, all design tokens
- `.planning/phases/02-js-and-asset-foundation/02-CONTEXT.md` — Read directly: all locked decisions D-01 through D-12
- `.planning/phases/02-js-and-asset-foundation/02-UI-SPEC.md` — Read directly: full interaction behavior contract, asset production contract
- `CLAUDE.md` — Read directly: all hard constraints, technology stack, what-not-to-use table

### Secondary (MEDIUM confidence)
- MDN Web Docs (training knowledge, not verified this session): IntersectionObserver API, aria-expanded, picture element, webmanifest format
- Evil Martians favicon guide (cited in CLAUDE.md sources): 4-tag minimal favicon approach

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all specified in CLAUDE.md and confirmed by reading existing Phase 1 CSS
- Architecture: HIGH — fully specified in UI-SPEC and CONTEXT.md; no open decisions remain
- Pitfalls: HIGH — data-attribute mismatch verified by reading both files; other pitfalls are standard JS/HTML patterns from training knowledge
- Validation: MEDIUM — no existing test infrastructure; manual browser testing is the pragmatic approach for UI behaviors

**Research date:** 2026-04-07
**Valid until:** 2026-07-07 (stable vanilla HTML/CSS/JS domain; 90-day validity appropriate)
