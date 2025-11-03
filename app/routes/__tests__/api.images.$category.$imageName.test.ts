import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loader } from '../api.images.$category.$imageName';
import type { LoaderFunctionArgs } from 'react-router';

// Mock the image service
vi.mock('../../utils/image-service.server', () => ({
  getTransformedImage: vi.fn(),
}));

import { getTransformedImage } from '../../utils/image-service.server';
const mockGetTransformedImage = vi.mocked(getTransformedImage);

describe('api.images.$category.$imageName', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockRequest = (
    category: string,
    imageName: string,
    params: { w?: string; f?: string; v?: string } = {}
  ): LoaderFunctionArgs => {
    const searchParams = new URLSearchParams();
    if (params.w) searchParams.set('w', params.w);
    if (params.f) searchParams.set('f', params.f);
    if (params.v) searchParams.set('v', params.v);

    const url = `http://localhost/api/images/${category}/${imageName}?${searchParams.toString()}`;
    
    return {
      params: { category, imageName },
      request: new Request(url),
      context: {},
      route: { id: 'api.images.$category.$imageName' },
    } as unknown as LoaderFunctionArgs;
  };

  describe('loader', () => {
    it('should return 400 when category is missing', async () => {
      const args = {
        params: {},
        request: new Request('http://localhost/api/images//test-image'),
      } as unknown as LoaderFunctionArgs;

      const response = await loader(args);
      expect(response.status).toBe(400);
    });

    it('should return 400 when image name is missing', async () => {
      const args = createMockRequest('services', '', { w: '400', f: 'webp' });

      const response = await loader(args);
      expect(response.status).toBe(400);
    });

    it('should return 400 when width parameter is missing', async () => {
      const args = createMockRequest('services', 'test-image', { f: 'webp' });

      const response = await loader(args);
      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain('width parameter');
    });

    it('should return 400 when width is invalid', async () => {
      const args = createMockRequest('services', 'test-image', { w: 'invalid', f: 'webp' });

      const response = await loader(args);
      expect(response.status).toBe(400);
    });

    it('should return 400 when width is not a valid size for category', async () => {
      const args = createMockRequest('services', 'test-image', { w: '9999', f: 'webp' });

      const response = await loader(args);
      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain('Invalid size');
    });

    it('should return 400 when format parameter is missing', async () => {
      const args = createMockRequest('services', 'test-image', { w: '400' });

      const response = await loader(args);
      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain('format parameter');
    });

    it('should return 400 when format is invalid', async () => {
      const args = createMockRequest('services', 'test-image', { w: '400', f: 'invalid' });

      const response = await loader(args);
      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain('Invalid format');
    });

    it('should return 400 when variant is invalid', async () => {
      const args = createMockRequest('services', 'test-image', { w: '400', f: 'webp', v: 'invalid' });

      const response = await loader(args);
      expect(response.status).toBe(400);
      const text = await response.text();
      expect(text).toContain('Invalid variant');
    });

    it('should return 400 when category is invalid', async () => {
      const args = createMockRequest('invalid-category', 'test-image', { w: '400', f: 'webp' });

      const response = await loader(args);
      expect(response.status).toBe(400);
    });

    it('should successfully transform and return image', async () => {
      const mockBuffer = Buffer.from('fake-image-data');
      mockGetTransformedImage.mockResolvedValue(mockBuffer);

      const args = createMockRequest('services', 'test-image', { w: '400', f: 'webp', v: 'sq' });

      const response = await loader(args);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('image/webp');
      expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
      expect(response.headers.get('ETag')).toBeTruthy();

      const body = await response.arrayBuffer();
      expect(Buffer.from(body)).toEqual(mockBuffer);

      expect(mockGetTransformedImage).toHaveBeenCalledWith({
        category: 'services',
        imageName: 'test-image',
        size: 400,
        format: 'webp',
        variant: 'sq',
      });
    });

    it('should handle null variant when not provided', async () => {
      const mockBuffer = Buffer.from('fake-image-data');
      mockGetTransformedImage.mockResolvedValue(mockBuffer);

      const args = createMockRequest('hero', 'test-hero', { w: '1920', f: 'avif' });

      const response = await loader(args);
      
      expect(response.status).toBe(200);
      expect(mockGetTransformedImage).toHaveBeenCalledWith({
        category: 'hero',
        imageName: 'test-hero',
        size: 1920,
        format: 'avif',
        variant: null,
      });
    });

    it('should set correct Content-Type for AVIF', async () => {
      const mockBuffer = Buffer.from('fake-avif-data');
      mockGetTransformedImage.mockResolvedValue(mockBuffer);

      const args = createMockRequest('services', 'test-image', { w: '400', f: 'avif' });

      const response = await loader(args);
      expect(response.headers.get('Content-Type')).toBe('image/avif');
    });

    it('should set correct Content-Type for JPEG', async () => {
      const mockBuffer = Buffer.from('fake-jpeg-data');
      mockGetTransformedImage.mockResolvedValue(mockBuffer);

      const args = createMockRequest('services', 'test-image', { w: '400', f: 'jpeg' });

      const response = await loader(args);
      expect(response.headers.get('Content-Type')).toBe('image/jpeg');
    });

    it('should return 404 when source image is not found', async () => {
      mockGetTransformedImage.mockRejectedValue(new Error('Source image not found: ...'));

      const args = createMockRequest('services', 'non-existent', { w: '400', f: 'webp' });

      const response = await loader(args);
      expect(response.status).toBe(404);
    });

    it('should return 400 when variant is invalid for category', async () => {
      mockGetTransformedImage.mockRejectedValue(
        new Error('Variant sq is not valid for category testimonials')
      );

      const args = createMockRequest('testimonials', 'test', { w: '150', f: 'webp', v: 'sq' });

      const response = await loader(args);
      expect(response.status).toBe(400);
    });

    it('should return 500 for unexpected errors', async () => {
      mockGetTransformedImage.mockRejectedValue(new Error('Unexpected error'));

      const args = createMockRequest('services', 'test-image', { w: '400', f: 'webp' });

      const response = await loader(args);
      expect(response.status).toBe(500);
      const text = await response.text();
      expect(text).toBe('Internal server error');
    });
  });
});

