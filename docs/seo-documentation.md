# SEO Documentation - Chiryo Energie

## Table of Contents

1. [Introduction](#introduction)
2. [SEO Strategy](#seo-strategy)
3. [Meta Tags Implementation](#meta-tags-implementation)
4. [Structured Data (JSON-LD)](#structured-data-json-ld)
5. [Social Media Tags](#social-media-tags)
6. [Technical SEO](#technical-seo)
7. [Content SEO](#content-seo)
8. [Image SEO](#image-seo)
9. [Page-Specific Guidelines](#page-specific-guidelines)
10. [Maintenance and Best Practices](#maintenance-and-best-practices)

## Introduction

This documentation outlines the comprehensive SEO strategy implemented for Chiryo Energie, a holistic wellness practice located in Joué-Les-Tours, France. The SEO implementation follows a multi-layered approach combining meta tags, structured data, social media optimization, and technical SEO best practices.

### Key SEO Goals

- **Local SEO**: Optimize for location-based searches (Joué-Les-Tours, Tours, Indre-et-Loire)
- **Service Discovery**: Help users find specific services (Reiki, Sophro-relaxation, Réflexologie, etc.)
- **Social Sharing**: Optimize for social media platforms (Facebook, Twitter)
- **Search Engine Visibility**: Improve rankings in Google and other search engines
- **User Experience**: Provide clear, structured information for both users and search engines

## SEO Strategy

### Multi-Layered Approach

The SEO implementation uses four main layers:

1. **Meta Tags** - Basic SEO tags in route components
2. **Structured Data** - JSON-LD schemas for rich results
3. **Social Media Tags** - Open Graph and Twitter Cards
4. **Technical SEO** - Sitemap, robots.txt, canonical URLs

### Location-Based SEO

All content is optimized for local searches:
- Primary location: **Joué-Les-Tours**
- Secondary locations: **Tours**, **Indre-et-Loire**, **Centre-Val de Loire**
- Location keywords are naturally integrated into meta descriptions, titles, and content

## Meta Tags Implementation

### Required Meta Tags for All Pages

Every page must include the following meta tags in this exact order:

1. `<title>` - Page title (50-60 characters recommended)
2. `meta name="description"` - Meta description (150-160 characters, required)
3. `meta name="summary"` - Extended summary (optional but recommended)
4. `meta name="keywords"` - Relevant keywords including location
5. `meta property="og:title"` - Open Graph title
6. `meta property="og:description"` - Open Graph description
7. `meta property="og:url"` - Canonical URL
8. `meta property="og:image"` - Social sharing image
9. `meta property="og:image:alt"` - Image alt text
10. `meta property="og:image:width"` - Image width (1200)
11. `meta property="og:image:height"` - Image height (630)
12. `meta name="twitter:title"` - Twitter card title
13. `meta name="twitter:description"` - Twitter card description

### Meta Description Best Practices

**Character Count**: 150-160 characters (optimal for search results)

**Required Elements**:
- Service name or page topic
- Location (Joué-Les-Tours)
- Key benefits or features
- Call-to-action (CTA)

**For Service Pages**: Use the `metaDescription` field in `app/data/services.ts`. This field is **required** for all services and must:
- Be 150-160 characters
- Use complete sentences (never truncate mid-word)
- Include location, price/duration when relevant, and CTA
- Be unique and service-specific

**Example (Good)**:
```
"Reiki à Joué-Les-Tours avec maître enseignante. Soins énergétiques par imposition des mains, 60€ pour 1h. Forfaits disponibles. Consultations en présentiel ou à distance. Prenez rendez-vous."
```
(158 characters, includes location, price, duration, CTA)

**Example (Bad)**:
```
"Reiki à Joué-Les-Tours. Soins énergétiques..."
```
(Too short, incomplete, no CTA)

### Title Tag Guidelines

- **Length**: 50-60 characters (optimal)
- **Format**: `[Page Title] - Chiryo Energie | [Additional Context]`
- **Include location** when relevant: `[Service] à Joué-Les-Tours | Chiryo Energie`
- **Be unique** for each page
- **Include primary keyword** at the beginning when possible

### Keywords Strategy

- **Primary keywords**: Service names (Reiki, Sophro-relaxation, etc.)
- **Location keywords**: Joué-Les-Tours, Tours, Indre-et-Loire, Centre-Val de Loire
- **Combined keywords**: `[Service] Joué-Les-Tours`, `[Service] Tours`, `énergéticien Tours`
- **Natural integration**: Keywords should flow naturally, avoid keyword stuffing

## Structured Data (JSON-LD)

All structured data is generated in `app/root.tsx` in the `generateStructuredData()` function. The schemas are injected into the page `<head>` as JSON-LD scripts.

### Schema Types Used

#### 1. LocalBusiness Schema
- **Purpose**: Provides business information to search engines
- **Location**: All pages (via `@id` reference)
- **Key Fields**:
  - Business name, address, phone, email
  - Geo coordinates (latitude, longitude)
  - Area served (Joué-Les-Tours, Tours, Indre-et-Loire, Centre-Val de Loire)
  - Aggregate rating from testimonials
  - Service catalog

#### 2. Service Schema
- **Purpose**: Describes individual services
- **Location**: Home page (all services), Services page, Service detail pages
- **Key Fields**:
  - Service name, description
  - Provider reference
  - URL to service page
  - Price and availability (on detail pages)

#### 3. FAQPage Schema
- **Purpose**: Enables rich results for FAQs
- **Location**: FAQs page, Service detail pages (if FAQs exist)
- **Key Fields**:
  - Questions and answers
  - Last reviewed date

#### 4. HowTo Schema
- **Purpose**: Describes service process steps
- **Location**: Service detail pages
- **Key Fields**:
  - Step-by-step process
  - Estimated duration
  - Estimated cost

#### 5. Article Schema
- **Purpose**: Helps AI crawlers understand content
- **Location**: Home page, Service detail pages, Tarifs page
- **Key Fields**:
  - Headline, abstract, article body
  - Author and publisher references
  - Publication and modification dates

#### 6. ItemList Schema
- **Purpose**: Lists services or tarifs
- **Location**: Home page (services list), Services page, Tarifs page
- **Key Fields**:
  - List name and description
  - Item list elements with positions

#### 7. BreadcrumbList Schema
- **Purpose**: Navigation hierarchy for search engines
- **Location**: All pages except home
- **Key Fields**:
  - Breadcrumb items with positions
  - Names and URLs

#### 8. Person Schema
- **Purpose**: Practitioner information
- **Location**: All pages (via `@id` reference)
- **Key Fields**:
  - Name, job title, description
  - Areas of expertise (knowsAbout)
  - Business affiliation

#### 9. WebSite Schema
- **Purpose**: Website-level information
- **Location**: All pages
- **Key Fields**:
  - Site name, URL, description

#### 10. Organization Schema
- **Purpose**: Organization-level information
- **Location**: All pages
- **Key Fields**:
  - Organization name, logo, contact point
  - Address

### Schema Implementation Notes

- All schemas use `@id` references to avoid duplication
- Business, Person, and Organization schemas are included on all pages
- Page-specific schemas (FAQPage, HowTo, Article) are conditionally added
- Dates are dynamically generated using `today` variable
- Service schemas reference the business via `@id`

## Social Media Tags

### Open Graph Tags

All pages include Open Graph tags for Facebook and other social platforms:

```html
<meta property="og:title" content="[Page Title]" />
<meta property="og:description" content="[Description]" />
<meta property="og:url" content="[Canonical URL]" />
<meta property="og:image" content="[Base URL]/og-image.jpg" />
<meta property="og:image:alt" content="[Descriptive alt text]" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

**Image Requirements**:
- **File**: `/public/og-image.jpg` or `/build/client/og-image.jpg`
- **Dimensions**: 1200x630 pixels (recommended)
- **Format**: JPG or PNG
- **Alt text**: Descriptive, includes business name

### Twitter Card Tags

All pages include Twitter Card tags:

```html
<meta name="twitter:title" content="[Page Title]" />
<meta name="twitter:description" content="[Description]" />
```

**Note**: Twitter cards use `summary_large_image` type (defined in root.tsx), which displays the og:image.

## Technical SEO

### Sitemap (`sitemap.xml`)

**Location**: `app/routes/sitemap[.]xml.ts`

**Included Pages**:
- Home page (`/`) - Priority 1.0, changefreq: weekly
- Services page (`/services`) - Priority 0.9, changefreq: monthly
- Tarifs page (`/tarifs`) - Priority 0.8, changefreq: monthly
- Contact page (`/contact`) - Priority 0.8, changefreq: monthly
- FAQs page (`/faqs`) - Priority 0.7, changefreq: monthly
- All service detail pages (`/services/:id`) - Priority 0.9, changefreq: monthly

**Features**:
- Dynamic last modified dates
- Respects `ALLOW_INDEXING` environment variable
- Returns 404 if indexing is disabled

### Robots.txt

**Location**: `app/routes/robots[.]txt.ts`

**Features**:
- Allows all crawlers when `ALLOW_INDEXING=true`
- Disallows all when `ALLOW_INDEXING=false`
- Includes sitemap reference
- Allows AI training crawlers (GPTBot, ChatGPT-User, etc.)

### Canonical URLs

**Implementation**: Handled in `app/root.tsx`

```html
<link rel="canonical" href="{baseUrl}{pathname}" />
```

- Uses `baseUrl` from environment variable or default
- Includes current pathname
- Prevents duplicate content issues

### Indexing Control

The application provides comprehensive indexing control via the `ALLOW_INDEXING` environment variable:

1. **HTML Meta Tag**: Adds `<meta name="robots" content="noindex, nofollow">` when disabled
2. **robots.txt**: Returns `Disallow: /` when disabled
3. **sitemap.xml**: Returns 404 when disabled

**Usage**:
- Production: `ALLOW_INDEXING=true`
- Staging/Development: `ALLOW_INDEXING=false` or omit

## Content SEO

### Keyword Optimization

**Primary Keywords**:
- Service names: Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité
- Business type: énergéticien, psycho-énergéticienne, magnétiseuse, coupeuse de feu

**Location Keywords**:
- Primary: Joué-Les-Tours
- Secondary: Tours, Indre-et-Loire, Centre-Val de Loire

**Combined Keywords**:
- `[Service] Joué-Les-Tours`
- `[Service] Tours`
- `[Service] Indre-et-Loire`
- `énergéticien Joué-Les-Tours`
- `bien-être holistique Tours`

**Best Practices**:
- Use keywords naturally in content
- Include location in meta descriptions and titles
- Avoid keyword stuffing
- Focus on user intent

### Call-to-Action (CTA)

Every meta description should include a CTA:
- "Prenez rendez-vous"
- "Découvrez nos services"
- "Consultez nos tarifs"
- "Contactez-moi"
- "Réservez votre séance"

### Internal Linking

- Services page links to individual service pages
- Home page links to Services and Tarifs pages
- Footer includes links to all major pages
- Breadcrumbs provide navigation context

## Image SEO

### Alt Text Guidelines

**Required for all images**:
- Descriptive text explaining what the image shows
- Include location context when relevant: `[Service] - Services de bien-être à Joué-Les-Tours par Chiryo Energie`
- Include business name for brand recognition
- Be specific but concise

**Examples**:

**Good**:
```html
<img alt="Reiki - Services de bien-être à Joué-Les-Tours par Chiryo Energie" />
```

**Bad**:
```html
<img alt="Reiki" />
<img alt="image" />
```

### Image Optimization

- Images are optimized through the image service
- Lazy loading for below-the-fold images
- Responsive images with srcset
- Proper sizing to reduce load time

## Page-Specific Guidelines

### Home Page (`/`)

**File**: `app/routes/_index.tsx`

**Required Elements**:
- Title: "Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours"
- Meta description: 150-160 characters, includes services and location
- All Open Graph and Twitter tags
- Structured data: ItemList (services), Article, individual Service schemas
- No breadcrumbs (home page)

**Content Focus**:
- Overview of all services
- Location emphasis
- Call-to-action for services

### Services Page (`/services`)

**File**: `app/routes/services.tsx`

**Required Elements**:
- Title: "Services - Chiryo Energie | Prestations de bien-être holistique"
- Meta description: Focus on service categories (Guidance spirituelle, Soins énergétiques)
- All Open Graph and Twitter tags
- Breadcrumbs: Accueil > Services
- Structured data: ItemList (services), BreadcrumbList

**Content Focus**:
- Service categories
- All services listed
- Link to individual service pages

### Service Detail Pages (`/services/:id`)

**File**: `app/routes/services.$id.tsx`

**Required Elements**:
- Title: `{service.title} à Joué-Les-Tours | Chiryo Energie`
- Meta description: Use `service.metaDescription` (required field, 150-160 chars)
- All Open Graph and Twitter tags
- Breadcrumbs: Accueil > Services > [Service Name]
- Structured data: Service, FAQPage (if FAQs exist), HowTo, LearningResource, Article, BreadcrumbList

**Content Focus**:
- Service-specific information
- Price and duration
- Process description
- FAQs (if available)
- Related services

**Meta Description Source**:
- **Required field**: `metaDescription` in `app/data/services.ts`
- Must be 150-160 characters
- Complete sentences (no truncation)
- Includes location, price/duration, CTA

### Tarifs Page (`/tarifs`)

**File**: `app/routes/tarifs.tsx`

**Required Elements**:
- Title: "Tarifs - Chiryo Energie | Prestations et prix des services"
- Meta description: Focus on pricing and forfaits
- All Open Graph and Twitter tags
- Breadcrumbs: Accueil > Tarifs
- Structured data: ItemList (with Offer items including prices), Article, BreadcrumbList

**Content Focus**:
- All service prices
- Forfait information
- Contact CTA

### FAQs Page (`/faqs`)

**File**: `app/routes/faqs.tsx`

**Required Elements**:
- Title: "Questions fréquentes - Chiryo Energie"
- Meta description: Focus on FAQ content, not service listing
- All Open Graph and Twitter tags
- Breadcrumbs: Accueil > Questions fréquentes
- Structured data: FAQPage (all questions/answers), BreadcrumbList

**Content Focus**:
- Common questions and answers
- Service-specific FAQs
- General information

### Contact Page (`/contact`)

**File**: `app/routes/contact.tsx`

**Required Elements**:
- Title: "Contact - Chiryo Energie"
- Meta description: Include phone and email
- All Open Graph and Twitter tags
- Breadcrumbs: Accueil > Contact
- Structured data: BreadcrumbList

**Content Focus**:
- Contact information (phone, email)
- Contact form
- Location information

## Maintenance and Best Practices

### Adding a New Service

When adding a new service to `app/data/services.ts`:

1. **Required Fields**:
   ```typescript
   {
     id: 'service-id',
     title: 'Service Name',
     description: 'Full description...',
     price: 'Price',
     duration: 'Duration', // optional
     metaDescription: 'SEO-optimized description (150-160 chars)', // REQUIRED
     image: 'image-name',
     notes: 'Additional notes' // optional
   }
   ```

2. **Meta Description Requirements**:
   - 150-160 characters
   - Complete sentences (no truncation)
   - Include: Service name, location (Joué-Les-Tours), key benefits, price/duration, CTA
   - Be unique and service-specific

3. **Automatic Updates**:
   - Service will appear in sitemap automatically
   - Service schema will be generated automatically
   - Breadcrumbs will work automatically
   - Service page will be created at `/services/:id`

4. **Manual Steps**:
   - Add service image to `assets/images-raw/services/`
   - Add FAQs to `app/data/faqs.ts` if needed
   - Update menu in `app/components/Header.tsx` if needed

### Adding a New Page

When adding a new page:

1. **Create route file** in `app/routes/`
2. **Add meta tags** in the correct order (see Meta Tags section)
3. **Add to sitemap** in `app/routes/sitemap[.]xml.ts`
4. **Add breadcrumbs**:
   - Visual: Use `<Breadcrumbs>` component
   - Structured: Update `generateStructuredData()` in `app/root.tsx`
5. **Add structured data** if needed (Article, ItemList, etc.)
6. **Test with validation tools** (see Checklist)

### Meta Description Best Practices

**DO**:
- ✅ Write 150-160 character descriptions
- ✅ Use complete sentences
- ✅ Include location (Joué-Les-Tours)
- ✅ Include CTA
- ✅ Be specific and unique
- ✅ Include price/duration when relevant

**DON'T**:
- ❌ Truncate mid-word or mid-sentence
- ❌ Use generic descriptions
- ❌ Forget location keywords
- ❌ Skip the CTA
- ❌ Duplicate descriptions across pages

### Validation Checklist

Before deploying, verify:

1. **Meta Tags**: All pages have required meta tags in correct order
2. **Character Counts**: All meta descriptions are 150-160 characters
3. **Structured Data**: Validate with [Google Rich Results Test](https://search.google.com/test/rich-results)
4. **Social Sharing**: Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
5. **Sitemap**: Verify all pages are in sitemap.xml
6. **Breadcrumbs**: Check visual and structured breadcrumbs
7. **Images**: All images have descriptive alt text
8. **Mobile**: Test mobile responsiveness

### Common Issues and Solutions

**Issue**: Meta description too long
- **Solution**: Reduce to 150-160 characters, remove unnecessary words

**Issue**: Missing og:image
- **Solution**: Add og:image tags to page (all pages should have them)

**Issue**: Structured data errors
- **Solution**: Validate with Google Rich Results Test, check JSON-LD syntax

**Issue**: Duplicate meta descriptions
- **Solution**: Make each description unique and page-specific

**Issue**: Missing breadcrumbs
- **Solution**: Add Breadcrumbs component and update root.tsx breadcrumb generation

## File Locations Reference

- **Meta tags**: Individual route files in `app/routes/`
- **Structured data**: `app/root.tsx` - `generateStructuredData()` function
- **Service data**: `app/data/services.ts`
- **Sitemap**: `app/routes/sitemap[.]xml.ts`
- **Robots.txt**: `app/routes/robots[.]txt.ts`
- **Breadcrumbs component**: `app/components/Breadcrumbs.tsx`
- **Service type**: `app/types/index.ts`

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

## Quick Reference

### Meta Description Template

```
[Service/Page Name] à Joué-Les-Tours. [Key benefit/description]. [Price] [Duration]. [Additional info]. [CTA].
```

### Character Count Guidelines

- **Title**: 50-60 characters
- **Meta description**: 150-160 characters
- **og:description**: Can be longer (200+ characters)
- **twitter:description**: Can be longer (200+ characters)

### Required Meta Tags Order

1. title
2. description
3. summary
4. keywords
5. og:title
6. og:description
7. og:url
8. og:image
9. og:image:alt
10. og:image:width
11. og:image:height
12. twitter:title
13. twitter:description

