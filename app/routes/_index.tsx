import { useEffect } from "react";
import { useLocation } from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import Hero from "../../src/components/Hero";
import Services from "../../src/components/Services";
import About from "../../src/components/About";
import TestimonialsCarousel from "../../src/components/TestimonialsCarousel";
import FAQs from "../../src/components/FAQs";
import ScrollAnimation from "../../src/components/ScrollAnimation";
import Layout from "../../src/components/Layout";

export const links: LinksFunction = () => {
  const baseUrl = "https://www.chiryo-energie.fr";
  const canonical = `${baseUrl}/`;

  return [{ rel: "canonical", href: canonical }];
};

export const meta: MetaFunction = () => [
  {
    title: "Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours",
  },
  {
    name: "description",
    content:
      "Services holistiques de bien-être à Joué-Les-Tours : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Maître enseignante en Reiki. Consultations à Tours, Indre-et-Loire ou à distance. Prenez rendez-vous.",
  },
  {
    name: "summary",
    content:
      "Chiryo Energie offre 8 services de bien-être holistique à Joué-Les-Tours et Tours (Indre-et-Loire) : Reiki (60€), Sophro-relaxation (60€ adulte, 45€ enfant), Réflexologie (50€), Relaxation énergétique (35€), Harmonisation lymphatique (60€), Shiatsu sevrage (50€), Magnétisme (sur mesure), Médiumnité (60€). Consultations en présentiel, à domicile ou à distance.",
  },
  {
    name: "keywords",
    content:
      "Reiki Joué-Les-Tours, Sophro-relaxation Tours, Réflexologie Indre-et-Loire, Magnétiseur Tours, Médiumnité Joué-Les-Tours, bien-être holistique Centre-Val de Loire, énergéticien Tours, coupeuse de feu",
  },
  {
    property: "og:title",
    content: "Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours",
  },
  {
    property: "og:description",
    content:
      "Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Prenez rendez-vous à Joué-Les-Tours, France.",
  },
  {
    property: "og:url",
    content: "https://www.chiryo-energie.fr/",
  },
  {
    name: "twitter:title",
    content: "Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours",
  },
  {
    name: "twitter:description",
    content:
      "Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité.",
  },
];

export default function Index() {
  const location = useLocation();

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
    <Layout>
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
    </Layout>
  );
}

