import Container from './Container';
import ResponsiveImage from './ResponsiveImage';
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
              <ResponsiveImage
                src="logo-noella-high"
                category="logos"
                alt="Chiryo Energie Logo"
                className="h-40 md:h-56 w-auto object-contain"
                sizes="(max-width: 768px) 250px, 350px"
                width={350}
                height={140}
                loading="eager"
                decoding="async"
                objectFit="contain"
                customSizes={[200, 300, 400]}
              />
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
                  <ResponsiveImage
                    src="about-image"
                    category="about"
                    variant="h"
                    alt="Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours, magnétiseuse coupeuse de feu, voyante et médium"
                    className="w-full h-full object-cover"
                    sizes="100vw"
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Desktop: Full original image */}
                <div className="relative hidden lg:block w-full h-full overflow-hidden">
                  <ResponsiveImage
                    src="about-image"
                    category="about"
                    alt="Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours, magnétiseuse coupeuse de feu, voyante et médium"
                    className="w-full h-full object-cover"
                    sizes="50vw"
                    width={800}
                    loading="lazy"
                    decoding="async"
                  />
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

