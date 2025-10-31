import type { ImageCategory, ImageVariant } from '../config/images';
import { IMAGE_CONFIG, IMAGE_FORMATS } from '../config/images';
import {
  parseImageReference,
  getImageSrcSet,
  getDefaultImagePath,
} from '../utils/images';

export interface ResponsiveImageProps {
  /**
   * Image source - can be:
   * - Base name: "reiki" or "hero-new"
   * - Full path: "/images/services/reiki.jpg"
   */
  src: string;
  /**
   * Image category (hero, services, testimonials, etc.)
   */
  category: ImageCategory;
  /**
   * Image variant (optional)
   * - 'sq' for square (services)
   * - 'h' for horizontal (services, about, qui-suis-je)
   */
  variant?: ImageVariant;
  /**
   * Alt text (required for accessibility)
   */
  alt: string;
  /**
   * Sizes attribute for responsive images
   * Example: "(max-width: 640px) 400px, 150px"
   */
  sizes?: string;
  /**
   * Loading strategy
   */
  loading?: 'lazy' | 'eager';
  /**
   * Fetch priority (for above-the-fold images)
   */
  fetchPriority?: 'high' | 'low' | 'auto';
  /**
   * CSS class names
   */
  className?: string;
  /**
   * Image width (for aspect ratio and performance)
   */
  width?: number;
  /**
   * Image height (for aspect ratio and performance)
   */
  height?: number;
  /**
   * Decoding strategy
   */
  decoding?: 'async' | 'auto' | 'sync';
  /**
   * Object fit CSS property
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /**
   * Custom sizes to use (overrides category default)
   */
  customSizes?: number[];
}

/**
 * ResponsiveImage component
 * 
 * Automatically generates optimized responsive images with format fallback:
 * AVIF (best) → WebP (good) → JPEG (fallback)
 * 
 * Example usage:
 * ```tsx
 * <ResponsiveImage
 *   src="reiki"
 *   category="services"
 *   variant="sq"
 *   alt="Reiki service"
 *   sizes="(max-width: 640px) 400px, 150px"
 * />
 * ```
 */
export default function ResponsiveImage({
  src,
  category,
  variant,
  alt,
  sizes,
  loading = 'lazy',
  fetchPriority,
  className,
  width,
  height,
  decoding = 'async',
  objectFit = 'cover',
  customSizes,
}: ResponsiveImageProps) {
  // Parse the image reference
  const { baseName, category: resolvedCategory, variant: resolvedVariant } =
    parseImageReference(src, category);

  // Use resolved variant or fall back to prop variant
  const finalVariant = resolvedVariant || variant || null;

  // Get image configuration
  const config = IMAGE_CONFIG[resolvedCategory];
  const sizesToUse = customSizes || config.sizes;

  // Generate default/fallback path (largest JPEG)
  const defaultSrc = getDefaultImagePath(baseName, resolvedCategory, finalVariant);

  // Generate srcset for each format
  const srcSets = IMAGE_FORMATS.map((format) => ({
    format,
    type: `image/${format === 'jpeg' ? 'jpeg' : format}`,
    srcSet: getImageSrcSet(baseName, resolvedCategory, format, finalVariant, sizesToUse),
  }));

  // Get default width/height from config if aspect ratio is defined
  let finalWidth = width;
  let finalHeight = height;

  if (config.aspectRatio && !width && !height) {
    // Use the largest size and calculate height from aspect ratio
    const largestSize = sizesToUse[sizesToUse.length - 1];
    finalWidth = largestSize;
    finalHeight = Math.round(
      (largestSize * config.aspectRatio.height) / config.aspectRatio.width
    );
  }

  return (
    <picture>
      {/* AVIF source - best format */}
      <source
        type={srcSets[0].type}
        srcSet={srcSets[0].srcSet}
        sizes={sizes}
      />
      {/* WebP source - good format */}
      <source
        type={srcSets[1].type}
        srcSet={srcSets[1].srcSet}
        sizes={sizes}
      />
      {/* JPEG source - fallback */}
      <source
        type={srcSets[2].type}
        srcSet={srcSets[2].srcSet}
        sizes={sizes}
      />
      {/* Fallback img element */}
      <img
        src={defaultSrc}
        alt={alt}
        className={className}
        width={finalWidth}
        height={finalHeight}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        style={objectFit ? { objectFit } : undefined}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          // Try WebP if JPEG fails
          if (!target.src.includes('.webp')) {
            target.src = target.src.replace('.jpg', '.webp');
          }
        }}
      />
    </picture>
  );
}

