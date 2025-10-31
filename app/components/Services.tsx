import Container from './Container';
import ServiceCard from './ServiceCard';
import { services } from '../data/services';

export default function Services() {
  return (
    <section id="services" className="py-12 md:py-16 bg-brand-bg" aria-labelledby="services-heading">
      <Container>
        <div className="text-center mb-8 md:mb-12">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prestations de service
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos services de bien-être holistique à Joué-Les-Tours (Indre-et-Loire).
            Consultations en présentiel ou à distance.
          </p>
        </div>
        
        {/* Services in a 4-column grid max */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-md sm:max-w-none mx-auto sm:mx-0">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

