# Phase 8: SEO Files and Technical Audit - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-08
**Phase:** 08-seo-files-and-technical-audit
**Areas discussed:** Sitemap scope, Base URL strategy, Robots.txt rules, Validation scope

---

## Sitemap Scope

| Option | Description | Selected |
|--------|-------------|----------|
| 3 onepages only | Only de/en/it index.html with hreflang xhtml:link alternates. Legal pages have noindex. Google ignores noindex pages in sitemaps anyway. | ✓ |
| All 9 content pages | Include 3 onepages + 6 legal pages. Legal pages get entries but no hreflang alternates. | |
| 3 onepages + legal grouped | Onepages with hreflang + legal pages grouped by language with hreflang alternates between equivalent legal pages. | |

**User's choice:** 3 onepages only
**Notes:** None

### Hreflang in Sitemap

| Option | Description | Selected |
|--------|-------------|----------|
| Full xhtml:link alternates | Each URL entry includes xhtml:link rel="alternate" for all 3 languages + x-default. Mirrors HTML head hreflang. Standard best practice. | ✓ |
| Simple URLs only | Just 3 URL entries with loc — no hreflang in sitemap. HTML head already has complete hreflang tags. | |

**User's choice:** Full xhtml:link alternates
**Notes:** None

---

## Base URL Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Same placeholder + REPLACE comment | Use https://www.example.com consistently matching HTML files. One find-and-replace updates entire site. | ✓ |
| Relative paths where possible | Sitemap needs absolute URLs per spec. robots.txt Disallow can use relative. Mix of approaches. | |
| Config note approach | Add README section documenting all files needing domain replacement rather than embedding placeholders. | |

**User's choice:** Same placeholder + REPLACE comment
**Notes:** None

---

## Robots.txt Rules

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal — disallow root only | Allow all crawlers everywhere, only Disallow /index.html (root redirect). Assets allowed for rendering. | ✓ |
| Disallow root + test.html | Block redirect page AND dev test file. test.html isn't linked anywhere though. | |
| Disallow root + entire assets/ | Block all static assets. Not recommended — Google needs CSS/JS/images for rendering. | |

**User's choice:** Minimal — disallow root only
**Notes:** None

---

## Validation Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Manual checklist document | Validation checklist with steps for Lighthouse, WAVE, Rich Results Test. Developer runs manually. | |
| Automated validation script | Node.js or bash script for automated checks. | ✓ |
| Inline HTML validation only | Verify by reading HTML — JSON-LD syntax, hreflang, meta tags. Skip external tools. | |

**User's choice:** Automated validation script

### Script Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Standalone Node.js script | Single .js file using only Node.js built-in modules (fs, path). No npm install. Core Web Vitals/WAVE remain manual. | ✓ |
| Bash script with grep/sed | .sh script using standard Unix tools. Zero dependencies. More limited parsing. | |
| Allow dev-dependency exception | Install lighthouse-ci + JSON-LD validator as devDependencies. Full scoring. | |

**User's choice:** Standalone Node.js script

### Validation Checks

| Check | Description | Selected |
|-------|-------------|----------|
| JSON-LD syntax + required fields | Parse JSON-LD blocks, verify valid JSON, check required schema fields | ✓ |
| Hreflang reciprocity | Verify all pages have all 4 hreflang tags, check return tags exist | |
| Meta tag completeness | Check each page for title, description, canonical, OG tags, twitter card | |
| Sitemap/robots consistency | Verify sitemap pages, robots.txt references, no noindex in sitemap | |

**User's choice:** JSON-LD syntax + required fields only
**Notes:** Other checks (hreflang, meta, sitemap consistency) will be manual/visual verification

---

## Claude's Discretion

- Sitemap XML formatting and lastmod dates
- Validation script file location and naming
- Manual checklist ordering
- changefreq/priority in sitemap entries
- Script console output format

## Deferred Ideas

None — discussion stayed within phase scope.
