---
phase: 06-legal-pages
plan: 01
subsystem: ui
tags: [html, legal, impressum, datenschutz, gdpr, dsgvo, noindex]

# Dependency graph
requires:
  - phase: 03-german-onepage-head-and-seo-skeleton
    provides: head boilerplate pattern (charset, viewport, favicon, CSS link)
  - phase: 04-german-onepage-body
    provides: shared CSS design system (main.css with .wrapper, .content-wrapper, .flow, .section--dark)
provides:
  - de/impressum.html with TMG section structure and placeholder content
  - de/datenschutz.html with GDPR factual documentation and placeholder content
  - Legal page template pattern (header, content-wrapper, footer) for EN/IT legal pages
affects: [06-legal-pages plan 02 (EN legal pages), 06-legal-pages plan 03 (IT legal pages)]

# Tech tracking
tech-stack:
  added: []
  patterns: [legal page skeleton with minimal header/footer, GDPR factual documentation section]

key-files:
  created:
    - de/impressum.html
    - de/datenschutz.html
  modified: []

key-decisions:
  - "Used HTML entities for umlauts in title tag for maximum compatibility"
  - "GDPR documentation section uses factual language verifiable against codebase"

patterns-established:
  - "Legal page structure: section--dark header with back link, content-wrapper main, minimal footer with language switcher"
  - "Placeholder marking: HTML comments with REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH prefix"

requirements-completed: [LANG-06]

# Metrics
duration: 2min
completed: 2026-04-08
---

# Phase 6 Plan 1: German Legal Pages Summary

**German Impressum and Datenschutz pages with TMG section structure, GDPR factual documentation, and placeholder content marked for lawyer review**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-08T14:45:07Z
- **Completed:** 2026-04-08T14:47:11Z
- **Tasks:** 2
- **Files created:** 2

## Accomplishments
- Created de/impressum.html with 6 TMG-structured legal sections and 7 placeholder comments
- Created de/datenschutz.html with 4 factual GDPR documentation subsections covering self-hosted fonts, no Maps iframe, no cookies, no forms
- Both pages use shared CSS, noindex meta, correct favicon references, and minimal header/footer pattern
- Established reusable legal page template for EN and IT versions

## Task Commits

Each task was committed atomically:

1. **Task 1: Create de/impressum.html** - `f81842c` (feat)
2. **Task 2: Create de/datenschutz.html** - `83ae815` (feat)

## Files Created/Modified
- `de/impressum.html` - German Impressum with 6 legal sections (Angaben, Kontakt, USt-ID, Streitschlichtung, Haftung Inhalte/Links)
- `de/datenschutz.html` - German Datenschutz with 4 placeholder sections + 4 factual GDPR documentation subsections + 3 remaining placeholder sections

## Decisions Made
- Used HTML entities for umlauts in title tags for maximum browser compatibility
- GDPR factual documentation section placed between placeholder sections (after Cookies, before Drittanbieter) for logical reading flow

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- German legal pages complete and ready to serve as template for EN (plan 02) and IT (plan 03) legal pages
- Both files can be opened directly in browser with shared CSS for visual verification

## Self-Check: PASSED

- [x] de/impressum.html exists
- [x] de/datenschutz.html exists
- [x] 06-01-SUMMARY.md exists
- [x] Commit f81842c found
- [x] Commit 83ae815 found

---
*Phase: 06-legal-pages*
*Completed: 2026-04-08*
