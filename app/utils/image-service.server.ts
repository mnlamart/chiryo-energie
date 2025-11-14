import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import type {
  ImageCategory,
  ImageFormat,
  ImageVariant,
} from '../config/images';
import {
  HERO_TARGET,
  isValidVariant,
} from '../config/images';
import imageConfig from '../config/images.config.json';
import { generateImageFilename } from './images';

/**
 * Transformation parameters for image service
 */
export interface TransformParams {
  category: ImageCategory;
  imageName: string;
  size: number;
  format: ImageFormat;
  variant: ImageVariant;
}

/**
 * Crop strategy for content-aware cropping
 */
type CropStrategy = 'attention' | 'entropy' | 'center';

/**
 * Quality settings for image formats
 */
interface QualitySettings {
  avif: { quality: number; effort: number };
  webp: { quality: number; effort: number };
  jpeg: { quality: number; progressive: boolean; mozjpeg: boolean };
}

/**
 * Get the default crop strategy for a variant/category combination
 */
function getDefaultCropStrategy(
  category: ImageCategory,
  variant: ImageVariant
): CropStrategy {
  // Hero images use attention
  if (category === 'hero') {
    return 'attention';
  }
  
  // Variant-specific strategies
  if (variant === 'sq') {
    return 'entropy';
  }
  if (variant === 'h') {
    return 'attention';
  }
  
  // Default to center for regular images
  return 'center';
}

/**
 * Get the source image path from assets/images-raw/
 * Sanitizes the imageName to prevent directory traversal
 */
function getSourceImagePath(
  category: ImageCategory,
  imageName: string
): string {
  // Sanitize image name to prevent directory traversal
  const sanitizedName = imageName.replace(/[^a-zA-Z0-9._-]/g, '');
  if (!sanitizedName) {
    throw new Error(`Invalid image name: ${imageName}`);
  }
  
  // Remove any existing extension and add common image extensions
  const baseName = sanitizedName.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  
  // Try common extensions in order
  const extensions = ['.jpg', '.jpeg', '.png'];
  for (const ext of extensions) {
    const path = join(process.cwd(), 'assets', 'images-raw', category, `${baseName}${ext}`);
    if (existsSync(path)) {
      return path;
    }
  }
  
  // If not found, return the first possible path for error handling
  return join(process.cwd(), 'assets', 'images-raw', category, `${baseName}.jpg`);
}

/**
 * Get the cache path for a transformed image
 * Format: build/cache/images/{category}/{imageName}-{variant}-{size}w.{format}
 */
function getCachePath(params: TransformParams): string {
  const { category, imageName, size, format, variant } = params;
  
  // Sanitize image name
  const sanitizedName = imageName.replace(/[^a-zA-Z0-9._-]/g, '');
  const baseName = sanitizedName.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  
  // Generate filename using existing utility
  const filename = generateImageFilename(baseName, size, format, variant);
  
  return join(process.cwd(), 'build', 'cache', 'images', category, filename);
}

/**
 * Get cached image if it exists
 */
async function getCachedImage(cachePath: string): Promise<Buffer | null> {
  if (!existsSync(cachePath)) {
    return null;
  }
  
  try {
    return await readFile(cachePath);
  } catch (error) {
    console.error(`Error reading cache file ${cachePath}:`, error);
    return null;
  }
}

/**
 * Cache the transformed image to filesystem
 */
async function cacheImage(cachePath: string, buffer: Buffer): Promise<void> {
  try {
    // Ensure directory exists
    const dir = dirname(cachePath);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
    
    await writeFile(cachePath, buffer);
  } catch (error) {
    // Log but don't throw - caching failures shouldn't block responses
    console.error(`Error caching image to ${cachePath}:`, error);
  }
}

/**
 * Transform hero image with 16:9 aspect ratio using attention-based cropping
 */
async function transformHeroImage(
  image: sharp.Sharp,
  size: number,
  format: ImageFormat,
  qualitySettings: QualitySettings
): Promise<Buffer> {
  const metadata = await image.metadata();
  const targetAspect = HERO_TARGET.width / HERO_TARGET.height;
  const currentAspect = (metadata.width || 1) / (metadata.height || 1);
  
  let processor: sharp.Sharp;
  
  if (Math.abs(currentAspect - targetAspect) < 0.01) {
    // Aspect ratios are very close, just resize
    processor = image.resize(size, null, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  } else {
    // Calculate dimensions for 16:9 crop
    const targetWidth = size;
    const targetHeight = Math.round(size / targetAspect);
    
    // Use attention-based cropping for hero images
    processor = image.resize(targetWidth, targetHeight, {
      fit: 'cover',
      position: 'attention',
    });
  }
  
  // Apply format-specific encoding
  if (format === 'avif') {
    return processor.avif(qualitySettings.avif).toBuffer();
  } else if (format === 'webp') {
    return processor.webp(qualitySettings.webp).toBuffer();
  } else {
    return processor.jpeg(qualitySettings.jpeg).toBuffer();
  }
}

/**
 * Transform image with variant (sq or h)
 */
async function transformVariantImage(
  image: sharp.Sharp,
  variant: ImageVariant,
  size: number,
  format: ImageFormat,
  qualitySettings: QualitySettings,
  cropStrategy?: CropStrategy
): Promise<Buffer> {
  let processor: sharp.Sharp;
  
  if (variant === 'sq') {
    // Square variant: 1:1 aspect ratio
    const strategy = cropStrategy || 'entropy';
    processor = image.resize(size, size, {
      fit: 'cover',
      position: strategy,
    });
  } else if (variant === 'h') {
    // Horizontal variant: 4:3 aspect ratio
    const height = Math.round(size * 3 / 4);
    const strategy = cropStrategy || 'attention';
    processor = image.resize(size, height, {
      fit: 'cover',
      position: strategy,
    });
  } else {
    throw new Error(`Invalid variant for transformation: ${variant}`);
  }
  
  // Apply format-specific encoding
  if (format === 'avif') {
    return processor.avif(qualitySettings.avif).toBuffer();
  } else if (format === 'webp') {
    return processor.webp(qualitySettings.webp).toBuffer();
  } else {
    return processor.jpeg(qualitySettings.jpeg).toBuffer();
  }
}

/**
 * Transform regular image (no variant)
 */
async function transformRegularImage(
  image: sharp.Sharp,
  size: number,
  format: ImageFormat,
  qualitySettings: QualitySettings
): Promise<Buffer> {
  const processor = image.resize(size, null, {
    fit: 'inside',
    withoutEnlargement: true,
  });
  
  // Apply format-specific encoding
  if (format === 'avif') {
    return processor.avif(qualitySettings.avif).toBuffer();
  } else if (format === 'webp') {
    return processor.webp(qualitySettings.webp).toBuffer();
  } else {
    return processor.jpeg(qualitySettings.jpeg).toBuffer();
  }
}

/**
 * Transform an image based on parameters
 */
async function transformImage(
  params: TransformParams,
  cropStrategy?: CropStrategy
): Promise<Buffer> {
  const { category, imageName, size, format, variant } = params;
  
  // Get source image path
  const sourcePath = getSourceImagePath(category, imageName);
  
  // Verify source image exists
  if (!existsSync(sourcePath)) {
    throw new Error(`Source image not found: ${sourcePath}`);
  }
  
  // Load image
  const image = sharp(sourcePath);
  
  // Get quality settings based on category
  const categoryConfig = imageConfig.categoryConfigs[category];
  const qualityPreset = (categoryConfig?.quality || 'default') as 'default' | 'hero';
  const qualitySettings = (imageConfig.qualitySettings[qualityPreset] || imageConfig.qualitySettings.default) as QualitySettings;
  
  // Get default crop strategy if not provided
  const strategy = cropStrategy || getDefaultCropStrategy(category, variant);
  
  // Transform based on category and variant
  if (category === 'hero') {
    return transformHeroImage(image, size, format, qualitySettings);
  } else if (variant) {
    // Validate variant for category
    if (!isValidVariant(category, variant)) {
      throw new Error(`Variant ${variant} is not valid for category ${category}`);
    }
    return transformVariantImage(image, variant, size, format, qualitySettings, strategy);
  } else {
    return transformRegularImage(image, size, format, qualitySettings);
  }
}

/**
 * Get transformed image - checks cache first, generates if needed
 * @param force - If true, bypasses cache completely and regenerates the image
 */
export async function getTransformedImage(
  params: TransformParams,
  cropStrategy?: CropStrategy,
  force: boolean = false
): Promise<Buffer> {
  // When force is true, skip cache check entirely and regenerate
  if (!force) {
    const cachePath = getCachePath(params);
    const cached = await getCachedImage(cachePath);
    if (cached) {
      return cached;
    }
  }
  
  // Generate transformed image (always regenerate when force=true)
  const buffer = await transformImage(params, cropStrategy);
  
  // Cache it (blocking to ensure cache is ready for subsequent requests)
  const cachePath = getCachePath(params);
  await cacheImage(cachePath, buffer);
  
  return buffer;
}

