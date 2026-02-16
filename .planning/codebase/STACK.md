# Technology Stack

**Analysis Date:** 2026-02-16

## Languages

**Primary:**
- JavaScript (JSX) - React components and UI logic in `src/components/` and `src/App.jsx`
- CSS - Styling with Tailwind CSS in `src/index.css` and `src/App.css`

## Runtime

**Environment:**
- Node.js 18+ (v20+ recommended)
- Browser runtime (ES2020+ JavaScript support)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- React 19.2.0 - UI component framework
- Vite 7.2.4 - Build tool, development server, and module bundler
- React Router DOM 7.12.0 - Client-side routing (`src/App.jsx` defines routes)

**Styling:**
- Tailwind CSS 4.1.18 - Utility-first CSS framework
- @tailwindcss/vite 4.1.18 - Vite plugin for Tailwind CSS integration

**UI/Component Enhancements:**
- Tailwind Plus Elements (via CDN in `index.html`) - Pre-built components for Tailwind

## Key Dependencies

**Critical:**
- axios 1.13.2 - HTTP client for API communication with Sam Library API
  - Used in: `src/api/samClient.js`, `src/components/Login.jsx`, `src/components/PublicCatalog.jsx`, `src/components/BookDetail.jsx`, `src/components/Dashboard.jsx`

**Build & Dev:**
- @vitejs/plugin-react 5.1.1 - React Fast Refresh support for Vite
- eslint 9.39.1 - Code quality linting
- @eslint/js 9.39.1 - ESLint JavaScript rules configuration
- eslint-plugin-react-hooks 7.0.1 - React Hooks linting rules
- eslint-plugin-react-refresh 0.4.24 - React Refresh plugin for eslint
- globals 16.5.0 - Global variables definitions for ESLint

**Type Definitions:**
- @types/react 19.2.5 - TypeScript types for React
- @types/react-dom 19.2.3 - TypeScript types for React DOM

## Configuration

**Environment:**
- Variable file: `.env` (via `.env.example` template)
- Primary env var: `VITE_API_URL` - Base URL for Sam Library API (defaults to `http://localhost:3000`)
- Vite env prefix: `VITE_` - All environment variables must be prefixed with this to be accessible via `import.meta.env`
- Configuration file: `vite.config.js`

**Linting:**
- ESLint configuration: `eslint.config.js` (flat config format)
- Configured rules:
  - `no-unused-vars`: Allows unused variables starting with uppercase or underscore
  - React Hooks rules enabled
  - React Refresh rules enabled for Vite

**Build:**
- Build config: `vite.config.js`
- Entry point: `index.html`
- Build output: `dist/` directory (excluded from git via `.gitignore`)
- Plugins configured:
  - React plugin for JSX transformation
  - Tailwind CSS Vite plugin

## Scripts

**Development:**
- `npm run dev` - Start Vite development server (serves on `http://localhost:5173` by default)
- `npm run build` - Build for production (generates optimized bundle in `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint on all files

## Platform Requirements

**Development:**
- Node.js v18+ (v20+ recommended)
- npm or yarn package manager
- Sam Library API running (default: `http://localhost:3000`)

**Production:**
- Modern browser with ES2020+ support
- Static file hosting (Vite output is SPA-compatible)
- Network access to Sam Library API endpoint

## Module System

- **Type:** ES Modules (`"type": "module"` in `package.json`)
- **Syntax:** Modern import/export statements throughout codebase
- **Example:** `import axios from 'axios'` in `src/api/samClient.js`

## Asset Handling

- Static assets: `public/` directory (favicon, vite.svg)
- Image loading: Inline URLs or placeholder URLs in components
- CSS in JS: Tailwind utility classes applied via className attributes

---

*Stack analysis: 2026-02-16*
