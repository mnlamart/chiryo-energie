import { useState, useEffect, useRef } from 'react';
import Container from './Container';
import { testimonials } from '../data/testimonials';

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    // Resume after 10 seconds
    void setTimeout(() => setIsPaused(false), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsPaused(true);
    void setTimeout(() => setIsPaused(false), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setIsPaused(true);
    void setTimeout(() => setIsPaused(false), 10000);
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  return (
    <section className="py-20 bg-brand-bg" aria-labelledby="testimonials-heading">
      <Container>
        <header className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Témoignages de transformation
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment Chiryo Energie a aidé d'autres personnes à Joué-Les-Tours et Tours à transformer leur vie et à atteindre un bien-être durable. Laissez-vous inspirer par leurs histoires et imaginez votre propre succès.
          </p>
        </header>
        
        <div className="max-w-2xl mx-auto">
          {/* Carousel Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Testimonial Card */}
            <div className="bg-brand-card p-5 md:p-6 shadow-lg border border-white/40 min-h-[200px] flex flex-col justify-center transition-opacity duration-500">
              {/* Stars Rating */}
              <div className="flex items-center justify-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 text-warm-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <div className="mb-4">
                <svg 
                  className="w-6 h-6 md:w-8 md:h-8 text-brand-hover mb-2 mx-auto"
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.433.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z"/>
                </svg>
                <p className="text-base md:text-lg text-gray-900 leading-relaxed text-center font-medium mb-3">
                  {testimonials[currentIndex].text}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-center gap-3 pt-4 border-t border-white/60">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-200 shrink-0 border-2 border-white/60 flex items-center justify-center">
                  <span className="text-gray-400 text-lg md:text-xl font-semibold">
                    {testimonials[currentIndex].author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-center md:text-left">
                  <p className="font-bold text-primary-600 text-sm md:text-base">
                    {testimonials[currentIndex].author}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Client Chiryo Energie
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-20 lg:-translate-x-24 bg-brand-card rounded-full p-4 shadow-xl hover:bg-white/40 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 border-2 border-white/60"
              aria-label="Témoignage précédent"
            >
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-20 lg:translate-x-24 bg-brand-card rounded-full p-4 shadow-xl hover:bg-white/40 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 border-2 border-white/60"
              aria-label="Témoignage suivant"
            >
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full ${
                  index === currentIndex
                    ? 'bg-brand-hover h-3 w-12'
                    : 'bg-white/60 hover:bg-white/80 h-3 w-3'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>

          {/* Testimonial Counter */}
          <div className="text-center mt-4 text-sm text-gray-600">
            {currentIndex + 1} / {testimonials.length}
          </div>
        </div>
      </Container>
    </section>
  );
}

