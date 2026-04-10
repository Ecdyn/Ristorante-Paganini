---
phase: 05-english-and-italian-onepages
plan: 01
subsystem: localization
tags: [html, localization, english, hreflang, seo, json-ld]
dependency_graph:
  requires:
    - de/index.html (source template)
    - assets/css/main.css (shared stylesheet)
    - assets/js/main.js (shared JS)
  provides:
    - en/index.html (complete English localized onepage)
  affects:
    - hreflang reciprocal cluster (de + en + it)
tech_stack:
  added: []
  patterns:
    - copy-and-translate from de/index.html
    - hreflang reciprocal 4-tag cluster
    - JSON-LD per-language fields (description, inLanguage, url)
    - FAQPage schema mirroring visible HTML Q&A text
key_files:
  created:
    - en/index.html
  modified: []
decisions:
  - "English tone: warm & professional, family 'we' voice, slightly less formal (no Sie/Du distinction) per D-01"
  - "Italian H1 tagline preserved unchanged on EN page as brand signature per D-10"
  - "hreflang reciprocal cluster: all 4 tags (de, en, it, x-default) identical on EN page per D-14"
  - "Self-canonical points to /en/ per D-15"
  - "FAQPage JSON-LD text exactly matches visible #faq section Q&A per D-05"
  - "Footer language switcher: EN link has aria-current=true, DE and IT links are plain per D-16"
metrics:
  duration_minutes: 12
  completed_date: "2026-04-08"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 0
---

# Phase 05 Plan 01: English Localized Onepage Summary

**One-liner:** Complete English onepage at /en/index.html with full localization — lang=en, canonical /en/, og:locale en_GB, English JSON-LD with inLanguage=en, all 7 FAQPage Q&A pairs translated matching visible HTML, and EN-active footer language switcher.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create en/index.html with full English localization | 86eb2c2 | en/index.html (created, 747 lines) |

## Verification Results

All acceptance criteria met:

- `en/index.html` exists at 747 lines (exceeds 700 minimum)
- `<html lang="en">` on line 2
- `<title>` contains "Italian Restaurant Leipzig"
- `<link rel="canonical" href="https://www.example.com/en/">` present
- All 4 hreflang tags present: de, en, it, x-default
- `og:locale` content is `en_GB`
- `og:url` contains `/en/`
- JSON-LD contains `"inLanguage": "en"`
- H1 contains "Dove il gusto incontra la tradizione" (unchanged brand signature)
- Zero occurrences of "Italienisches Restaurant"
- Zero occurrences of "Über uns"
- Zero occurrences of "Speisekarte" (visible content — PDF hrefs unchanged)
- Zero occurrences of "Alle Rechte vorbehalten"
- Zero occurrences of "Öffnungszeiten"
- Footer `aria-current="true"` on EN link
- Footer legal links: `/en/impressum.html` and `/en/datenschutz.html`
- FAQ section contains "Do I need a reservation?"
- All 6 gallery image alt texts in English
- All section IDs unchanged (#hero, #info, #about, #menu, #lunch, #gallery, #reservation, #events, #location, #faq, #contact, #footer)
- All `../assets/` paths unchanged from DE source

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

The following items are intentional placeholders inherited from de/index.html and not blocking this plan's goal:

| Stub | File | Reason |
|------|------|--------|
| Reservation widget placeholder text | en/index.html | Widget embed is Phase 7 / post-launch |
| Phone number XXXXXXXX | en/index.html | Real number to be provided by owner before launch |
| PDF hrefs (speisekarte.pdf, mittagskarte.pdf) | en/index.html | Real PDFs to be provided before launch |
| Instagram URL placeholder | en/index.html | Real URL to be provided before launch |
| Map image (about-bg.svg) | en/index.html | Real map screenshot to replace before launch |

All stubs are marked with `<!-- EDIT: -->` or `<!-- PLACEHOLDER: -->` comments for agency handoff.

## Threat Flags

None — static HTML file with no user input processing. All threat dispositions accepted per plan threat model (T-05-01, T-05-02).

## Self-Check: PASSED

- [x] `en/index.html` exists: FOUND
- [x] Commit 86eb2c2 exists: FOUND
- [x] 747 lines (>700 minimum): PASSED
- [x] Zero German UI strings in visible content: PASSED
- [x] All 4 hreflang tags present: PASSED
- [x] Canonical /en/: PASSED
- [x] og:locale en_GB: PASSED
- [x] inLanguage "en": PASSED
- [x] EN active in footer: PASSED
