# Retrospective

## Milestone: v1.0 — MVP

**Shipped:** 2026-04-10
**Phases:** 8 | **Plans:** 17 | **Tasks:** 27
**Timeline:** 5 days (2026-04-06 → 2026-04-10)
**LOC:** 4,854 lines (HTML/CSS/JS deliverables)

### What Was Built

- CSS design system with custom properties for typography, colors, spacing, and responsive layout (CUBE CSS methodology)
- Sticky header, mobile hamburger menu, smooth scroll, and language redirect in vanilla JS
- Complete German onepage (de/index.html) with 12 content sections, JSON-LD Restaurant+LocalBusiness+FAQPage schemas, hreflang cluster, OG/Twitter meta
- English and Italian fully-localized onepages with reciprocal hreflang across all three
- Six legal pages (Impressum + Datenschutz per language) with placeholder content and noindex meta
- Root redirect with browser language detection, branded flash screen, noscript fallback
- sitemap.xml with multilingual hreflang alternates, robots.txt with crawler directives
- JSON-LD validation script (tools/validate.js) — 33/33 checks passing across all onepages

### What Worked

- **Strict build-order dependency chain** — CSS tokens locked before HTML, DE complete before translation, all language files before root redirect. Zero rework.
- **Separate HTML files per language** — Clean hreflang, independent indexing, no JS failure mode for language switching
- **GDPR-first decisions early** — Self-hosted fonts, no Google Maps iframe, no tracking. Avoided retrofit pain.
- **Placeholder-based approach** — Domain, images, legal text, reservation widget all use clear placeholders with REPLACE comments. Launch handoff is a find-replace exercise.

### What Was Inefficient

- REQUIREMENTS.md traceability table was never updated during phase execution — all 35 requirements stayed "Pending" despite being shipped. The check-off step was missing from phase completion workflow.
- ROADMAP success criterion for sitemap scope (said "9 pages") conflicted with the research decision D-01 (exclude noindex pages). ROADMAP should have been updated when the decision was made.

### Patterns Established

- CUBE CSS methodology with custom properties as design tokens
- Self-hosted woff2 fonts via google-webfonts-helper
- AVIF → WebP → JPEG picture element fallback stack
- JSON-LD structured data in separate script blocks per schema type
- HTML comment markers for agency-editable content areas
- Consistent placeholder domain (example.com) with REPLACE comments

### Key Lessons

- Update ROADMAP success criteria when research decisions change scope — don't leave stale numbers
- Requirements traceability needs an automated check-off step at phase completion, not manual
- For a static site with no build step, the entire development cycle is fast — 5 days for a complete multilingual restaurant site

### Cost Observations

- Model mix: predominantly Sonnet for execution agents, Opus for orchestration
- Sessions: ~8-10 across 5 days
- Notable: Worktree isolation worked well for parallel plan execution within waves

## Cross-Milestone Trends

| Metric | v1.0 |
|--------|------|
| Phases | 8 |
| Plans | 17 |
| Tasks | 27 |
| Days | 5 |
| LOC | 4,854 |
| Rework phases | 0 |
