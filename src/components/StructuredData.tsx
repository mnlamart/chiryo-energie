import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { contactInfo } from '../data/content';
import { services } from '../data/services';
import { testimonials } from '../data/testimonials';
import { generalFAQs, serviceFAQs } from '../data/faqs';

export default function StructuredData() {
  const location = useLocation();
  const currentService = services.find(s => location.pathname === `/services/${s.id}`);

  useEffect(() => {
    const baseUrl = 'https://www.chiryo-energie.fr';
    const schemas: object[] = [];

    // 1. FAQPage Schema (for home page)
    if (location.pathname === '/') {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": generalFAQs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
      schemas.push(faqSchema);
    }

    // 2. Service-specific FAQ (for service pages)
    if (currentService && serviceFAQs[currentService.id]) {
      const serviceFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": serviceFAQs[currentService.id].map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
      schemas.push(serviceFaqSchema);
    }

    // 3. LocalBusiness with AggregateRating
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}#business`,
      "name": "Chiryo Energie",
      "alternateName": "Chiryo Energie Psycho énergéticienne",
      "description": "Services holistiques de bien-être : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité à Joué-Les-Tours, France.",
      "url": baseUrl,
      "telephone": contactInfo.phone.replace(/\./g, ''),
      "email": contactInfo.email,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Joué-Les-Tours",
        "addressCountry": "FR"
      },
      "priceRange": "€€",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": testimonials.length.toString(),
        "bestRating": "5",
        "worstRating": "5"
      },
      "review": testimonials.map(testimonial => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": testimonial.author
        },
        "reviewBody": testimonial.text,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }))
    };
    schemas.push(businessSchema);

    // 4. Individual Service Schema (for service pages)
    if (currentService) {
      const priceMatch = currentService.price.match(/\d+/);
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": currentService.title,
        "description": currentService.description,
        "provider": {
          "@id": `${baseUrl}#business`
        },
        "areaServed": {
          "@type": "Country",
          "name": "France"
        },
        "offers": {
          "@type": "Offer",
          "price": priceMatch ? priceMatch[0] : "0",
          "priceCurrency": "EUR",
          "description": currentService.price,
          "availability": "https://schema.org/InStock"
        },
        "serviceType": currentService.title,
        "url": `${baseUrl}/services/${currentService.id}`
      };
      schemas.push(serviceSchema);
    }

    // 5. All Services Schema (for home page)
    if (location.pathname === '/') {
      services.forEach(service => {
        const serviceSchema = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": service.title,
          "description": service.description,
          "provider": {
            "@id": `${baseUrl}#business`
          },
          "url": `${baseUrl}/services/${service.id}`
        };
        schemas.push(serviceSchema);
      });
    }

    // 6. BreadcrumbList
    const breadcrumbs = [
      { position: 1, name: "Accueil", item: `${baseUrl}/` }
    ];
    
    if (location.pathname === '/contact') {
      breadcrumbs.push({ position: 2, name: "Contact", item: `${baseUrl}/contact` });
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
      "itemListElement": breadcrumbs.map((crumb) => ({
        "@type": "ListItem",
        "position": crumb.position,
        "name": crumb.name,
        "item": crumb.item
      }))
    };
    schemas.push(breadcrumbSchema);

    // 7. Person Schema (practitioner)
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${baseUrl}#person`,
      "name": "Chiryo Energie",
      "jobTitle": "Psycho énergéticienne",
      "description": "Magnétiseuse coupeuse de feu, voyante et médium, Maître enseignante en Reiki, Sophro relaxologue",
      "knowsAbout": [
        "Reiki",
        "Sophrologie",
        "Réflexologie plantaire",
        "Magnétisme",
        "Shiatsu",
        "Médiumnité",
        "Voyance",
        "Cartomancie"
      ],
      "worksFor": {
        "@id": `${baseUrl}#business`
      }
    };
    schemas.push(personSchema);

    // Inject all schemas
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`structured-data-${index}`);
        if (script) script.remove();
      });
    };
  }, [location, currentService]);

  return null;
}

