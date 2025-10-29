import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import FAQs from '../components/FAQs';
import MetaTags from '../components/MetaTags';
import ScrollAnimation from '../components/ScrollAnimation';

export default function Home() {
  const location = useLocation();

  // Handle hash scrolling when page loads or hash changes
  useEffect(() => {
    if (location.hash === '#services') {
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
  }, [location.hash]);

  return (
    <>
      <MetaTags 
        title="Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours"
        description="Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Prenez rendez-vous à Joué-Les-Tours, France. Maître enseignante en Reiki."
      />
      <Hero />
      <ScrollAnimation>
        <Services />
      </ScrollAnimation>
      <ScrollAnimation delay={100}>
        <About />
      </ScrollAnimation>
      <ScrollAnimation delay={200}>
        <FAQs />
      </ScrollAnimation>
      <ScrollAnimation delay={300}>
        <TestimonialsCarousel />
      </ScrollAnimation>
    </>
  );
}

