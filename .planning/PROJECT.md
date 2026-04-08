# Ristorante Paganini — Website

## What This Is

A high-end multilingual onepage restaurant website for "Ristorante Paganini" in Leipzig. Static HTML/CSS/vanilla JS — no frameworks, no build step. Three language versions (German, English, Italian) with separate legal pages. Designed to drive table reservations, walk-in traffic, group/event inquiries, and business lunch visibility while conveying authentic Italian warmth and premium quality.

## Core Value

Visitors instantly trust Ristorante Paganini as an authentic, premium Italian restaurant in Leipzig's city center and can reserve a table within seconds.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Multilingual onepage site (DE/EN/IT) with 12 anchor sections per language
- [ ] Root index.html with intelligent language redirect (default DE, browser detection for EN/IT)
- [ ] Separate legal pages per language (Impressum, Datenschutz)
- [ ] Hero section with strong headline, trust cues, reservation CTA, menu CTA
- [ ] Quick info bar: opening hours, address, phone, reservation CTA, lunch hours, terrace note
- [ ] About/Philosophy section: family-run story, authentic Italian identity, quality promise
- [ ] Menu overview with HTML preview (pasta, pizza, antipasti, wine) + full menu CTA + PDF download
- [ ] Business lunch section: monthly-updatable, 11:30–14:30 hours, PDF link, status/holiday notes
- [ ] Gallery: elegant image grid (interior, food, terrace, exterior)
- [ ] Reservation section: external tool embed placeholder, fallback CTA, phone option
- [ ] Groups/Events section: inquiry CTA, trust-focused copy
- [ ] Location section: address, Google Maps embed placeholder, parking info (Große Fleischergasse, Brühl Center ~200m, public paid parking)
- [ ] FAQ section with 7 SEO-relevant questions
- [ ] Contact section: phone, email, address, hours, Instagram placeholder
- [ ] Footer: legal links, language switcher, contact summary, copyright
- [ ] Sticky header with responsive mobile menu
- [ ] Smooth anchor navigation
- [ ] Semantic HTML5 with accessible markup, single H1 per page, proper alt attributes
- [ ] CSS variables for colors, spacing, typography; mobile-first responsive system
- [ ] Clean SEO: meta titles, descriptions, OG tags, Twitter cards, canonical, hreflang, robots meta
- [ ] JSON-LD structured data: Restaurant, LocalBusiness, PostalAddress, openingHoursSpecification
- [ ] sitemap.xml and robots.txt
- [ ] Local SEO optimization for German search intent (italienisches restaurant leipzig, mittagstisch leipzig, etc.)
- [ ] Agency-friendly editability with clear HTML comments for all live data placeholders
- [ ] Performance: lazy loading, minimal JS, no render-blocking resources, Core Web Vitals oriented
- [ ] Premium design: elegant, warm, Italian modern-classic, generous spacing, strong typography

### Out of Scope

- Backend / server-side logic — static site only
- CMS or admin panel — content edited directly in HTML
- Online ordering / delivery system — not a delivery restaurant
- Team/staff section — explicitly excluded from gallery
- Blog or news section — onepage model, not a content site
- Payment processing — reservations only, no online payments
- jQuery or any JS framework — vanilla JS only
- Animation libraries or heavy sliders — lightweight approach
- Multi-page marketing site — onepage + legal pages only

## Context

- **Location:** Leipzig city center / old town (Innenstadt), Große Fleischergasse area
- **History:** Family-run for 30+ years by real Italians — strong authenticity angle
- **Cuisine:** Traditional Italian — handmade pasta, stone oven pizza, antipasti, wine-focused
- **Service model:** Dine-in with reservations + walk-ins, business lunch 11:30–14:30, groups/events
- **Terrace:** Large summer terrace — seasonal feature
- **Primary market:** German local search (Leipzig + Innenstadt intent), tourists, hotel guests
- **Brand tone:** Warm, professional, premium, inviting — never cheesy, never salesy, never generic
- **Design direction:** Modern-classic Italian elegance, understated luxury, strong typography, generous whitespace
- **Avoid:** Cheap theme look, red/green cliché overload, pizza flyer styling, stock-template feel, visual clutter
- **Target audiences:** Leipzig locals/regulars, tourists, business lunch guests, couples/date-night, families/groups, hotel guests
- **Technical hosting:** Static host compatible — no server-side requirements, no build step

## Constraints

- **Tech stack**: Plain HTML5, CSS3, vanilla JavaScript only — no frameworks, no build tools, no dependencies
- **Site model**: One onepage per language + 2 legal pages per language + root redirect — nothing more
- **Languages**: German (primary), English, Italian — all fully localized including nav, buttons, meta, schema
- **Performance**: Optimized for Core Web Vitals — lazy loading, minimal JS, simple DOM
- **Accessibility**: Semantic markup, proper heading hierarchy, alt attributes, keyboard navigation
- **Editability**: Agency-friendly with clear HTML comments marking all editable content areas
- **Legal**: Placeholder legal content only — real legal text must be inserted before launch
- **Design**: Must not look like a student demo or generic theme clone — premium restaurant quality bar

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static HTML/CSS/JS, no frameworks | No build step, maximum simplicity, any developer can maintain | — Pending |
| Onepage + legal pages model | Restaurant doesn't need multi-page site; one focused landing page per language converts better | — Pending |
| German as primary language / default redirect | Leipzig is in Germany; most visitors will be German-speaking | — Pending |
| Separate HTML files per language (not JS-based switching) | Better SEO, proper hreflang, each page independently indexable | — Pending |
| No team/staff section | Owner preference — gallery shows food, interior, terrace only | — Pending |
| Mobile-first CSS approach | Majority of restaurant searches happen on mobile | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-06 after initialization*
