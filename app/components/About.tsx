import Container from './Container';
import { aboutContent } from '../data/content';

export default function About() {
  return (
    <section className="py-16 md:py-24 bg-brand-bg" aria-labelledby="about-heading">
      <Container>
        <article className="max-w-6xl mx-auto">
          {/* Header Section with Name and Logo */}
          <div className="text-center mb-12 md:mb-16">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/logos/logo-noella-high-200w.avif 200w,
                          /images/logos/logo-noella-high-300w.avif 300w,
                          /images/logos/logo-noella-high-400w.avif 400w"
                  sizes="(max-width: 768px) 250px, 350px"
                />
                <source
                  type="image/webp"
                  srcSet="/images/logos/logo-noella-high-200w.webp 200w,
                          /images/logos/logo-noella-high-300w.webp 300w,
                          /images/logos/logo-noella-high-400w.webp 400w"
                  sizes="(max-width: 768px) 250px, 350px"
                />
                <source
                  type="image/jpeg"
                  srcSet="/images/logos/logo-noella-high-200w.jpg 200w,
                          /images/logos/logo-noella-high-300w.jpg 300w,
                          /images/logos/logo-noella-high-400w.jpg 400w"
                  sizes="(max-width: 768px) 250px, 350px"
                />
                <img 
                  src="/images/logos/logo-noella-high-300w.jpg" 
                  alt="Chiryo Energie Logo" 
                  className="h-40 md:h-56 w-auto object-contain"
                  width={350}
                  height={140}
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>

            {/* Name */}
            <h2 id="about-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {aboutContent.name}
            </h2>
            
            {/* Intro */}
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {aboutContent.intro}
            </p>
          </div>

          {/* Main Content - Image and Text in Same Card */}
          <div className="bg-brand-card rounded-2xl shadow-lg border border-white/40 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
              {/* Image */}
              <div className="w-full">
                {/* Mobile: Horizontal cropped image (4:3) - shows more of original */}
                <div className="relative aspect-[4/3] lg:hidden w-full overflow-hidden">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/about/about-image-h-400w.avif 400w,
                              /images/about/about-image-h-600w.avif 600w,
                              /images/about/about-image-h-800w.avif 800w,
                              /images/about/about-image-h-1000w.avif 1000w"
                      sizes="100vw"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/about/about-image-h-400w.webp 400w,
                              /images/about/about-image-h-600w.webp 600w,
                              /images/about/about-image-h-800w.webp 800w,
                              /images/about/about-image-h-1000w.webp 1000w"
                      sizes="100vw"
                    />
                    <source
                      type="image/jpeg"
                      srcSet="/images/about/about-image-h-400w.jpg 400w,
                              /images/about/about-image-h-600w.jpg 600w,
                              /images/about/about-image-h-800w.jpg 800w,
                              /images/about/about-image-h-1000w.jpg 1000w"
                      sizes="100vw"
                    />
                    <img 
                      src="/images/about/about-image-h-800w.jpg" 
                      alt="Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours, magnétiseuse coupeuse de feu, voyante et médium" 
                      className="w-full h-full object-cover"
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>

                {/* Desktop: Full original image */}
                <div className="relative hidden lg:block w-full h-full overflow-hidden">
                  <picture>
                    <source
                      type="image/avif"
                      srcSet="/images/about/about-image-400w.avif 400w,
                              /images/about/about-image-600w.avif 600w,
                              /images/about/about-image-800w.avif 800w,
                              /images/about/about-image-1000w.avif 1000w"
                      sizes="50vw"
                    />
                    <source
                      type="image/webp"
                      srcSet="/images/about/about-image-400w.webp 400w,
                              /images/about/about-image-600w.webp 600w,
                              /images/about/about-image-800w.webp 800w,
                              /images/about/about-image-1000w.webp 1000w"
                      sizes="50vw"
                    />
                    <source
                      type="image/jpeg"
                      srcSet="/images/about/about-image-400w.jpg 400w,
                              /images/about/about-image-600w.jpg 600w,
                              /images/about/about-image-800w.jpg 800w,
                              /images/about/about-image-1000w.jpg 1000w"
                      sizes="50vw"
                    />
                    <img 
                      src="/images/about/about-image-800w.jpg" 
                      alt="Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours, magnétiseuse coupeuse de feu, voyante et médium" 
                      className="w-full h-full object-cover"
                      width={800}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 md:p-8 space-y-5 md:space-y-6">
                <div className="text-gray-700 leading-relaxed">
                  {aboutContent.paragraphs.map((paragraph, index) => {
                    // Enhance paragraph about working locations with more specific location keywords
                    if (paragraph.includes('à distance, en présentiel, à domicile')) {
                      return (
                        <p key={index} className="text-base md:text-lg mb-5 md:mb-6 last:mb-0">
                          {paragraph} Mes consultations sont disponibles à Joué-Les-Tours et dans tout le département d'Indre-et-Loire (région Centre-Val de Loire).
                        </p>
                      );
                    }
                    return (
                      <p key={index} className="text-base md:text-lg mb-5 md:mb-6 last:mb-0">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}

