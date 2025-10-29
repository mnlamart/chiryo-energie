import { useParams, Link } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';
import MetaTags from '../components/MetaTags';
import FAQ from '../components/FAQ';
import Breadcrumbs from '../components/Breadcrumbs';
import { services } from '../data/services';
import { serviceFAQs } from '../data/faqs';

export default function Service() {
  const { id } = useParams<{ id: string }>();
  const service = services.find(s => s.id === id);

  if (!service) {
    return (
      <div className="py-20">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service non trouvé</h1>
            <Link to="/" className="text-primary-600 hover:text-primary-700">
              Retour à l'accueil
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const faqs = serviceFAQs[service.id] || [];

  return (
    <>
      <MetaTags 
        title={`${service.title} à Joué-Les-Tours | Chiryo Energie`}
        description={`${service.description.substring(0, 155)}... Tarif: ${service.price}. ${service.duration ? `Durée: ${service.duration}.` : ''} Prise de rendez-vous à Joué-Les-Tours.`}
        url={`https://www.chiryo-energie.fr/services/${service.id}`}
      />
      <div className="py-20 bg-white">
        <Container>
        <Breadcrumbs 
          items={[
            { label: 'Accueil', path: '/' },
            { label: 'Services', path: '/#services' },
            { label: service.title, path: `/services/${service.id}` }
          ]}
        />

        <div className="max-w-4xl mx-auto">
          {/* Service Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {service.image && (
              <div>
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full rounded-lg shadow-lg object-cover aspect-square"
                  loading="lazy"
                />
              </div>
            )}
            
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {service.title}
              </h1>
              
              <div className="space-y-4 mb-8">
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">Tarif:</span>
                    <span className="text-primary-600 font-bold text-xl">{service.price}</span>
                  </div>
                  {service.duration && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">Durée:</span>
                      <span className="text-gray-700">{service.duration}</span>
                    </div>
                  )}
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {service.description}
                </p>

                {service.notes && (
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary-500">
                    <p className="text-gray-700 italic">{service.notes}</p>
                  </div>
                )}
              </div>

              <Link to="/contact">
                <Button>Prendre rendez-vous</Button>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Questions fréquentes - {service.title}
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <FAQ 
                    key={index}
                    value={`service-${service.id}-faq-${index}`}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Call to Action */}
          <div className="mt-16 bg-linear-to-br from-primary-50 to-warm-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à commencer votre parcours de bien-être ?
            </h2>
            <p className="text-gray-700 mb-6">
              Contactez-moi dès aujourd'hui pour prendre rendez-vous
            </p>
            <Link to="/contact">
              <Button>Me contacter</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}

