import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from './Container';
import { testimonials } from '../data/testimonials';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // Use actual testimonials count, not carousel slides count
    setCount(testimonials.length);
    
    const updateCurrent = () => {
      const selected = api.selectedScrollSnap();
      // Normalize to actual testimonials count for display
      const normalizedIndex = selected % testimonials.length;
      setCurrent(normalizedIndex + 1);
      setSelectedIndex(normalizedIndex);
    };

    updateCurrent();

    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  return (
    <section id="temoignages" className="py-20 bg-brand-bg" aria-labelledby="testimonials-heading">
      <Container>
        {/* Header */}
        <header className="text-center mb-16 px-4">
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Témoignages de transformation
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment Chiryo Energie a aidé d'autres personnes à
            Joué-Les-Tours et Tours à transformer leur vie et à atteindre un
            bien-être durable. Laissez-vous inspirer par leurs histoires et
            imaginez votre propre succès.
          </p>
        </header>

        {/* Carousel */}
        <div className="relative px-4">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
              dragFree: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {/* Duplicate testimonials multiple times to ensure smooth looping on larger screens where multiple items are visible */}
              {/* With 3 items visible on large screens, we need at least 12 slides (4 testimonials x 3) for seamless looping */}
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => {
                // Use modulo to get the actual testimonial index for active state and display
                const actualIndex = index % testimonials.length;
                const isActive = actualIndex === selectedIndex;
                const rating = testimonial.rating || 5;
                const role = testimonial.role || "Client Chiryo Energie";

                return (
                  <CarouselItem key={`${testimonial.id}-${index}`} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div 
                        className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden ${
                          isActive ? 'scale-100' : 'scale-95'
                        }`}
                      >
                        {/* Gradient Top Border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400"></div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i}>
                              <svg
                                className={`w-5 h-5 ${
                                  i < rating ? "text-orange-400" : "text-gray-200"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            </div>
                          ))}
                        </div>

                        {/* Testimonial Text with Quote */}
                        <div className="relative mb-6 grow">
                          <span
                            className="absolute -top-2 -left-2 text-5xl text-orange-100 select-none"
                            style={{ fontFamily: "Georgia, serif" }}
                          >
                            "
                          </span>
                          <p className="text-gray-700 leading-relaxed relative z-10 italic">
                            {testimonial.text}
                          </p>
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                          {testimonial.avatar ? (() => {
                            // Extract base filename without extension
                            const basePath = testimonial.avatar.replace(/\.(jpg|jpeg|png|webp)$/i, '');
                            const imageName = basePath.split('/').pop();
                            const imageDir = basePath.substring(0, basePath.lastIndexOf('/'));
                            
                            return (
                              <picture>
                                <source
                                  type="image/avif"
                                  srcSet={`${imageDir}/${imageName}-150w.avif`}
                                />
                                <source
                                  type="image/webp"
                                  srcSet={`${imageDir}/${imageName}-150w.webp`}
                                />
                                <img
                                  src={`${imageDir}/${imageName}-150w.jpg`}
                                  alt={testimonial.author}
                                  className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-100"
                                  width={150}
                                  height={150}
                                  loading="lazy"
                                  decoding="async"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    if (!target.src.includes('.webp')) {
                                      target.src = target.src.replace('.jpg', '.webp');
                                    } else if (!target.src.includes('placeholder')) {
                                      target.src = '/images/testimonials/placeholder.jpg';
                                    }
                                  }}
                                />
                              </picture>
                            );
                          })() : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 ring-2 ring-orange-100 flex items-center justify-center">
                              <span className="text-gray-400 text-lg font-semibold">
                                {testimonial.author.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="text-gray-900 font-medium">{testimonial.author}</p>
                            <p className="text-gray-500 text-sm">{role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Navigation Buttons */}
            <button
              onClick={() => api?.scrollPrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
              disabled={false}
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
              disabled={false}
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </Carousel>

          {/* Counter */}
          {count > 0 && (
            <div className="text-center mt-8">
              <div className="inline-flex gap-2 items-center">
                {Array.from({ length: count }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === current - 1
                        ? "w-8 bg-pink-400"
                        : "w-1 bg-pink-200"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-3 text-gray-600">
                {current} / {count}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
