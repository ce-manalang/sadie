# Phase 1: Foundation & Design System - Research

**Researched:** 2026-02-17
**Domain:** React design systems, Tailwind CSS v4 configuration, animation patterns
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Color & Mood
- Cool neutral palette — light grays, blue-grays, soft whites
- Near-white main background (#f8f9fa range) — airy, lots of breathing room
- Muted teal accent color for interactive elements (buttons, links, focus states)
- Book covers sit on floating white cards with subtle shadow — covers pop slightly off the background

#### Typography Pairing
- **Headings:** Syne Mono — geometric monospace, distinctive and understated
- **Body text:** System font stack — fastest load, native feel per device
- **Type scale:** Compact — smaller headings, tight hierarchy, more content visible
- **Syne Mono usage:** Claude's discretion on where beyond page headings (navigation, badges, etc.)

#### Motion & Transitions
- **Level:** Intentional — noticeable choreography, not just fades
- **Page transitions:** Shared element — book cover morphs from grid position to detail position
- **Grid reveal:** Claude's discretion (staggered vs all-at-once)
- **Hover:** Subtle lift — card rises slightly with shadow change, tactile physical feeling

#### Error Fallback
- **Tone:** Warm and reassuring — "Something went wrong. Your books are safe."
- **Visual:** Simple line illustration or icon to soften the moment
- **Scope:** Full page error — replace entire page with error state when something fails
- **Recovery:** Manual retry button ("Try again") — user controls when to retry

### Claude's Discretion
- Exact Syne Mono usage beyond page headings (nav, badges, buttons — find what works)
- Grid reveal animation style (staggered or simultaneous)
- Specific teal shade and gray scale values
- Shadow depth and card border-radius
- Spacing scale ratios
- Transition timing and easing curves
- Error illustration style

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Design tokens defined in Tailwind config for colors, spacing, and typography | Tailwind v4 @theme directive enables CSS-first token definition |
| FOUND-02 | Error boundaries catch component errors and display calm fallback UI | react-error-boundary library provides reusable boundaries with reset capability |
| FOUND-03 | Custom hooks extract API logic from page components (useLibraryBooks, useBookDetail, useAuth) | React custom hooks pattern extracts reusable logic; best practices documented |
| FOUND-04 | Non-functional `<el-*>` custom elements replaced with proper React components | React 19 has improved Web Components support; replace with native React patterns |
| DSGN-01 | App uses calm color palette (soft neutrals, warm tones) replacing default indigo/red | Tailwind v4 custom color tokens support palette definition |
| DSGN-02 | Typography uses readable serif headings and 16px+ sans-serif body text with generous line height | Syne Mono (Google Fonts) + system font stack pattern; @theme directive for scales |
| DSGN-03 | Layout uses generous whitespace with soft grid and rounded cover images with soft shadows | 8px spacing scale standard; Tailwind shadow utilities for card effects |
| DSGN-04 | UI transitions are gentle (200-300ms fades) using framer-motion | Framer Motion (v12.34.0) for animations; ease-out timing for responsiveness |
</phase_requirements>

## Summary

Phase 1 establishes the visual and technical foundation for Sadie using modern React patterns with Tailwind CSS v4's CSS-first configuration approach. The research confirms that all requirements can be implemented using current best practices and stable libraries.

**Key technical decision:** Tailwind CSS v4 uses the `@theme` directive for design tokens instead of `tailwind.config.js`, representing a major shift toward CSS-native configuration. The project already uses Tailwind v4.1.18 with the `@tailwindcss/vite` plugin, so configuration will be CSS-based.

**Primary recommendations:**
1. Use `react-error-boundary` library (battle-tested, widely adopted) rather than custom implementation
2. Implement custom hooks following React 19 patterns (explicit return objects, focused on single concerns)
3. Configure design tokens in CSS using `@theme` directive (Tailwind v4 approach)
4. Use Framer Motion v12 for shared element transitions via `layoutId` prop
5. Load Syne Mono via Google Fonts with font-display: swap for optimal performance

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.2.0 | UI framework | Already in project; latest stable with improved Web Components support |
| Tailwind CSS | 4.1.18 | Styling system | Already in project; v4 uses CSS-first config with @theme directive |
| @tailwindcss/vite | 4.1.18 | Vite integration | Required for Tailwind v4; replaces PostCSS approach |
| framer-motion | 12.34.0 | Animation library | Industry standard for React animations; supports layoutId for shared elements |
| react-error-boundary | 4.1.2+ | Error handling | Most popular React error boundary library (2.4M weekly downloads) |
| axios | 1.13.2 | HTTP client | Already in project; custom hooks will wrap API calls |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Google Fonts API | - | Font delivery | Load Syne Mono with font-display: swap |
| react-router-dom | 7.12.0 | Routing | Already in project; v7 supports loaders/actions pattern |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-error-boundary | Custom ErrorBoundary class | Custom = more control but less battle-tested; library is lightweight and sufficient |
| framer-motion | CSS transitions only | CSS = lighter bundle but no shared element transitions; requirement needs advanced choreography |
| Google Fonts API | Self-hosted fonts | Self-host = faster but adds build complexity; Google Fonts with swap is acceptable performance |
| Custom hooks | React Query / SWR | Query libraries = sophisticated caching but overkill for simple CRUD; defer unless needed |

**Installation:**
```bash
npm install framer-motion react-error-boundary
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── hooks/               # Custom hooks for API logic
│   ├── useAuth.js      # Authentication state and login/logout
│   ├── useLibraryBooks.js  # Fetch and manage library books
│   └── useBookDetail.js    # Fetch individual book details
├── components/          # React components
│   ├── ErrorFallback.jsx   # Reusable error UI component
│   ├── ErrorBoundary.jsx   # Wrapper around react-error-boundary
│   └── [existing components]
├── styles/
│   └── tokens.css      # Design tokens using @theme directive
├── index.css           # Global styles + Tailwind import
└── App.jsx
```

### Pattern 1: Design Tokens with @theme Directive

**What:** Tailwind v4 uses CSS-first configuration via `@theme` directive to define design tokens as CSS variables that generate utility classes.

**When to use:** Always for colors, spacing, typography, and other design tokens in Tailwind v4 projects.

**Example:**
```css
/* src/styles/tokens.css */
@import "tailwindcss";

@theme {
  /* Colors - Cool neutral palette */
  --color-background: #f8f9fa;
  --color-surface: #ffffff;
  --color-gray-50: #f8f9fa;
  --color-gray-100: #e9ecef;
  --color-gray-200: #dee2e6;
  --color-gray-300: #ced4da;
  --color-gray-400: #adb5bd;
  --color-gray-500: #6c757d;
  --color-gray-600: #495057;
  --color-gray-700: #343a40;
  --color-gray-800: #212529;
  --color-teal-400: #4db8a8;  /* Muted teal accent */
  --color-teal-500: #38a89d;
  --color-teal-600: #2d8b82;

  /* Typography - Syne Mono for headings */
  --font-family-display: "Syne Mono", "Courier New", monospace;
  --font-family-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Font sizes - Compact scale */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */

  /* Line heights - Generous */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Spacing - 8px base scale */
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 1rem;     /* 16px */
  --spacing-md: 1.5rem;   /* 24px */
  --spacing-lg: 2rem;     /* 32px */
  --spacing-xl: 3rem;     /* 48px */
  --spacing-2xl: 4rem;    /* 64px */

  /* Shadows - Subtle elevation */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-card-hover: 0 4px 6px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06);

  /* Border radius - Soft corners */
  --radius-card: 0.5rem;    /* 8px */
  --radius-image: 0.375rem; /* 6px */
}
```

**Source:** [Tailwind CSS v4 Theme Documentation](https://tailwindcss.com/docs/theme)

### Pattern 2: Custom Hooks for API Logic

**What:** Extract data fetching and API logic into custom hooks that return data, loading states, and error states.

**When to use:** When components need to fetch data or perform side effects. Keeps components focused on presentation.

**Example:**
```javascript
// src/hooks/useLibraryBooks.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useLibraryBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:3000/library_books', {
          headers: { Authorization: token }
        });
        setBooks(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const removeBook = async (bookId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:3000/library_books/${bookId}`, {
        headers: { Authorization: token }
      });
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to remove book'
      };
    }
  };

  return { books, loading, error, removeBook };
}
```

**Best practices:**
- Return explicit objects (not arrays) for clarity
- Keep hooks focused on single concerns (one API endpoint/entity)
- Handle all three states: data, loading, error
- Return mutation functions alongside data

**Source:** [React Custom Hooks in 2026: A Practical Guide](https://thelinuxcode.com/react-custom-hooks-in-2026-a-practical-guide-to-cleaner-components-fewer-bugs-and-faster-product-delivery/)

### Pattern 3: Error Boundaries with Warm Fallback UI

**What:** Wrap page-level components with ErrorBoundary to catch errors and display friendly recovery UI.

**When to use:** Around page components and any risky components (data visualizations, external integrations).

**Example:**
```jsx
// src/components/ErrorFallback.jsx
export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Simple line illustration */}
        <div className="mb-6">
          <svg className="w-24 h-24 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>

        <h2 className="font-display text-2xl text-gray-800 mb-2">
          Something went wrong
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Your books are safe. We hit a snag loading this page.
        </p>

        <button
          onClick={resetErrorBoundary}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-card transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// src/App.jsx
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        {/* Your routes */}
      </Routes>
    </ErrorBoundary>
  );
}
```

**Source:** [GitHub - react-error-boundary](https://github.com/bvaughn/react-error-boundary)

### Pattern 4: Shared Element Transitions with layoutId

**What:** Use Framer Motion's `layoutId` prop to create shared element transitions between views (e.g., book cover morphing from grid to detail page).

**When to use:** For premium transitions that connect two views with a common element.

**Example:**
```jsx
// Grid view
import { motion } from 'framer-motion';

function BookGrid({ books }) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {books.map((book) => (
        <Link to={`/books/${book.id}`} key={book.id}>
          <motion.img
            layoutId={`book-cover-${book.id}`}
            src={book.cover?.url}
            alt={book.title}
            className="w-full rounded-image"
          />
        </Link>
      ))}
    </div>
  );
}

// Detail view
function BookDetail({ book }) {
  return (
    <div className="grid grid-cols-2 gap-8">
      <motion.img
        layoutId={`book-cover-${book.id}`}
        src={book.cover?.url}
        alt={book.title}
        className="w-full rounded-image"
      />
      <div>
        <h1>{book.title}</h1>
        {/* ... */}
      </div>
    </div>
  );
}
```

**Important:** Both elements must share the same `layoutId` value. Framer Motion automatically animates between them.

**Source:** [Layout Animation — React FLIP & Shared Element | Motion](https://motion.dev/docs/react-layout-animations)

### Pattern 5: Hover Effects with Lift and Shadow

**What:** Use Framer Motion's `whileHover` for card lift effect with shadow transition.

**When to use:** For interactive cards, buttons, and touchable surfaces.

**Example:**
```jsx
import { motion } from 'framer-motion';

function BookCard({ book }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: 'easeOut' }
      }}
      className="bg-surface rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200"
    >
      <img src={book.cover?.url} alt={book.title} className="rounded-image" />
      <h3 className="font-display text-lg">{book.title}</h3>
    </motion.div>
  );
}
```

**Best practices:**
- Keep hover animations fast (150-250ms) for responsiveness
- Use ease-out for natural deceleration
- Combine transform (y-axis lift) with shadow change for physical metaphor

**Source:** [React gesture animations — hover, drag, press](https://motion.dev/docs/react-gestures)

### Anti-Patterns to Avoid

- **Don't mix Tailwind v3 and v4 config approaches:** v4 uses CSS-first config with `@theme`, not JavaScript config files
- **Don't use linear easing for UI animations:** Makes interfaces feel robotic; use ease-out for responsiveness
- **Don't wrap every component in ErrorBoundary:** Causes too much granularity; use at page/feature level
- **Don't hand-roll error boundaries:** Use `react-error-boundary` library for battle-tested implementation
- **Don't use ease-in animations:** Makes UI feel sluggish; ease-out is almost always better
- **Don't put API logic directly in components:** Extract to custom hooks for reusability and testing

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Error boundaries | Custom class components with componentDidCatch | react-error-boundary library | Library handles edge cases (reset keys, error callbacks, multiple fallback types); 2.4M weekly downloads |
| Animation library | Custom CSS transition utilities | Framer Motion | Shared element transitions require sophisticated FLIP animations; CSS can't handle layoutId pattern |
| Design token system | Custom CSS variables and build script | Tailwind v4 @theme directive | @theme automatically generates utility classes; maintains Tailwind conventions |
| API state management | Manual useState/useEffect in components | Custom hooks pattern | Separates concerns; enables reuse across components; easier testing |
| Font loading optimization | Manual @font-face declarations | Google Fonts API with font-display: swap | Google's CDN handles browser optimization, unicode-range subsetting, and caching |

**Key insight:** React ecosystem has matured significantly. Libraries like react-error-boundary and framer-motion solve complex problems (error recovery, FLIP animations) that are deceptively difficult to implement correctly. Use battle-tested solutions for non-differentiating work.

## Common Pitfalls

### Pitfall 1: Tailwind v4 Config Confusion

**What goes wrong:** Developers try to use `tailwind.config.js` to define colors, spacing, and fonts, but utilities don't generate.

**Why it happens:** Tailwind v4 fundamentally changed configuration from JavaScript to CSS-first. The `@theme` directive in CSS replaces most config file usage.

**How to avoid:**
1. Define design tokens in CSS using `@theme` directive
2. Only use `tailwind.config.js` for plugins and complex JavaScript-based configuration
3. Remember: `--color-*`, `--font-*`, `--spacing-*` namespaces automatically generate utilities

**Warning signs:**
- Custom color classes like `bg-teal-500` not appearing
- Font families defined in config but not working
- Build warnings about unrecognized configuration

**Source:** [Tailwind CSS v4 @theme: The Future of Design Tokens](https://medium.com/@sureshdotariya/tailwind-css-4-theme-the-future-of-design-tokens-at-2025-guide-48305a26af06)

### Pitfall 2: Error Boundaries Don't Catch Everything

**What goes wrong:** Developer wraps app in ErrorBoundary but still sees unhandled errors in console for async operations and event handlers.

**Why it happens:** React Error Boundaries only catch errors during rendering, in lifecycle methods, and in constructors. They don't catch:
- Errors in event handlers (onClick, onChange, etc.)
- Async code (setTimeout, promises, async/await)
- Server-side rendering errors
- Errors in the error boundary itself

**How to avoid:**
1. Use try-catch blocks in event handlers and async functions
2. Handle promise rejections explicitly with `.catch()`
3. Don't rely on error boundaries as the only error handling mechanism
4. Log async errors to error tracking service (Sentry, etc.)

**Warning signs:**
- Unhandled promise rejections in console
- Errors in onClick handlers not caught
- White screen on async failures

**Source:** [How to Implement Error Boundaries for Graceful Error Handling in React](https://oneuptime.com/blog/post/2026-01-15-react-error-boundaries/view)

### Pitfall 3: Shared Element Transitions Require Matching layoutId

**What goes wrong:** Book cover doesn't transition smoothly from grid to detail page; instead shows instant swap or no animation.

**Why it happens:** Framer Motion's shared element transitions require:
1. Both elements must have identical `layoutId` values
2. Both elements must be rendered by motion components (`<motion.img>`, etc.)
3. Both elements must exist in the same layout tree (common ancestor)

**How to avoid:**
1. Use dynamic layoutId with consistent identifier: `layoutId={`book-cover-${book.id}`}`
2. Ensure both source and destination use motion components
3. Wrap routes in `<AnimatePresence>` for exit animations
4. Test transitions by navigating between views

**Warning signs:**
- Cover image pops instead of morphing
- Animation only works one direction (grid→detail but not detail→grid)
- Console warnings about layoutId conflicts

**Source:** [Shared Element Transition with NextJS and Framer Motion](https://medium.com/timeless/shared-element-transition-with-nextjs-and-framer-motion-aad0aa7335e2)

### Pitfall 4: Custom Hooks Returning Arrays Instead of Objects

**What goes wrong:** Hook returns `[data, loading, error, refetch]` array, but when adding new return values, all consuming components break.

**Why it happens:** Array destructuring is positional. Adding new values changes positions, breaking existing code. Example:
```javascript
// Version 1
const [books, loading] = useLibraryBooks();

// Version 2 adds error between loading and refetch
const [books, loading, error, refetch] = useLibraryBooks();
// Now 'loading' gets error value, breaks all consumers
```

**How to avoid:**
1. Return objects, not arrays: `return { books, loading, error, refetch }`
2. Destructure by name: `const { books, loading } = useLibraryBooks()`
3. Only use arrays for tiny patterns (2 values max): `const [value, setValue] = useState()`

**Warning signs:**
- Adding return values breaks consuming components
- Unclear what each array position represents
- Need to use `_` placeholder for unused values

**Best practice:** Explicit output objects for anything beyond one or two values. Arrays are okay for tiny patterns like a toggle, but objects age better when behavior evolves.

**Source:** [React Custom Hooks in 2026: A Practical Guide](https://thelinuxcode.com/react-custom-hooks-in-2026-a-practical-guide-to-cleaner-components-fewer-bugs-and-faster-product-delivery/)

### Pitfall 5: Replacing Web Components Without Understanding React 19 Changes

**What goes wrong:** Developer tries to use custom elements (`<el-*>`) directly in React, leading to prop/event handler issues and hydration warnings.

**Why it happens:** Current codebase has non-functional custom elements like `<el-tab-group>` and `<el-disclosure>` that are placeholders. React's relationship with Web Components has historically been complicated (synthetic events, ref requirements), though React 19 improved support.

**How to avoid:**
1. Don't try to make custom elements work—replace them with React components
2. For tabs: use React state with conditional rendering or headlessui/radix-ui
3. For disclosures: use React state with AnimatePresence for animations
4. Use Framer Motion for any animation needs
5. React 19 improved Web Components support, but native React patterns are still preferred

**Warning signs:**
- Custom elements in JSX: `<el-tab-group>`, `<el-disclosure>`
- Elements with no functionality
- Refs required for basic interactions

**Replacement strategy:**
```jsx
// Bad: Non-functional custom element
<el-disclosure id="detail-tags">
  <div className="pb-6">Content</div>
</el-disclosure>

// Good: React state + Framer Motion
import { motion, AnimatePresence } from 'framer-motion';

function Disclosure({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**Source:** [React 19 introduces full support for custom elements](https://aleks-elkin.github.io/posts/2024-12-06-react-19/)

### Pitfall 6: Google Fonts Blocking Render

**What goes wrong:** Page shows invisible text (FOIT - Flash of Invisible Text) while waiting for Syne Mono to load, or shows wrong font then swaps (FOUT - Flash of Unstyled Text).

**Why it happens:** Default font loading behavior blocks text rendering. Without `font-display` strategy, browser waits for font before showing text.

**How to avoid:**
1. Add `&display=swap` to Google Fonts URL
2. Use system font stack as fallback
3. Preconnect to fonts.googleapis.com and fonts.gstatic.com
4. Consider self-hosting if performance is critical

**Example:**
```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap" rel="stylesheet">
```

```css
/* tokens.css */
@theme {
  --font-family-display: "Syne Mono", "Courier New", monospace;
}
```

**Warning signs:**
- Invisible text on initial page load
- Font "pop" or layout shift after load
- Slow Core Web Vitals (LCP, CLS)

**Source:** [How to Include Fonts in React: Using Google Fonts and Custom Font Files](https://plainenglish.io/blog/how-to-include-fonts-in-react-using-google-fonts-and-custom-font-files-9ece44)

## Code Examples

Verified patterns from official sources and current best practices:

### Loading Google Fonts (Syne Mono)

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Load Syne Mono with font-display: swap -->
    <link href="https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap" rel="stylesheet">

    <title>Sadie - Your Personal Library</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**Source:** [Google Fonts Syne Mono](https://fonts.google.com/specimen/Syne+Mono)

### Complete Design Token Configuration

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  /*
   * Color Palette - Cool Neutrals + Muted Teal
   * User specified: light grays, blue-grays, soft whites, near-white background
   */
  --color-background: #f8f9fa;
  --color-surface: #ffffff;

  /* Gray scale - Cool tones */
  --color-gray-50: #f8f9fa;
  --color-gray-100: #e9ecef;
  --color-gray-200: #dee2e6;
  --color-gray-300: #ced4da;
  --color-gray-400: #adb5bd;
  --color-gray-500: #6c757d;
  --color-gray-600: #495057;
  --color-gray-700: #343a40;
  --color-gray-800: #212529;
  --color-gray-900: #1a1d20;

  /* Teal accent - Muted/soft for interactive elements */
  --color-teal-300: #5ecfc0;
  --color-teal-400: #4db8a8;
  --color-teal-500: #38a89d;
  --color-teal-600: #2d8b82;
  --color-teal-700: #236e67;

  /* Semantic colors */
  --color-error: #dc3545;
  --color-success: #28a745;

  /*
   * Typography
   * User specified: Syne Mono for headings, system stack for body, compact scale
   */
  --font-family-display: "Syne Mono", "Courier New", Consolas, monospace;
  --font-family-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

  /* Font sizes - Compact scale */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-base: 1rem;       /* 16px - minimum for body text */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;      /* 24px - compact heading */
  --font-size-3xl: 1.875rem;    /* 30px */
  --font-size-4xl: 2.25rem;     /* 36px */

  /* Line heights - Generous for readability */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /*
   * Spacing - 8px grid system
   * Standard design system practice
   */
  --spacing-0: 0;
  --spacing-1: 0.25rem;    /* 4px */
  --spacing-2: 0.5rem;     /* 8px - base unit */
  --spacing-3: 0.75rem;    /* 12px */
  --spacing-4: 1rem;       /* 16px */
  --spacing-5: 1.25rem;    /* 20px */
  --spacing-6: 1.5rem;     /* 24px */
  --spacing-8: 2rem;       /* 32px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-12: 3rem;      /* 48px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */

  /*
   * Shadows - Subtle elevation for cards
   * User specified: floating white cards with subtle shadow
   */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-card-hover: 0 4px 6px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.05);

  /*
   * Border Radius - Soft corners
   */
  --radius-sm: 0.25rem;      /* 4px */
  --radius-card: 0.5rem;     /* 8px - card corners */
  --radius-image: 0.375rem;  /* 6px - book cover corners */
  --radius-lg: 0.75rem;      /* 12px */
}

/* Global base styles */
body {
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-gray-800);
  background-color: var(--color-background);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-display);
  line-height: var(--line-height-tight);
  font-weight: 400; /* Syne Mono is bold by design, use regular weight */
}
```

**Usage in components:**
```jsx
<div className="bg-background min-h-screen p-8">
  <h1 className="font-display text-3xl text-gray-900 mb-4">
    My Library
  </h1>
  <div className="bg-surface shadow-card hover:shadow-card-hover rounded-card p-6">
    <p className="font-sans text-base leading-relaxed text-gray-700">
      Your books are safe here.
    </p>
  </div>
</div>
```

**Source:** [Tailwind CSS Theme Variables](https://tailwindcss.com/docs/theme)

### Complete Custom Hook Example (useLibraryBooks)

```javascript
// src/hooks/useLibraryBooks.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom hook for managing user's library books
 * Handles fetching, removing, and state management
 *
 * @returns {Object} { books, loading, error, removeBook, refetch }
 */
export function useLibraryBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3000/library_books', {
        headers: { Authorization: token }
      });
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching library books:', err);
      setError(err.response?.data?.error || 'Failed to load your library');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const removeBook = async (bookId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:3000/library_books/${bookId}`, {
        headers: { Authorization: token }
      });

      // Optimistically update UI
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));

      return { success: true };
    } catch (err) {
      console.error('Error removing book:', err);
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to remove book'
      };
    }
  };

  return {
    books,
    loading,
    error,
    removeBook,
    refetch: fetchBooks
  };
}
```

**Usage in component:**
```jsx
import { useLibraryBooks } from '../hooks/useLibraryBooks';

function Dashboard() {
  const { books, loading, error, removeBook } = useLibraryBooks();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="grid grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          onRemove={() => removeBook(book.id)}
        />
      ))}
    </div>
  );
}
```

**Source:** [Reusing Logic with Custom Hooks – React](https://react.dev/learn/reusing-logic-with-custom-hooks)

### Shared Element Transition (Book Cover Grid → Detail)

```jsx
// src/components/BookGrid.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function BookGrid({ books }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <Link to={`/books/${book.dato_book_id}`} key={book.id}>
          <motion.div
            whileHover={{
              y: -4,
              transition: { duration: 0.2, ease: 'easeOut' }
            }}
            className="bg-surface rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden"
          >
            <motion.img
              layoutId={`book-cover-${book.dato_book_id}`}
              src={book.cover?.url || 'https://via.placeholder.com/300x450?text=No+Cover'}
              alt={`${book.title} by ${book.author} cover`}
              className="w-full aspect-[2/3] object-cover rounded-image"
            />
            <div className="p-4">
              <h3 className="font-display text-lg text-gray-900 mb-1">
                {book.title}
              </h3>
              <p className="font-sans text-sm text-gray-600">
                {book.author}
              </p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}

export default BookGrid;
```

```jsx
// src/components/BookDetail.jsx
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useBookDetail } from '../hooks/useBookDetail';

function BookDetail() {
  const { id } = useParams();
  const { book, loading, error } = useBookDetail(id);

  if (loading) return <LoadingSpinner />;
  if (error || !book) return <ErrorMessage error={error} />;

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Shared element with matching layoutId */}
        <motion.img
          layoutId={`book-cover-${id}`}
          src={book.cover?.url || 'https://via.placeholder.com/300x450?text=No+Cover'}
          alt={`${book.title} by ${book.author} cover`}
          className="w-full max-w-md rounded-image shadow-lg"
        />

        <div>
          <h1 className="font-display text-4xl text-gray-900 mb-2">
            {book.title}
          </h1>
          <p className="font-sans text-xl text-teal-600 mb-6">
            {book.author}
          </p>
          <p className="font-sans text-base leading-relaxed text-gray-700">
            {book.description || 'No description available for this book.'}
          </p>

          {!book.in_library && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-card font-sans transition-colors duration-200"
            >
              Add to Library
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
```

**Important:**
- Both components use `layoutId={`book-cover-${id}`}` with the same ID
- Both images are wrapped in `<motion.img>` components
- Framer Motion automatically animates the morph between views
- No additional configuration needed

**Source:** [Layout Animation — React FLIP & Shared Element | Motion](https://motion.dev/docs/react-layout-animations)

### Staggered Grid Reveal Animation

```jsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

function BookGrid({ books }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {books.map((book) => (
        <motion.div
          key={book.id}
          variants={itemVariants}
          className="bg-surface rounded-card shadow-card"
        >
          {/* Book card content */}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

**Pattern:** Parent container orchestrates children animations using `staggerChildren`. Each child uses same variants but animates in sequence.

**Source:** [Advanced animation patterns with Framer Motion](https://blog.maximeheckel.com/posts/advanced-animation-patterns-with-framer-motion/)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind config in tailwind.config.js | CSS-first config with @theme directive | Tailwind v4 (2024) | Design tokens now in CSS; auto-generates utilities; better IDE support |
| Manual ErrorBoundary class components | react-error-boundary library | 2021+ adoption | Less boilerplate; battle-tested edge cases; easy reset mechanism |
| CSS transitions only | Framer Motion for complex animations | 2020+ mainstream | Shared element transitions possible; gesture animations; FLIP technique |
| Framer Motion brand | Motion (formerly Framer Motion) | v12+ (2025) | Rebranding to "Motion"; same library, simpler name |
| Array returns from custom hooks | Object returns from custom hooks | React best practices 2023+ | Easier to add return values without breaking consumers |
| Manual font loading | Google Fonts with font-display: swap | 2019+ (font-display spec) | Prevents FOIT (invisible text); better Core Web Vitals |
| 4px spacing scale | 8px spacing scale (8pt grid) | Design systems 2018+ | Better alignment with screen densities; more divisible |

**Deprecated/outdated:**
- **Tailwind v3 JavaScript config:** v4 uses CSS-first approach; only use config file for plugins
- **AnimateSharedLayout component:** Deprecated in Framer Motion v7+; use `layoutId` prop directly
- **framer-motion package name:** Rebranding to "motion" but framer-motion still maintained
- **font-display: block or auto:** Use `swap` for better perceived performance
- **ease-in-out for all animations:** Prefer ease-out for UI interactions (feels more responsive)

## Open Questions

### 1. Teal Accent Shade Selection
**What we know:** User wants "muted teal" for interactive elements (buttons, links, focus states)
**What's unclear:** Exact hex value; lightness/saturation preferences; whether single shade or scale
**Recommendation:** Start with `--color-teal-500: #38a89d` (muted, professional) and create 300-700 scale. Test against white cards for sufficient contrast (WCAG AA minimum 4.5:1). User has discretion to adjust specific values during implementation.

### 2. Grid Reveal Animation Style
**What we know:** User wants "intentional" animations (noticeable choreography)
**What's unclear:** Staggered reveal vs. all-at-once for book grid
**Recommendation:** Implement staggered reveal (0.05s delay between items) for "intentional" feel. Stagger creates visual interest and guides eye through content. If feels too slow during testing, easy to remove `staggerChildren` from variants. User has discretion.

### 3. Error Illustration Source
**What we know:** User wants "simple line illustration or icon" for error fallback
**What's unclear:** Use Heroicons (already in codebase pattern)? Custom illustration? Illustration library?
**Recommendation:** Use Heroicons (SVG icons) since they're already referenced in current code pattern. Choose book-related icon (BookOpenIcon) for thematic consistency. If user wants custom illustration during implementation, can replace SVG easily. User has discretion.

### 4. Syne Mono Extended Usage
**What we know:** Headings use Syne Mono; user has discretion for nav, badges, buttons
**What's unclear:** Which specific UI elements benefit from distinctive monospace?
**Recommendation:**
- **Definitely use:** Page headings (h1, h2), navigation links, section labels
- **Test during implementation:** Button text, badges/tags, status indicators
- **Don't overuse:** Body text, descriptions, long-form content (readability suffers)
- Principle: Use Syne Mono for wayfinding and labels; system fonts for reading

### 5. Custom Elements Replacement Priority
**What we know:** Non-functional `<el-*>` elements need replacement with React components
**What's unclear:** Current codebase has `<el-tab-group>`, `<el-disclosure>`, `<el-tab-list>`, `<el-tab-panels>` — are these functional or placeholders?
**Recommendation:** Review during implementation. If elements are non-functional (likely based on code review), replace with:
- Tabs: React state + conditional rendering
- Disclosures: React state + Framer Motion AnimatePresence
- Don't add heavy UI library (headlessui, radix) unless complexity demands it

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Theme Documentation](https://tailwindcss.com/docs/theme) - Design tokens and @theme directive
- [GitHub - react-error-boundary](https://github.com/bvaughn/react-error-boundary) - Error boundary implementation
- [React Official Docs - Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks) - Custom hooks patterns
- [Layout Animation — React FLIP & Shared Element | Motion](https://motion.dev/docs/react-layout-animations) - Shared element transitions
- [React gesture animations — hover, drag, press | Motion](https://motion.dev/docs/react-gestures) - Hover animations

### Secondary (MEDIUM confidence)
- [Tailwind CSS v4: The Complete Guide for 2026 | DevToolbox Blog](https://devtoolbox.dedyn.io/blog/tailwind-css-v4-complete-guide) - v4 overview
- [How to Implement Error Boundaries for Graceful Error Handling in React](https://oneuptime.com/blog/post/2026-01-15-react-error-boundaries/view) - Error boundary best practices
- [React Custom Hooks in 2026: A Practical Guide](https://thelinuxcode.com/react-custom-hooks-in-2026-a-practical-guide-to-cleaner-components-fewer-bugs-and-faster-product-delivery/) - 2026 custom hooks patterns
- [Exploring Syne Mono: Comprehensive Guide to Font Characteristics and Use Cases](https://fontforge.io/monospace/syne-mono/) - Font characteristics
- [Box Shadow - Tailwind CSS](https://tailwindcss.com/docs/box-shadow) - Shadow utilities
- [Complete Guide to React Router v7](https://plaintext-engineering.com/blog/complete-guide-to-react-router-v7/) - React Router v7 patterns
- [Spacing, grids, and layouts | Design Systems](https://www.designsystems.com/space-grids-and-layouts/) - Spacing scale best practices
- [Executing UX Animations: Duration and Motion Characteristics - Nielsen Norman Group](https://www.nngroup.com/articles/animation-duration/) - Animation timing
- [React 19 introduces full support for custom elements](https://aleks-elkin.github.io/posts/2024-12-06-react-19/) - Web Components in React
- [How to Include Fonts in React: Using Google Fonts and Custom Font Files](https://plainenglish.io/blog/how-to-include-fonts-in-react-using-google-fonts-and-custom-font-files-9ece44) - Font loading optimization

### Tertiary (LOW confidence - community sources)
- [Tailwind CSS v4 @theme: The Undocumented Truth About Custom Colors, Fonts, and CSS Tokens | Medium](https://medium.com/@muhammadfahreza/tailwind-css-v4-the-undocumented-truth-about-custom-colors-fonts-and-css-tokens-8756b3decc0b) - Community perspective on v4
- [Shared Element Transition with NextJS and Framer Motion | Medium](https://medium.com/timeless/shared-element-transition-with-nextjs-and-framer-motion-aad0aa7335e2) - Shared element implementation guide
- [Advanced animation patterns with Framer Motion](https://blog.maximeheckel.com/posts/advanced-animation-patterns-with-framer-motion/) - Advanced Framer Motion patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries are industry standard with stable versions
- Architecture patterns: HIGH - Patterns verified from official documentation and current best practices
- Tailwind v4 configuration: HIGH - Official documentation and multiple verified sources confirm @theme approach
- Error boundaries: HIGH - react-error-boundary is most popular library (2.4M weekly downloads); official React docs confirm limitations
- Custom hooks: HIGH - Official React documentation and 2026 best practices guides
- Framer Motion: MEDIUM-HIGH - Official docs confirm layoutId pattern; some nuances around AnimatePresence and route transitions need testing
- Design tokens values: MEDIUM - Locked decisions provide direction (cool neutrals, muted teal); specific values (exact hex codes) are discretionary
- Pitfalls: HIGH - Based on known limitations documented in official sources and community experience

**Research date:** 2026-02-17
**Valid until:** ~30 days (March 2026) for stable stack; React/Tailwind patterns are stable. Framer Motion may have updates but breaking changes unlikely.

**Notes:**
- Current codebase already has React 19.2.0, Tailwind v4.1.18, React Router v7.12.0 — no version upgrades needed
- Only two new dependencies: framer-motion and react-error-boundary
- Tailwind v4 CSS-first config is the biggest architectural shift from typical v3 projects
- User decisions from CONTEXT.md provide clear constraints; remaining decisions are implementation details with discretion
