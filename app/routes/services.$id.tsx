import { useParams, Link } from "react-router";
import type { MetaFunction } from "react-router";
import Container from "../../src/components/Container";
import Button from "../../src/components/Button";
import FAQ from "../../src/components/FAQ";
import Breadcrumbs from "../../src/components/Breadcrumbs";
import { services } from "../../src/data/services";
import { serviceFAQs } from "../../src/data/faqs";
import Layout from "../../src/components/Layout";

export const meta: MetaFunction = ({ params }) => {
  const service = services.find((s) => s.id === params.id);

  if (!service) {
    return [
      { title: "Service non trouvé - Chiryo Energie" },
      {
        name: "description",
        content: "Le service demandé n'existe pas.",
      },
    ];
  }

  const description = `${service.description.substring(0, 120)}... Tarif: ${service.price}. ${service.duration ? `Durée: ${service.duration}.` : ""} Consultation à Joué-Les-Tours, Tours (Indre-et-Loire) ou à distance. Prise de rendez-vous.`;

  return [
    {
      title: `${service.title} à Joué-Les-Tours | Chiryo Energie`,
    },
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: `${service.title} à Joué-Les-Tours | Chiryo Energie`,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:url",
      content: `https://www.chiryo-energie.fr/services/${service.id}`,
    },
    {
      name: "twitter:title",
      content: `${service.title} à Joué-Les-Tours | Chiryo Energie`,
    },
    {
      name: "twitter:description",
      content: description,
    },
  ];
};

export default function Service() {
  const { id } = useParams<{ id: string }>();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <Layout>
        <div className="py-20">
          <Container>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Service non trouvé
              </h1>
              <Link to="/" className="text-primary-600 hover:text-primary-700">
                Retour à l'accueil
              </Link>
            </div>
          </Container>
        </div>
      </Layout>
    );
  }

  const faqs = serviceFAQs[service.id] || [];

  return (
    <Layout>
      <div className="py-20 bg-white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Accueil", path: "/" },
              { label: "Services", path: "/#services" },
              { label: service.title, path: `/services/${service.id}` },
            ]}
          />

          <article className="max-w-4xl mx-auto">
            {/* Service Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {service.image && (
                <div>
                  <img
                    src={service.image}
                    srcSet={`${service.image.replace('w=800', 'w=400')} 400w, ${service.image.replace('w=800', 'w=800')} 800w, ${service.image.replace('w=800', 'w=1200')} 1200w`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt={`${service.title} - Services de bien-être à Joué-Les-Tours par Chiryo Energie`}
                    className="w-full rounded-lg shadow-lg object-cover aspect-square"
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
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
                      <span className="text-primary-600 font-bold text-xl">
                        {service.price}
                      </span>
                    </div>
                    {service.duration && (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          Durée:
                        </span>
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
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Related Services */}
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Autres services disponibles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services
                  .filter((s) => s.id !== service.id)
                  .slice(0, 3)
                  .map((relatedService) => (
                    <Link
                      key={relatedService.id}
                      to={`/services/${relatedService.id}`}
                      className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
                    >
                      <h3 className="text-lg font-semibold text-primary-600 mb-2 hover:text-primary-700">
                        {relatedService.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedService.description}
                      </p>
                      <span className="inline-block mt-2 text-sm text-primary-600 font-medium">
                        En savoir plus →
                      </span>
                    </Link>
                  ))}
              </div>
            </section>

            {/* Call to Action */}
            <div className="mt-16 bg-gradient-to-br from-primary-50 to-warm-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Prêt à commencer votre parcours de bien-être ?
              </h2>
              <p className="text-gray-700 mb-6">
                Contactez-moi dès aujourd'hui pour prendre rendez-vous à Joué-Les-Tours, Tours ou en ligne
              </p>
              <Link to="/contact">
                <Button>Me contacter</Button>
              </Link>
            </div>
          </article>
        </Container>
      </div>
    </Layout>
  );
}

