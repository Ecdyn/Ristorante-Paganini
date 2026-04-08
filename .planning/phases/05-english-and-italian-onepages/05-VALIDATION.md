---
phase: 5
slug: english-and-italian-onepages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-08
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual grep-based validation (static HTML site, no test framework) |
| **Config file** | none — no build step, no test framework |
| **Quick run command** | `grep -c 'lang="de"' en/index.html` (should return 0) |
| **Full suite command** | See Per-Task Verification Map below |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick grep checks for leftover German strings
- **After every plan wave:** Run full hreflang and content verification
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | LANG-02 | — | N/A | grep | `test -f en/index.html && echo OK` | ⬜ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | LANG-02 | — | N/A | grep | `grep -c 'hreflang="en"' en/index.html` | ⬜ W0 | ⬜ pending |
| 05-01-03 | 01 | 1 | LANG-02 | — | N/A | grep | `grep -c 'lang="de"' en/index.html` (expect 0) | ⬜ W0 | ⬜ pending |
| 05-02-01 | 02 | 1 | LANG-03 | — | N/A | grep | `test -f it/index.html && echo OK` | ⬜ W0 | ⬜ pending |
| 05-02-02 | 02 | 1 | LANG-03 | — | N/A | grep | `grep -c 'hreflang="it"' it/index.html` | ⬜ W0 | ⬜ pending |
| 05-02-03 | 02 | 1 | LANG-03 | — | N/A | grep | `grep -c 'lang="de"' it/index.html` (expect 0) | ⬜ W0 | ⬜ pending |
| 05-03-01 | 03 | 2 | LANG-02, LANG-03 | — | N/A | grep | `grep -c 'hreflang="en"' de/index.html && grep -c 'hreflang="it"' de/index.html` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements — no test framework needed for static HTML validation.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Language switcher navigation | LANG-02, LANG-03 | Requires browser interaction | Click each language link in DE/EN/IT footers, verify correct page loads at correct section |
| Visual layout consistency | LANG-02, LANG-03 | Requires visual inspection | Open EN and IT pages side-by-side with DE, verify identical layout |
| Italian Voi register consistency | LANG-03 | Linguistic judgment | Read IT copy, verify consistent Voi usage throughout |
| JSON-LD validity | LANG-02, LANG-03 | Requires structured data testing tool | Paste EN/IT page source into Google Rich Results Test |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
