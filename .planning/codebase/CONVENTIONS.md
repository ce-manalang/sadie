# Coding Conventions

**Analysis Date:** 2026-02-16

## Naming Patterns

**Files:**
- React components: PascalCase (e.g., `BookDetail.jsx`, `Dashboard.jsx`, `Login.jsx`)
- Non-component files: camelCase (e.g., `samClient.js`, `index.css`)
- All JavaScript/JSX files use `.jsx` extension for components and `.js` for utilities

**Functions:**
- Component functions: PascalCase (e.g., `function BookDetail()`, `function Dashboard()`)
- Event handlers: `handle` prefix + PascalCase (e.g., `handleRemoveBook`, `handleSubmit`)
- Helper/fetch functions: camelCase with descriptive verbs (e.g., `fetchBook`, `fetchLibraryBooks`, `addToLibrary`)
- Async functions: camelCase with verb prefix (e.g., `fetchBook`, `addToLibrary`)

**Variables:**
- State variables: camelCase (e.g., `book`, `myBooks`, `loading`, `error`, `adding`)
- Constants: camelCase (e.g., `API_URL` in `PublicCatalog.jsx` is uppercase for a module-level constant)
- Destructured props: camelCase (e.g., `{ id }`, `{ token, setToken }`)

**Types:**
- No TypeScript used in project (JSX with JavaScript)
- React component props destructured inline in function parameters (e.g., `function Login({ setToken })`)

## Code Style

**Formatting:**
- No Prettier config detected
- Indentation appears to be tabs (observed in source files)
- Consistent use of tabs for indentation throughout codebase

**Linting:**
- ESLint 9.39.1 with flat config
- Config file: `eslint.config.js`
- Rules enforced:
  - `@eslint/js` recommended rules
  - `react-hooks` recommended rules via `eslint-plugin-react-hooks`
  - `react-refresh` vite-specific rules via `eslint-plugin-react-refresh`
  - Custom: `'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]` - allows uppercase/underscore-prefixed vars
- Linting command: `npm run lint`

## Import Organization

**Order:**
1. React/library imports (from `react`, `react-router-dom`)
2. Third-party packages (e.g., `axios`)
3. Local components/utilities (relative imports from `.`)

**Pattern observed in files:**
```javascript
// Example from BookDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
```

```javascript
// Example from main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
```

**Path Aliases:**
- No path aliases configured (using relative imports like `./components/...`)
- Environment variables accessed via `import.meta.env` (Vite pattern)

## Error Handling

**Patterns:**
- Try-catch blocks used with async/await for API calls (e.g., in `BookDetail.jsx`, `Dashboard.jsx`, `Login.jsx`)
- Promise `.catch()` chains used when axios promises are not awaited (e.g., `PublicCatalog.jsx`)
- Error responses: Access error details via `err.response?.data?.error`
- User feedback: `alert()` for errors (temporary solution, appears in `Login.jsx`, `Dashboard.jsx`, `BookDetail.jsx`)
- Console logging: `console.error()` for error logging in catch blocks
- No centralized error handling or error boundary components observed

**Example pattern:**
```javascript
try {
  const res = await axios.get(`http://localhost:3000/books/${id}`, config);
  setBook(res.data);
} catch (err) {
  console.error("Error fetching book details", err);
  setError(err.response?.data?.error || "Failed to load book details");
} finally {
  setLoading(false);
}
```

## Logging

**Framework:** `console` (no logging library)

**Patterns:**
- `console.error()` used only in catch blocks for error reporting
- No info/debug/warn levels used
- Error messages include context (e.g., "Error fetching book details")
- Console logging used exclusively for error cases
- No production logging strategy observed

## Comments

**When to Comment:**
- Minimal commenting observed in codebase
- JSDoc/TSDoc: Not used
- Inline comments rare but present for clarification (e.g., "// Refresh book data to show library status" in `BookDetail.jsx`)
- Comments used for intent/explanation of non-obvious code

## Function Design

**Size:** Functions are kept relatively small and focused:
- Component functions: 30-70 lines typical
- Handler functions: 10-25 lines
- Fetch functions: 5-15 lines (wrapped in useEffect)

**Parameters:**
- Component functions accept props destructured in parameters
- Handler functions accept event objects (e.g., `onClick` handlers receive `e` from React)
- Keep parameter count minimal through destructuring

**Return Values:**
- React components return JSX elements
- Handler functions return `undefined` (void) - side effects via setState
- Fetch functions (inside useEffect) return `undefined`

## Module Design

**Exports:**
- All components use `export default ComponentName;` (default export)
- Single component per file (e.g., `BookDetail.jsx` exports only `BookDetail`)
- Utility modules export named functions (e.g., `samClient.js` exports `getPublicBooks` and default `sam`)

**Barrel Files:**
- Not used in current structure
- Each component imported directly by path (e.g., `import BookDetail from './components/BookDetail'`)

## Styling

**Approach:** Tailwind CSS 4.1.18
- Config: `@tailwindcss/vite` plugin in `vite.config.js`
- Styles applied via className attributes with Tailwind utility classes
- Global styles in `index.css` with `@import "tailwindcss";`
- No CSS modules used
- No component-scoped styles (only Tailwind utilities)

## React-Specific Patterns

**Hooks Usage:**
- `useState` for local component state
- `useEffect` for side effects (data fetching, initialization)
- `useParams` for reading URL parameters
- `useNavigate` for programmatic navigation
- No custom hooks observed

**State Management:**
- Local component state only (no global state management library)
- State lifted to parent (`App.jsx`) for auth token: `token` and `setToken` props

**Component Patterns:**
- Functional components throughout
- Conditional rendering via ternary operators and && operators
- Optional chaining for safe property access (e.g., `book.cover?.url`)
- No prop drilling noticed - limited component nesting

---

*Convention analysis: 2026-02-16*
