import { useNavigate, useLocation } from 'react-router-dom';
import Container from './Container';
import Button from './Button';
import ResponsiveImage from './ResponsiveImage';
import { heroContent } from '../data/content';

export default function Hero() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate first
    if (location.pathname !== '/') {
      void navigate('/');
      // Wait for navigation, then scroll
      void setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          const headerOffset = 100;
          const elementPosition = servicesSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        const headerOffset = 80;
        const elementPosition = servicesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="py-12 md:py-16" aria-label="Hero and About section">
      <Container>
        <div className="max-w-6xl mx-auto rounded-lg" style={{ backgroundColor: '#f9e9df' }}>
          {/* Hero Section - Full width inside card */}
          <div className="relative max-h-[200px] overflow-hidden rounded-t-lg mb-8 md:mb-12">
            {/* Background Image - constrained within container */}
            <div className="absolute inset-0 rounded-t-lg overflow-hidden" aria-hidden="true">
              <ResponsiveImage
                src="hero-new"
                category="hero"
                alt="Bien-être et relaxation - Services holistiques à Joué-Les-Tours"
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 1152px"
                width={1920}
                height={1080}
                loading="eager"
                fetchPriority="high"
              />
              {/* Black opacity overlay for better text readability */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            {/* Hero Content */}
            <div className="relative text-center h-[200px] flex flex-col items-center justify-center px-4">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
                {heroContent.title}
              </h1>
              
              <div className="flex flex-col items-center gap-2">
                <Button onClick={scrollToServices} className="text-sm px-4 py-2">Commençons</Button>
              </div>
            </div>
          </div>

          {/* AboutIntro Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center p-6 md:p-8">
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
                  sizes="400px"
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  objectFit="contain"
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

            </div>

            {/* Right Side - About Image */}
            <div className="order-last md:order-last w-full">
              {/* Full original image - same format for mobile and desktop */}
              <div className="relative w-full overflow-hidden">
                <ResponsiveImage
                  src="about-image"
                  category="about"
                  alt="Chiryo Energie - Bien-être et harmonie"
                  className="w-full h-full max-h-[350px] md:max-h-none object-contain md:object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={800}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

