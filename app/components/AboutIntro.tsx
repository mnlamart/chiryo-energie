import { Link } from 'react-router-dom';
import Container from './Container';

export default function AboutIntro() {
  return (
    <section className="py-12 md:py-16 bg-brand-bg" aria-labelledby="about-intro-heading">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Text and Logo */}
          <div className="space-y-6 md:space-y-8">
            {/* Intro Text */}
            <div className="space-y-3">
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                Je suis ravie de vous accueillir là où débute votre histoire.
              </p>
              <p className="text-base md:text-lg text-gray-900 leading-relaxed">
                Rejoignez-moi pour atteindre votre plein potentiel, ensemble!
              </p>
            </div>

            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <picture>
                <source
                  type="image/avif"
                  srcSet="/images/logos/logo-noella-high-400w.avif 400w"
                  sizes="400px"
                />
                <source
                  type="image/webp"
                  srcSet="/images/logos/logo-noella-high-400w.webp 400w"
                  sizes="400px"
                />
                <source
                  type="image/jpeg"
                  srcSet="/images/logos/logo-noella-high-400w.jpg 400w"
                  sizes="400px"
                />
                <img 
                  src="/images/logos/logo-noella-high-400w.jpg" 
                  alt="Chiryo Energie Logo" 
                  className="w-[400px] h-[400px] object-contain"
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            {/* Description Text */}
            <div className="space-y-4 text-gray-900">
              <p className="text-sm md:text-base leading-relaxed">
                Parce que votre bien-être n'attend pas, je vous propose <strong>plusieurs approches holistiques</strong> afin de prendre en charge l'esprit, le corps et l'énergie et ainsi vous aider à favoriser la <strong>libération des blocages</strong>.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                En <strong>stimulant la circulation</strong> et en <strong>apaisant les tensions émotionnelles</strong>, les séances énergétiques vous aident à retrouver une sensation d'<strong>harmonie profonde</strong> encourageant le processus d'<strong>auto-guérison</strong>.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                Découvrez dès à présent les différents services personnalisés et comment vous aider à atteindre votre propre <strong>équilibre intérieur</strong>.
              </p>
            </div>

            {/* Link */}
            <div className="pt-2">
              <Link 
                to="/a-propos"
                className="inline-block text-primary-600 hover:text-primary-700 font-semibold transition-colors text-sm md:text-base"
              >
                En savoir plus →
              </Link>
            </div>
          </div>

          {/* Right Side - About Image */}
          <div className="order-first md:order-last w-full">
            {/* Mobile: Horizontal cropped image (4:3) - content-aware, shows more of original */}
            <div className="relative aspect-[4/3] md:hidden w-full overflow-hidden rounded-lg shadow-xl">
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
                  alt="Chiryo Energie - Bien-être et harmonie" 
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>

            {/* Desktop: Full original image */}
            <div className="relative hidden md:block w-full overflow-hidden rounded-lg shadow-xl">
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
                  alt="Chiryo Energie - Bien-être et harmonie" 
                  className="w-full h-full object-cover"
                  width={800}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

