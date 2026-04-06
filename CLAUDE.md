<!-- GSD:project-start source:PROJECT.md -->
## Project

**Ristorante Paganini — Website**

A high-end multilingual onepage restaurant website for "Ristorante Paganini" in Leipzig. Static HTML/CSS/vanilla JS — no frameworks, no build step. Three language versions (German, English, Italian) with separate legal pages. Designed to drive table reservations, walk-in traffic, group/event inquiries, and business lunch visibility while conveying authentic Italian warmth and premium quality.

**Core Value:** Visitors instantly trust Ristorante Paganini as an authentic, premium Italian restaurant in Leipzig's city center and can reserve a table within seconds.

### Constraints

- **Tech stack**: Plain HTML5, CSS3, vanilla JavaScript only — no frameworks, no build tools, no dependencies
- **Site model**: One onepage per language + 2 legal pages per language + root redirect — nothing more
- **Languages**: German (primary), English, Italian — all fully localized including nav, buttons, meta, schema
- **Performance**: Optimized for Core Web Vitals — lazy loading, minimal JS, simple DOM
- **Accessibility**: Semantic markup, proper heading hierarchy, alt attributes, keyboard navigation
- **Editability**: Agency-friendly with clear HTML comments marking all editable content areas
- **Legal**: Placeholder legal content only — real legal text must be inserted before launch
- **Design**: Must not look like a student demo or generic theme clone — premium restaurant quality bar
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| HTML5 | Living Standard | Document structure | Semantic sectioning elements (main, article, section, nav, header, footer) are non-negotiable for accessibility and SEO. Single H1 per page, proper landmark roles. |
| CSS3 + Custom Properties | Living Standard | All styling, theming, responsive layout | Custom properties (CSS variables) enable a token-based design system without a preprocessor. Native cascade + specificity managed via CUBE CSS methodology. |
| Vanilla JavaScript (ES2020+) | No transpile needed | Sticky header, mobile menu, smooth scroll, IntersectionObserver lazy loading, language redirect | Every target browser (2020+) supports the required APIs natively. No build step, no bundler, no transpiler. |
| JSON-LD | Schema.org v25 | Structured data (Restaurant, LocalBusiness, PostalAddress, OpeningHoursSpecification) | Google's preferred structured data format. Placed in `<script type="application/ld+json">` in `<head>`. Isolated from HTML markup, easy to update. |
### CSS Architecture: CUBE CSS Methodology
- Embraces the cascade rather than fighting it — perfect for a no-framework, no-build site
- Uses CSS custom properties (design tokens) as the primary theming mechanism
- Proven on static sites, blogs, and marketing sites of exactly this complexity
- Blocks (components) are named clearly; exceptions use `data-` attributes, giving JS clean hooks
- Author: Andy Bell (piccalil.li) — actively maintained philosophy as of 2025
- Do not use BEM double-underscore/double-hyphen naming exclusively — it produces verbose class names and fights the cascade
- Do not use utility-only CSS (Tailwind mindset without Tailwind) — HTML becomes unreadable and non-editable by agency staff
- Do not use `@import` for CSS partials — single `styles.css` file avoids extra HTTP requests on a static host without HTTP/2 guarantee
### CSS Custom Properties (Design Tokens)
### Typography
- High-contrast oldstyle serif — conveys Italian elegance, warmth, and refinement
- Available as variable font (woff2) — single file covers all weights/styles
- Available on Google Fonts and via google-webfonts-helper for self-hosting
- Use for: H1–H4, navigation brand name, section labels, quote callouts
- Humanist sans-serif — warm, readable, approachable at small sizes
- Excellent multilingual Latin coverage (German, English, Italian)
- Lightweight: Regular (400) + Bold (700) subset = ~25KB total
- Use for: body copy, navigation links, buttons, captions, meta info
### Font Loading Strategy
- Eliminates third-party DNS lookup and connection to `fonts.googleapis.com` + `fonts.gstatic.com`
- No GDPR/DSGVO risk from Google Fonts CDN loading (relevant for German audience)
- Full control over file serving, caching headers, and subsetting
- Performance: 200–300ms faster first paint on cold cache (verified in multiple 2025 studies)
- Tool: https://gwfh.mranftl.com (google-webfonts-helper) — select Latin subset, download woff2 only
- Cormorant Garamond: variable font (woff2-variations) if available, else Regular + Light + SemiBold weights
- Lato: Regular (400) + Bold (700), Latin subset only
### Images
- AVIF: 50% smaller than JPEG at equivalent quality (2025 browser support: Chrome 85+, Firefox 93+, Safari 16+, Edge 121+)
- WebP: 25–35% smaller than JPEG, covers all browsers that don't support AVIF
- JPEG/PNG fallback: ensures IE11 and very old Safari don't break (very low traffic for a Leipzig restaurant, but correct practice)
- Always set explicit `width` and `height` attributes — prevents CLS (layout shift)
- Hero image: `loading="eager"` + `fetchpriority="high"` — it is the LCP element
- Gallery and below-fold: `loading="lazy"` + `decoding="async"`
- Never use CSS `background-image` for content images — use `<img>` for LCP-eligible images
- Hero: 1400×800 (desktop), 768×500 (mobile via `srcset` + `sizes`)
- Gallery grid: 800×600
- Section backgrounds: 1200×600
- Logo: SVG (vector, no raster needed)
### Structured Data (JSON-LD)
### Favicon and Manifest Setup
### Multilingual / Hreflang Strategy
- `/de/index.html` — German (primary)
- `/en/index.html` — English
- `/it/index.html` — Italian
- `/index.html` — root redirect (JS language detection, defaults to DE)
- Every language page must include the full set of 4 `<link rel="alternate">` tags (self + all others + x-default)
- `hreflang="x-default"` points to the German version (primary market)
- Do NOT use canonical to point one language to another — each is its own canonical URL
- Language codes: `de`, `en`, `it` — no region suffixes needed unless targeting specific countries distinctly
- Studies show 75% of hreflang implementations have errors; missing return tags (reciprocal links on all pages) is the most common mistake
### Vanilla JavaScript Patterns
#### Sticky Header with Scroll-Triggered State
#### Mobile Navigation Menu
#### Smooth Scrolling
#### Lazy Loading
### Responsive Breakpoints
### SEO Meta Tags
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
## File/Folder Structure
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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
