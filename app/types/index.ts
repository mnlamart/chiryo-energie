export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration?: string;
  notes?: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  avatar?: string;
}

