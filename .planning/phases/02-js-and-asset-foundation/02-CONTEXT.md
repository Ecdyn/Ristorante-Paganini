# Phase 2: JS and Asset Foundation - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Build all JavaScript behaviors (sticky header, mobile menu, smooth scroll) and non-CSS static assets (favicons, placeholder images, JS file) so the German page can be built as a complete working page from Phase 3 onward. No HTML content pages are built in this phase — only the interactive foundation and asset pipeline.

</domain>

<decisions>
## Implementation Decisions

### Sticky Header Behavior
- **D-01:** Header hides on scroll down, reappears on scroll up — implemented via IntersectionObserver, not scroll event listeners
- **D-02:** Header is transparent over the hero section (text readable via dark overlay from Phase 1 CSS), gains solid cream background with subtle shadow once user scrolls past the hero
- **D-03:** Transition between transparent and solid states must be smooth (CSS transition on background-color and box-shadow)

### Mobile Menu Style
- **D-04:** Full-screen overlay menu — covers entire viewport when hamburger is tapped, dark/wine-toned background with large centered navigation links and close button
- **D-05:** Anchor links in the menu auto-close the overlay and smooth-scroll to the target section — user does not need to manually close the menu
- **D-06:** Hamburger toggle must have correct `aria-expanded` state and be keyboard-navigable (FOUND-05)

### Image & Asset Strategy
- **D-07:** Placeholder images are solid color blocks with text labels (e.g., "Hero — 1400x800") using palette token colors — zero external dependencies, clearly marked for replacement
- **D-08:** All images in a flat `assets/img/` directory with naming convention: `{section}-{variant}.{format}` (e.g., `hero-desktop.avif`, `hero-desktop.webp`, `hero-desktop.jpg`)
- **D-09:** `<picture>` element pattern with AVIF > WebP > JPEG fallback stack, explicit `width` and `height` attributes on every `<img>` (FOUND-08)

### Favicon & Manifest
- **D-10:** Favicon is a stylized serif "P" monogram (for Paganini) in wine color (#7A2D3A) — clean, scales well at small sizes
- **D-11:** Four-tag favicon approach per CLAUDE.md: SVG, ICO, apple-touch-icon PNG, webmanifest
- **D-12:** Webmanifest theme_color and background_color use wine accent (#7A2D3A) for browser chrome tinting on Android

### Claude's Discretion
- Exact scroll threshold/sensitivity for header hide/show behavior
- Mobile menu open/close animation style and duration
- Hamburger icon design (three-line vs animated transform)
- Smooth scroll easing and scroll-padding-top value for sticky header offset
- Placeholder image color choices within the established palette
- Specific image dimension sets for each section type (hero, gallery, about, OG)
- SVG favicon exact letterform and styling details
- ICO generation approach (conversion from SVG)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### JavaScript Patterns
- `CLAUDE.md` — "Vanilla JavaScript Patterns" section defines sticky header (IntersectionObserver), mobile nav (aria-expanded), smooth scrolling (CSS scroll-behavior), and lazy loading patterns
- `CLAUDE.md` — "What NOT to Use" section: no jQuery, no animation libraries, no GSAP/AOS

### Image & Favicon Strategy
- `CLAUDE.md` — "Images" section defines AVIF/WebP/JPEG fallback stack, srcset/sizes requirements, eager vs lazy loading rules
- `CLAUDE.md` — "Favicon and Manifest Setup" section defines the minimal 4-tag approach

### Requirements
- `.planning/REQUIREMENTS.md` — FOUND-04 (sticky header), FOUND-05 (mobile menu), FOUND-06 (smooth scroll), FOUND-08 (picture elements), PERF-03 (no render-blocking JS), PERF-04 (minimal JS), SEO-09 (favicon setup)

### Phase 1 Foundation
- `assets/css/main.css` — Design tokens (colors, spacing, typography) that JS behaviors and asset placeholders must reference
- `.planning/phases/01-css-design-system/01-CONTEXT.md` — Phase 1 decisions on color palette, typography, and layout patterns

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `assets/css/main.css` — Complete design token system with color variables (`--color-accent`, `--color-surface`, `--color-overlay`), spacing scale, typography tokens, and transition tokens ready for JS to reference
- `assets/fonts/` — Four self-hosted woff2 files (Cormorant Garamond regular + italic, Lato regular + bold) already in place
- CUBE CSS blocks and utilities defined in main.css provide class hooks for JS state changes (e.g., `data-state` attributes for header transparent/solid)

### Established Patterns
- CUBE CSS uses `data-` attributes for exceptions/state — JS should toggle `data-` attributes rather than adding/removing classes
- Single CSS file, single JS file architecture — `assets/js/main.js` with `defer` attribute
- No build step, no transpiler — ES2020+ features used directly

### Integration Points
- `assets/js/main.js` — New file, will be linked by all HTML pages starting in Phase 3
- `assets/img/` — New directory for all image assets
- `assets/` root — Favicon files (favicon.svg, favicon.ico, apple-touch-icon.png, site.webmanifest)
- Header element in HTML (Phase 3+) will need specific markup structure that JS expects (nav, hamburger button, overlay container)

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches within the decided directions.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-js-and-asset-foundation*
*Context gathered: 2026-04-07*
