# Phase 7: Root Redirect - Research

**Researched:** 2026-04-08
**Domain:** Browser language detection, JS redirect, HTML meta redirect, no-JS fallback
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Minimal branded flash during redirect — brief display of restaurant name/logo centered on a styled background, visible for ~100ms before the JS redirect fires
- **D-02:** Use `window.location.replace()` for all redirects — prevents back-button loops
- **D-03:** No language persistence — every visit re-detects via `navigator.language` / `navigator.languages`. No cookies or localStorage
- **D-04:** Root URL is a pure redirect utility — always redirects immediately, no manual language picker
- **D-05:** `<meta name="robots" content="noindex">` on root page
- **D-06:** `<noscript>` fallback with `<meta http-equiv="refresh" content="0;url=/de/">` for no-JS browsers
- **D-07:** Unrecognized languages redirect to `/de/` as default fallback
- **D-08:** Claude decides exact language matching — whether to use just `navigator.language` or iterate `navigator.languages`
- **D-09:** Claude decides regional variant handling (de-AT → /de/, en-US → /en/, it-CH → /it/) — standard prefix matching expected
- **D-10:** Root `index.html` contains no visible content beyond minimal branded flash
- **D-11:** Root page NOT listed in sitemap.xml (Phase 8 handles this)
- **D-12:** Page carries `noindex` meta tag

### Claude's Discretion

- D-08: Exact language matching implementation (`navigator.language` vs `navigator.languages` iteration)
- D-09: Regional variant handling strategy (prefix matching approach)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LANG-04 | Root index.html with browser language detection and default redirect to /de/ | navigator.languages API, window.location.replace(), noscript meta refresh, noindex meta tag |
</phase_requirements>

---

## Summary

Phase 7 builds a single root `index.html` that acts as a language-detection redirect utility. The file is extremely simple: a minimal HTML shell with inline CSS for a brief branded flash, a small inline `<script>` block for language detection, a `<noscript>` fallback, and required SEO meta tags to keep it out of search indexes.

The entire implementation is vanilla HTML + inline CSS + inline JS — no external dependencies, no file imports beyond the favicon set. The branded flash (restaurant name on dark background) is achieved with a few lines of inline CSS applied directly to the `<body>` element, referencing the design tokens from `main.css` is deliberately avoided to prevent a blocking stylesheet request on a page the user exits in under 100ms.

The correct redirect pattern is `window.location.replace()` rather than `window.location.href` assignment or `<meta http-equiv="refresh">` — replace() rewrites the history entry so the back button skips the redirect page entirely. Language matching iterates `navigator.languages` (the full preference array) rather than just `navigator.language` (first preference only), checking a prefix match (`startsWith('de')`, etc.) for each entry before falling back to German.

**Primary recommendation:** Single lightweight `index.html` at project root — inline CSS for branded flash, inline JS for language detection, noscript meta refresh for fallback, noindex + nofollow robots meta. No external stylesheet link. No fonts preloaded (flash is fast enough without them).

---

## Standard Stack

### Core

| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|--------------|
| HTML5 | Living Standard | Redirect page shell | Matches all other pages in project; `<!DOCTYPE html>` required |
| Inline CSS | — | Branded flash styling | Prevents render-blocking stylesheet request on a zero-content redirect page |
| Vanilla JS ES2020 | — | Language detection + redirect | Matches project constraint; `navigator.languages` has universal modern browser support |
| `<meta http-equiv="refresh">` in `<noscript>` | — | No-JS fallback to /de/ | MDN-documented pattern for no-JS redirect; wrapped in `<noscript>` so JS browsers ignore it |

### No External Dependencies

This page intentionally imports nothing. Do NOT link `../assets/css/main.css` — it would add a blocking HTTP request for a page the user leaves in under 100ms. All styling is inline. [VERIFIED: codebase inspection — CONTEXT.md D-10 confirms minimal content; performance principle from CLAUDE.md]

---

## Architecture Patterns

### Recommended File

Single new file: `/index.html` at project root. No subdirectory. No other files created.

### Document Structure

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ristorante Paganini</title>

  <!-- SEO: keep this page out of search indexes -->
  <meta name="robots" content="noindex, nofollow">

  <!-- No-JS fallback: sends JS-disabled browsers to /de/ immediately -->
  <noscript>
    <meta http-equiv="refresh" content="0;url=/de/">
  </noscript>

  <!-- Favicon references (paths from root, no ../ needed) -->
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="assets/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
  <link rel="manifest" href="assets/site.webmanifest">

  <!-- Inline styles for branded flash only -->
  <style>
    /* ... minimal branded flash ... */
  </style>
</head>
<body>
  <!-- Branded flash content -->

  <script>
    /* Language detection + redirect */
  </script>
</body>
</html>
```

### Pattern 1: Language Detection with navigator.languages

**What:** Iterate the full browser language preference array (`navigator.languages`), check each entry against the three supported prefixes, redirect on first match. Fall back to `/de/` if no match.

**When to use:** Always — `navigator.languages` covers multilingual users better than `navigator.language` alone. A user with `['fr', 'de', 'en']` will correctly land on `/de/` rather than an unrecognized-language fallback.

**Why `navigator.languages` over `navigator.language`:** [VERIFIED: MDN] `navigator.languages` returns the full ordered preference array; `navigator.language` returns only the first. Using the full array means a French user who also speaks German gets the German version rather than an unrecognized fallback.

**Example:**
```javascript
// Source: MDN Web Docs — navigator.languages [VERIFIED: MDN]
(function() {
  var langs = navigator.languages || [navigator.language || 'de'];
  var map = { de: '/de/', en: '/en/', it: '/it/' };

  for (var i = 0; i < langs.length; i++) {
    var prefix = langs[i].toLowerCase().split('-')[0];
    if (map[prefix]) {
      window.location.replace(map[prefix]);
      return;
    }
  }
  // Fallback: no match found
  window.location.replace('/de/');
})();
```

**Why IIFE:** Avoids polluting the global scope, runs immediately on parse. [ASSUMED]

**Why `split('-')[0]`:** Regional variants like `de-AT`, `en-US`, `it-CH`, `de-CH` all correctly resolve to their base language prefix. [VERIFIED: standard string parsing — no library needed]

**Why `window.location.replace()` not `window.location.href`:** [VERIFIED: MDN] `replace()` removes the current page from session history — the back button skips the redirect page. `href` assignment pushes to history, creating a back-button loop.

### Pattern 2: Branded Flash Inline Styles

**What:** A few lines of inline CSS targeting `body` and a single centered element. Uses the same color tokens as `main.css` — but hardcoded as literal values, not CSS variable references, since `main.css` is not loaded on this page.

**Design tokens to mirror (from main.css):**

| Token | Value | Use |
|-------|-------|-----|
| `--color-surface-dark` | `#2C1A1D` | Background color |
| `--color-text-inverse` | `#FBF5F5` | Text color |
| `--font-heading` stack | `'Cormorant Garamond', Georgia, serif` | Restaurant name display |

**Why hardcode values instead of linking main.css:** The page exits in < 100ms. A `<link rel="stylesheet">` request would be a blocking HTTP request that delays the redirect for no benefit. [ASSUMED — logical performance reasoning; consistent with CLAUDE.md "No render-blocking JavaScript" principle and single-stylesheet guidance]

**Example:**
```css
/* Inline in <style> tag — no external link */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  height: 100%;
  background-color: #2C1A1D;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flash {
  color: #FBF5F5;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  text-align: center;
}
```

### Pattern 3: noscript Meta Refresh

**What:** `<meta http-equiv="refresh" content="0;url=/de/">` wrapped in `<noscript>` so JS-capable browsers never see it.

**Why it works for bots:** Search engine crawlers that disable JS will follow the meta refresh to `/de/` — the canonical, indexed version. The `noindex` on the root page plus the meta refresh ensures Googlebot never indexes the redirect page. [CITED: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics]

**Note:** The `<noscript>` block must be inside `<head>` for the meta refresh to work. Placing it in `<body>` renders it as visible text in some browsers. [ASSUMED — standard practice; MDN does not document this edge case explicitly]

### Anti-Patterns to Avoid

- **Linking main.css:** Adds a blocking HTTP round-trip on a page the user exits in milliseconds. Use inline `<style>` only.
- **Using `window.location.href =`:** Pushes to history — causes back-button loop to redirect page.
- **Using only `navigator.language`:** Misses multilingual users whose secondary language is a supported one.
- **Using `<meta http-equiv="refresh">` outside `<noscript>`:** Runs for all browsers including JS-capable ones — creates double redirect risk and is unnecessary.
- **Loading fonts via `<link rel="preload">`:** Not worth the overhead for a flash page. System serif fallback (`Georgia, serif`) renders instantly and is visually acceptable for ~100ms.
- **Adding hreflang tags to the root redirect page:** The root page is not a content page and should not be part of the hreflang cluster. Each language page already has its own `x-default` pointing to `/de/`. [VERIFIED: hreflang docs — cluster members must be indexable pages]
- **Adding canonical link to root page:** A redirect-only page should not claim canonical status. The `noindex` meta handles its SEO status sufficiently. [ASSUMED]
- **Visible content or sections:** Root page must contain no semantic sections, headings, or body content beyond the minimal branded flash span. It is not a page — it is a redirect.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Language matching with regional variants | Complex regex or BCP-47 parser | `split('-')[0]` prefix check | Three languages, clean prefix match is sufficient; BCP-47 library overkill |
| History manipulation to skip back-button | Custom popstate handler | `window.location.replace()` | Native API purpose-built for this; zero code needed |
| No-JS redirect | Custom service worker or server rule | `<meta http-equiv="refresh">` in `<noscript>` | Already a native HTML mechanism; works in all browsers |
| Styled loading screen | Animation library or full component | 10 lines of inline CSS | Flash is ~100ms — animation would never complete |

**Key insight:** Every "problem" in this phase already has a native browser API solution. The entire implementation is 40–60 lines of HTML.

---

## Common Pitfalls

### Pitfall 1: Back-Button Loop

**What goes wrong:** User lands on root → redirected to `/de/` → presses back → returns to root → redirected again → infinite loop.

**Why it happens:** Using `window.location.href = '/de/'` pushes a history entry. The root page remains in history.

**How to avoid:** Use `window.location.replace('/de/')` exclusively. This replaces the current history entry rather than adding one.

**Warning signs:** Back button from `/de/` returns to root URL instead of the previous external page.

### Pitfall 2: navigator.languages Not Available

**What goes wrong:** `navigator.languages` is `undefined` in very old browsers or restricted environments (some headless browsers, Cypress without config).

**Why it happens:** `navigator.languages` was added to browsers in 2014–2015. Very old mobile browsers may not have it.

**How to avoid:** Use the fallback pattern: `var langs = navigator.languages || [navigator.language || 'de']` — wraps in array if array not available, falls back to single language, falls back to 'de' string if neither exists.

**Warning signs:** TypeError on `navigator.languages.length` in test environments.

### Pitfall 3: Relative vs Root-Relative URLs in Redirect

**What goes wrong:** Using `./de/` instead of `/de/` — relative URL resolves differently depending on how the root is served (some static hosts serve `/index.html` at the root, path resolution can vary).

**Why it happens:** Copying URL patterns from language subdirectory pages where `../` is used for assets.

**How to avoid:** Always use root-relative paths starting with `/` in `window.location.replace()` and in the noscript meta refresh URL.

**Warning signs:** Redirect works locally but fails on CDN or static host with custom routing.

### Pitfall 4: noscript in body Instead of head

**What goes wrong:** `<meta http-equiv="refresh">` inside `<noscript>` in `<body>` may be treated as visible text rather than a redirect instruction in some browser/bot implementations.

**Why it happens:** Meta elements are head elements — placing them in body is technically invalid HTML, which browsers handle inconsistently.

**How to avoid:** Place the `<noscript>` block inside `<head>`, not `<body>`.

### Pitfall 5: Favicon Path Error

**What goes wrong:** Favicon links in language page files use `../assets/` (relative up from `/de/`). Root `index.html` is at the root level — the correct path is `assets/` (no `../`).

**Why it happens:** Copy-paste from `de/index.html` without adjusting relative paths.

**How to avoid:** All asset references in root `index.html` must use `assets/` not `../assets/`.

**Warning signs:** Browser console shows 404 for favicon.svg when loading root URL.

### Pitfall 6: Robots Meta Tag Missing

**What goes wrong:** Root page gets indexed by Google, appearing in search results as a blank/flash page with no useful content.

**Why it happens:** Forgetting the `<meta name="robots" content="noindex, nofollow">` tag.

**How to avoid:** The robots meta must be the second or third tag in `<head>`, immediately after charset and viewport. Phase success criterion 3 explicitly requires this.

---

## Code Examples

### Complete Language Detection Script

```javascript
// Source: MDN navigator.languages [VERIFIED: MDN] + window.location.replace [VERIFIED: MDN]
// Inline in <script> at end of <body>
(function () {
  'use strict';
  var supported = { de: '/de/', en: '/en/', it: '/it/' };
  var langs = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || 'de'];

  for (var i = 0; i < langs.length; i++) {
    var prefix = langs[i].toLowerCase().split('-')[0];
    if (supported[prefix]) {
      window.location.replace(supported[prefix]);
      return;
    }
  }
  // No supported language found — default to German
  window.location.replace('/de/');
}());
```

### Complete noscript Fallback (in `<head>`)

```html
<!-- No-JS fallback: redirects JS-disabled browsers to German default -->
<!-- Source: HTML Living Standard — meta http-equiv refresh [CITED: https://html.spec.whatwg.org/multipage/semantics.html#attr-meta-http-equiv-refresh] -->
<noscript>
  <meta http-equiv="refresh" content="0;url=/de/">
</noscript>
```

### Minimal Branded Flash HTML

```html
<!-- Minimal branded flash — no visible text required beyond restaurant name -->
<!-- Inline style avoids blocking HTTP request for main.css -->
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    height: 100%;
    background-color: #2C1A1D;  /* --color-surface-dark from main.css */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .redirect-flash {
    color: #FBF5F5;              /* --color-text-inverse from main.css */
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 400;
    letter-spacing: 0.06em;
    text-align: center;
    opacity: 0.9;
  }
</style>

<!-- Branded flash in <body> -->
<div class="redirect-flash" aria-hidden="true">Ristorante Paganini</div>
```

Note: `aria-hidden="true"` on the flash element — it is a visual-only transitional element, not meaningful content. Screen readers should not announce it. [ASSUMED — accessible UX principle]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Server-side `Accept-Language` header redirect | Client-side `navigator.languages` JS redirect | Static hosting era | Server approach not available on static hosts without server config access |
| `window.location.href = url` | `window.location.replace(url)` | Long-standing best practice | Prevents back-button loop — the only correct approach for redirect pages |
| Single `navigator.language` check | `navigator.languages` array iteration | Browser support ~2015 | Better coverage for multilingual users |
| `<meta http-equiv="refresh">` for everyone | `<meta http-equiv="refresh">` inside `<noscript>` only | HTML best practice | JS-capable browsers skip it; only no-JS path uses it |

**Deprecated / avoid:**
- `document.cookie` or `localStorage` for language persistence — not needed here (D-03 explicitly forbids it)
- `location.reload()` as any part of redirect logic — never appropriate
- HTTP 302 redirect via `.htaccess` — only valid on Apache hosts; this project is static-file hosted and must not assume server config

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Linking main.css on the redirect page adds a blocking request that delays redirect | Architecture Patterns — Pattern 2 | Low: even if non-blocking, inline CSS is still preferable for a zero-content page |
| A2 | `aria-hidden="true"` is appropriate on the flash element | Code Examples | Low: element is purely decorative; worst case a screen reader announces "Ristorante Paganini" once |
| A3 | `<noscript>` inside `<head>` is required for meta refresh to function correctly in all browsers | Common Pitfalls — Pitfall 4 | Medium: if browsers actually accept it in `<body>` consistently, this is a non-issue; but placing in `<head>` is always safe |
| A4 | IIFE wrapping prevents global scope pollution (good practice for inline scripts) | Architecture Patterns — Pattern 1 | Low: no other scripts on the page, so pollution is moot; IIFE is still cleaner style |

---

## Open Questions

1. **Font availability during flash**
   - What we know: Cormorant Garamond is self-hosted in `assets/fonts/` and declared in `main.css`. The redirect page does not link `main.css`.
   - What's unclear: Should the redirect page include a minimal `@font-face` declaration inline, or rely on Georgia fallback for the ~100ms flash?
   - Recommendation: Use Georgia fallback — no `@font-face` inline. The flash is too brief to matter, and adding font loading infrastructure to a redirect page is counterproductive. The FOUT from Georgia → Cormorant Garamond would be visible if the page somehow lingered, but it won't.

2. **Serving environment path assumptions**
   - What we know: All redirect targets use root-relative paths (`/de/`, `/en/`, `/it/`).
   - What's unclear: If the site is opened via `file://` protocol (local file system without a server), root-relative paths will resolve to filesystem root, not the project directory.
   - Recommendation: Document this as a known limitation — root-relative paths require a local server (e.g., `npx serve .` or VS Code Live Server) for local testing. This is standard for any multilingual static site. Include a comment in the HTML.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 7 produces a single static HTML file with no external tool dependencies. All redirect logic is native browser JavaScript. No build step, no CLI tools, no external services required.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual browser testing (no automated test framework in project) |
| Config file | None |
| Quick run command | Open `index.html` via local server, check redirect behavior |
| Full suite command | Test in Chrome (DE), Chrome (EN), Chrome (IT), Chrome (FR as unrecognized), no-JS mode |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LANG-04 | German browser → /de/ redirect via replace() | manual smoke | Open root with DE lang, verify URL changes to /de/ and back button skips root | Wave 0 N/A |
| LANG-04 | English browser → /en/ redirect | manual smoke | Chrome DevTools override language to en-US | Wave 0 N/A |
| LANG-04 | Italian browser → /it/ redirect | manual smoke | Chrome DevTools override language to it-IT | Wave 0 N/A |
| LANG-04 | Unrecognized browser (fr-FR) → /de/ fallback | manual smoke | Chrome DevTools override language to fr-FR | Wave 0 N/A |
| LANG-04 | noindex meta present | automated | `grep -i "noindex" index.html` | ❌ Wave 0 (file not created yet) |
| LANG-04 | noscript meta refresh present | automated | `grep -i "http-equiv" index.html` | ❌ Wave 0 (file not created yet) |

### Sampling Rate

- **Per task commit:** Manual browser smoke test — open root URL, verify redirect to correct language page
- **Per wave merge:** Full 5-scenario test (DE, EN, IT, FR, no-JS)
- **Phase gate:** All 5 scenarios pass before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `index.html` — root redirect file does not exist yet; entire phase creates it

*(No test framework infrastructure gaps — project uses manual browser testing throughout)*

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | no | No user input on this page |
| V6 Cryptography | no | — |

### Known Threat Patterns for Static Redirect Page

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Open redirect via manipulated navigator.languages | Tampering | Not applicable — redirect targets are hardcoded string literals, not derived from user input. `navigator.languages` values are browser-provided; attacker cannot inject arbitrary redirect URLs through this API. |
| Clickjacking | Tampering | Not applicable — redirect page has no interactive content. Flash exits before user interaction is possible. |
| SEO poisoning (redirect page indexed) | Information Disclosure | `<meta name="robots" content="noindex, nofollow">` + noscript to German default |

**Security assessment:** This phase has minimal attack surface. The redirect targets (`/de/`, `/en/`, `/it/`) are hardcoded literals — `navigator.languages` values only select among these three options or fall back to `/de/`. No user-controlled input can influence the redirect destination. [VERIFIED: code pattern review]

---

## Sources

### Primary (HIGH confidence)

- MDN Web Docs: `navigator.languages` — https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages — language preference array API, browser support
- MDN Web Docs: `window.location.replace()` — https://developer.mozilla.org/en-US/docs/Web/API/Location/replace — history replacement vs. href assignment
- CLAUDE.md project instructions — GDPR, tech stack, file structure, CSS conventions [VERIFIED: file read]
- `.planning/phases/07-root-redirect/07-CONTEXT.md` — All locked decisions D-01 through D-12 [VERIFIED: file read]
- Existing codebase: `de/index.html`, `assets/css/main.css` — established HTML structure, design tokens [VERIFIED: file read]

### Secondary (MEDIUM confidence)

- HTML Living Standard — meta http-equiv refresh: https://html.spec.whatwg.org/multipage/semantics.html#attr-meta-http-equiv-refresh
- Google Search Central — JavaScript SEO basics (noscript, meta refresh behavior): https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

### Tertiary (LOW confidence)

- None — all claims either verified from codebase/MDN or appropriately tagged [ASSUMED]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — single-file HTML, no libraries; all APIs are MDN-verified browser standards
- Architecture: HIGH — CONTEXT.md decisions are explicit; pattern is established, minimal, and verified
- Pitfalls: HIGH — all pitfalls derived from the specific APIs in use (replace vs href, navigator.languages fallback, path relativity)

**Research date:** 2026-04-08
**Valid until:** 2027-04-08 (stable — all native browser APIs; no library versions to track)
