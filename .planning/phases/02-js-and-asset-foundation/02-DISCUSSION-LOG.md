# Phase 2: JS and Asset Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-07
**Phase:** 02-js-and-asset-foundation
**Areas discussed:** Sticky header behavior, Mobile menu style, Image & asset strategy, Favicon & manifest

---

## Sticky Header Behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Hide on scroll down, show on scroll up | Header slides out when scrolling down, reappears when scrolling up. Most common premium restaurant pattern. | ✓ |
| Always visible (fixed) | Header stays pinned at top permanently. Simpler but eats ~60-70px of viewport. | |
| Shrink on scroll | Header compresses height and reduces logo size after scrolling past hero. | |

**User's choice:** Hide on scroll down, show on scroll up
**Notes:** Recommended option selected — maximizes content space while keeping nav accessible.

| Option | Description | Selected |
|--------|-------------|----------|
| Transparent on hero, solid after scroll | Starts transparent over hero image, gains solid cream background with shadow after scrolling past hero. | ✓ |
| Always solid background | Cream/white background from the start. Simpler but covers hero image. | |
| Blur/frosted glass effect | backdrop-filter blur throughout. Modern but may not match classic Italian aesthetic. | |

**User's choice:** Transparent on hero, solid after scroll
**Notes:** Premium restaurant standard — enhances hero visual impact.

---

## Mobile Menu Style

| Option | Description | Selected |
|--------|-------------|----------|
| Full-screen overlay | Covers entire viewport with dark/wine background, large centered nav links, close button. Immersive, premium feel. | ✓ |
| Slide-in drawer from right | Panel covering ~75% width from right edge. Familiar but more app-like than restaurant. | |
| Dropdown panel below header | Drops down from header pushing content. Simpler but can cause layout shift. | |

**User's choice:** Full-screen overlay
**Notes:** Premium, immersive feel aligned with restaurant brand.

| Option | Description | Selected |
|--------|-------------|----------|
| Close on anchor tap | Tapping any section link closes menu and smooth-scrolls to section. | ✓ |
| Stay open | Menu stays open after tapping a link. User must manually close. | |

**User's choice:** Close on anchor tap
**Notes:** Expected behavior for onepage sites.

---

## Image & Asset Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Solid color blocks with text labels | Colored rectangles with text like "Hero — 1400x800". Zero dependencies, agency-friendly. | ✓ |
| Generated SVG placeholders | Inline SVG with dimensions and section name. Slightly more polished. | |
| Free stock photos as stand-ins | Unsplash/Pexels photos as temporary. Realistic but licensing risk and weight. | |

**User's choice:** Solid color blocks with text labels
**Notes:** Simplest approach, clearly marks what needs replacing before launch.

| Option | Description | Selected |
|--------|-------------|----------|
| Flat with naming convention | All images in assets/img/ with names like hero-desktop.avif. Simple, agency-friendly. | ✓ |
| Nested by format | assets/img/avif/, webp/, jpg/ subdirectories. Organized by format. | |
| Nested by section | assets/img/hero/, gallery/, about/ subdirectories with all variants. | |

**User's choice:** Flat with naming convention
**Notes:** Easiest to maintain and audit for missing variants.

---

## Favicon & Manifest

| Option | Description | Selected |
|--------|-------------|----------|
| Stylized "P" monogram | Serif letter "P" in wine color. Clean, scales well, recognizable. | ✓ |
| Musical note or violin motif | References Paganini the violinist. Distinctive but may confuse. | |
| Fork/wine glass icon | Classic restaurant symbol. Clear but generic. | |

**User's choice:** Stylized "P" monogram
**Notes:** Brand-specific, avoids generic restaurant or music confusion.

| Option | Description | Selected |
|--------|-------------|----------|
| Wine accent #7A2D3A | Primary brand accent for browser chrome tinting. Strong brand presence. | ✓ |
| Cream surface #FBF5F5 | Matches page background. Subtle, less brand impact. | |

**User's choice:** Wine accent #7A2D3A
**Notes:** Consistent with brand identity across all touchpoints.

---

## Claude's Discretion

- Exact scroll threshold and animation speed for header hide/show
- Mobile menu animation style and duration
- Hamburger icon design
- Smooth scroll easing and scroll-padding-top offset
- Placeholder image color choices within palette
- Specific image dimension sets per section type
- SVG favicon letterform details
- ICO generation approach

## Deferred Ideas

None — discussion stayed within phase scope.
