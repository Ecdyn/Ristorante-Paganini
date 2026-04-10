---
phase: 07-root-redirect
plan: 01
subsystem: routing
tags: [redirect, language-detection, vanilla-js, html, seo, noindex]
dependency_graph:
  requires: [de/index.html, en/index.html, it/index.html]
  provides: [index.html]
  affects: []
tech_stack:
  added: []
  patterns: [navigator.languages iteration, window.location.replace, noscript meta refresh, inline CSS branded flash]
key_files:
  created: [index.html]
  modified: []
decisions:
  - "Use navigator.languages array iteration (not just navigator.language) for better multilingual user coverage"
  - "Use window.location.replace() exclusively to prevent back-button loops"
  - "Place noscript meta refresh inside head (not body) for correct meta refresh behavior across all browsers and crawlers"
  - "Inline CSS only — no external stylesheet link avoids blocking HTTP request on a sub-100ms redirect page"
  - "Georgia serif fallback sufficient for branded flash — no @font-face needed on a page that exits before fonts load"
metrics:
  duration: "~10 minutes"
  completed: "2026-04-08"
  tasks_completed: 1
  tasks_total: 1
  files_changed: 1
---

# Phase 7 Plan 1: Root Language-Detection Redirect Summary

## One-liner

Root `index.html` redirect utility using `navigator.languages` array iteration with `window.location.replace()`, noscript meta refresh fallback, noindex robots meta, and inline CSS branded flash — zero external dependencies.

## What Was Built

A single `index.html` file at the project root that serves as a language-detection redirect gateway. The file:

- Detects the visitor's browser language preference by iterating `navigator.languages` (the full ordered preference array, not just `navigator.language`)
- Matches each preference entry against three supported prefixes (`de`, `en`, `it`) using `split('-')[0]` for regional variant handling (e.g., `de-AT` → `/de/`, `en-US` → `/en/`, `it-CH` → `/it/`)
- Redirects to the first match via `window.location.replace()`, which replaces the history entry so the back button skips the redirect page
- Falls back to `/de/` if no supported language is found
- Provides a `<noscript><meta http-equiv="refresh" content="0;url=/de/"></noscript>` inside `<head>` for JS-disabled browsers and crawlers
- Shows a brief branded flash (`Ristorante Paganini` text, white on dark background) using inline CSS — no external stylesheet, no fonts loaded
- Carries `<meta name="robots" content="noindex, nofollow">` to keep the redirect utility page out of search indexes
- Uses `assets/` prefix (not `../assets/`) for all favicon links, correct for a file at project root

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| `navigator.languages` array iteration | Covers multilingual users: a French user with German as secondary preference lands on `/de/` rather than the unrecognized fallback |
| `window.location.replace()` | Native API purpose-built for redirect pages — removes the redirect page from session history; prevents back-button loop |
| `<noscript>` in `<head>` | Meta refresh elements are head elements; placing in `<body>` can render as visible text in some browser/bot implementations |
| Inline CSS only | The page exits in ~100ms — a blocking `<link rel="stylesheet">` request for `main.css` adds latency with zero benefit |
| No `@font-face` inline | Georgia serif fallback is adequate for the brief flash; self-hosted fonts declared in `main.css` are not available without loading it |
| `aria-hidden="true"` on flash div | The branded flash is purely decorative and transitional — screen readers should not announce it |

## Deviations from Plan

None — plan executed exactly as written.

## Threat Model Coverage

All mitigations from the plan's threat register were implemented:

| Threat ID | Mitigation Applied |
|-----------|--------------------|
| T-07-01 | Redirect targets are hardcoded literals (`/de/`, `/en/`, `/it/`) — `navigator.languages` values only select among these three; no user-controlled input can influence the destination |
| T-07-02 | `<meta name="robots" content="noindex, nofollow">` present; noscript meta refresh sends bots to `/de/` |
| T-07-03 | `window.location.replace()` used exclusively — removes redirect page from session history, preventing back-button loop |

## Known Stubs

None — this file contains no placeholder data. The redirect targets are hardcoded correct paths.

## Threat Flags

None — no new security surface introduced beyond what was planned.

## Self-Check: PASSED

- `index.html` exists at worktree root: FOUND
- Commit `4e8dd4b` exists: FOUND (feat(07-01): create root index.html with language detection redirect)
- All acceptance criteria verified by grep checks — all passed
