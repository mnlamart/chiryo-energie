# Image System Migration

## Overview

The website has been migrated from pre-generated static images to an on-demand image transformation service. All images are now generated dynamically from source images in `assets/images-raw/`.

## What Changed

### Before
- Images were pre-generated during build time and stored in `public/images/`
- All sizes and formats were generated upfront
- Static serving via Express at `/images/`
- Required running `npm run optimize-images` before deployment

### After
- Images are generated on-demand via API at `/api/images/:category/:imageName`
- Images are cached after first request in `build/cache/images/`
- No pre-generation needed - images are created when requested
- Source images remain in `assets/images-raw/` (git-tracked)

## Migration Details

### Updated Components
- `ResponsiveImage` component automatically uses new API
- All utility functions (`getImagePath`, `getImageSrcSet`, `getDefaultImagePath`) now use API endpoints
- No changes needed to existing component usage

### Removed
- Static image serving from `server.ts` (`/images` route)
- Build-time image optimization script dependency

### New Infrastructure
- On-demand image transformation API
- Filesystem caching at `build/cache/images/`
- Static serving of cached images at `/cache/images/`

## Cache Persistence

**Important**: The image cache is **ephemeral** and does **not persist between deployments**.

- Cache is stored in `build/cache/images/` at runtime
- Each deployment starts with a fresh container, so the cache is cleared
- Images are regenerated on first request after deployment, then cached again
- This is acceptable since images generate quickly and are cached for subsequent requests

If you need persistent cache across deployments:
- Fly.io volumes are configured to persist the cache directory at `/app/build/cache/images`
- Cache persists between deployments once volumes are attached
- Each machine needs its own volume (volumes are zone-pinned)
- On next deployment, volumes will be automatically attached via mount configuration
- Current setup: 1GB volumes per machine (2GB total - within 3GB free allowance)

**Current Setup**: Fly.io volumes are configured to persist image cache between deployments.

## Pre-Generating Images

To improve initial page load performance, you can pre-generate all images after deployment. This warms the cache with all image variants before users visit.

### Running the Pre-Generation Script

```bash
# Local development (server must be running)
npm run pre-generate-images

# Production (after deployment)
API_BASE_URL=https://chiryo-energie.sevend.io npm run pre-generate-images

# Or with custom URL
node scripts/pre-generate-all-images.mjs https://chiryo-energie.sevend.io

# Generate only specific formats
node scripts/pre-generate-all-images.mjs --formats=avif,webp

# Generate only specific categories
node scripts/pre-generate-all-images.mjs --categories=hero,services

# Adjust parallel processing (default: 5)
node scripts/pre-generate-all-images.mjs --parallel=10
```

The script will:
- Scan all source images in `assets/images-raw/`
- Generate all combinations of sizes, formats, and variants
- Process images in parallel for faster generation
- Show which images were generated vs. already cached
- Provide detailed statistics and progress reporting
- Exit with error if any images fail to generate

**Example Output:**
```
🚀 Starting full image pre-generation...
📡 Using API endpoint: http://localhost:3000
📋 Formats: avif, webp, jpeg
⚡ Parallel requests: 5

📁 hero: 4 image(s)
   Sizes: 640, 960, 1280, 1536, 1920, 2304

  📸 hero-new
     ✅ Generated: 15, Cached: 3, Errors: 0
     ⏱️  Avg time: 0.45s, Total size: 1250.3KB

📊 Overall Summary:
   Total images: 523
   Generated: 312
   Cached: 211
   Errors: 0
   Total size: 45230.5KB
   Total time: 245.3s
```

### When to Run

- **Automatic on deploy**: The pre-generation script runs automatically on every deployment via the entrypoint script. Each machine warms its own cache in the background, so no manual action is needed.
- After adding new images (pre-generation will catch them on next deploy)
- After clearing cache volumes (cache will be regenerated on next deploy)
- When updating image configuration (changes take effect on next deploy)

### Automatic Pre-Generation on Deploy

The image pre-generation script runs automatically on every deployment:

1. **Server starts**: The application server starts first
2. **Health check**: Script waits for server to be ready (up to 30 seconds)
3. **Background pre-generation**: Pre-generation runs in the background, warming the cache for that machine's volume
4. **Non-blocking**: Requests are served immediately; pre-generation doesn't block the server

This ensures:
- Each machine's cache is warmed automatically
- No manual intervention needed after deployment
- Images are ready before users visit (depending on generation speed)
- Cache is isolated per machine (each volume is machine-specific)

**Note**: Pre-generation runs in the background and logs to `/tmp/image-pregen.log` on each machine. Check logs if needed via SSH.

## Cleaning Up Old Images

The `public/images/` directory is no longer needed and can be safely removed:

```bash
# Remove old generated images
rm -rf public/images
```

The directory has been added to `.gitignore` so it won't be tracked if recreated.

## Benefits

1. **No Build-Time Generation**: Images are created on first request
2. **Faster Builds**: No need to process images during build
3. **Dynamic Sizing**: Can request any size without pre-generating
4. **Cache Benefits**: Once generated, images are cached and served statically
5. **Smaller Repository**: Source images only, not all variants

## Source Images

Source images must be in `assets/images-raw/` organized by category:
- `assets/images-raw/hero/` - Hero images
- `assets/images-raw/services/` - Service images
- `assets/images-raw/testimonials/` - Testimonial avatars
- `assets/images-raw/about/` - About section images
- `assets/images-raw/logos/` - Logo images
- `assets/images-raw/qui-suis-je/` - Qui suis-je images

Supported formats: `.jpg`, `.jpeg`, `.png`

