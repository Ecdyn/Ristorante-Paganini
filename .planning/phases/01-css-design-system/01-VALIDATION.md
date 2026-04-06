---
phase: 1
slug: css-design-system
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-06
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification (no test framework — CSS-only phase) |
| **Config file** | none |
| **Quick run command** | `echo "CSS-only phase — manual browser verification"` |
| **Full suite command** | `echo "CSS-only phase — manual browser verification"` |
| **Estimated runtime** | ~30 seconds (manual viewport check) |

---

## Sampling Rate

- **After every task commit:** Visual inspection at 320px and 1280px viewport widths
- **After every plan wave:** Full WCAG contrast check via webaim.org
- **Before `/gsd-verify-work`:** Full suite of manual verifications below
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-02 | — | N/A | manual | `grep ':root' assets/css/main.css` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-07 | — | N/A | manual | `ls assets/fonts/*.woff2` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 1 | FOUND-03 | — | N/A | manual | Browser DevTools at 320px and 1280px | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 1 | FOUND-09 | — | N/A | manual | webaim.org contrast checker | ❌ W0 | ⬜ pending |
| 1-01-05 | 01 | 1 | FOUND-01 | — | N/A | manual | `grep -c 'section\|header\|footer\|nav\|main' assets/css/main.css` | ❌ W0 | ⬜ pending |
| 1-01-06 | 01 | 1 | FOUND-10 | — | N/A | manual | `grep 'EDITABLE' assets/css/main.css` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `assets/css/main.css` — create file with :root design tokens block
- [ ] `assets/fonts/` — download and place woff2 files for Cormorant Garamond (400, 400i) and Lato (400, 700)

*Existing infrastructure: none — greenfield project.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Design tokens render correctly at mobile/desktop | FOUND-03 | CSS rendering requires browser viewport | Open test HTML in browser, toggle DevTools to 320px and 1280px widths |
| Color contrast meets WCAG 2.1 AA | FOUND-09 | Contrast ratios require visual measurement tool | Enter each text/background hex pair at webaim.org/resources/contrastchecker |
| Font files load without Google CDN request | FOUND-07 | Network requests require browser DevTools | Open page, check Network tab for fonts.googleapis.com — must show zero requests |
| Editable zones documented in CSS header | FOUND-10 | Documentation quality is manual review | Read CSS file header, verify comment convention explains editable sections |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
