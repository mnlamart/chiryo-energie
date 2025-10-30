import { useNavigate, useLocation } from 'react-router-dom';
import Container from './Container';
import Button from './Button';
import { Link } from 'react-router-dom';
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
    <section className="relative bg-gradient-to-br from-primary-50 to-warm-50 py-20 overflow-hidden" aria-label="Hero section">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="/images/hero/hero-meditation-640w.webp 640w,
                    /images/hero/hero-meditation-960w.webp 960w,
                    /images/hero/hero-meditation-1280w.webp 1280w,
                    /images/hero/hero-meditation-1920w.webp 1920w"
            sizes="100vw"
          />
          <source
            type="image/jpeg"
            srcSet="/images/hero/hero-meditation-640w.jpg 640w,
                    /images/hero/hero-meditation-960w.jpg 960w,
                    /images/hero/hero-meditation-1280w.jpg 1280w,
                    /images/hero/hero-meditation-1920w.jpg 1920w"
            sizes="100vw"
          />
          <img 
            src="/images/hero/hero-meditation-1920w.jpg" 
            alt="Bien-être et relaxation - Services holistiques à Joué-Les-Tours" 
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
      
      <Container>
        <div className="relative text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {heroContent.title}
          </h1>
          
          <div className="space-y-4 mb-8">
            <p className="text-xl md:text-2xl text-primary-700 italic font-medium">
              {heroContent.subtitle}
            </p>
            <p className="text-xl md:text-2xl text-primary-700 italic font-medium">
              {heroContent.subtitle2}
            </p>
          </div>
          
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed mb-10">
            <p>{heroContent.description}</p>
            <p>{heroContent.description2}</p>
            <p className="font-medium">{heroContent.description3}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToServices}>Commençons</Button>
            <Link to="/contact">
              <Button variant="secondary">Me contacter</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

