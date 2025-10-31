/**
 * Shared image configuration for optimization scripts
 * 
 * This configuration is synced from app/config/images.config.json
 * Both TypeScript and Node.js scripts import from the same JSON file.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the shared JSON configuration
const configPath = join(__dirname, '../app/config/images.config.json');
const imageConfig = JSON.parse(readFileSync(configPath, 'utf-8'));

export const IMAGE_SIZES = imageConfig.sizes;
export const IMAGE_VARIANTS = imageConfig.variants;
export const HERO_TARGET = imageConfig.heroTarget;
export const QUALITY_SETTINGS = imageConfig.qualitySettings;

/**
 * Image variants configuration with resize functions
 */
export const VARIANT_CONFIGS = {
  sq: {
    type: imageConfig.variantConfigs.sq.type,
    resize: (size) => ({ width: size, height: size, fit: 'cover', position: 'entropy' }),
  },
  h: {
    type: imageConfig.variantConfigs.h.type,
    resize: (size) => {
      const height = Math.round(size * 3 / 4); // 4:3 aspect ratio
      return { width: size, height, fit: 'cover', position: 'attention' };
    },
  },
};

/**
 * Category-specific processing configurations
 * Built from the shared JSON config
 */
export const CATEGORY_CONFIGS = {};

for (const [category, config] of Object.entries(imageConfig.categoryConfigs)) {
  CATEGORY_CONFIGS[category] = {
    sizes: IMAGE_SIZES[category],
    variants: config.variants,
    aspectRatio: category === 'hero' ? HERO_TARGET : undefined,
    quality: config.quality,
    needsCrop: config.needsCrop || false,
    generateBaseVariant: config.generateBaseVariant || false,
  };
}

/**
 * Get configuration for a category
 */
export function getCategoryConfig(category) {
  const config = CATEGORY_CONFIGS[category];
  if (!config) {
    throw new Error(`Unknown category: ${category}. Valid categories: ${Object.keys(CATEGORY_CONFIGS).join(', ')}`);
  }
  return config;
}

/**
 * Get all supported categories
 */
export function getSupportedCategories() {
  return Object.keys(CATEGORY_CONFIGS);
}

