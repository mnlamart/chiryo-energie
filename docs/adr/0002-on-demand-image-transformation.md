# ADR 0002: On-Demand Image Transformation Service

Date: 2025-11-02

## Status
Accepted

## Context
The website previously used a build-time image optimization approach where all image variants (sizes, formats, variants) were pre-generated and stored in `public/images/`. This created several issues:

- **Large repository size**: Thousands of pre-generated image files (AVIF, WebP, JPEG × multiple sizes × variants)
- **Long build times**: Image processing took significant time during deployment
- **Storage overhead**: Generated images consumed storage for all possible combinations
- **Rigid sizing**: Only pre-configured sizes were available; adding new sizes required re-generating all images
- **Maintenance burden**: Changes to image configuration required full regeneration

The site needs responsive images with multiple formats (AVIF, WebP, JPEG) and sizes for different categories (hero, services, testimonials, etc.), with some categories supporting variants (square, horizontal).

## Decision
Implement an on-demand image transformation service that generates images dynamically when requested, with filesystem caching for performance.

### Architecture
1. **API Endpoint**: `/api/images/:category/:imageName` with query parameters:
   - `w` (width): Requested image width
   - `f` (format): Image format (avif, webp, jpeg)
   - `v` (variant): Optional variant (sq, h)

2. **Transformation Service**: 
   - Uses Sharp for image processing
   - Implements content-aware cropping strategies:
     - Hero images: 16:9 aspect ratio with attention-based cropping
     - Square variants: entropy-based cropping
     - Horizontal variants: attention-based cropping
   - Applies quality settings from configuration

3. **Caching Strategy**:
   - First request: Transform and cache to `build/cache/images/`
   - Subsequent requests: Serve from cache via static middleware at `/cache/images/`
   - Cache is immutable (1 year TTL)
   - Human-readable cache paths for debugging

4. **Source Images**:
   - Stored in `assets/images-raw/` organized by category
   - Only source images tracked in git (not generated variants)
   - Supports common formats: `.jpg`, `.jpeg`, `.png`

## Consequences

### Positive
- **Faster builds**: No image processing during build time
- **Smaller repository**: Only source images tracked (~90% reduction in image files)
- **Flexible sizing**: Any size can be requested without pre-generation
- **Dynamic optimization**: Images generated with latest Sharp optimizations
- **Better cache control**: HTTP caching headers on API responses
- **Easier maintenance**: Changes to image config don't require full regeneration

### Negative
- **First request latency**: First request per image variant generates the image (mitigated by caching)
- **Server-side processing**: Requires Sharp runtime dependency (moved from devDependencies)
- **Disk usage**: Cache directory grows as images are requested (automatically cleaned in CI/CD)

### Neutral
- **API dependency**: Components now depend on API endpoint availability (fallback to 404 handled gracefully)
- **Cache management**: Cache directory needs periodic cleanup in production (handled by deployment scripts)

## Alternatives Considered

### 1. Continue with Build-Time Generation
- **Rejected**: Maintained repository bloat and slow builds
- **Reason**: Didn't solve the core problems

### 2. CDN-Based Image Transformation (e.g., Cloudinary, Imgix)
- **Rejected**: Additional cost and vendor lock-in
- **Reason**: Sharp provides excellent performance with no external dependencies

### 3. Hybrid Approach (Pre-generate common sizes, on-demand for others)
- **Rejected**: Added complexity without significant benefit
- **Reason**: Full on-demand approach simpler and more flexible

### 4. Client-Side Image Resizing
- **Rejected**: Poor performance and user experience
- **Reason**: Sending full-size images wastes bandwidth

### 5. Serverless Image Functions (e.g., Vercel Image Optimization)
- **Rejected**: Platform-specific, less control
- **Reason**: Need platform-agnostic solution

## Implementation Notes

### Key Components
- `app/utils/image-service.server.ts`: Core transformation logic
- `app/routes/api.images.$category.$imageName.tsx`: API endpoint
- `app/utils/images.ts`: Helper functions for generating API URLs
- `server.ts`: Static middleware for cached images at `/cache/images/`

### Migration Strategy
- Updated existing utility functions (`getImagePath`, `getImageSrcSet`, `getDefaultImagePath`) to use API
- `ResponsiveImage` component automatically works with new system (no changes needed)
- Removed static serving of `/images/` route
- Added `public/images/` to `.gitignore`

### Performance Optimizations
- Content-aware cropping reduces need for manual cropping
- Filesystem cache allows static serving after first generation
- Cache-Control headers ensure long-term browser caching
- Non-blocking cache writes don't delay response

### Testing
- Comprehensive unit tests for transformation logic
- API route tests for validation and error handling
- Test fixtures ensure consistent test environment

### Future Enhancements
- Consider adding ETag-based cache validation
- Optional CDN integration for edge caching
- Image optimization analytics/metrics
- Automatic cache cleanup policies

