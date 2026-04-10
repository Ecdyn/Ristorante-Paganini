# Phase 5: English and Italian Onepages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md -- this log preserves the alternatives considered.

**Date:** 2026-04-08
**Phase:** 05-english-and-italian-onepages
**Areas discussed:** Translation tone & formality, FAQ & SEO localization, Hero & CTA language

---

## Translation Tone & Formality

### English Tone

| Option | Description | Selected |
|--------|-------------|----------|
| Warm & professional (Recommended) | Same warm family voice as German, slightly less formal since English has no Sie/Du. "We" voice, inviting but polished. | :heavy_check_mark: |
| Casual & friendly | More relaxed, conversational. "Come join us" energy. Feels approachable but may undercut premium feel. | |
| Formal & elegant | Refined, restrained language. Emphasizes exclusivity. May feel distant for a family restaurant. | |

**User's choice:** Warm & professional
**Notes:** Matches the premium positioning while maintaining the family warmth.

### Italian Register

| Option | Description | Selected |
|--------|-------------|----------|
| Lei (formal) | Consistent with German Sie. Premium positioning. Standard for upscale Italian restaurants. | |
| Voi (semi-formal plural) | Slightly warmer than Lei, addresses visitors as a group. Common in southern Italian hospitality. | :heavy_check_mark: |
| Tu (informal) | Very personal and casual. Works for trattorias but may conflict with premium positioning. | |

**User's choice:** Voi (semi-formal plural)
**Notes:** Warmer hospitality feel while maintaining respect.

### Translation Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Faithful translation (Recommended) | Same content, structure, and messaging -- translated accurately. Consistent, easiest to maintain. | :heavy_check_mark: |
| Light cultural adaptation | Same structure but adjust phrasing for cultural nuance per audience. | |
| You decide | Claude uses best judgment per section. | |

**User's choice:** Faithful translation
**Notes:** Consistency across all three pages prioritized.

---

## FAQ & SEO Localization

### FAQ Question Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Same 7 questions, translated (Recommended) | Direct translation of all 7 FAQs. Same FAQPage JSON-LD structure. Leipzig terms get natural equivalents. | :heavy_check_mark: |
| Adapted questions per language | Keep practical core but swap Leipzig-specific ones for tourist/expat-relevant questions. | |
| Fewer questions for EN/IT | Only translate 4-5 universally relevant FAQs. Drop Leipzig-specific SEO questions. | |

**User's choice:** Same 7 questions, translated
**Notes:** Content parity across all languages.

### Meta Title Pattern

| Option | Description | Selected |
|--------|-------------|----------|
| Same pattern, translated (Recommended) | EN: "Ristorante Paganini \| Italian Restaurant Leipzig". IT: "Ristorante Paganini \| Ristorante Italiano Lipsia". | :heavy_check_mark: |
| Brand name only + city | Shorter format: "Ristorante Paganini -- Leipzig" / "Ristorante Paganini -- Lipsia". | |
| You decide | Claude picks best SEO-optimized title per language. | |

**User's choice:** Same pattern, translated
**Notes:** Consistent branding with city name for local SEO.

---

## Hero & CTA Language

### Hero H1 Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Keep Italian tagline on all pages (Recommended) | Same Italian H1 across DE/EN/IT. Brand signature, authentic since the restaurant IS Italian. | :heavy_check_mark: |
| Translate tagline per language | EN gets English tagline, IT keeps Italian. More localized but loses atmospheric effect. | |
| Italian tagline + translated subtitle | Keep Italian H1 everywhere, add small translated subtitle for non-Italian speakers. | |

**User's choice:** Keep Italian tagline on all pages
**Notes:** Italian tagline is brand identity, not translatable content.

### CTA Button Text

| Option | Description | Selected |
|--------|-------------|----------|
| Direct translation (Recommended) | EN: "Reserve a Table" + "Menu". IT: "Prenota un Tavolo" + "Menu". Clear and consistent. | :heavy_check_mark: |
| Culturally adapted CTAs | Slightly different wording per culture (e.g., EN: "Book a Table", IT: "Prenota ora"). | |
| You decide | Claude picks most natural CTA wording per language. | |

**User's choice:** Direct translation
**Notes:** Functional consistency across languages.

---

## Claude's Discretion

- Exact copy wording within faithful translation direction
- Natural language phrasing for FAQ answers
- Minor adjustments where literal translation would sound awkward
- HTML comment language (developer-facing, stays in English)
- aria-label translations

## Deferred Ideas

None -- discussion stayed within phase scope.
