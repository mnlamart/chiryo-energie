import { useNavigate, useLocation } from 'react-router-dom';
import Container from './Container';
import Button from './Button';
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
          const headerOffset = 80;
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
    <section className="relative bg-gradient-to-br from-primary-50 to-warm-50 py-8 md:py-12 overflow-hidden" aria-label="Hero section">
      {/* Background Image */}
      <div className="absolute inset-0" aria-hidden="true">
        <picture>
          <source
            type="image/avif"
            srcSet="/images/hero/hero-new-640w.avif 640w,
                    /images/hero/hero-new-960w.avif 960w,
                    /images/hero/hero-new-1280w.avif 1280w,
                    /images/hero/hero-new-1920w.avif 1920w"
            sizes="100vw"
          />
          <source
            type="image/webp"
            srcSet="/images/hero/hero-new-640w.webp 640w,
                    /images/hero/hero-new-960w.webp 960w,
                    /images/hero/hero-new-1280w.webp 1280w,
                    /images/hero/hero-new-1920w.webp 1920w"
            sizes="100vw"
          />
          <source
            type="image/jpeg"
            srcSet="/images/hero/hero-new-640w.jpg 640w,
                    /images/hero/hero-new-960w.jpg 960w,
                    /images/hero/hero-new-1280w.jpg 1280w,
                    /images/hero/hero-new-1920w.jpg 1920w"
            sizes="100vw"
          />
          <img
            src="/images/hero/hero-new-1920w.jpg"
            alt="Bien-être et relaxation - Services holistiques à Joué-Les-Tours"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </div>
      
      <Container>
        <div className="relative text-center max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 drop-shadow-lg">
            {heroContent.title}
          </h1>
          
          <div className="flex flex-col items-center gap-4">
            <Button onClick={scrollToServices}>Commençons</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

