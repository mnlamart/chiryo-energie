# Admin System - Complete Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Authentication](#authentication)
4. [Data Storage](#data-storage)
5. [Editors](#editors)
6. [Form Handling](#form-handling)
7. [Setup & Configuration](#setup--configuration)
8. [Usage Guide](#usage-guide)
9. [Technical Details](#technical-details)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The admin system is a web-based content management interface that allows authorized users to edit all dynamic content on the Chiryo Energie website without modifying TypeScript source files. It provides a user-friendly interface for managing:

- **Services**: All service offerings (Reiki, Sophro-relaxation, etc.)
- **Content**: Static content sections (About, Hero, Contact info)
- **FAQs**: General and service-specific frequently asked questions
- **Testimonials**: Client testimonials and reviews

### Key Features

- ✅ Password-protected authentication
- ✅ Session-based access control
- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ Inline editing with real-time validation
- ✅ Preview before saving
- ✅ Confirmation dialogs to prevent accidental changes
- ✅ Automatic data persistence to JSON files
- ✅ Fallback to TypeScript data if JSON files are missing

---

## Architecture

### File Structure

```
app/
├── routes/
│   ├── admin.login.tsx      # Login page
│   └── admin.tsx             # Main admin panel
├── components/
│   └── admin/
│       ├── ServicesEditor.tsx
│       ├── ContentEditor.tsx
│       ├── FAQsEditor.tsx
│       └── TestimonialsEditor.tsx
├── utils/
│   ├── auth.server.ts        # Authentication logic
│   └── data.server.ts        # JSON read/write operations
└── data/
    ├── services.json         # Generated JSON files
    ├── content.json
    ├── faqs.json
    └── testimonials.json
```

### Data Flow

```
User Action → Editor Component → Preview Dialog → Confirmation → Action Handler → JSON File Write → Success Message
```

### Component Hierarchy

```
admin.tsx (Main Panel)
├── Tabs (Radix UI)
│   ├── ServicesEditor
│   │   └── ServiceForm (controlled inputs)
│   ├── ContentEditor
│   │   └── Controlled inputs for nested objects
│   ├── FAQsEditor
│   │   └── Inline editing for FAQs
│   └── TestimonialsEditor
│       └── TestimonialForm (controlled inputs)
└── Dialog (Preview & Confirmation)
```

---

## Authentication

### How It Works

The admin system uses a simple password-based authentication with session cookies.

**Files:**
- `app/utils/auth.server.ts` - Authentication utilities
- `app/routes/admin.login.tsx` - Login page
- `app/routes/admin.tsx` - Protected admin panel

### Authentication Flow

1. User visits `/admin` → Redirected to `/admin/login` if not authenticated
2. User enters password → Validated against `ADMIN_PASSWORD` env variable
3. On success → Session cookie created (`__admin_session`)
4. Cookie checked on each admin route access
5. Session expires after 7 days (or when browser closes in production)

### Session Management

```typescript
// Session cookie configuration
{
  name: "__admin_session",
  httpOnly: true,        // Prevents XSS attacks
  path: "/",
  sameSite: "lax",       // CSRF protection
  secure: production,    // HTTPS only in production
  maxAge: 7 days
}
```

### Environment Variables

```bash
# Required for authentication
ADMIN_PASSWORD=your-secure-password-here  # Default: "admin" (change in production!)

# Optional (for session encryption)
SESSION_SECRET=your-random-secret-string  # Default: "default_secret_for_dev"
```

### Security Features

- ✅ Password-protected access
- ✅ HTTP-only cookies (prevents JavaScript access)
- ✅ SameSite cookie policy (CSRF protection)
- ✅ Secure cookies in production (HTTPS only)
- ✅ Admin routes excluded from sitemap
- ✅ Admin routes disallowed in robots.txt
- ✅ `noindex, nofollow` meta tags on admin pages

---

## Data Storage

### JSON File System

All editable content is stored in JSON files located in `app/data/`:

- `services.json` - Service definitions
- `content.json` - Static content (about, hero, contact)
- `faqs.json` - FAQ categories and service-specific FAQs
- `testimonials.json` - Client testimonials

### Fallback System

The system uses a two-tier data loading strategy:

1. **Primary**: Read from JSON files (if they exist)
2. **Fallback**: Use TypeScript data files (`app/data/*.ts`)

This ensures:
- The app works even if JSON files are deleted
- TypeScript files serve as backup/seed data
- Easy reset to defaults using seed script

### Data Reading

**Server-side only** (`app/utils/data.server.ts`):

```typescript
// Server-side function (cannot be imported on client)
export function readServicesFromJson(): Service[] | null {
  // Reads from app/data/services.json
  // Returns null if file doesn't exist
}

// In route loader
const services = readServicesFromJson() ?? fallbackServices;
```

### Data Writing

**Server-side only** (via action handlers):

```typescript
// In admin.tsx action handler
if (actionType === "saveServices") {
  const services = JSON.parse(formData.get("services"));
  writeServicesToJson(services);
  return data({ success: true, message: "Services sauvegardés" });
}
```

### TypeScript Fallback Files

The TypeScript files (`app/data/*.ts`) export fallback data that is **safe to import on the client**:

```typescript
// app/data/services.ts
export const fallbackServices: Service[] = [
  // ... service definitions
];

// Safe to import anywhere
import { fallbackServices } from '../data/services';
```

**Important**: The TypeScript files do NOT read from JSON at module level. They only export static fallback data.

---

## Editors

### Services Editor

**File**: `app/components/admin/ServicesEditor.tsx`

**Features:**
- List all services with edit/delete buttons
- Add new service button
- Inline editing form
- Preview before saving
- Validation:
  - ID must be kebab-case (lowercase, hyphens only)
  - All required fields must be filled
  - Meta description: 150-160 characters

**Form Fields:**
- `id` (kebab-case, required, disabled when editing)
- `title` (required)
- `description` (required, textarea)
- `price` (required, default: "60 euros")
- `duration` (optional, default: "1h environ")
- `metaDescription` (required, 150-160 chars, textarea)
- `notes` (optional, textarea)
- `image` (optional, filename without extension)

**Default Values (New Service):**
```typescript
{
  id: "",
  title: "",
  description: "",
  price: "60 euros",
  duration: "1h environ",
  notes: "",
  metaDescription: "Description optimisée pour le SEO (150-160 caractères)...",
  image: ""
}
```

**Form Implementation:**
- Uses controlled inputs with `useState`
- `useEffect` syncs form data when editing different services
- Zod validation on submit
- Error messages displayed per field

### Content Editor

**File**: `app/components/admin/ContentEditor.tsx`

**Features:**
- Edit three main content sections:
  1. **About Content** ("Qui suis-je")
  2. **Hero Content** (homepage banner)
  3. **Contact Info** (phone, email, location)
- Dynamic paragraph management (add/remove)
- Preview before saving

**About Content Fields:**
- `title` (required)
- `name` (required)
- `intro` (required, textarea)
- `paragraphs` (array of strings, can add/remove)

**Hero Content Fields:**
- `title` (required)
- `subtitle` (required)

**Contact Info Fields:**
- `phone` (required)
- `email` (required)
- `location` (required)

**Form Implementation:**
- Uses controlled inputs with `useState` for nested objects
- Handles array manipulation (add/remove paragraphs)
- Validation on submit

### FAQs Editor

**File**: `app/components/admin/FAQsEditor.tsx`

**Features:**
- Edit general FAQs (categorized)
- Edit service-specific FAQs
- Add/remove categories
- Add/remove FAQs within categories
- Preview before saving

**General FAQs Structure:**
```typescript
{
  generalFAQs: [
    {
      title: "Category Name",
      faqs: [
        { question: "...", answer: "..." }
      ]
    }
  ]
}
```

**Service-Specific FAQs Structure:**
```typescript
{
  serviceFAQs: {
    "service-id": [
      { question: "...", answer: "..." }
    ]
  }
}
```

**Form Implementation:**
- Inline editing for all FAQ fields
- Direct state updates for nested structures
- No separate form component (all editing is inline)

### Testimonials Editor

**File**: `app/components/admin/TestimonialsEditor.tsx`

**Features:**
- List all testimonials
- Add new testimonial
- Edit existing testimonial
- Delete testimonial
- Preview before saving

**Form Fields:**
- `id` (auto-generated, disabled when editing)
- `author` (required, default: "")
- `text` (required, default: "")
- `rating` (1-5, default: 5)
- `role` (optional, default: "Client Chiryo Energie")

**Form Implementation:**
- Uses controlled inputs with `useState`
- `useEffect` syncs form data when editing different testimonials
- Simple validation (author and text required)

---

## Form Handling

### Controlled vs Uncontrolled Inputs

**Services & Testimonials**: Use **controlled inputs** with `useState`

```typescript
const [formData, setFormData] = useState({
  title: service?.title || "",
  // ...
});

<input
  value={formData.title}
  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
/>
```

**Why controlled inputs?**
- ✅ Immediate updates when editing different items
- ✅ Full control over form state
- ✅ Easy to sync with props using `useEffect`
- ✅ Better for complex validation

**Content & FAQs**: Use **controlled inputs** with nested state

```typescript
const [content, setContent] = useState<ContentData>(initialContent);

// Update nested field
setContent({
  ...content,
  aboutContent: {
    ...content.aboutContent,
    title: newValue
  }
});
```

### Form Validation

**Services Editor:**
- Uses Zod schema validation
- Validates on submit
- Shows field-specific error messages

```typescript
const serviceSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  metaDescription: z.string().min(150).max(160),
  // ...
});

const validation = serviceSchema.safeParse(formData);
if (!validation.success) {
  // Show errors
}
```

**Other Editors:**
- Simple required field checks
- Alert messages for validation errors

### Default Values

All editors provide helpful default values when creating new items:

**Services:**
- Price: "60 euros"
- Duration: "1h environ"
- Meta description: SEO guidance text

**Testimonials:**
- Rating: 5
- Role: "Client Chiryo Energie"

**Placeholders:**
All form fields have helpful placeholder text to guide users.

### Editing Existing Items

**Key Implementation:**
- Forms use `useEffect` to sync when the item prop changes
- `key` prop on form elements forces remount when switching items
- Form state resets to item values automatically

```typescript
useEffect(() => {
  if (service) {
    setFormData({
      id: service.id,
      title: service.title,
      // ... all fields
    });
  }
}, [service]);
```

---

## Setup & Configuration

### Initial Setup

1. **Set environment variables** (optional, defaults work for development):

```bash
# .env or production environment
ADMIN_PASSWORD=your-secure-password
SESSION_SECRET=your-random-secret
```

2. **Initialize JSON files** (optional, app works without them):

```bash
# Seed all data from TypeScript fallbacks
npm run seed

# Or seed specific data types
npm run seed:services
npm run seed:content
npm run seed:faqs
npm run seed:testimonials
```

3. **Access admin panel**:

```
http://localhost:3000/admin/login
```

Default password: `admin` (change in production!)

### Production Setup

1. **Set secure password**:
```bash
ADMIN_PASSWORD=your-very-secure-password-here
```

2. **Set session secret**:
```bash
SESSION_SECRET=$(openssl rand -hex 32)
```

3. **Ensure file permissions**:
```bash
# app/data/ directory must be writable
chmod 755 app/data/
```

4. **Backup JSON files**:
- Consider backing up JSON files regularly
- They contain all your content changes

---

## Usage Guide

### Logging In

1. Navigate to `/admin/login`
2. Enter password (default: `admin`)
3. Click "Se connecter"
4. You'll be redirected to `/admin`

### Editing Services

1. Click **Services** tab
2. Find the service you want to edit
3. Click **Modifier** button
4. Form appears with existing values pre-filled
5. Make changes
6. Click **Sauvegarder**
7. Preview dialog appears (optional)
8. Confirm save
9. Success message appears

**Adding New Service:**
1. Click **Ajouter un service**
2. Fill in all required fields
3. ID will be auto-generated from title (or enter manually)
4. Click **Sauvegarder**

**Deleting Service:**
1. Click **Supprimer** button
2. Confirm deletion
3. Service is removed immediately

### Editing Content

1. Click **Contenu** tab
2. Edit fields directly
3. Use **+ Ajouter un paragraphe** to add paragraphs
4. Use **Supprimer** to remove paragraphs
5. Click **Sauvegarder** when done
6. Preview and confirm

### Editing FAQs

1. Click **FAQs** tab
2. Edit questions/answers inline
3. Click **+ Ajouter une FAQ** to add new FAQs
4. Click **Supprimer** to remove FAQs
5. Click **Sauvegarder** when done
6. Preview and confirm

### Editing Testimonials

1. Click **Témoignages** tab
2. Click **Modifier** on a testimonial
3. Edit fields
4. Click **Sauvegarder**
5. Preview and confirm

**Adding New Testimonial:**
1. Click **Ajouter un témoignage**
2. Fill in author, text, rating, role
3. Click **Sauvegarder**

---

## Technical Details

### Server-Client Separation

**Critical**: Server-only code cannot be imported on the client.

**Problem**: Vite tries to bundle all imports, including server-only modules.

**Solution**: 
- Server functions (`readServicesFromJson`, etc.) are in `*.server.ts` files
- TypeScript data files only export fallback data (client-safe)
- Route loaders read from JSON on the server
- Client components never import server-only code

**File Structure:**
```
app/data/services.ts          # Client-safe fallback export
app/utils/data.server.ts      # Server-only JSON operations
app/routes/admin.tsx          # Server loader reads JSON
```

### Data Loading Strategy

**In Route Loader** (`app/routes/admin.tsx`):

```typescript
export async function loader({ request }: LoaderFunctionArgs) {
  await requireAdminAuth(request);
  
  // Read from JSON first, fallback to TypeScript
  const services = readServicesFromJson() ?? fallbackServices;
  const content = readContentFromJson() ?? fallbackContent;
  // ...
  
  return data({ services, content, ... });
}
```

**In Component**:
```typescript
export default function Admin() {
  const loaderData = useLoaderData<typeof loader>();
  // loaderData.services contains the data
}
```

### Form State Management

**Services & Testimonials**:
- Use `useState` for form data
- Use `useEffect` to sync when prop changes
- Controlled inputs with `value` and `onChange`

**Content & FAQs**:
- Use `useState` for entire data structure
- Direct mutations for nested updates
- Controlled inputs throughout

### Preview & Confirmation Flow

1. User clicks "Sauvegarder"
2. Form validates
3. Preview dialog opens (shows what will be saved)
4. User reviews
5. User clicks "Confirmer"
6. Confirmation dialog opens
7. User confirms
8. Action handler saves to JSON
9. Success message displayed

**Implementation:**
```typescript
const [previewData, setPreviewData] = useState(null);
const [showConfirm, setShowConfirm] = useState(false);

const handleSave = () => {
  setPreviewData(formData); // Show preview
};

const handleConfirmPreview = () => {
  setPreviewData(null);
  setShowConfirm(true); // Show confirmation
};

const handleFinalSave = () => {
  // Actually save to JSON
  fetcher.submit(formData, { method: "post" });
};
```

### Error Handling

**Validation Errors:**
- Displayed inline below each field
- Red text, clear messages
- Prevent form submission

**Server Errors:**
- Displayed as alert messages
- Check server logs for details

**File Write Errors:**
- Check file permissions
- Ensure `app/data/` directory exists
- Verify disk space

---

## Troubleshooting

### Buttons Not Working

**Symptom**: Clicking buttons doesn't trigger actions.

**Solution**: 
- ✅ Already fixed: All buttons have `type="button"` attribute
- Check browser console for JavaScript errors
- Verify React is properly hydrated

### Forms Not Pre-filling When Editing

**Symptom**: Editing an item shows empty form fields.

**Solution**:
- ✅ Already fixed: Forms use `useEffect` to sync with props
- Verify the item data is being passed correctly
- Check that `key` prop changes when switching items

### Data Not Saving

**Symptom**: Changes don't persist after saving.

**Checklist**:
1. Verify file permissions on `app/data/` directory
2. Check server logs for write errors
3. Ensure JSON files are writable
4. Verify disk space
5. Check for JSON syntax errors (invalid JSON won't save)

### Can't Login

**Symptom**: Password doesn't work.

**Solutions**:
1. Check `ADMIN_PASSWORD` environment variable
2. Default password is `admin` (if env var not set)
3. Clear cookies and try again
4. Check server logs for authentication errors

### JSON Files Missing

**Symptom**: App works but admin shows no data.

**Solution**:
- This is normal! App uses TypeScript fallback data
- Run `npm run seed` to create JSON files
- Or start editing - JSON files will be created on first save

### "Server-only module" Error

**Symptom**: Build error about server modules.

**Solution**:
- ✅ Already fixed: Server code is in `*.server.ts` files
- Never import `data.server.ts` in client components
- Use route loaders to read data on server

### Tabs Not Switching

**Symptom**: Clicking tabs doesn't change content.

**Solution**:
- ✅ Already fixed: Using Radix UI Tabs component
- Verify `@radix-ui/react-tabs` is installed
- Check browser console for errors

### Preview Dialog Not Showing

**Symptom**: Clicking "Sauvegarder" doesn't show preview.

**Checklist**:
1. Verify Dialog component is imported correctly
2. Check that `previewData` state is being set
3. Ensure Dialog is properly rendered
4. Check browser console for errors

---

## Best Practices

### Password Security

- ✅ Use strong passwords in production
- ✅ Change default password immediately
- ✅ Don't commit passwords to git
- ✅ Use environment variables

### Data Backup

- ✅ Backup JSON files regularly
- ✅ Consider version control for JSON files (optional)
- ✅ Keep TypeScript fallback files up to date

### Content Guidelines

**Services:**
- Use descriptive titles
- Write clear, SEO-friendly descriptions
- Keep meta descriptions 150-160 characters
- Use kebab-case for IDs

**FAQs:**
- Write clear, concise questions
- Provide helpful, detailed answers
- Organize by category

**Testimonials:**
- Verify authenticity
- Keep testimonials relevant
- Use appropriate ratings

### Performance

- ✅ Forms use controlled inputs (efficient updates)
- ✅ Validation only on submit (not on every keystroke)
- ✅ Preview dialogs are lazy-loaded
- ✅ Large data sets handled efficiently

---

## API Reference

### Authentication Functions

**`app/utils/auth.server.ts`**

```typescript
// Get admin session from request
getAdminSession(request: Request): Promise<Session>

// Create admin session (returns null if password incorrect)
createAdminSession(password: string): Promise<Session | null>

// Require authentication (throws 401 if not authenticated)
requireAdminAuth(request: Request): Promise<Session>

// Commit session to cookie
commitAdminSession(session: Session): Promise<string>

// Destroy session
destroyAdminSession(session: Session): Promise<string>
```

### Data Functions

**`app/utils/data.server.ts`**

```typescript
// Read from JSON
readServicesFromJson(): Service[] | null
readContentFromJson(): ContentData | null
readFAQsFromJson(): FAQsData | null
readTestimonialsFromJson(): Testimonial[] | null

// Write to JSON
writeServicesToJson(services: Service[]): Promise<void>
writeContentToJson(content: ContentData): Promise<void>
writeFAQsToJson(faqs: FAQsData): Promise<void>
writeTestimonialsToJson(testimonials: Testimonial[]): Promise<void>
```

### Seed Script

**`scripts/seed-data.mjs`**

```bash
# Seed all data
node scripts/seed-data.mjs

# Seed specific type
node scripts/seed-data.mjs services
node scripts/seed-data.mjs content
node scripts/seed-data.mjs faqs
node scripts/seed-data.mjs testimonials
```

---

## Summary

The admin system provides a complete content management solution for the Chiryo Energie website. It uses:

- **Simple password authentication** with session cookies
- **JSON file storage** for all editable content
- **TypeScript fallbacks** for reliability
- **Controlled form inputs** for proper state management
- **Preview & confirmation** dialogs for safety
- **Full CRUD operations** for all content types

All changes are saved immediately to JSON files and take effect on the next page load. The system is designed to be simple, secure, and maintainable.
