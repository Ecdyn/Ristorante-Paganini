---
phase: 8
slug: seo-files-and-technical-audit
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-10
---

# Phase 8 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js built-in (fs, path) — custom validation script |
| **Config file** | none — validation script is self-contained |
| **Quick run command** | `node scripts/validate-seo.js` |
| **Full suite command** | `node scripts/validate-seo.js` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node scripts/validate-seo.js`
- **After every plan wave:** Run `node scripts/validate-seo.js`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 2 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 08-01-01 | 01 | 1 | SEO-06 | — | N/A | integration | `node scripts/validate-seo.js` | ❌ W0 | ⬜ pending |
| 08-01-02 | 01 | 1 | SEO-07 | — | N/A | integration | `node scripts/validate-seo.js` | ❌ W0 | ⬜ pending |
| 08-02-01 | 02 | 1 | SEO-06, SEO-07 | — | N/A | integration | `node scripts/validate-seo.js` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/validate-seo.js` — validation script created as part of Plan 02

*Existing HTML infrastructure covers all phase requirements — validation script verifies them.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Rich Results Test passes | SEO-06 | Requires Google's online tool | Paste JSON-LD from each onepage into Rich Results Test Code tab, verify zero errors |
| Lighthouse LCP < 2.5s | SEO-07 | Requires browser-based audit | Run Lighthouse on de/index.html, check Performance > LCP metric |
| Lighthouse zero CLS | SEO-07 | Requires browser-based audit | Run Lighthouse on de/index.html, check CLS = 0 |
| WAVE zero errors | SEO-07 | Requires browser extension | Run WAVE on all 3 onepages, verify zero errors |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 2s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
