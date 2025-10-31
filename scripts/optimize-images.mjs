#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, parse } from 'path';
import { existsSync } from 'fs';

// Source folder for ORIGINAL, unprocessed assets
const IMAGE_DIR = 'assets/images-raw';
// Destination for optimized files used by the app
const OUTPUT_DIR = 'public/images';

// Image size configurations
const SIZES = {
  hero: [640, 960, 1280, 1920],
  // Service images: 
  // - Small cards (compact): 80, 96, 192
  // - Home page cards: 200, 300, 400, 500 (for sizes: mobile up to 400px, tablet 200px, desktop 150px)
  // - Service detail pages: 400, 800, 1200 (for sizes: 100vw mobile, 50vw desktop)
  // - Hover cards: 400
  services: [80, 96, 192, 200, 300, 400, 500, 800, 1200],
  testimonials: [150], // Keep original size, just convert format
  about: [400, 600, 800, 1000],
  // Logo sizes: header/footer (small), about page (medium), large display (large)
  logos: [100, 150, 200, 300, 400],
  'qui-suis-je': [400, 600, 800, 1000]
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
      
      // Compression settings (more aggressive for hero to improve LCP)
      const avifQuality = isHero ? 45 : 55; // AVIF quality (0-100)
      const webpQuality = isHero ? 60 : 70;
      const jpegQuality = isHero ? 70 : 75;

      // Generate AVIF version (preferred modern format)
      const avifPath = join(outputDir, `${name}-${size}w.avif`);
      await image
        .clone()
        .avif({ quality: avifQuality, effort: 9 })
        .toFile(avifPath);
      const avifBytes = (await stat(avifPath)).size;
      console.log(`  ✓ ${name}-${size}w.avif (${Math.round(avifBytes / 1024)}KB)`);

      // Generate WebP version
      const webpPath = join(outputDir, `${name}-${size}w.webp`);
      await image
        .clone()
        .webp({ quality: webpQuality, effort: 6 })
        .toFile(webpPath);
      const webpBytes = (await stat(webpPath)).size;
      console.log(`  ✓ ${name}-${size}w.webp (${Math.round(webpBytes / 1024)}KB)`);
      
      // Generate optimized JPEG version
      const jpegPath = join(outputDir, `${name}-${size}w.jpg`);
      await image
        .clone()
        .jpeg({ quality: jpegQuality, progressive: true, mozjpeg: true })
        .toFile(jpegPath);
      const jpegBytes = (await stat(jpegPath)).size;
      console.log(`  ✓ ${name}-${size}w.jpg (${Math.round(jpegBytes / 1024)}KB)`);
      
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
        const avifPath = join(outputDir, `${baseName}-sq-${size}w.avif`);
        await sq.clone().avif({ quality: 55, effort: 9 }).toFile(avifPath);
        const avifBytes = (await stat(avifPath)).size;
        console.log(`  ✓ ${baseName}-sq-${size}w.avif (${Math.round(avifBytes / 1024)}KB)`);
        const webpPath = join(outputDir, `${baseName}-sq-${size}w.webp`);
        await sq.clone().webp({ quality: 70, effort: 6 }).toFile(webpPath);
        const webpBytes = (await stat(webpPath)).size;
        console.log(`  ✓ ${baseName}-sq-${size}w.webp (${Math.round(webpBytes / 1024)}KB)`);
        const jpegPath = join(outputDir, `${baseName}-sq-${size}w.jpg`);
        await sq.clone().jpeg({ quality: 75, progressive: true, mozjpeg: true }).toFile(jpegPath);
        const jpegBytes = (await stat(jpegPath)).size;
        console.log(`  ✓ ${baseName}-sq-${size}w.jpg (${Math.round(jpegBytes / 1024)}KB)`);
        console.log(`  ✓ ${baseName}-sq-${size}w.(webp|jpg)`);
      }

      // Horizontal variant (4:3 crop)
      {
        const targetHeight = Math.round(size * 3 / 4);
        const horiz = base.clone().resize(size, targetHeight, { fit: 'cover', position: 'entropy' });
        const avifPath = join(outputDir, `${baseName}-h-${size}w.avif`);
        await horiz.clone().avif({ quality: 55, effort: 9 }).toFile(avifPath);
        const avifBytesH = (await stat(avifPath)).size;
        console.log(`  ✓ ${baseName}-h-${size}w.avif (${Math.round(avifBytesH / 1024)}KB)`);
        const webpPath = join(outputDir, `${baseName}-h-${size}w.webp`);
        await horiz.clone().webp({ quality: 70, effort: 6 }).toFile(webpPath);
        const webpBytesH = (await stat(webpPath)).size;
        console.log(`  ✓ ${baseName}-h-${size}w.webp (${Math.round(webpBytesH / 1024)}KB)`);
        const jpegPath = join(outputDir, `${baseName}-h-${size}w.jpg`);
        await horiz.clone().jpeg({ quality: 75, progressive: true, mozjpeg: true }).toFile(jpegPath);
        const jpegBytesH = (await stat(jpegPath)).size;
        console.log(`  ✓ ${baseName}-h-${size}w.jpg (${Math.round(jpegBytesH / 1024)}KB)`);
        console.log(`  ✓ ${baseName}-h-${size}w.(webp|jpg)`);
      }

    } catch (error) {
      console.error(`  ✗ Error processing service image ${filename} at ${size}w:`, error.message);
    }
  }
}

// Specialized qui-suis-je image optimizer to produce full (desktop) and horizontal cropped (mobile) variants
async function optimizeQuiSuisJeImage(inputPath, outputDir, filename, sizes) {
  const { name } = parse(filename);
  const baseName = name.replace(/-\d+w$/, '');

  console.log(`\n📸 Processing (qui-suis-je): ${filename}`);

  for (const size of sizes) {
    try {
      const base = sharp(inputPath);
      const metadata = await base.metadata();

      // Full variant (desktop) - maintain original aspect ratio
      {
        const full = base.clone().resize(size, null, {
          fit: 'inside',
          withoutEnlargement: true
        });
        const avifPath = join(outputDir, `${baseName}-${size}w.avif`);
        await full.clone().avif({ quality: 55, effort: 9 }).toFile(avifPath);
        const avifBytes = (await stat(avifPath)).size;
        console.log(`  ✓ ${baseName}-${size}w.avif (${Math.round(avifBytes / 1024)}KB)`);
        const webpPath = join(outputDir, `${baseName}-${size}w.webp`);
        await full.clone().webp({ quality: 70, effort: 6 }).toFile(webpPath);
        const webpBytes = (await stat(webpPath)).size;
        console.log(`  ✓ ${baseName}-${size}w.webp (${Math.round(webpBytes / 1024)}KB)`);
        const jpegPath = join(outputDir, `${baseName}-${size}w.jpg`);
        await full.clone().jpeg({ quality: 75, progressive: true, mozjpeg: true }).toFile(jpegPath);
        const jpegBytes = (await stat(jpegPath)).size;
        console.log(`  ✓ ${baseName}-${size}w.jpg (${Math.round(jpegBytes / 1024)}KB)`);
      }

      // Horizontal variant (mobile) - 4:3 crop to show more of original image (content-aware)
      {
        const targetHeight = Math.round(size * 3 / 4); // 4:3 aspect ratio (wider angle, shows more)
        const horiz = base.clone().resize(size, targetHeight, { fit: 'cover', position: 'attention' });
        const avifPath = join(outputDir, `${baseName}-h-${size}w.avif`);
        await horiz.clone().avif({ quality: 55, effort: 9 }).toFile(avifPath);
        const avifBytesH = (await stat(avifPath)).size;
        console.log(`  ✓ ${baseName}-h-${size}w.avif (${Math.round(avifBytesH / 1024)}KB)`);
        const webpPath = join(outputDir, `${baseName}-h-${size}w.webp`);
        await horiz.clone().webp({ quality: 70, effort: 6 }).toFile(webpPath);
        const webpBytesH = (await stat(webpPath)).size;
        console.log(`  ✓ ${baseName}-h-${size}w.webp (${Math.round(webpBytesH / 1024)}KB)`);
        const jpegPath = join(outputDir, `${baseName}-h-${size}w.jpg`);
        await horiz.clone().jpeg({ quality: 75, progressive: true, mozjpeg: true }).toFile(jpegPath);
        const jpegBytesH = (await stat(jpegPath)).size;
        console.log(`  ✓ ${baseName}-h-${size}w.jpg (${Math.round(jpegBytesH / 1024)}KB)`);
      }

    } catch (error) {
      console.error(`  ✗ Error processing qui-suis-je image ${filename} at ${size}w:`, error.message);
    }
  }
}

// Specialized about image optimizer to produce full (desktop) and horizontal cropped (mobile) variants
async function optimizeAboutImage(inputPath, outputDir, filename, sizes) {
  const { name } = parse(filename);
  const baseName = name.replace(/-\d+w$/, '');

  console.log(`\n📸 Processing (about): ${filename}`);

  for (const size of sizes) {
    try {
      const base = sharp(inputPath);
      const metadata = await base.metadata();

      // Full variant (desktop) - maintain original aspect ratio
      {
        const full = base.clone().resize(size, null, {
          fit: 'inside',
          withoutEnlargement: true
        });
        const avifPath = join(outputDir, `${baseName}-${size}w.avif`);
        await full.clone().avif({ quality: 55, effort: 9 }).toFile(avifPath);
        const avifBytes = (await stat(avifPath)).size;
        console.log(`  ✓ ${baseName}-${size}w.avif (${Math.round(avifBytes / 1024)}KB)`);
        const webpPath = join(outputDir, `${baseName}-${size}w.webp`);
        await full.clone().webp({ quality: 70, effort: 6 }).toFile(webpPath);
        const webpBytes = (await stat(webpPath)).size;
        console.log(`  ✓ ${baseName}-${size}w.webp (${Math.round(webpBytes / 1024)}KB)`);
        const jpegPath = join(outputDir, `${baseName}-${size}w.jpg`);
        await full.clone().jpeg({ quality: 75, progressive: true, mozjpeg: true }).toFile(jpegPath);
        const jpegBytes = (await stat(jpegPath)).size;
        console.log(`  ✓ ${baseName}-${size}w.jpg (${Math.round(jpegBytes / 1024)}KB)`);
      }

      // Horizontal variant (mobile) - 4:3 crop to show more of original image (content-aware)
      {
        const targetHeight = Math.round(size * 3 / 4); // 4:3 aspect ratio (wider angle, shows more)
        const horiz = base.clone().resize(size, targetHeight, { fit: 'cover', position: 'attention' });
        const avifPath = join(outputDir, `${baseName}-h-${size}w.avif`);
        await horiz.clone().avif({ quality: 55, effort: 9 }).toFile(avifPath);
        const avifBytesH = (await stat(avifPath)).size;
        console.log(`  ✓ ${baseName}-h-${size}w.avif (${Math.round(avifBytesH / 1024)}KB)`);
        const webpPath = join(outputDir, `${baseName}-h-${size}w.webp`);
        await horiz.clone().webp({ quality: 70, effort: 6 }).toFile(webpPath);
        const webpBytesH = (await stat(webpPath)).size;
        console.log(`  ✓ ${baseName}-h-${size}w.webp (${Math.round(webpBytesH / 1024)}KB)`);
        const jpegPath = join(outputDir, `${baseName}-h-${size}w.jpg`);
        await horiz.clone().jpeg({ quality: 75, progressive: true, mozjpeg: true }).toFile(jpegPath);
        const jpegBytesH = (await stat(jpegPath)).size;
        console.log(`  ✓ ${baseName}-h-${size}w.jpg (${Math.round(jpegBytesH / 1024)}KB)`);
      }

    } catch (error) {
      console.error(`  ✗ Error processing about image ${filename} at ${size}w:`, error.message);
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

async function processSpecificImage(imagePath, subdir) {
  const { name, ext } = parse(imagePath);
  const filename = name + ext;
  
  // Determine image type and sizes based on subdirectory
  let sizes, options = {};
  let useServiceOptimizer = false;
  let useQuiSuisJeOptimizer = false;
  let useAboutOptimizer = false;
  
  if (subdir === 'hero') {
    sizes = SIZES.hero;
    options = { isHero: true, targetDimensions: HERO_TARGET };
  } else if (subdir === 'services') {
    sizes = SIZES.services;
    useServiceOptimizer = true;
  } else if (subdir === 'testimonials') {
    sizes = SIZES.testimonials;
          } else if (subdir === 'about') {
            sizes = SIZES.about;
            useAboutOptimizer = true;
          } else if (subdir === 'qui-suis-je') {
            sizes = SIZES['qui-suis-je'];
            useQuiSuisJeOptimizer = true;
          } else if (subdir === 'logos') {
            sizes = SIZES.logos;
          } else {
            console.error(`❌ Unknown subdirectory: ${subdir}`);
            console.log('💡 Supported subdirectories: hero, services, testimonials, about, qui-suis-je, logos');
            process.exit(1);
          }
  
  const outputDir = join(OUTPUT_DIR, subdir);
  await ensureDir(outputDir);
  
  if (useServiceOptimizer) {
    await optimizeServiceImage(imagePath, outputDir, filename, sizes);
  } else if (useQuiSuisJeOptimizer) {
    await optimizeQuiSuisJeImage(imagePath, outputDir, filename, sizes);
  } else if (useAboutOptimizer) {
    await optimizeAboutImage(imagePath, outputDir, filename, sizes);
  } else {
    await optimizeImage(imagePath, outputDir, filename, sizes, options);
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  console.log('🚀 Starting image optimization...\n');
  
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
          const filename = pathParts[pathParts.length - 1];
          const subdir = pathParts[pathParts.length - 2];
          
          if (!existsSync(arg)) {
            console.error(`❌ File not found: ${arg}`);
            continue;
          }
          
          console.log(`\n📸 Processing specific file: ${filename} from ${subdir}/`);
          await processSpecificImage(arg, subdir);
        } else if (arg.includes('.')) {
          // Just filename - need to determine subdirectory
          console.log(`\n📸 Searching for: ${arg}`);
          let found = false;
          for (const subdir of ['hero', 'services', 'testimonials']) {
            const fullPath = join(IMAGE_DIR, subdir, arg);
            if (existsSync(fullPath)) {
              console.log(`   Found in ${subdir}/`);
              await processSpecificImage(fullPath, subdir);
              found = true;
              break;
            }
          }
          if (!found) {
            console.error(`❌ Could not find ${arg} in any subdirectory`);
          }
        } else {
          // Subdirectory name - process all images in that directory
          const subdir = arg;
          console.log(`\n📁 Processing all images in ${subdir}/`);
          
          if (subdir === 'hero') {
            await processDirectory('hero', SIZES.hero, {
              isHero: true,
              targetDimensions: HERO_TARGET
            });
          } else if (subdir === 'services') {
            const servicesInputDir = join(IMAGE_DIR, 'services');
            const servicesOutputDir = join(OUTPUT_DIR, 'services');
            await ensureDir(servicesInputDir);
            await ensureDir(servicesOutputDir);
            const files = await readdir(servicesInputDir);
            const imageFiles = files
              .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
              .filter(f => !/(?:-h-|-sq-|-\d+w\.|-\d+w$)/.test(f));
            console.log(`\n📁 Processing services/ (${imageFiles.length} images)`);
            for (const file of imageFiles) {
              const inputPath = join(servicesInputDir, file);
              await optimizeServiceImage(inputPath, servicesOutputDir, file, SIZES.services);
            }
          } else if (subdir === 'testimonials') {
            await processDirectory('testimonials', SIZES.testimonials);
          } else if (subdir === 'about') {
            const aboutInputDir = join(IMAGE_DIR, 'about');
            const aboutOutputDir = join(OUTPUT_DIR, 'about');
            await ensureDir(aboutInputDir);
            await ensureDir(aboutOutputDir);
            const files = await readdir(aboutInputDir);
            const imageFiles = files
              .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
              .filter(f => !/(?:-h-|-\d+w\.|-\d+w$)/.test(f));
            console.log(`\n📁 Processing about/ (${imageFiles.length} images)`);
            for (const file of imageFiles) {
              const inputPath = join(aboutInputDir, file);
              await optimizeAboutImage(inputPath, aboutOutputDir, file, SIZES.about);
            }
          } else if (subdir === 'qui-suis-je') {
            const quiSuisJeInputDir = join(IMAGE_DIR, 'qui-suis-je');
            const quiSuisJeOutputDir = join(OUTPUT_DIR, 'qui-suis-je');
            await ensureDir(quiSuisJeInputDir);
            await ensureDir(quiSuisJeOutputDir);
            const files = await readdir(quiSuisJeInputDir);
            const imageFiles = files
              .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
              .filter(f => !/(?:-h-|-\d+w\.|-\d+w$)/.test(f));
            console.log(`\n📁 Processing qui-suis-je/ (${imageFiles.length} images)`);
            for (const file of imageFiles) {
              const inputPath = join(quiSuisJeInputDir, file);
              await optimizeQuiSuisJeImage(inputPath, quiSuisJeOutputDir, file, SIZES['qui-suis-je']);
            }
          } else if (subdir === 'logos') {
            await processDirectory('logos', SIZES.logos);
          } else {
            console.error(`❌ Unknown subdirectory: ${subdir}`);
            console.log('💡 Supported: hero, services, testimonials, about, logos');
          }
        }
      }
    } else {
      // No arguments - process all directories
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
          .filter(f => !/(?:-h-|-sq-|-\d+w\.|-\d+w$)/.test(f));
        console.log(`\n📁 Processing services/ (${imageFiles.length} images)`);
        for (const file of imageFiles) {
          const inputPath = join(servicesInputDir, file);
          await optimizeServiceImage(inputPath, servicesOutputDir, file, SIZES.services);
        }
      }
      
      // Process testimonial avatars → write to public/images/testimonials
      await processDirectory('testimonials', SIZES.testimonials);
    }
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n✅ Optimization complete!');
    console.log(`⏱️  Time taken: ${duration}s`);
    console.log(`📂 Output directory: ${OUTPUT_DIR}`);
    
    if (args.length === 0) {
      console.log('\n📊 Usage examples:');
      console.log('  node scripts/optimize-images.mjs                    # Process all images');
      console.log('  node scripts/optimize-images.mjs hero              # Process all hero images');
      console.log('  node scripts/optimize-images.mjs hero-new.jpg       # Process specific image');
      console.log('  node scripts/optimize-images.mjs services           # Process all service images');
      console.log('  node scripts/optimize-images.mjs services/reiki.jpg # Process specific image with path');
    }
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

main();

