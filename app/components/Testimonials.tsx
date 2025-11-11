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
    <section id="temoignages" className="py-12 md:py-16 bg-brand-bg" aria-labelledby="testimonials-heading">
      <Container>
        {/* Header */}
        <header className="text-center mb-16 px-4">
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#2C1B1D' }}>
            Témoignages de transformation
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B4B4E' }}>
                Découvrez comment Chiryo Energie a aidé d'autres personnes à
                Joué-Les-Tours à transformer leur vie et à atteindre un
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

                return (
                  <CarouselItem key={`${testimonial.id}-${index}`} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div 
                        className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden ${
                          isActive ? 'scale-100' : 'scale-95'
                        }`}
                      >
                        {/* Gradient Top Border */}
                        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(to right, rgb(249, 232, 233), #F5E8E9, rgb(249, 232, 233))' }}></div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-6">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i}>
                              <svg
                                className={`w-5 h-5 ${
                                  i < (testimonial.rating ?? 5) ? "" : "text-[#F5E8E9]"
                                }`}
                                style={{
                                  color: i < (testimonial.rating ?? 5) ? 'rgb(246, 210, 210)' : undefined
                                }}
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
                            className="absolute -top-2 -left-2 text-5xl select-none"
                            style={{ fontFamily: "Georgia, serif", color: '#D4A5A9' }}
                          >
                            "
                          </span>
                          <p className="text-[#6B4B4E] leading-relaxed relative z-10 italic">
                            {testimonial.text}
                          </p>
                        </div>

                        {/* Author */}
                        <div className="pt-4 border-t" style={{ borderColor: 'rgb(246, 210, 210)' }}>
                          <p className="text-[#2C1B1D] font-medium">{testimonial.author}</p>
                          <p className="text-[#6B4B4E] text-sm">{testimonial.role ?? "Client Chiryo Energie"}</p>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'rgb(246, 210, 210)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D4A5A9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(246, 210, 210)'}
              aria-label="Previous testimonial"
              disabled={false}
            >
              <ChevronLeft className="w-6 h-6" style={{ color: '#6B4B4E' }} />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'rgb(246, 210, 210)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D4A5A9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(246, 210, 210)'}
              aria-label="Next testimonial"
              disabled={false}
            >
              <ChevronRight className="w-6 h-6" style={{ color: '#6B4B4E' }} />
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
                      i === current - 1 ? "w-8" : "w-1"
                    }`}
                    style={{
                      backgroundColor: i === current - 1 ? '#D4A5A9' : 'rgb(246, 210, 210)'
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 text-[#6B4B4E]">
                {current} / {count}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
