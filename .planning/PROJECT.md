# Sadie

## What This Is

A quiet, personal web interface for managing the books you physically own. Sadie lets you browse a catalog, add books to your shelf, and keep small private notes about them. It's a reading journal — not a social network. Calm, minimal, reflective.

## Core Value

The user can see and manage their owned books in an interface that feels calm, not heavy. "My books are safe here."

## Requirements

### Validated

<!-- Shipped and confirmed valuable. Inferred from existing codebase. -->

- ✓ User can log in with email/password — existing (Login.jsx)
- ✓ User can browse public book catalog from DatoCMS — existing (PublicCatalog.jsx)
- ✓ User can view individual book details — existing (BookDetail.jsx)
- ✓ User can add a book to their personal library — existing (BookDetail.jsx)
- ✓ User can view their personal library — existing (Dashboard.jsx)
- ✓ User can remove a book from their library — existing (Dashboard.jsx)

### Active

<!-- Current scope. Building toward these. -->

- [ ] Full visual redesign — calm palette, soft spacing, readable typography, gentle transitions
- [ ] Personal notes field on each book (freeform textarea)
- [ ] Book status dropdown (owned / loaned / unread) per book
- [ ] Edit notes and status from book detail page
- [ ] Inline search filter on library view (title/author, filters as you type)
- [ ] Gentle remove confirmation ("Remove this book from your shelf?")
- [ ] Duplicate add handling ("This book is already on your shelf.")
- [ ] Empty state for library (warm, inviting message)
- [ ] Lazy-loaded cover images
- [ ] Keyboard-navigable UI and alt text for covers
- [ ] Refactored components — reshape existing code around new design

### Out of Scope

<!-- Explicit boundaries. -->

- Social profiles — private companion, not a public network
- Reviews or ratings — not a review platform
- Reading streaks / gamification — against the calm philosophy
- Recommendations engine — too complex, not core
- Analytics dashboards — against minimal philosophy
- Public sharing — private by design
- Filters / tags UI / sorting controls — keep search simple for MVP
- Loan tracking — future direction after real use
- Reading dates — future direction
- Multiple shelves — future direction
- Offline mode — future direction
- Export as zine catalog — future direction (but exciting)

## Context

**Existing codebase:** React 19 + Vite + Tailwind CSS + React Router + axios. Connects to Sam Library API (Rails backend with Devise-JWT auth). Current UI is functional but generic — standard Tailwind indigo/red, not aligned with Sadie's calm personality.

**Backend (Sam API):** Already provides endpoints for authentication, book catalog (from DatoCMS), and personal library CRUD. Frontend doesn't need to talk to DatoCMS directly — Rails proxies everything.

**Approach:** Refactor existing components rather than rewriting from scratch. Keep working API integration, reshape around the new design vision.

**Codebase map:** See `.planning/codebase/` for detailed analysis of current architecture, conventions, and concerns.

## Constraints

- **Stack**: React + Vite + Tailwind CSS — keep existing stack, no framework changes
- **Backend**: Sam Library API is the sole data source — no direct DatoCMS access from frontend
- **Auth**: JWT via Devise — existing token flow in localStorage
- **Performance**: Initial library load < 2 seconds, navigation feels instant
- **Accessibility**: Readable font sizes, keyboard navigation, alt text on covers

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Refactor existing components vs clean rewrite | Working API integration exists; faster to reshape than rebuild | — Pending |
| Full visual redesign in MVP | The calm feeling IS the product — can't ship without it | — Pending |
| Inline search filter (not separate page) | Keeps interaction minimal; no extra routes | — Pending |
| Notes + status as separate fields | Status dropdown gives structure; notes stay freeform | — Pending |
| Client-side search only | Small personal library; server search unnecessary for MVP | — Pending |

---
*Last updated: 2026-02-16 after initialization*
