import type {
  ImageCategory,
  ImageFormat,
  ImageVariant,
} from '../config/images';
import {
  IMAGE_CONFIG,
  getImageCategoryPath,
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
 * Generate a full image path
 */
export function getImagePath(
  baseName: string,
  category: ImageCategory,
  size: number,
  format: ImageFormat,
  variant: ImageVariant = null
): string {
  const filename = generateImageFilename(baseName, size, format, variant);
  const categoryPath = getImageCategoryPath(category);
  return `${categoryPath}/${filename}`;
}

/**
 * Generate a srcset string for a specific format
 * 
 * Example output:
 * "/images/services/reiki-sq-96w.avif 96w, /images/services/reiki-sq-192w.avif 192w, ..."
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
  const categoryPath = getImageCategoryPath(category);
  
  return sizesToUse
    .map((size) => {
      const filename = generateImageFilename(baseName, size, format, variant);
      return `${categoryPath}/${filename} ${size}w`;
    })
    .join(', ');
}

/**
 * Get the default/fallback image path (typically the largest JPEG)
 */
export function getDefaultImagePath(
  baseName: string,
  category: ImageCategory,
  variant: ImageVariant = null
): string {
  const config = IMAGE_CONFIG[category];
  const largestSize = config.sizes[config.sizes.length - 1];
  return getImagePath(baseName, category, largestSize, 'jpeg', variant);
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

