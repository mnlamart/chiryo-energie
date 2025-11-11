# SEO Checklist - Quick Reference

> **📚 For comprehensive documentation**: See [SEO Documentation](./docs/seo-documentation.md)  
> **✅ For detailed checklist**: See [SEO Checklist](./docs/seo-checklist.md)

This is a quick reference checklist. For detailed checklists with examples and validation steps, see the full documentation in the `docs/` folder.

## Meta Tags (Required for all pages)

- [ ] **Title tag** (`<title>`) - Unique, descriptive, includes location (Joué-Les-Tours) when relevant
- [ ] **Meta description** (`meta name="description"`) - 150-160 characters, includes keywords and call-to-action
- [ ] **Meta summary** (`meta name="summary"`) - Extended summary with more details
- [ ] **Meta keywords** (`meta name="keywords"`) - Relevant keywords including location-based terms

## Open Graph Tags (Social Media Sharing)

- [ ] **og:title** - Page title for social sharing
- [ ] **og:description** - Description for social sharing
- [ ] **og:url** - Canonical URL of the page
- [ ] **og:image** - Image URL (`${baseUrl}/og-image.jpg`)
- [ ] **og:image:alt** - Descriptive alt text for the image
- [ ] **og:image:width** - Set to "1200"
- [ ] **og:image:height** - Set to "630"

## Twitter Tags

- [ ] **twitter:title** - Title for Twitter cards
- [ ] **twitter:description** - Description for Twitter cards

## Structured Data (JSON-LD)

- [ ] **BreadcrumbList schema** - Navigation hierarchy (generated in root.tsx)
- [ ] **Page-specific schemas**:
  - Home page: ItemList (services), Article, Service schemas
  - Services page: ItemList (services)
  - Service detail pages: Service, FAQPage, HowTo, LearningResource, Article
  - Tarifs page: ItemList (tarifs with prices), Article
  - FAQs page: FAQPage
  - Contact page: BreadcrumbList only

## Visual Elements

- [ ] **Breadcrumbs component** - Visible navigation breadcrumbs on page
- [ ] **Image alt text** - All images have descriptive alt text including location context
- [ ] **Heading hierarchy** - Proper h1, h2, h3 structure (one h1 per page)

## Technical SEO

- [ ] **Sitemap inclusion** - Page listed in `sitemap.xml`
- [ ] **Canonical URL** - Proper canonical tag (handled in root.tsx)
- [ ] **Mobile responsive** - Page is mobile-friendly
- [ ] **Page load speed** - Images optimized, lazy loading where appropriate

## Content Quality

- [ ] **Unique content** - No duplicate content across pages
- [ ] **Keyword optimization** - Natural keyword usage, not keyword stuffing
- [ ] **Location mentions** - Includes "Joué-Les-Tours", "Tours", "Indre-et-Loire" where relevant
- [ ] **Internal linking** - Links to other relevant pages on the site

## Meta Tag Order (Standardization)

Verify tags appear in this order:
1. `<title>`
2. `meta name="description"`
3. `meta name="summary"`
4. `meta name="keywords"`
5. `meta property="og:title"`
6. `meta property="og:description"`
7. `meta property="og:url"`
8. `meta property="og:image"`
9. `meta property="og:image:alt"`
10. `meta property="og:image:width"`
11. `meta property="og:image:height"`
12. `meta name="twitter:title"`
13. `meta name="twitter:description"`

## Page-Specific Requirements

### Home Page (`/`)
- [ ] All meta tags present
- [ ] ItemList schema for services
- [ ] Article schema
- [ ] Individual Service schemas
- [ ] No breadcrumbs (home page)

### Services Page (`/services`)
- [ ] All meta tags present
- [ ] Breadcrumbs: Accueil > Services
- [ ] ItemList schema for services
- [ ] BreadcrumbList schema

### Service Detail Pages (`/services/:id`)
- [ ] All meta tags present
- [ ] Breadcrumbs: Accueil > Services > [Service Name]
- [ ] Service schema with price and description
- [ ] FAQPage schema (if FAQs exist for service)
- [ ] HowTo schema (service process steps)
- [ ] LearningResource schema
- [ ] Article schema
- [ ] BreadcrumbList schema

### Tarifs Page (`/tarifs`)
- [ ] All meta tags present
- [ ] Breadcrumbs: Accueil > Tarifs
- [ ] ItemList schema with prices (Offer items)
- [ ] Article schema
- [ ] BreadcrumbList schema

### FAQs Page (`/faqs`)
- [ ] All meta tags present
- [ ] Breadcrumbs: Accueil > Questions fréquentes
- [ ] FAQPage schema with all questions/answers
- [ ] BreadcrumbList schema

### Contact Page (`/contact`)
- [ ] All meta tags present
- [ ] Breadcrumbs: Accueil > Contact
- [ ] BreadcrumbList schema
- [ ] Contact information clearly displayed

## Quick Verification Tools

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Schema Markup Validator**: https://validator.schema.org/

## Notes

- All og:image tags use the same image: `${baseUrl}/og-image.jpg`
- All structured data is generated in `app/root.tsx` in the `generateStructuredData` function
- Breadcrumbs are both visual (component) and structured (schema)
- Location keywords should be natural, not forced

