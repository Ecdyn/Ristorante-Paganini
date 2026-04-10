---
phase: 4
slug: german-onepage-all-12-content-sections
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-08
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual verification (static HTML site — no test framework) |
| **Config file** | none |
| **Quick run command** | `node -e "const fs=require('fs'); const h=fs.readFileSync('de/index.html','utf8'); console.log('Sections:', (h.match(/<section/g)||[]).length); console.log('H1:', (h.match(/<h1/g)||[]).length); console.log('FAQ items:', (h.match(/<dt/g)||[]).length);"` |
| **Full suite command** | `node -e "const fs=require('fs'); const h=fs.readFileSync('de/index.html','utf8'); const checks=[['H1 count===1', (h.match(/<h1/g)||[]).length===1], ['12 sections', (h.match(/<section/g)||[]).length>=11], ['FAQ 7 items', (h.match(/<dt/g)||[]).length===7], ['Hero eager', h.includes('loading=\"eager\"')], ['Gallery lazy', h.includes('loading=\"lazy\"')], ['FAQPage JSON-LD', h.includes('FAQPage')], ['PDF link', h.includes('.pdf')], ['fetchpriority high', h.includes('fetchpriority=\"high\"')]]; checks.forEach(([n,p])=>console.log(p?'✓':'✗',n)); process.exit(checks.every(c=>c[1])?0:1);"` |
| **Estimated runtime** | ~1 second |

---

## Sampling Rate

- **After every task commit:** Run quick run command
- **After every plan wave:** Run full suite command
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 1 second

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | SECT-01, PERF-01 | — | N/A | automated | `grep -c 'fetchpriority="high"' de/index.html` | — | ⬜ pending |
| 04-01-02 | 01 | 1 | SECT-02 | — | N/A | automated | `grep -c 'id="info"' de/index.html` | — | ⬜ pending |
| 04-01-03 | 01 | 1 | SECT-03 | — | N/A | automated | `grep -c 'id="about"' de/index.html` | — | ⬜ pending |
| 04-01-04 | 01 | 1 | SECT-04 | — | N/A | automated | `grep -c 'speisekarte' de/index.html` | — | ⬜ pending |
| 04-01-05 | 01 | 1 | SECT-05 | — | N/A | automated | `grep -c '11:30' de/index.html` | — | ⬜ pending |
| 04-01-06 | 01 | 1 | SECT-06, PERF-02 | — | N/A | automated | `grep -c 'loading="lazy"' de/index.html` | — | ⬜ pending |
| 04-01-07 | 01 | 1 | SECT-07 | — | N/A | automated | `grep -c 'id="reservation"' de/index.html` | — | ⬜ pending |
| 04-01-08 | 01 | 1 | SECT-08 | — | N/A | automated | `grep -c 'id="events"' de/index.html` | — | ⬜ pending |
| 04-01-09 | 01 | 1 | SECT-09 | — | N/A | automated | `grep -c 'google.com/maps' de/index.html` | — | ⬜ pending |
| 04-01-10 | 01 | 1 | SECT-10, SEO-08 | — | N/A | automated | `grep -c 'FAQPage' de/index.html` | — | ⬜ pending |
| 04-01-11 | 01 | 1 | SECT-11 | — | N/A | automated | `grep -c 'id="contact"' de/index.html` | — | ⬜ pending |
| 04-01-12 | 01 | 1 | SECT-12 | — | N/A | automated | `grep -c 'id="footer"' de/index.html` | — | ⬜ pending |
| 04-02-01 | 02 | 1 | LANG-05 | — | N/A | automated | `grep -cE '(Reservierung\|Speisekarte\|Mittagstisch\|Kontakt)' de/index.html` | — | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `assets/pdf/` directory created
- [ ] `assets/pdf/speisekarte.pdf` — placeholder PDF for menu download
- [ ] `assets/pdf/mittagskarte.pdf` — placeholder PDF for lunch menu download

*Existing CSS/JS infrastructure covers all other phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero LCP < 2.5s | PERF-01 | Requires Lighthouse or browser DevTools | Run Lighthouse on de/index.html, verify LCP score |
| Gallery hover captions | SECT-06 | Visual interaction | Hover over gallery images, verify caption text appears |
| Lightbox opens/closes | SECT-06 | Visual interaction | Click gallery image, verify lightbox opens with navigation |
| Mobile menu links to all 12 sections | SECT-12 | Requires mobile viewport | Resize to mobile, open hamburger, verify all section links present and working |
| FAQ JSON-LD matches HTML | SECT-10 | Requires Google Rich Results Test | Paste page URL into Rich Results Test, verify FAQPage schema validates |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 1s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
