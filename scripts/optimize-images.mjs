#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

// Source folder for ORIGINAL, unprocessed assets
const IMAGE_DIR = 'assets/images-raw';
// Destination for optimized files used by the app
const OUTPUT_DIR = 'public/images';

// Image size configurations
const SIZES = {
  hero: [640, 960, 1280, 1920],
  // Include 640 to better match DPR=2 small devices
  services: [400, 640, 800, 1200],
  testimonials: [150], // Keep original size, just convert format
  about: [400, 800]
};

// Hero image special handling - resize to proper aspect ratio
const HERO_TARGET = { width: 1920, height: 1080 };

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputDir, filename, sizes, options = {}) {
  const { name } = parse(filename);
  const { isHero = false, targetDimensions = null } = options;
  
  console.log(`\n📸 Processing: ${filename}`);
  
  for (const size of sizes) {
    try {
      let image = sharp(inputPath);
      
      // Get original metadata
      const metadata = await image.metadata();
      
      // Special handling for hero image - crop to 16:9 aspect ratio
      if (isHero && targetDimensions) {
        const aspectRatio = targetDimensions.width / targetDimensions.height;
        const currentAspect = metadata.width / metadata.height;
        
        if (currentAspect > aspectRatio) {
          // Image is wider - crop width
          const newWidth = Math.round(metadata.height * aspectRatio);
          const left = Math.round((metadata.width - newWidth) / 2);
          image = image.extract({
            left,
            top: 0,
            width: newWidth,
            height: metadata.height
          });
        } else {
          // Image is taller - crop height
          const newHeight = Math.round(metadata.width / aspectRatio);
          const top = Math.round((metadata.height - newHeight) / 2);
          image = image.extract({
            left: 0,
            top,
            width: metadata.width,
            height: newHeight
          });
        }
      }
      
      // Resize to target width
      image = image.resize(size, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
      
      // Generate WebP version
      const webpPath = join(outputDir, `${name}-${size}w.webp`);
      await image
        .clone()
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);
      
      const webpStats = await sharp(webpPath).metadata();
      console.log(`  ✓ ${name}-${size}w.webp (${Math.round(webpStats.size / 1024)}KB)`);
      
      // Generate optimized JPEG version
      const jpegPath = join(outputDir, `${name}-${size}w.jpg`);
      await image
        .clone()
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(jpegPath);
      
      const jpegStats = await sharp(jpegPath).metadata();
      console.log(`  ✓ ${name}-${size}w.jpg (${Math.round(jpegStats.size / 1024)}KB)`);
      
    } catch (error) {
      console.error(`  ✗ Error processing ${filename} at ${size}w:`, error.message);
    }
  }
}

// Specialized service image optimizer to produce both horizontal and square variants
async function optimizeServiceImage(inputPath, outputDir, filename, sizes) {
  const { name } = parse(filename);
  const baseName = name.replace(/-\d+w$/, '');

  console.log(`\n📸 Processing (services): ${filename}`);

  for (const size of sizes) {
    try {
      const base = sharp(inputPath);
      const metadata = await base.metadata();

      // Square variant
      {
        const sq = base.clone().resize(size, size, { fit: 'cover', position: 'entropy' });
        const webpPath = join(outputDir, `${baseName}-sq-${size}w.webp`);
        await sq.clone().webp({ quality: 85, effort: 6 }).toFile(webpPath);
        const jpegPath = join(outputDir, `${baseName}-sq-${size}w.jpg`);
        await sq.clone().jpeg({ quality: 85, progressive: true, mozjpeg: true }).toFile(jpegPath);
        console.log(`  ✓ ${baseName}-sq-${size}w.(webp|jpg)`);
      }

      // Horizontal variant (4:3 crop)
      {
        const targetHeight = Math.round(size * 3 / 4);
        const horiz = base.clone().resize(size, targetHeight, { fit: 'cover', position: 'entropy' });
        const webpPath = join(outputDir, `${baseName}-h-${size}w.webp`);
        await horiz.clone().webp({ quality: 85, effort: 6 }).toFile(webpPath);
        const jpegPath = join(outputDir, `${baseName}-h-${size}w.jpg`);
        await horiz.clone().jpeg({ quality: 85, progressive: true, mozjpeg: true }).toFile(jpegPath);
        console.log(`  ✓ ${baseName}-h-${size}w.(webp|jpg)`);
      }

    } catch (error) {
      console.error(`  ✗ Error processing service image ${filename} at ${size}w:`, error.message);
    }
  }
}

async function processDirectory(subdir, sizes, options = {}) {
  const inputDir = join(IMAGE_DIR, subdir);
  const outputDir = join(OUTPUT_DIR, subdir);
  
  await ensureDir(outputDir);
  
  const files = await readdir(inputDir);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  
  console.log(`\n📁 Processing ${subdir}/ (${imageFiles.length} images)`);
  
  for (const file of imageFiles) {
    const inputPath = join(inputDir, file);
    await optimizeImage(inputPath, outputDir, file, sizes, options);
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  const startTime = Date.now();
  
  try {
    // Create source and output directories
    await ensureDir(IMAGE_DIR);
    await ensureDir(OUTPUT_DIR);
    
    // Process hero images with special handling → write to public/images/hero
    await processDirectory('hero', SIZES.hero, {
      isHero: true,
      targetDimensions: HERO_TARGET
    });
    
    // Process service images from raw → write to public/images/services
    {
      const servicesInputDir = join(IMAGE_DIR, 'services');
      const servicesOutputDir = join(OUTPUT_DIR, 'services');
      await ensureDir(servicesInputDir);
      await ensureDir(servicesOutputDir);
      const files = await readdir(servicesInputDir);
      const imageFiles = files
        .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
        // Skip already-processed patterns just in case someone dropped optimized files here
        .filter(f => !/(?:-h-|-sq-|-\d+w\.|-\d+w$)/.test(f));
      console.log(`\n📁 Processing services/ (${imageFiles.length} images)`);
      for (const file of imageFiles) {
        const inputPath = join(servicesInputDir, file);
        await optimizeServiceImage(inputPath, servicesOutputDir, file, SIZES.services);
      }
    }
    
    // Process testimonial avatars → write to public/images/testimonials
    await processDirectory('testimonials', SIZES.testimonials);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n✅ Optimization complete!');
    console.log(`⏱️  Time taken: ${duration}s`);
    console.log(`📂 Output directory: ${OUTPUT_DIR}`);
    console.log('\n📊 Next steps:');
    console.log('  1. Add ORIGINAL images into assets/images-raw/{hero,services,testimonials}');
    console.log('  2. Re-run this script to regenerate public/images/*');
    console.log('  3. Verify responsive images on pages');
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

main();

