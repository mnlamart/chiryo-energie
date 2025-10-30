import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  // Ignore .react-router directory (generated files, like epic-stack)
  {
    ignores: ['.react-router/**'],
  },
  // Type-aware linting for project files
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['build/**', 'node_modules/**'],
    extends: [
      js.configs.recommended,
      // Enable type-aware linting rules
      ...tseslint.configs.recommendedTypeChecked,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      // Required for type-aware linting
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Allow exports alongside components in route files (React Router convention)
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: ['links', 'meta', 'loader', 'action', 'middleware'],
        },
      ],
    },
  },
  // Disable strict type checking for entry.server.tsx (Node.js server code)
  {
    files: ['app/entry.server.tsx'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
    },
  },
])
