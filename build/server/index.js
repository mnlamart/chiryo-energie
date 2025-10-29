import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, useLocation, Meta, Links, Outlet, ScrollRestoration, Scripts, useParams, Link as Link$1 } from "react-router";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation as useLocation$1, Link } from "react-router-dom";
function handleRequest(request, responseStatusCode, responseHeaders, routerContext) {
  return new Promise((resolve, reject) => {
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        onShellReady() {
          responseHeaders.set("Content-Type", "text/html");
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const aboutContent = {
  title: "Qui suis-je?",
  paragraphs: [
    "Magnétiseuse coupeuse de feu, voyante et médium, j'ai hérité d'un véritable packaging familial: une arrière grand-mère qui coupait le feu, un grand-père radiesthésiste et des oncles médiums et cartomanciens. J'ai donc évolué dans un univers familial où pendule, tarot de Marseille et coton magnétisé faisaient partie du quotidien.",
    `J'ai souvent eu l'impression depuis toute petite que je n'étais pas "comme tout le monde", mon hypersensibilité à mon environnement, aux gens, aux lieux que je croisais ne faisait que s'accroître au fil du temps jusqu'à devenir pressante. Il me fallait donc mettre cette sensibilité au service des gens.`,
    "Et puis des accidents de vie m'ont amenée à un long chemin de développement personnel: la Sophrologie tout d'abord et puis le Reiki, entre autres outils qui m'ont permis de me relever de ces parcours longs et difficiles, de travailler sur moi et d'accéder à un véritable lâcher-prise.",
    "Chiryo Energie est alors né d'une passion pour le bien-être et d'une volonté d'aider chacun à trouver son équilibre. Je suis fière de vous offrir une approche personnalisée et attentive. Mon objectif est de vous accompagner vers une vie plus épanouie et pleine d'énergie. En tant que Psycho énergéticienne: Magnétiseuse, Maître enseignante en Reiki, Sophro relaxologue, je travaille à distance, en présentiel, à domicile.",
    "En aucun cas les séances ne sauraient se substituer à un avis médical."
  ]
};
const heroContent = {
  title: "Votre énergie, votre chemin, l'équilibre à portée de mains",
  subtitle: "Je suis ravie de vous accueillir là où débute votre histoire.",
  subtitle2: "Rejoignez-moi pour atteindre votre plein potentiel, ensemble!",
  description: "Parce que votre bien-être n'attend pas, je vous propose plusieurs approches holistiques afin de prendre en charge l'esprit, le corps et l'énergie et ainsi vous aider à favoriser la libération des blocages.",
  description2: "En stimulant la circulation et en apaisant les tensions émotionnelles, les séances énergétiques vous aident à retrouver une sensation d'harmonie profonde encourageant le processus d'auto-guérison.",
  description3: "Découvrez dès à présent les différents services personnalisés et comment vous aider à atteindre votre propre équilibre intérieur."
};
const contactInfo = {
  phone: "06.61.86.94.01",
  email: "chiryoenergie@gmail.com",
  location: "Joué-Les-Tours, France"
};
const services = [
  {
    id: "reiki",
    title: "Reiki",
    description: "Méthode non conventionnelle d'origine japonaise, fondée sur des soins dits « énergétiques » par imposition des mains. La personne reste habillée.",
    price: "60 euros",
    duration: "1h environ",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    notes: "Maître enseignante en Reiki, je vous propose soins et initiations. Forfait si plusieurs séances. Travail à distance possible. Pour les initiations me contacter directement."
  },
  {
    id: "sophro-relaxation",
    title: "Sophro-relaxation",
    description: "Combinaison de techniques de relaxation, de respiration et de visualisation positive visant à favoriser le bien-être physique et mental et à réduire le stress.",
    price: "60 euros (adulte)",
    duration: "1h environ",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    notes: "45 euros la séance enfant jusqu'à 15 ans. Protocoles établis et personnalisés selon les difficultés rencontrées. Forfait si plusieurs séances. Pour les initiations me contacter directement."
  },
  {
    id: "relaxation-energetique",
    title: "Relaxation énergétique corps",
    description: "Stimulation de points en digipression sur la face avant.",
    price: "35 euros",
    duration: "30 minutes environ",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80"
  },
  {
    id: "reflexologie",
    title: "Réflexologie plantaire",
    description: `C'est le pied! et pour cause, cette pratique se situe au niveau de la plante des pieds, véritable "tableau de bord" de l'ensemble du corps. Les pieds sont "découpés" en zones, correspondant à un tissus ou à un organe. Solliciter ces points permet de réguler les déséquilibres.`,
    price: "50 euros",
    duration: "1h environ dont 10 minutes de balnéo pieds",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    notes: "Forfait si plusieurs séances."
  },
  {
    id: "harmonisation-lymphatique",
    title: "Harmonisation lymphatique",
    description: "L'harmonisation se fait avec les doigts et la paume des mains sur l'ensemble du corps, en suivant le sens de la circulation lymphatique et en variant la pression. Elle joue un rôle important dans l'élimination des déchets et vise à favoriser l'amincissement.",
    price: "60 euros",
    duration: "1h environ",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    notes: "Forfait si plusieurs séances."
  },
  {
    id: "shiatsu-sevrage",
    title: "Shiatsu sevrage tabagique",
    description: "Pratique japonaise favorisant la circulation énergétique, sanguine et lymphatique par des pressions, des étirements et des mobilisations articulaires, pouvant aider et accompagner la personne pendant la période de sevrage.",
    price: "50 euros",
    duration: "entre 30 et 45 minutes",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    notes: "Prévoir 5 séances minimum avant suivi. Forfait possible."
  },
  {
    id: "magnetiseuse",
    title: "Magnétiseuse coupeuse de feu",
    description: "Pratique de soins énergétiques par apposition des mains et/ou passes magnétiques. Mes champs d'action sont divers: brûlures, problèmes de peau tels zona, eczéma, psoriasis, acné, verrues...mais aussi kystes, hémorroïdes, problèmes de sommeil, deuil, stress.",
    price: "Selon les besoins",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    notes: "J'interviens sur les brûlures, y compris à distance ou par téléphone. Mon champs d'action s'étend également au nettoyage des lieux et des personnes. Mon magnétisme intervient sur les personnes et les animaux. Travail à distance possible. Merci de me contacter directement."
  },
  {
    id: "mediumnite",
    title: "Médiumnité Voyance Cartomancie",
    description: "Issue d'un héritage familiale, ma sensibilité peut vous permettre de vous accompagner et de vous guider sur votre chemin de vie. J'utilise certains outils comme le pendule et les cartes, mais les informations peuvent aussi m'être transmises sans l'utilisation de support. Je suis un canal et vous retransmets ce que je reçois.",
    price: "60 euros",
    duration: "La consultation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    notes: "Consultation par téléphone ou en présentiel. Travail à distance possible. Pour les nettoyages de personnes, de lieux, pour couper les liens toxiques... Merci de me contacter directement. Chaque protocole étant propre à la situation de chacun."
  }
];
const testimonials = [
  {
    id: "1",
    author: "Isabelle B.",
    text: "J'ai rencontré cette thérapeute il y a déjà plusieurs années, c'est une personne de confiance. Vous pouvez lui confier votre bien-être. Elle a le don de vous faire retrouver vos énergies positives",
    avatar: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: "2",
    author: "Chantal B",
    text: "Thérapeute à l'écoute, bienveillante et efficace.",
    avatar: "https://i.pravatar.cc/150?img=45"
  },
  {
    id: "3",
    author: "Elodie L.",
    text: "Merci encore mille fois pour votre intervention. Brûlée à la main mais soulagée en quelques minutes",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    id: "4",
    author: "Sandrine D.",
    text: "Je recommande vivement",
    avatar: "https://i.pravatar.cc/150?img=33"
  }
];
const generalFAQs = [
  {
    question: "Qu'est-ce que le Reiki ?",
    answer: "Le Reiki est une méthode non conventionnelle d'origine japonaise, fondée sur des soins dits « énergétiques » par imposition des mains. La personne reste habillée pendant la séance."
  },
  {
    question: "Combien de séances sont nécessaires ?",
    answer: "Cela dépend du service et de vos besoins. Pour le Shiatsu sevrage tabagique, il est recommandé de prévoir 5 séances minimum. Pour d'autres services, un forfait peut être établi selon vos besoins."
  },
  {
    question: "Les séances peuvent-elles se faire à distance ?",
    answer: "Oui, plusieurs services peuvent être effectués à distance : le Reiki, la Magnétiseuse (y compris coupeur de feu pour brûlures), et la Médiumnité Voyance. Contactez-moi directement pour plus d'informations."
  },
  {
    question: "Quels sont les tarifs des séances ?",
    answer: "Les tarifs varient selon le service : Reiki et Sophro-relaxation (60€), Réflexologie plantaire (50€), Relaxation énergétique (35€). Un forfait est disponible pour plusieurs séances. Contactez-moi pour les services sur mesure."
  },
  {
    question: "Les séances se substituent-elles à un avis médical ?",
    answer: "Non, en aucun cas les séances ne sauraient se substituer à un avis médical. Les services proposés sont complémentaires au traitement médical et visent à améliorer le bien-être global."
  },
  {
    question: "Qu'est-ce que la coupe de feu ?",
    answer: "La coupe de feu est une pratique de soins énergétiques par apposition des mains permettant de soulager les brûlures. J'interviens sur les brûlures, y compris à distance ou par téléphone."
  }
];
const serviceFAQs = {
  reiki: [
    {
      question: "Comment se déroule une séance de Reiki ?",
      answer: "La séance de Reiki dure environ 1 heure. Vous restez habillé et allongé sur une table de massage. J'appose mes mains sur différents points de votre corps pour transmettre l'énergie Reiki, favorisant la relaxation et le bien-être."
    },
    {
      question: "Combien de temps dure une séance de Reiki ?",
      answer: "Une séance de Reiki dure environ 1 heure."
    },
    {
      question: "Le Reiki peut-il se faire à distance ?",
      answer: "Oui, le Reiki peut être pratiqué à distance. Contactez-moi pour discuter de cette possibilité."
    },
    {
      question: "Proposez-vous des initiations au Reiki ?",
      answer: "Oui, en tant que Maître enseignante en Reiki, je propose des initiations. Contactez-moi directement pour plus d'informations sur les initiations."
    }
  ],
  "sophro-relaxation": [
    {
      question: "Qu'est-ce que la Sophro-relaxation ?",
      answer: "La Sophro-relaxation combine des techniques de relaxation, de respiration et de visualisation positive pour favoriser le bien-être physique et mental et réduire le stress."
    },
    {
      question: "Y a-t-il un tarif différent pour les enfants ?",
      answer: "Oui, pour les enfants jusqu'à 15 ans, la séance est à 45 euros au lieu de 60 euros pour les adultes."
    },
    {
      question: "Les protocoles sont-ils personnalisés ?",
      answer: "Oui, les protocoles sont établis et personnalisés selon les difficultés rencontrées par chaque personne."
    },
    {
      question: "Proposez-vous des initiations à la Sophrologie ?",
      answer: "Oui, je propose des initiations. Contactez-moi directement pour plus d'informations."
    }
  ],
  "relaxation-energetique": [
    {
      question: "En quoi consiste la relaxation énergétique du corps ?",
      answer: "Cette pratique consiste en la stimulation de points en digipression sur la face avant du corps, favorisant la détente et l'harmonie énergétique."
    },
    {
      question: "Combien de temps dure cette séance ?",
      answer: "La séance de relaxation énergétique dure environ 30 minutes."
    }
  ],
  reflexologie: [
    {
      question: "Qu'est-ce que la réflexologie plantaire ?",
      answer: "La réflexologie plantaire est une pratique située au niveau de la plante des pieds, véritable 'tableau de bord' de l'ensemble du corps. Les pieds sont découpés en zones correspondant à des tissus ou organes. Solliciter ces points permet de réguler les déséquilibres."
    },
    {
      question: "Que comprend la séance de réflexologie ?",
      answer: "La séance dure environ 1 heure et comprend 10 minutes de balnéo pieds avant le soin."
    },
    {
      question: "Y a-t-il des forfaits disponibles ?",
      answer: "Oui, un forfait est disponible si vous prenez plusieurs séances."
    }
  ],
  "harmonisation-lymphatique": [
    {
      question: "Qu'est-ce que l'harmonisation lymphatique ?",
      answer: "L'harmonisation se fait avec les doigts et la paume des mains sur l'ensemble du corps, en suivant le sens de la circulation lymphatique et en variant la pression. Elle joue un rôle important dans l'élimination des déchets et vise à favoriser l'amincissement."
    },
    {
      question: "Combien de temps dure la séance ?",
      answer: "La séance d'harmonisation lymphatique dure environ 1 heure."
    },
    {
      question: "Y a-t-il des forfaits ?",
      answer: "Oui, un forfait est disponible si vous prenez plusieurs séances."
    }
  ],
  "shiatsu-sevrage": [
    {
      question: "Comment le Shiatsu peut-il aider au sevrage tabagique ?",
      answer: "Le Shiatsu est une pratique japonaise favorisant la circulation énergétique, sanguine et lymphatique par des pressions, des étirements et des mobilisations articulaires, pouvant aider et accompagner la personne pendant la période de sevrage."
    },
    {
      question: "Combien de séances sont recommandées ?",
      answer: "Il est recommandé de prévoir 5 séances minimum avant le suivi."
    },
    {
      question: "Combien de temps dure une séance ?",
      answer: "Une séance de Shiatsu sevrage tabagique dure entre 30 et 45 minutes."
    },
    {
      question: "Y a-t-il des forfaits disponibles ?",
      answer: "Oui, un forfait est possible pour ce service."
    }
  ],
  magnetiseuse: [
    {
      question: "Qu'est-ce que le magnétisme ?",
      answer: "Le magnétisme est une pratique de soins énergétiques par apposition des mains et/ou passes magnétiques. Mes champs d'action sont divers : brûlures, problèmes de peau (zona, eczéma, psoriasis, acné, verrues), kystes, hémorroïdes, problèmes de sommeil, deuil, stress."
    },
    {
      question: "Qu'est-ce que la coupe de feu ?",
      answer: "La coupe de feu permet d'intervenir sur les brûlures, y compris à distance ou par téléphone. J'interviens rapidement pour soulager la douleur des brûlures."
    },
    {
      question: "Pouvez-vous intervenir à distance ?",
      answer: "Oui, le travail à distance est possible, notamment pour les brûlures. Contactez-moi par téléphone pour une intervention urgente."
    },
    {
      question: "Travaillez-vous également sur les animaux ?",
      answer: "Oui, mon magnétisme intervient sur les personnes et les animaux."
    },
    {
      question: "Faites-vous du nettoyage de lieux ?",
      answer: "Oui, mon champ d'action s'étend également au nettoyage des lieux et des personnes. Contactez-moi directement car chaque protocole est propre à la situation."
    }
  ],
  mediumnite: [
    {
      question: "Qu'est-ce que la médiumnité ?",
      answer: "Issue d'un héritage familial, ma sensibilité peut vous permettre de vous accompagner et de vous guider sur votre chemin de vie. Je suis un canal et vous retransmets ce que je reçois."
    },
    {
      question: "Utilisez-vous des supports comme les cartes ?",
      answer: "J'utilise certains outils comme le pendule et les cartes, mais les informations peuvent aussi m'être transmises sans l'utilisation de support."
    },
    {
      question: "Peut-on consulter à distance ?",
      answer: "Oui, les consultations peuvent se faire par téléphone ou en présentiel. Le travail à distance est possible."
    },
    {
      question: "Proposez-vous d'autres services comme le nettoyage énergétique ?",
      answer: "Oui, je propose des nettoyages de personnes, de lieux, et la coupe de liens toxiques. Contactez-moi directement car chaque protocole est propre à la situation de chacun."
    }
  ]
};
const rootStylesheetUrl = "/assets/index-C-xTA1Dc.css";
const links = () => [{
  rel: "stylesheet",
  href: rootStylesheetUrl
}, {
  rel: "icon",
  type: "image/svg+xml",
  href: "/vite.svg"
}, {
  rel: "preconnect",
  href: "https://images.unsplash.com"
}, {
  rel: "preconnect",
  href: "https://i.pravatar.cc"
}, {
  rel: "manifest",
  href: "/manifest.json"
}];
const meta$4 = () => [{
  title: "Chiryo Energie - Psycho énergéticienne"
}, {
  name: "description",
  content: "Votre énergie, votre chemin, l'équilibre à portée de mains. Chiryo Energie offre des services holistiques pour votre bien-être."
}, {
  name: "robots",
  content: "index, follow"
}, {
  name: "theme-color",
  content: "#8B4513"
}, {
  name: "apple-mobile-web-app-capable",
  content: "yes"
}, {
  name: "author",
  content: "Chiryo Energie"
}, {
  property: "og:type",
  content: "website"
}, {
  property: "og:site_name",
  content: "Chiryo Energie"
}, {
  property: "og:image",
  content: "https://www.chiryo-energie.fr/og-image.jpg"
}, {
  name: "twitter:card",
  content: "summary_large_image"
}];
function generateStructuredData(pathname) {
  const baseUrl = "https://www.chiryo-energie.fr";
  const schemas = [];
  const currentService = services.find((s) => pathname === `/services/${s.id}`);
  if (pathname === "/") {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: generalFAQs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    };
    schemas.push(faqSchema);
  }
  if (currentService && serviceFAQs[currentService.id]) {
    const serviceFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: serviceFAQs[currentService.id].map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    };
    schemas.push(serviceFaqSchema);
  }
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}#business`,
    name: "Chiryo Energie",
    alternateName: "Chiryo Energie Psycho énergéticienne",
    description: "Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité à Joué-Les-Tours, France.",
    url: baseUrl,
    telephone: contactInfo.phone.replace(/\./g, ""),
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Joué-Les-Tours",
      addressCountry: "FR"
    },
    priceRange: "€€",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: testimonials.length.toString(),
      bestRating: "5",
      worstRating: "5"
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.author
      },
      reviewBody: testimonial.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5"
      }
    }))
  };
  schemas.push(businessSchema);
  if (currentService) {
    const priceMatch = currentService.price.match(/\d+/);
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: currentService.title,
      description: currentService.description,
      provider: {
        "@id": `${baseUrl}#business`
      },
      areaServed: {
        "@type": "Country",
        name: "France"
      },
      offers: {
        "@type": "Offer",
        price: priceMatch ? priceMatch[0] : "0",
        priceCurrency: "EUR",
        description: currentService.price,
        availability: "https://schema.org/InStock"
      },
      serviceType: currentService.title,
      url: `${baseUrl}/services/${currentService.id}`
    };
    schemas.push(serviceSchema);
  }
  if (pathname === "/") {
    services.forEach((service) => {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@id": `${baseUrl}#business`
        },
        url: `${baseUrl}/services/${service.id}`
      };
      schemas.push(serviceSchema);
    });
  }
  const breadcrumbs = [{
    position: 1,
    name: "Accueil",
    item: `${baseUrl}/`
  }];
  if (pathname === "/contact") {
    breadcrumbs.push({
      position: 2,
      name: "Contact",
      item: `${baseUrl}/contact`
    });
  } else if (currentService) {
    breadcrumbs.push({
      position: 2,
      name: "Services",
      item: `${baseUrl}/#services`
    });
    breadcrumbs.push({
      position: 3,
      name: currentService.title,
      item: `${baseUrl}/services/${currentService.id}`
    });
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb) => ({
      "@type": "ListItem",
      position: crumb.position,
      name: crumb.name,
      item: crumb.item
    }))
  };
  schemas.push(breadcrumbSchema);
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}#person`,
    name: "Chiryo Energie",
    jobTitle: "Psycho énergéticienne",
    description: "Magnétiseuse coupeuse de feu, voyante et médium, Maître enseignante en Reiki, Sophro relaxologue",
    knowsAbout: ["Reiki", "Sophrologie", "Réflexologie plantaire", "Magnétisme", "Shiatsu", "Médiumnité", "Voyance", "Cartomancie"],
    worksFor: {
      "@id": `${baseUrl}#business`
    }
  };
  schemas.push(personSchema);
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Chiryo Energie",
    url: baseUrl,
    description: "Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité à Joué-Les-Tours, France."
  };
  schemas.push(websiteSchema);
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
      availableLanguage: "French"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Joué-Les-Tours",
      addressCountry: "FR"
    }
  };
  schemas.push(organizationSchema);
  return schemas;
}
const root = UNSAFE_withComponentProps(function Root() {
  const location = useLocation();
  const schemas = generateStructuredData(location.pathname);
  return /* @__PURE__ */ jsxs("html", {
    lang: "fr",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), schemas.map((schema, index) => /* @__PURE__ */ jsx("script", {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify(schema)
        }
      }, index))]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: root,
  links,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function Container({ children, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `container mx-auto px-4 sm:px-6 lg:px-8 ${className}`, children });
}
function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer";
  const variantClasses = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    secondary: "bg-warm-100 text-gray-900 hover:bg-warm-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: `${baseClasses} ${variantClasses[variant]} ${className}`,
      ...props,
      children
    }
  );
}
function Hero() {
  const navigate = useNavigate();
  const location = useLocation$1();
  const scrollToServices = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const servicesSection = document.getElementById("services");
        if (servicesSection) {
          const headerOffset = 80;
          const elementPosition = servicesSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        const headerOffset = 80;
        const elementPosition = servicesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };
  return /* @__PURE__ */ jsxs("section", { className: "relative bg-gradient-to-br from-primary-50 to-warm-50 py-20 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80",
        alt: "Meditation and wellness",
        className: "w-full h-full object-cover",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "relative text-center max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6", children: heroContent.title }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-primary-700 italic font-medium", children: heroContent.subtitle }),
        /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-primary-700 italic font-medium", children: heroContent.subtitle2 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-gray-700 text-lg leading-relaxed mb-10", children: [
        /* @__PURE__ */ jsx("p", { children: heroContent.description }),
        /* @__PURE__ */ jsx("p", { children: heroContent.description2 }),
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: heroContent.description3 })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
        /* @__PURE__ */ jsx(Button, { onClick: scrollToServices, children: "Commençons" }),
        /* @__PURE__ */ jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Me contacter" }) })
      ] })
    ] }) })
  ] });
}
function ServiceCard({ service }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 overflow-hidden flex flex-col hover:scale-105", children: [
    service.image && /* @__PURE__ */ jsx(Link, { to: `/services/${service.id}`, className: "mb-4 -mx-6 -mt-6 block", children: /* @__PURE__ */ jsx(
      "img",
      {
        src: service.image,
        alt: service.title,
        className: "w-full h-48 object-cover hover:opacity-90 transition-opacity",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-primary-600 mb-3", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: `/services/${service.id}`,
        className: "hover:text-primary-700 transition-colors",
        children: service.title
      }
    ) }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-700 mb-4 leading-relaxed flex-grow", children: service.description }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: "Tarif:" }),
        /* @__PURE__ */ jsx("span", { className: "text-primary-600 font-medium", children: service.price })
      ] }),
      service.duration && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-900", children: "Durée:" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: service.duration })
      ] })
    ] }),
    service.notes && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 italic border-t pt-3 mb-4", children: service.notes }),
    /* @__PURE__ */ jsx(Link, { to: `/services/${service.id}`, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", className: "w-full", children: "En savoir plus" }) })
  ] });
}
function Services() {
  return /* @__PURE__ */ jsx("section", { id: "services", className: "py-20 bg-white", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-12", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: "Prestations de service" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: services.map((service) => /* @__PURE__ */ jsx(ServiceCard, { service }, service.id)) })
  ] }) });
}
function About() {
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center", children: aboutContent.title }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "md:col-span-1", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
          alt: "Chiryo Energie - Psycho énergéticienne",
          className: "w-full rounded-lg shadow-lg object-cover aspect-square",
          loading: "lazy"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-2 space-y-6 text-gray-700 leading-relaxed", children: aboutContent.paragraphs.map((paragraph, index) => /* @__PURE__ */ jsx("p", { className: "text-lg", children: paragraph }, index)) })
    ] })
  ] }) }) });
}
function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1e4);
  };
  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1e4);
  };
  const goToNext = () => {
    setCurrentIndex(
      (prevIndex) => prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1e4);
  };
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex(
          (prevIndex) => prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5e3);
    }
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: "Témoignages de transformation" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600 max-w-2xl mx-auto", children: "Découvrez comment Chiryo Energie a aidé d'autres personnes à transformer leur vie et à atteindre un bien-être durable. Laissez-vous inspirer par leurs histoires et imaginez votre propre succès." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative",
          onMouseEnter: () => setIsPaused(true),
          onMouseLeave: () => setIsPaused(false),
          children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-primary-50 to-warm-50 rounded-lg p-8 shadow-lg border border-primary-100 min-h-[300px] flex flex-col justify-center transition-opacity duration-500", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-6 mb-6", children: [
              testimonials[currentIndex].avatar && /* @__PURE__ */ jsx(
                "img",
                {
                  src: testimonials[currentIndex].avatar,
                  alt: testimonials[currentIndex].author,
                  className: "w-20 h-20 rounded-full object-cover flex-shrink-0 border-2 border-primary-200",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxs("p", { className: "text-gray-700 italic leading-relaxed text-lg mb-4", children: [
                  '"',
                  testimonials[currentIndex].text,
                  '"'
                ] }),
                /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 mb-2", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-5 h-5 text-warm-500 fill-current",
                    viewBox: "0 0 20 20",
                    children: /* @__PURE__ */ jsx("path", { d: "M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" })
                  },
                  i
                )) }),
                /* @__PURE__ */ jsxs("p", { className: "font-semibold text-primary-600 text-lg", children: [
                  "— ",
                  testimonials[currentIndex].author
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: goToPrevious,
                className: "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
                "aria-label": "Témoignage précédent",
                children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-primary-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: goToNext,
                className: "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
                "aria-label": "Témoignage suivant",
                children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-primary-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2 mt-8", children: testimonials.map((_, index) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => goToSlide(index),
          className: `w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-primary-600 w-8" : "bg-gray-300 hover:bg-gray-400"}`,
          "aria-label": `Aller au témoignage ${index + 1}`
        },
        index
      )) })
    ] })
  ] }) });
}
function FAQ({ question, answer, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-primary-50 to-warm-50 rounded-lg border border-primary-100 overflow-hidden", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "w-full text-left p-6 flex items-center justify-between hover:bg-primary-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer",
        "aria-expanded": isOpen,
        children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg pr-4", children: question }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-5 h-5 text-primary-600 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "px-6 pt-4 pb-6", children: /* @__PURE__ */ jsx("p", { className: "text-gray-700 leading-relaxed", children: answer }) })
  ] });
}
function FAQs() {
  return /* @__PURE__ */ jsx("section", { className: "py-20 bg-gray-50", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: "Questions fréquentes" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-600", children: "Trouvez rapidement les réponses aux questions les plus courantes" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: generalFAQs.map((faq, index) => /* @__PURE__ */ jsx(
      FAQ,
      {
        question: faq.question,
        answer: faq.answer
      },
      index
    )) })
  ] }) }) });
}
function ScrollAnimation({ children, className = "", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry2]) => {
        if (entry2.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: `transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`,
      children
    }
  );
}
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation$1();
  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("header", { className: "bg-white shadow-md sticky top-0 z-50", children: /* @__PURE__ */ jsxs(Container, { className: "py-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors", children: "Chiryo Energie" }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex gap-8", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: `font-medium transition-colors ${isActive("/") ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-700 hover:text-primary-600"}`,
            children: "Accueil"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/#services",
            className: `font-medium transition-colors ${location.pathname.startsWith("/services") ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-700 hover:text-primary-600"}`,
            children: "Services"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/contact",
            className: `font-medium transition-colors ${isActive("/contact") ? "text-primary-600 border-b-2 border-primary-600" : "text-gray-700 hover:text-primary-600"}`,
            children: "Contact"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden text-gray-700 hover:text-primary-600 focus:outline-none",
          onClick: toggleMenu,
          "aria-label": "Toggle menu",
          children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: isMenuOpen ? /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) : /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      )
    ] }),
    isMenuOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-[73px]",
        onClick: closeMenu,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsx(
      "nav",
      {
        className: `md:hidden fixed left-0 right-0 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-y-0 top-[73px]" : "-translate-y-full -top-full"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "px-4 py-6 flex flex-col gap-4 border-t border-gray-200", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/",
              onClick: closeMenu,
              className: `font-medium transition-colors py-2 ${isActive("/") ? "text-primary-600 border-l-4 border-primary-600 pl-4" : "text-gray-700 hover:text-primary-600 pl-4"}`,
              children: "Accueil"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/#services",
              onClick: closeMenu,
              className: `font-medium transition-colors py-2 ${location.pathname.startsWith("/services") ? "text-primary-600 border-l-4 border-primary-600 pl-4" : "text-gray-700 hover:text-primary-600 pl-4"}`,
              children: "Services"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/contact",
              onClick: closeMenu,
              className: `font-medium transition-colors py-2 ${isActive("/contact") ? "text-primary-600 border-l-4 border-primary-600 pl-4" : "text-gray-700 hover:text-primary-600 pl-4"}`,
              children: "Contact"
            }
          )
        ] })
      }
    )
  ] }) });
}
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white mt-auto", children: /* @__PURE__ */ jsxs(Container, { className: "py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4 text-primary-400", children: "Chiryo Energie" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300", children: "Votre énergie, votre chemin, l'équilibre à portée de mains." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-4", children: "Contact" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-300", children: [
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: `tel:${contactInfo.phone}`, className: "hover:text-primary-400 transition-colors", children: contactInfo.phone }) }),
          /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: `mailto:${contactInfo.email}`, className: "hover:text-primary-400 transition-colors", children: contactInfo.email }) }),
          /* @__PURE__ */ jsx("p", { children: contactInfo.location })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-4", children: "Navigation" }),
        /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-2 text-gray-300", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-primary-400 transition-colors", children: "Accueil" }),
          /* @__PURE__ */ jsx(Link, { to: "/#services", className: "hover:text-primary-400 transition-colors", children: "Services" }),
          /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-primary-400 transition-colors", children: "Contact" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold mb-4", children: "Suivez-nous" }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#",
              className: "text-gray-400 hover:text-primary-400 transition-colors",
              "aria-label": "Facebook",
              title: "Facebook",
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "#",
              className: "text-gray-400 hover:text-primary-400 transition-colors",
              "aria-label": "Instagram",
              title: "Instagram",
              children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }) })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 pt-8 border-t border-gray-800 text-center text-gray-400", children: /* @__PURE__ */ jsxs("p", { children: [
      "© ",
      currentYear,
      " Chiryo Energie. Tous droits réservés."
    ] }) })
  ] }) });
}
function SkipToContent() {
  return /* @__PURE__ */ jsx(
    "a",
    {
      href: "#main-content",
      className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500",
      children: "Aller au contenu principal"
    }
  );
}
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: scrollToTop,
      className: "fixed bottom-8 right-8 z-50 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 hover:scale-110",
      "aria-label": "Retour en haut de la page",
      children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 10l7-7m0 0l7 7m-7-7v18" }) })
    }
  );
}
function ScrollToTopOnRouteChange() {
  const { pathname, hash } = useLocation$1();
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      if (!hash) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant"
        });
      }
      prevPathnameRef.current = pathname;
    }
  }, [pathname, hash]);
  return null;
}
function FloatingActionButton() {
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-24 right-8 z-50", children: /* @__PURE__ */ jsxs(
    "a",
    {
      href: `tel:${contactInfo.phone}`,
      className: "flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 hover:scale-105",
      "aria-label": "Appeler maintenant",
      children: [
        /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold hidden sm:inline", children: "Appeler" })
      ]
    }
  ) });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx(SkipToContent, {}),
    /* @__PURE__ */ jsx(ScrollToTopOnRouteChange, {}),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { id: "main-content", className: "flex-grow", children }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx(FloatingActionButton, {})
  ] });
}
const meta$3 = () => [{
  title: "Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours"
}, {
  name: "description",
  content: "Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Prenez rendez-vous à Joué-Les-Tours, France. Maître enseignante en Reiki."
}, {
  property: "og:title",
  content: "Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours"
}, {
  property: "og:description",
  content: "Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Prenez rendez-vous à Joué-Les-Tours, France."
}, {
  property: "og:url",
  content: "https://www.chiryo-energie.fr/"
}, {
  name: "twitter:title",
  content: "Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours"
}, {
  name: "twitter:description",
  content: "Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité."
}];
const _index = UNSAFE_withComponentProps(function Index() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash === "#services") {
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        const headerOffset = 80;
        const elementPosition = servicesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  }, [location.hash]);
  return /* @__PURE__ */ jsxs(Layout, {
    children: [/* @__PURE__ */ jsx(Hero, {}), /* @__PURE__ */ jsx(ScrollAnimation, {
      children: /* @__PURE__ */ jsx(Services, {})
    }), /* @__PURE__ */ jsx(ScrollAnimation, {
      delay: 100,
      children: /* @__PURE__ */ jsx(About, {})
    }), /* @__PURE__ */ jsx(ScrollAnimation, {
      delay: 200,
      children: /* @__PURE__ */ jsx(FAQs, {})
    }), /* @__PURE__ */ jsx(ScrollAnimation, {
      delay: 300,
      children: /* @__PURE__ */ jsx(TestimonialsCarousel, {})
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function FormField({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  error,
  rows,
  placeholder
}) {
  const baseClasses = "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors";
  const errorClasses = error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("label", { htmlFor: id, className: "block text-sm font-medium text-gray-700 mb-2", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: "text-red-500 ml-1", children: "*" })
    ] }),
    rows ? /* @__PURE__ */ jsx(
      "textarea",
      {
        id,
        name,
        value,
        onChange,
        required,
        rows,
        placeholder,
        className: `${baseClasses} ${errorClasses} resize-none`,
        "aria-invalid": error ? "true" : "false",
        "aria-describedby": error ? `${id}-error` : void 0
      }
    ) : /* @__PURE__ */ jsx(
      "input",
      {
        type,
        id,
        name,
        value,
        onChange,
        required,
        placeholder,
        className: `${baseClasses} ${errorClasses}`,
        "aria-invalid": error ? "true" : "false",
        "aria-describedby": error ? `${id}-error` : void 0
      }
    ),
    error && /* @__PURE__ */ jsx("p", { id: `${id}-error`, className: "mt-1 text-sm text-red-600", role: "alert", children: error })
  ] });
}
const meta$2 = () => [{
  title: "Contact - Chiryo Energie"
}, {
  name: "description",
  content: "Contactez Chiryo Energie pour prendre rendez-vous. Téléphone: 06.61.86.94.01, Email: chiryoenergie@gmail.com. Services à Joué-Les-Tours, France."
}, {
  property: "og:title",
  content: "Contact - Chiryo Energie"
}, {
  property: "og:description",
  content: "Contactez Chiryo Energie pour prendre rendez-vous. Téléphone: 06.61.86.94.01, Email: chiryoenergie@gmail.com."
}, {
  property: "og:url",
  content: "https://www.chiryo-energie.fr/contact"
}, {
  name: "twitter:title",
  content: "Contact - Chiryo Energie"
}, {
  name: "twitter:description",
  content: "Contactez Chiryo Energie pour prendre rendez-vous à Joué-Les-Tours, France."
}];
const contact = UNSAFE_withComponentProps(function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePhone = (phone) => {
    if (!phone) return true;
    const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return re.test(phone);
  };
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide";
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Veuillez entrer un numéro de téléphone valide";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: void 0
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setIsSubmitting(true);
    setErrors({});
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      setTimeout(() => setSubmitStatus("idle"), 5e3);
    }, 1e3);
  };
  return /* @__PURE__ */ jsx(Layout, {
    children: /* @__PURE__ */ jsx("div", {
      className: "py-20 bg-gray-50",
      children: /* @__PURE__ */ jsx(Container, {
        children: /* @__PURE__ */ jsxs("div", {
          className: "max-w-4xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "text-center mb-12",
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
              children: "Pour me contacter"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-lg text-gray-600",
              children: "N'hésitez pas à me contacter pour toute question ou pour prendre rendez-vous"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-12",
            children: [/* @__PURE__ */ jsx("div", {
              className: "space-y-6",
              children: /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h2", {
                  className: "text-2xl font-bold text-gray-900 mb-6",
                  children: "Informations de contact"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "space-y-4",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-start gap-4",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0",
                      children: /* @__PURE__ */ jsx("svg", {
                        className: "w-5 h-5 text-primary-600",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        })
                      })
                    }), /* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "font-semibold text-gray-900",
                        children: "Téléphone"
                      }), /* @__PURE__ */ jsx("a", {
                        href: `tel:${contactInfo.phone}`,
                        className: "text-primary-600 hover:text-primary-700 transition-colors",
                        children: contactInfo.phone
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-start gap-4",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0",
                      children: /* @__PURE__ */ jsx("svg", {
                        className: "w-5 h-5 text-primary-600",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        })
                      })
                    }), /* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "font-semibold text-gray-900",
                        children: "Email"
                      }), /* @__PURE__ */ jsx("a", {
                        href: `mailto:${contactInfo.email}`,
                        className: "text-primary-600 hover:text-primary-700 transition-colors",
                        children: contactInfo.email
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-start gap-4",
                    children: [/* @__PURE__ */ jsx("div", {
                      className: "w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0",
                      children: /* @__PURE__ */ jsxs("svg", {
                        className: "w-5 h-5 text-primary-600",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: [/* @__PURE__ */ jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        }), /* @__PURE__ */ jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        })]
                      })
                    }), /* @__PURE__ */ jsxs("div", {
                      children: [/* @__PURE__ */ jsx("p", {
                        className: "font-semibold text-gray-900",
                        children: "Localisation"
                      }), /* @__PURE__ */ jsx("p", {
                        className: "text-gray-700",
                        children: contactInfo.location
                      })]
                    })]
                  })]
                })]
              })
            }), /* @__PURE__ */ jsx("div", {
              children: /* @__PURE__ */ jsxs("form", {
                onSubmit: handleSubmit,
                className: "space-y-6",
                noValidate: true,
                children: [/* @__PURE__ */ jsx(FormField, {
                  label: "Nom complet",
                  id: "name",
                  name: "name",
                  type: "text",
                  value: formData.name,
                  onChange: handleChange,
                  required: true,
                  error: errors.name
                }), /* @__PURE__ */ jsx(FormField, {
                  label: "Email",
                  id: "email",
                  name: "email",
                  type: "email",
                  value: formData.email,
                  onChange: handleChange,
                  required: true,
                  error: errors.email
                }), /* @__PURE__ */ jsx(FormField, {
                  label: "Téléphone",
                  id: "phone",
                  name: "phone",
                  type: "tel",
                  value: formData.phone,
                  onChange: handleChange,
                  error: errors.phone,
                  placeholder: "06 12 34 56 78"
                }), /* @__PURE__ */ jsx(FormField, {
                  label: "Message",
                  id: "message",
                  name: "message",
                  value: formData.message,
                  onChange: handleChange,
                  required: true,
                  rows: 5,
                  error: errors.message
                }), submitStatus === "success" && /* @__PURE__ */ jsx("div", {
                  className: "bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg",
                  children: "Merci ! Votre message a été envoyé. Je vous répondrai dans les plus brefs délais."
                }), /* @__PURE__ */ jsx(Button, {
                  type: "submit",
                  disabled: isSubmitting,
                  children: isSubmitting ? "Envoi en cours..." : "Envoyer le message"
                })]
              })
            })]
          })]
        })
      })
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function Breadcrumbs({ items }) {
  return /* @__PURE__ */ jsx("nav", { className: "mb-8 text-sm", "aria-label": "Fil d'Ariane", children: /* @__PURE__ */ jsx("ol", { className: "flex items-center space-x-2 text-gray-600", children: items.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
    index > 0 && /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
    index === items.length - 1 ? /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-medium", "aria-current": "page", children: item.label }) : /* @__PURE__ */ jsx(
      Link,
      {
        to: item.path,
        className: "hover:text-primary-600 transition-colors",
        children: item.label
      }
    )
  ] }, item.path)) }) });
}
const meta$1 = ({
  params
}) => {
  const service = services.find((s) => s.id === params.id);
  if (!service) {
    return [{
      title: "Service non trouvé - Chiryo Energie"
    }, {
      name: "description",
      content: "Le service demandé n'existe pas."
    }];
  }
  const description = `${service.description.substring(0, 155)}... Tarif: ${service.price}. ${service.duration ? `Durée: ${service.duration}.` : ""} Prise de rendez-vous à Joué-Les-Tours.`;
  return [{
    title: `${service.title} à Joué-Les-Tours | Chiryo Energie`
  }, {
    name: "description",
    content: description
  }, {
    property: "og:title",
    content: `${service.title} à Joué-Les-Tours | Chiryo Energie`
  }, {
    property: "og:description",
    content: description
  }, {
    property: "og:url",
    content: `https://www.chiryo-energie.fr/services/${service.id}`
  }, {
    name: "twitter:title",
    content: `${service.title} à Joué-Les-Tours | Chiryo Energie`
  }, {
    name: "twitter:description",
    content: description
  }];
};
const services_$id = UNSAFE_withComponentProps(function Service() {
  const {
    id
  } = useParams();
  const service = services.find((s) => s.id === id);
  if (!service) {
    return /* @__PURE__ */ jsx(Layout, {
      children: /* @__PURE__ */ jsx("div", {
        className: "py-20",
        children: /* @__PURE__ */ jsx(Container, {
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-4xl font-bold text-gray-900 mb-4",
              children: "Service non trouvé"
            }), /* @__PURE__ */ jsx(Link$1, {
              to: "/",
              className: "text-primary-600 hover:text-primary-700",
              children: "Retour à l'accueil"
            })]
          })
        })
      })
    });
  }
  const faqs = serviceFAQs[service.id] || [];
  return /* @__PURE__ */ jsx(Layout, {
    children: /* @__PURE__ */ jsx("div", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs(Container, {
        children: [/* @__PURE__ */ jsx(Breadcrumbs, {
          items: [{
            label: "Accueil",
            path: "/"
          }, {
            label: "Services",
            path: "/#services"
          }, {
            label: service.title,
            path: `/services/${service.id}`
          }]
        }), /* @__PURE__ */ jsxs("div", {
          className: "max-w-4xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12",
            children: [service.image && /* @__PURE__ */ jsx("div", {
              children: /* @__PURE__ */ jsx("img", {
                src: service.image,
                alt: service.title,
                className: "w-full rounded-lg shadow-lg object-cover aspect-square",
                loading: "lazy"
              })
            }), /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h1", {
                className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6",
                children: service.title
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-4 mb-8",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "bg-primary-50 rounded-lg p-4",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-2 mb-2",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "font-semibold text-gray-900",
                      children: "Tarif:"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-primary-600 font-bold text-xl",
                      children: service.price
                    })]
                  }), service.duration && /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */ jsx("span", {
                      className: "font-semibold text-gray-900",
                      children: "Durée:"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-gray-700",
                      children: service.duration
                    })]
                  })]
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-lg text-gray-700 leading-relaxed",
                  children: service.description
                }), service.notes && /* @__PURE__ */ jsx("div", {
                  className: "bg-gray-50 rounded-lg p-4 border-l-4 border-primary-500",
                  children: /* @__PURE__ */ jsx("p", {
                    className: "text-gray-700 italic",
                    children: service.notes
                  })
                })]
              }), /* @__PURE__ */ jsx(Link$1, {
                to: "/contact",
                children: /* @__PURE__ */ jsx(Button, {
                  children: "Prendre rendez-vous"
                })
              })]
            })]
          }), faqs.length > 0 && /* @__PURE__ */ jsxs("section", {
            className: "mt-16",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-3xl font-bold text-gray-900 mb-8",
              children: ["Questions fréquentes - ", service.title]
            }), /* @__PURE__ */ jsx("div", {
              className: "space-y-4",
              children: faqs.map((faq, index) => /* @__PURE__ */ jsx(FAQ, {
                question: faq.question,
                answer: faq.answer
              }, index))
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-16 bg-gradient-to-br from-primary-50 to-warm-50 rounded-lg p-8 text-center",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-bold text-gray-900 mb-4",
              children: "Prêt à commencer votre parcours de bien-être ?"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-700 mb-6",
              children: "Contactez-moi dès aujourd'hui pour prendre rendez-vous"
            }), /* @__PURE__ */ jsx(Link$1, {
              to: "/contact",
              children: /* @__PURE__ */ jsx(Button, {
                children: "Me contacter"
              })
            })]
          })]
        })]
      })
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: services_$id,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader({
  request
}) {
  const baseUrl = "https://www.chiryo-energie.fr";
  const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const urls = [{
    loc: `${baseUrl}/`,
    lastmod: currentDate,
    changefreq: "weekly",
    priority: "1.0"
  }, {
    loc: `${baseUrl}/contact`,
    lastmod: currentDate,
    changefreq: "monthly",
    priority: "0.8"
  }, ...services.map((service) => ({
    loc: `${baseUrl}/services/${service.id}`,
    lastmod: currentDate,
    changefreq: "monthly",
    priority: "0.9"
  }))];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => [{
  title: "Page non trouvée - 404 | Chiryo Energie"
}, {
  name: "description",
  content: "La page que vous recherchez n'existe pas ou a été déplacée."
}, {
  property: "og:title",
  content: "Page non trouvée - 404"
}, {
  property: "og:description",
  content: "La page que vous recherchez n'existe pas ou a été déplacée."
}, {
  "http-equiv": "refresh",
  content: "0; url=/"
}];
const $ = UNSAFE_withComponentProps(function NotFound() {
  return /* @__PURE__ */ jsx(Layout, {
    children: /* @__PURE__ */ jsx("div", {
      className: "py-20 bg-gray-50 min-h-screen flex items-center",
      children: /* @__PURE__ */ jsx(Container, {
        children: /* @__PURE__ */ jsxs("div", {
          className: "text-center max-w-2xl mx-auto",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-6xl md:text-8xl font-bold text-primary-600 mb-4",
            children: "404"
          }), /* @__PURE__ */ jsx("h2", {
            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
            children: "Page non trouvée"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-lg text-gray-600 mb-8",
            children: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée."
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col sm:flex-row gap-4 justify-center",
            children: [/* @__PURE__ */ jsx(Link$1, {
              to: "/",
              children: /* @__PURE__ */ jsx(Button, {
                children: "Retour à l'accueil"
              })
            }), /* @__PURE__ */ jsx(Link$1, {
              to: "/contact",
              children: /* @__PURE__ */ jsx(Button, {
                variant: "secondary",
                children: "Me contacter"
              })
            })]
          })]
        })
      })
    })
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CR1lJv77.js", "imports": ["/assets/chunk-UIGDSWPH--69xGPky.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/root-CyDybQAO.js", "imports": ["/assets/chunk-UIGDSWPH--69xGPky.js", "/assets/content-BX6DU6Ap.js", "/assets/faqs-Cm8EQ0l9.js", "/assets/testimonials-DwFbxMcG.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_index-CEDvcVNf.js", "imports": ["/assets/chunk-UIGDSWPH--69xGPky.js", "/assets/Layout-CPnvsTys.js", "/assets/content-BX6DU6Ap.js", "/assets/faqs-Cm8EQ0l9.js", "/assets/testimonials-DwFbxMcG.js", "/assets/FAQ-B5p0VrTD.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-z2u4WBc9.js", "imports": ["/assets/chunk-UIGDSWPH--69xGPky.js", "/assets/Layout-CPnvsTys.js", "/assets/content-BX6DU6Ap.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/services.$id": { "id": "routes/services.$id", "parentId": "root", "path": "services/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/services._id-D5OKfv6l.js", "imports": ["/assets/chunk-UIGDSWPH--69xGPky.js", "/assets/Layout-CPnvsTys.js", "/assets/FAQ-B5p0VrTD.js", "/assets/faqs-Cm8EQ0l9.js", "/assets/content-BX6DU6Ap.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/sitemap[.]xml": { "id": "routes/sitemap[.]xml", "parentId": "root", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/sitemap_._xml-l0sNRNKZ.js", "imports": [], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/$": { "id": "routes/$", "parentId": "root", "path": "*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/_-DOhBqNfP.js", "imports": ["/assets/chunk-UIGDSWPH--69xGPky.js", "/assets/Layout-CPnvsTys.js", "/assets/content-BX6DU6Ap.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-2764481a.js", "version": "2764481a", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/services.$id": {
    id: "routes/services.$id",
    parentId: "root",
    path: "services/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/sitemap[.]xml": {
    id: "routes/sitemap[.]xml",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
