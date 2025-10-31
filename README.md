# Chiryo Energie - Website

Website for Chiryo Energie, built with React Router v7, TypeScript, and Vite.

## Documentation

📚 **[Architecture Documentation](docs/architecture-documentation.md)** - Comprehensive guide covering the entire architecture, patterns, and best practices. Essential reading for:
- Understanding how the system works
- Reusing patterns for similar showcase websites
- Learning about performance optimization strategies
- SEO implementation details

## Features

- **Contact Form** - Secure POST-based form with honeypot spam protection and email integration
- **Toast Notifications** - User-friendly success notifications using Radix UI
- **Email Integration** - Resend API integration with automatic development mocking
- **Type-Aware Linting** - Full TypeScript type checking with ESLint
- **Server-Side Rendering** - Full SSR support with React Router v7

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Resend API Configuration
- `RESEND_API_KEY` (optional in dev, required in production)
  - Resend API key for sending emails. If not set in development, emails will be mocked and logged to console.
  - Get your API key from [Resend](https://resend.com)

### Contact Form Email Configuration
- `CONTACT_EMAIL_FROM` (optional)
  - Verified sender email address (must be verified with Resend)
  - Should be a domain you own (e.g., `contact@chiryo-energie.sevend.io`)
  - Defaults to `contact@chiryo-energie.sevend.io` if not set

- `CONTACT_EMAIL_TO` (optional)
  - Email address where contact form submissions are delivered
  - Defaults to `contact@chiryo-energie.sevend.io` if not set

### Security
- `HONEYPOT_ENCRYPTION_SEED` (optional)
  - Secret seed for honeypot spam protection encryption

- `ALLOW_INDEXING` (optional)
  - Set to `"true"` to allow search engine indexing
  - Omit or set to `false` to block indexing with `noindex, nofollow` meta tag

---

## Development

### Available Scripts

- `npm run dev` - Start development server with hot module reloading
- `npm run build` - Build the application for production
- `npm run start` - Start the production server (requires build first)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally
- `npm run typecheck` - Type-check TypeScript files
- `npm run typecheck:app` - Type-check application TypeScript files
- `npm run typecheck:node` - Type-check Node.js TypeScript files

### Tech Stack

- **React Router v7** - Full-stack React framework with SSR
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Conform** - Type-safe form validation
- **Zod v4** - Schema validation
- **Radix UI** - Accessible component primitives (Toast, Accordion)
- **Resend** - Email API for contact form submissions
- **remix-utils** - Utility functions (honeypot spam protection)

---

## Technical Details

### Form Handling

The contact form uses:
- **POST method** for secure form submission (prevents honeypot fields from appearing in URLs)
- **Zod v4** for schema validation
- **Conform** for type-safe form handling
- **Honeypot** protection via `remix-utils` to prevent spam
- **Toast notifications** using Radix UI for user feedback

### Email Integration

- Uses **Resend API** for sending emails
- Automatically mocks email sending in development (logs to console)
- Properly typed with TypeScript interfaces
- Handles errors gracefully with user-friendly messages

### Type Safety

- Full TypeScript coverage
- Type-aware ESLint rules enabled
- React Router type generation for route safety
- Proper ServerBuild typing for Express integration

## Deployment

### Fly.io

This application is configured for deployment on Fly.io. The configuration is in `fly.toml`.

#### Environment Variables on Fly.io

Set environment variables using:
```bash
fly secrets set RESEND_API_KEY=your_key
fly secrets set CONTACT_EMAIL_FROM=contact@yourdomain.com
fly secrets set CONTACT_EMAIL_TO=your@email.com
```

## Code Quality

This project uses **type-aware linting** with TypeScript ESLint, providing enhanced type safety and catching more errors at lint time. The configuration includes:

- Type-checked rules from `@typescript-eslint`
- React-specific linting rules
- Proper handling of React Router generated types
- Strict type checking across the codebase

All linting errors have been resolved to ensure code quality and type safety.
