# Phase 8: SEO Files and Technical Audit - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Generate sitemap.xml and robots.txt as the final SEO infrastructure files, then validate the entire site for launch readiness — structured data, hreflang reciprocity, meta completeness, Core Web Vitals, and accessibility. The site is already fully built (Phases 1-7); this phase adds the missing SEO files and confirms everything works correctly with zero known errors.

</domain>

<decisions>
## Implementation Decisions

### Sitemap Scope
- **D-01:** sitemap.xml includes only the 3 onepages: de/index.html, en/index.html, it/index.html — no legal pages (they have noindex), no root redirect (noindex, nofollow)
- **D-02:** Each `<url>` entry includes full `xhtml:link rel="alternate"` tags for all 3 languages plus x-default pointing to DE — mirrors the HTML head hreflang and gives Google a second signal
- **D-03:** Sitemap uses the `xmlns:xhtml` namespace for hreflang alternate entries per Google's multilingual sitemap documentation

### Base URL Strategy
- **D-04:** sitemap.xml and robots.txt use the same `https://www.example.com` placeholder domain already used throughout all HTML files (hreflang, canonical, JSON-LD)
- **D-05:** A prominent XML comment at the top of sitemap.xml and a text comment at the top of robots.txt: "REPLACE example.com WITH REAL DOMAIN BEFORE LAUNCH" — consistent with existing `<!-- PLACEHOLDER: domain -->` convention in HTML files
- **D-06:** One find-and-replace of `www.example.com` updates the entire site — all files use the same placeholder consistently

### Robots.txt Rules
- **D-07:** Minimal robots.txt — `User-agent: *` with `Allow: /` and only `Disallow: /index.html` (the root redirect page)
- **D-08:** Assets folder (CSS, JS, images, fonts) is explicitly allowed — Google needs these for rendering-based indexing
- **D-09:** test.html in assets/css/ is not explicitly blocked — it's not linked from anywhere and won't be discovered by crawlers naturally
- **D-10:** Sitemap directive at the bottom: `Sitemap: https://www.example.com/sitemap.xml`

### Validation Approach
- **D-11:** A standalone Node.js validation script using only built-in modules (fs, path) — no npm install, no dependencies, respects the project's no-dependencies constraint
- **D-12:** The script validates JSON-LD syntax and required fields: parses all JSON-LD blocks from every HTML page, verifies valid JSON, checks Restaurant/LocalBusiness required fields (name, address, telephone, openingHoursSpecification, servesCuisine), checks FAQPage required fields (mainEntity with question/acceptedAnswer pairs)
- **D-13:** Core Web Vitals (Lighthouse), accessibility (WAVE), and Rich Results Test remain manual browser-based checks — documented as a checklist in the plan but not automated
- **D-14:** Hreflang reciprocity, meta tag completeness, and sitemap/robots consistency are verified manually or by visual inspection during the audit — not part of the automated script

### Claude's Discretion
- Exact sitemap.xml formatting and lastmod dates
- Validation script file location and naming convention
- Order of manual validation checklist items
- Whether to include a `<changefreq>` or `<priority>` in sitemap entries (both are optional and largely ignored by Google)
- Console output format of the validation script (colors, grouping, summary)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing HTML Pages (validate these)
- `de/index.html` — German onepage with Restaurant + LocalBusiness + FAQPage JSON-LD, full hreflang block, all meta/OG tags
- `en/index.html` — English onepage with translated JSON-LD and meta
- `it/index.html` — Italian onepage with translated JSON-LD and meta
- `de/impressum.html` — German legal page (noindex)
- `de/datenschutz.html` — German privacy page (noindex)
- `en/legal.html` — English legal page (noindex)
- `en/privacy.html` — English privacy page (noindex)
- `it/legale.html` — Italian legal page (noindex)
- `it/privacy.html` — Italian privacy page (noindex)
- `index.html` — Root redirect (noindex, nofollow)

### Prior Phase Context
- `.planning/phases/03-german-onepage-head-and-seo-skeleton/03-CONTEXT.md` — Hreflang setup (D-12-D-14), JSON-LD structure (D-03-D-06), base URL placeholder convention (D-14)
- `.planning/phases/05-english-and-italian-onepages/05-CONTEXT.md` — Hreflang reciprocity completion, translated JSON-LD fields (D-05, D-09)
- `.planning/phases/07-root-redirect/07-CONTEXT.md` — Root redirect noindex decision

### Standards
- `CLAUDE.md` — "Structured Data (JSON-LD)" section for Restaurant schema requirements
- `CLAUDE.md` — "Multilingual / Hreflang Strategy" section for sitemap hreflang pattern
- `CLAUDE.md` — "SEO Meta Tags" section for required meta tag checklist

### Requirements
- `.planning/REQUIREMENTS.md` — SEO-06 (sitemap.xml), SEO-07 (robots.txt)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- All 10 HTML files already exist with complete meta tags, hreflang blocks, JSON-LD, and canonical URLs — Phase 8 creates new files (sitemap.xml, robots.txt, validate script) and audits existing ones
- `assets/css/test.html` — development test file, not part of production site

### Established Patterns
- `<!-- PLACEHOLDER: domain -->` comment convention used in HTML for values requiring pre-launch replacement
- `<!-- EDIT: ... -->` comment convention for agency-editable content
- All pages link shared `../assets/css/main.css` and `../assets/js/main.js` via relative paths
- JSON-LD blocks are in `<script type="application/ld+json">` tags in the `<head>` of each page

### Integration Points
- `sitemap.xml` placed at site root (same level as index.html)
- `robots.txt` placed at site root (same level as index.html)
- Validation script placed in a tools/ or scripts/ directory (Claude's discretion)
- robots.txt references sitemap.xml via absolute URL with placeholder domain

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches within the decided structure.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 08-seo-files-and-technical-audit*
*Context gathered: 2026-04-08*
