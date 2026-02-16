# Roadmap: Sadie

**Created:** 2026-02-16
**Depth:** quick (3-5 phases)
**Coverage:** 18/18 v1 requirements mapped

## Overview

Transform Sadie from a functional book library into a calm, minimal reading companion. The roadmap follows a foundation-first approach: establish design tokens and error handling, build a design system with accessible components, add new features (notes, status, search), then refactor existing pages to use the new design system. Each phase delivers working software with visible user value.

## Phases

### Phase 1: Foundation & Design System

**Goal:** Establish technical foundation and design system primitives that enable safe refactoring.

**Dependencies:** None (starting point)

**Requirements:**
- FOUND-01: Design tokens in Tailwind config
- FOUND-02: Error boundaries with calm fallback UI
- FOUND-03: Custom hooks extract API logic
- FOUND-04: Replace non-functional custom elements
- DSGN-01: Calm color palette
- DSGN-02: Readable typography
- DSGN-03: Generous whitespace and soft visuals
- DSGN-04: Gentle transitions with framer-motion

**Success Criteria:**
1. Developer can import design tokens (colors, spacing, typography) from Tailwind config without hardcoding values
2. App catches component errors and displays calm fallback UI instead of white screen
3. Page components use custom hooks (useLibraryBooks, useBookDetail, useAuth) instead of inline API calls
4. All interactive elements are proper React components with working state (no `<el-*>` custom elements)
5. App visuals use calm palette, readable fonts, and gentle transitions throughout existing pages

---

### Phase 2: Library Features

**Goal:** Add personal library management features using design system components.

**Dependencies:** Phase 1 (needs design system atoms/molecules)

**Requirements:**
- LIB-04: User can set book status
- LIB-05: User can filter library with inline search
- LIB-06: User sees warm empty state
- UX-01: Gentle remove confirmation
- UX-02: Duplicate add handling
- A11Y-01: Book cover alt text
- A11Y-02: Focus indicators
- A11Y-03: ARIA labels on interactive elements

**Success Criteria:**
1. User can select "owned / loaned / unread" status from book detail page and see status badge on library cards
2. User can type in search input at top of library and see book list filter instantly by title or author
3. User with empty library sees warm, inviting message instead of blank page
4. User sees "Remove this book from your shelf?" confirmation before removing book
5. User attempting to add duplicate book sees friendly "This book is already on your shelf" message
6. All book covers display descriptive alt text, all buttons show focus rings, all icon buttons have ARIA labels

---

### Phase 3: Loading & Error States

**Goal:** Polish user experience with feedback during data fetching and error handling.

**Dependencies:** Phase 2 (features complete, now adding polish)

**Requirements:**
- UX-03: Loading indicators during data fetching
- UX-04: Friendly error messages with retry

**Success Criteria:**
1. User sees visual loading spinner while library or catalog is fetching from API
2. User sees friendly error message with "Try again" button when API request fails
3. Loading states appear without layout shift (reserved space for content)
4. Error messages fit calm aesthetic (soft colors, helpful copy, no technical jargon)

---

### Phase 4: Codebase Refinement

**Goal:** Refactor all pages to use design system consistently and optimize performance.

**Dependencies:** Phase 3 (all features shipped, now refactoring implementation)

**Requirements:**
- None (this phase is implementation cleanup, not new user-facing requirements)

**Success Criteria:**
1. All page components (Dashboard, BookDetail, PublicCatalog) use design system organisms and molecules consistently
2. No hardcoded Tailwind classes outside design system components (tokens enforced)
3. Component tests pass for all refactored pages
4. Design system components are documented in Storybook or similar (all states visible)
5. Code follows established patterns (presentational vs container, composition over props drilling)

---

## Progress

| Phase | Requirements | Status | Completion |
|-------|--------------|--------|------------|
| 1 - Foundation & Design System | 8 | Pending | 0% |
| 2 - Library Features | 8 | Pending | 0% |
| 3 - Loading & Error States | 2 | Pending | 0% |
| 4 - Codebase Refinement | 0 | Pending | 0% |

**Overall:** 0/18 requirements complete (0%)

---

## Notes

**Why this phase structure:**

- **Phase 1** combines Foundation + Design System because quick depth requires compression. Design tokens must exist before components, and error boundaries must wrap everything. This phase establishes the safe environment for all future work.

- **Phase 2** delivers all new user-facing features (status, search, empty state, confirmations, accessibility). This is the "value" phase where users see concrete improvements. Features are built using design system primitives proven in Phase 1.

- **Phase 3** handles loading/error polish separately because it touches all pages but is lower priority than core features. This phase ensures the app feels responsive and handles failures gracefully.

- **Phase 4** is implementation cleanup without new requirements. Refactoring existing pages to use design system consistently, removing technical debt, and documenting patterns. This phase ships a "clean" codebase ready for future work.

**Coverage validation:**
- All 18 v1 requirements mapped to phases
- No orphaned requirements
- No duplicate mappings
- FOUND requirements in Phase 1 (foundation first)
- DSGN requirements in Phase 1 (design system)
- LIB + A11Y requirements in Phase 2 (features)
- UX requirements split: confirmations in Phase 2, loading/errors in Phase 3
- Phase 4 has no new requirements (refactoring existing functionality)

**Research alignment:**
- Research suggested Phase 0 (Foundation) → Phase 1 (Design System) → Phase 2 (Features) → Phase 3-5 (Visual Refactor)
- Quick depth compressed this into 4 phases
- Foundation + Design System merged into Phase 1 (dependency order preserved)
- New Features remain separate as Phase 2 (additive, low risk)
- Loading/Error polish extracted to Phase 3 (touches all pages)
- Visual Refactor became Phase 4 (implementation cleanup)

---

*Last updated: 2026-02-16 after roadmap creation*
