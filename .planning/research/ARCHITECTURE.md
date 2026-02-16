# Architecture Research

**Domain:** Personal Book Library React SPA with Calm UI Redesign
**Researched:** 2026-02-16
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ PublicCatalog│  │ Dashboard │  │ BookDetail │            │
│  │  (Public)   │  │ (Auth)    │  │  (Public)  │            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘            │
│        │                │                │                   │
│  ┌─────┴──────────────┬─┴────────────────┴──────┐           │
│  │              Design System Layer              │           │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐    │           │
│  │  │  Atoms   │  │Molecules │  │Organisms │    │           │
│  │  └──────────┘  └──────────┘  └──────────┘    │           │
│  └───────────────────────────────────────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                   Data/Service Layer                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │              samClient (axios instance)              │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                    State Management                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Local State │  │  Auth Context│  │ Shared Hooks │      │
│  │  (useState)  │  │  (optional)  │  │  (custom)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **App.jsx** | Router setup, layout shell (header/footer), auth token management | Root component with Router, manages global auth state |
| **Page Components** | Route handlers, data fetching, page-level state | PublicCatalog, Dashboard, BookDetail, Login |
| **Design System Components** | Reusable UI primitives (atoms/molecules/organisms) | Button, Card, Input, StatusDropdown, SearchFilter, NotesEditor |
| **API Client (samClient)** | Centralized HTTP requests, auth headers, error handling | Axios instance with baseURL and interceptors |
| **Custom Hooks** | Reusable data-fetching and business logic | useBooks, useLibraryBooks, useBookDetail, useAuth |
| **Layout Components** | Structural wrappers (Header, Footer, Container) | Shared navigation and page structure |

## Recommended Project Structure

```
src/
├── components/              # Page-level components
│   ├── PublicCatalog.jsx   # Browse all books
│   ├── Dashboard.jsx       # User's personal library
│   ├── BookDetail.jsx      # Single book view
│   └── Login.jsx           # Authentication
├── design-system/          # Calm UI design system
│   ├── atoms/              # Basic building blocks
│   │   ├── Button.jsx      # Primary, secondary, ghost variants
│   │   ├── Input.jsx       # Text input with minimal styling
│   │   ├── Label.jsx       # Form labels
│   │   ├── Badge.jsx       # Status badges
│   │   └── Spinner.jsx     # Loading indicators
│   ├── molecules/          # Combinations of atoms
│   │   ├── BookCard.jsx    # Book display card
│   │   ├── SearchBar.jsx   # Search input with icon
│   │   ├── StatusDropdown.jsx  # Status selector
│   │   └── NotesEditor.jsx # Rich text for notes
│   ├── organisms/          # Complex UI sections
│   │   ├── BookGrid.jsx    # Grid layout for books
│   │   ├── BookDetailPanel.jsx  # Detail view layout
│   │   └── Header.jsx      # Navigation header
│   └── tokens/             # Design tokens
│       ├── colors.js       # Calm color palette
│       ├── spacing.js      # Spacing scale
│       └── typography.js   # Font definitions
├── hooks/                  # Custom React hooks
│   ├── useBooks.js         # Fetch public catalog
│   ├── useLibraryBooks.js  # Fetch user's library
│   ├── useBookDetail.js    # Fetch single book
│   ├── useAuth.js          # Authentication logic
│   └── useDebounce.js      # Search filter debouncing
├── api/                    # API layer
│   ├── samClient.js        # Axios instance
│   ├── books.js            # Book-related endpoints
│   └── library.js          # Library operations
├── utils/                  # Utility functions
│   ├── formatters.js       # Date, text formatting
│   └── validators.js       # Input validation
├── App.jsx                 # Root component
└── main.jsx                # Entry point
```

### Structure Rationale

- **design-system/:** Isolated design system allows incremental refactoring without breaking existing components. Follows atomic design principles (atoms → molecules → organisms) for systematic component hierarchy.

- **hooks/:** Extract data-fetching logic from components to enable reuse and simplify testing. Keeps components focused on presentation.

- **api/:** Centralized API layer prevents duplicated axios calls across components. samClient provides consistent error handling and auth headers.

- **components/:** Page-level components remain in root for easy discovery. Will be refactored to consume design-system components incrementally.

## Architectural Patterns

### Pattern 1: Custom Hooks for Data Fetching

**What:** Extract all API calls and state management into custom hooks, separating data logic from presentation.

**When to use:** Any component that fetches data or manages complex state. Essential for refactoring existing components without breaking API integration.

**Trade-offs:**
- **Pros:** Testable in isolation, reusable across components, simplifies component logic
- **Cons:** Requires discipline to avoid creating too many single-use hooks

**Example:**
```javascript
// hooks/useLibraryBooks.js
import { useState, useEffect } from 'react';
import { fetchLibraryBooks, removeLibraryBook } from '../api/library';

export function useLibraryBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchLibraryBooks();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  const removeBook = async (bookId) => {
    await removeLibraryBook(bookId);
    setBooks(prev => prev.filter(b => b.id !== bookId));
  };

  return { books, loading, error, removeBook };
}

// components/Dashboard.jsx (refactored)
function Dashboard() {
  const { books, loading, error, removeBook } = useLibraryBooks();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return <BookGrid books={books} onRemove={removeBook} />;
}
```

### Pattern 2: Composition Over Props Drilling

**What:** Use component composition and React children to pass UI structures instead of drilling props through multiple levels. Prefer composition over Context for UI flexibility.

**When to use:** When building flexible layouts or when intermediate components don't need to know about the data being passed.

**Trade-offs:**
- **Pros:** Eliminates props drilling, makes components more flexible and reusable
- **Cons:** Can be less explicit than props, requires understanding of composition patterns

**Example:**
```javascript
// design-system/organisms/BookGrid.jsx
function BookGrid({ children, emptyState }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
      {!children && emptyState}
    </div>
  );
}

// components/Dashboard.jsx
function Dashboard() {
  const { books } = useLibraryBooks();

  return (
    <BookGrid emptyState={<EmptyLibraryMessage />}>
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          actions={<RemoveButton bookId={book.id} />}
        />
      ))}
    </BookGrid>
  );
}
```

### Pattern 3: Presentational vs Container Pattern (Modified for Hooks)

**What:** Separate components into containers (data/logic) and presentational (UI only). In modern React, containers are often just hooks instead of wrapper components.

**When to use:** When refactoring page components to consume design system. Container logic moves to hooks, presentational moves to design-system components.

**Trade-offs:**
- **Pros:** Clear separation of concerns, testable UI without mocking APIs
- **Cons:** More files to manage, requires disciplined organization

**Example:**
```javascript
// design-system/molecules/BookCard.jsx (Presentational)
export function BookCard({ book, onRemove, onClick }) {
  return (
    <div className="group relative">
      <button onClick={() => onClick(book.id)} className="block w-full">
        <img src={book.cover?.url} alt={book.title} className="aspect-[2/3]" />
        <h3 className="mt-2 text-sm font-medium">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
      </button>
      {onRemove && (
        <Button variant="ghost" onClick={() => onRemove(book.id)}>
          Remove
        </Button>
      )}
    </div>
  );
}

// components/Dashboard.jsx (Container)
function Dashboard() {
  const navigate = useNavigate();
  const { books, loading, removeBook } = useLibraryBooks();

  if (loading) return <Spinner />;

  return (
    <BookGrid>
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          onClick={(id) => navigate(`/books/${id}`)}
          onRemove={removeBook}
        />
      ))}
    </BookGrid>
  );
}
```

### Pattern 4: Incremental Refactoring with Adapter Pattern

**What:** Create adapter components that translate between existing components and new design system components, allowing gradual migration without breaking changes.

**When to use:** During design system refactor to maintain existing API while adopting new patterns incrementally.

**Trade-offs:**
- **Pros:** Safe, gradual migration; existing tests continue to pass
- **Cons:** Temporary code duplication; requires cleanup phase after migration

**Example:**
```javascript
// Existing Dashboard.jsx uses raw JSX and direct axios calls
// Create adapter to gradually adopt design system

// Step 1: Extract hook (no UI changes)
const { books, loading, removeBook } = useLibraryBooks();

// Step 2: Replace loading state with design system component
if (loading) return <Spinner />; // was: <p>Loading...</p>

// Step 3: Replace book cards one section at a time
return (
  <div>
    {/* Old implementation still works */}
    {books.slice(0, 4).map(book => (
      <OldBookCard key={book.id} book={book} />
    ))}

    {/* New design system gradually introduced */}
    {books.slice(4).map(book => (
      <BookCard key={book.id} book={book} onRemove={removeBook} />
    ))}
  </div>
);

// Step 4: Replace all at once when confident
```

### Pattern 5: Local State First, Context When Needed

**What:** Default to local useState in components. Only lift to Context when multiple distant components need the same state. Avoid Context for high-frequency updates.

**When to use:**
- Local state: Component-specific data (form inputs, toggles, temporary UI state)
- Context: Theme, auth user, locale, or infrequently-changing global state

**Trade-offs:**
- **Pros:** Simpler to reason about, fewer re-renders, easier debugging
- **Cons:** May need refactoring if state needs expand

**Example:**
```javascript
// GOOD: Local state for search filter (high-frequency changes)
function PublicCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const { books } = useBooks();

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <BookGrid books={filtered} />
    </>
  );
}

// GOOD: Context for auth (low-frequency changes)
const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Routes />
    </AuthContext.Provider>
  );
}
```

## Data Flow

### Request Flow

```
[User Action]
    ↓
[Page Component] → [Custom Hook] → [API Module] → [samClient] → [Backend]
    ↓                   ↓                                            ↓
[Design System] ← [State Update] ← [Response Transform] ← [JSON Response]
  Component
```

### Detailed Flow Example: Adding Book to Library

```
1. User clicks "Add to Library" button
   ↓
2. BookDetail component calls addToLibrary()
   ↓
3. Custom hook useBookDetail triggers API call
   ↓
4. api/library.js → addLibraryBook(bookId)
   ↓
5. samClient.post('/library_books', data, { headers: { Authorization } })
   ↓
6. Backend creates library_book record
   ↓
7. Response returns updated book data with in_library: true
   ↓
8. Hook updates local state: setBook(updatedBook)
   ↓
9. Component re-renders, UI shows "In Library" badge
   ↓
10. StatusDropdown and NotesEditor now visible
```

### State Management

```
┌─────────────────────────────────────────┐
│          Component Local State          │
│  (useState for search, filters, forms)  │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│            Custom Hooks                  │
│  (useBooks, useLibraryBooks, etc.)      │
│  - Manages loading/error states         │
│  - Caches fetched data                  │
│  - Provides mutation functions          │
└────────────────┬────────────────────────┘
                 ↓
┌─────────────────────────────────────────┐
│         Optional Auth Context           │
│  (Low-frequency: user, token, logout)   │
└─────────────────────────────────────────┘
```

### Key Data Flows

1. **Public Catalog Flow:** PublicCatalog → useBooks() → GET /books → Display all books in BookGrid
2. **Personal Library Flow:** Dashboard → useLibraryBooks() → GET /library_books (with auth) → Display user's books with remove action
3. **Book Detail Flow:** BookDetail → useBookDetail(id) → GET /books/:id (optional auth) → Show book + library status if logged in
4. **Optimistic Updates:** Remove book → Immediate UI update → API call → Rollback on error

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users | Current architecture is perfect. Single-page SPA with local state and custom hooks. No caching beyond React state. |
| 1k-10k users | Add request deduplication (React Query or SWR) to prevent redundant API calls. Implement proper error boundaries. Consider service worker for offline catalog browsing. |
| 10k-100k users | Migrate to React Query for caching, background refetching, and optimistic updates. Add pagination/infinite scroll for large catalogs. Consider code-splitting routes with React.lazy(). |

### Scaling Priorities

1. **First bottleneck:** Redundant API calls when navigating between routes. **Fix:** Replace custom hooks with React Query or SWR for automatic caching and deduplication.

2. **Second bottleneck:** Large book lists causing slow renders. **Fix:** Implement virtualization (react-window) for long lists or add pagination at API level.

3. **Third bottleneck:** Bundle size as design system grows. **Fix:** Ensure tree-shaking works correctly with Tailwind CSS and use dynamic imports for heavy components (rich text editor).

## Anti-Patterns

### Anti-Pattern 1: Props Drilling Through Design System

**What people do:** Pass book data through 5 levels: Page → Grid → Card → CardContent → Title

**Why it's wrong:** Makes components brittle, hard to refactor, and tightly couples the hierarchy. Adding new data requires changing every intermediate component.

**Do this instead:** Use composition and context where appropriate. Pass `children` instead of specific props. For deeply nested data, consider a specialized hook at the level that needs it.

```javascript
// BAD
<BookGrid books={books}>
  <BookCard book={book}>
    <BookCardContent title={book.title} author={book.author} />
  </BookCard>
</BookGrid>

// GOOD
<BookGrid>
  {books.map(book => (
    <BookCard book={book} /> {/* BookCard owns its internal structure */}
  ))}
</BookGrid>
```

### Anti-Pattern 2: Mixing API Calls in Components

**What people do:** Keep axios.get() and axios.post() directly in component bodies

**Why it's wrong:** Violates separation of concerns, makes testing difficult, duplicates auth header logic, couples components to specific API structure.

**Do this instead:** Extract all API logic to custom hooks and api/ modules. Components should never import axios directly.

```javascript
// BAD
function Dashboard() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/library_books', {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => setBooks(res.data));
  }, []);
}

// GOOD
function Dashboard() {
  const { books, loading, error } = useLibraryBooks();
}
```

### Anti-Pattern 3: Design System Components That Know About Business Logic

**What people do:** Put API calls or business rules inside design system components like BookCard

**Why it's wrong:** Makes design system components non-reusable. BookCard should work in any context (catalog, library, search results), not just one specific data source.

**Do this instead:** Design system components accept data and callbacks as props. Business logic stays in page components or hooks.

```javascript
// BAD
function BookCard({ bookId }) {
  const [book, setBook] = useState(null);
  useEffect(() => {
    fetchBook(bookId).then(setBook); // API call in design system!
  }, [bookId]);
}

// GOOD
function BookCard({ book, onClick, onRemove }) {
  return (
    <div onClick={() => onClick?.(book.id)}>
      <img src={book.cover?.url} />
      {onRemove && <Button onClick={() => onRemove(book.id)}>Remove</Button>}
    </div>
  );
}
```

### Anti-Pattern 4: Context for Everything

**What people do:** Create contexts for books, library, search state, filters, UI state, etc.

**Why it's wrong:** Context causes all consumers to re-render on any change. Fine for auth (changes rarely), terrible for search input (changes every keystroke).

**Do this instead:** Use local state for high-frequency changes (search, filters, form inputs). Reserve Context for truly global, infrequent state (theme, auth, locale).

```javascript
// BAD
const SearchContext = createContext();
function SearchProvider({ children }) {
  const [query, setQuery] = useState('');
  // Every keystroke re-renders ALL consumers!
  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
}

// GOOD
function PublicCatalog() {
  const [query, setQuery] = useState(''); // Local state, only this component re-renders
  return <SearchBar value={query} onChange={setQuery} />;
}
```

### Anti-Pattern 5: Rewriting Instead of Refactoring

**What people do:** Delete existing components and start from scratch with design system

**Why it's wrong:** Loses working functionality, breaks existing tests, introduces regression risk, wastes time recreating behavior that already works.

**Do this instead:** Incremental refactoring using adapter pattern. Keep existing components working while gradually replacing internals with design system pieces.

```javascript
// BAD: Delete Dashboard.jsx and rewrite completely

// GOOD: Refactor incrementally
// Step 1: Extract data logic to hook (no UI change)
// Step 2: Replace one UI piece at a time (loading spinner, then cards, then grid)
// Step 3: Remove old code only when new implementation is proven
// Step 4: Keep tests passing at every step
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| SAM API (Backend) | RESTful via samClient | All requests through centralized axios instance with auth interceptor |
| localStorage | Direct access in hooks | Auth token storage, potential for caching user preferences |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| App ↔ Page Components | Router + props (token, setToken) | Consider moving auth to Context if it grows |
| Page Components ↔ Design System | Props + composition | Pages own data, design system owns presentation |
| Components ↔ API | Custom hooks as intermediary | Never direct axios calls from components |
| Design System ↔ Tokens | Import design tokens | Centralized colors, spacing, typography |

## Build Order for Refactor

Based on dependencies and minimal disruption, refactor in this order:

### Phase 1: Foundation (No Breaking Changes)
1. **Design tokens** (colors, spacing, typography) - Used by all subsequent components
2. **samClient centralization** - Consolidate API calls, add error handling
3. **Custom hooks** - Extract useBooks, useLibraryBooks, useBookDetail
4. **Basic atoms** - Button, Input, Label, Badge, Spinner

**Why first:** Establishes foundation without touching existing UI. Tests continue passing.

### Phase 2: Core Components (Safe Replacements)
1. **Loading states** - Replace `<p>Loading...</p>` with `<Spinner />`
2. **BookCard molecule** - Used by both PublicCatalog and Dashboard
3. **BookGrid organism** - Wraps card layout logic
4. **SearchBar molecule** - New feature, doesn't replace anything

**Why second:** High-reuse components with clear boundaries. Easy to verify correctness.

### Phase 3: New Features (Additive)
1. **StatusDropdown** - New feature for BookDetail
2. **NotesEditor** - New feature for BookDetail
3. **Inline search filter** - Enhancement to PublicCatalog/Dashboard

**Why third:** Additive features don't risk breaking existing functionality.

### Phase 4: Layout Refactor (Highest Risk)
1. **Header organism** - Refactor navigation from App.jsx
2. **Footer organism** - Extract from App.jsx
3. **Page layouts** - Refactor PublicCatalog, Dashboard, BookDetail to use design system

**Why last:** Touches most complex components. By now, design system is proven and stable.

## Sources

- [React Architecture Patterns and Best Practices for 2026](https://www.bacancytechnology.com/blog/react-architecture-patterns-and-best-practices)
- [React Stack Patterns 2026](https://www.patterns.dev/react/react-2026/)
- [Building Reusable React Components in 2026](https://medium.com/@romko.kozak/building-reusable-react-components-in-2026-a461d30f8ce4)
- [State Management in React (2026): Best Practices, Tools & Real-World Patterns](https://www.c-sharpcorner.com/article/state-management-in-react-2026-best-practices-tools-real-world-patterns/)
- [React State Management in 2025: What You Actually Need](https://www.developerway.com/posts/react-state-management-2025)
- [Common Sense Refactoring of a Messy React Component](https://alexkondov.com/refactoring-a-messy-react-component/)
- [Incremental refactoring using three foundational pillars](https://www.thisdot.co/case-study/incremental-refactoring)
- [React Context vs Composition: Which Approach Should You Choose?](https://medium.com/@xuwei19850423/react-context-vs-composition-which-approach-should-you-choose-8856ae4a86b8)
- [MUI Releases Base UI 1 with 35 Accessible Components](https://www.infoq.com/news/2026/02/baseui-v1-accessible/)

---
*Architecture research for: Sadie - Personal Book Library Calm UI Refactor*
*Researched: 2026-02-16*
