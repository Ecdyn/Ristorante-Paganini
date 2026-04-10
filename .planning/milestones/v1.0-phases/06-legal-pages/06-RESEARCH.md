# Phase 6: Legal Pages - Research

**Researched:** 2026-04-08
**Domain:** Static HTML legal pages (Impressum + Datenschutz/Privacy) with GDPR documentation
**Confidence:** HIGH

## Summary

Phase 6 creates six static HTML legal pages (2 per language) and fixes footer links in all three onepages. The technical complexity is low -- these are simple single-column HTML pages reusing the existing CSS design system. The primary challenge is content correctness: proper German legal section structure, accurate GDPR documentation matching the site's actual implementation decisions, and consistent placeholder comment formatting across all six files.

The existing codebase provides everything needed: `main.css` has `.wrapper`, `.content-wrapper` (max 800px), `.flow`, and `.section--dark` classes. Favicon references, font-face declarations, and CSS link paths are established in the onepages. The footer link correction in EN and IT files is a straightforward href swap from German filenames to localized filenames.

**Primary recommendation:** Build DE legal pages first as templates (they contain the canonical German legal section structure), then create EN/IT versions by translating headings and placeholder text while preserving identical HTML structure and comment conventions.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Minimal single-column layout -- shared `assets/css/main.css`, simple header with restaurant name linking back to the language's onepage, content area, and a minimal footer with language switcher
- **D-02:** All six pages carry `<meta name="robots" content="noindex">` -- legal pages should not appear in search results
- **D-03:** No navigation menu on legal pages -- just a back-to-homepage link in the header. Legal pages are utility pages, not part of the main site experience
- **D-04:** Each legal page includes the same `<head>` boilerplate as the onepages: charset, viewport, CSS link, favicon references -- but NO JSON-LD, NO OG tags, NO hreflang (legal pages are not part of the multilingual SEO cluster)
- **D-05:** German: `/de/impressum.html` and `/de/datenschutz.html`
- **D-06:** English: `/en/legal.html` and `/en/privacy.html`
- **D-07:** Italian: `/it/legale.html` and `/it/privacy.html`
- **D-08:** Footer links in all three onepages must be updated to point to correct localized filenames -- currently EN and IT footers incorrectly use German filenames
- **D-09:** Realistic section headings matching German legal convention (Impressum: Angaben gemaess 5 TMG, Kontakt, Umsatzsteuer-ID, Streitschlichtung, Haftung fuer Inhalte/Links; Datenschutz: Verantwortliche Stelle, Datenerfassung, Hosting, Cookies, Drittanbieter-Dienste)
- **D-10:** Each section contains 1-2 placeholder paragraphs with prominent `<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: [section name] -->` HTML comments
- **D-11:** EN and IT legal pages use equivalent localized section headings
- **D-12:** Each Datenschutz/privacy page contains a dedicated GDPR documentation section: (1) No Google Fonts CDN, (2) No Google Maps iframe, (3) No third-party cookies, (4) No form data collection
- **D-13:** GDPR documentation sections use factual, auditable language

### Claude's Discretion
- Exact placeholder paragraph wording in each language
- Visual styling of legal page header/footer (within existing design system)
- Section ordering within each legal page
- Whether to include a "last updated" date placeholder at top of each page

### Deferred Ideas (OUT OF SCOPE)
None.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LANG-06 | Separate legal pages per language (Impressum + Datenschutz) with placeholder content | All six filenames defined (D-05/06/07), head boilerplate pattern extracted from onepages, section structure documented, GDPR documentation requirements specified (D-12/13), footer link corrections mapped (D-08) |
</phase_requirements>

## Standard Stack

No additional libraries or dependencies. This phase uses only the existing project assets:

### Core
| Asset | Location | Purpose | Why Standard |
|-------|----------|---------|--------------|
| main.css | `../assets/css/main.css` | Full design system | Already provides all tokens, layout classes, typography -- legal pages reuse directly |
| Favicon set | `../assets/favicon.*` | Brand identity | Same 4-tag Evil Martians approach as onepages |
| Self-hosted fonts | `../assets/fonts/` | Typography | Declared via @font-face in main.css, no additional setup needed |

**Installation:** None. Zero dependencies.

## Architecture Patterns

### Legal Page File Structure
```
de/
  index.html          (existing onepage)
  impressum.html      (NEW)
  datenschutz.html    (NEW)
en/
  index.html          (existing onepage)
  legal.html          (NEW)
  privacy.html        (NEW)
it/
  index.html          (existing onepage)
  legale.html         (NEW)
  privacy.html        (NEW)
```

### Pattern 1: Legal Page HTML Template
**What:** Minimal HTML page with stripped-down head (no JSON-LD, no OG, no hreflang), noindex meta, single-column content layout, and back-to-homepage header.
**When to use:** All six legal pages follow this identical skeleton.

```html
<!DOCTYPE html>
<html lang="{de|en|it}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex">
  <title>{Page Title} | Ristorante Paganini</title>
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="../assets/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="../assets/apple-touch-icon.png">
  <link rel="manifest" href="../assets/site.webmanifest">
  <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
  <header style="padding: var(--space-6) 0; border-bottom: 1px solid var(--color-border);">
    <div class="wrapper">
      <a href="/{lang}/" style="...">Ristorante Paganini</a>
      <span> &mdash; {Back to Homepage text}</span>
    </div>
  </header>

  <main>
    <div class="content-wrapper" style="padding-block: var(--space-12);">
      <div class="flow">
        <h1>{Page Heading}</h1>
        <!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: [section] -->
        <h2>{Section}</h2>
        <p>{Placeholder text}</p>
        ...
      </div>
    </div>
  </main>

  <footer class="section--dark" style="padding: var(--space-8) 0;">
    <div class="wrapper" style="text-align: center;">
      <p>
        <a href="/{lang}/">DE</a> | <a href="/{lang}/">EN</a> | <a href="/{lang}/">IT</a>
      </p>
      <p style="margin-top: var(--space-4); font-size: var(--font-size-sm); opacity: 0.7;">
        &copy; 2026 Ristorante Paganini.
      </p>
    </div>
  </footer>
</body>
</html>
```
[VERIFIED: extracted from de/index.html head structure and CSS class inspection]

### Pattern 2: Content Wrapper for Legal Text
**What:** Use `.content-wrapper` (max-width: 800px) with `.flow` for vertical rhythm.
**Why:** Legal text is long-form reading. The 800px max keeps line lengths comfortable (~65-75 characters). The `.flow` class provides consistent `margin-block-start` between elements.
[VERIFIED: main.css lines 302-306 define .content-wrapper at var(--content-max) = 800px]

### Pattern 3: Footer Link Correction
**What:** EN and IT footer links currently use German filenames and must be updated.
**Current state (VERIFIED from codebase):**

| File | Current href | Correct href |
|------|-------------|--------------|
| en/index.html line 727 | `/en/impressum.html` | `/en/legal.html` |
| en/index.html line 728 | `/en/datenschutz.html` | `/en/privacy.html` |
| it/index.html line 726 | `/it/impressum.html` | `/it/legale.html` |
| it/index.html line 727 | `/it/datenschutz.html` | `/it/privacy.html` |

DE footer links are already correct: `/de/impressum.html` and `/de/datenschutz.html`.

### Anti-Patterns to Avoid
- **Adding hreflang to legal pages:** D-04 explicitly excludes legal pages from the multilingual SEO cluster. Do not add hreflang tags.
- **Adding OG/Twitter meta to legal pages:** D-04 explicitly excludes these. Legal pages should never appear in social sharing previews.
- **Using full onepage header/nav on legal pages:** D-03 says no navigation menu -- just a back link. Legal pages are utility pages.
- **Linking legal pages in the language switcher of legal pages to the same legal page in another language:** There is no cross-language mapping for legal pages. The language switcher on legal pages should link to the main onepage of each language, not to the equivalent legal page.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Vertical rhythm | Custom margins on each element | `.flow` class from main.css | Already provides `margin-block-start` via `--flow-space` token |
| Content column width | Inline max-width styles | `.content-wrapper` class | Already set to 800px with proper padding |
| Dark footer styling | Inline color overrides | `.section--dark` class | Already handles bg, text color, and link colors |
| Page constraint layout | Custom wrapper styles | `.wrapper` class | Already provides 1200px max-width with padding |

## Common Pitfalls

### Pitfall 1: Forgetting the noindex meta tag
**What goes wrong:** Legal pages get indexed by Google, appear in search results instead of main pages.
**Why it happens:** Copy-pasting from onepage template without removing SEO meta and adding noindex.
**How to avoid:** Include `<meta name="robots" content="noindex">` in every legal page. Verify by checking all six files.
**Warning signs:** Legal page appearing in search console after deployment.

### Pitfall 2: Footer link text vs href mismatch
**What goes wrong:** EN footer says "Imprint" but links to `/en/impressum.html` (which will 404 after this phase since the file is actually `/en/legal.html`).
**Why it happens:** Original EN/IT footers were built with German filenames as placeholders.
**How to avoid:** Update both `href` attribute AND verify link text matches the page title. The current link text is already correct (EN: "Imprint"/"Privacy Policy", IT: "Note Legali"/"Privacy").
**Warning signs:** 404 errors when clicking footer links.

### Pitfall 3: Inconsistent placeholder comment format
**What goes wrong:** Lawyer reviewing content before launch misses sections because comments use different formats.
**How to avoid:** Use exactly: `<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: [Section Name] -->` for every section, placed directly above the section heading. Use identical format across all six files.
**Warning signs:** Visual scan showing varied comment styles.

### Pitfall 4: Missing GDPR documentation sections in privacy pages
**What goes wrong:** Privacy pages contain only generic placeholder text, missing the factual GDPR documentation about the site's actual technical decisions.
**Why it happens:** Treating privacy pages as pure placeholder when D-12 requires specific factual statements.
**How to avoid:** GDPR documentation sections (Google Fonts self-hosted, no Maps iframe, no cookies, no forms) should contain actual factual text -- NOT placeholder text. These sections describe what the site ACTUALLY does, not what a lawyer will write later.
**Warning signs:** GDPR sections wrapped in "replace before launch" comments when they should be factual statements.

### Pitfall 5: Relative vs absolute paths for asset references
**What goes wrong:** CSS, favicon, or font files don't load on legal pages.
**Why it happens:** Legal pages are in subdirectories (e.g., `/de/impressum.html`) -- same level as `index.html`, so relative paths are identical: `../assets/css/main.css`.
**How to avoid:** Use the same `../assets/` relative path pattern as the existing onepages. Verify by opening each legal page in a browser.
**Warning signs:** Unstyled legal pages, missing favicons.

## Code Examples

### German Impressum Section Structure
```html
<!-- Source: German legal convention for Impressum (TMG ss5) -->
<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: Impressum -->

<h1>Impressum</h1>

<h2>Angaben gemaess ss 5 TMG</h2>
<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: Angaben gemaess ss5 TMG -->
<p>Ristorante Paganini<br>
Grosse Fleischergasse<br>
04109 Leipzig</p>

<h2>Kontakt</h2>
<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: Kontakt -->
<p>Telefon: +49 341 XXXXXXXX<br>
E-Mail: info@example.com</p>

<h2>Umsatzsteuer-ID</h2>
<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: Umsatzsteuer-ID -->
<p>[Umsatzsteuer-Identifikationsnummer gemaess ss 27a Umsatzsteuergesetz hier einfuegen]</p>

<h2>Streitschlichtung</h2>
<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: Streitschlichtung -->
<p>[Hinweis zur Online-Streitbeilegung und Verbraucherschlichtungsstelle hier einfuegen]</p>

<h2>Haftung fuer Inhalte</h2>
<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: Haftung fuer Inhalte -->
<p>[Haftungsausschluss gemaess ss 7-10 TMG hier einfuegen]</p>

<h2>Haftung fuer Links</h2>
<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: Haftung fuer Links -->
<p>[Haftungsausschluss fuer externe Links hier einfuegen]</p>
```
[ASSUMED: German Impressum section headings based on standard TMG ss5 convention -- well-established legal pattern]

### GDPR Documentation Section (for Datenschutz/Privacy pages)
```html
<!-- This section documents actual technical implementation decisions.
     These statements are factual and verifiable against the codebase.
     A lawyer should review and incorporate these facts into the full
     privacy policy text. -->

<h2>Technische Datenschutzentscheidungen dieser Website</h2>

<h3>Schriftarten (Fonts)</h3>
<p>Diese Website verwendet selbst gehostete Schriftdateien (Cormorant Garamond und Lato im WOFF2-Format). Es werden keine Verbindungen zu Google Fonts oder anderen externen Schriftarten-Diensten hergestellt. Beim Besuch dieser Website werden keine Daten an Google uebermittelt.</p>

<h3>Kartendienst (Google Maps)</h3>
<p>Diese Website bindet keinen Google Maps iframe ein. Die Adresse des Restaurants wird als statischer Text mit einem externen Link zu Google Maps angezeigt. Eine Verbindung zu Google-Servern wird erst hergestellt, wenn Sie aktiv auf den Link klicken und Google Maps in einem neuen Tab oeffnen.</p>

<h3>Cookies und Tracking</h3>
<p>Diese Website verwendet keine Cookies, keine Analyse-Tools (wie Google Analytics), keine Tracking-Pixel und keine Social-Media-Einbettungen. Es findet kein Tracking des Nutzerverhaltens statt.</p>

<h3>Formulare und Datenerfassung</h3>
<p>Diese Website enthaelt keine Kontaktformulare und erhebt keine personenbezogenen Daten ueber Formulareingaben. Anfragen erfolgen ausschliesslich per Telefon oder E-Mail.</p>
```
[VERIFIED: These statements match confirmed project decisions from STATE.md and CONTEXT.md -- self-hosted fonts, no Maps iframe, no cookies, no forms]

### Footer Link Correction Example (EN)
```html
<!-- BEFORE (incorrect -- uses German filenames) -->
<p><a href="/en/impressum.html" style="color: var(--color-text-inverse);">Imprint</a></p>
<p><a href="/en/datenschutz.html" style="color: var(--color-text-inverse);">Privacy Policy</a></p>

<!-- AFTER (correct -- uses English filenames) -->
<p><a href="/en/legal.html" style="color: var(--color-text-inverse);">Imprint</a></p>
<p><a href="/en/privacy.html" style="color: var(--color-text-inverse);">Privacy Policy</a></p>
```
[VERIFIED: Current incorrect links confirmed at en/index.html lines 727-728]

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual browser verification (static HTML, no test framework) |
| Config file | none |
| Quick run command | Open each HTML file in browser, check rendering |
| Full suite command | Verify all 6 legal pages load + all 3 footer link corrections |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LANG-06a | Six legal page files exist with correct filenames | smoke | `ls de/impressum.html de/datenschutz.html en/legal.html en/privacy.html it/legale.html it/privacy.html` | Wave 0 |
| LANG-06b | All legal pages have noindex meta | grep | `grep -l "noindex" de/impressum.html de/datenschutz.html en/legal.html en/privacy.html it/legale.html it/privacy.html` | Wave 0 |
| LANG-06c | EN footer links corrected | grep | `grep "legal.html\|privacy.html" en/index.html` | Wave 0 |
| LANG-06d | IT footer links corrected | grep | `grep "legale.html\|privacy.html" it/index.html` | Wave 0 |
| LANG-06e | GDPR sections present in all 3 privacy pages | grep | `grep -l "Google Fonts\|Google Maps" de/datenschutz.html en/privacy.html it/privacy.html` | Wave 0 |
| LANG-06f | Placeholder comments present | grep | `grep -c "REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH" de/impressum.html de/datenschutz.html en/legal.html en/privacy.html it/legale.html it/privacy.html` | Wave 0 |
| LANG-06g | Back-to-homepage link works | manual | Open each legal page, click header link | manual-only: requires browser |
| LANG-06h | CSS loads correctly on legal pages | manual | Open each legal page, verify styled rendering | manual-only: requires browser |

### Sampling Rate
- **Per task commit:** `ls` + `grep` checks on modified files
- **Per wave merge:** Full grep suite across all 6 legal pages + 3 onepage footers
- **Phase gate:** All grep checks pass + manual browser verification of at least one page per language

### Wave 0 Gaps
None -- no test framework setup needed. Verification uses shell commands (file existence, grep) and manual browser inspection. Static HTML does not benefit from a test framework.

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | N/A -- static pages, no auth |
| V3 Session Management | no | N/A -- no sessions |
| V4 Access Control | no | N/A -- public pages |
| V5 Input Validation | no | N/A -- no forms, no user input |
| V6 Cryptography | no | N/A -- no data processing |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via placeholder text replacement | Tampering | Placeholder text is static HTML authored by developer -- no user input vector. Future lawyer-provided text should be HTML-escaped if containing special characters. |
| Information disclosure via legal pages | Information Disclosure | Legal pages intentionally disclose business info (address, contact). `noindex` prevents unwanted search indexing. |

No significant security concerns for this phase. Legal pages are static, public, read-only HTML with no user input, no JavaScript interaction, and no data processing.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | German Impressum section headings follow TMG ss5 convention (Angaben gemaess ss5 TMG, Kontakt, Umsatzsteuer-ID, Streitschlichtung, Haftung fuer Inhalte, Haftung fuer Links) | Code Examples | Low -- these are placeholders that a lawyer will replace anyway; wrong headings just mean less useful placeholder structure |
| A2 | German Datenschutz section headings follow standard convention (Verantwortliche Stelle, Datenerfassung, Hosting, Cookies, Drittanbieter-Dienste) | Code Examples | Low -- same reason as A1, placeholder headings for lawyer review |
| A3 | Equivalent EN section headings: Information per ss5 TMG, Contact, VAT ID, Dispute Resolution, Liability for Content, Liability for Links | Architecture Patterns | Low -- placeholder text, lawyer replaces |
| A4 | Equivalent IT section headings: Informazioni ai sensi del ss5 TMG, Contatto, Partita IVA, Risoluzione delle controversie, Responsabilita per i contenuti, Responsabilita per i link | Architecture Patterns | Low -- placeholder text, lawyer replaces |

**Note:** All assumptions are low-risk because the legal text is explicitly placeholder content that must be replaced by a lawyer before launch. The structure serves as a useful guide but is not legally binding.

## Open Questions

1. **Should legal page language switcher link to the same legal page in another language, or to the main onepage?**
   - What we know: D-01 says footer has "language switcher" but D-04 says no hreflang (legal pages are not cross-linked for SEO)
   - What's unclear: Whether clicking "EN" on `/de/impressum.html` should go to `/en/legal.html` or `/en/`
   - Recommendation: Link to the main onepage of each language (e.g., `/en/`, `/de/`, `/it/`). Legal pages have different filenames per language, and users clicking the language switcher most likely want to return to the main site in their language. This avoids implying cross-language legal equivalence.

2. **Should a "last updated" date placeholder be included?**
   - What we know: D-discretion says this is Claude's choice
   - Recommendation: Yes, include it. German Datenschutz pages conventionally show "Stand: [Datum]" at the top. Use `<!-- REPLACE WITH REAL LEGAL TEXT BEFORE LAUNCH: Last Updated Date -->` with a visible placeholder like "Stand: [Datum einfuegen]".

## Sources

### Primary (HIGH confidence)
- `de/index.html` -- head structure, favicon references, CSS link, footer structure (lines 1-90, 709-747)
- `en/index.html` -- footer with incorrect legal links (lines 723-728)
- `it/index.html` -- footer with incorrect legal links (lines 722-727)
- `assets/css/main.css` -- design tokens, `.wrapper`, `.content-wrapper`, `.flow`, `.section--dark` classes
- `06-CONTEXT.md` -- all 13 locked decisions

### Secondary (MEDIUM confidence)
- German TMG ss5 legal page convention -- well-established legal standard, not verified against specific current legal guidance in this session

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- zero new dependencies, all CSS classes verified in codebase
- Architecture: HIGH -- page template directly derived from existing onepage head/footer patterns
- Pitfalls: HIGH -- footer link bugs verified in codebase, noindex requirement explicit in decisions
- GDPR documentation: HIGH -- all four technical claims verified against project decisions in STATE.md

**Research date:** 2026-04-08
**Valid until:** 2026-05-08 (stable -- static HTML, no moving parts)
