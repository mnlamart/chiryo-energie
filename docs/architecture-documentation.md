# Chiryo Energie - Showcase Website Architecture

## Executive Summary

This is a production-ready showcase website built with modern web technologies, optimized for performance, SEO, and user experience. The architecture follows Epic Stack patterns and is ideal for service-based businesses requiring:

- Multiple service/product pages
- Contact forms with email integration
- SEO optimization with structured data
- Fast load times and responsive images
- Accessibility compliance

## Tech Stack

### Core Framework

- **React Router v7** - Full-stack React framework with SSR (Server-Side Rendering)
- **React 19** - Latest React with concurrent features
- **TypeScript** - Complete type safety across the codebase
- **Vite 7** - Ultra-fast build tool and dev server

### Styling & UI

- **Tailwind CSS v4** - Utility-first CSS with custom color palette
- **Radix UI** - Accessible components (Toast notifications, Accordion for FAQs)
- Custom color scheme: primary (warm brown), accent (teal), warm (orange)

### Form Handling & Validation

- **Conform** - Type-safe form library with React Router integration
- **Zod v4** - Runtime schema validation
- **remix-utils** - Honeypot spam protection middleware

### Email & Communications

- **Resend API** - Transactional email service
- Automatic mocking in development (no API key needed)

### Image Processing

- **Sharp** - High-performance image optimization
- Generates AVIF, WebP, and JPEG formats
- Multiple size variants for responsive images

### Deployment

- **Express 5** - Production server
- **Compression** - Gzip compression middleware
- **Docker** - Multi-stage build with Node 22
- **Fly.io** - Production hosting (configured)

## Project Structure

### Directory Organization

```
app/
├── components/          # Reusable UI components
├── data/               # Static content (services, FAQs, testimonials)
├── middleware/         # Request middleware (honeypot)
├── routes/            # File-based routing
├── styles/            # Global CSS
├── types/             # TypeScript type definitions
└── utils/             # Server-side utilities (email)

public/
└── images/            # Optimized images (generated)

assets/
└── images-raw/        # Original source images

scripts/
├── optimize-images.mjs    # Image optimization script
└── generate-og-image.mjs  # OG image generator
```

### Key Files

- `app/root.tsx` - Root layout with SEO, structured data, headers/footers
- `app/routes.ts` - Route definitions
- `server.ts` - Express server with caching strategy
- `vite.config.ts` - Build configuration
- `tailwind.config.js` - Design system colors
- `Dockerfile` - Multi-stage production build

## Routing Architecture

### Route Pattern (`app/routes.ts`)

Uses React Router v7's file-based routing with explicit route configuration:

```typescript
route("/", "routes/_index.tsx")              // Home page
route("contact", "routes/contact.tsx")       // Contact form
route("services/:id", "routes/services.$id.tsx")  // Dynamic service pages
route("sitemap.xml", "routes/sitemap[.]xml.ts")   // Dynamic sitemap
route("robots.txt", "routes/robots[.]txt.ts")     // Dynamic robots.txt
route("*", "routes/$.tsx")                        // 404 catch-all
```

### Page Structure

Each route exports:

- `default` - Component for rendering
- `meta` (inline) - SEO metadata using `<title>` and `<meta>` tags
- `loader` (optional) - Server-side data fetching
- `action` (optional) - Form submission handler

## Component Architecture

### Layout Components

**Root Layout** (`app/root.tsx`)

- Global HTML structure
- SEO meta tags
- Structured data injection
- Toast provider
- Honeypot provider
- Lazy-loaded floating action button, scroll-to-top

**Header/Footer** - Persistent navigation and contact info

**Container** - Consistent max-width wrapper

### Content Components

**Modular Sections**

- `Hero` - Above-the-fold with optimized hero image
- `Services` - Grid of service cards
- `ServiceCard` - Individual service with responsive images
- `About` - Business introduction
- `TestimonialsCarousel` - Customer reviews
- `FAQs` - Accordion-based Q&A
- `Breadcrumbs` - Navigation context

**Interaction Components**

- `Button` - Reusable with variants (primary/secondary)
- `ScrollAnimation` - Intersection Observer-based animations
- `ScrollToTop` - Smooth scroll button
- `FloatingActionButton` - Fixed call-to-action
- `SkipToContent` - Accessibility skip link

### Component Patterns

1. **Server Components by default** - No client-side JS unless needed
2. **Lazy loading** - Non-critical components loaded on-demand
3. **Suspense boundaries** - Graceful loading states
4. **TypeScript interfaces** - Props fully typed via `app/types/index.ts`

## Data Management

### Static Data Pattern

All content stored in `app/data/` directory:

```typescript
// app/data/services.ts
export const services: Service[] = [
  {
    id: 'reiki',
    title: 'Reiki',
    description: '...',
    price: '60 euros',
    duration: '1h environ',
    image: '/images/services/reiki.jpg',
    notes: '...'
  },
  // ... more services
];
```

**Benefits:**

- Type-safe content
- Easy to update
- Version controlled
- No database needed for static content

### Data Files

- `services.ts` - Service offerings
- `testimonials.ts` - Customer reviews
- `faqs.ts` - General and service-specific FAQs
- `content.ts` - Contact info, business details

## Form Handling

### Contact Form Architecture (`app/routes/contact.tsx`)

**Schema Definition with Zod v4**

```typescript
const contactSchema = z.object({
  name: z.string().min(1, { error: "Le nom est requis" }),
  email: z.string().email({ error: "Email invalide" }),
  phone: z.string().regex(/french-phone-pattern/),
  message: z.string().min(10)
});
```

**Action Handler**

```typescript
export async function action({ request }) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: contactSchema });
  
  if (submission.status !== "success") {
    return data(submission.reply(), { status: 400 });
  }
  
  await sendContactEmail(submission.value);
  return data({ ...submission.reply({ resetForm: true }), success: true });
}
```

**Features:**

- Server-side validation
- Honeypot spam protection (invisible to real users)
- Toast success notifications
- Form reset after submission
- Accessible error messages

## SEO Strategy

### Multi-Layered Approach

1. **Meta Tags** (in `app/root.tsx` and route components)

   - Title, description, keywords
   - Open Graph (og:*) for social sharing
   - Twitter Card metadata
   - Canonical URLs
   - Google Search Console verification

2. **Structured Data** (JSON-LD in `app/root.tsx`)

   - LocalBusiness - Business details with geo coordinates
   - Service - Individual service schemas
   - FAQPage - Questions and answers
   - AggregateRating - Customer review ratings
   - HowTo - Service process steps
   - BreadcrumbList - Navigation hierarchy
   - Article - Content for AI extraction
   - WebSite, Organization, Person - Entity relationships

3. **Dynamic SEO Resources**

   - `sitemap.xml` - All pages with last modified dates
   - `robots.txt` - Crawling instructions
   - `content-summary.txt` - Plain-text content for AI crawlers
   - `.well-known/security.txt` - Security contact info

4. **Indexing Control** (via `ALLOW_INDEXING` environment variable)

   The application provides comprehensive indexing control through the `ALLOW_INDEXING` environment variable, which affects three mechanisms:
   
   - **HTML Meta Tag** (`app/root.tsx`): When `ALLOW_INDEXING !== "true"`, adds `<meta name="robots" content="noindex, nofollow">` to all pages (page-level directive)
   - **robots.txt** (`app/routes/robots[.]txt.ts`): When `ALLOW_INDEXING !== "true"`, returns `Disallow: /` for all user agents (site-level directive)
   - **sitemap.xml** (`app/routes/sitemap[.]xml.ts`): When `ALLOW_INDEXING !== "true"`, returns 404 response (prevents URL discovery)
   
   All three mechanisms work together to provide comprehensive indexing control:
   - The meta tag tells search engines not to index individual pages
   - robots.txt tells crawlers not to crawl the site
   - The sitemap 404 prevents search engines from discovering URLs
   
   **Usage:**
   - Set `ALLOW_INDEXING=true` in production to enable indexing
   - Omit or set to `false` in staging/development to prevent indexing
   - This ensures staging environments don't accidentally get indexed

### SEO Best Practices Applied

- Semantic HTML5 elements
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text on all images
- aria-labels for icons/buttons
- Skip-to-content link for screen readers
- French language attribute on `<html>`

## Image Optimization

### Optimization Script (`scripts/optimize-images.mjs`)

**Source → Output Pipeline**

```
assets/images-raw/   →   public/images/
  hero/                    hero/
  services/                services/
  testimonials/            testimonials/
```

**Processing Strategy**

1. **Hero Images**

   - Sizes: 640w, 960w, 1280w, 1920w
   - 16:9 aspect ratio crop
   - Quality: AVIF 45, WebP 60, JPEG 70
   - Formats: AVIF + WebP + JPEG

2. **Service Images**

   - Sizes: 400w, 640w, 800w, 1200w
   - Two variants: `-sq-` (square) and `-h-` (4:3 horizontal)
   - Quality: AVIF 55, WebP 70, JPEG 75
   - Formats: AVIF + WebP + JPEG

3. **Testimonial Avatars**

   - Size: 150w (fixed)
   - Square format
   - Formats: AVIF + WebP + JPEG

### Responsive Image Usage

**Picture Element Pattern** (see `app/components/ServiceCard.tsx`)

```html
<picture>
  <source type="image/avif" srcSet="..." sizes="..." />
  <source type="image/webp" srcSet="..." sizes="..." />
  <source type="image/jpeg" srcSet="..." sizes="..." />
  <img src="fallback.jpg" alt="..." loading="lazy" />
</picture>
```

**Benefits:**

- Modern browsers get AVIF (smallest)
- Fallback to WebP, then JPEG
- Correct size for viewport (saves bandwidth)
- Lazy loading below the fold

## Performance Optimization

### Server-Side Rendering

- All pages rendered on server first
- Instant First Contentful Paint (FCP)
- SEO-friendly HTML

### Code Splitting

- Route-based automatic splitting
- Lazy-loaded components with `React.lazy()`
- Suspense boundaries for progressive loading

### Caching Strategy (`server.ts`)

**Asset Caching**

```
/images/*  → 1 year, immutable
/assets/*  → 1 year, immutable (fingerprinted)
/static/*  → 24 hours
HTML       → 5 minutes with revalidation
```

**Compression**

- Gzip compression on all responses
- Express compression middleware

### CSS Optimization

- Tailwind CSS purges unused styles
- CSS code splitting enabled
- Critical CSS could be inlined (utility provided in `utils/critical-css.ts`)

### Performance Metrics Target

- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1
- All images have width/height to prevent layout shift

## Security Features

### Spam Protection

**Honeypot Middleware** (`app/middleware/honeypot.ts`)

- Invisible fields that bots fill out
- Encrypted field names
- Time-based validation
- Configurable via `HONEYPOT_ENCRYPTION_SEED`

### Input Validation

- Server-side validation with Zod
- Client-side validation with Conform
- Sanitized email content
- French phone number regex validation

### HTTP Security

- No CORS issues (same-origin)
- POST for sensitive forms
- No client-side API keys

### Docker Security

- Non-root user (nodejs:nodejs)
- Multi-stage build (no dev deps in production)
- Slim base image (Debian Bookworm)

## Email Integration

### Resend API Pattern (`app/utils/email.server.ts`)

**Development Mock**

```typescript
if (!process.env.RESEND_API_KEY && NODE_ENV !== "production") {
  // Log email to console instead of sending
  return createMockResend();
}
```

**Production Send**

```typescript
await resend.emails.send({
  from: "contact@domain.com",
  to: "recipient@domain.com",
  replyTo: formData.email,
  subject: "...",
  html: "...",
  text: "..."
});
```

**Environment Variables**

- `RESEND_API_KEY` - API key (optional in dev)
- `CONTACT_EMAIL_FROM` - Verified sender
- `CONTACT_EMAIL_TO` - Recipient email

## Styling Architecture

### Tailwind Configuration

**Custom Colors** (`tailwind.config.js`)

- `primary.*` - Brown/beige palette (brand)
- `accent.*` - Teal/green palette (complementary)
- `warm.*` - Orange palette (call-to-action)

**Design Tokens**

- Consistent spacing scale
- Typography hierarchy
- Responsive breakpoints (sm, md, lg, xl)

### CSS Patterns

**Utility-First Approach**

```tsx
<div className="flex flex-col min-h-screen">
  <main className="grow">
    <Container className="py-20">
      ...
    </Container>
  </main>
</div>
```

**Component Variants**

```typescript
// Button.tsx
variant === 'primary' 
  ? 'bg-primary-600 hover:bg-primary-700'
  : 'bg-accent-600 hover:bg-accent-700'
```

## Accessibility

### WCAG 2.1 AA Compliance

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Color contrast ratios met
- Skip to content link
- Alt text on all images
- Form error announcements

### Screen Reader Support

- `aria-label` on icon buttons
- `aria-describedby` for form errors
- `role="alert"` for error messages
- Proper heading structure

## Deployment

### Docker Build

**Multi-Stage Build** (`Dockerfile`)

1. **deps** - Install all dependencies
2. **production-deps** - Prune dev dependencies
3. **builder** - Build application
4. **runner** - Production image (smallest)

**Build Command**

```bash
docker build -t chiryo-energie .
docker run -p 3000:3000 chiryo-energie
```

### Fly.io Deployment

**Configuration** (`fly.toml`)

- Auto-scaling based on load
- Health checks
- Environment variable management

**Deploy**

```bash
fly secrets set RESEND_API_KEY=xxx
fly deploy
```

### Environment Variables

**Required in Production:**

- `RESEND_API_KEY` - Email API key
- `CONTACT_EMAIL_FROM` - Verified sender email
- `CONTACT_EMAIL_TO` - Recipient email
- `BASE_URL` - Canonical domain
- `ALLOW_INDEXING=true` - Enable SEO (controls HTML meta tags, robots.txt, and sitemap.xml)

**Optional:**

- `HONEYPOT_ENCRYPTION_SEED` - Spam protection
- `PORT` - Server port (default 3000)

## Reusable Patterns

### For Similar Showcase Websites

1. **Replace Data Files**

   - Update `app/data/services.ts` with your offerings
   - Modify `app/data/testimonials.ts` with reviews
   - Customize `app/data/faqs.ts` for your industry
   - Update `app/data/content.ts` with business info

2. **Update Branding**

   - Modify `tailwind.config.js` colors
   - Replace logo and favicon
   - Update `public/og-image.jpg`
   - Change business name in `app/root.tsx`

3. **Adjust Routes**

   - Keep the same route structure
   - Modify service detail pages
   - Update structured data in `app/root.tsx`

4. **Customize Components**

   - Reuse `ServiceCard` pattern for products
   - Adapt `Hero` for your message
   - Modify `About` section
   - Keep `Contact` form as-is (works universally)

5. **Image Optimization**

   - Place original images in `assets/images-raw/`
   - Run `npm run optimize-images` (create script)
   - Automatic responsive variants generated

6. **SEO Customization**

   - Update structured data schema in `app/root.tsx`
   - Modify `generateStructuredData()` function
   - Update meta tags in routes
   - Adjust sitemap generation

### Testing Locally

```bash
npm install              # Install dependencies
npm run dev             # Start dev server (http://localhost:5173)
npm run build           # Build for production
npm run start           # Test production build
```

## Key Learnings & Best Practices

### Performance

- Lazy load non-critical components
- Use lazy loading for below-the-fold images
- Implement proper caching headers
- Generate multiple image formats (AVIF preferred)

### SEO

- Rich structured data significantly improves search visibility
- Dynamic sitemaps ensure fresh crawling
- Plain-text content summary helps AI search engines
- Proper schema.org markup for local businesses

### Developer Experience

- TypeScript prevents runtime errors
- Zod schemas provide runtime validation
- Conform simplifies form handling
- Mock email in dev speeds up testing

### User Experience

- Toast notifications confirm actions
- Smooth scroll animations
- Loading states prevent confusion
- Accessible forms with clear errors

## Maintenance

### Regular Updates

1. **Dependencies** - Update monthly with `npm update`
2. **Images** - Re-optimize when adding new content
3. **Content** - Update data files as services change
4. **SEO** - Monitor and adjust structured data

### Monitoring

- Check Google Search Console for errors
- Monitor Lighthouse scores
- Test forms regularly
- Verify email delivery

## Conclusion

This architecture provides a solid foundation for service-based showcase websites with:

- Modern tech stack (React Router v7, TypeScript, Tailwind)
- Production-ready patterns (SSR, caching, optimization)
- SEO-first approach (structured data, sitemaps)
- Developer-friendly (type-safe, modular, documented)
- User-focused (accessible, performant, responsive)

The codebase follows Epic Stack conventions and can be easily adapted for restaurants, professional services, healthcare practices, real estate agencies, or any business showcasing services/products with contact forms.