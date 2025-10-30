import { useEffect } from 'react';

const baseUrl =
  (typeof process !== 'undefined' && process.env.BASE_URL) ||
  'https://cheryo-energy.sevend.io';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function MetaTags({ 
  title = "Chiryo Energie - Psycho énergéticienne",
  description = "Votre énergie, votre chemin, l'équilibre à portée de mains. Chiryo Energie offre des services holistiques pour votre bien-être.",
  image = `${baseUrl}/og-image.jpg`,
  url = baseUrl,
  type = "website"
}: MetaTagsProps) {
  useEffect(() => {
    const baseTitle = "Chiryo Energie";
    const fullTitle = title.includes(baseTitle) ? title : `${title} | ${baseTitle}`;
    
    // Update document title
    document.title = fullTitle;

    // Get or create meta tags
    const getOrCreateMeta = (name: string, attribute: string = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      return meta;
    };

    // Update description
    const descriptionMeta = getOrCreateMeta('description');
    descriptionMeta.setAttribute('content', description);

    // Open Graph tags
    const ogTitle = getOrCreateMeta('og:title', 'property');
    ogTitle.setAttribute('content', fullTitle);

    const ogDescription = getOrCreateMeta('og:description', 'property');
    ogDescription.setAttribute('content', description);

    const ogImage = getOrCreateMeta('og:image', 'property');
    ogImage.setAttribute('content', image);

    const ogUrl = getOrCreateMeta('og:url', 'property');
    ogUrl.setAttribute('content', url);

    const ogType = getOrCreateMeta('og:type', 'property');
    ogType.setAttribute('content', type);

    const ogSiteName = getOrCreateMeta('og:site_name', 'property');
    ogSiteName.setAttribute('content', baseTitle);

    // Twitter Card tags
    const twitterCard = getOrCreateMeta('twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');

    const twitterTitle = getOrCreateMeta('twitter:title');
    twitterTitle.setAttribute('content', fullTitle);

    const twitterDescription = getOrCreateMeta('twitter:description');
    twitterDescription.setAttribute('content', description);

    const twitterImage = getOrCreateMeta('twitter:image');
    twitterImage.setAttribute('content', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, image, url, type]);

  return null;
}

