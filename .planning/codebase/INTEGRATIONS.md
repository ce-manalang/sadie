# External Integrations

**Analysis Date:** 2026-02-16

## APIs & External Services

**Sam Library API:**
- Base Service - Backend API providing book catalog, authentication, and library management
  - SDK/Client: axios 1.13.2
  - Base URL: Configurable via `VITE_API_URL` environment variable (defaults to `http://localhost:3000`)
  - Auth: Bearer token passed in `Authorization` header from localStorage

## Data Storage

**Databases:**
- Remote (Sam Library API) - All persistence handled by backend
  - Connection: HTTP/REST API calls via axios
  - Client: axios HTTP client in `src/api/samClient.js`
  - Storage location: Backend managed

**Local Storage:**
- Browser localStorage - User authentication token storage
  - Key: `token`
  - Purpose: Stores JWT-like authentication token from login response
  - Usage: Retrieved in `src/App.jsx` on app initialization, passed to API requests in Authorization header

**File Storage:**
- Remote (via Sam Library API) - Book cover images served from backend
  - Access: `book.cover.url` property in API responses
  - Fallback: Placeholder image URLs (`https://via.placeholder.com/300x450?text=No+Cover`)

**Caching:**
- Client-side state via React hooks (`useState`)
- No dedicated caching service

## Authentication & Identity

**Auth Provider:**
- Custom JWT-like token via Sam Library API
  - Implementation: Devise-JWT (Rails backend)
  - Login endpoint: `POST /users/sign_in`
  - Token location: `Authorization` header in login response (`response.headers.authorization`)
  - Token storage: Browser localStorage with key `token`
  - Token usage: Passed as `Authorization: {token}` header in authenticated requests

**Protected Endpoints:**
- `/library_books` - GET, POST, DELETE
- `/books/{id}` - GET (shows personalized data when token present)
- Protected in: `src/components/Dashboard.jsx`, `src/components/BookDetail.jsx`

**Unprotected Endpoints:**
- `/books` - GET public catalog
- `/users/sign_in` - POST for authentication

## API Endpoints

**Book Operations:**
- `GET /books` - Fetch public catalog
  - Called in: `src/components/PublicCatalog.jsx`
  - Response: Array of book objects with title, author, isbn, description, cover.url

- `GET /books/:id` - Fetch individual book details
  - Called in: `src/components/BookDetail.jsx`
  - Auth: Optional (shows additional data if token present - `in_library`, `library_status`, `library_notes`)
  - Response: Book object with extended fields

**Library Operations:**
- `GET /library_books` - Fetch user's personal library
  - Called in: `src/components/Dashboard.jsx`
  - Auth: Required (Bearer token)
  - Response: Array of library_book objects with status and personal metadata

- `POST /library_books` - Add book to user's library
  - Called in: `src/components/BookDetail.jsx`
  - Auth: Required (Bearer token)
  - Request body:
    ```json
    {
      "library_book": {
        "dato_book_id": "{book_id}",
        "status": "to-read"
      }
    }
    ```

- `DELETE /library_books/:id` - Remove book from user's library
  - Called in: `src/components/Dashboard.jsx`
  - Auth: Required (Bearer token)
  - Response: Success confirmation

**Authentication:**
- `POST /users/sign_in` - User login
  - Called in: `src/components/Login.jsx`
  - Request body:
    ```json
    {
      "user": {
        "email": "{email}",
        "password": "{password}"
      }
    }
    ```
  - Response: Authorization token in `Authorization` response header
  - Content-Type: Expects `Accept: application/json` header

## Monitoring & Observability

**Error Tracking:**
- None detected - Basic console.error() logging only

**Logs:**
- Console-based error logging:
  - "Error fetching library books" in `src/components/Dashboard.jsx`
  - "Error fetching books" in `src/components/PublicCatalog.jsx`
  - "Error fetching book details" in `src/components/BookDetail.jsx`
  - "Error adding to library" in `src/components/BookDetail.jsx`
  - "Error removing book" in `src/components/Dashboard.jsx`

## CI/CD & Deployment

**Hosting:**
- Not applicable - Frontend only (static SPA)
- Deployment: Vite build output to static hosting (S3, Netlify, Vercel, etc.)

**CI Pipeline:**
- Not detected

## Environment Configuration

**Required env vars:**
- `VITE_API_URL` - Sam Library API base URL (default: `http://localhost:3000`)

**Secrets location:**
- `.env` file (not committed, see `.env.example` template)
- Format: `VITE_API_URL=http://localhost:3000`

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## External CDN Resources

**Tailwind Plus Elements:**
- URL: `https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1`
- Purpose: Pre-built UI components for Tailwind CSS
- Loaded: In `index.html` as `<script>` tag
- Type: Module script

**Images:**
- Tailwind CSS Logo: `https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600`
- Placeholder images: `https://via.placeholder.com/300x450?text=No+Cover`

## API Error Handling

**Current Implementation:**
- Try/catch blocks in axios calls
- Fallback to `err.response?.data?.error` for error messages
- User alerts via `alert()` for errors
- Error states in component state (`setError()` in `src/components/BookDetail.jsx`)

**Status Code Handling:**
- No explicit status code handling detected
- Relies on axios default error behavior

---

*Integration audit: 2026-02-16*
