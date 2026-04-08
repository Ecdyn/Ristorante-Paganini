# Phase 6: Legal Pages - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Build all six legal pages (Impressum + Datenschutz per language) with placeholder content, link them from all footers, use the same shared CSS and design system, and explicitly document the GDPR decisions made for this site in each Datenschutz/privacy page. No real legal text — placeholder content only, clearly marked for lawyer review before launch.

</domain>

<decisions>
## Implementation Decisions

### Page Layout & Structure
- **D-01:** Minimal single-column layout — shared `assets/css/main.css`, simple header with restaurant name linking back to the language's onepage, content area, and a minimal footer with language switcher
- **D-02:** All six pages carry `<meta name="robots" content="noindex">` — legal pages should not appear in search results
- **D-03:** No navigation menu on legal pages — just a back-to-homepage link in the header. Legal pages are utility pages, not part of the main site experience
- **D-04:** Each legal page includes the same `<head>` boilerplate as the onepages: charset, viewport, CSS link, favicon references — but NO JSON-LD, NO OG tags, NO hreflang (legal pages are not part of the multilingual SEO cluster)

### Legal Filenames
- **D-05:** German: `/de/impressum.html` and `/de/datenschutz.html`
- **D-06:** English: `/en/legal.html` and `/en/privacy.html` (per roadmap success criteria)
- **D-07:** Italian: `/it/legale.html` and `/it/privacy.html` (per roadmap success criteria)
- **D-08:** Footer links in all three onepages (de/en/it/index.html) must be updated to point to the correct localized filenames — currently EN and IT footers incorrectly use German filenames (`impressum.html`, `datenschutz.html`)

### Placeholder Content Depth
- **D-09:** Each legal page has realistic section headings matching German legal convention (Impressum: Angaben gemäß §5 TMG, Kontakt, Umsatzsteuer-ID, Streitschlichtung, Haftung für Inhalte/Links; Datenschutz: Verantwortliche Stelle, Datenerfassung, Hosting, Cookies, Drittanbieter-Dienste)
- **D-10:** Each section contains 1-2 placeholder paragraphs with prominent `<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: [section name] -->` HTML comments
- **D-11:** EN and IT legal pages use equivalent localized section headings (EN: Information per §5 TMG, Contact, VAT ID, etc.; IT: Informazioni ai sensi del §5 TMG, Contatto, etc.)

### GDPR Documentation in Privacy Pages
- **D-12:** Each Datenschutz/privacy page contains a dedicated section explicitly documenting: (1) No Google Fonts CDN — fonts self-hosted as woff2 files, no connection to Google servers, (2) No Google Maps iframe — static address with external link only, no data transmitted to Google, (3) No third-party cookies — site uses no analytics, no tracking pixels, no social media embeds, (4) No form data collection — inquiries via phone and email only
- **D-13:** GDPR documentation sections use factual, auditable language that a lawyer can verify against the actual implementation

### Claude's Discretion
- Exact placeholder paragraph wording in each language
- Visual styling of legal page header/footer (within existing design system)
- Section ordering within each legal page
- Whether to include a "last updated" date placeholder at top of each page

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and ROADMAP.md Phase 6 success criteria.

### Existing implementation
- `de/index.html` lines 720-730 — Current DE footer legal links (reference for link structure)
- `en/index.html` lines 720-730 — Current EN footer legal links (need filename correction)
- `it/index.html` lines 720-730 — Current IT footer legal links (need filename correction)
- `assets/css/main.css` — Shared design system (legal pages reuse this)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `assets/css/main.css` — Full design system with typography, colors, spacing tokens. Legal pages link this directly
- `assets/fonts/` — Self-hosted Cormorant Garamond + Lato woff2 files (referenced via @font-face in CSS)
- Favicon set in `assets/` — Same favicon references as onepages

### Established Patterns
- HTML structure pattern from `de/index.html` — lang attribute, charset, viewport meta, CSS/JS linking convention
- Footer language switcher pattern with `aria-current` on active language
- HTML comment convention: `<!-- EDIT: description -->` for agency-editable content areas

### Integration Points
- Footer links in all three onepages must be updated to correct legal page filenames
- Legal pages link back to their language's onepage via header
- Legal pages share the same CSS file — no separate legal stylesheet needed

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Legal pages should feel like they belong to the same site (consistent typography, colors) but be clearly utility pages, not marketing pages.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 06-legal-pages*
*Context gathered: 2026-04-08*
