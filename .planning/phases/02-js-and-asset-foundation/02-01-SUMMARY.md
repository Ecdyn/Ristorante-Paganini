---
phase: 02-js-and-asset-foundation
plan: "01"
subsystem: js-css
tags: [sticky-header, mobile-menu, intersection-observer, focus-trap, accessibility, css-hooks]
dependency_graph:
  requires:
    - assets/css/main.css (Phase 1 design tokens and base rules)
  provides:
    - assets/js/main.js
    - assets/css/main.css (expanded with header states, hamburger, mobile menu overlay)
    - assets/css/test.html (expanded with JS-testable markup)
  affects:
    - Phase 3 HTML pages (link main.js with defer, use site-header ID, hero-sentinel, mobile-menu markup)
tech_stack:
  added: []
  patterns:
    - IntersectionObserver for sentinel-based header state detection (off main thread)
    - requestAnimationFrame-throttled scroll direction with 5px dead zone
    - data-* attribute state machine (CSS handles visual states, JS toggles attributes)
    - IIFE module pattern (no build step, no imports)
    - Focus trap with Tab cycling for modal overlay
key_files:
  created:
    - assets/js/main.js
  modified:
    - assets/css/main.css
    - assets/css/test.html
decisions:
  - "Used data-state attribute (scrolled/hidden/absent) matching existing CSS selectors from Phase 1"
  - "Scroll listener uses passive: true and rAF throttle to avoid main thread blocking"
  - "Focus trap cycles between first and last focusable elements with Shift+Tab and Tab"
  - "Section 3 (smooth scroll) is CSS-only — JS file contains only a comment block"
metrics:
  duration: "~5 minutes"
  completed: "2026-04-07T20:25:00Z"
  tasks_completed: 3
  files_created: 1
  files_modified: 2
---

# Phase 2 Plan 01: JS Interactive Behaviors Summary

Sticky header with IntersectionObserver + scroll direction detection, full-screen mobile menu with focus trap and keyboard accessibility, and expanded test harness — all interactive behaviors needed before Phase 3 HTML can be built.

## What Was Built

### Task 1: CSS Hooks for Header States, Hamburger, and Mobile Menu

Expanded `assets/css/main.css` with new blocks and exceptions:

- **`.menu-toggle`**: 44x44px hamburger button (3 bars), hidden on desktop, flex on mobile (<1024px)
- **`.mobile-menu`**: Fixed full-screen overlay (z-index: --z-overlay), dark background (--color-surface-dark), visibility/opacity toggle via `[data-open="true"]`
- **`.mobile-menu-close`**: Absolute-positioned close button with 44px min touch target
- **`.header:not([data-state])`**: Transparent state over hero — white text, transparent background
- **`.header[data-state="scrolled"]`**: Solid cream background, --shadow-sm (updated from --shadow-md per D-02)
- **`.header[data-state="hidden"]`**: translateY(-100%) with expanded transition properties
- **`.hero-sentinel`**: 1x1px absolute-positioned element at hero bottom for IO detection

### Task 2: assets/js/main.js

Single production JavaScript file with two IIFEs (143 lines total):

**initStickyHeader:**
- IntersectionObserver watches `.hero-sentinel` with threshold 0
- When hero visible: `delete header.dataset.state` (transparent)
- When past hero: `header.dataset.state = 'scrolled'` (solid)
- Scroll direction via rAF-throttled listener with 5px dead zone
- Scrolling down: `data-state="hidden"` / Scrolling up: `data-state="scrolled"`

**initMobileMenu:**
- `aria-expanded` toggled on hamburger button
- `data-open` toggled on `.mobile-menu` overlay
- `document.body.style.overflow` locked when open
- Focus trap: Tab cycles through focusable elements, Shift+Tab wraps
- Escape key closes menu, returns focus to toggle
- Anchor links with `href^="#"` auto-close overlay

**Section 3 (Smooth Scroll):** Comment-only — CSS handles via `scroll-behavior: smooth`.

### Task 3: Expanded test.html

- Added `<script src="../js/main.js" defer>` in head
- Added `id="site-header"` to header element
- Added hamburger button (`#menu-toggle`) with `aria-expanded="false"` and `aria-controls="mobile-menu"`
- Added mobile menu overlay (`#mobile-menu`) with `role="dialog"`, `aria-modal="true"`, close button, 5 anchor links
- Added `.hero-sentinel` div inside hero section
- Updated title to "CSS + JS Test — Ristorante Paganini"

## Deviations from Plan

None. All tasks executed as specified.

## Known Stubs

None. All behaviors are complete and functional.

## Threat Surface Scan

Per threat model:
- **T-02-01 (Tampering)**: No innerHTML or dynamic content injection. All state changes use dataset property assignment and setAttribute with hardcoded attribute names.
- **T-02-03 (DoS)**: Scroll listener throttled via rAF (max ~60 calls/sec). Primary detection uses IntersectionObserver (off main thread).

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | f925b8f | feat(02-01): add CSS for header transparent state, hamburger button, and mobile menu overlay |
| Task 2 | 07b6db7 | feat(02-01): create main.js with sticky header and mobile menu behaviors |
| Task 3 | 387b7bf | feat(02-01): expand test.html with JS-testable markup and script tag |

## Self-Check

- assets/js/main.js exists with IntersectionObserver (2), dataset.state (4), dataset.open (2), aria-expanded (4), Escape (3), focus (multiple)
- assets/css/main.css contains .menu-toggle, .mobile-menu, .hero-sentinel, data-open selectors
- assets/css/test.html contains script defer, site-header, menu-toggle, mobile-menu, hero-sentinel
- All 3 task commits confirmed in git log

## Self-Check: PASSED