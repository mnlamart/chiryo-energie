import { describe, it, expect } from 'vitest';
import { getImageServiceUrl } from '../images';
import type { ImageCategory, ImageFormat } from '../../config/images';

describe('images utility functions', () => {
  describe('getImageServiceUrl', () => {
    it('should generate correct URL without variant', () => {
      const url = getImageServiceUrl('test-image', 'hero', 1920, 'avif', null);
      
      expect(url).toBe('/api/images/hero/test-image?w=1920&f=avif');
    });

    it('should generate correct URL with square variant', () => {
      const url = getImageServiceUrl('reiki', 'services', 400, 'webp', 'sq');
      
      expect(url).toBe('/api/images/services/reiki?w=400&f=webp&v=sq');
    });

    it('should generate correct URL with horizontal variant', () => {
      const url = getImageServiceUrl('about-image', 'about', 800, 'jpeg', 'h');
      
      expect(url).toBe('/api/images/about/about-image?w=800&f=jpeg&v=h');
    });

    it('should sanitize image name with extension', () => {
      const url = getImageServiceUrl('test-image.jpg', 'services', 400, 'webp', null);
      
      expect(url).toBe('/api/images/services/test-image?w=400&f=webp');
    });

    it('should handle all image formats', () => {
      const formats: ImageFormat[] = ['avif', 'webp', 'jpeg'];
      
      formats.forEach((format) => {
        const url = getImageServiceUrl('test', 'services', 400, format, null);
        expect(url).toContain(`f=${format}`);
      });
    });

    it('should handle all categories', () => {
      const categories: ImageCategory[] = ['hero', 'services', 'testimonials', 'about', 'logos', 'qui-suis-je'];
      
      categories.forEach((category) => {
        const url = getImageServiceUrl('test', category, 400, 'webp', null);
        expect(url).toContain(`/api/images/${category}/`);
      });
    });

    it('should handle various sizes', () => {
      const sizes = [96, 200, 400, 800, 1200, 1920];
      
      sizes.forEach((size) => {
        const url = getImageServiceUrl('test', 'services', size, 'webp', null);
        expect(url).toContain(`w=${size}`);
      });
    });

    it('should not include variant parameter when null', () => {
      const url = getImageServiceUrl('test', 'hero', 1920, 'avif', null);
      
      expect(url).not.toContain('v=');
      expect(url.split('&').length).toBe(2); // Only w and f parameters
    });

    it('should include variant parameter when provided', () => {
      const url = getImageServiceUrl('test', 'services', 400, 'webp', 'sq');
      
      expect(url).toContain('v=sq');
      expect(url.split('&').length).toBe(3); // w, f, and v parameters
    });
  });
});

