---
phase: 7
slug: root-redirect
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-08
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser testing + grep-based verification |
| **Config file** | none |
| **Quick run command** | `grep -i "noindex" index.html && grep -i "http-equiv" index.html` |
| **Full suite command** | Open root URL via local server, test DE/EN/IT/FR/no-JS scenarios |
| **Estimated runtime** | ~30 seconds (automated grep) / ~3 minutes (manual browser) |

---

## Sampling Rate

- **After every task commit:** Run quick grep verification on index.html
- **After every plan wave:** Full 5-scenario manual browser test (DE, EN, IT, FR-fallback, no-JS)
- **Before `/gsd-verify-work`:** Full suite must pass all scenarios
- **Max feedback latency:** 30 seconds (grep) / 3 minutes (manual)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 1 | LANG-04 | — | N/A | automated | `grep -i "noindex" index.html` | ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 1 | LANG-04 | — | N/A | automated | `grep "noscript" index.html && grep "http-equiv" index.html` | ❌ W0 | ⬜ pending |
| 07-01-03 | 01 | 1 | LANG-04 | — | Hardcoded redirect targets only | automated | `grep "location.replace" index.html` | ❌ W0 | ⬜ pending |
| 07-01-04 | 01 | 1 | LANG-04 | — | N/A | automated | `grep "navigator.languages" index.html` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `index.html` — root redirect file does not exist yet; the entire phase creates it

*Existing infrastructure covers all phase requirements — no test framework installation needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| German browser redirects to /de/ | LANG-04 | Requires browser language setting | Set Chrome DevTools language to de, open root URL, verify /de/ in address bar |
| English browser redirects to /en/ | LANG-04 | Requires browser language setting | Set Chrome DevTools language to en-US, open root URL, verify /en/ in address bar |
| Italian browser redirects to /it/ | LANG-04 | Requires browser language setting | Set Chrome DevTools language to it-IT, open root URL, verify /it/ in address bar |
| Unrecognized language falls back to /de/ | LANG-04 | Requires browser language setting | Set Chrome DevTools language to fr-FR, open root URL, verify /de/ in address bar |
| Back button skips redirect page | LANG-04 | Requires browser history interaction | Navigate to root → verify redirect → press back → should NOT return to root |
| No-JS fallback works | LANG-04 | Requires disabling JavaScript | Disable JS in Chrome DevTools, open root URL, verify redirect to /de/ |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
