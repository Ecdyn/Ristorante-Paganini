# Ristorante Paganini — Website

## What This Is

A high-end multilingual onepage restaurant website for "Ristorante Paganini" in Leipzig. Static HTML/CSS/vanilla JS — no frameworks, no build step. Three language versions (German, English, Italian) with separate legal pages and root language redirect. Designed to drive table reservations, walk-in traffic, group/event inquiries, and business lunch visibility while conveying authentic Italian warmth and premium quality.

Shipped v1.0 with 4,854 lines of HTML/CSS/JS across 10 pages (3 onepages + 6 legal pages + 1 root redirect), complete SEO infrastructure, and JSON-LD structured data validation tooling.

## Core Value

Visitors instantly trust Ristorante Paganini as an authentic, premium Italian restaurant in Leipzig's city center and can reserve a table within seconds.

## Requirements

### Validated

- ✓ Multilingual onepage site (DE/EN/IT) with 12 anchor sections per language — v1.0
- ✓ Root index.html with intelligent language redirect (default DE, browser detection for EN/IT) — v1.0
- ✓ Separate legal pages per language (Impressum, Datenschutz) — v1.0
- ✓ Hero section with strong headline, trust cues, reservation CTA, menu CTA — v1.0
- ✓ Quick info bar: opening hours, address, phone, reservation CTA, lunch hours, terrace note — v1.0
- ✓ About/Philosophy section: family-run story, authentic Italian identity, quality promise — v1.0
- ✓ Menu overview with HTML preview (pasta, pizza, antipasti, wine) + full menu CTA + PDF download — v1.0
- ✓ Business lunch section: monthly-updatable, 11:30–14:30 hours, PDF link, status/holiday notes — v1.0
- ✓ Gallery: elegant image grid (interior, food, terrace, exterior) — v1.0
- ✓ Reservation section: external tool embed placeholder, fallback CTA, phone option — v1.0
- ✓ Groups/Events section: inquiry CTA, trust-focused copy — v1.0
- ✓ Location section: address, GDPR-safe Google Maps link, parking info — v1.0
- ✓ FAQ section with 7 SEO-relevant questions + FAQPage JSON-LD — v1.0
- ✓ Contact section: phone, email, address, hours, Instagram placeholder — v1.0
- ✓ Footer: legal links, language switcher, contact summary, copyright — v1.0
- ✓ Sticky header with responsive mobile menu — v1.0
- ✓ Smooth anchor navigation — v1.0
- ✓ Semantic HTML5 with accessible markup, single H1 per page, proper alt attributes — v1.0
- ✓ CSS variables for colors, spacing, typography; mobile-first responsive system — v1.0
- ✓ Clean SEO: meta titles, descriptions, OG tags, Twitter cards, canonical, hreflang, robots meta — v1.0
- ✓ JSON-LD structured data: Restaurant, LocalBusiness, PostalAddress, openingHoursSpecification — v1.0
- ✓ sitemap.xml and robots.txt — v1.0
- ✓ Local SEO optimization for German search intent — v1.0
- ✓ Agency-friendly editability with clear HTML comments for all live data placeholders — v1.0
- ✓ Performance: lazy loading, minimal JS, no render-blocking resources, Core Web Vitals oriented — v1.0
- ✓ Premium design: elegant, warm, Italian modern-classic, generous spacing, strong typography — v1.0
- ✓ Self-hosted web fonts (GDPR-compliant, no Google Fonts CDN) — v1.0
- ✓ AVIF/WebP/JPEG picture elements with explicit width/height attributes — v1.0
- ✓ Favicon setup (SVG + ICO + apple-touch-icon + webmanifest) — v1.0
- ✓ JSON-LD validation script (tools/validate.js) — v1.0

### Active

(None — v1.0 shipped. Define next milestone requirements via `/gsd-new-milestone`.)

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
- Google Maps iframe embed — GDPR liability in Germany; static address + link chosen
- Backend form processing — static site constraint; phone + email inquiry approach
- Cookie consent banner — no tracking cookies needed

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
- **Current state:** v1.0 shipped — 4,854 LOC across HTML/CSS/JS, 10 pages, complete SEO infrastructure
- **Tech stack:** HTML5, CSS3 (CUBE CSS methodology), vanilla JS (ES2020+), JSON-LD, self-hosted woff2 fonts

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
| Static HTML/CSS/JS, no frameworks | No build step, maximum simplicity, any developer can maintain | ✓ Good |
| Onepage + legal pages model | Restaurant doesn't need multi-page site; one focused landing page per language converts better | ✓ Good |
| German as primary language / default redirect | Leipzig is in Germany; most visitors will be German-speaking | ✓ Good |
| Separate HTML files per language (not JS-based switching) | Better SEO, proper hreflang, each page independently indexable | ✓ Good |
| No team/staff section | Owner preference — gallery shows food, interior, terrace only | ✓ Good |
| Mobile-first CSS approach | Majority of restaurant searches happen on mobile | ✓ Good |
| Self-hosted fonts, no Google Fonts CDN | DSGVO/GDPR compliance for German audience | ✓ Good |
| No Google Maps iframe | GDPR liability; static address + Maps link chosen | ✓ Good |
| Groups inquiry via phone + email only | No backend needed for static site | ✓ Good |
| PDF filenames kept in German across all languages | File paths, not visible text | ✓ Good |
| Exclude noindex legal pages from sitemap.xml | Google best practice: noindex pages should not appear in sitemap | ✓ Good |

## Pre-Launch Checklist

Before going live, the following must be completed:

1. **Replace placeholder domain** — Find/replace `example.com` with real domain in all HTML files, sitemap.xml, robots.txt
2. **Insert real legal text** — German lawyer must provide Impressum and Datenschutz content
3. **Replace placeholder images** — Professional photography for hero, gallery, food, interior
4. **Set up reservation platform** — Choose TheFork/Resy/OpenTable and embed widget
5. **Configure analytics** — Set up Plausible or GA4 (update cookie consent if needed)
6. **Align Google Business Profile** — Match structured data with GMB listing
7. **Deploy to production host** — Upload static files, configure HTTPS, verify redirects

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via transition workflow):
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
*Last updated: 2026-04-10 after v1.0 milestone*
