# Phase 7: Root Redirect - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the root `index.html` that detects visitor browser language and redirects to the appropriate language subdirectory (`/de/`, `/en/`, or `/it/`) without creating back-button loops, with a safe fallback to German for unrecognized languages. This is a redirect utility page only — no visible content, not indexed by search engines.

</domain>

<decisions>
## Implementation Decisions

### Redirect Experience
- **D-01:** Minimal branded flash during redirect — brief display of restaurant name/logo centered on a styled background, visible for ~100ms before the JS redirect fires. Provides a polished feel if the redirect has any perceptible delay
- **D-02:** Use `window.location.replace()` for all redirects — prevents back-button loops back to the redirect page
- **D-03:** No language persistence — every visit to root URL re-detects browser language via `navigator.language` / `navigator.languages`. No cookies or localStorage. Language switcher in footer handles manual preference on the destination pages

### Edge Case Handling
- **D-04:** Root URL is a pure redirect utility — always redirects immediately, no manual language picker. If someone shares the root link, recipient gets redirected based on their own browser language
- **D-05:** `<meta name="robots" content="noindex">` on root page — keeps it out of search results
- **D-06:** `<noscript>` fallback with `<meta http-equiv="refresh" content="0;url=/de/">` — sends no-JS browsers and some bots to the German default
- **D-07:** Unrecognized languages (French, Japanese, etc.) redirect to `/de/` as default fallback

### Language Detection (Claude's Discretion)
- **D-08:** Claude decides the exact language matching implementation — whether to use just `navigator.language` or iterate through `navigator.languages` for better multilingual user coverage
- **D-09:** Claude decides how to handle regional variants (de-AT → /de/, en-US → /en/, it-CH → /it/) — standard prefix matching is expected

### Technical Requirements (from Roadmap)
- **D-10:** Root `index.html` contains no visible content beyond the minimal branded flash
- **D-11:** Root page is NOT listed in sitemap.xml (Phase 8 will handle this)
- **D-12:** Page carries `noindex` meta tag

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and ROADMAP.md Phase 7 success criteria.

### Requirements
- `.planning/REQUIREMENTS.md` — LANG-04 (root index.html with browser language detection and default redirect to /de/)

### Existing implementation (redirect targets)
- `de/index.html` — German onepage (primary redirect target and default fallback)
- `en/index.html` — English onepage (redirect target for English browsers)
- `it/index.html` — Italian onepage (redirect target for Italian browsers)
- `assets/css/main.css` — Shared design system (reuse for branded flash styling)

### Prior phase context
- `.planning/phases/05-english-and-italian-onepages/05-CONTEXT.md` — Confirms all three language versions exist with correct hreflang setup
- `.planning/phases/06-legal-pages/06-CONTEXT.md` — Confirms legal pages exist in all three languages

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `assets/css/main.css` — Design tokens (colors, typography) available for the branded flash styling
- `assets/fonts/` — Self-hosted Cormorant Garamond + Lato woff2 files if needed for branded flash text
- Favicon set in `assets/` — Same favicon references for consistency

### Established Patterns
- HTML structure from `de/index.html` — charset, viewport meta, CSS linking convention
- `<!-- PLACEHOLDER: ... -->` comment convention for pre-launch replacement items

### Integration Points
- New file: `index.html` at project root (does not exist yet)
- All three language directories exist and are ready: `/de/`, `/en/`, `/it/`
- Phase 8 must exclude this page from sitemap.xml

</code_context>

<specifics>
## Specific Ideas

- Minimal branded flash: restaurant name (Ristorante Paganini) centered with the site's background color and typography, just enough to avoid a jarring white flash without adding real page weight
- Keep the redirect page extremely lightweight — minimal HTML, inline CSS for the flash, small inline JS for detection

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 07-root-redirect*
*Context gathered: 2026-04-08*
