import Container from './Container';
import ServiceCard from './ServiceCard';
import { services } from '../data/services';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white" aria-labelledby="services-heading">
      <Container>
        <div className="text-center mb-12">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prestations de service
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos services de bien-être holistique à Joué-Les-Tours, près de Tours (Indre-et-Loire). Consultations en présentiel ou à distance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

