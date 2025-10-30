# ADR 0001: Preloading the LCP hero image with imagesrcset

Date: 2025-10-30

## Status
Accepted

## Context
We serve a responsive hero image using `<picture>` with AVIF → WebP → JPEG fallbacks. Naively preloading a single file (e.g., 1920w WebP) can cause double downloads when the browser later chooses a different candidate (format/size). Chrome supports `<link rel="preload" as="image" imageSrcSet imageSizes>` to preload the correct candidate, but support isn’t universal.

## Decision
- Use progressive enhancement: add a single <link rel="preload" as="image"> tag in <head> using imageSrcSet/imageSizes for AVIF only.
- Do NOT preload WebP or JPEG:
  - Browsers that understand `imageSrcSet` are modern and support AVIF; one preload is sufficient.
  - Adding multiple `<link>`s preloads both formats, wasting bandwidth.
- Keep `<img loading="eager" fetchPriority="high">` for the hero to ensure good LCP across all browsers.

## Consequences
- Chromium-based browsers preload the exact hero candidate without duplicate requests.
- Safari/Firefox (that ignore `imageSrcSet` on `<link>`) won’t preload, but still load the hero eagerly via `<img>`; no double download.
- Simpler and faster path; minimal bytes in the critical chain.

## Alternatives considered
- Preloading WebP and JPEG as well: discarded due to guaranteed duplicate preloads.
- Preloading a single fixed file (e.g., 1920w WebP): discarded due to frequent double downloads.

## Implementation notes
- Preload tags live directly in `<head>` JSX to avoid `LinksFunction` typing limitations.
- Attributes use React DOM camelCase: `imageSrcSet` and `imageSizes`.

