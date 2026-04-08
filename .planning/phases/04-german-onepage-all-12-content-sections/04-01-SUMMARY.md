---
phase: 04-german-onepage-all-12-content-sections
plan: 01
subsystem: ui
tags: [css, cube-css, gallery, lightbox, menu-cards, pdf]

# Dependency graph
requires:
  - phase: 01-css-design-system
    provides: "Design tokens, CUBE CSS composition classes, section/btn blocks"
provides:
  - "15 new CSS block classes for Phase 4 content sections (gallery, lightbox, menu-cards, info-bar, faq-list, lunch-highlights, section-label)"
  - "Placeholder PDFs for menu and lunch download CTAs"
affects: [04-02, 04-03, 05-english-translation, 06-italian-translation]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Gallery 3-col grid with hover captions via data-span attribute", "Lightbox modal via data-open state attribute mirroring mobile-menu pattern", "Menu card grid with responsive 1/2/4 column breakpoints"]

key-files:
  created:
    - assets/pdf/speisekarte.pdf
    - assets/pdf/mittagskarte.pdf
  modified:
    - assets/css/main.css

key-decisions:
  - "H3 in menu-card uses font-size: 1rem with font-heading typeface per UI-SPEC override, not --font-size-heading-sm (22px)"
  - "Gallery grid uses 3-col desktop / 2-col tablet / 1-col mobile breakpoints at 64rem and 48rem"
  - "Lightbox uses data-open attribute pattern mirroring existing mobile-menu implementation"

patterns-established:
  - "Gallery hover caption: .gallery__caption with opacity transition, shown on :hover and :focus-within"
  - "Card component: .menu-card with shadow, radius, padding from design tokens"
  - "Lunch slot: left border accent for editable content slots"

requirements-completed: [SECT-04, SECT-05, SECT-06, PERF-02]

# Metrics
duration: 2min
completed: 2026-04-08
---

# Phase 4 Plan 01: CSS Blocks and PDF Assets Summary

**15 new CUBE CSS blocks for gallery/lightbox/menu-cards/info-bar/faq-list/lunch-highlights plus placeholder PDFs for download CTAs**

## Performance

- **Duration:** 2 min
- **Started:** 2026-04-08T08:38:32Z
- **Completed:** 2026-04-08T08:40:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Added 15 CSS block classes to main.css Section 5 (BLOCKS) covering all Phase 4 content sections
- Gallery grid with 3-column desktop layout, 2-column span image, hover captions, and lightbox modal CSS
- Menu card responsive grid (1/2/4 columns), info-bar utility strip, FAQ list, lunch highlights with accent border
- Created two placeholder PDF files for menu and lunch download CTAs

## Task Commits

Each task was committed atomically:

1. **Task 1: Add all Phase 4 CSS blocks to main.css** - `905efb4` (feat)
2. **Task 2: Create placeholder PDF files for menu download CTAs** - `9608624` (chore)

## Files Created/Modified
- `assets/css/main.css` - Extended with 15 new CSS block classes (219 lines added) in Section 5 before Exceptions
- `assets/pdf/speisekarte.pdf` - Placeholder PDF for full menu download CTA
- `assets/pdf/mittagskarte.pdf` - Placeholder PDF for lunch menu download CTA

## Decisions Made
- H3 elements in new blocks use `font-size: 1rem` with `var(--font-heading)` per UI-SPEC override, not `--font-size-heading-sm`
- Gallery caption uses `rgba(28, 12, 14, 0.8)` background matching UI-SPEC dark overlay specification
- Lightbox modal mirrors the existing `.mobile-menu` data-open pattern for consistency
- FAQ list styles both `dt` and `summary` elements to support either `<dl>` or `<details>` approach by downstream plans

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All CSS classes ready for Plans 02 and 03 to reference in HTML markup
- Placeholder PDFs ready for download CTA href attributes
- Gallery, lightbox, menu-card, info-bar, FAQ, and lunch blocks all tested for class existence

## Self-Check: PASSED

- All 3 files exist (main.css, speisekarte.pdf, mittagskarte.pdf)
- Both commits found in git log (905efb4, 9608624)
- CSS blocks verified: gallery grid, lightbox z-index, menu-card shadow all present
- No hard-coded hex values in new CSS blocks

---
*Phase: 04-german-onepage-all-12-content-sections*
*Completed: 2026-04-08*
