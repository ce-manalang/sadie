# Feature Research

**Domain:** Personal Book Library / Reading Journal App
**Researched:** 2026-02-16
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Add/remove books from library | Core function — managing a collection is the baseline | LOW | Already implemented in Sadie |
| View personal library | Users need to see what they own | LOW | Already implemented in Sadie |
| Basic search/filter | Users expect to find books in their collection quickly | MEDIUM | Active scope — inline search filter planned |
| Book cover images | Visual recognition is faster than text scanning | LOW | DatoCMS provides covers; lazy loading planned |
| Book metadata (title, author) | Standard bibliographic info users expect to see | LOW | Already provided via DatoCMS/Rails |
| Personal notes per book | Journaling is table stakes for this category — users want to record thoughts | MEDIUM | Active scope — freeform textarea planned |
| Status tracking (owned/reading/unread) | Users need to know where books are in their reading journey | MEDIUM | Active scope — status dropdown planned |
| Mobile-responsive design | Personal library apps are checked on-the-go | MEDIUM | Tailwind CSS provides responsive utilities |
| Empty state messaging | Users arriving to blank library need guidance | LOW | Active scope — warm inviting message planned |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Zero social features | Goodreads users complain about social pressure, judgment, and competitive anxiety — Sadie is calm and private | LOW | Out of scope by design — aligns with core value |
| No gamification | Reading streaks and challenges distract from actual reading and create demotivation after streak loss | LOW | Out of scope by design — aligns with calm philosophy |
| Calm visual design | Users seek "minimal, clean, quiet, calming" alternatives to busy social platforms | MEDIUM | Active scope — full visual redesign planned |
| Physical-book-first | Focus on books you OWN, not wishlist inflation — makes library feel grounded and real | LOW | Design philosophy — catalog from DatoCMS represents physical inventory |
| Privacy by default | No tracking, no analytics dashboards, no public profiles — "100% private, forever yours" | LOW | Out of scope by design — no social profiles, no public sharing |
| Freeform notes (not structured reviews) | Reading journal format vs review platform — personal reflection, not performance | LOW | Active scope — textarea, not rating system |
| Gentle confirmations | "Remove this book from your shelf?" instead of instant destructive actions | LOW | Active scope — gentle remove confirmation planned |
| Accessibility-first | Keyboard navigation, alt text, readable fonts — respects all users | MEDIUM | Active scope — keyboard-navigable UI planned |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Reading challenge with public goals | Goodreads popularized this; users feel obligated to participate | Creates social pressure, fear of judgment, anxiety when goals aren't met — users report lying about reading habits to match others | Let users track organically without numerical targets or public display |
| Social feed / friend activity | Users want to share book discoveries | Creates competitive feelings, algorithm-recommended bloat in "to-read" lists, fear of being judged for reading "simple" books | Keep Sadie private; users can share externally if desired |
| Star ratings visible to others | Common in book apps; seems useful for recommendations | Authors are on platforms seeing ratings; users moderate opinions for invisible audience; ratings affect livelihoods and create guilt | Private notes only — no public-facing ratings |
| Advanced filtering (genre, year, tags) | Power users want complex queries | Adds UI complexity, creates decision fatigue, works against "calm" philosophy | Simple inline search by title/author — sufficient for personal collections (typically < 200 books) |
| Reading analytics dashboard | Users think they want to see "books per month" graphs | Creates performance pressure, turns reading into metrics — opposite of reflective journaling | No visualizations; focus on qualitative notes instead |
| ISBN barcode scanning | Common in library cataloging apps | Adds camera permissions, mobile-only feature, assumes books have barcodes (many older books don't) | Browse DatoCMS catalog and add — simpler interaction model |
| Multiple shelves/collections | Users want to categorize (TBR, favorites, etc.) | Increases cognitive load, creates maintenance burden, adds complexity to UI | Single library with status field (owned/loaned/unread) — simpler mental model for MVP |
| Loan tracking (who borrowed what, when) | Users want to remember who has their books | Feature creep — requires contact management, reminders, due dates — becomes task manager | Out of scope for MVP; status "loaned" is sufficient placeholder |
| Export to PDF/spreadsheet | Users fear vendor lock-in | Implies data portability concerns; adds maintenance burden for export formats | Future consideration after real use validates need |

## Feature Dependencies

```
Book Management (core)
    └──requires──> Authentication (already implemented)
    └──requires──> Book catalog (DatoCMS via Rails API)

Personal Notes
    └──requires──> Book in user's library
    └──enhances──> Book detail page

Status Tracking
    └──requires──> Book in user's library
    └──enhances──> Library view (visual indication)

Search/Filter
    └──requires──> User's library data
    └──enhances──> Library view usability (especially > 20 books)

Visual Redesign
    └──affects──> All components
    └──enables──> Calm, reflective experience (core value)
```

### Dependency Notes

- **Notes require book in library:** Can't add notes to catalog books — only after adding to personal shelf
- **Status enhances library view:** Visual badges/indicators help users quickly scan their collection
- **Search becomes valuable at scale:** Small libraries (< 20 books) may not need search; critical after 50+ books
- **Visual redesign is foundational:** Can't deliver "calm" experience without redesigning existing generic Tailwind UI

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [x] Authentication (email/password) — already implemented
- [x] Browse public catalog — already implemented via DatoCMS/Rails
- [x] Add/remove books from personal library — already implemented
- [x] View personal library — already implemented (Dashboard.jsx)
- [ ] Personal notes per book — freeform textarea for reflection
- [ ] Status tracking — dropdown (owned/loaned/unread) per book
- [ ] Inline search filter — title/author search in library view
- [ ] Calm visual redesign — soft palette, readable typography, gentle spacing
- [ ] Empty state for new users — warm, inviting message
- [ ] Gentle confirmations — "Remove this book?" before destructive actions
- [ ] Duplicate add prevention — "Already on your shelf" message
- [ ] Keyboard navigation — accessible interaction patterns
- [ ] Alt text on covers — screen reader support

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] Edit notes/status from library view (in-place editing) — trigger: users request inline editing
- [ ] Reading dates (started/finished) — trigger: users track reading chronology in notes
- [ ] Lazy-loaded cover images with placeholders — trigger: library load times > 2 seconds
- [ ] Sort options (by title, author, date added) — trigger: users with 100+ books request ordering
- [ ] Keyboard shortcuts (? for help, / for search) — trigger: power users emerge

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] Multiple shelves/collections — trigger: significant user request for categorization
- [ ] Loan tracking with contact names — trigger: users consistently use "loaned" status
- [ ] Export as zine/PDF catalog — trigger: users request data portability
- [ ] Offline mode — trigger: users report connectivity issues
- [ ] Dark mode — trigger: accessibility/preference requests
- [ ] Tags (custom labels) — trigger: status field proves insufficient
- [ ] Book recommendations — trigger: never (against calm philosophy)

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Personal notes | HIGH | MEDIUM | P1 |
| Status tracking | HIGH | MEDIUM | P1 |
| Inline search filter | HIGH | MEDIUM | P1 |
| Calm visual redesign | HIGH | HIGH | P1 |
| Gentle confirmations | MEDIUM | LOW | P1 |
| Duplicate add prevention | MEDIUM | LOW | P1 |
| Empty state message | MEDIUM | LOW | P1 |
| Keyboard navigation | HIGH | MEDIUM | P1 |
| Alt text on covers | HIGH | LOW | P1 |
| Lazy-loaded images | MEDIUM | LOW | P2 |
| In-place editing (library view) | MEDIUM | MEDIUM | P2 |
| Reading dates | MEDIUM | LOW | P2 |
| Sort options | LOW | MEDIUM | P2 |
| Keyboard shortcuts | LOW | LOW | P2 |
| Loan tracking detail | LOW | HIGH | P3 |
| Multiple shelves | MEDIUM | HIGH | P3 |
| Export to PDF/zine | LOW | HIGH | P3 |
| Offline mode | LOW | HIGH | P3 |
| Dark mode | MEDIUM | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch — core experience incomplete without it
- P2: Should have, add when possible — improves usability after validation
- P3: Nice to have, future consideration — requires product-market fit first

## Competitor Feature Analysis

| Feature | Goodreads | StoryGraph | Libib | BookTrack | Sadie's Approach |
|---------|-----------|------------|-------|-----------|------------------|
| Social features | Heavy emphasis | Optional, minimal | None | None | **None** — private by design |
| Ratings/reviews | Public, visible to authors | Public, mood-based | None | Private ratings | **None** — freeform notes only |
| Reading challenges | Public goals, leaderboards | Personal, private | None | Personal goals | **None** — no gamification |
| Status tracking | Want to read, reading, read | TBR, reading, read, DNF | Owned, wishlist | Reading, read, unread | **Owned, loaned, unread** — physical-book-first |
| Notes per book | Public reviews | Private notes available | Private notes + tags | Private notes | **Private notes** — freeform textarea |
| Search/filter | Advanced (genre, year, rating) | Advanced (mood, pace, genre) | Tags + search | Title/author | **Inline title/author** — simple and fast |
| Analytics | Reading stats, annual summaries | Detailed mood/genre graphs | None | Reading streaks, goals | **None** — against calm philosophy |
| Barcode scanning | No | No | Yes (ISBN scanner) | Yes (barcode scanner) | **No** — browse catalog instead |
| Visual design | Dated, cluttered | Minimal, clean | Utilitarian | Modern, gamified | **Calm, soft, reflective** — core differentiator |

## Implementation Notes

### Notes Feature
- **Textarea with generous height** — not single line input; encourages reflection
- **Save on blur or explicit Save button** — consider auto-save to prevent data loss
- **Character limit:** Consider 5000 chars (allows ~800 words) — prevents abuse, still generous
- **Markdown support:** Future consideration; plain text sufficient for MVP

### Status Tracking
- **Dropdown vs radio buttons:** Dropdown saves vertical space on book detail page
- **Default value:** "owned" when adding book; user can change immediately
- **Visual indicators:** Badge or icon in library view showing status at a glance
- **Status options rationale:**
  - "owned" = on my shelf, haven't read yet (or might have read previously, just tracking ownership)
  - "loaned" = lent to someone, not currently accessible
  - "unread" = explicitly haven't read yet (vs "owned" which is ambiguous)
  - Skip "reading" status — creates pressure to finish; users can note in freeform field if desired

### Search/Filter
- **Client-side only:** User libraries typically < 200 books; no server query needed
- **Debounced input:** 300ms delay before filtering to avoid excessive re-renders
- **Search scope:** Title and author (primary metadata users remember)
- **Case-insensitive:** Matches user expectation
- **No exact match required:** Substring matching (e.g., "atwood" finds "Margaret Atwood")
- **Visible as you type:** Instant feedback; no separate search button
- **Clear button:** Easy reset to full library view

### Visual Redesign Principles
Based on research into calm, minimal book apps:
- **Color palette:** Soft, warm neutrals (beige, cream, soft grays) — avoid harsh whites or bright colors
- **Typography:** Readable serif for headings, sans-serif for body — minimum 16px body text
- **Spacing:** Generous whitespace (1.5-2x current Tailwind defaults) — avoid crowding
- **Transitions:** Gentle fades (200-300ms) — no jarring instant changes
- **Interaction states:** Subtle hover effects, no aggressive transforms
- **Cover images:** Rounded corners (8px), soft shadows — avoid harsh edges
- **Button style:** Minimal borders, subtle background changes on hover — no loud call-to-action styling
- **Form inputs:** Relaxed borders, focus states with soft color shifts — no intense blues

## Usability Considerations

### For Small Libraries (< 20 books)
- Search may feel unnecessary — ensure it doesn't dominate UI
- Empty state is critical — first-time user experience
- Visual browsing is primary mode — cover images must be prominent

### For Growing Libraries (20-100 books)
- Search becomes valuable — inline filter is essential
- Status indicators help scanning — badges/icons reduce cognitive load
- Notes help recall — users start forgetting why they added books

### For Large Libraries (100+ books)
- Sort options become necessary — alphabetical by title/author
- Search is critical — primary navigation method
- Status filtering may be requested — "show only unread"

## Edge Cases to Handle

- **Book already in library:** Show friendly message "This book is already on your shelf" — prevent duplicates
- **Empty search results:** "No books found matching '[query]'" with clear button
- **Missing cover image:** Placeholder with book title — graceful degradation
- **Very long book titles:** Truncate with ellipsis at ~60 characters in list view
- **No notes yet:** Empty textarea with placeholder "Your thoughts on this book..."
- **Very long notes:** Scrollable textarea; consider showing first 200 chars in collapsed state on book detail
- **Removing last book:** Empty state appears — should feel welcoming, not punishing
- **Network error fetching catalog:** Friendly error message with retry button

## Accessibility Requirements

- **Keyboard navigation:**
  - Tab through interactive elements (books, buttons, inputs)
  - Enter to activate buttons/links
  - Escape to close modals/confirmations
  - / to focus search input (common pattern)

- **Screen readers:**
  - Alt text on all book covers: "[Book Title] by [Author] cover"
  - ARIA labels on icon-only buttons ("Remove book", "Edit notes")
  - Form labels associated with inputs (status dropdown, notes textarea)
  - Live regions for dynamic updates (search results count, success messages)

- **Visual accessibility:**
  - Minimum 4.5:1 contrast ratio for body text
  - Minimum 3:1 for large text (18px+)
  - Focus indicators visible on all interactive elements
  - No color-only status indicators (use icons + text)
  - Font size minimum 16px for body text

## Performance Targets

- **Initial catalog load:** < 2 seconds (DatoCMS query via Rails API)
- **Library view render:** < 500ms (client-side React rendering)
- **Search filter response:** < 100ms (client-side array filtering, debounced)
- **Add/remove book:** < 1 second (Rails API round-trip + optimistic UI update)
- **Notes save:** < 1 second (Rails API round-trip + auto-save feedback)
- **Image loading:** Progressive with lazy loading; placeholders prevent layout shift

## Mobile Considerations

- **Touch targets:** Minimum 44x44px (iOS guidelines) for all interactive elements
- **Responsive breakpoints:**
  - Mobile: < 640px (single column, larger touch targets)
  - Tablet: 640-1024px (2 column grid for library)
  - Desktop: > 1024px (3-4 column grid, sidebar possible)
- **Gesture support:** Swipe gestures NOT recommended — conflicts with browser navigation
- **Input focus:** On mobile, focusing search input should scroll to top — prevent keyboard overlap
- **Modal confirmations:** Full-screen on mobile to prevent accidental dismissal

## Sources

**Book Tracking Apps Research:**
- [Best Book Catalogue Apps in 2025 for Your Personal Library](https://tidymalism.com/best-book-catalogue-apps/)
- [7 Best Home Library Apps in 2026](https://fixthephoto.com/best-home-library-app.html)
- [How to Track Your Reading in 2026](https://yourbookfriend.com/2025/11/26/how-to-track-your-reading-in-2026-goodreads-alternatives-and-comparisons/)
- [5 Best Book Tracking Apps Readers Actually Love (2026)](https://bibliolifestyle.com/best-book-tracking-apps-for-readers/)

**Reading Journal Features:**
- [10 Best Reading Tracking Apps and Journals](https://allthingsbookishbooks.wordpress.com/2025/04/05/10-best-reading-tracking-apps-and-journals/)
- [6 Reading Apps to Enhance Your Reading Experience](https://www.cottagenotebook.ie/6-reading-journal-apps-to-enhance-your-reading-experience/)

**Calm Alternatives to Goodreads:**
- [There is still the need for a better Goodreads alternative](https://www.creativerly.com/there-is-still-the-need-for-a-better-goodreads-alternative/)
- [9 Goodreads Alternatives: Find the Perfect Book Platform](https://makeheadway.com/blog/goodreads-alternatives/)
- [21 Best Goodreads Alternatives for Ethical Book Tracking](https://www.goodgoodgood.co/articles/goodreads-alternatives)

**Goodreads User Complaints (Social Pressure):**
- [Almost Everything About Goodreads Is Broken](https://onezero.medium.com/almost-everything-about-goodreads-is-broken-662e424244d5)
- [Why my Goodreads Reading Challenge gives me mild anxiety](https://radiomike.substack.com/p/why-my-goodreads-reading-challenge)
- [What's Bad About Goodreads and How a PM Would Fix It](https://medium.com/@theabhishekpatra/whats-bad-about-goodreads-and-how-a-pm-noob-would-fix-it-378ede769df6)

**Gamification Concerns:**
- [How to Gamify Your Reading App: 10 Gamification Mechanics](https://fgfactory.com/10-gamification-mechanics-to-supercharge-your-reading-app)
- [The Gamification of Reading, And Why It Makes You Lie About Your Reading Habits](https://baos.pub/the-gamification-of-reading-and-why-it-makes-you-lie-about-your-reading-habits-a9f4b7443ab2)

**Book Status & Loan Tracking:**
- [How to track Borrowed and Loaned Out books - Book Tracker](https://booktrack.app/tutorial/how-to-track-borrowed-and-loaned-out-books/)
- [Book Tracker: Private Book Catalog & Reading Tracker App](https://booktrack.app/)

**Privacy & Calm Design:**
- [Does Your Product Respect Users' Time & Attention? A Calm Technology Checklist](https://caseorganic.medium.com/does-your-product-respect-users-time-attention-a-calm-technology-checklist-7bf34ad41449)
- [Bookmory reading tracker](https://play.google.com/store/apps/details?id=net.tonysoft.bookmory&hl=en_US) (calm, private, feels like a reading journal)

**Library Search & Filter Best Practices:**
- [Filters - Search Strategies - LibGuides at Hofstra University](https://libguides.hofstra.edu/Search_Strategies/Filters)
- [Filtering, limiting, and sorting: Managing large search results lists](https://library.cumc.columbia.edu/insight/filter-limit-sort-search-results)

**Notes & Highlights Implementation:**
- [Book Highlights Manager | Screvi](https://screvi.com/)
- [Highlight and add notes in Books on Mac - Apple Support](https://support.apple.com/guide/books/highlight-book-passages-and-add-notes-ibks3975f128/mac)

---
*Feature research for: Personal Book Library / Reading Journal Apps*
*Researched: 2026-02-16*
