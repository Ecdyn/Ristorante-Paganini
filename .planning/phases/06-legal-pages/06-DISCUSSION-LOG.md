# Phase 6: Legal Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-08
**Phase:** 06-legal-pages
**Areas discussed:** Page layout, Legal filenames, Placeholder content depth, GDPR documentation
**Mode:** auto (all decisions auto-selected with recommended defaults)

---

## Page Layout & Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal single-column | Shared CSS, header with back link, content, minimal footer | ✓ |
| Full navigation | Same header/footer as onepages | |
| Standalone minimal | Separate minimal CSS, no shared design system | |

**User's choice:** Minimal single-column (auto-selected)
**Notes:** Legal pages are utility pages. Full navigation would create maintenance overhead for pages users rarely visit directly.

---

## Legal Filenames

| Option | Description | Selected |
|--------|-------------|----------|
| Localized filenames | EN: legal.html/privacy.html, IT: legale.html/privacy.html | ✓ |
| German filenames everywhere | impressum.html/datenschutz.html in all languages | |

**User's choice:** Localized filenames (auto-selected, matches roadmap success criteria)
**Notes:** Roadmap Phase 6 SC-1 explicitly lists the localized filenames. Footer links in EN/IT onepages need correction.

---

## Placeholder Content Depth

| Option | Description | Selected |
|--------|-------------|----------|
| Structured with headings | Realistic sections, 1-2 placeholder paragraphs, REPLACE comments | ✓ |
| Minimal skeleton | Just headings, no placeholder text | |
| Full draft | Attempt realistic legal text | |

**User's choice:** Structured with headings (auto-selected)
**Notes:** Gives lawyers a clear structure to fill in. Full draft risks being used as-is which would be legally incorrect.

---

## GDPR Documentation Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Implementation-specific | Document actual GDPR decisions: no Google Fonts, no Maps iframe, no cookies | ✓ |
| Generic GDPR template | Standard GDPR boilerplate sections | |

**User's choice:** Implementation-specific (auto-selected)
**Notes:** The roadmap success criteria explicitly require documenting Google Maps and Google Fonts decisions.

## Claude's Discretion

- Exact placeholder paragraph wording
- Visual styling within design system
- Section ordering
- Last updated date placeholder

## Deferred Ideas

None.
