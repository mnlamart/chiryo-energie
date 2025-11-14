// Re-export image types for convenience
export type {
  ImageCategory,
  ImageVariant,
  ImageFormat,
} from '../config/images';

export interface Service {
  id: string;
  title: string;
  description: string;
  /**
   * Short description for service cards on listing pages
   * Falls back to description if not provided
   */
  servicesPageDescription?: string;
  price: string;
  duration?: string;
  notes?: string;
  /**
   * SEO-optimized meta description (150-160 characters, complete sentences)
   * Required for all services to ensure proper SEO
   */
  metaDescription: string;
  /**
   * Image reference - can be:
   * - Full path: "/images/services/reiki.jpg"
   * - Base name: "reiki" (will be resolved based on category)
   */
  image?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  rating?: number;
  role?: string;
}

