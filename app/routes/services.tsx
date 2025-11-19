import { useRouteLoaderData } from "react-router";
import Container from "../components/Container";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";
import ScrollAnimation from "../components/ScrollAnimation";
import Breadcrumbs from "../components/Breadcrumbs";
import type { loader as rootLoader } from "../root";

export default function ServicesPage() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const baseUrl = rootData?.baseUrl || "https://chiryo-energie.sevend.io";

  // Categorize services
  const guidanceSpirituelle = services.filter(service => 
    service.id === 'voyance' || service.id === 'mediumnite'
  );
  
  const conseilNaturopathie = services.filter(service => 
    service.id === 'conseil-naturopathie'
  );
  
  const soinsEnergetique = services.filter(service => 
    service.id !== 'voyance' && service.id !== 'mediumnite' && service.id !== 'conseil-naturopathie'
  );

  return (
    <>
      <title>Services - Chiryo Energie | Prestations de bien-être holistique</title>
      <meta name="description" content="Services de bien-être holistique à Joué-Les-Tours : Guidance spirituelle et soins énergétiques. Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Découvrez nos prestations." />
      <meta name="summary" content="Services de bien-être holistique proposés par Chiryo Energie à Joué-Les-Tours et Tours (Indre-et-Loire) : Guidance spirituelle (Magnétisme, Médiumnité) et Soins énergétiques (Reiki, Sophro-relaxation, Réflexologie, etc.). Consultations en présentiel, à domicile ou à distance." />
      <meta name="keywords" content="services bien-être Joué-Les-Tours, Reiki Tours, Sophro-relaxation Indre-et-Loire, Réflexologie Tours, Magnétisme Joué-Les-Tours, Médiumnité Tours, énergéticien Centre-Val de Loire" />
      <meta property="og:title" content="Services - Chiryo Energie" />
      <meta property="og:description" content="Découvrez nos services de bien-être holistique à Joué-Les-Tours. Consultations en présentiel ou à distance." />
      <meta property="og:url" content={`${baseUrl}/services`} />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta property="og:image:alt" content="Services de bien-être holistique - Chiryo Energie" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content="Services - Chiryo Energie" />
      <meta name="twitter:description" content="Services de bien-être holistique à Joué-Les-Tours." />
      <section id="services" className="py-12 md:py-16 bg-brand-bg" aria-labelledby="services-heading">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Accueil", path: "/" },
              { label: "Services", path: "/services" },
            ]}
          />
          <div className="text-center mb-8 md:mb-12">
            <h1 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Prestations de service
            </h1>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Découvrez nos services de bien-être holistique à Joué-Les-Tours (Indre-et-Loire).
              Consultations en présentiel ou à distance.
            </p>
          </div>
          
          {/* Guidance spirituelle */}
          <ScrollAnimation>
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                Guidance spirituelle
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-6 md:mb-8 text-center leading-relaxed">
                Issue d'un héritage familial, ma sensibilité peut vous permettre de vous accompagner et de vous guider sur votre chemin de vie. J'utilise certains outils comme le pendule et les cartes, mais les informations peuvent aussi m'être transmises sans l'utilisation de support. Je suis un canal et vous retransmets ce que je reçois.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-md sm:max-w-none mx-auto sm:mx-0">
                {guidanceSpirituelle.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Soins énergétiques */}
          <ScrollAnimation>
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                Soins énergétiques et développement personnel
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-md sm:max-w-none mx-auto sm:mx-0">
                {soinsEnergetique.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Conseil en Naturopathie */}
          {conseilNaturopathie.length > 0 && (
            <ScrollAnimation>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                  Conseil en Naturopathie
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-md sm:max-w-none mx-auto sm:mx-0">
                  {conseilNaturopathie.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          )}

          {/* Medical Disclaimer */}
          <ScrollAnimation>
            <div className="mt-12 md:mt-16 pt-8 border-t border-gray-300">
              <p className="text-sm md:text-base text-gray-600 text-center max-w-3xl mx-auto italic">
                Aucune séance ne saurait se substituer à un avis médical. Ni remplacer un traitement médical.
              </p>
            </div>
          </ScrollAnimation>
        </Container>
      </section>
    </>
  );
}

