---
phase: 06-legal-pages
plan: 02
subsystem: ui
tags: [html, legal, privacy, gdpr, i18n, english, italian, noindex, footer-links]

# Dependency graph
requires:
  - phase: 06-legal-pages
    plan: 01
    provides: German legal page templates (de/impressum.html, de/datenschutz.html)
provides:
  - English legal pages (en/legal.html, en/privacy.html)
  - Italian legal pages (it/legale.html, it/privacy.html)
  - Corrected footer links in EN and IT onepages
affects:
  - en/index.html (footer legal links corrected)
  - it/index.html (footer legal links corrected)

# Tech stack
added: []
patterns:
  - Translation from DE template preserving HTML structure, comments, and CSS classes
  - Localized filenames per language (legal.html/privacy.html for EN, legale.html/privacy.html for IT)

# Key files
created:
  - en/legal.html
  - en/privacy.html
  - it/legale.html
  - it/privacy.html
modified:
  - en/index.html
  - it/index.html

# Decisions
key-decisions:
  - EN and IT legal pages mirror DE template structure exactly with translated headings and content
  - GDPR factual documentation translated to each language with identical technical claims
  - Footer links corrected from German filenames to localized filenames per D-08

# Metrics
duration: 215s
completed: 2026-04-08T14:53:25Z
tasks_completed: 3
tasks_total: 3
files_created: 4
files_modified: 2
---

# Phase 06 Plan 02: EN/IT Legal Pages and Footer Link Corrections Summary

English and Italian legal pages translated from German templates with localized section headings, GDPR factual documentation, and placeholder content marked for lawyer review; footer links in EN and IT onepages corrected to point to localized filenames.

## Tasks Completed

### Task 1: Create EN legal pages (en/legal.html and en/privacy.html)
- **Commit:** 1c7be87
- **Files created:** en/legal.html, en/privacy.html
- en/legal.html: Legal Notice with 6 TMG sections (Information per 5 TMG, Contact, VAT ID, Dispute Resolution, Liability for Content, Liability for Links), 7 REPLACE comments
- en/privacy.html: Privacy Policy with 4 placeholder sections + 4 GDPR factual documentation sections (Fonts, Maps, Cookies and Tracking, Forms and Data Collection) + 3 remaining placeholder sections, 8 REPLACE comments
- Both pages: noindex, lang="en", favicon set, shared CSS, back link to /en/

### Task 2: Create IT legal pages (it/legale.html and it/privacy.html)
- **Commit:** 7ed5fb7
- **Files created:** it/legale.html, it/privacy.html
- it/legale.html: Note Legali with 6 TMG sections (Informazioni ai sensi del 5 TMG, Contatto, Partita IVA, Risoluzione delle controversie, Responsabilita per i contenuti, Responsabilita per i link), 7 REPLACE comments
- it/privacy.html: Informativa sulla Privacy with 4 placeholder sections + 4 GDPR factual documentation sections (Font, Servizio mappe, Cookie e tracciamento, Moduli e raccolta dati) + 3 remaining placeholder sections, 8 REPLACE comments
- Both pages: noindex, lang="it", favicon set, shared CSS, back link to /it/

### Task 3: Fix footer legal links in EN and IT onepages
- **Commit:** f10a870
- **Files modified:** en/index.html, it/index.html
- EN: /en/impressum.html -> /en/legal.html, /en/datenschutz.html -> /en/privacy.html
- IT: /it/impressum.html -> /it/legale.html, /it/datenschutz.html -> /it/privacy.html
- Link text unchanged (EN: "Imprint"/"Privacy Policy", IT: "Note Legali"/"Privacy")
- DE footer links verified untouched (already correct)

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- All 4 new files exist: PASS
- All 4 have noindex meta tag: PASS
- GDPR documentation present in both privacy pages: PASS
- EN footer links corrected (legal.html, privacy.html): PASS
- IT footer links corrected (legale.html, privacy.html): PASS
- No German filenames (impressum.html, datenschutz.html) remain in EN/IT footers: PASS (0 matches each)
- Full phase file count (6 legal pages across 3 languages): PASS

## Known Stubs

All placeholder sections are intentional per D-10 and clearly marked with `<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH -->` comments. These require real legal text from a lawyer before site launch. The GDPR factual documentation sections are NOT stubs - they contain verifiable technical implementation facts.

## Self-Check: PASSED

- en/legal.html: FOUND
- en/privacy.html: FOUND
- it/legale.html: FOUND
- it/privacy.html: FOUND
- Commit 1c7be87: FOUND
- Commit 7ed5fb7: FOUND
- Commit f10a870: FOUND
