# Phase 3: German Onepage — Head and SEO Skeleton - Context

**Gathered:** 2026-04-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Create `/de/index.html` as a valid HTML5 document with a complete, correct `<head>` section — all meta tags, hreflang, JSON-LD structured data, canonical URLs, and favicon links in place. The `<body>` contains the structural skeleton: header, nav, main with all 12 empty section elements (with anchor IDs), and footer — but no content text, no images, no styling beyond linking main.css and main.js. Phase 4 fills all content.

</domain>

<decisions>
## Implementation Decisions

### Section Anchor IDs
- **D-01:** All 12 section IDs are language-neutral English, identical across DE/EN/IT: `#hero`, `#info`, `#about`, `#menu`, `#lunch`, `#gallery`, `#reservation`, `#events`, `#location`, `#faq`, `#contact`, `#footer`
- **D-02:** Language-neutral IDs avoid per-language ID mapping, simplify JS, and keep deep links consistent when shared

### JSON-LD Structured Data
- **D-03:** Use real restaurant address (Grosse Fleischergasse, Leipzig) and real phone format in JSON-LD, but mark opening hours and menu URL with HTML comments (`<!-- EDIT: ... -->`) for Phase 4 completion
- **D-04:** JSON-LD block includes Restaurant + LocalBusiness schema with PostalAddress, servesCuisine, priceRange — all required fields present for Rich Results Test
- **D-05:** FAQPage JSON-LD is deferred to Phase 4 — only add when actual Q&A content exists. Phase 3 creates the empty `#faq` section element only
- **D-06:** openingHoursSpecification uses placeholder values with clear comments — structure must be syntactically valid JSON-LD even with placeholder data

### Meta Content & OG Tags
- **D-07:** German meta title uses warm, inviting tone: "Ristorante Paganini | Italienisches Restaurant Leipzig" — matches brand tone (warm, professional, premium, inviting)
- **D-08:** Meta description is warm and personal, mentions family tradition, authentic Italian cuisine, and Leipzig city center location. Not keyword-stuffed but naturally includes key search terms
- **D-09:** Open Graph uses `og:type="restaurant"` for restaurant-specific social card features (cuisine, menu fields)
- **D-10:** `og:locale="de_DE"`, `og:image` points to `../assets/img/og-image.svg` (placeholder from Phase 2, will be replaced with real image post-launch)
- **D-11:** Twitter card uses `twitter:card="summary_large_image"` for visual restaurant preview

### Hreflang & Canonical
- **D-12:** Full hreflang block with all 4 tags: `hreflang="de"` (self), `hreflang="en"`, `hreflang="it"`, `hreflang="x-default"` pointing to DE version
- **D-13:** Self-canonical: `<link rel="canonical" href="...de/index.html">` — never cross-canonical to another language
- **D-14:** Hreflang URLs use absolute paths (require a base URL placeholder like `https://www.example.com` with a clear comment for replacement before launch)

### Body Skeleton
- **D-15:** Body includes full structural markup: `<header>` with nav (reusing `id="site-header"` from test.html), `<main>` with 12 `<section>` elements, `<footer>` — all with correct landmark roles
- **D-16:** Header/nav structure matches test.html pattern (Phase 2) including hamburger button and mobile menu overlay — not just empty placeholders
- **D-17:** Each section has its anchor ID and a placeholder comment (`<!-- SECT-XX: Section Name -->`) but no content text or images

### Claude's Discretion
- Exact meta description wording (within warm/inviting tone direction)
- JSON-LD field ordering and formatting
- Whether to include `<meta name="robots" content="index, follow">` or omit (defaults to same)
- Exact hreflang base URL placeholder format
- Whether body sections get `aria-label` attributes now or in Phase 4
- Internal HTML comment formatting style

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### SEO & Structured Data
- `CLAUDE.md` — "Structured Data (JSON-LD)" section defines Restaurant/LocalBusiness schema requirements
- `CLAUDE.md` — "SEO Meta Tags" section defines per-page meta tag requirements
- `CLAUDE.md` — "Multilingual / Hreflang Strategy" section defines the 4-tag hreflang pattern and reciprocal link rules

### HTML Structure
- `CLAUDE.md` — "File/Folder Structure" section defines `/de/index.html` path convention
- `CLAUDE.md` — constraints: semantic HTML5, single H1 per page, proper heading hierarchy, accessibility

### Favicon Integration
- `.planning/phases/02-js-and-asset-foundation/02-02-SUMMARY.md` — "HTML Head Link Tags for Phase 3" section has the exact 4 favicon `<link>` tags to copy

### Prior Phase Assets
- `assets/css/main.css` — link in `<head>`, already complete from Phase 1+2
- `assets/js/main.js` — link with `<script defer>`, already complete from Phase 2
- `assets/css/test.html` — reference for header/nav/mobile-menu markup structure (Phase 2)

### Requirements
- `.planning/REQUIREMENTS.md` — FOUND-01, LANG-01, SEO-01 through SEO-05 define the specific requirements this phase must satisfy

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `assets/css/test.html` — contains working header+nav+hamburger+mobile-menu+hero-sentinel markup that Phase 3 can adapt for the real page
- `assets/css/main.css` — 700+ lines, all design tokens, typography, layout, component blocks, and exceptions ready
- `assets/js/main.js` — 143 lines, sticky header + mobile menu IIFEs, expects `id="site-header"`, `id="menu-toggle"`, `id="mobile-menu"`, `.hero-sentinel`

### Established Patterns
- CUBE CSS methodology with data-* attribute state management (no class toggling)
- IDs for JS hooks, classes for CSS styling
- `<script defer>` for non-blocking JS loading

### Integration Points
- `/de/index.html` links to `../assets/css/main.css` and `../assets/js/main.js` (relative paths from language subdirectory)
- Favicon links use `../assets/` prefix (documented in 02-02-SUMMARY.md)
- Font files in `assets/fonts/` referenced by @font-face in main.css

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches within the decided tone and structure.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-german-onepage-head-and-seo-skeleton*
*Context gathered: 2026-04-07*
