import { useEffect } from "react";
import { useLocation, useRouteLoaderData } from "react-router";
import Hero from "../components/Hero";
import AboutIntro from "../components/AboutIntro";
import Services from "../components/Services";
import QuiSuisJe from "../components/QuiSuisJe";
import Testimonials from "../components/Testimonials";
import ScrollAnimation from "../components/ScrollAnimation";
import type { loader as rootLoader } from "../root";

export default function Index() {
  const location = useLocation();
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const baseUrl = rootData?.baseUrl || "https://chiryo-energie.sevend.io";

  // Handle hash scrolling when page loads or hash changes
  useEffect(() => {
    if (location.hash === "#services") {
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        const headerOffset = 80;
        const elementPosition = servicesSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [location.hash]);

  return (
    <>
      <title>Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours</title>
      <meta name="description" content="Services holistiques de bien-être à Joué-Les-Tours : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Maître enseignante en Reiki. Consultations à Tours, Indre-et-Loire ou à distance. Prenez rendez-vous." />
      <meta name="summary" content="Chiryo Energie offre des services de bien-être holistique à Joué-Les-Tours et Tours (Indre-et-Loire) : Reiki, Sophro-relaxation, Réflexologie, Magnétisme et Médiumnité. Consultations en présentiel, à domicile ou à distance." />
      <meta name="keywords" content="Reiki Joué-Les-Tours, Sophro-relaxation Tours, Réflexologie Indre-et-Loire, Magnétiseur Tours, Médiumnité Joué-Les-Tours, bien-être holistique Centre-Val de Loire, énergéticien Tours, coupeuse de feu" />
      <meta property="og:title" content="Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours" />
      <meta property="og:description" content="Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Prenez rendez-vous à Joué-Les-Tours, France." />
      <meta property="og:url" content={`${baseUrl}/`} />
      <meta name="twitter:title" content="Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours" />
      <meta name="twitter:description" content="Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité." />
      <Hero />
      <AboutIntro />
      <ScrollAnimation>
        <Services />
      </ScrollAnimation>
      <ScrollAnimation>
        <QuiSuisJe />
      </ScrollAnimation>
      <ScrollAnimation>
        <Testimonials />
      </ScrollAnimation>
    </>
  );
}

