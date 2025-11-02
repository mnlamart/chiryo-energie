import * as Accordion from '@radix-ui/react-accordion';
import { useParams, Link, useRouteLoaderData } from "react-router";
import Container from "../components/Container";
import Button from "../components/Button";
import FAQ from "../components/FAQ";
import Breadcrumbs from "../components/Breadcrumbs";
import ResponsiveImage from "../components/ResponsiveImage";
import { services } from "../data/services";
import { serviceFAQs } from "../data/faqs";
import { getBaseImageName } from "../utils/images";
import type { loader as rootLoader } from "../root";

export default function Service() {
  const { id } = useParams<{ id: string }>();
  const service = services.find((s) => s.id === id);
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const baseUrl = rootData?.baseUrl || "https://chiryo-energie.sevend.io";

  if (!service) {
    return (
      <>
        <title>Service non trouvé - Chiryo Energie</title>
        <meta name="description" content="Le service demandé n'existe pas." />
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
      </>
    );
  }

  const description = `${service.description.substring(0, 120)}... Tarif: ${service.price}. ${service.duration ? `Durée: ${service.duration}.` : ""} Consultation à Joué-Les-Tours (Indre-et-Loire) ou à distance. Prise de rendez-vous.`;
  const summary = `${service.title} par Chiryo Energie à Joué-Les-Tours (Indre-et-Loire). ${service.description} Tarif : ${service.price}. ${service.duration ? `Durée : ${service.duration}.` : ""} Consultation en présentiel, à domicile ou à distance selon le service.`;
  const keywords = `${service.title}, ${service.title} Joué-Les-Tours, ${service.title} Indre-et-Loire, bien-être ${service.title?.toLowerCase()}, énergéticien ${service.title?.toLowerCase()}`;
  const faqs = serviceFAQs[service.id] || [];

  // Determine if a service is in "Guidance spirituelle" category
  const isGuidanceSpirituelle = (serviceId: string) => {
    return serviceId === "magnetiseuse" || serviceId === "mediumnite";
  };

  // Get related services from the same category
  const relatedServices = services
    .filter((s) => {
      // Exclude current service
      if (s.id === service.id) return false;
      
      // Filter by same category
      const currentIsGuidance = isGuidanceSpirituelle(service.id);
      const otherIsGuidance = isGuidanceSpirituelle(s.id);
      
      return currentIsGuidance === otherIsGuidance;
    });

  return (
    <>
      <title>{service.title} à Joué-Les-Tours | Chiryo Energie</title>
      <meta name="description" content={description} />
      <meta name="summary" content={summary} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={`${service.title} à Joué-Les-Tours | Chiryo Energie`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${baseUrl}/services/${service.id}`} />
      <meta name="twitter:title" content={`${service.title} à Joué-Les-Tours | Chiryo Energie`} />
      <meta name="twitter:description" content={description} />
      <div className="py-20 bg-brand-bg">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Accueil", path: "/" },
              { label: "Services", path: "/#services" },
              { label: service.title, path: `/services/${service.id}` },
            ]}
          />

          <article>
            {/* Service Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {service.image && (() => {
                const imageName = getBaseImageName(service.image);
                
                return (
                  <div>
                    <ResponsiveImage
                      src={imageName}
                      category="services"
                      variant="sq"
                      alt={`${service.title} - Services de bien-être à Joué-Les-Tours par Chiryo Energie`}
                      className="w-full rounded-lg shadow-lg object-cover aspect-square"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      width={800}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      customSizes={[400, 800, 1200]}
                    />
                  </div>
                );
              })()}

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
                    <div className="bg-brand-card rounded-lg p-4 border-l-4 border-primary-500">
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
              <section className="mt-16" aria-labelledby={`faq-${service.id}-heading`}>
                <h2 id={`faq-${service.id}-heading`} className="text-3xl font-bold text-gray-900 mb-8">
                  Questions fréquentes - {service.title}
                </h2>

                <Accordion.Root 
                  type="single" 
                  collapsible 
                  className="space-y-4"
                >
                  {faqs.map((faq, index) => (
                    <FAQ
                      key={index}
                      value={`service-${service.id}-faq-${index}`}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))}
                </Accordion.Root>
              </section>
            )}

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <section className="mt-16" aria-labelledby="related-services-heading">
                <h2 id="related-services-heading" className="text-2xl font-bold text-gray-900 mb-6">
                  Autres services disponibles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedServices.map((relatedService) => (
                    <Link
                      key={relatedService.id}
                      to={`/services/${relatedService.id}`}
                      className="block p-4 bg-brand-card rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-400"
                    >
                      <h3 className="text-lg font-semibold text-primary-800 mb-2 hover:text-primary-900">
                        {relatedService.title}
                      </h3>
                      <p className="text-sm text-gray-800 line-clamp-2">
                        {relatedService.description}
                      </p>
                      <span className="inline-block mt-2 text-sm text-primary-800 font-medium">
                        En savoir plus →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Call to Action */}
            <div className="mt-16 bg-brand-card rounded-lg border border-gray-400 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Prêt à commencer votre parcours de bien-être ?
              </h2>
              <p className="text-gray-700 mb-6">
                Contactez-moi dès aujourd'hui pour prendre rendez-vous à Joué-Les-Tours ou en ligne
              </p>
              <Link to="/contact">
                <Button>Me contacter</Button>
              </Link>
            </div>
          </article>
        </Container>
      </div>
    </>
  );
}

