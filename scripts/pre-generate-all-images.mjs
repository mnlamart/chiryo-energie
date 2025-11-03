#!/usr/bin/env node
/**
 * Pre-generate all images for the application
 * 
 * This script scans all source images in assets/images-raw/ and generates
 * all combinations of sizes, formats, and variants based on the image configuration.
 * 
 * This is useful for:
 * - Warming the cache before production deployment
 * - Generating images during build time
 * - Ensuring all images are ready before users visit
 * 
 * Usage:
 *   # Local development (server must be running)
 *   node scripts/pre-generate-all-images.mjs
 * 
 *   # Production (after deployment)
 *   API_BASE_URL=https://chiryo-energie.sevend.io node scripts/pre-generate-all-images.mjs
 * 
 *   # Custom URL
 *   node scripts/pre-generate-all-images.mjs https://chiryo-energie.sevend.io
 * 
 * Options:
 *   --formats=avif,webp,jpeg  Only generate specified formats (default: all)
 *   --categories=hero,services  Only generate for specified categories (default: all)
 *   --parallel=N  Generate N images in parallel (default: 5)
 *   --image=category:imageName  Generate only a specific image (e.g., --image=hero:hero-new)
 *   --sizes=640,960,1280  Only generate specified sizes (default: all configured sizes)
 */

import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load image configuration
const configPath = join(__dirname, '../app/config/images.config.json');
const imageConfig = JSON.parse(readFileSync(configPath, 'utf-8'));

const IMAGE_DIR = join(__dirname, '../assets/images-raw');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const DEFAULT_FORMATS = ['avif', 'webp', 'jpeg'];

/**
 * Get all image files in a category directory
 */
async function getImageFiles(category) {
  const categoryDir = join(IMAGE_DIR, category);
  
  if (!existsSync(categoryDir)) {
    return [];
  }

  const files = await readdir(categoryDir);
  return files
    .filter(file => {
      const ext = extname(file).toLowerCase();
      return SUPPORTED_EXTENSIONS.includes(ext);
    })
    .map(file => {
      // Remove extension to get base name
      return file.replace(/\.(jpg|jpeg|png)$/i, '');
    });
}

/**
 * Generate image URL for API request
 */
function getImageUrl(apiBaseUrl, category, imageName, size, format, variant) {
  const params = new URLSearchParams({
    w: size.toString(),
    f: format,
  });
  
  if (variant) {
    params.set('v', variant);
  }
  
  return `${apiBaseUrl}/api/images/${category}/${imageName}?${params.toString()}`;
}

/**
 * Fetch a single image from the API with retry logic for timeouts
 */
async function fetchImage(url, retries = 3, delay = 2000) {
  const start = Date.now();
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Use AbortController for timeout (120 seconds)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 120s timeout
      
      const response = await fetch(url, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      const duration = ((Date.now() - start) / 1000).toFixed(2);
      
      if (!response.ok) {
        const errorText = await response.text();
        
        // Retry on 524 (timeout) or 502/503/504 (server errors)
        if ((response.status === 524 || response.status >= 500) && attempt < retries) {
          console.log(`    ⚠️  Attempt ${attempt}/${retries} failed (HTTP ${response.status}), retrying in ${delay/1000}s...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
      }
      
      const buffer = await response.arrayBuffer();
      const sizeKB = (buffer.byteLength / 1024).toFixed(1);
      
      return {
        duration: parseFloat(duration),
        sizeKB,
        cached: parseFloat(duration) < 0.5,
      };
    } catch (error) {
      if (error.name === 'AbortError' && attempt < retries) {
        console.log(`    ⚠️  Attempt ${attempt}/${retries} timed out, retrying in ${delay/1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      if (attempt === retries) {
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('All retry attempts failed');
}

/**
 * Generate all variants for a single image
 */
async function generateImageVariants(
  apiBaseUrl,
  category,
  imageName,
  sizes,
  formats,
  variants,
  generateBaseVariant,
  parallel = 1
) {
  const tasks = [];
  
  for (const format of formats) {
    for (const size of sizes) {
      // Generate base variant (no variant) if configured
      if (generateBaseVariant || !variants || variants.length === 0) {
        tasks.push({
          category,
          imageName,
          size,
          format,
          variant: null,
          url: getImageUrl(apiBaseUrl, category, imageName, size, format, null),
        });
      }
      
      // Generate variant images
      if (variants && variants.length > 0) {
        for (const variant of variants) {
          tasks.push({
            category,
            imageName,
            size,
            format,
            variant,
            url: getImageUrl(apiBaseUrl, category, imageName, size, format, variant),
          });
        }
      }
    }
  }
  
  // Process tasks in parallel batches with delays between batches to avoid overwhelming server
  const results = {
    total: tasks.length,
    generated: 0,
    cached: 0,
    errors: 0,
    totalSize: 0,
    totalTime: 0,
  };
  
  // Track failed tasks for retry
  const failedTasks = [];
  
  // Sort tasks: smaller sizes first (faster generation, less likely to timeout)
  const sortedTasks = [...tasks].sort((a, b) => a.size - b.size);
  
  // First pass: try all tasks
  for (let i = 0; i < sortedTasks.length; i += parallel) {
    const batch = sortedTasks.slice(i, i + parallel);
    const batchResults = await Promise.allSettled(
      batch.map(task => fetchImage(task.url))
    );
    
    for (let j = 0; j < batch.length; j++) {
      const task = batch[j];
      const result = batchResults[j];
      
      if (result.status === 'fulfilled') {
        const { duration, sizeKB, cached } = result.value;
        results.totalTime += duration;
        results.totalSize += parseFloat(sizeKB);
        
        const variantLabel = task.variant ? `-${task.variant}` : '';
        const status = cached ? '✅' : '✨';
        const statusText = cached ? 'cached' : 'generated';
        console.log(`    ${status} ${task.size}w ${task.format}${variantLabel} (${statusText}, ${duration}s, ${sizeKB}KB)`);
        
        if (cached) {
          results.cached++;
        } else {
          results.generated++;
        }
      } else {
        // Track failed tasks for retry
        failedTasks.push(task);
        const errorMsg = result.reason.message.substring(0, 100);
        const variantLabel = task.variant ? ` (${task.variant})` : '';
        console.error(`  ❌ ${task.size}w ${task.format}${variantLabel}: ${errorMsg}`);
      }
    }
    
    // Small delay between batches to avoid overwhelming the server
    if (i + parallel < sortedTasks.length) {
      await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay between batches
    }
  }
  
  // Retry failed tasks (one more attempt)
  if (failedTasks.length > 0) {
    console.log(`\n  🔄 Retrying ${failedTasks.length} failed image(s)...\n`);
    
    for (let i = 0; i < failedTasks.length; i += parallel) {
      const batch = failedTasks.slice(i, i + parallel);
      const batchResults = await Promise.allSettled(
        batch.map(task => fetchImage(task.url, 3, 3000)) // 3 retries with 3s delay for retry pass
      );
      
      for (let j = 0; j < batch.length; j++) {
        const task = batch[j];
        const result = batchResults[j];
        
        if (result.status === 'fulfilled') {
          // Successfully regenerated
          const { duration, sizeKB, cached } = result.value;
          results.totalTime += duration;
          results.totalSize += parseFloat(sizeKB);
          results.errors--; // Decrease error count since we succeeded
          
          const variantLabel = task.variant ? `-${task.variant}` : '';
          console.log(`    ✅ ${task.size}w ${task.format}${variantLabel} (regenerated, ${duration}s, ${sizeKB}KB)`);
          
          if (cached) {
            results.cached++;
          } else {
            results.generated++;
          }
        } else {
          // Still failed after retry
          const errorMsg = result.reason.message.substring(0, 100);
          const variantLabel = task.variant ? ` (${task.variant})` : '';
          console.error(`  ❌ ${task.size}w ${task.format}${variantLabel} (retry failed): ${errorMsg}`);
        }
      }
      
      // Longer delay between retry batches
      if (i + parallel < failedTasks.length) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay between retry batches
      }
    }
  }
  
  return results;
}

/**
 * Pre-generate all images
 */
async function preGenerateAllImages(
  apiBaseUrl = 'http://localhost:3000',
  options = {}
) {
  const {
    formats = DEFAULT_FORMATS,
    categories = null,
    parallel = 5,
    image = null,
    sizes = null,
  } = options;
  
  console.log('🚀 Starting image pre-generation...\n');
  console.log(`📡 Using API endpoint: ${apiBaseUrl}\n`);
  
  // Handle single image generation
  if (image) {
    const [category, imageName] = image.split(':');
    if (!category || !imageName) {
      console.error('❌ Invalid --image format. Use: --image=category:imageName');
      console.error('   Example: --image=hero:hero-new');
      process.exit(1);
    }
    
    if (!imageConfig.categoryConfigs[category]) {
      console.error(`❌ Unknown category: ${category}`);
      console.error(`   Valid categories: ${Object.keys(imageConfig.categoryConfigs).join(', ')}`);
      process.exit(1);
    }
    
    const imageFiles = await getImageFiles(category);
    if (!imageFiles.includes(imageName)) {
      console.error(`❌ Image "${imageName}" not found in category "${category}"`);
      console.error(`   Available images: ${imageFiles.join(', ')}`);
      process.exit(1);
    }
    
    console.log(`📸 Generating single image: ${category}/${imageName}`);
    console.log(`📋 Formats: ${formats.join(', ')}`);
    if (sizes) {
      console.log(`📏 Sizes: ${sizes.join(', ')}`);
    }
    console.log(`⚡ Parallel requests: ${parallel}\n`);
    
    const categoryConfig = imageConfig.categoryConfigs[category];
    const sizesToUse = sizes || imageConfig.sizes[category];
    const variants = categoryConfig.variants || null;
    const generateBaseVariant = categoryConfig.generateBaseVariant || false;
    
    try {
      const results = await generateImageVariants(
        apiBaseUrl,
        category,
        imageName,
        sizesToUse,
        formats,
        variants,
        generateBaseVariant,
        parallel
      );
      
      const avgTime = (results.totalTime / results.total).toFixed(2);
      console.log(`\n📊 Summary:`);
      console.log(`   Total images: ${results.total}`);
      console.log(`   Generated: ${results.generated}`);
      console.log(`   Cached: ${results.cached}`);
      console.log(`   Errors: ${results.errors}`);
      console.log(`   Total size: ${results.totalSize.toFixed(1)}KB`);
      console.log(`   Average time: ${avgTime}s`);
      console.log(`   Total data: ${(results.totalSize / 1024).toFixed(2)}MB`);
      console.log('\n✅ Image generation complete!');
      
      if (results.errors > 0) {
        process.exit(1);
      }
    } catch (error) {
      console.error(`❌ Error processing ${imageName}: ${error.message}`);
      process.exit(1);
    }
    
    return;
  }
  
  console.log(`📋 Formats: ${formats.join(', ')}`);
  if (sizes) {
    console.log(`📏 Sizes filter: ${sizes.join(', ')}`);
  }
  console.log(`⚡ Parallel requests: ${parallel}\n`);
  
  const allCategories = Object.keys(imageConfig.categoryConfigs);
  const categoriesToProcess = categories 
    ? categories.filter(c => allCategories.includes(c))
    : allCategories;
  
  if (categories && categoriesToProcess.length === 0) {
    console.error('❌ No valid categories specified');
    process.exit(1);
  }
  
  const overallStats = {
    total: 0,
    generated: 0,
    cached: 0,
    errors: 0,
    totalSize: 0,
    totalTime: 0,
  };
  
  const startTime = Date.now();
  
  for (const category of categoriesToProcess) {
    const categoryConfig = imageConfig.categoryConfigs[category];
    const imageFiles = await getImageFiles(category);
    
    if (imageFiles.length === 0) {
      console.log(`📁 ${category}: No images found\n`);
      continue;
    }
    
    console.log(`📁 ${category}: ${imageFiles.length} image(s)`);
    console.log(`   Sizes: ${imageConfig.sizes[category].join(', ')}`);
    if (categoryConfig.variants) {
      console.log(`   Variants: ${categoryConfig.variants.join(', ')}${categoryConfig.generateBaseVariant ? ' + base' : ''}`);
    }
    console.log('');
    
    for (const imageName of imageFiles) {
      console.log(`  📸 ${imageName}`);
      
      const sizes = imageConfig.sizes[category];
      const variants = categoryConfig.variants || null;
      const generateBaseVariant = categoryConfig.generateBaseVariant || false;
      
      try {
        const sizesToUse = sizes || imageConfig.sizes[category];
        const results = await generateImageVariants(
          apiBaseUrl,
          category,
          imageName,
          sizesToUse,
          formats,
          variants,
          generateBaseVariant,
          parallel
        );
        
        overallStats.total += results.total;
        overallStats.generated += results.generated;
        overallStats.cached += results.cached;
        overallStats.errors += results.errors;
        overallStats.totalSize += results.totalSize;
        overallStats.totalTime += results.totalTime;
        
        const avgTime = (results.totalTime / results.total).toFixed(2);
        console.log(`     ✅ Generated: ${results.generated}, Cached: ${results.cached}, Errors: ${results.errors}`);
        console.log(`     ⏱️  Avg time: ${avgTime}s, Total size: ${results.totalSize.toFixed(1)}KB\n`);
      } catch (error) {
        console.error(`     ❌ Error processing ${imageName}: ${error.message}\n`);
        overallStats.errors++;
      }
    }
    
    console.log('');
  }
  
  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
  const avgTime = overallStats.total > 0 
    ? (overallStats.totalTime / overallStats.total).toFixed(2)
    : '0';
  
  console.log('📊 Overall Summary:');
  console.log(`   Total images: ${overallStats.total}`);
  console.log(`   Generated: ${overallStats.generated}`);
  console.log(`   Cached: ${overallStats.cached}`);
  console.log(`   Errors: ${overallStats.errors}`);
  
  if (overallStats.total > 0) {
    console.log(`   Total size: ${overallStats.totalSize.toFixed(1)}KB`);
    console.log(`   Total time: ${totalDuration}s`);
    console.log(`   Average time per image: ${avgTime}s`);
    console.log(`   Total data: ${(overallStats.totalSize / 1024).toFixed(2)}MB`);
  } else {
    console.log(`   Total size: 0KB`);
    console.log(`   Total time: ${totalDuration}s`);
    console.log(`   Average time per image: N/A (no images processed)`);
    console.log(`   Total data: 0MB`);
  }
  
  if (overallStats.total === 0) {
    console.log('\n⚠️  No images were found to process. Check that source images exist in assets/images-raw/');
  }
  
  console.log('\n✅ Image pre-generation complete!');
  
  if (overallStats.errors > 0) {
    process.exit(1);
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  let apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
  
  for (const arg of args) {
    if (arg.startsWith('--formats=')) {
      options.formats = arg.split('=')[1].split(',');
    } else if (arg.startsWith('--categories=')) {
      options.categories = arg.split('=')[1].split(',');
    } else if (arg.startsWith('--parallel=')) {
      options.parallel = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--image=')) {
      options.image = arg.split('=')[1];
    } else if (arg.startsWith('--sizes=')) {
      options.sizes = arg.split('=')[1].split(',').map(s => parseInt(s.trim(), 10));
    } else if (arg.startsWith('http://') || arg.startsWith('https://')) {
      apiBaseUrl = arg;
    } else if (!arg.startsWith('--')) {
      // Legacy: first non-flag argument is the URL
      apiBaseUrl = arg;
    }
  }
  
  return { apiBaseUrl, options };
}

// Run if called directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` ||
                     process.argv[1]?.endsWith('pre-generate-all-images.mjs');

if (isMainModule) {
  const { apiBaseUrl, options } = parseArgs();
  preGenerateAllImages(apiBaseUrl, options).catch((error) => {
    console.error('❌ Error during pre-generation:', error);
    process.exit(1);
  });
}

export { preGenerateAllImages };

