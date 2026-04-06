# Phase 1: CSS Design System - Context

**Gathered:** 2026-04-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Lock the visual token system, typography, layout skeleton, and responsive foundation in a single CSS file (`assets/css/main.css`) before any HTML is written. The CSS file must define every visual decision for the entire site — any HTML file that links it gets the correct typography, colors, spacing, and responsive layout without additional work.

</domain>

<decisions>
## Implementation Decisions

### Color Palette
- **D-01:** Primary accent color is wine/burgundy (#7A2D3A range) — evokes red wine, confidence, traditional Italian dining
- **D-02:** Site backgrounds are all light/cream throughout (#FBF5F5 warm cream range) — airy, open feel rather than dark/moody
- **D-03:** CTA buttons use solid wine fill with white text — high-visibility, unmistakable click targets
- **D-04:** Text color is dark charcoal/espresso range for readability on light backgrounds

### Typography Scale & Hierarchy
- **D-05:** Moderate heading hierarchy — H1 ~3rem (48px), H2 ~2rem (32px), H3 ~1.375rem (22px), body 1rem (16px) on desktop with ~20% reduction on mobile
- **D-06:** Cormorant Garamond (serif) for all headings H1–H4; Lato (sans-serif) for body text, navigation, buttons, captions, and all other text
- **D-07:** Self-hosted woff2 font files with @font-face and font-display: swap — no Google Fonts CDN requests

### Spacing & Visual Density
- **D-08:** Generous vertical spacing between sections: 80–120px (5rem–7.5rem) — each section feels like its own world, premium editorial feel
- **D-09:** Narrow content width ~800px max for text sections — comfortable 65–75 character reading lines, generous side whitespace on desktop
- **D-10:** Hero and gallery sections can extend to full viewport/container width regardless of the 800px text constraint

### Section Layout Patterns
- **D-11:** Hero is full-viewport height (100vh) with background photo, dark overlay for text readability, headline and CTAs centered on top
- **D-12:** Hero image uses eager loading with fetchpriority="high" — it is the LCP element

### Claude's Discretion
- H2 section title styling (uppercase with letter-spacing vs. title case vs. other treatment)
- Section visual separation method (alternating background tints, divider lines, whitespace only, or combination)
- Whether to include a dark section variant (e.g., dark footer) or keep everything light/cream
- Internal spacing within sections (padding, element gaps)
- Exact hex values for the full color token set (derived from the wine/cream direction)
- Spacing scale progression (e.g., 4px base, 8px, 16px, 24px, 32px, etc.)
- Focus indicator styling for accessibility
- Transition/animation token values
- Shadow and border-radius token values

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### CSS Architecture
- `CLAUDE.md` — CSS Architecture section defines CUBE CSS methodology, font loading strategy, responsive breakpoints, and "What NOT to Use" constraints

### Requirements
- `.planning/REQUIREMENTS.md` — FOUND-01 through FOUND-03, FOUND-07, FOUND-09, FOUND-10 define the specific requirements this phase must satisfy

No external specs or ADRs — requirements fully captured in CLAUDE.md tech stack and decisions above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No existing code — this is the first phase of a greenfield project

### Established Patterns
- CUBE CSS methodology is mandated in CLAUDE.md — use Composition, Utility, Block, Exception pattern
- Single `main.css` file — no CSS imports, no partials, no preprocessors
- CSS custom properties (variables) as the primary theming mechanism (design tokens in `:root`)

### Integration Points
- `assets/css/main.css` — the sole CSS file, linked by all HTML pages in all subsequent phases
- `assets/fonts/` — self-hosted woff2 font files referenced by @font-face in main.css
- HTML comment convention for editable content zones must be documented in CSS file header (FOUND-10)

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches within the decided direction (wine/cream palette, moderate typography, generous spacing, full-viewport hero).

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-css-design-system*
*Context gathered: 2026-04-06*
