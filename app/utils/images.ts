import type {
  ImageCategory,
  ImageFormat,
  ImageVariant,
} from '../config/images';
import {
  IMAGE_CONFIG,
  isValidCategory,
  isValidVariant,
} from '../config/images';

/**
 * Extract the base image name from a full path or filename
 * Removes path, extension, and size/variant suffixes
 * 
 * Examples:
 * - "/images/services/reiki.jpg" -> "reiki"
 * - "reiki-sq-400w.jpg" -> "reiki"
 * - "hero-new-1920w.avif" -> "hero-new"
 */
export function getBaseImageName(imagePath: string): string {
  // Extract filename from path
  const filename = imagePath.split('/').pop() || imagePath;
  
  // Remove extension
  const withoutExt = filename.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  
  // Remove size/variant suffixes (e.g., "-sq-400w", "-h-800w", "-400w")
  const cleaned = withoutExt
    .replace(/-(sq|h)-\d+w$/, '') // Remove variant-size suffix
    .replace(/-\d+w$/, ''); // Remove size-only suffix
  
  return cleaned;
}

/**
 * Generate the filename for an optimized image
 * Format: {baseName}-{variant}-{size}w.{format}
 * 
 * Examples:
 * - baseName: "reiki", variant: "sq", size: 400, format: "avif" -> "reiki-sq-400w.avif"
 * - baseName: "hero-new", variant: null, size: 1920, format: "webp" -> "hero-new-1920w.webp"
 */
export function generateImageFilename(
  baseName: string,
  size: number,
  format: ImageFormat,
  variant: ImageVariant = null
): string {
  const variantPart = variant ? `-${variant}-` : '-';
  return `${baseName}${variantPart}${size}w.${format}`;
}

/**
 * Generate a full image path (now uses on-demand API)
 * @deprecated Use getImageServiceUrl instead for direct API access
 */
export function getImagePath(
  baseName: string,
  category: ImageCategory,
  size: number,
  format: ImageFormat,
  variant: ImageVariant = null
): string {
  // Use on-demand image service API
  return getImageServiceUrl(baseName, category, size, format, variant);
}

/**
 * Generate a srcset string for a specific format using on-demand image API
 * 
 * Example output:
 * "/api/images/services/reiki?w=96&f=avif&v=sq 96w, /api/images/services/reiki?w=192&f=avif&v=sq 192w, ..."
 */
export function getImageSrcSet(
  baseName: string,
  category: ImageCategory,
  format: ImageFormat,
  variant: ImageVariant = null,
  sizes?: number[]
): string {
  const config = IMAGE_CONFIG[category];
  const sizesToUse = sizes || config.sizes;
  
  return sizesToUse
    .map((size) => {
      const url = getImageServiceUrl(baseName, category, size, format, variant);
      return `${url} ${size}w`;
    })
    .join(', ');
}

/**
 * Get the default/fallback image path using on-demand image API (typically the largest JPEG)
 */
export function getDefaultImagePath(
  baseName: string,
  category: ImageCategory,
  variant: ImageVariant = null
): string {
  const config = IMAGE_CONFIG[category];
  const largestSize = config.sizes[config.sizes.length - 1];
  return getImageServiceUrl(baseName, category, largestSize, 'jpeg', variant);
}

/**
 * Parse an image reference (path or base name) and extract information
 * Supports both old format ("/images/services/reiki.jpg") and new format ("reiki")
 */
export function parseImageReference(
  imageRef: string,
  category: ImageCategory
): {
  baseName: string;
  category: ImageCategory;
  variant: ImageVariant;
} {
  // If it's a full path, extract base name
  let baseName = imageRef;
  let variant: ImageVariant = null;
  
  if (imageRef.startsWith('/images/')) {
    baseName = getBaseImageName(imageRef);
    
    // Try to detect variant from path if present
    const variantMatch = imageRef.match(/-(sq|h)-\d+w\./);
    if (variantMatch) {
      variant = variantMatch[1] as ImageVariant;
    }
  } else {
    // Just a base name
    baseName = imageRef.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  }
  
  // Validate variant
  if (variant && !isValidVariant(category, variant)) {
    variant = null;
  }
  
  return { baseName, category, variant };
}

/**
 * Validate image category
 */
export function validateCategory(category: string): asserts category is ImageCategory {
  if (!isValidCategory(category)) {
    throw new Error(
      `Invalid image category: ${category}. Valid categories are: ${Object.keys(IMAGE_CONFIG).join(', ')}`
    );
  }
}

/**
 * Generate an on-demand image service URL
 * Format: /api/images/{category}/{baseName}?w={size}&f={format}&v={variant}
 * 
 * Example:
 * - category: "services", baseName: "reiki", size: 400, format: "webp", variant: "sq"
 * - Returns: "/api/images/services/reiki?w=400&f=webp&v=sq"
 */
export function getImageServiceUrl(
  baseName: string,
  category: ImageCategory,
  size: number,
  format: ImageFormat,
  variant: ImageVariant = null
): string {
  // Sanitize base name to prevent issues
  const sanitizedName = baseName.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  
  const params = new URLSearchParams({
    w: size.toString(),
    f: format,
  });
  
  if (variant) {
    params.set('v', variant);
  }
  
  return `/api/images/${category}/${sanitizedName}?${params.toString()}`;
}

