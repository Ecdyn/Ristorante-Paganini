---
phase: 2
slug: js-and-asset-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-07
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — manual browser testing + Lighthouse |
| **Config file** | None — Wave 0 creates test harness |
| **Quick run command** | Open `assets/css/test.html` in browser (visual smoke test) |
| **Full suite command** | Lighthouse CLI or browser DevTools Lighthouse panel |
| **Estimated runtime** | ~30 seconds (manual) |

---

## Sampling Rate

- **After every task commit:** Open `assets/css/test.html` in browser, visually verify changed behavior
- **After every plan wave:** Full Lighthouse run on test page
- **Before `/gsd-verify-work`:** Manual checklist of all 5 success criteria
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | FOUND-04 | — | N/A | Manual browser | Open test.html, scroll down — header gets `data-state="scrolled"` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | FOUND-05 | — | N/A | Manual browser | Open test.html, use keyboard — hamburger toggles `aria-expanded`, focus trap, Escape closes | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | FOUND-06 | — | N/A | Manual browser | Open test.html, click nav links — smooth scroll, header doesn't obscure | ❌ W0 | ⬜ pending |
| 02-01-04 | 01 | 1 | FOUND-08 | — | N/A | HTML validator | W3C validator on test page — picture elements have AVIF/WebP/JPEG, img has width+height | ❌ W0 | ⬜ pending |
| 02-01-05 | 01 | 1 | PERF-03 | — | N/A | Lighthouse | `npx lighthouse file:///.../test.html --only-categories=performance` | ❌ W0 | ⬜ pending |
| 02-01-06 | 01 | 1 | PERF-04 | — | N/A | Code review | `grep -r "<script" de/index.html` — only defer, no inline | N/A Phase 2 | ⬜ pending |
| 02-01-07 | 01 | 1 | SEO-09 | — | N/A | Browser + JSON | Check browser tab icon, validate webmanifest JSON | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `assets/css/test.html` — expand existing test harness to include header, hero sentinel, mobile menu markup, and nav anchor links for JS behavior testing
- [ ] Lighthouse availability — confirm `npx lighthouse` or use browser DevTools panel

*Note: `assets/css/test.html` already exists from Phase 1 — may need expansion for JS test scaffolding.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Sticky header hide/show on scroll | FOUND-04 | IntersectionObserver requires real browser DOM | Scroll down past hero — header hides. Scroll up — header reappears. Check `data-state` attribute in DevTools. |
| Mobile menu keyboard navigation | FOUND-05 | Focus trap requires real keyboard input | Open hamburger, Tab through links, press Escape — menu closes, focus returns to hamburger. |
| Smooth scroll offset | FOUND-06 | scroll-padding-top visual check | Click anchor link — section heading visible below header, not obscured. |
| Safari mobile behavior | FOUND-04 | Cross-browser check | Repeat sticky header tests in Safari iOS — verify no layout shift or jank. |

---

## Validation Sign-Off

- [ ] All tasks have manual verify or Wave 0 dependencies
- [ ] Sampling continuity: visual check after every task commit
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
