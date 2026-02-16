# Architecture

**Analysis Date:** 2026-02-16

## Pattern Overview

**Overall:** Component-based React SPA with client-side routing and REST API communication

**Key Characteristics:**
- Client-side rendering using React with React Router for navigation
- Page components that manage their own state and API calls
- Token-based authentication stored in browser localStorage
- Direct axios calls from components (not abstracted through a service layer)
- Tailwind CSS for styling

## Layers

**Presentation Layer:**
- Purpose: Render UI and handle user interactions
- Location: `src/components/`, `src/App.jsx`
- Contains: React functional components using hooks (useState, useEffect, useParams, useNavigate)
- Depends on: React Router, axios
- Used by: Directly mounted in App.jsx routes

**Routing Layer:**
- Purpose: Client-side route management and navigation
- Location: `src/App.jsx`
- Contains: Routes configuration, navigation links, layout structure
- Depends on: React Router DOM
- Used by: All pages; provides navigation context

**API Client Layer:**
- Purpose: HTTP communication configuration
- Location: `src/api/samClient.js`
- Contains: Axios instance configuration with base URL from environment
- Depends on: axios, environment variables (VITE_API_URL)
- Used by: Component modules for API calls

**Application Entry:**
- Purpose: Bootstrap React application
- Location: `src/main.jsx`
- Contains: React root creation and StrictMode wrapper
- Depends on: src/App.jsx, src/index.css

## Data Flow

**Public Catalog View:**

1. `PublicCatalog.jsx` mounts
2. `useEffect` fetches `GET /books` via axios
3. Response stored in component state (books array)
4. Books rendered as grid links to `/books/:id`

**Book Detail View:**

1. User navigates to `/books/:id`
2. `BookDetail.jsx` reads `id` param with `useParams()`
3. Fetches `GET /books/:id` (includes token header if authenticated)
4. Displays book details and "Add to Library" button
5. On button click: POST to `/library_books` with `dato_book_id` and `status: 'to-read'`
6. Refreshes book data to reflect `in_library` status

**Authentication Flow:**

1. User visits `/login`
2. `Login.jsx` form submits credentials to `POST /users/sign_in`
3. Response includes Authorization header with JWT token
4. Token stored in localStorage via `setToken()` callback
5. Subsequent API requests include `Authorization: token` header
6. Dashboard accessible only after login

**Dashboard (User Library) View:**

1. `Dashboard.jsx` reads token from localStorage
2. Fetches `GET /library_books` with Authorization header
3. Displays user's added books with personal metadata (status, tags, notes)
4. Delete endpoint: `DELETE /library_books/{id}` removes from library
5. UI updates immediately after deletion

**State Management:**
- Token: stored in localStorage and React state in App.jsx
- Page data: component-level state (useState)
- Navigation: React Router handles route state
- No global state management (Redux/Context)

## Key Abstractions

**API Client (samClient):**
- Purpose: Centralized axios configuration
- Examples: `src/api/samClient.js`
- Pattern: Exports axios instance with baseURL; individual components make direct calls

**Page Components:**
- Purpose: Top-level route handlers that fetch and display data
- Examples: `src/components/PublicCatalog.jsx`, `src/components/Dashboard.jsx`, `src/components/BookDetail.jsx`
- Pattern: Functional components with useEffect for data fetching, useState for local state

**Reusable Component Patterns:**
- Book Card: Rendered in both PublicCatalog and Dashboard with slight variations
- Grid Layout: Shared Tailwind grid structure across catalog views
- API Headers: Authorization header pattern repeated in axios calls

## Entry Points

**React Application Root:**
- Location: `src/main.jsx`
- Triggers: HTML page load targets `#root` DOM element
- Responsibilities: Creates React root and renders App component

**App Component:**
- Location: `src/App.jsx`
- Triggers: Loaded by src/main.jsx
- Responsibilities: Manages authentication state (token), provides Router context, renders layout (header/footer/navigation), defines all routes

**Route Handlers:**
- Location: `src/components/` (PublicCatalog, BookDetail, Dashboard, Login)
- Triggers: Router navigates based on URL
- Responsibilities: Component-specific state management, data fetching, UI rendering

## Error Handling

**Strategy:** Try-catch blocks in async functions with console.error and user alerts

**Patterns:**
- API failures: console.error() for debugging, window.alert() for user-facing errors
- Network errors: caught in catch blocks; fallback to placeholder images for missing covers
- Validation: Client-side form handling with basic state validation
- No error boundaries implemented

## Cross-Cutting Concerns

**Logging:** console.error() for exceptions; no structured logging framework

**Validation:** Minimal; localStorage token presence assumed valid; no JWT validation on client

**Authentication:** Token stored in localStorage; included in Authorization header; no refresh token handling; logout clears localStorage

**API Communication:** Direct axios calls from components; no request/response interceptors
