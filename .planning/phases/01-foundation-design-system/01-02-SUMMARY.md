---
phase: 01-foundation-design-system
plan: 02
subsystem: foundation
tags: [hooks, error-handling, api-client, separation-of-concerns]

dependency_graph:
  requires:
    - samClient (from existing codebase)
  provides:
    - useAuth hook (authentication state management)
    - useLibraryBooks hook (library data fetching and mutations)
    - useBookDetail hook (book detail fetching and mutations)
    - ErrorFallback component (calm error UI)
  affects:
    - Future Plan 03 will wire hooks into Dashboard, BookDetail, Login, App components

tech_stack:
  added:
    - Custom React hooks pattern for API logic extraction
    - Axios request interceptor for centralized auth token handling
  patterns:
    - Hook-based state management for API interactions
    - Optimistic UI updates for remove operations
    - Consistent error handling with success/failure return objects
    - Separation of concerns (hooks for logic, components for presentation)

key_files:
  created:
    - src/hooks/useAuth.js
    - src/hooks/useLibraryBooks.js
    - src/hooks/useBookDetail.js
    - src/components/ErrorFallback.jsx
  modified:
    - src/api/samClient.js (added auth interceptor, removed unused export)

decisions:
  - decision: "Hooks return explicit objects (not arrays)"
    rationale: "Clear destructuring with named properties improves readability and prevents positional errors"
    impact: "Components can selectively destructure only needed properties"

  - decision: "Auth token interceptor in samClient"
    rationale: "Centralize auth header logic instead of duplicating in every API call"
    impact: "Hooks simplified - no manual token handling required"

  - decision: "Hooks created but not wired into components yet"
    rationale: "Allows Plan 01 and 02 to execute in parallel without file conflicts"
    impact: "Plan 03 will handle component integration"

  - decision: "ErrorFallback includes dev-only error details"
    rationale: "Provides debugging information in development while keeping production UI calm"
    impact: "Better developer experience without compromising user experience"

metrics:
  duration: "1m 52s"
  tasks_completed: 2
  files_created: 4
  files_modified: 1
  commits: 2
  lines_added: 215
  completed_date: "2026-02-17"
---

# Phase 01 Plan 02: Custom Hooks & Error Fallback Summary

**One-liner:** Extracted API logic into custom hooks (useAuth, useLibraryBooks, useBookDetail) with centralized auth interceptor and created calm ErrorFallback component with reassuring "Your books are safe" messaging.

## Objective Achieved

Created three custom hooks to extract API logic from page components and a calm error fallback component. Hooks use samClient with auth token interceptor for centralized authentication. ErrorFallback provides reassuring UI per user decision with "Something went wrong. Your books are safe." message and retry button.

## Tasks Completed

### Task 1: Create custom hooks for API logic ✓

**Commit:** `433bf41`

**What was built:**
- Updated `src/api/samClient.js` with auth token request interceptor
- Removed unused `getPublicBooks` export
- Created `useLibraryBooks` hook with books fetching, loading state, error handling, remove mutation, and refetch
- Created `useBookDetail` hook with book detail fetching, add-to-library mutation, and loading states
- Created `useAuth` hook with login, logout, token state, and isAuthenticated flag

**Key implementations:**
- All hooks return explicit objects for clear destructuring
- All API calls go through samClient (no hardcoded URLs)
- Auth interceptor automatically attaches token from localStorage
- Consistent error handling pattern: return `{ success: true }` or `{ success: false, error: string }`
- Optimistic UI update in removeBook (immediate state update before API confirmation)

**Files created:**
- `/Volumes/Workspace/weekend/sadie/src/hooks/useLibraryBooks.js` (47 lines)
- `/Volumes/Workspace/weekend/sadie/src/hooks/useBookDetail.js` (58 lines)
- `/Volumes/Workspace/weekend/sadie/src/hooks/useAuth.js` (40 lines)

**Files modified:**
- `/Volumes/Workspace/weekend/sadie/src/api/samClient.js` (added interceptor, removed export)

### Task 2: Create ErrorFallback component ✓

**Commit:** `a2633e1`

**What was built:**
- ErrorFallback component with calm, reassuring UI
- Open book SVG icon (thematic, no external dependencies)
- "Something went wrong" heading in font-display (Syne Mono)
- "Your books are safe. We hit a snag loading this page." body text
- "Try again" button using resetErrorBoundary prop from react-error-boundary
- Dev-only error details section with collapsible stack trace

**Design token usage:**
- `bg-background` for page background
- `bg-teal-500` and `hover:bg-teal-600` for retry button
- `rounded-card` for soft corners
- `font-display` for heading typography
- `transition-colors duration-200` for gentle interaction

**Files created:**
- `/Volumes/Workspace/weekend/sadie/src/components/ErrorFallback.jsx` (55 lines)

## Verification Results

All success criteria met:

- ✓ Three custom hooks extract all API logic from page components
- ✓ Hooks use samClient with auth interceptor (no hardcoded URLs)
- ✓ Hooks return explicit objects (confirmed via grep for "return {")
- ✓ ErrorFallback displays calm, reassuring error UI with retry
- ✓ All files pass `npm run build` without errors
- ✓ No existing components modified (wiring happens in Plan 03)

**Build output:**
```
✓ 95 modules transformed.
dist/index.html                   0.65 kB │ gzip:  0.38 kB
dist/assets/index-COlZFb-z.css   33.02 kB │ gzip:  6.70 kB
dist/assets/index-DY1cVVWK.js   283.77 kB │ gzip: 91.93 kB
✓ built in 708ms
```

## Deviations from Plan

None - plan executed exactly as written. No bugs discovered, no blocking issues encountered, no architectural decisions required.

## Integration Notes for Plan 03

**Hooks ready for wiring:**
- `useAuth`: Wire into App.jsx (replace token state) and Login.jsx (replace handleSubmit)
- `useLibraryBooks`: Wire into Dashboard.jsx (replace inline fetching and handleRemoveBook)
- `useBookDetail`: Wire into BookDetail.jsx (replace inline fetching and addToLibrary)

**ErrorFallback ready for ErrorBoundary:**
- Import ErrorFallback in App.jsx
- Wrap routes with `<ErrorBoundary FallbackComponent={ErrorFallback}>`
- Install react-error-boundary if not already present

**Auth interceptor behavior:**
- Hooks no longer need to manually fetch token or set Authorization headers
- samClient automatically attaches token to all requests
- Login flow sets token in localStorage; interceptor picks it up on next request

## Requirements Fulfilled

- **FOUND-03:** Custom hooks extract API logic ✓
  - Three hooks created: useAuth, useLibraryBooks, useBookDetail
  - All API logic extracted from components
  - Hooks return explicit objects for clear destructuring

- **FOUND-02:** Error boundaries with calm fallback UI ✓ (partial - component created)
  - ErrorFallback component created with reassuring messaging
  - Calm tone: "Your books are safe. We hit a snag loading this page."
  - Retry functionality via resetErrorBoundary prop
  - Full integration pending Plan 03

## Self-Check: PASSED

**Files created - all exist:**
- ✓ /Volumes/Workspace/weekend/sadie/src/hooks/useAuth.js
- ✓ /Volumes/Workspace/weekend/sadie/src/hooks/useLibraryBooks.js
- ✓ /Volumes/Workspace/weekend/sadie/src/hooks/useBookDetail.js
- ✓ /Volumes/Workspace/weekend/sadie/src/components/ErrorFallback.jsx

**Commits exist:**
- ✓ 433bf41 - feat(01-02): create custom hooks for API logic
- ✓ a2633e1 - feat(01-02): create ErrorFallback component

**Build passes:**
- ✓ No syntax errors
- ✓ All modules transformed successfully
- ✓ Production build generated
