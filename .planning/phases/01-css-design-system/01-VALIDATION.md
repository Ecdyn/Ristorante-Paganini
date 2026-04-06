---
phase: 1
slug: css-design-system
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-06
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification + automated grep/file checks (CSS-only phase) |
| **Config file** | none |
| **Quick run command** | `test -f assets/css/main.css && grep -c "@font-face" assets/css/main.css && echo "OK"` |
| **Full suite command** | `test -f assets/css/main.css && grep -c "@font-face" assets/css/main.css && grep "min-width: 48rem" assets/css/main.css && grep "data-variant" assets/css/main.css && echo "FULL OK"` |
| **Estimated runtime** | ~5 seconds (automated) + ~5 minutes (manual browser + contrast checks) |

---

## Sampling Rate

- **After every task commit:** Automated grep/file-existence checks from plan verify blocks
- **After every plan wave:** Full WCAG contrast check via webaim.org for all 5 pairs
- **Before `/gsd-verify-work`:** Full suite of manual verifications below
- **Max feedback latency:** 5 seconds (automated), 5 minutes (manual)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-07 | T-01-01 | No Google CDN requests | automated | `test -f assets/fonts/cormorant-garamond-v22-latin-regular.woff2 && test -f assets/fonts/lato-v24-latin-regular.woff2 && echo "FONTS OK"` | yes (W0) | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-02, FOUND-10 | — | N/A | automated | `test -f assets/css/main.css && grep -c "\-\-color-accent" assets/css/main.css && grep -c "@font-face" assets/css/main.css && grep -c "EDITABLE" assets/css/main.css && echo "CSS STRUCTURE VERIFIED"` | yes (W0) | ⬜ pending |
| 1-02-01 | 02 | 2 | FOUND-03 | — | N/A | automated | `grep -c "\.wrapper" assets/css/main.css && grep "min-width: 48rem" assets/css/main.css && grep "min-width: 64rem" assets/css/main.css && grep "data-variant" assets/css/main.css && echo "LAYERS 3-6 VERIFIED"` | yes (W0) | ⬜ pending |
| 1-02-02 | 02 | 2 | FOUND-03 | — | N/A | automated | `test -f assets/css/test.html && grep "main.css" assets/css/test.html && grep "data-variant" assets/css/test.html && echo "TEST PAGE VERIFIED"` | yes (W0) | ⬜ pending |
| 1-02-03 | 02 | 2 | FOUND-09 | — | N/A | manual | Human: webaim.org contrast checker for all 5 pairs >= 4.5:1 + visual check at 320px/1280px | N/A (checkpoint) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] `assets/css/main.css` — created in Plan 01 Task 2 with :root design tokens block
- [x] `assets/fonts/` — created in Plan 01 Task 1 with 4 woff2 files
- [x] All automated verify commands defined in plan files

*Existing infrastructure: none — greenfield project. Wave 0 is satisfied by Plan 01 Task 1 (fonts) and Task 2 (CSS file creation).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Design tokens render correctly at mobile/desktop | FOUND-03 | CSS rendering requires browser viewport | Open test HTML in browser, toggle DevTools to 320px and 1280px widths |
| Color contrast meets WCAG 2.1 AA (all 5 pairs) | FOUND-09 | Contrast ratios require visual measurement tool | Enter each of the 5 text/background hex pairs at webaim.org/resources/contrastchecker — all must pass >= 4.5:1 |
| Font files load without Google CDN request | FOUND-07 | Network requests require browser DevTools | Open page, check Network tab for fonts.googleapis.com — must show zero requests |
| Editable zones documented in CSS header | FOUND-10 | Documentation quality is manual review | Read CSS file header, verify comment convention explains editable sections |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or are checkpoint tasks
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all file creation dependencies
- [x] No watch-mode flags
- [x] Feedback latency < 30s (automated checks < 5s)
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** signed off
