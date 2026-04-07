# Phase 4: German Onepage — All 12 Content Sections - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-08
**Phase:** 04-german-onepage-all-12-content-sections
**Areas discussed:** Hero section, Menu & Lunch, Gallery layout, Copy tone & FAQ

---

## Hero Section

### Headline approach

| Option | Description | Selected |
|--------|-------------|----------|
| Restaurant name only | H1 is "Ristorante Paganini", subheadline with tagline | |
| Name + value prop | H1 is name, prominent subheadline selling the experience | |
| Emotional tagline | H1 is evocative Italian phrase, name as secondary element | ✓ |

**User's choice:** Emotional tagline — atmospheric, bold
**Notes:** None

### Trust cues

| Option | Description | Selected |
|--------|-------------|----------|
| Family heritage | "Seit über 30 Jahren familiengeführt" | ✓ |
| Location badge | "Im Herzen der Leipziger Innenstadt" | ✓ |
| Quick hours/phone | Small text with hours and phone in hero | ✓ |

**User's choice:** All three trust cues
**Notes:** None

### CTA arrangement

| Option | Description | Selected |
|--------|-------------|----------|
| Two buttons side-by-side | Primary reserve (wine fill) + secondary menu (outline) | ✓ |
| Single reservation CTA | One strong "Jetzt reservieren" button | |
| Stacked buttons | Reserve on top, menu below | |

**User's choice:** Two buttons side-by-side
**Notes:** None

### Restaurant name placement

| Option | Description | Selected |
|--------|-------------|----------|
| Above the tagline | Brand mark above the H1 tagline | ✓ |
| Below the tagline | H1 tagline first, name below | |

**User's choice:** Claude's discretion — recommended option (above)
**Notes:** User deferred to recommended option

---

## Menu & Lunch

### Menu preview layout

| Option | Description | Selected |
|--------|-------------|----------|
| Category cards | 4 cards (Pasta, Pizza, Antipasti, Wein) with 3-4 highlights each | ✓ |
| Tabbed categories | Tabs to switch between categories, requires JS | |
| Single curated list | One flowing list of 8-10 signature dishes | |

**User's choice:** Category cards (recommended)
**Notes:** None

### Pricing display

| Option | Description | Selected |
|--------|-------------|----------|
| No prices | Dish names + descriptions only, drives PDF download | ✓ |
| Price ranges per category | Category-level price ranges | |
| Full prices per dish | Exact price per dish | |

**User's choice:** No prices (recommended)
**Notes:** None

### Business lunch format

| Option | Description | Selected |
|--------|-------------|----------|
| Highlight slots | 3-4 named slots with placeholder dishes and EDIT comments | ✓ |
| Free-text block | One editable paragraph | |
| Weekly rotation table | Mon-Fri daily special table | |

**User's choice:** Highlight slots (recommended)
**Notes:** None

---

## Gallery Layout

### Grid arrangement

| Option | Description | Selected |
|--------|-------------|----------|
| 3-column masonry-style | 6 images, 3x2 grid, one spanning 2 columns | ✓ |
| Uniform 3x2 grid | 6 equal-sized images | |
| 2-column alternating | Alternating large/small editorial style | |

**User's choice:** 3-column masonry-style (recommended)
**Notes:** None

### Lightbox behavior

| Option | Description | Selected |
|--------|-------------|----------|
| No lightbox | Static grid only | |
| CSS-only lightbox | :target pseudo-class overlay | |
| JS lightbox | Vanilla JS modal with navigation | ✓ |

**User's choice:** JS lightbox — user chose this over the recommended "no lightbox"
**Notes:** User wants full lightbox experience even with placeholder images

### Image subjects

| Option | Description | Selected |
|--------|-------------|----------|
| Mixed showcase | 2 food, 2 interior, 1 terrace, 1 exterior | ✓ |
| Food-heavy | 4 food, 1 interior, 1 terrace | |
| Atmosphere-heavy | 1 food, 3 interior, 1 terrace, 1 exterior | |

**User's choice:** Mixed showcase (recommended)
**Notes:** None

### Captions

| Option | Description | Selected |
|--------|-------------|----------|
| No captions | Clean image-only grid | |
| Hover captions | Text appears on hover/tap | ✓ |
| Visible captions below | Always-visible text under images | |

**User's choice:** Hover captions
**Notes:** User chose this over the recommended "no captions"

---

## Copy Tone & FAQ

### Copy length

| Option | Description | Selected |
|--------|-------------|----------|
| Concise | 2-3 short paragraphs per section | ✓ |
| Detailed | 4-5 paragraphs per section | |
| Minimal | 1 paragraph + bullet points | |

**User's choice:** Concise (recommended)
**Notes:** None

### Tone

| Option | Description | Selected |
|--------|-------------|----------|
| Warm & personal | "Wir" voice, family story, inviting | ✓ |
| Elegant & formal | Third-person, refined, premium hotel-style | |
| Casual & friendly | "Du" voice, playful, approachable | |

**User's choice:** Warm & personal (recommended)
**Notes:** None

### FAQ topics selected (7 total)

| Topic | Search target | Selected |
|-------|---------------|----------|
| Reservation & walk-ins | 'restaurant reservieren leipzig' | ✓ |
| Business lunch | 'mittagstisch leipzig' | ✓ |
| Parking & directions | 'parken innenstadt leipzig' | ✓ |
| Dietary options | vegetarische/vegane Gerichte | ✓ |
| Terrace / outdoor | 'restaurant mit terrasse leipzig' | ✓ |
| Payment methods | practical trust | ✓ |
| Dog-friendly | common Leipzig search | ✓ |
| Private events | group bookings | not selected |

**User's choice:** 7 topics as listed above
**Notes:** Private events was the runner-up, deferred

---

## Claude's Discretion

- Exact Italian tagline wording for H1
- Hero name placement (above tagline — user deferred to recommended)
- Hero image overlay opacity and text positioning
- Exact dishes for menu preview highlights
- Gallery grid CSS details
- Lightbox animation and navigation UX
- Section heading treatments
- Quick info bar layout
- FAQ answer wording
- Contact and footer layout details
- Image dimensions per section
- Section aria-label attributes

## Deferred Ideas

- Private events FAQ question — dropped from initial 7, potential future addition
- Mobile swipe gestures for lightbox — keep initial implementation simple
