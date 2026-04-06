# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-06)

**Core value:** Visitors instantly trust Ristorante Paganini as an authentic, premium Italian restaurant in Leipzig's city center and can reserve a table within seconds.
**Current focus:** Phase 1 — CSS Design System

## Current Position

Phase: 1 of 8 (CSS Design System)
Plan: 0 of TBD in current phase
Status: Ready to plan
Last activity: 2026-04-06 — Roadmap created, project initialized

Progress: [░░░░░░░░░░] 0%

## Performance Metrics

**Velocity:**
- Total plans completed: 0
- Average duration: —
- Total execution time: 0 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| - | - | - | - |

**Recent Trend:**
- Last 5 plans: none yet
- Trend: —

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Init: Build DE first, then translate to EN/IT — CSS tokens must be locked before any translation begins
- Init: Self-hosted woff2 fonts only — no Google Fonts CDN (GDPR requirement for German audience)
- Init: No Google Maps iframe — static address + link only (GDPR decision, documented in Datenschutz)
- Init: Groups inquiry is phone + email only — no form, no backend
- Init: Hero image must NOT be lazy loaded — fetchpriority="high" required for LCP
- Init: hreflang must be reciprocal on all pages — build into skeleton from Phase 3, complete all three files simultaneously in Phase 5
- Init: Root redirect is last thing built — only after all language dirs exist (Phase 7)

### Pending Todos

None yet.

### Blockers/Concerns

- Reservation platform undecided (TheFork / Resy / OpenTable) — Phase 4 must build placeholder + phone fallback that works standalone; widget embed is v2
- Real photography does not exist yet — all image references will use placeholder paths; professional photography handoff is a post-launch task
- Legal text requires a German lawyer before launch — placeholder content only, clearly marked

## Session Continuity

Last session: 2026-04-06
Stopped at: Roadmap created, STATE.md initialized — ready to plan Phase 1
Resume file: None
