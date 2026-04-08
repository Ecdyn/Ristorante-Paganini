# Phase 5: English and Italian Onepages - Context

**Gathered:** 2026-04-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Translate the completed German page into `/en/index.html` and `/it/index.html` simultaneously, completing the hreflang reciprocal cluster across all three language files. Both new pages must have fully localized content, meta tags, OG tags, JSON-LD structured data, and FAQPage schema. The German page must be updated to include correct hreflang return tags. No new features or layout changes -- this is pure translation and localization of the existing German page.

</domain>

<decisions>
## Implementation Decisions

### Translation Tone & Formality
- **D-01:** English copy uses warm & professional tone -- same family "we" voice as German, slightly less formal since English has no Sie/Du distinction. Polished but inviting, matching premium positioning
- **D-02:** Italian copy uses "Voi" (semi-formal plural) register -- warmer than Lei, addresses visitors as a group. Reflects southern Italian hospitality tradition while maintaining premium feel
- **D-03:** Both EN and IT are faithful translations of the German copy -- same content, structure, and messaging translated accurately. No cultural adaptation or content restructuring. Keeps all three pages consistent and simplifies maintenance

### FAQ & SEO Localization
- **D-04:** All 7 FAQ questions translated directly from German to EN and IT -- same questions, same structure, same FAQPage JSON-LD schema. Leipzig-specific terms get natural equivalents (e.g., "Mittagstisch" -> "business lunch" in EN, "pranzo di lavoro" in IT)
- **D-05:** FAQPage JSON-LD in EN and IT pages mirrors the German schema structure with translated `name` and `text` fields for all 7 Q&A pairs

### Meta & SEO Content
- **D-06:** Meta titles follow the same pattern as German: EN "Ristorante Paganini | Italian Restaurant Leipzig", IT "Ristorante Paganini | Ristorante Italiano Lipsia" -- consistent branding with city name for local SEO
- **D-07:** Meta descriptions are faithful translations of the German meta description -- same warm/inviting tone, family tradition mention, Leipzig city center location
- **D-08:** OG locale values: `og:locale="en_GB"` for English, `og:locale="it_IT"` for Italian (per Phase 3 success criteria)
- **D-09:** JSON-LD Restaurant/LocalBusiness schema translated: `description` and `inLanguage` fields updated per language, all other fields (address, geo, hours, phone) remain identical

### Hero & CTA Language
- **D-10:** Italian tagline H1 remains identical on all three pages -- it's a brand signature/motto, not translatable content. The restaurant IS Italian, so the tagline is authentic everywhere
- **D-11:** "Ristorante Paganini" brand mark above H1 stays unchanged on all pages
- **D-12:** CTA buttons are direct translations: EN "Reserve a Table" + "Menu", IT "Prenota un Tavolo" + "Menu" -- clear, functional, consistent

### Structural Consistency (from prior phases)
- **D-13:** Language-neutral section IDs identical across all three pages: `#hero`, `#info`, `#about`, `#menu`, `#lunch`, `#gallery`, `#reservation`, `#events`, `#location`, `#faq`, `#contact`, `#footer` (Phase 3 D-01)
- **D-14:** Full hreflang block with all 4 tags on every page: `hreflang="de"`, `hreflang="en"`, `hreflang="it"`, `hreflang="x-default"` -> DE (Phase 3 D-12)
- **D-15:** Self-canonical per language page -- EN canonical points to EN URL, IT canonical points to IT URL (Phase 3 D-13)
- **D-16:** Language switcher links in all three footers updated to navigate correctly between DE/EN/IT versions

### Claude's Discretion
- Exact English and Italian copy wording (within faithful translation + tone direction)
- Natural language phrasing for FAQ answers in each language
- Minor phrasing adjustments where literal translation would sound awkward
- `aria-label` attribute translations if present on sections
- Comment convention language (HTML comments can remain in English for developer audience)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Source Page (translate FROM this)
- `de/index.html` -- Complete German onepage with all 12 content sections, head metadata, JSON-LD, FAQPage schema -- this is the source of truth for translation

### Phase Context Chain
- `.planning/phases/03-german-onepage-head-and-seo-skeleton/03-CONTEXT.md` -- Hreflang setup (D-12-D-14), section IDs (D-01-D-02), JSON-LD structure (D-03-D-06), meta patterns (D-07-D-11)
- `.planning/phases/04-german-onepage-all-12-content-sections/04-CONTEXT.md` -- All 25 content decisions including copy tone (D-15-D-17), FAQ questions (D-18-D-19), section-by-section content specs

### CSS & JS (shared, not duplicated)
- `assets/css/main.css` -- Shared CSS file linked from all pages, no changes needed
- `assets/js/main.js` -- Shared JS file linked from all pages, no changes needed

### Image Assets (shared)
- `assets/img/` -- All placeholder images shared across languages via relative paths

### Requirements
- `.planning/REQUIREMENTS.md` -- LANG-02 (EN fully localized), LANG-03 (IT fully localized), LANG-05 (all interface strings translated)

### Hreflang & Multilingual Standards
- `CLAUDE.md` -- "Multilingual / Hreflang Strategy" section for URL structure, hreflang rules, and common errors to avoid

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `de/index.html` -- Complete 12-section page to use as translation template. All HTML structure, CSS classes, JS hooks, image references stay identical -- only text content and meta values change
- `assets/css/main.css` -- Shared stylesheet, already handles all layouts. No CSS changes needed for translation
- `assets/js/main.js` -- Shared JS (sticky header, mobile menu, lightbox), language-agnostic. No JS changes needed

### Established Patterns
- `<!-- EDIT: ... -->` and `<!-- EDITABLE: ... -->` comment convention for agency-editable content
- `<!-- PLACEHOLDER: ... -->` comments for pre-launch replacement items (domain, phone, images)
- `<!-- SYNC: ... -->` comments marking content that must stay synchronized across language files
- Language-neutral IDs for JS hooks (`id="site-header"`, `id="menu-toggle"`, `id="mobile-menu"`)
- `<picture>` element with AVIF > WebP > JPEG fallback stack for all images

### Integration Points
- New files: `en/index.html` and `it/index.html` (new directories and files)
- DE page update: hreflang tags already present and correct, but verify all return tags are valid
- Footer language switcher: links in all three footers must cross-reference correctly
- All `../assets/` relative paths work identically from `/en/` and `/it/` subdirectories

</code_context>

<specifics>
## Specific Ideas

- Italian tagline H1 is a brand signature that stays in Italian on every page -- it's not content to translate, it's identity
- "Voi" register for Italian gives a warmer, more hospitable feel than formal "Lei" while still being respectful -- fits the family restaurant heritage
- FAQ translations should use natural local equivalents for Leipzig terms rather than awkward literal translations (e.g., "Mittagstisch" -> "business lunch" not "lunch table")

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope

</deferred>

---

*Phase: 05-english-and-italian-onepages*
*Context gathered: 2026-04-08*
