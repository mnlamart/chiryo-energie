#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';
import {
  IMAGE_SIZES,
  HERO_TARGET,
  QUALITY_SETTINGS,
  VARIANT_CONFIGS,
  getCategoryConfig,
  getSupportedCategories,
} from './image-config.mjs';

// Source folder for ORIGINAL, unprocessed assets
const IMAGE_DIR = 'assets/images-raw';
// Destination for optimized files used by the app
const OUTPUT_DIR = 'public/images';

/**
 * Ensure directory exists
 */
async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

/**
 * Generate optimized image in a specific format
 */
async function generateFormat(
  image,
  outputPath,
  format,
  qualitySettings
) {
  let processor = image.clone();

  switch (format) {
    case 'avif':
      processor = processor.avif(qualitySettings.avif);
      break;
    case 'webp':
      processor = processor.webp(qualitySettings.webp);
      break;
    case 'jpeg':
      processor = processor.jpeg(qualitySettings.jpeg);
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  await processor.toFile(outputPath);
  const fileStat = await stat(outputPath);
  return Math.round(fileStat.size / 1024); // Return size in KB
}

/**
 * Generate all formats for a single size/variant combination
 */
async function generateAllFormats(
  image,
  baseName,
  size,
  variant,
  outputDir,
  qualityPreset
) {
  const quality = QUALITY_SETTINGS[qualityPreset] || QUALITY_SETTINGS.default;
  const variantSuffix = variant ? `-${variant}-` : '-';
  const results = {};

  for (const format of ['avif', 'webp', 'jpeg']) {
    const filename = `${baseName}${variantSuffix}${size}w.${format}`;
    const outputPath = join(outputDir, filename);
    
    try {
      const sizeKB = await generateFormat(image, outputPath, format, quality);
      results[format] = { path: outputPath, sizeKB };
      console.log(`  ✓ ${filename} (${sizeKB}KB)`);
    } catch (error) {
      console.error(`  ✗ Error generating ${format} for ${filename}:`, error.message);
    }
  }

  return results;
}

/**
 * Process hero image with aspect ratio cropping
 */
async function processHeroImage(image, targetDimensions) {
  const metadata = await image.metadata();
  const aspectRatio = targetDimensions.width / targetDimensions.height;
  const currentAspect = metadata.width / metadata.height;

  if (currentAspect > aspectRatio) {
    // Image is wider - crop width
    const newWidth = Math.round(metadata.height * aspectRatio);
    const left = Math.round((metadata.width - newWidth) / 2);
    return image.extract({
      left,
      top: 0,
      width: newWidth,
      height: metadata.height,
    });
  } else {
    // Image is taller - crop height
    const newHeight = Math.round(metadata.width / aspectRatio);
    const top = Math.round((metadata.height - newHeight) / 2);
    return image.extract({
      left: 0,
      top,
      width: metadata.width,
      height: newHeight,
    });
  }
}

/**
 * Optimize image with variants
 */
async function optimizeImageWithVariants(
  inputPath,
  outputDir,
  filename,
  category
) {
  const { name } = parse(filename);
  const baseName = name.replace(/-\d+w$/, '');
  const config = getCategoryConfig(category);
  
  console.log(`\n📸 Processing (${category}): ${filename}`);

  const base = sharp(inputPath);

  // Process hero images with special aspect ratio handling
  if (config.needsCrop && config.aspectRatio) {
    const croppedImage = await processHeroImage(base, config.aspectRatio);
    
    // Process each size
    for (const size of config.sizes) {
      const resized = croppedImage.clone().resize(size, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });
      
      await generateAllFormats(
        resized,
        baseName,
        size,
        null,
        outputDir,
        config.quality
      );
    }
    return;
  }

  // Process images with variants (services, about, qui-suis-je)
  if (config.variants) {
    for (const size of config.sizes) {
      // Generate base variant (no variant suffix) only if configured
      if (config.generateBaseVariant) {
        const baseResized = base.clone().resize(size, null, {
          fit: 'inside',
          withoutEnlargement: true,
        });
        
        await generateAllFormats(
          baseResized,
          baseName,
          size,
          null,
          outputDir,
          config.quality
        );
      }

      // Generate variant images
      for (const variant of config.variants) {
        const variantConfig = VARIANT_CONFIGS[variant];
        if (!variantConfig) {
          console.warn(`  ⚠ Unknown variant: ${variant}`);
          continue;
        }

        const resizeOptions = variantConfig.resize(size);
        const variantImage = base.clone().resize(
          resizeOptions.width,
          resizeOptions.height,
          resizeOptions
        );

        await generateAllFormats(
          variantImage,
          baseName,
          size,
          variant,
          outputDir,
          config.quality
        );
      }
    }
  } else {
    // Process simple images without variants (testimonials, logos)
    for (const size of config.sizes) {
      const resized = base.clone().resize(size, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });

      await generateAllFormats(
        resized,
        baseName,
        size,
        null,
        outputDir,
        config.quality
      );
    }
  }
}

/**
 * Process all images in a directory
 */
async function processDirectory(subdir) {
  const inputDir = join(IMAGE_DIR, subdir);
  const outputDir = join(OUTPUT_DIR, subdir);
  
  if (!existsSync(inputDir)) {
    console.log(`⚠️  Directory ${inputDir} does not exist, skipping...`);
    return;
  }
  
  await ensureDir(outputDir);
  
  const files = await readdir(inputDir);
  // Filter out already processed images (those with size/variant suffixes)
  const imageFiles = files.filter(f => 
    /\.(jpg|jpeg|png)$/i.test(f) && 
    !/(?:-h-|-sq-|-\d+w\.|-\d+w$)/.test(f)
  );
  
  if (imageFiles.length === 0) {
    console.log(`\n📁 No images found in ${subdir}/`);
    return;
  }

  console.log(`\n📁 Processing ${subdir}/ (${imageFiles.length} images)`);
  
  for (const file of imageFiles) {
    const inputPath = join(inputDir, file);
    try {
      await optimizeImageWithVariants(inputPath, outputDir, file, subdir);
    } catch (error) {
      console.error(`  ✗ Error processing ${file}:`, error.message);
    }
  }
}

/**
 * Process a specific image file
 */
async function processSpecificImage(imagePath, category) {
  if (!existsSync(imagePath)) {
    console.error(`❌ File not found: ${imagePath}`);
    return;
  }

  const pathParts = imagePath.split(/[/\\]/);
  const filename = pathParts[pathParts.length - 1];
  const subdir = category || pathParts[pathParts.length - 2];

  // Validate category
  if (!getSupportedCategories().includes(subdir)) {
    console.error(`❌ Unknown category: ${subdir}`);
    console.log(`💡 Supported categories: ${getSupportedCategories().join(', ')}`);
    return;
  }

  const outputDir = join(OUTPUT_DIR, subdir);
  await ensureDir(outputDir);

  console.log(`\n📸 Processing specific file: ${filename} from ${subdir}/`);
  await optimizeImageWithVariants(imagePath, outputDir, filename, subdir);
}

/**
 * Find image file by name across all directories
 */
async function findImageFile(filename) {
  for (const category of getSupportedCategories()) {
    const fullPath = join(IMAGE_DIR, category, filename);
    if (existsSync(fullPath)) {
      return { path: fullPath, category };
    }
  }
  return null;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  
  console.log('🚀 Starting image optimization...\n');
  console.log(`📂 Source: ${IMAGE_DIR}`);
  console.log(`📂 Output: ${OUTPUT_DIR}\n`);

  const startTime = Date.now();

  try {
    // Create source and output directories
    await ensureDir(IMAGE_DIR);
    await ensureDir(OUTPUT_DIR);
    
    // If specific image(s) provided, process only those
    if (args.length > 0) {
      for (const arg of args) {
        // Check if it's a path to a specific image
        if (arg.includes('/') || arg.includes('\\')) {
          // Full path provided
          const pathParts = arg.split(/[/\\]/);
          const category = pathParts[pathParts.length - 2];
          await processSpecificImage(arg, category);
        } else if (arg.includes('.')) {
          // Just filename - search for it
          console.log(`\n📸 Searching for: ${arg}`);
          const found = await findImageFile(arg);
          if (found) {
            console.log(`   Found in ${found.category}/`);
            await processSpecificImage(found.path, found.category);
          } else {
            console.error(`❌ Could not find ${arg} in any directory`);
          }
        } else {
          // Category name - process all images in that directory
          if (!getSupportedCategories().includes(arg)) {
            console.error(`❌ Unknown category: ${arg}`);
            console.log(`💡 Supported categories: ${getSupportedCategories().join(', ')}`);
            continue;
          }
          await processDirectory(arg);
        }
      }
    } else {
      // No arguments - process all directories
      console.log('📦 Processing all categories...\n');
      for (const category of getSupportedCategories()) {
        await processDirectory(category);
      }
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n✅ Optimization complete!');
    console.log(`⏱️  Time taken: ${duration}s`);
    console.log(`📂 Output directory: ${OUTPUT_DIR}`);
    
    if (args.length === 0) {
      console.log('\n📊 Usage examples:');
      console.log('  node scripts/optimize-images.mjs                    # Process all images');
      console.log('  node scripts/optimize-images.mjs hero              # Process all hero images');
      console.log('  node scripts/optimize-images.mjs hero-new.jpg     # Process specific image');
      console.log('  node scripts/optimize-images.mjs services         # Process all service images');
      console.log('  node scripts/optimize-images.mjs services/reiki.jpg # Process specific image with path');
    }
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

main();
