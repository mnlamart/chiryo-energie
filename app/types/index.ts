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
  price: string;
  duration?: string;
  notes?: string;
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

