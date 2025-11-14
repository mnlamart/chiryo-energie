# Understanding `projectService` in typescript-eslint

## What is `projectService`?

`projectService` is a **modern option** in `typescript-eslint` (introduced in v8) that automatically detects and uses TypeScript project configurations for type-aware linting. It's the **recommended approach** for enabling typed linting in ESLint.

## Evolution: From `project` to `projectService`

### Old Way: Explicit `project` Paths

```javascript
// Old approach (still works, but more verbose)
parserOptions: {
  project: ['./tsconfig.app.json', './tsconfig.node.json'],
  tsconfigRootDir: import.meta.dirname,
}
```

**Problems:**
- ❌ Must manually list all `tsconfig.json` files
- ❌ Doesn't scale well in monorepos
- ❌ Can miss files if configs change
- ❌ More configuration to maintain

### New Way: `project: true` (v5.52.0+)

```javascript
// Automatic detection (simpler)
parserOptions: {
  project: true,  // Auto-detects nearest tsconfig.json
  tsconfigRootDir: import.meta.dirname,
}
```

**Improvements:**
- ✅ Automatically finds `tsconfig.json` files
- ✅ Works better in monorepos
- ✅ Less configuration needed

### Latest Way: `projectService: true` (v8.0.0+) ⭐

```javascript
// Modern approach (recommended)
parserOptions: {
  projectService: true,  // Uses TypeScript Project Service APIs
  tsconfigRootDir: import.meta.dirname,
}
```

**Best Features:**
- ✅ Uses TypeScript's Project Service APIs (same as your IDE!)
- ✅ Better performance and caching
- ✅ Consistent with editor behavior
- ✅ Handles complex project structures
- ✅ Automatic tsconfig detection

## How `projectService` Works

### 1. Automatic Detection

`projectService` automatically finds the **nearest `tsconfig.json`** for each file being linted:

```
project/
├── tsconfig.json          ← Root config
├── app/
│   ├── tsconfig.app.json  ← App-specific config
│   └── routes/
│       └── _index.tsx     ← Uses tsconfig.app.json
└── server/
    ├── tsconfig.node.json ← Server-specific config
    └── server.ts          ← Uses tsconfig.node.json
```

**Without `projectService`:**
```javascript
// Must manually specify all configs
project: ['./tsconfig.app.json', './tsconfig.node.json']
```

**With `projectService`:**
```javascript
// Automatically detects the right config for each file
projectService: true
```

### 2. TypeScript Project Service APIs

`projectService` uses the **same APIs** that your IDE (VS Code, etc.) uses for type checking:

- **Consistent behavior**: ESLint sees the same types as your editor
- **Better performance**: Leverages TypeScript's caching and incremental compilation
- **Accurate**: Uses the actual TypeScript compiler's understanding

### 3. Performance Benefits

**Traditional `project` approach:**
- Loads and parses `tsconfig.json` files manually
- May reload projects unnecessarily
- Less efficient caching

**`projectService` approach:**
- Uses TypeScript's optimized Project Service
- Better caching and incremental updates
- Only reloads when necessary
- Faster linting, especially in large projects

## Your Current Configuration

Looking at your `eslint.config.js`:

```javascript
// Current (explicit paths)
parserOptions: {
  project: ['./tsconfig.app.json', './tsconfig.node.json'],
  tsconfigRootDir: import.meta.dirname,
}
```

**Could be improved to:**

```javascript
// Better (automatic detection)
parserOptions: {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,
}
```

## Advanced `projectService` Options

### Basic Usage

```javascript
parserOptions: {
  projectService: true,  // Simple boolean
  tsconfigRootDir: import.meta.dirname,
}
```

### Advanced Configuration

```javascript
parserOptions: {
  projectService: {
    // Allow files not in tsconfig.json to use default project
    allowDefaultProject: ['*.js', '*.config.js'],
    
    // Specify default tsconfig for out-of-project files
    defaultProject: './tsconfig.json',
    
    // Load TypeScript plugins (for editor integration)
    loadTypeScriptPlugins: !!process.env.VSCODE_PID,
  },
  tsconfigRootDir: import.meta.dirname,
}
```

### Options Explained

#### `allowDefaultProject: string[]`

Allows specific file patterns to use a default TypeScript project even if they're not included in any `tsconfig.json`.

**Use case:** Config files like `eslint.config.js` that aren't in your TypeScript project but you want typed linting for.

```javascript
projectService: {
  allowDefaultProject: ['*.js', '*.config.js'],
}
```

#### `defaultProject: string`

Specifies which `tsconfig.json` to use as fallback for files matching `allowDefaultProject`.

```javascript
projectService: {
  allowDefaultProject: ['*.js'],
  defaultProject: './tsconfig.json',  // Use root tsconfig
}
```

#### `loadTypeScriptPlugins: boolean`

Enables TypeScript plugins (like decorators, etc.) for editor integration. Usually only needed in IDE contexts.

```javascript
projectService: {
  loadTypeScriptPlugins: !!process.env.VSCODE_PID,  // Only in VS Code
}
```

## Comparison: `project` vs `projectService`

| Feature | `project: [...]` | `project: true` | `projectService: true` |
|---------|------------------|-----------------|------------------------|
| **Configuration** | Manual paths | Auto-detect | Auto-detect |
| **Performance** | Good | Good | ⚡ Better |
| **Caching** | Basic | Basic | ✅ Advanced |
| **Consistency** | May differ from IDE | May differ from IDE | ✅ Same as IDE |
| **Monorepo Support** | Manual setup | ✅ Auto | ✅ Auto |
| **TypeScript APIs** | Basic | Basic | ✅ Project Service |
| **Version** | All versions | v5.52.0+ | v8.0.0+ |

## Migration Guide

### Step 1: Check Your typescript-eslint Version

```bash
npm list typescript-eslint
```

**Need v8.0.0+** for `projectService`.

### Step 2: Update Your Config

**Before:**
```javascript
parserOptions: {
  project: ['./tsconfig.app.json', './tsconfig.node.json'],
  tsconfigRootDir: import.meta.dirname,
}
```

**After:**
```javascript
parserOptions: {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,
}
```

### Step 3: Test

```bash
npm run lint
```

Should work the same, but potentially faster!

## Why Use `projectService`?

### 1. **Simpler Configuration**

Less code to maintain, fewer paths to update.

### 2. **Better Performance**

Uses TypeScript's optimized Project Service with better caching.

### 3. **IDE Consistency**

ESLint sees the same types as your editor, reducing discrepancies.

### 4. **Future-Proof**

This is the direction typescript-eslint is heading. New features will target `projectService`.

### 5. **Monorepo Friendly**

Automatically handles complex project structures without manual configuration.

## Real-World Example

### Your Project Structure

```
cheryo/
├── tsconfig.json              ← Root
├── tsconfig.app.json          ← App config
├── tsconfig.node.json         ← Node config
├── tsconfig.test.json         ← Test config
├── app/
│   └── routes/
│       └── _index.tsx         ← Should use tsconfig.app.json
└── server.ts                  ← Should use tsconfig.node.json
```

### With Explicit `project`:

```javascript
// Must list all configs manually
parserOptions: {
  project: [
    './tsconfig.app.json',
    './tsconfig.node.json',
    './tsconfig.test.json'
  ],
  tsconfigRootDir: import.meta.dirname,
}
```

**Problems:**
- If you add a new `tsconfig.json`, must update ESLint config
- If you remove one, must remember to remove from ESLint config
- More maintenance

### With `projectService`:

```javascript
// Automatically finds the right config for each file
parserOptions: {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,
}
```

**Benefits:**
- ✅ Automatically uses `tsconfig.app.json` for `app/**/*.tsx`
- ✅ Automatically uses `tsconfig.node.json` for `server.ts`
- ✅ Automatically uses `tsconfig.test.json` for `**/*.test.ts`
- ✅ No manual updates needed when configs change

## Performance Considerations

### Caching

`projectService` uses TypeScript's Project Service which:
- Caches parsed TypeScript files
- Only re-checks changed files
- Shares cache with your IDE (if using same TypeScript version)

### Incremental Updates

When you change a file:
- **Old way**: May reload entire project
- **`projectService`**: Only updates what changed

### Memory Usage

`projectService` is more memory-efficient because:
- Shares TypeScript's internal structures
- Better garbage collection
- Optimized for long-running processes (like ESLint in watch mode)

## Troubleshooting

### Issue: "Cannot find tsconfig.json"

**Solution:** Ensure `tsconfigRootDir` is set correctly:

```javascript
parserOptions: {
  projectService: true,
  tsconfigRootDir: import.meta.dirname,  // Must be correct
}
```

### Issue: Files not being type-checked

**Solution:** Check that files are included in a `tsconfig.json`:

```json
// tsconfig.app.json
{
  "include": ["app/**/*"]  // Must include your files
}
```

### Issue: Performance problems

**Solution:** Use `allowDefaultProject` sparingly:

```javascript
// Only for specific files, not everything
projectService: {
  allowDefaultProject: ['*.config.js'],  // Specific patterns only
}
```

## Recommendation for Your Project

**Upgrade to `projectService`:**

```javascript
// eslint.config.js
{
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parserOptions: {
      // Change this:
      project: ['./tsconfig.app.json', './tsconfig.node.json'],
      // To this:
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
}
```

**Benefits:**
- ✅ Simpler configuration
- ✅ Better performance
- ✅ Automatic config detection
- ✅ Future-proof
- ✅ Consistent with IDE

## Summary

`projectService` is the **modern, recommended way** to enable type-aware linting in typescript-eslint:

1. **Simpler**: No need to list `tsconfig.json` files manually
2. **Faster**: Uses TypeScript's optimized Project Service APIs
3. **Smarter**: Automatically finds the right config for each file
4. **Consistent**: Same type information as your IDE
5. **Future-proof**: This is where typescript-eslint is heading

It's a drop-in replacement for `project: [...]` that works better and requires less configuration.

