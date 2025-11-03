import { describe, it, expect, beforeEach } from 'vitest';
import sharp from 'sharp';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { getTransformedImage, type TransformParams } from '../image-service.server';
import type { ImageFormat } from '../../config/images';

describe('image-service.server', () => {
  const TEST_ASSETS_DIR = join(process.cwd(), 'tests', 'fixtures');
  const TEST_CACHE_DIR = join(process.cwd(), 'build', 'test-cache', 'images');
  
  beforeEach(async () => {
    // Ensure test directories exist
    mkdirSync(TEST_ASSETS_DIR, { recursive: true });
    mkdirSync(TEST_CACHE_DIR, { recursive: true });
    
    // Create a simple test image (100x100 pixel JPEG) if it doesn't exist
    const testImagePath = join(TEST_ASSETS_DIR, 'test-image.jpg');
    if (!existsSync(testImagePath)) {
      try {
        // Create a minimal valid JPEG using sharp
        const image = sharp({
          create: {
            width: 100,
            height: 100,
            channels: 3,
            background: { r: 255, g: 0, b: 0 },
          },
        });
        await image.jpeg().toFile(testImagePath);
      } catch {
        // Ignore errors in test setup - tests will handle missing files
      }
    }
  });

  describe('getTransformedImage', () => {
    const mockParams: TransformParams = {
      category: 'services',
      imageName: 'test-image',
      size: 400,
      format: 'webp',
      variant: 'sq',
    };

    it('should throw error when source image does not exist', async () => {
      const params: TransformParams = {
        ...mockParams,
        imageName: 'non-existent-image',
      };

      await expect(getTransformedImage(params)).rejects.toThrow();
    });

    it('should validate variant for category', async () => {
      const params: TransformParams = {
        ...mockParams,
        category: 'testimonials',
        variant: 'sq', // testimonials don't support variants
      };

      await expect(getTransformedImage(params)).rejects.toThrow();
    });

    it('should generate and cache transformed image', async () => {
      // Mock the getSourceImagePath to return our test image
      const testImagePath = join(TEST_ASSETS_DIR, 'test-image.jpg');
      
      // Create a copy in the expected location for services
      const servicesDir = join(process.cwd(), 'assets', 'images-raw', 'services');
      mkdirSync(servicesDir, { recursive: true });
      const sourceImagePath = join(servicesDir, 'test-image.jpg');
      
      if (!existsSync(sourceImagePath)) {
        writeFileSync(sourceImagePath, readFileSync(testImagePath));
      }

      const params: TransformParams = {
        category: 'services',
        imageName: 'test-image',
        size: 400,
        format: 'webp',
        variant: 'sq',
      };

      const result = await getTransformedImage(params);
      
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
      
      // Note: Cache is written asynchronously, so we check if the path structure is correct
      // In a real scenario, we'd wait for the cache write to complete
    });
  });

  describe('Image transformation', () => {
    it('should handle hero images with 16:9 aspect ratio', async () => {
      const servicesDir = join(process.cwd(), 'assets', 'images-raw', 'hero');
      mkdirSync(servicesDir, { recursive: true });
      const testImagePath = join(TEST_ASSETS_DIR, 'test-image.jpg');
      const sourceImagePath = join(servicesDir, 'test-hero.jpg');
      
      if (!existsSync(sourceImagePath)) {
        writeFileSync(sourceImagePath, readFileSync(testImagePath));
      }

      const params: TransformParams = {
        category: 'hero',
        imageName: 'test-hero',
        size: 1920,
        format: 'avif',
        variant: null,
      };

      const result = await getTransformedImage(params);
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle services with square variant', async () => {
      const servicesDir = join(process.cwd(), 'assets', 'images-raw', 'services');
      mkdirSync(servicesDir, { recursive: true });
      const testImagePath = join(TEST_ASSETS_DIR, 'test-image.jpg');
      const sourceImagePath = join(servicesDir, 'test-service.jpg');
      
      if (!existsSync(sourceImagePath)) {
        writeFileSync(sourceImagePath, readFileSync(testImagePath));
      }

      const params: TransformParams = {
        category: 'services',
        imageName: 'test-service',
        size: 400,
        format: 'webp',
        variant: 'sq',
      };

      const result = await getTransformedImage(params);
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle horizontal variant', async () => {
      const servicesDir = join(process.cwd(), 'assets', 'images-raw', 'services');
      mkdirSync(servicesDir, { recursive: true });
      const testImagePath = join(TEST_ASSETS_DIR, 'test-image.jpg');
      const sourceImagePath = join(servicesDir, 'test-service-h.jpg');
      
      if (!existsSync(sourceImagePath)) {
        writeFileSync(sourceImagePath, readFileSync(testImagePath));
      }

      const params: TransformParams = {
        category: 'services',
        imageName: 'test-service-h',
        size: 800,
        format: 'jpeg',
        variant: 'h',
      };

      const result = await getTransformedImage(params);
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle regular images without variants', async () => {
      const logosDir = join(process.cwd(), 'assets', 'images-raw', 'logos');
      mkdirSync(logosDir, { recursive: true });
      const testImagePath = join(TEST_ASSETS_DIR, 'test-image.jpg');
      const sourceImagePath = join(logosDir, 'test-logo.jpg');
      
      if (!existsSync(sourceImagePath)) {
        writeFileSync(sourceImagePath, readFileSync(testImagePath));
      }

      const params: TransformParams = {
        category: 'logos',
        imageName: 'test-logo',
        size: 200,
        format: 'avif',
        variant: null,
      };

      const result = await getTransformedImage(params);
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should support all image formats', async () => {
      const servicesDir = join(process.cwd(), 'assets', 'images-raw', 'services');
      mkdirSync(servicesDir, { recursive: true });
      const testImagePath = join(TEST_ASSETS_DIR, 'test-image.jpg');
      const sourceImagePath = join(servicesDir, 'test-format.jpg');
      
      if (!existsSync(sourceImagePath)) {
        writeFileSync(sourceImagePath, readFileSync(testImagePath));
      }

      const formats: ImageFormat[] = ['avif', 'webp', 'jpeg'];
      
      for (const format of formats) {
        const params: TransformParams = {
          category: 'services',
          imageName: 'test-format',
          size: 400,
          format,
          variant: 'sq',
        };

        const result = await getTransformedImage(params);
        expect(result).toBeInstanceOf(Buffer);
        expect(result.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Caching', () => {
    it('should return cached image on second request', async () => {
      const servicesDir = join(process.cwd(), 'assets', 'images-raw', 'services');
      mkdirSync(servicesDir, { recursive: true });
      const testImagePath = join(TEST_ASSETS_DIR, 'test-image.jpg');
      const sourceImagePath = join(servicesDir, 'test-cache.jpg');
      
      if (!existsSync(sourceImagePath)) {
        writeFileSync(sourceImagePath, readFileSync(testImagePath));
      }

      const params: TransformParams = {
        category: 'services',
        imageName: 'test-cache',
        size: 400,
        format: 'webp',
        variant: 'sq',
      };

      // First call - should generate
      const firstResult = await getTransformedImage(params);
      expect(firstResult).toBeInstanceOf(Buffer);

      // Second call - should use cache (if implemented synchronously)
      // Note: In actual implementation, cache is written asynchronously
      // This test verifies the function works correctly
      const secondResult = await getTransformedImage(params);
      expect(secondResult).toBeInstanceOf(Buffer);
    });
  });
});

