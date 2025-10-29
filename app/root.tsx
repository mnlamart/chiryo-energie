import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { LinksFunction, MetaFunction } from "react-router";
import { contactInfo } from "../src/data/content";
import { services } from "../src/data/services";
import { testimonials } from "../src/data/testimonials";
import { generalFAQs, serviceFAQs } from "../src/data/faqs";
import { useLocation } from "react-router";

import rootStylesheetUrl from "../src/index.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: rootStylesheetUrl },
  { rel: "icon", type: "image/svg+xml", href: "/vite.svg" },
  { rel: "preconnect", href: "https://images.unsplash.com" },
  { rel: "dns-prefetch", href: "https://images.unsplash.com" },
  { rel: "preconnect", href: "https://i.pravatar.cc" },
  { rel: "dns-prefetch", href: "https://i.pravatar.cc" },
  { rel: "manifest", href: "/manifest.json" },
];

export const meta: MetaFunction = () => [
  { title: "Chiryo Energie - Psycho énergéticienne" },
  {
    name: "description",
    content:
      "Votre énergie, votre chemin, l'équilibre à portée de mains. Chiryo Energie offre des services holistiques pour votre bien-être.",
  },
  { name: "robots", content: "index, follow" },
  { name: "theme-color", content: "#8B4513" },
  { name: "apple-mobile-web-app-capable", content: "yes" },
  { name: "author", content: "Chiryo Energie" },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: "Chiryo Energie" },
  { property: "og:image", content: "https://www.chiryo-energie.fr/og-image.jpg" },
  { name: "twitter:card", content: "summary_large_image" },
];

function generateStructuredData(pathname: string) {
  const baseUrl = "https://www.chiryo-energie.fr";
  const schemas: object[] = [];

  const currentService = services.find(
    (s) => pathname === `/services/${s.id}`
  );

  // 1. FAQPage Schema (for home page)
  if (pathname === "/") {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: generalFAQs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
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
      mainEntity: serviceFAQs[currentService.id].map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
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
      "Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité à Joué-Les-Tours, France.",
    url: baseUrl,
    telephone: contactInfo.phone.replace(/\./g, ""),
    email: contactInfo.email,
    image: `${baseUrl}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Joué-Les-Tours",
      addressRegion: "Centre-Val de Loire",
      postalCode: "37300",
      addressCountry: "FR",
      streetAddress: "", // Add if street address available
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
  }

  // 5. All Services Schema (for home page)
  if (pathname === "/") {
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
  }

  // 6. BreadcrumbList
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
      addressLocality: "Joué-Les-Tours",
      addressCountry: "FR",
    },
  };
  schemas.push(organizationSchema);

  return schemas;
}

export default function Root() {
  const location = useLocation();
  const schemas = generateStructuredData(location.pathname);

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
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
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

