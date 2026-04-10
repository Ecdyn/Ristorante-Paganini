---
phase: 05-english-and-italian-onepages
plan: 02
subsystem: frontend/localization
tags: [italian, localization, hreflang, seo, json-ld, faqpage]
dependency_graph:
  requires:
    - de/index.html (source template for translation)
    - assets/css/main.css (shared stylesheet)
    - assets/js/main.js (shared JavaScript)
  provides:
    - it/index.html (complete Italian localized onepage)
  affects:
    - hreflang reciprocal cluster (now complete with de + en + it)
tech_stack:
  added: []
  patterns:
    - Copy-and-translate workflow from de/index.html
    - Hreflang reciprocal cluster with all 4 tags (de, en, it, x-default)
    - Voi register for Italian copy (D-02)
    - FAQPage JSON-LD synchronized with visible FAQ section text
key_files:
  created:
    - it/index.html
  modified: []
decisions:
  - "Italian copy uses Voi (semi-formal plural) register throughout per D-02"
  - "H1 brand tagline kept in Italian on all pages (D-10) — brand signature, not translatable content"
  - "Section IDs kept language-neutral (#hero, #info, #about, etc.) per D-13"
  - "All shared ../assets/ paths unchanged — work identically from /it/ subdirectory"
metrics:
  duration: "~15 minutes"
  completed: "2026-04-08"
  tasks_completed: 1
  files_created: 1
  files_modified: 0
requirements:
  - LANG-03
---

# Phase 5 Plan 02: Italian Onepage Summary

## One-liner

Complete Italian localized onepage at /it/index.html with Voi register, full hreflang cluster, Italian JSON-LD + FAQPage schema, and zero German strings.

## What Was Built

Created `it/index.html` — a full Italian translation of the German restaurant page (`de/index.html`). The file shares all CSS, JavaScript, and image assets via relative `../assets/` paths.

### Localization Scope

All 12 sections translated with Voi register (D-02):

| Section | Key translations |
|---------|----------------|
| Head metadata | title, description, canonical (/it/), og:locale (it_IT), og:url (/it/) |
| JSON-LD Restaurant | description and inLanguage updated to Italian |
| JSON-LD FAQPage | All 7 Q&A pairs translated to Italian, synchronized with visible FAQ section |
| Header nav | Home, Chi Siamo, Menu, Pranzo di Lavoro, Prenotazioni, Contatti |
| Mobile menu | Apri/Chiudi navigazione, Navigazione, Orari, Galleria, Eventi, Come Raggiungerci |
| Hero (#hero) | Alt text, trust cues, CTAs (Prenota un Tavolo / Menu) |
| Info bar (#info) | Orari, Indirizzo, Telefono, Pranzo di Lavoro, Terrazza aperta (stagionale) |
| About (#about) | La Nostra Storia — 3 paragraphs in Voi register |
| Menu (#menu) | Il Nostro Menu, dish descriptions translated, Vino category, Scarica il Menu / Menu Completo |
| Business Lunch (#lunch) | Pranzo di Lavoro, Antipasto/Pasta/Secondo/Dessert, holiday note |
| Gallery (#gallery) | Galleria, all 6 image alt texts and captions |
| Reservation (#reservation) | Prenota un Tavolo, Assicuratevi, Chiamateci |
| Events (#events) | Gruppi & Eventi, both paragraphs, Chiamate Ora / Scrivete un'Email |
| Location (#location) | Come Raggiungerci, Germania, Parcheggio, 3 parking items, Visualizza su Google Maps |
| FAQ (#faq) | Domande Frequenti, all 7 dt/dd pairs matching FAQPage JSON-LD exactly |
| Contact (#contact) | Contatti, Contattateci, Telefono/Email/Indirizzo, Orari di Apertura, day names, Instagram |
| Lightbox | Galleria immagini, Chiudi galleria, Immagine precedente/successiva |
| Footer (#footer) | Note Legali, /it/ legal links, Lingua, IT link aria-current, Tutti i diritti riservati |

### Hreflang Cluster

All 4 hreflang tags present and correct on the IT page:
- `hreflang="de"` → /de/
- `hreflang="en"` → /en/
- `hreflang="it"` → /it/
- `hreflang="x-default"` → /de/

Self-canonical: `https://www.example.com/it/`

### Voi Register (D-02)

Italian copy uses "Voi" (semi-formal plural) register throughout:
- "Prenotate comodamente..." (FAQ 1)
- "Godetevi il nostro pranzo..." (lunch intro)
- "Contattateci e organizzeremo..." (events section)
- "Assicuratevi il vostro tavolo..." (reservation)
- "Seguiteci su Instagram" (contact)

## Verification Results

| Check | Result |
|-------|--------|
| File exists at it/index.html | PASS |
| Line count (>700) | PASS — 746 lines |
| `<html lang="it">` | PASS |
| `<link rel="canonical" href="...\/it\/">` | PASS |
| All 4 hreflang tags | PASS |
| `og:locale` = it_IT | PASS |
| `og:url` contains /it/ | PASS |
| `"inLanguage": "it"` in JSON-LD | PASS |
| H1 "Dove il gusto incontra la tradizione" unchanged | PASS |
| Zero "Italienisches Restaurant" | PASS |
| Zero "Über uns" | PASS |
| Zero "Speisekarte" (except PDF filename in href) | PASS |
| Zero "Alle Rechte vorbehalten" | PASS |
| Zero "Öffnungszeiten" | PASS |
| IT link has aria-current="true" | PASS |
| Legal links → /it/impressum.html and /it/datenschutz.html | PASS |
| "Devo prenotare?" present (first FAQ) | PASS |
| Voi register verbs present | PASS |
| All ../assets/ paths unchanged | PASS |

## Commits

| Task | Commit | Files |
|------|--------|-------|
| Task 1: Create it/index.html | e86c20a | it/index.html (created, 746 lines) |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

The following placeholder content exists intentionally (inherited from de/index.html source) — these are pre-launch placeholders, not translation stubs:

| Stub | File | Line | Reason |
|------|------|------|--------|
| Phone: +49 341 XXXXXXXX | it/index.html | multiple | Real phone number not yet provided |
| Email: info@example.com | it/index.html | multiple | Real email not yet provided |
| Reservation widget | it/index.html | ~reservation section | TheFork/Resy/OpenTable platform not yet decided |
| PDF: speisekarte.pdf | it/index.html | menu section | Real PDF not yet prepared |
| PDF: mittagskarte.pdf | it/index.html | lunch section | Real PDF not yet prepared |
| Domain: example.com | it/index.html | head section | Real domain not yet configured |

These stubs are consistent with the German source and do not prevent the plan's goal (Italian localization) from being achieved.

## Self-Check: PASSED

- [x] it/index.html exists: CONFIRMED
- [x] Commit e86c20a exists: CONFIRMED
- [x] Zero German strings in visible content: CONFIRMED
- [x] IT aria-current in footer: CONFIRMED
- [x] All hreflang return tags present: CONFIRMED
