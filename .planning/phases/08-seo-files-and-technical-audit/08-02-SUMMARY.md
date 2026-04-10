---
phase: 08-seo-files-and-technical-audit
plan: 02
subsystem: seo
tags: [json-ld, validation, schema.org, node.js, restaurant, faqpage, audit]

# Dependency graph
requires:
  - phase: 03-german-onepage-head-and-seo-skeleton
    provides: de/index.html with JSON-LD Restaurant + FAQPage blocks validated by this script
  - phase: 04-english-onepage
    provides: en/index.html with JSON-LD blocks
  - phase: 05-italian-onepage
    provides: it/index.html with JSON-LD blocks
  - phase: 08-01
    provides: sitemap.xml and robots.txt for consistency check in Task 2 manual audit
provides:
  - tools/validate.js automated JSON-LD field validator (Node.js built-ins only)
  - Manual audit checklist covering Rich Results Test, Lighthouse, WAVE, hreflang, sitemap consistency
affects:
  - launch-checklist (validation script is the automated gate before launch)
  - future-phase (any JSON-LD schema changes should be re-validated with this script)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "JSON-LD validation via regex extract + JSON.parse -- sufficient for known static files, no npm needed"
    - "Array @type normalization: [].concat(block['@type'] || []) handles both string and array form"
    - "File-existence guard with fs.existsSync before fs.readFileSync -- clear error on missing files"
    - "JSONLD_REGEX.lastIndex = 0 reset before each file -- required for global regex reuse across multiple strings"

key-files:
  created:
    - tools/validate.js
  modified: []

key-decisions:
  - "Node.js built-ins only (fs, path) -- no npm install, no dependencies (D-11)"
  - "Script placed in tools/ directory, ROOT resolved via path.join(__dirname, '..')"
  - "Array @type handled via [].concat normalization -- codebase uses [\"Restaurant\", \"LocalBusiness\"] form"
  - "LocalBusiness required fields include servesCuisine -- matches Restaurant requirements since both types are always used together"
  - "Task 2 (manual audit checkpoint) left pending -- requires browser-based tools unavailable in automated environment"

patterns-established:
  - "Validation script pattern: regex-based JSON-LD extraction from HTML, field-by-field PASS/FAIL reporting, summary with exit code"
  - "PASS/FAIL output format: PASS/FAIL [relative_path] @type=X field: Y -- consistent, greppable output"

requirements-completed: [SEO-06, SEO-07]

# Metrics
duration: 5min
completed: 2026-04-10
---

# Phase 8 Plan 02: JSON-LD Validation and Audit Summary

**Node.js validation script (tools/validate.js) confirming 33 JSON-LD field checks pass across all 3 onepages with zero failures; manual browser audit checklist documented as pending human verification**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-04-10T18:00:00Z
- **Completed:** 2026-04-10T18:05:00Z
- **Tasks:** 1 completed (automated) + 1 pending (human checkpoint)
- **Files created:** 1

## Accomplishments
- tools/validate.js created using only Node.js fs and path built-in modules (zero npm dependencies, satisfies D-11)
- Script validates Restaurant/LocalBusiness required fields (name, address, telephone, openingHoursSpecification, servesCuisine) and FAQPage required field (mainEntity) across de/index.html, en/index.html, it/index.html
- Correctly handles array @type form ["Restaurant", "LocalBusiness"] via [].concat normalization
- Running `node tools/validate.js` exits 0 with "ALL JSON-LD VALID" -- 33 passing checks, 0 failures across all 3 onepages

## Task Commits

Each task was committed atomically:

1. **Task 1: Create JSON-LD validation script** - `0637f44` (feat)
2. **Task 2: Manual site audit and launch readiness verification** - PENDING (human checkpoint)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `tools/validate.js` - JSON-LD validation script: extracts all JSON-LD blocks from HTML via regex, validates JSON syntax, checks required fields by @type, prints PASS/FAIL per check, exits 0 on success

## Decisions Made
- Used `[].concat(block['@type'] || [])` to normalize @type -- handles both string ("Restaurant") and array (["Restaurant", "LocalBusiness"]) forms, avoiding false failures
- ROOT resolved as `path.join(__dirname, '..')` since script lives in tools/ one level below project root -- verified by fs.existsSync guard
- LocalBusiness required fields set identical to Restaurant since both types always appear together in this codebase -- any split would be misleading
- Script uses `var` at module scope and function syntax (not arrow functions) for broadest Node.js compatibility per plan instructions

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. The validation script passed on first run with 33/33 checks passing across all 3 onepages.

## Pending: Task 2 - Manual Audit Checkpoint

Task 2 is a `checkpoint:human-verify` requiring browser-based tools that cannot be automated. The orchestrator will handle this interaction separately.

**Checklist for human verification:**

**1. Rich Results Test (all 3 onepages)**
- Go to https://search.google.com/test/rich-results
- Click "Code" tab (site not deployed -- use paste mode)
- Copy JSON-LD blocks from de/index.html, paste into the test
- Confirm zero errors for Restaurant + LocalBusiness + FAQPage
- Repeat for en/index.html and it/index.html
- Expected: zero errors on all three

**2. Lighthouse (German onepage)**
- Start local server: `npx serve .` or `python -m http.server 8080` from project root
- Open Chrome, navigate to http://localhost:8080/de/
- DevTools > Lighthouse tab > Performance > Mobile preset
- Expected: LCP under 2.5s, CLS = 0, zero render-blocking resources flagged

**3. WAVE Accessibility (all 3 onepages)**
- Install WAVE browser extension (https://wave.webaim.org/extension/) or use WAVE web tool
- Run on DE, EN, IT onepages via local server
- Expected: zero errors (warnings acceptable)

**4. Hreflang reciprocity visual check**
- Open de/index.html source, find 4 `<link rel="alternate">` tags in head
- Confirm: hreflang="de" (self), hreflang="en", hreflang="it", hreflang="x-default" pointing to /de/
- Repeat for en/index.html and it/index.html
- Confirm each page has all 4 tags with self-reference included

**5. Sitemap consistency check**
- Open sitemap.xml and compare loc URLs to canonical URLs in HTML files
- Confirm they match exactly (trailing-slash form /de/, /en/, /it/)
- Open robots.txt and confirm Sitemap: URL points to correct sitemap.xml path

**Resume signal:** Type "approved" if all checks pass, or describe any issues found.

## User Setup Required

None for the automated task. Task 2 (pending human checkpoint) requires:
- Chrome browser with DevTools
- WAVE browser extension (https://wave.webaim.org/extension/) or online WAVE tool
- Local file server (Python: `python -m http.server 8080`, or npm: `npx serve .`)

## Known Stubs

None -- tools/validate.js is a complete, functional script with no stubs or placeholders.

## Self-Check: PASSED

- tools/validate.js: FOUND in worktree
- 08-02-SUMMARY.md: FOUND at .planning/phases/08-seo-files-and-technical-audit/08-02-SUMMARY.md
- Commit 0637f44: FOUND in git log
- node tools/validate.js: exits 0, ALL JSON-LD VALID

## Next Phase Readiness
- tools/validate.js passes green on all 3 onepages (automated gate satisfied)
- Task 2 manual audit checkpoint pending human verification before phase 8 can be marked complete
- Once Task 2 is approved, phase 8 is fully complete and site is ready for launch (after replacing www.example.com placeholder domain)

---
*Phase: 08-seo-files-and-technical-audit*
*Completed: 2026-04-10*
