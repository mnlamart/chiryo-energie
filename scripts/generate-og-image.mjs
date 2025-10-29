import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const outputPath = join(projectRoot, 'public', 'og-image.jpg');

// Logo path - can be provided as command line argument or default locations
const logoArg = process.argv[2];
const possibleLogoPaths = logoArg 
  ? [logoArg]
  : [
      join(projectRoot, 'public', 'logo.webp'),
      join(projectRoot, 'public', 'logo.png'),
      join(projectRoot, 'public', 'logo.jpg'),
      join(projectRoot, 'public', 'logo.svg'),
      join(projectRoot, 'src', 'assets', 'logo.webp'),
      join(projectRoot, 'src', 'assets', 'logo.png'),
      join(projectRoot, 'src', 'assets', 'logo.jpg'),
      join(projectRoot, 'src', 'assets', 'logo.svg'),
    ];

let logoPath = null;
for (const path of possibleLogoPaths) {
  if (existsSync(path)) {
    logoPath = path;
    break;
  }
}

// Create SVG buffer for the OG image
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f5ead8;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#e8d5c4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#d4c5b0;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="decorative-1" cx="20%" cy="50%">
      <stop offset="0%" style="stop-color:#8B4513;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#8B4513;stop-opacity:0" />
    </radialGradient>
    <radialGradient id="decorative-2" cx="80%" cy="50%">
      <stop offset="0%" style="stop-color:#8B4513;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#8B4513;stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg-gradient)"/>
  
  <!-- Decorative gradients -->
  <rect width="1200" height="630" fill="url(#decorative-1)" opacity="0.6"/>
  <rect width="1200" height="630" fill="url(#decorative-2)" opacity="0.6"/>
  
  <!-- Decorative circles -->
  <circle cx="1050" cy="80" r="150" fill="none" stroke="#8B4513" stroke-width="3" opacity="0.2"/>
  <circle cx="1120" cy="140" r="100" fill="none" stroke="#8B4513" stroke-width="2" opacity="0.15"/>
  
  <!-- Main content -->
  <g>
    <!-- Brand name -->
    <text x="100" y="280" font-family="Georgia, serif" font-size="72" font-weight="700" fill="#8B4513" letter-spacing="-1">
      Chiryo Energie
    </text>
    
    <!-- Tagline -->
    <text x="100" y="340" font-family="Arial, sans-serif" font-size="32" font-weight="500" fill="#4a4a4a" font-style="italic">
      Votre énergie, votre chemin, l'équilibre à portée de mains
    </text>
    
    <!-- Subtitle with border accent -->
    <rect x="100" y="440" width="4" height="40" fill="#8B4513"/>
    <text x="120" y="465" font-family="Arial, sans-serif" font-size="28" font-weight="400" fill="#6b6b6b">
      Psycho énergéticienne à Joué-Les-Tours
    </text>
  </g>
</svg>`;

try {
  // Create the base SVG background
  const svgBuffer = Buffer.from(svgContent);
  
  // Start with the SVG background
  let image = sharp(svgBuffer).resize(1200, 630);
  
  // If logo exists, composite it onto the image
  if (logoPath) {
    console.log('🎨 Found logo at:', logoPath);
    
    // Load and resize logo (max 200px height, maintain aspect ratio)
    const logo = await sharp(logoPath)
      .resize(200, 200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();
    
    // Get logo dimensions
    const logoMetadata = await sharp(logo).metadata();
    const logoWidth = logoMetadata.width;
    const logoHeight = logoMetadata.height;
    
    // Position logo at top-left (with padding)
    const logoX = 80;
    const logoY = 60;
    
    // Composite the logo onto the background
    image = image.composite([
      {
        input: logo,
        top: logoY,
        left: logoX
      }
    ]);
    
    console.log(`   Positioned at (${logoX}, ${logoY}), size: ${logoWidth}x${logoHeight}px`);
  } else {
    console.log('ℹ️  No logo found. Using text-only version.');
    console.log('   Tip: Place logo at public/logo.webp, logo.png, logo.jpg, or logo.svg');
    console.log('   Or provide path as argument: node scripts/generate-og-image.mjs /path/to/logo.webp');
  }
  
  // Generate final JPG
  await image
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outputPath);
  
  console.log('');
  console.log('✅ OG image created successfully at:', outputPath);
  console.log('📐 Dimensions: 1200x630px');
  console.log('🎨 Format: JPG (quality: 90%)');
  if (logoPath) {
    console.log('🖼️  Logo: Included');
  }
} catch (error) {
  console.error('❌ Error generating image:', error.message);
  process.exit(1);
}

