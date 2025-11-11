# Image System Recreation Guide

This document provides a complete guide to recreating the on-demand image transformation system used in this application. The system generates optimized images (AVIF, WebP, JPEG) dynamically with content-aware cropping and filesystem caching.

## Overview

The image system provides:

- On-demand image transformation (no build-time generation)
- Multiple format support (AVIF, WebP, JPEG)
- Content-aware cropping (attention-based, entropy-based)
- Responsive image sizes per category
- Image variants (square, horizontal)
- Filesystem caching with static serving
- Type-safe configuration

## Architecture

### Components

1. **Source Images Storage**: `assets/images-raw/{category}/`
2. **API Endpoint**: `/api/images/:category/:imageName`
3. **Image Service**: Server-side transformation using Sharp
4. **Cache Layer**: Filesystem cache at `build/cache/images/`
5. **Static Serving**: Express middleware serves cached images
6. **React Component**: `ResponsiveImage` for easy usage
7. **Configuration**: JSON-based config with TypeScript types

## Step-by-Step Implementation

### 1. Install Dependencies

```bash
npm install sharp express compression
npm install -D @types/express @types/compression
```

### 2. Create Image Configuration

Create `app/config/images.config.json`:

```json
{
  "sizes": {
    "hero": [640, 960, 1280, 1536, 1920, 2304],
    "services": [96, 128, 192, 200, 256, 300, 400, 500, 600, 800, 1200],
    "testimonials": [56, 112, 150],
    "about": [400, 600, 800, 1000],
    "logos": [94, 100, 150, 188, 200, 300, 400, 800],
    "qui-suis-je": [400, 600, 800, 1000]
  },
  "variants": {
    "services": ["sq", "h"],
    "about": ["h"],
    "qui-suis-je": ["h"]
  },
  "heroTarget": {
    "width": 1920,
    "height": 1080
  },
  "qualitySettings": {
    "default": {
      "avif": { "quality": 55, "effort": 4 },
      "webp": { "quality": 70, "effort": 6 },
      "jpeg": { "quality": 75, "progressive": true, "mozjpeg": true }
    },
    "hero": {
      "avif": { "quality": 45, "effort": 4 },
      "webp": { "quality": 60, "effort": 6 },
      "jpeg": { "quality": 70, "progressive": true, "mozjpeg": true }
    }
  },
  "variantConfigs": {
    "sq": {
      "type": "square",
      "aspectRatio": "1:1"
    },
    "h": {
      "type": "horizontal",
      "aspectRatio": "4:3"
    }
  },
  "categoryConfigs": {
    "hero": {
      "variants": null,
      "quality": "hero",
      "needsCrop": true,
      "generateBaseVariant": false
    },
    "services": {
      "variants": ["sq", "h"],
      "quality": "default",
      "needsCrop": false,
      "generateBaseVariant": false
    },
    "testimonials": {
      "variants": null,
      "quality": "default",
      "needsCrop": false,
      "generateBaseVariant": false
    },
    "about": {
      "variants": ["h"],
      "quality": "default",
      "needsCrop": false,
      "generateBaseVariant": true
    },
    "logos": {
      "variants": null,
      "quality": "default",
      "needsCrop": false,
      "generateBaseVariant": false
    },
    "qui-suis-je": {
      "variants": ["h"],
      "quality": "default",
      "needsCrop": false,
      "generateBaseVariant": true
    }
  }
}
```

### 3. Create TypeScript Configuration Types

Create `app/config/images.ts` with type definitions and exports from the JSON config.

Key types:

- `ImageCategory`: Union type of all categories
- `ImageVariant`: 'sq' | 'h' | null
- `ImageFormat`: 'avif' | 'webp' | 'jpeg'
- Export constants: `IMAGE_SIZES`, `IMAGE_VARIANTS`, `IMAGE_FORMATS`, `HERO_TARGET`

### 4. Implement Image Service

Create `app/utils/image-service.server.ts` with:

- `TransformParams` interface
- `getSourceImagePath()`: Resolves source image path from category/imageName
- `getCachePath()`: Generates cache path for transformed image
- `getCachedImage()`: Reads from cache if exists
- `cacheImage()`: Writes transformed image to cache
- `transformHeroImage()`: 16:9 aspect ratio with attention cropping
- `transformVariantImage()`: Square (1:1) or horizontal (4:3) variants
- `transformRegularImage()`: Standard resize with aspect ratio preservation
- `transformImage()`: Main transformation function
- `getTransformedImage()`: Public API - checks cache, transforms if needed

### 5. Create API Route

Create `app/routes/api.images.$category.$imageName.tsx`:

- Validates category, imageName, width (w), format (f), variant (v)
- Calls `getTransformedImage()`
- Returns Response with proper Content-Type and Cache-Control headers
- Handles errors (404, 400, 500)

### 6. Create Utility Functions

Create `app/utils/images.ts` with:

- `generateImageFilename()`: Creates cache filename
- `getImageServiceUrl()`: Generates API URL with query params
- `getImageSrcSet()`: Generates srcset string for a format
- `getDefaultImagePath()`: Gets fallback JPEG path
- `parseImageReference()`: Extracts baseName/category/variant from path
- `validateCategory()`: Type guard for categories

### 7. Create ResponsiveImage Component

Create `app/components/ResponsiveImage.tsx`:

- Accepts: src, category, variant, alt, sizes, loading, etc.
- Generates `<picture>` element with AVIF, WebP, JPEG sources
- Uses `getImageSrcSet()` for each format
- Provides fallback `<img>` with JPEG

### 8. Configure Server Static Serving

In `server.ts`, add Express middleware:

- Serve `/cache/images` from `build/cache/images/` with long-term cache headers
- Ensure `build/cache/images/` directory exists

### 9. Organize Source Images

Create directory structure:

```
assets/images-raw/
  hero/
    hero-new.jpg
  services/
    reiki.jpg
  testimonials/
    avatar-john.jpg
  ...
```

## Key Implementation Details

### Content-Aware Cropping

- **Hero images**: 16:9 aspect ratio, `position: 'attention'`
- **Square variants (sq)**: 1:1 aspect ratio, `position: 'entropy'`
- **Horizontal variants (h)**: 4:3 aspect ratio, `position: 'attention'`
- **Regular images**: `fit: 'inside'`, preserve aspect ratio

### Caching Strategy

- Cache path format: `build/cache/images/{category}/{imageName}-{variant}-{size}w.{format}`
- Cache is checked before transformation
- Cache is written after transformation (blocking to ensure ready for next request)
- Static middleware serves cached images at `/cache/images/`
- Cache-Control: `public, max-age=31536000, immutable`

### Security

- Image names are sanitized to prevent directory traversal
- Category validation before processing
- Size validation against allowed sizes for category
- Variant validation against allowed variants for category

### Error Handling

- 400: Invalid parameters (category, size, format, variant)
- 404: Source image not found
- 500: Transformation errors (logged to console)

## Warm-Up Scripts

### Overview

To improve initial page load performance after deployment, the system includes warm-up scripts that pre-generate all images before users visit. This ensures the cache is populated and images are ready immediately.

### Pre-Generation Script

**File**: `scripts/pre-generate-all-images.mjs`

This script:

- Scans all source images in `assets/images-raw/`
- Generates all combinations of sizes, formats, and variants based on config
- Makes HTTP requests to the image API endpoint to trigger generation
- Processes images in parallel batches (default: 5 concurrent)
- Provides detailed progress reporting and statistics
- Includes retry logic for failed/timeout requests
- Detects cached vs. newly generated images (response time < 0.5s = cached)

### Usage

#### Local Development

```bash
# Server must be running first
npm run pre-generate-images

# Or directly
node scripts/pre-generate-all-images.mjs
```

#### Production (Manual)

```bash
# After deployment, from local machine
API_BASE_URL=https://your-app.com node scripts/pre-generate-all-images.mjs

# Or pass URL as argument
node scripts/pre-generate-all-images.mjs https://your-app.com
```

#### Options

```bash
# Generate only specific formats
node scripts/pre-generate-all-images.mjs --formats=avif,webp

# Generate only specific categories
node scripts/pre-generate-all-images.mjs --categories=hero,services

# Generate only specific sizes
node scripts/pre-generate-all-images.mjs --sizes=640,960,1280

# Generate single image
node scripts/pre-generate-all-images.mjs --image=hero:hero-new

# Adjust parallel processing (default: 5)
node scripts/pre-generate-all-images.mjs --parallel=10
```

### Automatic Pre-Generation on Deploy

**File**: `scripts/entrypoint.sh`

The entrypoint script automatically runs pre-generation on every deployment:

1. **Starts server in background**: Server begins accepting requests immediately
2. **Waits for health check**: Script waits up to 30 seconds for server to be ready
3. **Runs pre-generation in background**: Non-blocking, doesn't delay server startup
4. **Logs to file**: Output written to `/tmp/image-pregen.log` on each machine

This ensures:

- Each machine's cache is warmed automatically
- No manual intervention needed
- Images are ready before users visit (depending on generation speed)
- Cache is isolated per machine (each persistent volume is machine-specific)

### Integration with Docker/Deployment

#### Dockerfile Setup

```dockerfile
# Copy scripts and config for pre-generation
COPY --from=builder --chown=nodejs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nodejs:nodejs /app/app/config ./app/config

# Make entrypoint script executable
RUN chmod +x /app/scripts/entrypoint.sh

ENTRYPOINT ["/app/scripts/entrypoint.sh"]
```

#### Entrypoint Script (entrypoint.sh)

```bash
#!/bin/bash
# Start server in background
npx tsx server.ts &
SERVER_PID=$!

# Wait for server to be ready (check /health endpoint)
for i in {1..30}; do
  if curl -f http://localhost:3000/health 2>/dev/null; then
    SERVER_READY=true
    break
  fi
  sleep 1
done

# Run pre-generation in background (non-blocking)
node /app/scripts/pre-generate-all-images.mjs http://localhost:3000 \
  > /tmp/image-pregen.log 2>&1 &
PREGEN_PID=$!

# Wait for server process (main process)
wait $SERVER_PID
```

### Script Features

#### Retry Logic

- Automatic retry on timeout (120s timeout, up to 3 retries)
- Retries on server errors (502, 503, 504, 524)
- Exponential backoff between retries
- Failed tasks are retried in a second pass

#### Smart Batching

- Processes images in parallel batches to avoid overwhelming server
- Sorts tasks by size (smaller first, faster generation)
- Delays between batches (500ms) to prevent server overload
- Longer delays (1s) for retry batches

#### Progress Reporting

Shows detailed progress:

- ✅ = Cached (already exists)
- ✨ = Generated (newly created)
- ❌ = Error
- Progress per image: size, format, variant, status, duration, file size
- Summary statistics: total, generated, cached, errors, total size, average time

#### Example Output

```
🚀 Starting image pre-generation...
📡 Using API endpoint: http://localhost:3000
📋 Formats: avif, webp, jpeg
⚡ Parallel requests: 5

📁 hero: 4 image(s)
   Sizes: 640, 960, 1280, 1536, 1920, 2304

  📸 hero-new
     ✨ 640w avif (generated, 0.45s, 25.3KB)
     ✅ 640w webp (cached, 0.12s, 32.1KB)
     ✅ 640w jpeg (cached, 0.10s, 45.2KB)
     ...
     ✅ Generated: 12, Cached: 3, Errors: 0
     ⏱️  Avg time: 0.45s, Total size: 1250.3KB

📊 Overall Summary:
   Total images: 523
   Generated: 312
   Cached: 211
   Errors: 0
   Total size: 45230.5KB
   Total time: 245.3s
```

### Persistent Volumes Integration

With persistent volumes (Fly.io example):

- Each machine has its own volume mounted at `/app/build/cache/images`
- Pre-generation runs on each machine during deployment
- Each machine warms its own cache
- Cache persists between deployments (within same machine)
- When new machines are added, they run pre-generation on first start

### When to Run Manually

- After adding new images to `assets/images-raw/`
- After clearing cache volumes
- After updating image configuration (sizes, variants, quality settings)
- To warm cache on new machines added to cluster

### Performance Considerations

- Pre-generation is CPU-intensive (Sharp processing)
- Runs in background, doesn't block server requests
- Consider scaling up temporarily during initial cache warming
- First-time generation slower; subsequent runs mostly hit cache
- Parallel processing balances speed vs. server load

### Error Handling

- Script exits with code 1 if any images fail to generate
- Failed images logged with error messages
- Can use `--image=category:name` to retry specific images
- Check logs at `/tmp/image-pregen.log` in production

## Deployment Considerations

### Filesystem Cache

- Cache is ephemeral by default (cleared on deployment)
- For persistent cache: use persistent volumes (Fly.io example in fly.toml)
- Cache directory grows over time (consider cleanup scripts)
- With warm-up scripts, cache is automatically populated on deploy

### Performance

- First request generates image (latency)
- Subsequent requests served from cache (fast)
- Sharp is performant but CPU-intensive
- Warm-up scripts eliminate first-request latency
- Consider scaling during initial cache warming

### Environment

- Ensure Sharp native dependencies are available
- May need to install system libraries (libvips on Linux)
- Entrypoint script requires curl for health checks

## Usage Examples

### Using ResponsiveImage Component

```tsx
<ResponsiveImage
  src="reiki"
  category="services"
  variant="sq"
  alt="Reiki service"
  sizes="(max-width: 640px) 400px, 150px"
  loading="lazy"
/>
```

### Direct API Usage

```tsx
const imageUrl = getImageServiceUrl(
  'reiki',
  'services',
  400,
  'webp',
  'sq'
);
// Returns: "/api/images/services/reiki?w=400&f=webp&v=sq"
```

### Generating SrcSet

```tsx
const srcSet = getImageSrcSet(
  'reiki',
  'services',
  'avif',
  'sq'
);
// Returns: "/api/images/services/reiki?w=96&f=avif&v=sq 96w, ..."
```

## Testing

- Unit tests for transformation logic
- API route tests for validation
- Component tests for ResponsiveImage
- Test fixtures for consistent testing

## Files to Create/Modify

1. `app/config/images.config.json` - Configuration
2. `app/config/images.ts` - TypeScript types
3. `app/utils/image-service.server.ts` - Core service
4. `app/routes/api.images.$category.$imageName.tsx` - API endpoint
5. `app/utils/images.ts` - Utility functions
6. `app/components/ResponsiveImage.tsx` - React component
7. `server.ts` - Add static middleware for cache
8. `assets/images-raw/` - Source images directory

## Customization Points

- **Categories**: Add/remove categories in config
- **Sizes**: Adjust sizes per category
- **Variants**: Enable/disable variants per category
- **Quality**: Tune quality settings per preset
- **Cropping**: Adjust crop strategies per variant/category
- **Formats**: Add/remove supported formats

## Additional Resources

- Sharp documentation: https://sharp.pixelplumbing.com/
- Responsive images guide: https://web.dev/fast/#optimize-your-images
- Content-aware cropping: https://sharp.pixelplumbing.com/api-resize#resize


