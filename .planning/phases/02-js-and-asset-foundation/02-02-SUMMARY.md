---
phase: 02-js-and-asset-foundation
plan: "02"
subsystem: assets
tags: [favicon, placeholder-images, webmanifest, svg, static-assets]
dependency_graph:
  requires: []
  provides:
    - assets/favicon.svg
    - assets/favicon.ico
    - assets/apple-touch-icon.png
    - assets/site.webmanifest
    - assets/img/hero-desktop.svg
    - assets/img/hero-mobile.svg
    - assets/img/gallery-01.svg
    - assets/img/gallery-02.svg
    - assets/img/gallery-03.svg
    - assets/img/gallery-04.svg
    - assets/img/gallery-05.svg
    - assets/img/gallery-06.svg
    - assets/img/about-bg.svg
    - assets/img/og-image.svg
  affects:
    - Phase 3 HTML pages (all favicon link tags resolve)
    - Phase 4+ content pages (all image src paths resolve)
tech_stack:
  added: []
  patterns:
    - SVG placeholder images with design token colors (#F5EDEE, #DFD0D2, #6B5557)
    - Minimal ICO with embedded PNG payload generated via Node.js
    - Minimal PNG generated programmatically via Node.js (no external tools)
    - Evil Martians 4-tag favicon approach (svg + ico + apple-touch-icon + webmanifest)
key_files:
  created:
    - assets/favicon.svg
    - assets/favicon.ico
    - assets/apple-touch-icon.png
    - assets/site.webmanifest
    - assets/img/hero-desktop.svg
    - assets/img/hero-mobile.svg
    - assets/img/gallery-01.svg
    - assets/img/gallery-02.svg
    - assets/img/gallery-03.svg
    - assets/img/gallery-04.svg
    - assets/img/gallery-05.svg
    - assets/img/gallery-06.svg
    - assets/img/about-bg.svg
    - assets/img/og-image.svg
  modified: []
decisions:
  - "ICO and PNG generated programmatically via Node.js since ImageMagick was not available in this environment; files are valid binary formats"
  - "apple-touch-icon.png uses solid cream (#FBF5F5) background only — no P monogram rendered since no font rendering tool available; adequate for browser tab icon, real icon should be regenerated with ImageMagick or Squoosh before launch"
  - "ICO uses PNG-in-ICO container format (supported by all modern browsers including IE 9+)"
metrics:
  duration: "~8 minutes"
  completed: "2026-04-07T20:20:33Z"
  tasks_completed: 2
  files_created: 14
---

# Phase 2 Plan 02: Favicon Set and SVG Placeholder Images Summary

SVG placeholder images (10 files) and favicon set (4 files) created with correct dimensions, design tokens, and naming conventions — all image paths referenced by Phase 3 HTML will resolve to real files.

## What Was Built

### Task 1: SVG Placeholder Images (assets/img/)

10 self-contained SVG placeholder images covering all content sections:

| File | Dimensions | Section |
|------|-----------|---------|
| hero-desktop.svg | 1400x800 | Hero desktop |
| hero-mobile.svg | 768x500 | Hero mobile |
| gallery-01.svg | 800x600 | Gallery — Interior |
| gallery-02.svg | 800x600 | Gallery — Food |
| gallery-03.svg | 800x600 | Gallery — Terrace |
| gallery-04.svg | 800x600 | Gallery — Exterior |
| gallery-05.svg | 800x600 | Gallery — Ambiance |
| gallery-06.svg | 800x600 | Gallery — Wine |
| about-bg.svg | 1200x600 | About background |
| og-image.svg | 1200x630 | OG social image |

Design token colors applied per spec:
- Background fill: `#F5EDEE` (--color-surface-alt)
- Border stroke: `#DFD0D2` (--color-border) with dashed pattern
- Text labels: `#6B5557` (--color-text-muted)

Each file includes: descriptive section label with dimensions, "PLACEHOLDER: Replace with real photography before launch" notice, zero external dependencies.

### Task 2: Favicon Set (assets/)

- **favicon.svg**: Wine P monogram (#7A2D3A) on cream (#FBF5F5), Georgia serif, rx=4 rounded corners, 32x32 viewBox
- **favicon.ico**: 32x32 ICO with embedded PNG payload (cream background)
- **apple-touch-icon.png**: 180x180 PNG with cream background (#FBF5F5)
- **site.webmanifest**: Valid JSON, theme_color and background_color #7A2D3A, display browser

### HTML Head Link Tags for Phase 3

Phase 3 must include these four tags in the `<head>` of every language page (note `../assets/` relative path from language subdirectories):

```html
<!-- Favicon set — SEO-09 -->
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
<link rel="icon" href="../assets/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="../assets/apple-touch-icon.png">
<link rel="manifest" href="../assets/site.webmanifest">
```

## Deviations from Plan

### Auto-fixed Issues

None.

### Tool Availability Deviation

**Found during:** Task 2 (favicon.ico and apple-touch-icon.png generation)

**Issue:** Plan offered ImageMagick as primary tool for PNG/ICO generation. ImageMagick was not available in this environment. The Windows `convert` command is the Windows file conversion tool, not ImageMagick.

**Fix:** Generated minimal valid PNG and ICO files programmatically using Node.js built-in modules (`zlib` for deflate compression, `Buffer` for binary construction). Both formats comply with their respective specifications.

**Files modified:** assets/favicon.ico, assets/apple-touch-icon.png

**Note:** The apple-touch-icon.png and favicon.ico are valid binary files with correct dimensions but contain only the cream background color without the P monogram rendered as text (no font rendering available without a graphics tool). The SVG favicon.svg provides the full P monogram for modern browsers. Before launch, regenerate favicon.ico and apple-touch-icon.png using ImageMagick or Squoosh.app to include the P monogram.

## Known Stubs

- **assets/apple-touch-icon.png**: Cream background only (#FBF5F5), no P monogram rendered. Valid 180x180 PNG. Replace with proper monogram version before launch using ImageMagick or equivalent.
- **assets/favicon.ico**: Cream background only, no P monogram. Valid 32x32 ICO. Replace before launch. The SVG favicon handles modern browsers; ICO is the fallback for legacy.

These stubs do NOT prevent the plan's goal: all file paths referenced by Phase 3 HTML will resolve to real, valid files. The visual quality of the raster favicons is a post-launch improvement.

## Threat Surface Scan

No new security-relevant surface introduced. All files are static, self-contained assets with no executable code, no scripts, no event handlers, no external network references.

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | 0347ba6 | feat(02-02): create SVG placeholder images in assets/img/ |
| Task 2 | 4470ddb | feat(02-02): create favicon set and site.webmanifest |

## Self-Check

All 14 asset files confirmed present. Both task commits (0347ba6, 4470ddb) confirmed in git log.

## Self-Check: PASSED
