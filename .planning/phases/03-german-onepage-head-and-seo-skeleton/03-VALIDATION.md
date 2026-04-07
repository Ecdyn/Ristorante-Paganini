---
phase: 3
slug: german-onepage-head-and-seo-skeleton
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-07
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | CLI-based (grep, W3C Nu HTML Checker, JSON-LD Playground) |
| **Config file** | none — static HTML validation only |
| **Quick run command** | `grep -c '<section' de/index.html && grep -c 'hreflang' de/index.html` |
| **Full suite command** | `npx html-validate de/index.html 2>/dev/null || echo "Install html-validate for full validation"` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick grep checks on de/index.html
- **After every plan wave:** Run full HTML structure validation
- **Before `/gsd-verify-work`:** All grep checks must pass
- **Max feedback latency:** 2 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | FOUND-01 | — | N/A | grep | `test -f de/index.html && grep -q 'lang="de"' de/index.html` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | SEO-01 | — | N/A | grep | `grep -q 'application/ld+json' de/index.html` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1 | SEO-02 | — | N/A | grep | `grep -c 'hreflang' de/index.html` (expect 4) | ❌ W0 | ⬜ pending |
| 03-01-04 | 01 | 1 | SEO-03 | — | N/A | grep | `grep -q 'og:type.*restaurant' de/index.html` | ❌ W0 | ⬜ pending |
| 03-01-05 | 01 | 1 | SEO-04 | — | N/A | grep | `grep -q 'canonical' de/index.html` | ❌ W0 | ⬜ pending |
| 03-01-06 | 01 | 1 | SEO-05, LANG-01 | — | N/A | grep | `grep -c '<section' de/index.html` (expect 12) | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `de/index.html` — HTML5 document created with head and body skeleton

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| JSON-LD Rich Results Test passes | SEO-01 | Requires Google's external tool | Paste JSON-LD into search.google.com/test/rich-results |
| OG image renders in social preview | SEO-03 | Requires social platform preview tool | Test with opengraph.xyz or Twitter Card Validator |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 2s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
