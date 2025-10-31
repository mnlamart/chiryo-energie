/**
 * Centralized image configuration
 * 
 * This configuration is synced from images.config.json
 * Both TypeScript and Node.js scripts import from the same JSON file.
 */

import imageConfig from './images.config.json';

export type ImageCategory = 'hero' | 'services' | 'testimonials' | 'about' | 'logos' | 'qui-suis-je';

export type ImageVariant = 'sq' | 'h' | null;

export type ImageFormat = 'avif' | 'webp' | 'jpeg';

export interface ImageCategoryConfig {
  sizes: number[];
  variants?: ImageVariant[];
  formats: ImageFormat[];
  aspectRatio?: { width: number; height: number };
}

/**
 * Image size configurations by category
 * Synced from images.config.json
 */
export const IMAGE_SIZES: Record<ImageCategory, number[]> = imageConfig.sizes as Record<ImageCategory, number[]>;

/**
 * Image variants available per category
 * - 'sq': square variant (used for services)
 * - 'h': horizontal variant (used for services, about, qui-suis-je)
 * Synced from images.config.json
 */
export const IMAGE_VARIANTS: Partial<Record<ImageCategory, ImageVariant[]>> = 
  imageConfig.variants as Partial<Record<ImageCategory, ImageVariant[]>>;

/**
 * All image categories use the same formats
 */
export const IMAGE_FORMATS: ImageFormat[] = ['avif', 'webp', 'jpeg'];

/**
 * Hero image special handling - 16:9 aspect ratio
 * Synced from images.config.json
 */
export const HERO_TARGET = imageConfig.heroTarget;

/**
 * Complete image configuration per category
 * Built from the shared JSON config
 */
export const IMAGE_CONFIG: Record<ImageCategory, ImageCategoryConfig> = {
  hero: {
    sizes: IMAGE_SIZES.hero,
    formats: IMAGE_FORMATS,
    aspectRatio: HERO_TARGET,
  },
  services: {
    sizes: IMAGE_SIZES.services,
    variants: IMAGE_VARIANTS.services,
    formats: IMAGE_FORMATS,
  },
  testimonials: {
    sizes: IMAGE_SIZES.testimonials,
    formats: IMAGE_FORMATS,
  },
  about: {
    sizes: IMAGE_SIZES.about,
    variants: IMAGE_VARIANTS.about,
    formats: IMAGE_FORMATS,
  },
  logos: {
    sizes: IMAGE_SIZES.logos,
    formats: IMAGE_FORMATS,
  },
  'qui-suis-je': {
    sizes: IMAGE_SIZES['qui-suis-je'],
    variants: IMAGE_VARIANTS['qui-suis-je'],
    formats: IMAGE_FORMATS,
  },
};

/**
 * Default image directory structure
 */
export const IMAGE_BASE_PATH = '/images';

/**
 * Get the directory path for an image category
 */
export function getImageCategoryPath(category: ImageCategory): string {
  return `${IMAGE_BASE_PATH}/${category}`;
}

/**
 * Validate that a category exists
 */
export function isValidCategory(category: string): category is ImageCategory {
  return category in IMAGE_CONFIG;
}

/**
 * Validate that a variant is supported for a category
 */
export function isValidVariant(
  category: ImageCategory,
  variant: ImageVariant
): boolean {
  const config = IMAGE_CONFIG[category];
  if (!config.variants) {
    return variant === null;
  }
  return config.variants.includes(variant);
}

