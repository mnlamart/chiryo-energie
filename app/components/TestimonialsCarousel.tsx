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
    <section className="py-20 bg-white" aria-labelledby="testimonials-heading">
      <Container>
        <header className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Témoignages de transformation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment Chiryo Energie a aidé d'autres personnes à Joué-Les-Tours et Tours à transformer leur vie et à atteindre un bien-être durable. Laissez-vous inspirer par leurs histoires et imaginez votre propre succès.
          </p>
        </header>
        
        <div className="max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Testimonial Card */}
            <div className="bg-gradient-to-br from-primary-50 to-warm-50 rounded-lg p-8 shadow-lg border border-primary-100 min-h-[300px] flex flex-col justify-center transition-opacity duration-500">
              <div className="flex items-start gap-6 mb-6">
                {testimonials[currentIndex].avatar && (
      <picture>
        <source
          type="image/avif"
          srcSet={testimonials[currentIndex].avatar.replace(/\.(jpg|jpeg|png|webp)$/i, '-150w.avif')}
        />
                    <source
                      type="image/webp"
                      srcSet={testimonials[currentIndex].avatar.replace(/\.(jpg|jpeg|png)$/i, '-150w.webp')}
                    />
                    <img 
                      src={testimonials[currentIndex].avatar.replace(/\.(jpg|jpeg|png)$/i, '-150w.jpg')}
                      alt={testimonials[currentIndex].author}
                      className="w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-primary-200"
                      width={150}
                      height={150}
                      loading="lazy"
                    />
                  </picture>
                )}
                <div className="flex-1">
                  <p className="text-gray-700 italic leading-relaxed text-lg mb-4">
                    "{testimonials[currentIndex].text}"
                  </p>
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-warm-500 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-semibold text-primary-600 text-lg">
                    — {testimonials[currentIndex].author}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Témoignage précédent"
            >
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Témoignage suivant"
            >
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

