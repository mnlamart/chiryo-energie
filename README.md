# Chiryo Energie - Website


A high-performance, production-ready showcase website built with modern web following SEO best practices, and accessibility compliance for Chiryo Energie, a holistic wellness practice offering energy healing, Reiki, 
sophrology, and spiritual guidance services in Joué-Les-Tours, France.

**Live Site:** [chiryo-energie.sevend.io](https://chiryo-energie.sevend.io)

## 🚀 Key Highlights

- **On-Demand Image Optimization** - Custom image transformation service with Sharp, generating AVIF/WebP/JPEG formats and responsive variants on-the-fly
- **Full SSR Architecture** - React Router v7 with server-side rendering for optimal performance and SEO
- **Type-Safe Forms** - Conform + Zod v4 integration with honeypot spam protection
- **Performance Optimized** - Multi-stage Docker builds, compression middleware, and intelligent caching strategies
- **SEO Excellence** - Structured data (JSON-LD), dynamic sitemap/robots.txt, meta tags, and breadcrumbs
- **Accessibility First** - WCAG compliant with Radix UI primitives and semantic HTML
- **Comprehensive Documentation** - Architecture docs, ADRs, and implementation guides

## 🛠️ Tech Stack

### Core
- **React Router v7** - Full-stack React framework with SSR
- **React 19** - Latest React with concurrent features
- **TypeScript** - Complete type safety across the codebase
- **Vite 7** - Ultra-fast build tool and dev server

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled component primitives
- **Motion** - Animation library for smooth interactions

### Backend & Infrastructure
- **Express 5** - Production server with compression middleware
- **Sharp** - High-performance image transformation (AVIF, WebP, JPEG)
- **Docker** - Multi-stage builds for optimized production images
- **Fly.io** - Production hosting with auto-scaling

### Developer Experience
- **Zod v4** - Runtime schema validation
- **Conform** - Type-safe form handling with React Router
- **Vitest** - Fast unit testing framework
- **ESLint** - Type-aware linting with TypeScript ESLint

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

## 📊 Code Quality

- **TypeScript** - Full type coverage with strict mode
- **ESLint** - Type-aware linting with `typescript-eslint`
- **Vitest** - Unit tests for critical functionality (image service, utilities)
- **Prettier** - Consistent code formatting (via ESLint)
- **Architecture Decision Records (ADRs)** - Documented technical decisions

## 🏗️ Architecture Highlights

- **On-Demand Image Transformation** - Custom image service that generates optimized variants at request time, with intelligent caching
- **File-Based Routing** - React Router v7's declarative route configuration
- **Type-Safe Data Layer** - JSON files with TypeScript fallbacks for type safety
- **Middleware Architecture** - Honeypot spam protection, compression, and caching
- **Multi-Stage Docker Builds** - Optimized production images with minimal footprint

## License

Private project for Chiryo Energie.
