# Phase 8: SEO Files and Technical Audit - Research

**Researched:** 2026-04-10
**Domain:** sitemap.xml, robots.txt, JSON-LD validation, hreflang audit, Node.js scripting
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** sitemap.xml includes only the 3 onepages: de/index.html, en/index.html, it/index.html — no legal pages (noindex), no root redirect (noindex, nofollow)
- **D-02:** Each `<url>` entry includes full `xhtml:link rel="alternate"` tags for all 3 languages plus x-default pointing to DE
- **D-03:** Sitemap uses the `xmlns:xhtml` namespace for hreflang alternate entries per Google's multilingual sitemap documentation
- **D-04:** sitemap.xml and robots.txt use the same `https://www.example.com` placeholder domain already used throughout all HTML files
- **D-05:** A prominent XML comment at the top of sitemap.xml and a text comment at the top of robots.txt: "REPLACE example.com WITH REAL DOMAIN BEFORE LAUNCH"
- **D-06:** One find-and-replace of `www.example.com` updates the entire site
- **D-07:** Minimal robots.txt — `User-agent: *` with `Allow: /` and only `Disallow: /index.html`
- **D-08:** Assets folder (CSS, JS, images, fonts) is explicitly allowed in robots.txt
- **D-09:** test.html in assets/css/ is not explicitly blocked
- **D-10:** Sitemap directive at the bottom: `Sitemap: https://www.example.com/sitemap.xml`
- **D-11:** Standalone Node.js validation script using only built-in modules (fs, path) — no npm install, no dependencies
- **D-12:** Script validates JSON-LD syntax and required fields: parses all JSON-LD blocks from every HTML page, verifies valid JSON, checks Restaurant/LocalBusiness required fields (name, address, telephone, openingHoursSpecification, servesCuisine), checks FAQPage required fields (mainEntity with question/acceptedAnswer pairs)
- **D-13:** Core Web Vitals (Lighthouse), accessibility (WAVE), and Rich Results Test remain manual browser-based checks — documented as checklist
- **D-14:** Hreflang reciprocity, meta tag completeness, and sitemap/robots consistency verified manually or by visual inspection

### Claude's Discretion

- Exact sitemap.xml formatting and lastmod dates
- Validation script file location and naming convention
- Order of manual validation checklist items
- Whether to include `<changefreq>` or `<priority>` in sitemap entries
- Console output format of the validation script (colors, grouping, summary)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEO-06 | sitemap.xml listing all language variants | Google sitemap+hreflang spec verified; exact XML structure documented below |
| SEO-07 | robots.txt with sitemap reference | Google robots.txt spec verified; directive syntax documented below |
</phase_requirements>

---

## Summary

Phase 8 creates two files (sitemap.xml and robots.txt) and one validation script, then audits the already-complete site against launch readiness criteria. All 10 HTML pages exist with their meta tags, hreflang blocks, and JSON-LD already in place from Phases 1-7. This phase adds no content — it wraps the site in its SEO infrastructure and confirms correctness.

The sitemap.xml format requires the `xmlns:xhtml` namespace and includes a `<xhtml:link rel="alternate">` for every language variant (including itself) inside each `<url>` block. Google's specification requires this reciprocal structure in both the HTML head and the sitemap. The robots.txt is minimal: one `User-agent: *` group with `Allow: /`, `Disallow: /index.html`, and a `Sitemap:` directive.

The validation script uses only Node.js built-in modules (fs, path), which is a hard constraint from D-11. Node.js v24.14.1 is confirmed available. The script extracts JSON-LD blocks from HTML with regex, parses each block, and checks required field presence — this approach is sufficient for a known, small set of HTML files.

**Primary recommendation:** Write sitemap.xml first (most complex, verified spec below), then robots.txt (trivial), then the validation script (mechanical), then run the manual audit checklist in order from automated to manual.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js built-ins: fs, path | v24.14.1 (confirmed) | Read HTML files, extract JSON-LD, validate structure | Hard constraint D-11 — no npm dependencies |
| Sitemaps protocol v0.9 | Living standard | XML structure for sitemap.xml | Official Google-supported schema |
| robots.txt / RFC 9309 | RFC 9309 (2022) | robots.txt format | Internet standard for crawler directives |

### No External Libraries

Per CLAUDE.md constraint (no frameworks, no build tools, no dependencies) and D-11 decision, this phase uses:
- Only Node.js built-in `fs` and `path` modules for the validation script
- Plain XML for sitemap.xml (no XML library needed — static file)
- Plain text for robots.txt

### Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Validation script (D-11) | Yes | v24.14.1 | — |
| Browser (Chrome) | Lighthouse, Rich Results Test, WAVE | Assumed present | — | Use online tools |

---

## Architecture Patterns

### File Placement

```
/ (site root)
├── sitemap.xml          <- new — placed at root for canonical discovery
├── robots.txt           <- new — must be at root, no exceptions
├── tools/
│   └── validate.js      <- new — validation script (Claude's discretion: tools/)
├── index.html           <- root redirect, Disallow: /index.html
├── de/index.html        <- in sitemap
├── en/index.html        <- in sitemap
└── it/index.html        <- in sitemap
```

robots.txt and sitemap.xml MUST be at the site root — these paths are not configurable by convention or spec. [VERIFIED: developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt]

### Pattern 1: Multilingual Sitemap with hreflang

Each `<url>` block lists the page's own URL in `<loc>` AND includes an `<xhtml:link>` for every language variant including itself. With 3 pages and 4 alternate tags each (de, en, it, x-default), this gives 3 `<url>` blocks each containing 4 `<xhtml:link>` children.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- REPLACE example.com WITH REAL DOMAIN BEFORE LAUNCH -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>https://www.example.com/de/</loc>
    <lastmod>2026-04-10</lastmod>
    <xhtml:link rel="alternate" hreflang="de"        href="https://www.example.com/de/"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://www.example.com/en/"/>
    <xhtml:link rel="alternate" hreflang="it"        href="https://www.example.com/it/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.example.com/de/"/>
  </url>

  <url>
    <loc>https://www.example.com/en/</loc>
    <lastmod>2026-04-10</lastmod>
    <xhtml:link rel="alternate" hreflang="de"        href="https://www.example.com/de/"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://www.example.com/en/"/>
    <xhtml:link rel="alternate" hreflang="it"        href="https://www.example.com/it/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.example.com/de/"/>
  </url>

  <url>
    <loc>https://www.example.com/it/</loc>
    <lastmod>2026-04-10</lastmod>
    <xhtml:link rel="alternate" hreflang="de"        href="https://www.example.com/de/"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://www.example.com/en/"/>
    <xhtml:link rel="alternate" hreflang="it"        href="https://www.example.com/it/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.example.com/de/"/>
  </url>

</urlset>
```

[VERIFIED: developers.google.com/search/docs/specialty/international/localized-versions#sitemap]

**Key observations:**
- `<changefreq>` and `<priority>` omitted — both are optional and largely ignored by Google [VERIFIED: sitemaps.org/protocol.html]
- `<lastmod>` included using YYYY-MM-DD format (W3C Datetime) — optional but provides a useful signal
- URL trailing slash `/de/` matches the canonical URLs already in the HTML files exactly
- The `xmlns:xhtml` namespace declaration is required for the `xhtml:link` elements to be valid XML

### Pattern 2: Minimal robots.txt

```
# Ristorante Paganini — robots.txt
# REPLACE example.com WITH REAL DOMAIN BEFORE LAUNCH

User-agent: *
Allow: /
Disallow: /index.html

# Allow crawling of all assets (required for Google rendering-based indexing)
Allow: /assets/

Sitemap: https://www.example.com/sitemap.xml
```

[VERIFIED: developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt]

**Key observations:**
- `Allow: /` is the baseline — nothing is blocked by default
- `Disallow: /index.html` — disallows only the root redirect page (matches D-07)
- `Allow: /assets/` — explicit asset permission as required by D-08; Google needs CSS/JS/images to render and evaluate pages
- `Sitemap:` must use a fully-qualified absolute URL — the spec says "Google doesn't assume or check http/https/www.non-www alternates"
- `Disallow: /index.html` will NOT match `/de/index.html` — path matching is exact; a single leading slash matters. Googlebot rule: `/index.html` matches only `/index.html` at root

### Pattern 3: Node.js Validation Script Structure

The script reads all HTML files, extracts JSON-LD `<script>` blocks using a regex, parses each as JSON, and checks for required fields. Uses only `fs.readFileSync`, `path.join`, and `JSON.parse`.

```javascript
// Source: Node.js docs (built-in modules only — no npm)
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');  // tools/ is one level below root

const HTML_FILES = [
  'de/index.html',
  'en/index.html',
  'it/index.html',
  // Legal pages included to verify no JSON-LD present (or it validates if present)
];

const JSONLD_REGEX = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;

// Required fields per @type
const REQUIRED = {
  Restaurant: ['name', 'address', 'telephone', 'openingHoursSpecification', 'servesCuisine'],
  LocalBusiness: ['name', 'address', 'telephone', 'openingHoursSpecification'],
  FAQPage: ['mainEntity'],
};
```

The script loops over HTML files, extracts all JSON-LD blocks per file, parses JSON (catching errors), checks `@type` (handles array form `["Restaurant", "LocalBusiness"]`), verifies required fields exist, and prints a PASS/FAIL summary.

**IMPORTANT:** The existing JSON-LD uses array `@type`: `"@type": ["Restaurant", "LocalBusiness"]`. The validation script must handle both string and array form of `@type`.

### Anti-Patterns to Avoid

- **Trailing-slash inconsistency in sitemap:** The HTML canonical URLs use trailing slashes (`/de/`, `/en/`, `/it/`). The sitemap `<loc>` values must match exactly. Do not mix `/de/index.html` and `/de/` — pick one and be consistent. The HTML uses directory-style trailing slashes.
- **Partial `xhtml:link` blocks:** Google requires every language URL listed in every page's URL block — including self-references. Missing any alternate means Google may ignore the entire hreflang cluster.
- **Forgetting x-default in sitemap:** The HTML head already has `hreflang="x-default"` pointing to DE. The sitemap must mirror this exactly.
- **Relative URLs in sitemap or robots.txt:** Both files require absolute URLs (`https://www.example.com/de/`). Relative paths are not valid.
- **Disallow matching unintended paths:** `Disallow: /index.html` is safe — it only matches the exact root redirect. It does not affect `/de/index.html` or `/en/index.html`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON-LD validation | Full XML/HTML parser | regex extract + JSON.parse | Sufficient for known static files; a full parser would require npm |
| Sitemap generation | Script that generates sitemap | Write static XML directly | Only 3 URLs; static file is simpler, more auditable, no runtime risk |
| Hreflang validation | Complex cross-page link checker | Manual visual inspection (D-14) | Scope decision already made; 3 pages with known structure |
| robots.txt syntax check | Custom parser | Google's robots.txt tester (manual) | One-time check; no automation needed for a static file |

---

## Common Pitfalls

### Pitfall 1: URL Trailing Slash Mismatch Between HTML and Sitemap

**What goes wrong:** HTML canonical is `https://www.example.com/de/` but sitemap uses `https://www.example.com/de/index.html`. Google treats these as different URLs and the hreflang cluster breaks.
**Why it happens:** Developers mix directory-style URLs and file-style URLs.
**How to avoid:** Copy URLs directly from existing `<link rel="canonical">` tags in the HTML. The canonical is ground truth.
**Warning signs:** Google Search Console showing hreflang errors after submission.

### Pitfall 2: x-default Missing or Wrong Target

**What goes wrong:** x-default is omitted from sitemap, or points to `/en/` instead of `/de/`.
**Why it happens:** x-default is easy to forget; some treat it as optional.
**How to avoid:** Mirror the existing HTML hreflang exactly — the HTML already has `hreflang="x-default"` pointing to `/de/`. Do the same in the sitemap.
**Warning signs:** Google Search Console hreflang warning about missing x-default.

### Pitfall 3: JSON-LD Array @type Not Handled

**What goes wrong:** Validation script checks `block['@type'] === 'Restaurant'` but the actual value is `["Restaurant", "LocalBusiness"]`. Script reports false failure.
**Why it happens:** JSON-LD allows both string and array for `@type`.
**How to avoid:** In the validation script, normalize `@type` to array before checking: `const types = [].concat(block['@type'])`.
**Warning signs:** Script fails on all onepage files but passes nowhere.

### Pitfall 4: Validation Script Path Resolution

**What goes wrong:** Script placed in `tools/` uses `__dirname` to build paths to HTML files, but path is wrong relative to the script location.
**Why it happens:** Windows path separators, or off-by-one in `..` resolution.
**How to avoid:** Use `path.join(__dirname, '..', 'de', 'index.html')` — test path resolution with a simple `fs.existsSync` check at script startup that throws a clear error if root is wrong.
**Warning signs:** `ENOENT` errors on first run.

### Pitfall 5: robots.txt Allow/Disallow Order Ambiguity

**What goes wrong:** Developer adds `Disallow: /` (block all) thinking they'll override with Allow, but googlebot resolves conflicts by longest path match, not file order.
**Why it happens:** Confusion between Apache-style "last rule wins" and robots.txt "longest match wins".
**How to avoid:** The decided robots.txt (D-07) uses `Allow: /` + `Disallow: /index.html` — this is unambiguous because `/index.html` is longer than `/` and will win for that specific path.
**Warning signs:** Googlebot stops crawling everything after robots.txt update.

### Pitfall 6: Rich Results Test on Localhost

**What goes wrong:** Rich Results Test cannot reach `localhost` — it requires a publicly accessible URL.
**Why it happens:** The test tool fetches the page from Google's servers.
**How to avoid:** Either deploy to a staging URL before testing, or paste the raw JSON-LD into the Rich Results Test "Code" input mode (accepts raw JSON-LD without a URL).
**Warning signs:** "URL not reachable" error in Rich Results Test.

---

## Code Examples

### Complete sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- REPLACE example.com WITH REAL DOMAIN BEFORE LAUNCH -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <url>
    <loc>https://www.example.com/de/</loc>
    <lastmod>2026-04-10</lastmod>
    <xhtml:link rel="alternate" hreflang="de"        href="https://www.example.com/de/"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://www.example.com/en/"/>
    <xhtml:link rel="alternate" hreflang="it"        href="https://www.example.com/it/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.example.com/de/"/>
  </url>

  <url>
    <loc>https://www.example.com/en/</loc>
    <lastmod>2026-04-10</lastmod>
    <xhtml:link rel="alternate" hreflang="de"        href="https://www.example.com/de/"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://www.example.com/en/"/>
    <xhtml:link rel="alternate" hreflang="it"        href="https://www.example.com/it/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.example.com/de/"/>
  </url>

  <url>
    <loc>https://www.example.com/it/</loc>
    <lastmod>2026-04-10</lastmod>
    <xhtml:link rel="alternate" hreflang="de"        href="https://www.example.com/de/"/>
    <xhtml:link rel="alternate" hreflang="en"        href="https://www.example.com/en/"/>
    <xhtml:link rel="alternate" hreflang="it"        href="https://www.example.com/it/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://www.example.com/de/"/>
  </url>

</urlset>
```

[VERIFIED: developers.google.com/search/docs/specialty/international/localized-versions#sitemap]

### Complete robots.txt

```
# Ristorante Paganini — robots.txt
# REPLACE example.com WITH REAL DOMAIN BEFORE LAUNCH

User-agent: *
Allow: /
Allow: /assets/
Disallow: /index.html

Sitemap: https://www.example.com/sitemap.xml
```

[VERIFIED: developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt]

### Validation Script Core Logic

```javascript
// Source: Node.js built-in modules — no npm required
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const JSONLD_REGEX = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;

const FILES_TO_VALIDATE = [
  path.join(ROOT, 'de', 'index.html'),
  path.join(ROOT, 'en', 'index.html'),
  path.join(ROOT, 'it', 'index.html'),
];

const REQUIRED_FIELDS = {
  Restaurant: ['name', 'address', 'telephone', 'openingHoursSpecification', 'servesCuisine'],
  LocalBusiness: ['name', 'address', 'telephone', 'openingHoursSpecification', 'servesCuisine'],
  FAQPage: ['mainEntity'],
};

let errors = 0;
let passes = 0;

FILES_TO_VALIDATE.forEach(function(filePath) {
  const rel = path.relative(ROOT, filePath);
  const html = fs.readFileSync(filePath, 'utf8');
  let match;
  JSONLD_REGEX.lastIndex = 0;

  while ((match = JSONLD_REGEX.exec(html)) !== null) {
    let block;
    try {
      block = JSON.parse(match[1]);
    } catch (e) {
      console.error('FAIL [' + rel + '] Invalid JSON: ' + e.message);
      errors++;
      continue;
    }

    // Handle both string and array @type
    const types = [].concat(block['@type'] || []);

    types.forEach(function(type) {
      const required = REQUIRED_FIELDS[type];
      if (!required) return; // unknown type — skip
      required.forEach(function(field) {
        if (!block[field]) {
          console.error('FAIL [' + rel + '] @type=' + type + ' missing field: ' + field);
          errors++;
        } else {
          passes++;
        }
      });
    });
  }
});

console.log('\n--- Validation Summary ---');
console.log('Passed checks: ' + passes);
console.log('Failed checks: ' + errors);
if (errors === 0) {
  console.log('ALL JSON-LD VALID');
  process.exit(0);
} else {
  console.error('VALIDATION FAILED — fix errors above before launch');
  process.exit(1);
}
```

### Manual Audit Checklist (D-13, D-14)

The following items are manual browser checks — not automated:

1. **Rich Results Test** — https://search.google.com/test/rich-results
   - Paste raw JSON-LD from each onepage (Code tab) OR use URL after deployment
   - Check DE, EN, IT onepages for zero errors on Restaurant + FAQPage blocks

2. **Lighthouse** (Chrome DevTools > Lighthouse tab)
   - Run on DE onepage (`de/index.html` via local file server or `file://`)
   - Targets: LCP < 2.5s, CLS = 0, zero render-blocking resources
   - Performance category, Mobile preset

3. **WAVE Accessibility** — https://wave.webaim.org or browser extension
   - Check all three onepages: DE, EN, IT
   - Target: zero errors (contrast, missing alt, missing form labels, heading hierarchy)

4. **Hreflang reciprocity visual check** — inspect `<head>` of DE, EN, IT pages:
   - Each page has 4 `<link rel="alternate">` tags
   - x-default points to `/de/` on all three
   - Self-reference present on each page

5. **Sitemap consistency check** — confirm:
   - sitemap.xml `<loc>` URLs match `<link rel="canonical">` exactly (trailing slash form)
   - robots.txt `Sitemap:` URL matches sitemap.xml location

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate XML sitemaps per language | Single sitemap with `xhtml:link` alternate entries | ~2013 Google announcement | All variants in one file; easier maintenance |
| `changefreq` / `priority` for crawl hints | Largely ignored; omit for clarity | ~2020 Google crawler update | Cleaner sitemap; no false signals |
| Google XML Sitemap plugins | Static hand-written XML for small sites | N/A | Small static sites don't need generators |
| robots.txt `Crawl-delay` | Not supported by Googlebot (ignored) | Always | Don't include; use GSC settings instead |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Lighthouse can run on local file:// or local server for audit purposes | Common Pitfalls / Manual checklist | Low — Chrome DevTools Lighthouse works on localhost served content; minor workaround if needed |
| A2 | WAVE extension works as browser extension for local audit | Manual checklist | Low — WAVE web tool can accept deployed URL after launch; extension covers local |

---

## Open Questions

1. **lastmod date in sitemap**
   - What we know: `<lastmod>` is optional; W3C YYYY-MM-DD format required when present
   - What's unclear: Should lastmod reflect today's date or each file's actual last-modified date?
   - Recommendation: Use the current date (2026-04-10) as a static value — within Claude's discretion per CONTEXT.md; real lastmod would require build-time automation which contradicts the no-build-step constraint

2. **Rich Results Test without public URL**
   - What we know: The tool has both URL mode and Code (paste) mode
   - What's unclear: Whether pasting JSON-LD directly covers the full validation or misses rendering-context checks
   - Recommendation: Use Code mode (paste JSON-LD) for the validation checklist; flag that a post-deployment URL-mode test is the authoritative check

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Validation script (D-11) | Yes | v24.14.1 | — |
| Chrome browser | Lighthouse, Rich Results Test, WAVE | [ASSUMED] present | — | Online tools (WAVE.webaim.org, search.google.com/test/rich-results) |
| Local file server | Lighthouse on local files | [ASSUMED] — `npx serve` or Python http.server | — | `python3 -m http.server 8080` or deploy to staging |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:**
- Local file server: If not available, use `python3 -m http.server 8080` or deploy to any static host for Lighthouse testing.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js built-in (no test framework — script is the test) |
| Config file | None |
| Quick run command | `node tools/validate.js` |
| Full suite command | `node tools/validate.js` (same — single script covers all files) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-06 | sitemap.xml lists 3 onepages with hreflang alternates | manual | — (visual inspection) | Wave 0: create sitemap.xml |
| SEO-07 | robots.txt allows all content, disallows /index.html, includes Sitemap directive | manual | — (visual inspection) | Wave 0: create robots.txt |
| SEO-06, SEO-07 | JSON-LD in all 3 onepages is valid and has required fields | automated | `node tools/validate.js` | Wave 0: create tools/validate.js |
| Success Criterion 3 | Rich Results Test zero errors | manual | — (browser tool) | N/A — manual only |
| Success Criterion 4 | Lighthouse LCP < 2.5s, CLS = 0 | manual | — (browser tool) | N/A — manual only |
| Success Criterion 5 | WAVE zero accessibility errors | manual | — (browser tool) | N/A — manual only |

### Sampling Rate

- **Per task commit:** `node tools/validate.js`
- **Per wave merge:** `node tools/validate.js`
- **Phase gate:** `node tools/validate.js` green + all manual checklist items confirmed before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `tools/validate.js` — JSON-LD validation script (does not exist yet)
- [ ] `sitemap.xml` — SEO-06 (does not exist yet)
- [ ] `robots.txt` — SEO-07 (does not exist yet)

*(All three are deliverables of this phase, not pre-existing infrastructure)*

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | N/A — static files, no auth |
| V3 Session Management | No | N/A — no sessions |
| V4 Access Control | No | N/A — all content is public |
| V5 Input Validation | No | Validation script reads local files only — no user input |
| V6 Cryptography | No | No crypto operations |

**Security note for robots.txt:** Do NOT list sensitive paths in robots.txt (Disallow entries) as this is publicly visible and advertises the existence of those paths. The decided minimal approach (D-07) only disallows `/index.html` which is not sensitive — correct practice. [VERIFIED: common security practice, not listing admin paths in robots.txt]

---

## Sources

### Primary (HIGH confidence)

- [developers.google.com/search/docs/specialty/international/localized-versions#sitemap](https://developers.google.com/search/docs/specialty/international/localized-versions#sitemap) — hreflang sitemap format, namespace requirement, reciprocal link requirement
- [developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt) — robots.txt directive syntax, Allow/Disallow, Sitemap directive
- [sitemaps.org/protocol.html](https://www.sitemaps.org/protocol.html) — sitemap XML element requirements, lastmod format, changefreq/priority optionality

### Secondary (MEDIUM confidence)

- Codebase inspection — confirmed: Node.js v24.14.1 available; all 10 HTML files exist with correct noindex/hreflang/JSON-LD structure; placeholder domain convention is `https://www.example.com`; JSON-LD uses array `@type`: `["Restaurant", "LocalBusiness"]`
- 08-CONTEXT.md — locked decisions D-01 through D-14

### Tertiary (LOW confidence)

- A1, A2 above — assumed environment availability for Chrome browser and local file server

---

## Metadata

**Confidence breakdown:**
- sitemap.xml format: HIGH — verified against Google official docs and sitemaps.org spec
- robots.txt format: HIGH — verified against Google official docs
- JSON-LD validation script approach: HIGH — based on known codebase structure and Node.js built-ins
- Manual audit tools (Lighthouse, WAVE, Rich Results): HIGH — standard industry tools, well-documented
- Environment availability: MEDIUM — Node.js confirmed; browser assumed

**Research date:** 2026-04-10
**Valid until:** 2026-05-10 (stable specs — sitemap and robots.txt formats change very rarely)
