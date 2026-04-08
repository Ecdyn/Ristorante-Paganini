# Phase 7: Root Redirect - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-08
**Phase:** 07-Root Redirect
**Areas discussed:** Redirect experience, Edge case handling

---

## Redirect Experience

### Visual during redirect

| Option | Description | Selected |
|--------|-------------|----------|
| Blank page | Pure white page, no visible content. Fastest redirect | |
| Minimal branded flash | Brief restaurant name/logo on styled background, ~100ms before redirect | ✓ |
| Styled loading state | Restaurant branding + 'Redirecting...' text in styled container | |

**User's choice:** Minimal branded flash
**Notes:** None

### Language persistence

| Option | Description | Selected |
|--------|-------------|----------|
| No persistence | Every visit re-detects browser language. No cookies/localStorage | ✓ |
| localStorage preference | Save language choice after first redirect for faster return visits | |

**User's choice:** No persistence
**Notes:** None

---

## Edge Case Handling

### Root URL shareability

| Option | Description | Selected |
|--------|-------------|----------|
| Pure redirect utility | Always redirects immediately based on browser language | ✓ |
| Manual language picker | Show 3-button picker for ambiguous cases or via ?choose param | |

**User's choice:** Pure redirect utility
**Notes:** None

### Bot handling

| Option | Description | Selected |
|--------|-------------|----------|
| noindex + noscript fallback | meta noindex + noscript meta-refresh to /de/ | ✓ |
| Server-side redirect | Not applicable — static site | |

**User's choice:** noindex + noscript fallback
**Notes:** None

---

## Claude's Discretion

- Exact language detection implementation (navigator.language vs navigator.languages iteration)
- Regional variant matching logic (de-AT → /de/, en-US → /en/, etc.)

## Deferred Ideas

None — discussion stayed within phase scope.
