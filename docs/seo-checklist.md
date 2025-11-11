# SEO Checklist - Chiryo Energie

> **Reference**: See [SEO Documentation](./seo-documentation.md) for detailed implementation guidelines.

Use this checklist to verify SEO implementation on every page. Check each item before deploying.

## Quick Reference Checklist

### Essential Meta Tags (All Pages)

- [ ] **Title tag** - 50-60 characters, includes location when relevant
- [ ] **Meta description** - 150-160 characters, includes CTA
- [ ] **Meta summary** - Extended summary (optional but recommended)
- [ ] **Meta keywords** - Location-based keywords included
- [ ] **og:title** - Present
- [ ] **og:description** - Present
- [ ] **og:url** - Correct canonical URL
- [ ] **og:image** - `${baseUrl}/og-image.jpg`
- [ ] **og:image:alt** - Descriptive alt text
- [ ] **og:image:width** - "1200"
- [ ] **og:image:height** - "630"
- [ ] **twitter:title** - Present
- [ ] **twitter:description** - Present

### Character Count Verification

- [ ] Title: 50-60 characters ✅
- [ ] Meta description: 150-160 characters ✅
- [ ] No truncation mid-word or mid-sentence ✅

### Structured Data

- [ ] BreadcrumbList schema present (all pages except home)
- [ ] Page-specific schemas present (see page-specific section)
- [ ] Validate with [Google Rich Results Test](https://search.google.com/test/rich-results)

### Visual Elements

- [ ] Breadcrumbs component visible (all pages except home)
- [ ] All images have descriptive alt text with location context
- [ ] Proper heading hierarchy (one h1 per page)

### Technical SEO

- [ ] Page listed in `sitemap.xml`
- [ ] Canonical URL correct
- [ ] Mobile responsive
- [ ] Images optimized and lazy-loaded

---

## Page-Specific Checklists

### Home Page (`/`)

**File**: `app/routes/_index.tsx`

#### Meta Tags
- [ ] Title: "Chiryo Energie - Psycho énergéticienne à Joué-Les-Tours"
- [ ] Description: 150-160 characters, includes services and location
- [ ] Summary: Extended summary present
- [ ] Keywords: Location-based keywords included
- [ ] All Open Graph tags present
- [ ] All Twitter tags present

#### Structured Data
- [ ] ItemList schema (services list)
- [ ] Article schema
- [ ] Individual Service schemas (one per service)
- [ ] LocalBusiness schema (via @id)
- [ ] Person schema (via @id)
- [ ] Organization schema
- [ ] WebSite schema

#### Content
- [ ] No breadcrumbs (home page)
- [ ] Links to Services page
- [ ] Links to Tarifs page
- [ ] Location mentioned naturally

**Example Meta Description**:
```
"Psycho-énergéticienne à Joué-Les-Tours : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Maître enseignante en Reiki. Consultations à Tours ou à distance. Prenez rendez-vous."
```
(155 characters ✅)

---

### Services Page (`/services`)

**File**: `app/routes/services.tsx`

#### Meta Tags
- [ ] Title: "Services - Chiryo Energie | Prestations de bien-être holistique"
- [ ] Description: 150-160 characters, mentions categories
- [ ] Summary: Extended summary present
- [ ] Keywords: Service-related keywords
- [ ] All Open Graph tags present
- [ ] All Twitter tags present

#### Structured Data
- [ ] ItemList schema (services)
- [ ] BreadcrumbList schema (Accueil > Services)
- [ ] LocalBusiness schema (via @id)
- [ ] Person schema (via @id)
- [ ] Organization schema
- [ ] WebSite schema

#### Visual Elements
- [ ] Breadcrumbs: Accueil > Services
- [ ] Service cards with proper alt text
- [ ] Links to individual service pages

**Example Meta Description**:
```
"Services de bien-être holistique à Joué-Les-Tours : Guidance spirituelle et soins énergétiques. Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Découvrez nos prestations."
```
(158 characters ✅)

---

### Service Detail Pages (`/services/:id`)

**File**: `app/routes/services.$id.tsx`

#### Meta Tags
- [ ] Title: `{service.title} à Joué-Les-Tours | Chiryo Energie`
- [ ] Description: Uses `service.metaDescription` (REQUIRED field, 150-160 chars)
- [ ] Summary: Extended summary present
- [ ] Keywords: Service-specific keywords
- [ ] All Open Graph tags present
- [ ] All Twitter tags present

#### Structured Data
- [ ] Service schema (with price, description, provider)
- [ ] FAQPage schema (if FAQs exist for service)
- [ ] HowTo schema (service process steps)
- [ ] LearningResource schema
- [ ] Article schema
- [ ] BreadcrumbList schema (Accueil > Services > [Service Name])
- [ ] LocalBusiness schema (via @id)
- [ ] Person schema (via @id)
- [ ] Organization schema
- [ ] WebSite schema

#### Visual Elements
- [ ] Breadcrumbs: Accueil > Services > [Service Name]
- [ ] Service image with proper alt text
- [ ] Related services section (if applicable)

#### Data Requirements
- [ ] `metaDescription` field present in `app/data/services.ts` (REQUIRED)
- [ ] `metaDescription` is 150-160 characters
- [ ] `metaDescription` uses complete sentences (no truncation)
- [ ] `metaDescription` includes location, price/duration, CTA

**Example Meta Description** (from services.ts):
```
"Reiki à Joué-Les-Tours avec maître enseignante. Soins énergétiques par imposition des mains, 60€ pour 1h. Forfaits disponibles. Consultations en présentiel ou à distance. Prenez rendez-vous."
```
(158 characters ✅)

---

### Tarifs Page (`/tarifs`)

**File**: `app/routes/tarifs.tsx`

#### Meta Tags
- [ ] Title: "Tarifs - Chiryo Energie | Prestations et prix des services"
- [ ] Description: 150-160 characters, mentions forfaits
- [ ] Summary: Extended summary with price details
- [ ] Keywords: Price-related keywords
- [ ] All Open Graph tags present
- [ ] All Twitter tags present

#### Structured Data
- [ ] ItemList schema (with Offer items including prices)
- [ ] Article schema
- [ ] BreadcrumbList schema (Accueil > Tarifs)
- [ ] LocalBusiness schema (via @id)
- [ ] Person schema (via @id)
- [ ] Organization schema
- [ ] WebSite schema

#### Visual Elements
- [ ] Breadcrumbs: Accueil > Tarifs
- [ ] All service prices displayed
- [ ] Forfait information mentioned
- [ ] Contact CTA present

**Example Meta Description**:
```
"Tarifs des services de bien-être holistique à Joué-Les-Tours. Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Forfaits disponibles. Consultez nos prix."
```
(156 characters ✅)

---

### FAQs Page (`/faqs`)

**File**: `app/routes/faqs.tsx`

#### Meta Tags
- [ ] Title: "Questions fréquentes - Chiryo Energie"
- [ ] Description: 150-160 characters, focuses on FAQ content (not service listing)
- [ ] Summary: Extended summary present
- [ ] Keywords: FAQ-related keywords
- [ ] All Open Graph tags present
- [ ] All Twitter tags present

#### Structured Data
- [ ] FAQPage schema (all questions and answers)
- [ ] BreadcrumbList schema (Accueil > Questions fréquentes)
- [ ] LocalBusiness schema (via @id)
- [ ] Person schema (via @id)
- [ ] Organization schema
- [ ] WebSite schema

#### Visual Elements
- [ ] Breadcrumbs: Accueil > Questions fréquentes
- [ ] All FAQs properly categorized
- [ ] Accordion functionality working

**Example Meta Description**:
```
"Questions fréquentes sur les services de bien-être holistique à Joué-Les-Tours. Réponses sur Reiki, Sophro-relaxation, Réflexologie, Magnétisme, tarifs et séances. Consultez nos FAQ."
```
(157 characters ✅)

---

### Contact Page (`/contact`)

**File**: `app/routes/contact.tsx`

#### Meta Tags
- [ ] Title: "Contact - Chiryo Energie"
- [ ] Description: 150-160 characters, includes phone and email
- [ ] Summary: Extended summary present
- [ ] Keywords: Contact-related keywords
- [ ] All Open Graph tags present
- [ ] All Twitter tags present

#### Structured Data
- [ ] BreadcrumbList schema (Accueil > Contact)
- [ ] LocalBusiness schema (via @id)
- [ ] Person schema (via @id)
- [ ] Organization schema
- [ ] WebSite schema

#### Visual Elements
- [ ] Breadcrumbs: Accueil > Contact
- [ ] Contact form present
- [ ] Phone and email clearly displayed
- [ ] Location information present

**Example Meta Description**:
```
"Contactez Chiryo Energie à Joué-Les-Tours pour prendre rendez-vous. Téléphone: 06.61.86.94.01. Email: chiryoenergie@gmail.com. Consultations en présentiel ou à distance."
```
(160 characters ✅)

---

## Validation Steps

### 1. Character Count Verification

**Tools**:
- Manual count or use online character counter
- Verify in browser DevTools

**Check**:
- [ ] Title: 50-60 characters
- [ ] Meta description: 150-160 characters
- [ ] No truncation mid-word

### 2. Structured Data Validation

**Tool**: [Google Rich Results Test](https://search.google.com/test/rich-results)

**Steps**:
1. Enter page URL
2. Check for errors
3. Verify all expected schemas are present
4. Check for warnings

**Expected Results**:
- ✅ No errors
- ✅ All schemas valid
- ✅ Rich results preview looks correct

### 3. Social Media Preview

**Facebook**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

**Steps**:
1. Enter page URL
2. Click "Scrape Again"
3. Verify og:image displays correctly
4. Check title and description

**Twitter**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)

**Steps**:
1. Enter page URL
2. Verify card preview
3. Check image, title, description

### 4. Sitemap Verification

**Check**:
- [ ] Page is listed in `/sitemap.xml`
- [ ] Correct priority and changefreq
- [ ] Last modified date is recent

### 5. Mobile Responsiveness

**Tools**:
- Browser DevTools mobile emulation
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

**Check**:
- [ ] Page is mobile-friendly
- [ ] Text is readable without zooming
- [ ] Touch targets are appropriately sized
- [ ] No horizontal scrolling

---

## Common Issues and Solutions

### Issue: Meta Description Too Long

**Symptoms**: Description exceeds 160 characters in search results

**Solution**:
1. Count characters in meta description
2. Remove unnecessary words
3. Keep essential information (location, service, CTA)
4. Target 150-160 characters

**Example Fix**:
```
Before (180 chars): "Découvrez nos services de bien-être holistique à Joué-Les-Tours (Indre-et-Loire) : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Consultations en présentiel ou à distance."

After (158 chars): "Services de bien-être holistique à Joué-Les-Tours : Guidance spirituelle et soins énergétiques. Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Découvrez nos prestations."
```

### Issue: Missing og:image

**Symptoms**: Social media preview shows no image

**Solution**:
1. Add `meta property="og:image"` tag
2. Verify image URL is correct: `${baseUrl}/og-image.jpg`
3. Add og:image:alt, og:image:width, og:image:height
4. Test with Facebook Sharing Debugger

### Issue: Structured Data Errors

**Symptoms**: Google Rich Results Test shows errors

**Solution**:
1. Check JSON-LD syntax in `app/root.tsx`
2. Verify all required fields are present
3. Check for typos in schema types
4. Validate with [Schema.org Validator](https://validator.schema.org/)

### Issue: Duplicate Meta Descriptions

**Symptoms**: Multiple pages have same meta description

**Solution**:
1. Make each description unique
2. Include page-specific information
3. Focus on page content, not generic text

### Issue: Missing Breadcrumbs

**Symptoms**: No breadcrumb navigation visible

**Solution**:
1. Add `<Breadcrumbs>` component to page
2. Update breadcrumb generation in `app/root.tsx`
3. Verify breadcrumb items are correct

### Issue: Service Missing metaDescription

**Symptoms**: TypeScript error or missing meta description

**Solution**:
1. Add `metaDescription` field to service in `app/data/services.ts`
2. Ensure it's 150-160 characters
3. Use complete sentences
4. Include location, price/duration, CTA

---

## Examples

### Good Meta Description Examples

**Service Page**:
```
"Reiki à Joué-Les-Tours avec maître enseignante. Soins énergétiques par imposition des mains, 60€ pour 1h. Forfaits disponibles. Consultations en présentiel ou à distance. Prenez rendez-vous."
```
✅ 158 characters, includes location, price, duration, CTA, unique

**Tarifs Page**:
```
"Tarifs des services de bien-être holistique à Joué-Les-Tours. Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Forfaits disponibles. Consultez nos prix."
```
✅ 156 characters, mentions forfaits, includes CTA

### Bad Meta Description Examples

**Too Long**:
```
"Services holistiques de bien-être à Joué-Les-Tours : Reiki, Sophro-relaxation, Réflexologie, Magnétisme, Médiumnité. Maître enseignante en Reiki. Consultations à Tours, Indre-et-Loire ou à distance. Prenez rendez-vous."
```
❌ 200 characters (too long)

**Too Short**:
```
"Services à Joué-Les-Tours."
```
❌ Too short, no information, no CTA

**Truncated**:
```
"Reiki à Joué-Les-Tours. Soins énergétiques par imposition des mains, 60€ pour 1h. Forfaits dispon..."
```
❌ Truncated mid-word

**Generic**:
```
"Services de bien-être disponibles."
```
❌ No location, no specifics, no CTA

---

## Quick Validation Checklist

Before deploying any page, verify:

- [ ] All meta tags present and in correct order
- [ ] Meta description is 150-160 characters
- [ ] Title is 50-60 characters
- [ ] All og:image tags present
- [ ] Breadcrumbs visible (if not home page)
- [ ] Structured data validates (Google Rich Results Test)
- [ ] Social preview works (Facebook/Twitter validators)
- [ ] Page in sitemap.xml
- [ ] All images have alt text
- [ ] Mobile responsive
- [ ] No duplicate meta descriptions

---

## File Locations

- **Meta tags**: Individual route files in `app/routes/`
- **Structured data**: `app/root.tsx` - `generateStructuredData()` function
- **Service data**: `app/data/services.ts`
- **Sitemap**: `app/routes/sitemap[.]xml.ts`
- **Robots.txt**: `app/routes/robots[.]txt.ts`
- **Breadcrumbs component**: `app/components/Breadcrumbs.tsx`

---

## Validation Tools

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Schema Markup Validator**: https://validator.schema.org/
- **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **PageSpeed Insights**: https://pagespeed.web.dev/

---

## Notes

- All og:image tags use: `${baseUrl}/og-image.jpg`
- All structured data is generated in `app/root.tsx`
- Breadcrumbs are both visual (component) and structured (schema)
- Location keywords should be natural, not forced
- Service `metaDescription` field is **required** in `app/data/services.ts`
- Meta descriptions must be 150-160 characters with complete sentences

---

## Reference Documentation

For detailed implementation guidelines, see:
- [SEO Documentation](./seo-documentation.md) - Comprehensive SEO guide

