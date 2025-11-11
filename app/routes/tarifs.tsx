import { Link, useRouteLoaderData } from "react-router";
import Container from "../components/Container";
import { services } from "../data/services";
import type { loader as rootLoader } from "../root";
import ResponsiveImage from "../components/ResponsiveImage";
import { getBaseImageName } from "../utils/images";
import { ArrowRight } from "lucide-react";
import * as Separator from "@radix-ui/react-separator";
import Breadcrumbs from "../components/Breadcrumbs";

// Helper function to format price with € symbol
function formatPrice(price: string): string {
  return price.replace(/\s*euros\s*/gi, '€').trim();
}

// Helper function to extract forfait information from notes
function getForfaitInfo(notes?: string): string | null {
  if (!notes) return null;
  
  // Check for explicit forfait mentions
  if (/Forfait/i.test(notes)) {
    // Try to extract a meaningful sentence about forfait
    const sentences = notes.split(/[.!?]\s+/);
    const forfaitSentence = sentences.find(s => /Forfait/i.test(s));
    
    if (forfaitSentence) {
      // Clean up the sentence
      return forfaitSentence.trim().replace(/\.$/, '');
    }
    
    // If we found "Forfait" but couldn't extract a sentence, check for context
    if (/Prévoir.*séances/i.test(notes) && /Forfait/i.test(notes)) {
      return "Forfait disponible pour plusieurs séances";
    }
    
    return "Forfait disponible";
  }
  
  return null;
}

export default function Tarifs() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const baseUrl = rootData?.baseUrl || "https://chiryo-energie.sevend.io";
  // Categorize services
  const guidanceSpirituelle = services.filter(
    (service) => service.id === "mediumnite"
  );

  const soinsEnergetique = services.filter(
    (service) => service.id !== "mediumnite"
  );

  return (
    <>
      <title>Tarifs - Chiryo Energie | Prestations et prix des services</title>
      <meta name="description" content="Tarifs des services de bien-être holistique à Joué-Les-Tours. Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Forfaits disponibles. Consultez nos prix." />
      <meta name="summary" content="Tarifs des services de bien-être holistique proposés par Chiryo Energie à Joué-Les-Tours et Tours (Indre-et-Loire) : Reiki (60€), Sophro-relaxation (60€ adulte, 45€ enfant), Réflexologie (50€), Magnétisme, Médiumnité. Des forfaits sont disponibles pour plusieurs séances." />
      <meta name="keywords" content="tarifs Reiki Joué-Les-Tours, prix Sophro-relaxation Tours, tarifs Réflexologie Indre-et-Loire, prix Magnétisme Tours, tarifs énergéticien Centre-Val de Loire, forfaits bien-être Tours" />
      <meta property="og:title" content="Tarifs - Chiryo Energie" />
      <meta property="og:description" content="Découvrez les tarifs des services de bien-être holistique à Joué-Les-Tours." />
      <meta property="og:url" content={`${baseUrl}/tarifs`} />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta property="og:image:alt" content="Tarifs des services de bien-être holistique - Chiryo Energie" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content="Tarifs - Chiryo Energie" />
      <meta name="twitter:description" content="Découvrez les tarifs des services de bien-être holistique à Joué-Les-Tours." />
      <div className="min-h-screen bg-brand-bg">
        <Container>
          <div className="py-8 md:py-12">
            <Breadcrumbs
              items={[
                { label: "Accueil", path: "/" },
                { label: "Tarifs", path: "/tarifs" },
              ]}
            />
            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Tarifs
              </h1>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
                Des forfaits sont disponibles pour plusieurs séances. N&apos;hésitez
                pas à me contacter pour plus d&apos;informations.
              </p>
            </div>

            {/* Guidance spirituelle */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
                Guidance spirituelle
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guidanceSpirituelle.map((service) => {
                  const imageName = service.image ? getBaseImageName(service.image) : null;
                  return (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="bg-brand-card rounded-lg border border-gray-400 overflow-hidden flex flex-col hover:shadow-lg transition-shadow group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label={`Voir les détails du service ${service.title}`}
                  >
                    <div className="p-4 md:p-5 flex gap-4 md:gap-5 flex-1">
                      {service.image && imageName && (
                        <div className="relative w-24 md:w-32 h-24 md:h-32 shrink-0 overflow-hidden">
                          <ResponsiveImage
                            src={imageName}
                            category="services"
                            variant="sq"
                            alt={`${service.title} - Services de bien-être à Joué-Les-Tours par Chiryo Energie`}
                            className="w-full h-full object-cover"
                            sizes="(max-width: 768px) 96px, 128px"
                            width={128}
                            height={128}
                            loading="lazy"
                            decoding="async"
                            customSizes={[96, 128, 192, 256]}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {service.title}
                        </h3>
                        <div className="text-xl font-bold text-primary-700">
                          {formatPrice(service.price)}
                        </div>
                        {service.duration && (
                          <div className="text-sm text-gray-900">
                            {service.duration}
                          </div>
                        )}
                        {getForfaitInfo(service.notes) && (
                          <div>
                            <span className="text-xs text-gray-800">
                              💰 {getForfaitInfo(service.notes)}
                            </span>
                          </div>
                        )}
                      </div>
                      </div>
                    </div>
                    <Separator.Root decorative className="h-px bg-gray-300" />
                    <div className="px-4 md:px-5 py-2 md:py-3">
                      <div className="text-sm text-primary-800 group-hover:text-primary-900 font-medium inline-flex items-center gap-2 transition-colors">
                        En savoir plus
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                  );
                })}
              </div>
            </div>

            {/* Soins énergétiques */}
            <div className="mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
                Soins énergétiques
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {soinsEnergetique.map((service) => {
                  const imageName = service.image ? getBaseImageName(service.image) : null;
                  return (
                  <Link
                    key={service.id}
                    to={`/services/${service.id}`}
                    className="bg-brand-card rounded-lg border border-gray-400 overflow-hidden flex flex-col hover:shadow-lg transition-shadow group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label={`Voir les détails du service ${service.title}`}
                  >
                    <div className="p-4 md:p-5 flex gap-4 md:gap-5 flex-1">
                      {service.image && imageName && (
                        <div className="relative w-24 md:w-32 h-24 md:h-32 shrink-0 overflow-hidden">
                          <ResponsiveImage
                            src={imageName}
                            category="services"
                            variant="sq"
                            alt={`${service.title} - Services de bien-être à Joué-Les-Tours par Chiryo Energie`}
                            className="w-full h-full object-cover"
                            sizes="(max-width: 768px) 96px, 128px"
                            width={128}
                            height={128}
                            loading="lazy"
                            decoding="async"
                            customSizes={[96, 128, 192, 256]}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {service.title}
                        </h3>
                        <div className="text-xl font-bold text-primary-700">
                          {formatPrice(service.price)}
                        </div>
                        {service.duration && (
                          <div className="text-sm text-gray-900">
                            {service.duration}
                          </div>
                        )}
                        {getForfaitInfo(service.notes) && (
                          <div>
                            <span className="text-xs text-gray-800">
                              💰 {getForfaitInfo(service.notes)}
                            </span>
                          </div>
                        )}
                      </div>
                      </div>
                    </div>
                    <Separator.Root decorative className="h-px bg-gray-300" />
                    <div className="px-4 md:px-5 py-2 md:py-3">
                      <div className="text-sm text-primary-800 group-hover:text-primary-900 font-medium inline-flex items-center gap-2 transition-colors">
                        En savoir plus
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 md:mt-10 text-center bg-brand-card rounded-lg border border-gray-400 p-6 md:p-8 max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Questions sur les tarifs ?
              </h3>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                Pour toute question concernant les tarifs, les forfaits ou pour
                prendre rendez-vous, n&apos;hésitez pas à me contacter.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-brand-header text-gray-900 px-5 py-2 rounded-lg text-sm font-medium hover:bg-brand-hover transition-colors focus:outline-none focus:ring-2 focus:ring-brand-hover focus:ring-offset-2"
              >
                Me contacter
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
