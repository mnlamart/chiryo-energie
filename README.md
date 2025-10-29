# Chiryo Energie - Website

Website for Chiryo Energie, built with React Router v7, TypeScript, and Vite.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

### Resend API Configuration
- `RESEND_API_KEY` (optional in dev, required in production)
  - Resend API key for sending emails. If not set in development, emails will be mocked and logged to console.
  - Get your API key from [Resend](https://resend.com)

### Contact Form Email Configuration
- `CONTACT_EMAIL_FROM` (optional)
  - Verified sender email address (must be verified with Resend)
  - Should be a domain you own (e.g., `contact@chiryo-energie.fr`)
  - Defaults to `chiryoenergie@gmail.com` if not set

- `CONTACT_EMAIL_TO` (optional)
  - Email address where contact form submissions are delivered
  - Defaults to `chiryoenergie@gmail.com` if not set

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

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
