# Project Research Summary

**Project:** Ristorante Paganini — Premium Multilingual Static Restaurant Website
**Domain:** Static HTML/CSS/vanilla JS restaurant site, Leipzig Germany
**Researched:** 2026-04-06
**Confidence:** HIGH

## Executive Summary

Ristorante Paganini requires a zero-build-step, no-framework static website with three fully separate HTML language versions (DE/EN/IT), each independently crawlable and SEO-optimized. The expert approach for this domain is unambiguous: separate HTML files per language (not JS-based switching), a single shared CSS/JS asset layer, CUBE CSS methodology with CSS custom properties, self-hosted woff2 fonts (mandatory for German GDPR compliance), and structured data via JSON-LD in every language file's `<head>`. This is a well-documented pattern with high confidence across all four research areas. No framework, no build pipeline, no transpiler — the constraint is a feature.

The recommended approach builds the German version first to lock in the visual design system (CSS tokens, layout, all 12 sections), then translates to EN and IT before any work on legal pages, sitemap, or root redirect. The German version is the primary SEO target and must be built to completion before branching into other languages to avoid triple-editing the design system. The critical technical bets are: self-hosted fonts (eliminates DSGVO risk), AVIF/WebP image stack with `<picture>` elements, IntersectionObserver for sticky header (not scroll listeners), and FAQPage JSON-LD to capture rich snippets on local search queries.

The key risks are multilingual-specific: broken hreflang reciprocity silently destroys all multilingual SEO value; canonical tags pointing cross-language cause entire language versions to drop from the index; and lazy-loading the hero image is the single most damaging Core Web Vitals mistake on an image-heavy site. A secondary risk is GDPR non-compliance on the Google Maps embed — German data protection authorities have actively fined sites for embedding Google Maps without a consent gate. These pitfalls are all well-understood and preventable with specific, low-effort countermeasures identified in research.

---

## Key Findings

### Recommended Stack

The stack is HTML5 + CSS3 with CUBE CSS methodology + vanilla ES2020+ JavaScript — no exceptions. CUBE CSS (Composition, Utility, Block, Exception) is the correct CSS methodology for a no-build static site because it embraces the cascade rather than fighting it, uses CSS custom properties as its theming primitive, and keeps HTML readable for agency staff who will edit the site post-launch. All design values live in a `:root` token system covering colors (warm gold `#8b6914` accent palette), typography (Cormorant Garamond heading + Lato body), spacing (4px–128px scale), and z-index/transition values. This single-source approach means brand changes are a one-line edit.

Fonts must be self-hosted as woff2 files (not Google Fonts CDN) — the CDN creates DSGVO/GDPR exposure for German visitors and adds latency. Font-face declarations go inline in `<head>` with `font-display: swap` and `<link rel="preload">` for the two above-fold fonts. Images use the AVIF → WebP → JPEG `<picture>` stack; AVIF delivers 50% size reduction over JPEG and has universal modern browser support. The hero image requires `loading="eager"` + `fetchpriority="high"` — everything else gets `loading="lazy"`.

**Core technologies:**
- HTML5 (Living Standard): Document structure — semantic sectioning, single H1, proper landmark roles mandatory for WCAG 2.1 AA (legally required in Germany since June 2025)
- CSS3 + Custom Properties (CUBE CSS): All styling — design token system, mobile-first responsive layout, single `main.css` file (no build step, no `@import`)
- Vanilla JavaScript (ES2020+): Sticky header via IntersectionObserver, mobile menu with `aria-expanded`, smooth scroll via CSS only, lazy image fade-in — single `main.js` with IIFE modules, loaded `defer`
- JSON-LD (Schema.org): Restaurant + LocalBusiness + FAQPage structured data in `<head>` of every language file — Google's preferred format, isolated from HTML markup
- AVIF/WebP/JPEG via `<picture>`: Image format stack for maximum compression with universal browser fallback
- Self-hosted woff2: Cormorant Garamond (headings) + Lato (body) — eliminates third-party DNS and GDPR risk

### Expected Features

The site must launch as a complete product — every feature listed here is v1 because this is a static brochure site with no iterative rollout. The entire site IS the MVP.

**Must have (table stakes) — users expect these and their absence signals broken or untrustworthy:**
- Reservation CTA (above fold, prominent) — first action of 60-70% of restaurant site visitors
- Opening hours (immediately visible in HTML and JSON-LD) — mobile searchers decide to visit based on this
- Address + map (GDPR-compliant: static address with consent-gated or absent iframe) — navigation intent
- Phone number as clickable `tel:` link — older and premium diners call; emergencies
- Menu (HTML overview + PDF download) — HTML version is crawlable; PDF-only kills SEO
- Professional food photography (hero + gallery) — quality impression formed in 50ms
- Mobile-responsive design — 60-70% of restaurant searches are mobile
- Core Web Vitals compliance (LCP, CLS, INP) — affects local search ranking
- WCAG 2.1 AA accessibility — legally required in Germany since June 2025
- Semantic HTML + descriptive alt text on all content images
- Hreflang + canonical tags on all language versions
- JSON-LD structured data (Restaurant, LocalBusiness, FAQPage) per language
- SSL/HTTPS — provided by static host by default
- sitemap.xml (all language variants) + robots.txt
- Legal pages: Impressum + Datenschutz per language (German legal requirements)

**Should have (competitive differentiators):**
- Three fully separate HTML files per language (DE/EN/IT) — proper hreflang, independently indexed, not JS-switching
- Business lunch / Mittagstisch section — captures high-intent "Mittagstisch Leipzig Innenstadt" local search queries
- FAQPage JSON-LD schema (7+ questions) — rich snippets in Google, AI system citation eligibility
- Trust signals cluster near reservation CTA (30+ years family-run, press mentions, year established) — story-based trust outperforms star counts for upscale positioning
- Groups / Events inquiry section with soft CTA + form (Netlify Forms or Formspree)
- Photo gallery categorized by type (food, interior, terrace, exterior) — lazy loaded, CSS grid
- Local SEO keyword targeting in German copy ("Mittagstisch Leipzig", "Italienisches Restaurant Leipzig Innenstadt")
- About / Philosophy section with authentic Italian story (150-200 words, personal narrative)
- OG + Twitter card meta tags per language (social sharing, hotel concierge use case)
- Language redirect from root `index.html` (JavaScript, defaults to DE)
- Terrace / seasonal callout (contextual, not a permanent section)

**Defer to v1.x or v2+:**
- Live reservation widget embed — defer until restaurant chooses booking platform (TheFork/Resy/OpenTable)
- Real photography assets — launch with placeholders; replace when photography session completes
- Analytics setup (Plausible or Google Analytics) — defer until client decision on privacy approach
- Google Business Profile alignment — post-launch task
- Aggregated review widget — only worthwhile at substantial review count; adds JS weight

**Anti-features (deliberately excluded):**
- Custom-built online reservation system — reinventing TheFork is months of backend work; embed is the answer
- Chatbot or AI assistant — off-brand for premium Italian dining; FAQ section + phone is the correct fallback
- Blog or news section — a blog without a content team harms SEO more than it helps
- Live social media feed embed — Meta API breaks frequently; Instagram profile link is sufficient
- Heavy animation or carousel slider — documented conversion killer; CSS transitions only
- Multiple-page architecture beyond onepage + legal — anchor-scroll converts better for restaurant decisions

### Architecture Approach

The architecture is a flat static file structure with one shared asset layer. Three language subdirectories (`/de/`, `/en/`, `/it/`) each contain a self-contained onepage `index.html` plus language-specific legal pages. All CSS, JS, images, and PDFs live in a shared `/assets/` directory at the root, referenced by relative paths (`../assets/`). A root `index.html` performs browser language detection and redirects to the appropriate subdirectory — it contains no content, carries a `noindex` meta tag, and falls back to `/de/` for any unrecognized language. The authoring order dependency is firm: CSS design tokens must be complete before translating pages, because a color or spacing change after translation forces triple-edits.

**Major components:**
1. `/index.html` (root redirect) — browser language detection only; `noindex`; `<noscript>` fallback to `/de/`; uses `window.location.replace()` to prevent back-button loops
2. `/de/index.html`, `/en/index.html`, `/it/index.html` — full onepage with 12 anchor sections, per-language meta/OG/schema/hreflang; all self-canonical; shared assets referenced by `../assets/`
3. `/de/impressum.html`, `/de/datenschutz.html` + EN/IT equivalents — legal pages; same shared CSS; placeholder content marked for real legal text
4. `assets/css/main.css` — single CSS file ordered: design tokens → reset → typography → layout → components → sections → utilities → media queries; no `@import`
5. `assets/js/main.js` — single JS file with IIFE-wrapped modules; loaded `defer`; covers sticky header (IntersectionObserver), mobile menu (`aria-expanded`), language switcher anchor fragment preservation
6. `assets/img/` + `assets/pdf/` — images organized by section (hero/, gallery/, menu/, og/); PDFs language-specific (speisekarte.pdf, menu-en.pdf, mittagstisch.pdf)
7. `sitemap.xml` — lists all three language onepages + six legal pages with hreflang alternates; root redirect is NOT listed
8. HTML comment markers throughout — `<!-- EDITABLE: ... -->` and `<!-- SYNC: update all 3 language files -->` for agency-friendly post-launch editing

### Critical Pitfalls

1. **Broken hreflang reciprocity** — Every language file must contain all four `<link rel="alternate" hreflang="...">` tags (de, en, it, x-default) using absolute URLs. Missing even one return tag on one page silently invalidates the entire hreflang network. Cross-check all three files before launch.

2. **Canonical tags conflicting with hreflang** — Each language file must self-canonicalize (DE canonical points to DE URL, not EN). Cross-language canonicals tell Google the page is a duplicate and cause language versions to drop from the index. Never point canonical from one language to another.

3. **Lazy-loading the LCP hero image** — Applying `loading="lazy"` to the hero image (the LCP element) is the single most damaging Core Web Vitals mistake. Hero image must have `loading="eager"` + `fetchpriority="high"`. Only below-fold images get `loading="lazy"`.

4. **Google Maps embed without GDPR consent gate** — A bare `<iframe src="https://maps.google.com/...">` sends visitor data to Google on page load, violating GDPR as enforced by German data protection authorities. Use a two-click consent gate, a static address with a text link, or no iframe at all. Document the decision in the Datenschutzerklärung.

5. **Multilingual content drift** — Phone, hours, address, and lunch schedule appear in all three language files. Without synchronization markers, updates made to the DE file are routinely forgotten in EN and IT. Mark every shared factual element with `<!-- SYNC: update in de/, en/, it/ -->` and include a content sync checklist at the top of each file.

---

## Implications for Roadmap

Based on the architecture's build-order dependency (CSS must precede translation, DE must precede EN/IT) and the feature priority matrix (all features are v1), the following phase structure is recommended.

### Phase 1: Design System and CSS Foundation

**Rationale:** CSS design tokens are the single hard dependency for all subsequent phases. A color change after EN/IT pages exist forces triple-edits. Lock the visual system first so all three language files inherit it without changes.
**Delivers:** `assets/css/main.css` with complete token system, global reset, typography, responsive breakpoints, and skeleton layout classes; `assets/js/main.js` stub with IIFE structure; self-hosted font files; favicon and manifest files
**Addresses:** Design token architecture, CUBE CSS methodology, Cormorant Garamond + Lato font stack, responsive breakpoints (mobile-first, three breakpoints)
**Avoids:** Pitfall 5 (inline styles requiring find-and-replace across three language files); Pitfall 16 (render-blocking Google Fonts CDN)

### Phase 2: German Onepage (Primary Language, All 12 Sections)

**Rationale:** German is the primary SEO target and the only page a first visitor or search engine cares about most. Build it to completion before touching EN/IT so the structure, section IDs, and anchor scheme are final. Translating a moving target is wasteful.
**Delivers:** `/de/index.html` with all 12 sections (hero, quick-info bar, about, menu, Mittagstisch, gallery, reservation, groups/events, location, FAQ, contact, footer), sticky header, mobile nav, hreflang block, JSON-LD structured data, OG/Twitter meta, self-canonical
**Addresses:** All P1 table stakes features, all differentiator features (FAQ, Mittagstisch, trust signals, groups/events, local SEO copy, gallery)
**Avoids:** Pitfall 4 (lazy LCP hero image); Pitfall 7 (PDF-only menu); Pitfall 8 (sticky header obscuring anchors via `scroll-margin-top`); Pitfall 12 (single H1 per page)

### Phase 3: English and Italian Onepages

**Rationale:** Translate after DE is locked. Use DE as the source of truth; copy section structure and anchor IDs exactly (use language-neutral IDs like `#menu`, `#lunch`, `#location`). Add hreflang to all three files simultaneously so the reciprocal link cluster is complete at once.
**Delivers:** `/en/index.html` and `/it/index.html` each with full 12 sections, EN/IT meta/OG/schema, per-language JSON-LD, complete hreflang cluster across all three files
**Addresses:** Multilingual SEO value, independently indexed language versions, English and Italian tourist audiences
**Avoids:** Pitfall 1 (hreflang non-reciprocity — add all four tags to all three files in one pass); Pitfall 2 (cross-language canonicals); Pitfall 9 (language switcher loses scroll position — use neutral anchor IDs from the start)

### Phase 4: Legal Pages and Root Redirect

**Rationale:** Legal pages are simpler HTML (same CSS, no 12-section complexity) and can only be built after the main pages establish the navigation/footer pattern. The root redirect is meaningless until all three language directories exist. GDPR compliance is a legal requirement in Germany, not optional.
**Delivers:** `/de/impressum.html`, `/de/datenschutz.html`, `/en/legal.html`, `/en/privacy.html`, `/it/legale.html`, `/it/privacy.html`; root `/index.html` with language detection, localStorage check, `<noscript>` fallback, `noindex` meta
**Addresses:** German legal requirements (Impressum, Datenschutz are mandatory), GDPR/DSGVO compliance, language redirect UX for tourists
**Avoids:** Pitfall 3 (redirect loop from missing localStorage check); Pitfall 5 (Google Maps GDPR — Datenschutz must document the approach chosen)

### Phase 5: SEO Finalization and Technical Audit

**Rationale:** sitemap.xml can only be correct after all page URLs are final. Structured data validation, Core Web Vitals testing, and hreflang verification require a complete site. Run all validation tools before launch.
**Delivers:** `sitemap.xml` (all 9 pages: 3 onepages + 6 legal; root redirect excluded); `robots.txt`; Google Rich Results Test pass; PageSpeed Insights LCP < 2.5s pass; WAVE accessibility audit pass; hreflang reciprocity audit pass
**Addresses:** sitemap, robots.txt, Core Web Vitals compliance, WCAG 2.1 AA baseline, structured data validation
**Avoids:** Pitfall 6 (JSON-LD time format errors — validate with Rich Results Test); Pitfall 15 (root redirect in sitemap); Pitfall 11 (missing/generic alt text — WAVE catches these)

### Phase Ordering Rationale

- **CSS first** because design tokens are the only true hard dependency. Every subsequent phase inherits them. Changing a token after three language files exist means three edits — design system must be locked first.
- **DE before EN/IT** because the German version establishes section structure, anchor IDs, JSON-LD shape, and visual design. Translating a finalized page is fast; translating a changing page is rework.
- **EN/IT together** because hreflang reciprocity requires all three files to be updated simultaneously. Shipping EN without IT (or vice versa) leaves a broken hreflang cluster live.
- **Legal and root redirect last** because they have no dependencies of their own and depend on all main pages existing.
- **SEO audit last** because validation tools require complete, deployed content.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4 (Legal pages and GDPR):** The Datenschutzerklärung content requires German legal expertise — placeholder is sufficient for launch but must be reviewed by a lawyer before going live. Google Maps compliance decision (no iframe vs. consent gate) should be confirmed with a German DSGVO consultant. No deep technical research needed, but the legal content itself is a gap.
- **Phase 2 (Reservation section):** Reservation widget embed platform (TheFork vs. Resy vs. OpenTable) is undecided. The section must be built with a compliant placeholder and phone fallback that works standalone. Widget integration is a v1.x task once platform is chosen.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Design system):** CSS custom properties + CUBE CSS is a fully documented, high-confidence pattern. No unknowns.
- **Phase 3 (EN/IT translation):** Structural duplication of DE; purely a content task. Technical pattern is identical to Phase 2.
- **Phase 5 (SEO audit):** All validation tools and pass criteria are known (Rich Results Test, PageSpeed Insights, WAVE, manual hreflang audit). No research needed.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommendations verified against Google official docs (web.dev, Search Central), MDN, Evil Martians, piccalil.li. No inferences — all patterns are explicitly documented. |
| Features | HIGH (core), MEDIUM (competitive claims) | Table stakes features are well-documented across multiple independent sources. Competitive differentiation claims (CTR improvements from structured data, Mittagstisch search volume) are plausible but derived from industry studies, not primary data for Leipzig specifically. |
| Architecture | HIGH | Multilingual static site architecture is fully documented. Build-order dependencies are logical and verified against real-world practice. No ambiguity. |
| Pitfalls | HIGH | All critical pitfalls sourced from Google Search Central official documentation, GDPR enforcement records, and Core Web Vitals official research. The hreflang error rate (75%+ of multilingual sites) is a widely-cited industry audit finding. |

**Overall confidence:** HIGH

### Gaps to Address

- **Real photography assets:** Gallery, hero, and OG image sections require professional photography that does not yet exist. Build with placeholder images; establish a clear handoff process with the photographer for AVIF/WebP/JPEG exports at the specified dimensions.
- **Reservation platform decision:** TheFork, Resy, and OpenTable all have different embed patterns. The reservation section must be built with a fully functional phone-fallback CTA that stands on its own; platform-specific embed code is a v1.x task.
- **Legal text (Impressum + Datenschutz):** Placeholder content is explicitly not production-ready. Real German legal text requires a lawyer. The GDPR approach for Google Maps (iframe consent gate vs. static address only) should be confirmed before launch.
- **Analytics approach:** Google Analytics vs. Plausible vs. no analytics is undecided. If Plausible (self-hosted, GDPR-safe), no cookie banner needed. If Google Analytics, a proper consent management platform (CMP) is required — this changes the Datenschutz page materially.
- **Mittagstisch-specific German search patterns:** Feature research noted LOW confidence on Mittagstisch-specific local SEO behavior (limited English-language sources). The section structure and schema are correct regardless; keyword copy in the section should be reviewed by a German native speaker familiar with Leipzig local search intent.

---

## Sources

### Primary (HIGH confidence)
- https://web.dev/articles/font-best-practices — Font loading, preload, font-display (Google official)
- https://piccalil.li/blog/cube-css/ — CUBE CSS methodology (Andy Bell, actively maintained 2025)
- https://developers.google.com/search/docs/appearance/structured-data/local-business — LocalBusiness JSON-LD (Google Search Central)
- https://developers.google.com/search/docs/specialty/international/localized-versions — Hreflang official documentation
- https://schema.org/Restaurant — Restaurant schema properties
- https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs — Favicon minimal approach (updated 2024/2026)
- https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/loading — Native lazy loading browser support
- https://web.dev/articles/lcp-lazy-loading — Lazy loading LCP element pitfall
- https://www.iubenda.com/en/help/62728-google-maps-and-the-gdpr-how-to-be-compliant/ — Google Maps GDPR compliance
- https://www.clickrank.ai/hreflang-tags-complete-guide/ — Hreflang reciprocity rules and common errors

### Secondary (MEDIUM confidence)
- https://gwfh.mranftl.com — google-webfonts-helper tool for self-hosting fonts
- https://squoosh.app — Browser-based image compression
- https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/ — IntersectionObserver sticky header pattern
- https://siteseeingmedia.com/content-management-development/restaurant-menus-pdf-vs-html/ — PDF vs HTML menu SEO comparison
- https://tripleseat.com/blog/use-your-website-to-your-advantage-when-it-comes-to-selling-your-space/ — Groups/events inquiry best practices
- https://get.chownow.com/blog/restaurant-website-best-practices-and-examples/ — Restaurant website best practices 2025
- https://bytegoblin.io/blog/building-a-multilingual-static-website-a-step-by-step-guide — Multilingual static site folder structure
- https://gomakethings.com/the-vanilla-js-revealing-module-pattern/ — IIFE module pattern for no-build JS

### Tertiary (LOW confidence)
- Mittagstisch-specific German local search behavior — inferred from general local SEO restaurant research; no Leipzig-specific primary data available
- CTR improvement figures from structured data (20-30%) — industry study figures, not independently verified for this specific market

---

*Research completed: 2026-04-06*
*Ready for roadmap: yes*
