import {
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  data,
  useLoaderData,
} from "react-router";
import type { LinksFunction, LoaderFunctionArgs } from "react-router";
import { contactInfo } from "../src/data/content";
import { services } from "../src/data/services";
import { testimonials } from "../src/data/testimonials";
import { generalFAQs, serviceFAQs } from "../src/data/faqs";
import { useLocation } from "react-router";
import { honeypotMiddleware, getHoneypotInputProps } from "./middleware/honeypot";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import * as Toast from "@radix-ui/react-toast";

import rootStylesheetUrl from "../src/index.css?url";

const baseUrl = import.meta.env.VITE_BASE_URL || "https://cheryo-energy.sevend.io";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: rootStylesheetUrl },
    { rel: "icon", type: "image/svg+xml", href: "/vite.svg" },
    { rel: "manifest", href: "/manifest.json" },
    { rel: "preload", as: "image", href: "/images/hero/hero-meditation-1920w.webp", type: "image/webp" },
  ];
};


function generateStructuredData(pathname: string) {
  const schemas: object[] = [];
  const today = new Date().toISOString().split("T")[0];

  const currentService = services.find(
    (s) => pathname === `/services/${s.id}`
  );

  // 1. FAQPage Schema (for home page)
  if (pathname === "/") {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      lastReviewed: today,
      mainEntity: generalFAQs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: getEnhancedFAQAnswer(faq.question, faq.answer, null),
        },
      })),
    };
    schemas.push(faqSchema);
  }

  // 2. Service-specific FAQ (for service pages)
  if (currentService && serviceFAQs[currentService.id]) {
    const serviceFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      lastReviewed: today,
      mainEntity: serviceFAQs[currentService.id].map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: getEnhancedFAQAnswer(faq.question, faq.answer, currentService),
        },
      })),
    };
    schemas.push(serviceFaqSchema);
  }

  // 3. LocalBusiness with AggregateRating
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}#business`,
    name: "Chiryo Energie",
    alternateName: "Chiryo Energie Psycho énergéticienne",
    description:
      "Chiryo Energie est une pratique de bien-être holistique située à Joué-Les-Tours, près de Tours (Indre-et-Loire, Centre-Val de Loire). Spécialisée en Reiki (Maître enseignante), Sophro-relaxation, Réflexologie plantaire, Magnétisme (coupeuse de feu), Harmonisation lymphatique, Shiatsu sevrage tabagique, et Médiumnité Voyance Cartomancie. Consultations disponibles en présentiel, à domicile ou à distance selon les services.",
    slogan: "Votre énergie, votre chemin, l'équilibre à portée de mains",
    url: baseUrl,
    telephone: contactInfo.phone.replace(/\./g, ""),
    email: contactInfo.email,
    image: `${baseUrl}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "101 Rue de Saint-Léger",
      addressLocality: "Joué-Les-Tours",
      addressRegion: "Centre-Val de Loire",
      postalCode: "37300",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "47.3499",
      longitude: "0.6667",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Joué-Les-Tours",
      },
      {
        "@type": "City",
        name: "Tours",
      },
      {
        "@type": "AdministrativeArea",
        name: "Indre-et-Loire",
      },
      {
        "@type": "State",
        name: "Centre-Val de Loire",
      },
    ],
    priceRange: "€€",
    paymentAccepted: "Cash, Check, Credit Card",
    currenciesAccepted: "EUR",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: testimonials.length.toString(),
      bestRating: "5",
      worstRating: "5",
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.author,
      },
      reviewBody: testimonial.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de bien-être holistique",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${baseUrl}/services/${service.id}`,
        },
        position: index + 1,
      })),
    },
  };
  schemas.push(businessSchema);

  // 4. Individual Service Schema (for service pages)
  if (currentService) {
    const priceMatch = currentService.price.match(/\d+/);
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: currentService.title,
      description: currentService.description,
      provider: {
        "@id": `${baseUrl}#business`,
      },
      areaServed: [
        {
          "@type": "City",
          name: "Joué-Les-Tours",
        },
        {
          "@type": "City",
          name: "Tours",
        },
        {
          "@type": "AdministrativeArea",
          name: "Indre-et-Loire",
        },
        {
          "@type": "State",
          name: "Centre-Val de Loire",
        },
      ],
      offers: {
        "@type": "Offer",
        price: priceMatch ? priceMatch[0] : "0",
        priceCurrency: "EUR",
        description: currentService.price,
        availability: "https://schema.org/InStock",
      },
      serviceType: currentService.title,
      url: `${baseUrl}/services/${currentService.id}`,
    };
    schemas.push(serviceSchema);

    // HowTo Schema for service process
    const howToSteps = getServiceHowToSteps(currentService.id);
    if (howToSteps.length > 0) {
      const durationMatch = currentService.duration?.match(/\d+/);
      const estimatedDuration = durationMatch 
        ? `PT${durationMatch[0]}M` 
        : currentService.duration === "1h environ" 
          ? "PT60M" 
          : currentService.duration === "30 minutes environ"
          ? "PT30M"
          : "PT45M";

      const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `Comment se déroule une séance de ${currentService.title} ?`,
        description: `Processus d'une séance de ${currentService.title} avec Chiryo Energie à Joué-Les-Tours.`,
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "EUR",
          value: priceMatch ? priceMatch[0] : "0",
        },
        totalTime: estimatedDuration,
        step: howToSteps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      };
      schemas.push(howToSchema);
    }

    // LearningResource Schema for educational content about service
    const learningResourceSchema = {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: `${currentService.title} - Guide et informations`,
      description: `Informations et guide sur le service ${currentService.title} proposé par Chiryo Energie.`,
      educationalLevel: "Beginner",
      about: {
        "@type": "Thing",
        name: currentService.title,
      },
      teaches: currentService.description,
      provider: {
        "@id": `${baseUrl}#business`,
      },
      url: `${baseUrl}/services/${currentService.id}`,
    };
    schemas.push(learningResourceSchema);
  }

  // 5. All Services Schema (for home page)
  if (pathname === "/") {
    // Individual Service schemas
    services.forEach((service) => {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@id": `${baseUrl}#business`,
        },
        url: `${baseUrl}/services/${service.id}`,
      };
      schemas.push(serviceSchema);
    });

    // ItemList schema for services list
    const servicesListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Services de bien-être holistique",
      description: "Liste des services proposés par Chiryo Energie à Joué-Les-Tours",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${baseUrl}/services/${service.id}`,
        },
      })),
    };
    schemas.push(servicesListSchema);
  }

  // 6. Article Schema (for AI content extraction)
  if (pathname === "/") {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Services de bien-être holistique à Joué-Les-Tours - Chiryo Energie",
      abstract: "Chiryo Energie offre des services de bien-être holistique à Joué-Les-Tours et Tours (Indre-et-Loire) : Reiki, Sophro-relaxation, Réflexologie plantaire, Magnétisme, Harmonisation lymphatique, Shiatsu sevrage tabagique, et Médiumnité Voyance. Consultations en présentiel, à domicile ou à distance.",
      articleBody: `Chiryo Energie est une pratique de bien-être holistique située à Joué-Les-Tours, près de Tours dans le département d'Indre-et-Loire (région Centre-Val de Loire). 

Services proposés:
- Reiki : Méthode énergétique d'origine japonaise par imposition des mains (60€, 1h). Maître enseignante, initiations possibles.
- Sophro-relaxation : Techniques de relaxation, respiration et visualisation positive (60€ adulte, 45€ enfant, 1h).
- Réflexologie plantaire : Stimulation des zones réflexes des pieds (50€, 1h avec balnéo).
- Relaxation énergétique corps : Digipression sur la face avant (35€, 30 min).
- Harmonisation lymphatique : Drainage lymphatique manuel (60€, 1h).
- Shiatsu sevrage tabagique : Technique japonaise pour accompagner l'arrêt du tabac (50€, 30-45 min, 5 séances minimum).
- Magnétiseuse coupeuse de feu : Soins énergétiques pour brûlures, problèmes de peau, stress (tarif sur mesure, disponible à distance).
- Médiumnité Voyance Cartomancie : Consultations avec pendule et cartes (60€, consultation par téléphone ou présentiel).

Consultations disponibles en présentiel à Joué-Les-Tours et Tours, à domicile, ou à distance selon les services. Contact : 06.61.86.94.01, chiryoenergie@gmail.com.`,
      author: {
        "@id": `${baseUrl}#person`,
      },
      publisher: {
        "@id": `${baseUrl}#business`,
      },
      datePublished: "2025-01-29",
      dateModified: today,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/`,
      },
    };
    schemas.push(articleSchema);
  }

  if (currentService) {
    const serviceArticleBody = `${currentService.title} par Chiryo Energie à Joué-Les-Tours et Tours (Indre-et-Loire).

${currentService.description}

${currentService.duration ? `Durée : ${currentService.duration}.` : ""}
Tarif : ${currentService.price}.

${currentService.notes || ""}

Consultation disponible ${currentService.id === "reiki" || currentService.id === "magnetiseuse" || currentService.id === "mediumnite" ? "en présentiel, à domicile ou à distance" : "en présentiel ou à domicile"}.

Contactez Chiryo Energie au 06.61.86.94.01 ou par email à chiryoenergie@gmail.com pour prendre rendez-vous.`;

    const serviceArticleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${currentService.title} à Joué-Les-Tours | Chiryo Energie`,
      abstract: `${currentService.description} Tarif : ${currentService.price}. ${currentService.duration ? `Durée : ${currentService.duration}.` : ""} Consultation à Joué-Les-Tours, Tours (Indre-et-Loire) ou à distance.`,
      articleBody: serviceArticleBody,
      author: {
        "@id": `${baseUrl}#person`,
      },
      publisher: {
        "@id": `${baseUrl}#business`,
      },
      datePublished: "2025-01-29",
      dateModified: today,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/services/${currentService.id}`,
      },
    };
    schemas.push(serviceArticleSchema);
  }

  // 7. BreadcrumbList
  const breadcrumbs = [
    { position: 1, name: "Accueil", item: `${baseUrl}/` },
  ];

  if (pathname === "/contact") {
    breadcrumbs.push({
      position: 2,
      name: "Contact",
      item: `${baseUrl}/contact`,
    });
  } else if (currentService) {
    breadcrumbs.push({
      position: 2,
      name: "Services",
      item: `${baseUrl}/#services`,
    });
    breadcrumbs.push({
      position: 3,
      name: currentService.title,
      item: `${baseUrl}/services/${currentService.id}`,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb) => ({
      "@type": "ListItem",
      position: crumb.position,
      name: crumb.name,
      item: crumb.item,
    })),
  };
  schemas.push(breadcrumbSchema);

  // 7. Person Schema (practitioner)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}#person`,
    name: "Chiryo Energie",
    jobTitle: "Psycho énergéticienne",
    description:
      "Magnétiseuse coupeuse de feu, voyante et médium, Maître enseignante en Reiki, Sophro relaxologue",
    knowsAbout: [
      "Reiki",
      "Sophrologie",
      "Réflexologie plantaire",
      "Magnétisme",
      "Shiatsu",
      "Médiumnité",
      "Voyance",
      "Cartomancie",
    ],
    worksFor: {
      "@id": `${baseUrl}#business`,
    },
  };
  schemas.push(personSchema);

  // 8. WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Chiryo Energie",
    url: baseUrl,
    description:
      "Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité à Joué-Les-Tours, France.",
  };
  schemas.push(websiteSchema);

  // 9. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chiryo Energie",
    url: baseUrl,
    logo: `${baseUrl}/og-image.jpg`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactInfo.phone.replace(/\./g, ""),
      email: contactInfo.email,
      contactType: "Customer Service",
      areaServed: "FR",
      availableLanguage: "French",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "101 Rue de Saint-Léger",
      addressLocality: "Joué-Les-Tours",
      postalCode: "37300",
      addressCountry: "FR",
    },
  };
  schemas.push(organizationSchema);

  return schemas;
}

function getServiceHowToSteps(serviceId: string): Array<{ name: string; text: string }> {
  const stepsMap: Record<string, Array<{ name: string; text: string }>> = {
    reiki: [
      {
        name: "Prise de contact et installation",
        text: "Prise de rendez-vous par téléphone (06.61.86.94.01) ou email. À votre arrivée, vous restez habillé et vous installez confortablement sur la table de massage.",
      },
      {
        name: "Relaxation et préparation",
        text: "Période de relaxation pour vous détendre et vous préparer à recevoir l'énergie Reiki.",
      },
      {
        name: "Imposition des mains",
        text: "J'appose mes mains sur différents points de votre corps pour transmettre l'énergie Reiki, favorisant la relaxation et le bien-être énergétique.",
      },
      {
        name: "Fin de séance",
        text: "La séance se termine par une période de repos. Durée totale : environ 1 heure.",
      },
    ],
    "sophro-relaxation": [
      {
        name: "Accueil et échange",
        text: "Première rencontre pour discuter de vos besoins et établir un protocole personnalisé selon vos difficultés.",
      },
      {
        name: "Techniques de relaxation",
        text: "Application de techniques de relaxation, de respiration guidée et de visualisation positive pour favoriser le bien-être physique et mental.",
      },
      {
        name: "Personnalisation",
        text: "Adaptation des techniques selon vos besoins spécifiques et les difficultés rencontrées.",
      },
      {
        name: "Conclusion",
        text: "Fin de séance avec conseils pratiques. Durée : environ 1 heure (45€ pour enfants jusqu'à 15 ans, 60€ pour adultes).",
      },
    ],
    "relaxation-energetique": [
      {
        name: "Installation",
        text: "Installation confortable sur la table de massage.",
      },
      {
        name: "Stimulation des points",
        text: "Stimulation de points en digipression sur la face avant du corps pour favoriser la détente énergétique.",
      },
      {
        name: "Relaxation",
        text: "Période de relaxation pour intégrer les bienfaits. Durée totale : environ 30 minutes.",
      },
    ],
    reflexologie: [
      {
        name: "Accueil et préparation",
        text: "Accueil et installation confortable pour la séance de réflexologie plantaire.",
      },
      {
        name: "Balnéo des pieds",
        text: "Début de la séance avec 10 minutes de balnéo des pieds pour la relaxation et la préparation.",
      },
      {
        name: "Stimulation des zones réflexes",
        text: "Stimulation précise des zones réflexes de la plante des pieds, chaque zone correspondant à un organe ou tissu du corps, permettant de réguler les déséquilibres.",
      },
      {
        name: "Fin de séance",
        text: "Conclusion de la séance. Durée totale : environ 1 heure (dont 10 minutes de balnéo).",
      },
    ],
    "harmonisation-lymphatique": [
      {
        name: "Préparation",
        text: "Installation confortable sur la table de massage.",
      },
      {
        name: "Harmonisation manuelle",
        text: "Harmonisation avec les doigts et la paume des mains sur l'ensemble du corps, en suivant le sens de la circulation lymphatique avec variation de la pression.",
      },
      {
        name: "Effets",
        text: "Favorisation de l'élimination des déchets et de l'amincissement. Durée : environ 1 heure.",
      },
    ],
    "shiatsu-sevrage": [
      {
        name: "Consultation initiale",
        text: "Première consultation pour évaluer votre situation et planifier les séances (minimum 5 séances recommandées).",
      },
      {
        name: "Techniques Shiatsu",
        text: "Application de pressions, étirements et mobilisations articulaires pour favoriser la circulation énergétique, sanguine et lymphatique et accompagner le sevrage tabagique.",
      },
      {
        name: "Suivi",
        text: "Accompagnement personnalisé pendant la période de sevrage. Durée : entre 30 et 45 minutes par séance.",
      },
    ],
    magnetiseuse: [
      {
        name: "Contact et évaluation",
        text: "Prise de contact par téléphone, email ou en présentiel pour évaluer votre besoin (brûlure, problème de peau, stress, deuil, etc.).",
      },
      {
        name: "Intervention énergétique",
        text: "Apposition des mains et/ou passes magnétiques pour les soins énergétiques. Intervention possible à distance ou par téléphone pour les urgences (brûlures).",
      },
      {
        name: "Application",
        text: "Application du magnétisme sur la zone concernée (brûlures, peau, kystes, hémorroïdes, problèmes de sommeil, etc.). Intervention possible sur personnes et animaux.",
      },
      {
        name: "Résultat",
        text: "Soulagement et amélioration selon le besoin. Tarif adapté selon la situation.",
      },
    ],
    mediumnite: [
      {
        name: "Prise de rendez-vous",
        text: "Contact par téléphone (06.61.86.94.01) ou email pour prendre rendez-vous. Consultation possible par téléphone ou en présentiel.",
      },
      {
        name: "Consultation",
        text: "Guidance et accompagnement sur votre chemin de vie. Utilisation d'outils (pendule, cartes) ou réception directe sans support selon les informations reçues.",
      },
      {
        name: "Transmission",
        text: "Transmission des informations reçues comme canal. Consultation possible pour nettoyage de personnes, de lieux, coupe de liens toxiques.",
      },
      {
        name: "Conclusion",
        text: "Fin de consultation avec conseils. Protocole personnalisé selon votre situation.",
      },
    ],
  };

  return stepsMap[serviceId] || [];
}

function getEnhancedFAQAnswer(question: string, originalAnswer: string, service: typeof services[0] | null): string {
  let enhanced = originalAnswer;

  // Add price information if service context available
  if (service && question.toLowerCase().includes("tarif")) {
    enhanced = `${originalAnswer} Consultation disponible à Joué-Les-Tours, Tours (Indre-et-Loire) ou à distance selon le service.`;
  }

  // Add location context for service availability questions
  if (question.toLowerCase().includes("distance") || question.toLowerCase().includes("présentiel")) {
    enhanced = `${originalAnswer} Disponible à Joué-Les-Tours, Tours et dans le département d'Indre-et-Loire (Centre-Val de Loire).`;
  }

  // Add duration for time-related questions
  if (service && service.duration && (question.toLowerCase().includes("durée") || question.toLowerCase().includes("temps"))) {
    enhanced = `${originalAnswer} Durée de la séance : ${service.duration}.`;
  }

  // Add location for general service questions
  if (service && !enhanced.includes("Joué-Les-Tours")) {
    enhanced = `${originalAnswer} Consultation à Joué-Les-Tours, Tours (Indre-et-Loire) ou à distance.`;
  }

  // Add price to general pricing questions
  if (question.toLowerCase().includes("tarif") && !question.toLowerCase().includes("tarifs")) {
    // This is a general pricing question, keep original
  } else if (question.toLowerCase().includes("tarifs")) {
    enhanced = `${originalAnswer} Consultations disponibles à Joué-Les-Tours, Tours (Indre-et-Loire) et à distance.`;
  }

  return enhanced;
}

export const middleware = honeypotMiddleware;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader(_args: LoaderFunctionArgs) {
  const honeypotInputProps = await getHoneypotInputProps();
  const allowIndexing = process.env.ALLOW_INDEXING === "true";
  return data({ honeypotInputProps, allowIndexing });
}

export default function Root() {
  const location = useLocation();
  const schemas = generateStructuredData(location.pathname);
  const { honeypotInputProps, allowIndexing } = useLoaderData<typeof loader>();

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Chiryo Energie - Psycho énergéticienne</title>
        <meta name="description" content="Votre énergie, votre chemin, l'équilibre à portée de mains. Chiryo Energie offre des services holistiques pour votre bien-être." />
        <meta name="summary" content="Chiryo Energie: Psycho énergéticienne offrant Reiki, Sophro-relaxation, Réflexologie, Magnétisme et Médiumnité à Joué-Les-Tours, Tours (Indre-et-Loire). Consultations en présentiel ou à distance. Maître enseignante en Reiki." />
        <meta name="keywords" content="Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité, bien-être holistique, Joué-Les-Tours, Tours, Indre-et-Loire, énergéticien, coupeuse de feu, voyance" />
        <meta name="theme-color" content="#8B4513" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="author" content="Chiryo Energie" />
        {!allowIndexing && <meta name="robots" content="noindex, nofollow" />}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Chiryo Energie" />
        <meta property="og:url" content={baseUrl} />
        <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
        <meta property="og:image:alt" content="Chiryo Energie: Votre énergie, votre chemin, l'équilibre à portée de mains" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />
        <meta name="twitter:image:alt" content="Chiryo Energie: Votre énergie, votre chemin, l'équilibre à portée de mains" />
        <meta name="google-site-verification" content="MOpUQdR_qghmbFNNNyThogjUCisgAKht_yDRRClwKyM" />
        <link rel="canonical" href={baseUrl + location.pathname} />
        <Links />
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        <Toast.Provider swipeDirection="right">
          <HoneypotProvider {...honeypotInputProps}>
            <Outlet />
          </HoneypotProvider>
          <Toast.Viewport className="fixed bottom-0 right-0 z-100 flex flex-col p-6 gap-2 w-full max-w-[420px] m-0 list-none outline-none" />
        </Toast.Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

