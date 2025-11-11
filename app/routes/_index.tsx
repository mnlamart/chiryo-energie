import { Link, useRouteLoaderData } from "react-router";
import Hero from "../components/Hero";
import QuiSuisJe from "../components/QuiSuisJe";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import FAQs from "../components/FAQs";
import ScrollAnimation from "../components/ScrollAnimation";
import Container from "../components/Container";
import Button from "../components/Button";
import { services } from "../data/services";
import type { loader as rootLoader } from "../root";

export default function Index() {
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const baseUrl = rootData?.baseUrl || "https://chiryo-energie.sevend.io";


  return (
    <>
      <title>Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours</title>
      <meta name="description" content="Psycho-énergéticienne à Joué-Les-Tours : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Maître enseignante en Reiki. Consultations à Tours ou à distance. Prenez rendez-vous." />
      <meta name="summary" content="Chiryo Energie offre des services de bien-être holistique à Joué-Les-Tours et Tours (Indre-et-Loire) : Reiki, Sophro-relaxation, Réflexologie, Magnétisme et Médiumnité. Consultations en présentiel, à domicile ou à distance." />
      <meta name="keywords" content="Reiki Joué-Les-Tours, Sophro-relaxation Tours, Réflexologie Indre-et-Loire, Magnétiseur Tours, Médiumnité Joué-Les-Tours, bien-être holistique Centre-Val de Loire, énergéticien Tours, coupeuse de feu" />
      <meta property="og:title" content="Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours" />
      <meta property="og:description" content="Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Prenez rendez-vous à Joué-Les-Tours, France." />
      <meta property="og:url" content={`${baseUrl}/`} />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta property="og:image:alt" content="Chiryo Energie - Services de bien-être holistique à Joué-Les-Tours" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content="Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours" />
      <meta name="twitter:description" content="Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité." />
      <Hero />
      <ScrollAnimation>
        <QuiSuisJe />
      </ScrollAnimation>
      <ScrollAnimation>
        <section id="services" className="py-12 md:py-16 bg-brand-bg" aria-labelledby="services-heading">
          <Container>
            <div className="text-center mb-8 md:mb-12">
              <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Prestations de service
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
                Découvrez nos services de bien-être holistique à Joué-Les-Tours (Indre-et-Loire).
                Consultations en présentiel ou à distance.
              </p>
              <Link to="/services">
                <Button>Découvrir tous nos services</Button>
              </Link>
            </div>
          </Container>
        </section>
      </ScrollAnimation>
      <ScrollAnimation>
        <section id="tarifs" className="py-12 md:py-16 bg-brand-bg" aria-labelledby="tarifs-heading">
          <Container>
            <div className="text-center mb-8 md:mb-12">
              <h2 id="tarifs-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tarifs
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
                Des forfaits sont disponibles pour plusieurs séances. N'hésitez pas à me contacter pour plus d'informations.
              </p>
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-brand-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg border border-white/40">
                  <div className="grid grid-cols-1 gap-4">
                    {services.map((service) => (
                      <div key={service.id} className="flex justify-between items-start py-2 border-b border-white/40 last:border-b-0">
                        <span className="text-gray-800 font-medium text-sm md:text-base pr-4">{service.title}</span>
                        <span className="text-gray-600 text-sm md:text-base whitespace-nowrap">{service.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/tarifs">
                <Button>Voir tous les tarifs</Button>
              </Link>
            </div>
          </Container>
        </section>
      </ScrollAnimation>
      <ScrollAnimation>
        <Testimonials />
      </ScrollAnimation>
      <ScrollAnimation>
        <Contact />
      </ScrollAnimation>
      <ScrollAnimation>
        <FAQs />
      </ScrollAnimation>
    </>
  );
}

