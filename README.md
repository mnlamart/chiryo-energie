# Chiryo Energie - Website

Professional showcase website for Chiryo Energie, a holistic wellness practice offering energy healing, Reiki, sophrology, and spiritual guidance services in Joué-Les-Tours, France.

Built with React Router v7, TypeScript, and modern web technologies.

## Features

- **Service Pages** - Dynamic service listings with detailed pages for each offering
- **Contact Form** - Secure form with honeypot spam protection and Resend email integration
- **Image Optimization** - On-demand image transformation with Sharp (AVIF, WebP, JPEG) and responsive variants
- **SEO Optimized** - Structured data, sitemap, robots.txt, meta tags, and breadcrumbs
- **Accessibility** - WCAG compliant with Radix UI components
- **Server-Side Rendering** - Full SSR support with React Router v7

## Documentation

📚 **[Architecture Documentation](docs/architecture-documentation.md)** - Comprehensive guide covering architecture, patterns, and best practices

📚 **[SEO Documentation](docs/seo-documentation.md)** - SEO implementation details and checklist

## Tech Stack

- **React Router v7** - Full-stack React framework with SSR
- **React 19** - Latest React with concurrent features
- **TypeScript** - Complete type safety
- **Vite 7** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Sharp** - High-performance image optimization
- **Zod v4** - Schema validation
- **Conform** - Type-safe form handling
- **Resend** - Email API for contact form submissions
- **Express 5** - Production server
- **Fly.io** - Production hosting

## Development

### Prerequisites

- Node.js 22+
- npm or pnpm

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server (requires build first)
- `npm run lint` - Run ESLint
- `npm run typecheck` - Type-check TypeScript files
- `npm run test` - Run tests
- `npm run preview` - Preview production build locally

### Environment Variables

Create a `.env` file in the root directory:

```env
# Email (optional in dev, required in production)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL_FROM=contact@yourdomain.com
CONTACT_EMAIL_TO=your@email.com

# Admin System (required for admin access)
ADMIN_PASSWORD=your_secure_password
SESSION_SECRET=your_session_secret

# SEO (optional)
ALLOW_INDEXING=true

# Security (optional)
HONEYPOT_ENCRYPTION_SEED=your_secret_seed
```

## Data Management

Content is stored in JSON files (`app/data/*.json`) with TypeScript fallbacks (`app/data/*.ts`). The admin system allows editing content through the web interface, or you can edit JSON files directly.

To reset data from TypeScript fallbacks:
```bash
npm run seed
```

## Deployment

### Fly.io

Deploy to Fly.io:
```bash
fly secrets set RESEND_API_KEY=your_key
fly secrets set ADMIN_PASSWORD=your_password
fly secrets set SESSION_SECRET=your_secret
fly deploy
```

### Environment Variables on Fly.io

Set required secrets:
```bash
fly secrets set RESEND_API_KEY=xxx
fly secrets set CONTACT_EMAIL_FROM=contact@yourdomain.com
fly secrets set CONTACT_EMAIL_TO=your@email.com
fly secrets set ADMIN_PASSWORD=xxx
fly secrets set SESSION_SECRET=xxx
fly secrets set ALLOW_INDEXING=true
```

## Project Structure

```
app/
├── components/       # Reusable UI components
├── data/            # Content data (services, FAQs, testimonials)
├── routes/          # File-based routing
├── utils/           # Utility functions (email, images, auth)
└── types/           # TypeScript type definitions

assets/
└── images-raw/      # Source images (optimized on build/deploy)

docs/                # Project documentation
scripts/             # Build and utility scripts
```

## Code Quality

- **TypeScript** - Full type coverage
- **ESLint** - Type-aware linting with `typescript-eslint`
- **Vitest** - Unit tests for critical functionality
- **Prettier** - Code formatting (via ESLint)

## License

Private project for Chiryo Energie.
