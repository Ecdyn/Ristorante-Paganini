# Roadmap: Ristorante Paganini Website

## Overview

Build a complete premium multilingual static restaurant website in eight phases, following the hard build-order dependency the architecture demands: CSS design system first (tokens must be locked before any HTML is written), interactive JS foundation second, then the German onepage built to full completion before any translation work begins, translated to English and Italian together (hreflang reciprocity requires all three files to be complete simultaneously), legal pages once the navigation pattern is established, root redirect only after all language directories exist, and SEO files plus final validation last when all URLs are final. Every phase delivers a discrete, verifiable output. Nothing is built twice.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: CSS Design System** - Lock the visual token system, typography, layout skeleton, and responsive foundation before any HTML is written
- [ ] **Phase 2: JS and Asset Foundation** - Build the interactive behaviors (sticky header, mobile menu, smooth scroll) and all non-CSS static assets
- [ ] **Phase 3: German Onepage — Head and SEO Skeleton** - Build /de/index.html document structure with all meta, hreflang, JSON-LD, canonical, and favicon wiring
- [ ] **Phase 4: German Onepage — All 12 Content Sections** - Populate every content section (hero through footer) in the German page with full copy, CTAs, and performance-correct image markup
- [ ] **Phase 5: English and Italian Onepages** - Translate the German page into /en/index.html and /it/index.html simultaneously, completing the hreflang reciprocal cluster
- [ ] **Phase 6: Legal Pages** - Build all six legal pages (Impressum + Datenschutz per language) with placeholder content and GDPR-compliant documentation
- [ ] **Phase 7: Root Redirect** - Build the root index.html language detection and redirect, the final piece that connects all language directories
- [ ] **Phase 8: SEO Files and Technical Audit** - Generate sitemap.xml, robots.txt, and run all validation tools to confirm the site is launch-ready

## Phase Details

### Phase 1: CSS Design System
**Goal**: A single locked CSS file exists that defines every visual decision for the entire site — any HTML file that links it gets the correct typography, colors, spacing, and responsive layout without any additional work
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-02, FOUND-03, FOUND-07, FOUND-09, FOUND-10
**Success Criteria** (what must be TRUE):
  1. A developer can open assets/css/main.css and see all design token values in the :root block — colors, spacing scale, typography scale, z-index values, transition values — and change the accent color in one line to see it update everywhere
  2. Self-hosted woff2 font files for Cormorant Garamond and Lato exist in assets/fonts/ with @font-face declarations and font-display: swap, with no request to Google Fonts CDN at any point
  3. A blank HTML file linking only main.css renders correctly at 320px mobile width with touch-friendly spacing and at 1280px desktop width with appropriate layout shifts — no horizontal scroll at either breakpoint
  4. All editable content zones across every section type have a clear HTML comment convention documented in the CSS file header, ready for agency handoff
  5. Color contrast ratios across all token combinations meet WCAG 2.1 AA minimums (4.5:1 for text, 3:1 for UI components)
**Plans:** 2 plans
Plans:
- [x] 01-01-PLAN.md — Design tokens, @font-face declarations, global reset, and self-hosted font files
- [x] 01-02-PLAN.md — CUBE CSS layers 3-6 (composition, utilities, blocks, exceptions) with visual verification
**UI hint**: yes

### Phase 2: JS and Asset Foundation
**Goal**: All JavaScript behaviors and static assets are in place so the DE page can be built as a complete working page from the first line of HTML
**Depends on**: Phase 1
**Requirements**: FOUND-04, FOUND-05, FOUND-06, PERF-03, PERF-04, FOUND-08, SEO-09
**Success Criteria** (what must be TRUE):
  1. The sticky header shows, hides, and reappears correctly on scroll in both Chrome and Safari mobile without layout shift or janky behavior — implemented via IntersectionObserver, not a scroll event listener
  2. The hamburger mobile menu opens and closes with a single tap, is navigable by keyboard, and has correct aria-expanded state that toggles with each interaction
  3. Smooth anchor scrolling works and anchored sections land with the correct scroll-padding-top offset so the sticky header never obscures the section heading
  4. assets/js/main.js loads with the defer attribute, contains no inline script blocks, and causes zero render-blocking measured by a Lighthouse test on any page
  5. Favicon files (SVG, ICO, apple-touch-icon, webmanifest) exist in assets/ and are correctly referenced, and AVIF/WebP/JPEG source image sets are organized in assets/img/ ready for use in picture elements
**Plans:** 2 plans
Plans:
- [x] 02-01-PLAN.md — JS behaviors (sticky header, mobile menu) + CSS state hooks + test harness
- [x] 02-02-PLAN.md — Favicon set (SVG, ICO, PNG, webmanifest) + SVG placeholder images
**UI hint**: yes

### Phase 3: German Onepage — Head and SEO Skeleton
**Goal**: The /de/index.html file exists as a valid HTML5 document with a complete, correct head section — all meta tags, hreflang, JSON-LD structured data, and canonical wiring in place before a single word of content is written in the body
**Depends on**: Phase 2
**Requirements**: FOUND-01, LANG-01, SEO-01, SEO-02, SEO-03, SEO-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. Google's Rich Results Test returns zero errors on the JSON-LD Restaurant + LocalBusiness block — all required fields present, openingHoursSpecification correctly formatted, PostalAddress complete with placeholder values clearly commented
  2. The hreflang block contains all four tags (hreflang="de", hreflang="en", hreflang="it", hreflang="x-default") using absolute URLs, and the self-canonical tag points to the DE URL — not any other language version
  3. OG and Twitter card tags are present with correct og:locale="de_DE", og:type="restaurant", and a placeholder og:image path that resolves to a real file in assets/img/og/
  4. The HTML document has exactly one H1 element in the skeleton markup, lang="de" on the html element, and all 12 section anchor IDs (language-neutral: #menu, #lunch, #location, etc.) defined as empty section elements ready for content
**Plans:** 1 plan
Plans:
- [x] 03-01-PLAN.md — Complete de/index.html with head (meta, hreflang, JSON-LD, OG, Twitter, favicon, CSS/JS) and body skeleton (header/nav, 12 sections, footer)

### Phase 4: German Onepage — All 12 Content Sections
**Goal**: /de/index.html is a complete, fully-functional German restaurant page that a real visitor can use — every section has its content, every CTA works, every image loads correctly, and the page passes Core Web Vitals
**Depends on**: Phase 3
**Requirements**: SECT-01, SECT-02, SECT-03, SECT-04, SECT-05, SECT-06, SECT-07, SECT-08, SECT-09, SECT-10, SECT-11, SECT-12, LANG-05, SEO-08, PERF-01, PERF-02
**Success Criteria** (what must be TRUE):
  1. A visitor can load the page on mobile, see the hero image with restaurant name and reservation CTA above the fold, and tap the reservation button within three seconds of arriving — the hero image loads eagerly with fetchpriority="high" and scores LCP under 2.5 seconds on a simulated mobile connection in Lighthouse
  2. A visitor can tap the navigation menu, see all 12 section links with German labels, tap any one, and land at that section with the heading visible (not obscured by the sticky header)
  3. The menu section shows an HTML preview of pasta, pizza, antipasti, and wine with a "Speisekarte herunterladen" PDF link that resolves to a real (placeholder) PDF file — content is crawlable, not PDF-only
  4. The business lunch section displays the 11:30–14:30 hours, a monthly-updatable highlights block, and a PDF link, with clear HTML comments marking every field an agency would need to update each month
  5. The gallery loads with CSS grid, below-fold images carry loading="lazy" and decoding="async", the location section shows a static address with a Google Maps link (no iframe), and the groups section has phone + email CTAs only (no form, no backend dependency)
  6. The FAQ section contains 7 complete questions and answers written in natural German targeting local Leipzig search intent, and the FAQPage JSON-LD in the head matches every question on the page exactly
**Plans:** 4 plans
Plans:
- [x] 04-01-PLAN.md — CSS blocks for content sections + placeholder PDFs
- [x] 04-02-PLAN.md — Hero, info bar, about, menu, and business lunch sections
- [x] 04-03-PLAN.md — Gallery lightbox JavaScript behavior
- [x] 04-04-PLAN.md — Gallery, reservation, events, location, FAQ, contact, footer + FAQPage JSON-LD
**UI hint**: yes

### Phase 5: English and Italian Onepages
**Goal**: Two fully-localized language versions exist at /en/index.html and /it/index.html, the hreflang reciprocal cluster is complete across all three language files simultaneously, and English and Italian visitors get a fully localized experience
**Depends on**: Phase 4
**Requirements**: LANG-02, LANG-03
**Success Criteria** (what must be TRUE):
  1. Every page in the site (DE, EN, IT) contains all four hreflang link tags pointing to absolute URLs for each language version — no language file is missing a return tag for any other language, and a hreflang validation tool reports zero errors
  2. The EN and IT pages each have self-canonical tags pointing to their own respective URLs (not the DE URL), og:locale set to en_GB and it_IT respectively, and JSON-LD with all translatable fields in the correct language
  3. All 12 sections in both EN and IT pages carry fully localized content — nav labels, button text, headings, body copy, FAQ questions, and schema — with no German strings remaining anywhere on the page
  4. The language switcher links in all three footers (DE, EN, IT) navigate correctly to the other two language versions, and all anchor IDs are language-neutral so switcher links land at the equivalent section in the target language
**Plans:** 3 plans
Plans:
- [ ] 05-01-PLAN.md — Create en/index.html with full English localization
- [ ] 05-02-PLAN.md — Create it/index.html with full Italian localization
- [ ] 05-03-PLAN.md — Cross-validate hreflang reciprocity and visual verification
**UI hint**: yes

### Phase 6: Legal Pages
**Goal**: All six legal pages exist with placeholder content, are linked from all footers, use the same shared CSS and design system, and the Datenschutz pages explicitly document the GDPR decisions made for this site
**Depends on**: Phase 5
**Requirements**: LANG-06
**Success Criteria** (what must be TRUE):
  1. Six legal page files exist: /de/impressum.html, /de/datenschutz.html, /en/legal.html, /en/privacy.html, /it/legale.html, /it/privacy.html — each loads with correct shared CSS, has a noindex meta tag, and links back to the main onepage
  2. Every footer in all three language onepages links to the correct legal pages for that language, and those links are keyboard-reachable
  3. Each Datenschutz/privacy page contains a clearly commented placeholder section documenting the Google Maps decision (static address + link, no iframe) and states that no Google Fonts CDN is used — matching the actual implementation
  4. All editable legal placeholder areas are marked with prominent HTML comments reading "REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH" with the specific section identified
**Plans:** TBD
**UI hint**: yes

### Phase 7: Root Redirect
**Goal**: The root index.html correctly detects visitor browser language and redirects to the appropriate language subdirectory without creating back-button loops, with a safe fallback to German for unrecognized languages
**Depends on**: Phase 6
**Requirements**: LANG-04
**Success Criteria** (what must be TRUE):
  1. A browser with Accept-Language set to German is redirected to /de/ immediately on loading the root URL, a browser set to English is redirected to /en/, and a browser set to Italian is redirected to /it/ — all using window.location.replace() to prevent a back-button loop back to the redirect page
  2. A browser with an unrecognized language (e.g., French, Japanese) is redirected to /de/ as the default fallback
  3. The root index.html carries a meta noindex tag, contains no visible content, and is not listed in sitemap.xml — it is a redirect utility only
  4. A noscript fallback meta refresh tag redirects to /de/ for browsers with JavaScript disabled
**Plans:** 1 plan
Plans:
- [x] 07-01-PLAN.md — Root index.html with language detection, branded flash, noscript fallback, and noindex meta

### Phase 8: SEO Files and Technical Audit
**Goal**: The site has complete SEO infrastructure files and passes all technical validation checks — the site is launch-ready with zero known errors in structured data, hreflang, Core Web Vitals, or accessibility
**Depends on**: Phase 7
**Requirements**: SEO-06, SEO-07
**Success Criteria** (what must be TRUE):
  1. sitemap.xml lists all nine content pages (3 onepages + 6 legal pages) with hreflang alternate entries — the root redirect page is absent from the sitemap, and the sitemap URL is referenced in robots.txt
  2. robots.txt allows all crawlers on all content pages, disallows crawling of the root redirect, and includes the sitemap directive pointing to the absolute sitemap.xml URL
  3. Google's Rich Results Test returns zero errors on all three language onepages — Restaurant, LocalBusiness, and FAQPage structured data all validate cleanly
  4. Lighthouse on the German onepage scores LCP under 2.5 seconds, zero CLS, and flags zero render-blocking resources
  5. A WAVE accessibility audit on all three onepages returns zero errors (contrast, missing alt, missing form labels, heading hierarchy)

**Plans:** TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. CSS Design System | 2/2 | Complete | - |
| 2. JS and Asset Foundation | 2/2 | Complete | - |
| 3. German Onepage — Head and SEO Skeleton | 1/1 | Complete | - |
| 4. German Onepage — All 12 Content Sections | 4/4 | Complete | - |
| 5. English and Italian Onepages | 0/3 | Planning complete | - |
| 6. Legal Pages | 0/TBD | Not started | - |
| 7. Root Redirect | 0/1 | Planning complete | - |
| 8. SEO Files and Technical Audit | 0/TBD | Not started | - |
