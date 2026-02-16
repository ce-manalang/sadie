# Codebase Concerns

**Analysis Date:** 2026-02-16

## Tech Debt

**Hardcoded API URLs scattered across components:**
- Issue: Multiple API endpoint URLs hardcoded directly in component files instead of centralized configuration
- Files: `src/components/BookDetail.jsx`, `src/components/Dashboard.jsx`, `src/components/PublicCatalog.jsx`, `src/components/Login.jsx`
- Impact: Changing API URLs requires edits in multiple files; inconsistent approach (some use env vars, some don't); difficult to manage across environments
- Fix approach: Create a centralized API configuration module (`src/api/config.js` or similar) that all components import from. Consolidate the partially-working `src/api/samClient.js` and use it consistently across all components

**API client library unused:**
- Issue: `src/api/samClient.js` is created but not used anywhere in the application
- Files: `src/api/samClient.js` (unused), all API calls made with raw `axios` calls in components
- Impact: Duplicate code for axios instantiation and configuration; lost opportunity for centralized interceptors, error handling, and request/response transformation
- Fix approach: Refactor all components to use the samClient instance instead of raw axios; add request/response interceptors for auth token injection

**Token management mixed with component state:**
- Issue: Authentication token stored in localStorage, managed via component state, and accessed directly in multiple components without validation
- Files: `src/App.jsx` (lines 147, 12-14), `src/components/BookDetail.jsx` (lines 15, 34), `src/components/Dashboard.jsx` (lines 11, 37), `src/components/Login.jsx` (line 20)
- Impact: No centralized auth context; token lifecycle not properly managed; no token expiration/refresh logic; hard to implement logout across all components; susceptible to XSS attacks if token is not httpOnly
- Fix approach: Implement React Context for authentication state; create custom hooks for token access; consider adding auth interceptor to axios for automatic token injection; validate token on app load

## Known Bugs

**Responsive design components using unsupported element attributes:**
- Issue: Components use custom element attributes like `command="toggle"`, `command="close"`, `commandfor="mobile-menu"` that don't exist in standard HTML or React
- Files: `src/App.jsx` (lines 26, 71, 184), `src/components/BookDetail.jsx` (lines 184, 196)
- Impact: Mobile menu and disclosure components likely non-functional; custom attributes are ignored by browsers; UI interactions may fail silently
- Fix approach: Replace custom `command` attributes with standard React state handlers or use a UI component library that properly implements these patterns; implement proper disclosure/dialog logic with React hooks

**Orphaned UI components using non-existent custom elements:**
- Issue: Code uses custom elements like `<el-tab-group>`, `<el-tab-list>`, `<el-tab-panels>`, `<el-disclosure>`, `<el-dialog>`, `<el-dialog-backdrop>`, `<el-dialog-panel>` that are not defined
- Files: `src/App.jsx` (lines 20-64), `src/components/BookDetail.jsx` (lines 90-109, 196)
- Impact: These components render but provide no functionality; mobile menu is likely broken; disclosure elements don't toggle; dialogs are non-functional
- Fix approach: Either install and properly implement a web component library (headlessui, radix-ui, etc.) or replace with standard HTML/React implementations

**Error handling doesn't inform users of specific failures:**
- Issue: Generic error messages ("Login failed", "Failed to add to library", "Failed to remove book") don't show actual error details
- Files: `src/components/Login.jsx` (line 25), `src/components/BookDetail.jsx` (lines 56-57), `src/components/Dashboard.jsx` (lines 49-50)
- Impact: Users have no idea why actions failed; hard to debug issues; poor user experience
- Fix approach: Log full error details to console for debugging; show user-friendly messages with specific problems (network error, validation error, server error); use error boundary or toast notifications

**Hardcoded placeholder image fallback without error handling:**
- Issue: Uses a remote placeholder.com URL for book covers without fallback mechanism or error handling for broken images
- Files: `src/components/BookDetail.jsx` (lines 97, 106), `src/components/Dashboard.jsx` (line 76), `src/components/PublicCatalog.jsx` (line 44)
- Impact: If cover image fails to load, displays another external image which could also fail; relies on external service availability
- Fix approach: Use a local placeholder image or SVG; add `onError` handler to fallback to local placeholder; implement image caching strategy

## Security Considerations

**Plain localStorage storage of authentication token:**
- Risk: Tokens stored in localStorage are vulnerable to XSS attacks; not protected by httpOnly flag; persisted to browser history/diagnostics
- Files: `src/components/Login.jsx` (line 20), `src/App.jsx` (lines 12, 147), all components accessing token
- Current mitigation: None detected
- Recommendations: (1) If using JWT, implement automatic expiration/refresh token rotation, (2) Consider storing in sessionStorage instead (cleared on browser close), (3) Implement Content Security Policy headers, (4) Add input validation/sanitization, (5) Use httpOnly cookies if backend supports it, (6) Add token expiration check before API calls

**No input validation on login form:**
- Risk: Email and password fields accept any input; no validation before sending to backend; no protection against injection attacks
- Files: `src/components/Login.jsx` (lines 6, 31-32)
- Current mitigation: None (only backend validation assumed)
- Recommendations: Add client-side validation for email format and password strength; sanitize inputs; display validation errors to user

**API calls made without HTTPS verification:**
- Risk: Hardcoded `http://localhost:3000` URLs; in production, these would be insecure; no SSL/TLS enforcement
- Files: `src/components/BookDetail.jsx` (lines 19, 42, 51), `src/components/Dashboard.jsx` (lines 14, 40), `src/components/PublicCatalog.jsx` (line 5), `src/components/Login.jsx` (line 13)
- Current mitigation: Only affects development environment (localhost)
- Recommendations: Use environment variables with https URLs for production; enforce HTTPS in build configuration; add security headers

**No CORS headers configuration:**
- Risk: Cross-origin requests from frontend to backend could be blocked or exploited
- Files: All axios calls in components
- Current mitigation: Backend presumably configured with CORS
- Recommendations: Document CORS requirements; add CORS configuration verification to deployment checklist

## Performance Bottlenecks

**Book list components fetch data on every mount without caching:**
- Problem: Each route navigation to `PublicCatalog` and `Dashboard` triggers full data refetch; no memoization or caching strategy
- Files: `src/components/PublicCatalog.jsx` (lines 11-21), `src/components/Dashboard.jsx` (lines 9-28)
- Cause: Empty dependency arrays force fetch on mount every time; no React Query or SWR for data caching
- Improvement path: Implement caching strategy (React Query, SWR, Redux); add memoization to prevent unnecessary re-fetches; consider infinite scroll/pagination for large book lists

**No image optimization or lazy loading:**
- Problem: All book cover images loaded eagerly regardless of viewport visibility
- Files: `src/components/BookDetail.jsx` (line 97, 106), `src/components/Dashboard.jsx` (line 76), `src/components/PublicCatalog.jsx` (lines 43-46)
- Cause: Images not wrapped in lazy loading; no srcset for responsive images; external placeholder service adds latency
- Improvement path: Implement lazy loading with Intersection Observer; add image compression/format optimization; use next/image or similar; implement responsive image sizes

**Large component files lack code splitting:**
- Problem: `BookDetail.jsx` (217 lines), `App.jsx` (155 lines), `Dashboard.jsx` (129 lines) are not code-split or lazy loaded
- Files: All major components in `src/components/`
- Cause: React Router configured with static imports; no lazy/Suspense pattern for route-based code splitting
- Improvement path: Use React.lazy() for route components; implement Suspense boundaries; measure bundle impact; implement route-based code splitting

## Fragile Areas

**BookDetail component tightly couples UI rendering with API calls:**
- Files: `src/components/BookDetail.jsx`
- Why fragile: Component handles loading state, error state, data fetching, and rendering all in one place; multiple state variables managing the same concern; complex useEffect logic with multiple data fetch operations; token handling mixed with business logic
- Safe modification: Extract data fetching into custom hook (`useBookDetail`); separate loading/error states into context; create separate component for form submission; use AbortController for cleanup on unmount
- Test coverage: No test files exist; critical functions untested

**App.jsx mixes routing, authentication, and UI layout:**
- Files: `src/App.jsx`
- Why fragile: Routes defined in AppContent with logic, token state passed through context, logout logic embedded in navigation; mobile menu uses non-functional custom elements; changing routing structure requires careful refactoring of token passing
- Safe modification: Extract routing configuration to separate file; create ProtectedRoute wrapper component; lift auth state to dedicated context provider; remove custom element dependencies
- Test coverage: No test files exist; router logic untested

**Dashboard remove button uses window.confirm with immediate state update:**
- Files: `src/components/Dashboard.jsx` (lines 30-52)
- Why fragile: Optimistic UI update without error recovery; if API call fails, UI already changed; no transaction-like behavior; window.confirm blocks entire thread
- Safe modification: Implement proper optimistic update with rollback on error; use modal dialog instead of window.confirm; add loading state to button during deletion
- Test coverage: No test files exist; deletion logic untested

**Login component stores raw token without validation:**
- Files: `src/components/Login.jsx` (lines 5-27)
- Why fragile: Extracts token from response.headers.authorization without checking if it exists; no error handling for missing token; assumes backend always returns token in specific header
- Safe modification: Add null/undefined checks; validate token format (if JWT, check structure); handle different response formats; add explicit error states
- Test coverage: No test files exist; auth logic untested

## Scaling Limits

**No pagination or filtering in book lists:**
- Current capacity: Assumes all books load at once
- Limit: Will break UI performance with >100 books; entire list rendered to DOM; no virtual scrolling
- Scaling path: Implement pagination or infinite scroll; add search/filter capability; implement virtual list component for large datasets; use React Window or similar

**localStorage has ~5-10MB limit per domain:**
- Current capacity: Only storing one token, negligible space
- Limit: If expanding to cache book data, could exceed storage limits
- Scaling path: Implement IndexedDB for larger data; use session-based caching strategy; add storage quota management

**Single API endpoint for all data:**
- Current capacity: Works for current book count
- Limit: No API rate limiting or request batching visible; sequential API calls in components
- Scaling path: Implement request batching/debouncing; add pagination to endpoints; consider GraphQL for efficient data fetching; implement caching headers

## Dependencies at Risk

**React Router v7 with potential breaking changes:**
- Risk: Router requires `<Router>` wrapper and works with static imports; no lazy route loading implemented; upgrade to newer versions may break routing structure
- Impact: What breaks: Route-based code splitting becomes difficult; dynamic routing patterns fail
- Migration plan: Add React.lazy() wrapping to all route components; implement Suspense boundaries; verify upgrade path to React Router v8+

**axios without interceptor framework:**
- Risk: Raw axios calls scattered throughout codebase; no consistent error handling or request/response transformation; token injection happens manually in each call
- Impact: What breaks: If axios version changes response format or configuration API; difficult to add global error handling
- Migration plan: Create axios instance wrapper with interceptors; centralize request/response handling; consider alternatives like fetch API with custom wrapper

## Missing Critical Features

**No authentication state persistence across page refresh:**
- Problem: Token retrieved from localStorage once at App mount, but no verification it's still valid; no refresh token mechanism
- Blocks: Users can't reliably stay logged in; token expiration not handled; sessions vulnerable to token hijacking
- Workaround: None; app breaks on token expiration

**No error boundary for graceful error handling:**
- Problem: If any component throws error, entire app crashes
- Blocks: Debugging difficult; users see blank screens instead of helpful error messages
- Workaround: None; requires full page reload

**No loading states or skeletons for better UX:**
- Problem: Large loading spinners while data fetches; jumpy layout
- Blocks: Poor perceived performance; confusing user experience during network latency
- Workaround: None; users must wait for full content load

**No form validation feedback:**
- Problem: Login form has no error display for invalid inputs
- Blocks: Users don't know why login failed; poor accessibility
- Workaround: Check browser console for errors

**No book search or filtering capability:**
- Problem: All books displayed in single scrolling list
- Blocks: Difficult to find specific books; doesn't scale past ~50-100 books
- Workaround: Browser find-in-page (Ctrl+F) - minimal help

## Test Coverage Gaps

**No tests for API communication:**
- What's not tested: BookDetail data fetching, Dashboard library loading, Login token handling
- Files: All components making axios calls
- Risk: API integration breaks silently; changed API contracts cause runtime failures
- Priority: High

**No tests for authentication flow:**
- What's not tested: Login success/failure, token storage, logout, unauthorized redirect
- Files: `src/components/Login.jsx`, `src/App.jsx` (logout logic)
- Risk: Auth changes break user flows with no detection
- Priority: High

**No tests for UI interactions:**
- What's not tested: Button clicks, form submissions, navigation, book removal confirmation
- Files: All components with interactive elements
- Risk: User-facing features break without detection
- Priority: Medium

**No tests for error states:**
- What's not tested: API error handling, network failures, missing data
- Files: All components with try/catch blocks
- Risk: Error paths never executed in testing; users see broken UI
- Priority: High

**No component integration tests:**
- What's not tested: Multi-component flows (login → dashboard → book detail)
- Files: All components together
- Risk: Component interactions break silently
- Priority: Medium

---

*Concerns audit: 2026-02-16*
