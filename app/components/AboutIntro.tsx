import { Link } from 'react-router-dom';
import Container from './Container';
import ResponsiveImage from './ResponsiveImage';

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
              <ResponsiveImage
                src="logo-noella-high"
                category="logos"
                alt="Chiryo Energie Logo"
                className="w-[400px] h-[400px] object-contain"
                width={400}
                height={400}
                sizes="400px"
                loading="lazy"
                decoding="async"
                customSizes={[400]}
              />
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
            <div className="relative aspect-4/3 md:hidden w-full overflow-hidden rounded-lg shadow-xl">
              <ResponsiveImage
                src="about-image"
                category="about"
                variant="h"
                alt="Chiryo Energie - Bien-être et harmonie"
                className="w-full h-full object-cover"
                sizes="100vw"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Desktop: Full original image */}
            <div className="relative hidden md:block w-full overflow-hidden rounded-lg shadow-xl">
              <ResponsiveImage
                src="about-image"
                category="about"
                alt="Chiryo Energie - Bien-être et harmonie"
                className="w-full h-full object-cover"
                sizes="50vw"
                width={800}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

