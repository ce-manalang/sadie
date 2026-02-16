# Codebase Structure

**Analysis Date:** 2026-02-16

## Directory Layout

```
sadie/
├── src/                          # Application source code
│   ├── components/               # React page components
│   │   ├── Dashboard.jsx        # User library view
│   │   ├── BookDetail.jsx       # Single book detail page
│   │   ├── PublicCatalog.jsx    # Public books grid view
│   │   └── Login.jsx            # Authentication form
│   ├── api/                     # API client configuration
│   │   └── samClient.js         # Axios instance setup
│   ├── assets/                  # Static assets
│   │   └── react.svg            # Placeholder SVG
│   ├── App.jsx                  # Root router and layout
│   ├── main.jsx                 # Application entry point
│   ├── App.css                  # App-level styles
│   └── index.css                # Global styles with Tailwind
├── public/                       # Static files served as-is
│   └── vite.svg
├── vite.config.js               # Vite build configuration
├── eslint.config.js             # ESLint rules
├── package.json                 # Dependencies and scripts
└── .planning/                   # GSD planning documents
    └── codebase/                # Codebase analysis (this directory)
```

## Directory Purposes

**`src/components/`:**
- Purpose: Page-level React components that map to routes
- Contains: Functional components using hooks for state and side effects
- Key files: `Dashboard.jsx`, `BookDetail.jsx`, `PublicCatalog.jsx`, `Login.jsx`

**`src/api/`:**
- Purpose: External service integration
- Contains: Axios client configuration with environment variable support
- Key files: `samClient.js` (creates axios instance with baseURL)

**`src/assets/`:**
- Purpose: Static image and media files
- Contains: SVG files and other assets referenced in components
- Key files: `react.svg`

**`public/`:**
- Purpose: Files served as-is; not processed by Vite
- Contains: Favicon and other static assets
- Key files: `vite.svg`

## Key File Locations

**Entry Points:**
- `src/main.jsx`: Creates React root and mounts App component
- `src/App.jsx`: Application shell with Router, layout, and route definitions

**Configuration:**
- `vite.config.js`: Vite build settings with React and Tailwind plugins
- `eslint.config.js`: ESLint configuration with React and React Hooks rules
- `package.json`: Dependencies (React, React Router, axios, Tailwind)

**Core Logic:**
- `src/components/PublicCatalog.jsx`: Fetches and displays all books from `/books` endpoint
- `src/components/Dashboard.jsx`: Fetches and displays user's library from `/library_books` endpoint
- `src/components/BookDetail.jsx`: Fetches single book details; handles add-to-library action
- `src/components/Login.jsx`: Handles user authentication and token storage
- `src/api/samClient.js`: Axios configuration with VITE_API_URL environment variable

**Styling:**
- `src/index.css`: Global styles; imports Tailwind CSS
- `src/App.css`: App-level styles (minimal usage; mostly Tailwind classes in JSX)

## Naming Conventions

**Files:**
- Components: PascalCase (`Dashboard.jsx`, `BookDetail.jsx`)
- Utilities/config: camelCase (`samClient.js`)
- Styles: lowercase with .css extension (`index.css`, `App.css`)

**Directories:**
- lowercase plural for collections (`components/`, `api/`, `assets/`)

**Components:**
- Function names match filename exactly (`function Dashboard() {...}`)
- Default exports (`export default Dashboard;`)

**Variables:**
- State variables: camelCase (`myBooks`, `loading`, `error`)
- Constants: camelCase or UPPERCASE for API endpoints (`API_URL`)

## Where to Add New Code

**New Feature (e.g., search, favorites):**
- Create component: `src/components/FeatureName.jsx`
- Add route in `src/App.jsx` Routes section
- Add API call in component's useEffect if needed
- Add navigation link in header/nav section of App.jsx

**New Component (sub-component for reuse):**
- Create in `src/components/` with PascalCase name
- Import in parent component
- Keep state management at page level; pass via props

**New API Endpoints:**
- If creating helper: Add export to `src/api/samClient.js` (see `getPublicBooks()` pattern)
- In components: Import samClient and use direct axios calls or exported helpers
- Token included manually in headers: `{ Authorization: localStorage.getItem('token') }`

**Utilities/Helpers:**
- No utilities directory yet; add to `src/utils/` if needed
- Keep component-specific helpers in component file if minimal
- Extract to utils if used across multiple components

## Special Directories

**`node_modules/`:**
- Purpose: NPM dependencies
- Generated: Yes (created by npm install)
- Committed: No (in .gitignore)

**`.next/` and similar build output:**
- Not present; project uses Vite which outputs to `dist/`
- Build artifacts not committed to git

**`dist/`:**
- Purpose: Production build output from Vite
- Generated: Yes (created by npm run build)
- Committed: No (in .gitignore)

## Import Patterns

**React/Hooks:**
```javascript
import { useState, useEffect } from 'react';
```

**Router:**
```javascript
import { Link, useParams, useNavigate, Routes, Route } from 'react-router-dom';
```

**API Client:**
```javascript
import axios from 'axios';
// Direct calls or import samClient if using helper functions
```

**Environment Variables:**
```javascript
import.meta.env.VITE_API_URL || 'http://localhost:3000'
```

## Testing Structure

**Not currently present:**
- No test directory (test/*.test.jsx or *.spec.jsx)
- No test configuration (jest.config.js, vitest.config.js)
- No test runner in package.json scripts
- Test support should be added to enable CI/CD validation
