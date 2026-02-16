# Requirements: Sadie

**Defined:** 2026-02-16
**Core Value:** The user can see and manage their owned books in an interface that feels calm, not heavy. "My books are safe here."

## Validated (Existing)

These capabilities already work in the current codebase.

- [x] **AUTH-01**: User can log in with email and password
- [x] **CAT-01**: User can browse public book catalog from DatoCMS
- [x] **CAT-02**: User can view individual book details (cover, title, author, description)
- [x] **LIB-01**: User can add a book to their personal library
- [x] **LIB-02**: User can view their personal library as a grid
- [x] **LIB-03**: User can remove a book from their library

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Design tokens defined in Tailwind config for colors, spacing, and typography
- [ ] **FOUND-02**: Error boundaries catch component errors and display calm fallback UI
- [ ] **FOUND-03**: Custom hooks extract API logic from page components (useLibraryBooks, useBookDetail, useAuth)
- [ ] **FOUND-04**: Non-functional `<el-*>` custom elements replaced with proper React components

### Library Management

- [ ] **LIB-04**: User can set book status (owned / loaned / unread) from book detail page
- [ ] **LIB-05**: User can filter library by title or author with inline search input that filters as they type
- [ ] **LIB-06**: User sees warm, inviting empty state when library has no books

### Visual Design

- [ ] **DSGN-01**: App uses calm color palette (soft neutrals, warm tones) replacing default indigo/red
- [ ] **DSGN-02**: Typography uses readable serif headings and 16px+ sans-serif body text with generous line height
- [ ] **DSGN-03**: Layout uses generous whitespace with soft grid and rounded cover images with soft shadows
- [ ] **DSGN-04**: UI transitions are gentle (200-300ms fades) using framer-motion

### UX Polish

- [ ] **UX-01**: User sees gentle confirmation dialog before removing a book ("Remove this book from your shelf?")
- [ ] **UX-02**: User sees friendly message when attempting to add a book already in library ("This book is already on your shelf")
- [ ] **UX-03**: User sees visual loading indicators during data fetching
- [ ] **UX-04**: User sees friendly error messages with retry option when requests fail

### Accessibility

- [ ] **A11Y-01**: All book cover images have descriptive alt text ("[Title] by [Author] cover")
- [ ] **A11Y-02**: All interactive elements have visible focus indicators
- [ ] **A11Y-03**: Icon-only buttons and dynamic regions have ARIA labels

## v2 Requirements

### Library Management

- **LIB-07**: User can write freeform personal notes on each book

### Accessibility

- **A11Y-04**: UI is fully keyboard-navigable (tab through elements, enter to activate, escape to close)

### Performance

- **PERF-01**: Book cover images are lazy-loaded with native loading="lazy"
- **PERF-02**: Initial library load completes in under 2 seconds
- **PERF-03**: Image placeholders prevent layout shift during loading

## Out of Scope

| Feature | Reason |
|---------|--------|
| Social profiles | Private companion, not a public network |
| Reviews or star ratings | Not a review platform — freeform notes only |
| Reading streaks / challenges | Against calm philosophy — creates pressure |
| Recommendations engine | Too complex, not core to personal library |
| Analytics dashboards | Against minimal philosophy — no metrics |
| Public sharing | Private by design |
| Advanced filtering (genre, year, tags) | Keep search simple — title/author is enough |
| ISBN barcode scanning | Complex interaction, camera permissions, not needed |
| Dark mode | Future direction after real use |
| Multiple shelves / collections | Future direction — single library with status field |
| Loan tracking detail | Future direction — "loaned" status is sufficient |
| Reading dates (started/finished) | Future direction — track in notes if needed |
| Export as zine catalog | Future direction (exciting but not MVP) |
| Offline mode | Future direction |

## Traceability

Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| DSGN-01 | Phase 1 | Pending |
| DSGN-02 | Phase 1 | Pending |
| DSGN-03 | Phase 1 | Pending |
| DSGN-04 | Phase 1 | Pending |
| LIB-04 | Phase 2 | Pending |
| LIB-05 | Phase 2 | Pending |
| LIB-06 | Phase 2 | Pending |
| UX-01 | Phase 2 | Pending |
| UX-02 | Phase 2 | Pending |
| A11Y-01 | Phase 2 | Pending |
| A11Y-02 | Phase 2 | Pending |
| A11Y-03 | Phase 2 | Pending |
| UX-03 | Phase 3 | Pending |
| UX-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0 (100% coverage)

---
*Requirements defined: 2026-02-16*
*Last updated: 2026-02-16 after roadmap creation*
