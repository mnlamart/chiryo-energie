#!/usr/bin/env node
import https from 'https';
import http from 'http';
import { createWriteStream, existsSync, mkdir } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const IMAGE_DIR = 'assets/images-raw/services';

// Service image URLs from the original website - extracted from the HTML
// These are Pexels images hosted on jwwb.nl
const SERVICE_IMAGES = {
  'reiki': {
    url: 'https://primary.jwwb.nl/pexels/55/5573584.jpeg?enable-io=true&enable=upscale&width=1920',
    filename: 'reiki.jpg'
  },
  'sophro-relaxation': {
    url: 'https://primary.jwwb.nl/pexels/38/3805975.jpeg?enable-io=true&enable=upscale&width=1920',
    filename: 'sophro-relaxation.jpg'
  },
  'relaxation-energetique': {
    url: 'https://primary.jwwb.nl/pexels/16/161477.jpeg?enable-io=true&enable=upscale&width=1920',
    filename: 'relaxation-energetique.jpg'
  },
  'reflexologie': {
    url: 'https://primary.jwwb.nl/pexels/19/19695966.jpeg?enable-io=true&enable=upscale&width=1920',
    filename: 'reflexologie.jpg'
  },
  'harmonisation-lymphatique': {
    url: 'https://primary.jwwb.nl/pexels/58/5888062.jpeg?enable-io=true&enable=upscale&width=1920',
    filename: 'harmonisation-lymphatique.jpg'
  },
  'shiatsu-sevrage': {
    url: 'https://primary.jwwb.nl/pexels/54/5473223.jpeg?enable-io=true&enable=upscale&width=1920',
    filename: 'shiatsu-sevrage.jpg'
  },
  'magnetiseuse': {
    url: 'https://primary.jwwb.nl/pexels/52/5240802.jpeg?enable-io=true&enable=upscale&width=1920',
    filename: 'magnetisme.jpg'
  },
  'mediumnite': {
    url: 'https://primary.jwwb.nl/pexels/65/6512250.jpeg?enable-io=true&enable=upscale&width=1920',
    filename: 'mediumnite.jpg'
  }
};

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await promisify(mkdir)(dir, { recursive: true });
  }
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        return downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      const fileStream = createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ Downloaded: ${filepath}`);
        resolve();
      });
      
      fileStream.on('error', (err) => {
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

async function findImageUrls() {
  console.log('🔍 Fetching website to find image URLs...');
  
  try {
    const html = await fetchPage('https://www.chiryo-energie.fr/');
    
    // Extract image URLs - look for common patterns
    const imgMatches = html.match(/<img[^>]+src=["']([^"']+)["']/gi);
    const imageUrls = new Set();
    
    if (imgMatches) {
      imgMatches.forEach(match => {
        const srcMatch = match.match(/src=["']([^"']+)["']/i);
        if (srcMatch) {
          let url = srcMatch[1];
          // Convert relative URLs to absolute
          if (url.startsWith('/')) {
            url = 'https://www.chiryo-energie.fr' + url;
          } else if (!url.startsWith('http')) {
            url = 'https://www.chiryo-energie.fr/' + url;
          }
          imageUrls.add(url);
        }
      });
    }
    
    // Also look for background-image URLs
    const bgMatches = html.match(/background-image:\s*url\(["']?([^"')]+)["']?\)/gi);
    if (bgMatches) {
      bgMatches.forEach(match => {
        const urlMatch = match.match(/url\(["']?([^"')]+)["']?\)/i);
        if (urlMatch) {
          let url = urlMatch[1];
          if (url.startsWith('/')) {
            url = 'https://www.chiryo-energie.fr' + url;
          } else if (!url.startsWith('http')) {
            url = 'https://www.chiryo-energie.fr/' + url;
          }
          imageUrls.add(url);
        }
      });
    }
    
    console.log(`Found ${imageUrls.size} images on the website`);
    
    // Try to match service images
    const serviceImageMap = {};
    const serviceNames = ['reiki', 'sophro', 'relaxation', 'reflexologie', 'harmonisation', 'shiatsu', 'magnet', 'medium'];
    
    Array.from(imageUrls).forEach(url => {
      const lowerUrl = url.toLowerCase();
      for (const serviceName of serviceNames) {
        if (lowerUrl.includes(serviceName)) {
          console.log(`  Found potential service image: ${url}`);
          // Try to map to our service IDs
          if (lowerUrl.includes('reiki')) {
            serviceImageMap['reiki'] = url;
          } else if (lowerUrl.includes('sophro')) {
            serviceImageMap['sophro-relaxation'] = url;
          } else if (lowerUrl.includes('reflex')) {
            serviceImageMap['reflexologie'] = url;
          } else if (lowerUrl.includes('harmonisation') || lowerUrl.includes('lymphatique')) {
            serviceImageMap['harmonisation-lymphatique'] = url;
          } else if (lowerUrl.includes('shiatsu')) {
            serviceImageMap['shiatsu-sevrage'] = url;
          } else if (lowerUrl.includes('magnet')) {
            serviceImageMap['magnetiseuse'] = url;
          } else if (lowerUrl.includes('medium')) {
            serviceImageMap['mediumnite'] = url;
          }
        }
      }
    });
    
    return serviceImageMap;
  } catch (error) {
    console.error('Error fetching website:', error.message);
    return {};
  }
}

async function main() {
  const args = process.argv.slice(2);
  const overwrite = args.includes('--overwrite') || args.includes('-f');
  
  console.log('🚀 Starting service image download...\n');
  
  await ensureDir(IMAGE_DIR);
  
  // First, try to find images from the website
  const foundImages = await findImageUrls();
  
  // Merge with our service map
  const imagesToDownload = {};
  
  // Service ID to filename mapping
  const filenameMap = {
    'reiki': 'reiki.jpg',
    'sophro-relaxation': 'sophro-relaxation.jpg',
    'relaxation-energetique': 'relaxation-energetique.jpg',
    'reflexologie': 'reflexologie.jpg',
    'harmonisation-lymphatique': 'harmonisation-lymphatique.jpg',
    'shiatsu-sevrage': 'shiatsu-sevrage.jpg',
    'magnetiseuse': 'magnetisme.jpg',
    'mediumnite': 'mediumnite.jpg'
  };
  
  // Print found images
  if (Object.keys(foundImages).length > 0) {
    console.log('✓ Found service images on website:');
    Object.entries(foundImages).forEach(([serviceId, url]) => {
      console.log(`  ${serviceId}: ${url}`);
    });
    console.log('');
  }
  
  // Use direct URLs from SERVICE_IMAGES first (they're the actual source)
  Object.entries(SERVICE_IMAGES).forEach(([serviceId, imageInfo]) => {
    imagesToDownload[serviceId] = {
      url: imageInfo.url,
      filename: imageInfo.filename || filenameMap[serviceId] || `${serviceId}.jpg`
    };
  });
  
  // Override with found images if they match (but prefer direct URLs)
  // Object.entries(foundImages).forEach(([serviceId, url]) => {
  //   if (!imagesToDownload[serviceId]) {
  //     imagesToDownload[serviceId] = {
  //       url,
  //       filename: filenameMap[serviceId] || `${serviceId}.jpg`
  //     };
  //   }
  // });
  
  // Use the direct URLs from the original website if not found
  Object.entries(filenameMap).forEach(([serviceId, filename]) => {
    if (!imagesToDownload[serviceId]) {
      // Check if we have a direct URL mapping
      if (SERVICE_IMAGES[serviceId]) {
        imagesToDownload[serviceId] = {
          url: SERVICE_IMAGES[serviceId].url,
          filename: SERVICE_IMAGES[serviceId].filename || filename
        };
      } else {
        // Fallback to common URL patterns
        const baseName = filename.replace('.jpg', '');
        const possibleUrls = [
          `https://www.chiryo-energie.fr/images/${filename}`,
          `https://www.chiryo-energie.fr/images/${baseName}.jpg`,
          `https://www.chiryo-energie.fr/assets/images/${filename}`,
          `https://www.chiryo-energie.fr/${filename}`,
          `https://www.chiryo-energie.fr/${baseName}.jpg`,
          `https://www.chiryo-energie.fr/wp-content/uploads/${filename}`,
          `https://www.chiryo-energie.fr/wp-content/uploads/${baseName}.jpg`
        ];
        
        imagesToDownload[serviceId] = {
          url: possibleUrls[0],
          filename,
          tryAlternatives: possibleUrls.slice(1)
        };
      }
    }
  });
  
  console.log(`📥 Downloading ${Object.keys(imagesToDownload).length} images...\n`);
  
  for (const [serviceId, { url, filename, tryAlternatives }] of Object.entries(imagesToDownload)) {
    const filepath = join(IMAGE_DIR, filename);
    
    // Skip if already exists (unless overwrite flag is set)
    if (existsSync(filepath) && !overwrite) {
      console.log(`⏭️  Skipping ${filename} (already exists, use --overwrite to replace)`);
      continue;
    }
    
    let downloaded = false;
    const urlsToTry = [url, ...(tryAlternatives || [])];
    
    for (const tryUrl of urlsToTry) {
      try {
        console.log(`  Trying: ${tryUrl}...`);
        await downloadImage(tryUrl, filepath);
        downloaded = true;
        break;
      } catch (error) {
        if (tryUrl === urlsToTry[urlsToTry.length - 1]) {
          console.error(`✗ Failed to download ${serviceId}: ${error.message}`);
        }
      }
    }
    
    if (!downloaded) {
      console.log(`⚠️  Could not download ${serviceId}. Please check the URL manually.`);
    }
  }
  
  console.log('\n✅ Download complete!');
  console.log(`📂 Images saved to: ${IMAGE_DIR}`);
  console.log('\n💡 Next step: Run the optimization script:');
  console.log('   node scripts/optimize-images.mjs services');
  console.log('\n💡 To overwrite existing images:');
  console.log('   node scripts/download-service-images.mjs --overwrite');
}

main().catch(console.error);

