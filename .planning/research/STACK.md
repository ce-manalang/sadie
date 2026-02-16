# Stack Research

**Domain:** Personal Library UI Enhancement
**Researched:** 2026-02-16
**Confidence:** HIGH

## Recommended Stack

### Animation & Transitions

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| framer-motion | ^12.34.0 | Gentle UI transitions, layout animations | Most mature React animation library. React 19 support added. Declarative API perfect for calm transitions. Physics-based motion feels natural, not robotic. 12.x has improved layout animations for concurrent rendering. |

**Confidence:** HIGH - Official React 19 support verified, npm shows 12.34.0 published Feb 2026.

### UI Primitives & Components

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| @radix-ui/react-* | Latest | Unstyled accessible primitives (dialogs, dropdowns, tooltips) | Headless components give complete styling control while handling accessibility and keyboard navigation. Integrates perfectly with Tailwind CSS 4. React 19 support confirmed Oct 2024. Use individual packages (e.g., `@radix-ui/react-dialog`) only when needed. |
| @headlessui/react | ^2.0+ | Alternative unstyled primitives | Official Tailwind Labs library. v2.0 adds anchor positioning, checkbox, HTML form components. Use if you prefer Tailwind Labs ecosystem over Radix. Both are excellent; pick one, not both. |

**Confidence:** HIGH - Both libraries verified React 19 compatible. Radix has CSS specificity fixes for Tailwind 4 (0,1,0 cap).

**Recommendation:** Start with Radix UI. More comprehensive primitive set. Switch to Headless UI only if you hit Radix limitations.

### Form Handling

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| react-hook-form | ^7.71.1 | Notes/status editing forms | Minimal re-renders, tiny bundle (no dependencies), works with React 19 (with workarounds). v7 stable, v8 beta available with better React 19 Compiler integration. Use v7 for stability. Validation via HTML5 or optional zod integration. |

**Confidence:** MEDIUM - v7 works with React 19 but has known issues with React Compiler causing full form re-renders. v8 beta addresses this. For Sadie's simple forms (notes, status), v7 is sufficient.

**Alternative:** For ultra-simple forms (single input), consider controlled components with `useState` + `useDeferredValue`. react-hook-form adds 24kb; only worth it if multiple fields or complex validation.

### Search & Filtering

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| useDeferredValue (React 19 built-in) | N/A | Inline search filter debouncing | Native React 19 hook. Intelligently defers expensive filtering based on device performance, not fixed timeout. Zero dependencies. Perfect for calm, responsive search without jank. Use `const deferredQuery = useDeferredValue(searchQuery)` for filtering. |

**Confidence:** HIGH - Official React documentation. Built-in, optimized for concurrent rendering.

**Don't use:** External debounce libraries (lodash.debounce, use-debounce). `useDeferredValue` is superior for React 19.

### Styling Utilities

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| clsx | ^2.1.1 | Conditional className construction | 311 bytes. Faster than `classnames`. Use `clsx/lite` for Tailwind-only projects (string arguments only). Clean API for conditional classes: `clsx('base', isActive && 'active')`. |
| tailwind-merge | ^2.5+ | Merge conflicting Tailwind classes | Prevents class conflicts when composing components. Combine with clsx: `cn = (...args) => twMerge(clsx(args))`. Essential for reusable component libraries. |

**Confidence:** HIGH - Standard pairing in modern Tailwind projects. Both actively maintained.

### Typography & Visual Design

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| @tailwindcss/typography | Latest (v4 compatible) | Prose styling for notes/descriptions | Hand-tuned typographic defaults by Tailwind design team. `prose` class adds beautiful reading defaults. `prose-invert` for dark mode. Built-in max-width for readability. Perfect for calm reading journal aesthetic. |

**Confidence:** HIGH - Official Tailwind plugin, v4 compatible.

### Image Optimization

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Native `loading="lazy"` | N/A | Book cover image lazy loading | Supported in all modern browsers (2026). Zero dependencies. Use `<img src={cover} loading="lazy" alt={title} />`. Add Intersection Observer only if you need custom loading states/placeholders. |

**Confidence:** HIGH - Native browser feature, widely supported.

**Optional library:** `react-lazy-load-image-component` if you want blur-up placeholders or custom loading states. Adds ~15kb. Not needed for MVP.

### State Management

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React Context API (built-in) | N/A | Theme, user preferences (low-frequency) | Built into React 19. Perfect for environment data (theme, auth). React 19 allows direct context use as provider. Don't use for high-frequency updates (filter queries, form state). |
| useState/useReducer (built-in) | N/A | Local component state | Default choice for component-local state. Use `useReducer` for complex state logic (e.g., multi-step forms). |

**Confidence:** HIGH - React 19 built-ins, well-documented.

**Don't use:** Redux, Zustand, Recoil for Sadie. The app is small, state is local. Context API + local state is sufficient. Add external state library only when you hit clear limitations (shared state across many routes, complex cache management).

## Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| axios | ^1.13.2 | HTTP client (already installed) | Already in project, handles Rails API requests. Keep using it. |
| react-router-dom | ^7.12.0 | Routing (already installed) | Already in project for library/book detail navigation. |

## Installation

```bash
# Animation
npm install framer-motion

# UI Primitives (choose one strategy)
# Option A: Radix UI (recommended)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip
# (install only primitives you need)

# Option B: Headless UI (alternative)
npm install @headlessui/react

# Forms
npm install react-hook-form

# Styling Utilities
npm install clsx tailwind-merge

# Typography
npm install -D @tailwindcss/typography

# Optional: Image lazy loading with placeholders
npm install react-lazy-load-image-component
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| framer-motion | react-spring | When you need physics-based motion (springs, drag). react-spring has steeper learning curve but more granular control. For Sadie's calm transitions, framer-motion is simpler and sufficient. |
| Radix UI | Headless UI | When you prefer Tailwind Labs ecosystem or need specific Headless UI v2 features (anchor positioning). Both are excellent; Radix has more comprehensive primitive set. |
| react-hook-form | TanStack Form | When you need framework-agnostic forms or extreme type-safety. TanStack Form is newer, less mature ecosystem. react-hook-form has 5+ years of battle-testing. |
| react-hook-form | Controlled components (useState) | For single-input forms or ultra-simple validation. Saves 24kb bundle size. Use when form complexity doesn't justify library. |
| Native lazy loading | react-lazyload | When you need lazy loading for non-image components (e.g., virtual scrolling, code splitting). For images only, native `loading="lazy"` is sufficient. |
| useDeferredValue | lodash.debounce | Never for React 19 projects. `useDeferredValue` is React-native, optimized for concurrent rendering, and adjusts to device performance. External debounce uses fixed timeouts. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Anime.js, GSAP | Imperative APIs, not React-idiomatic. GSAP has large bundle size. | framer-motion (declarative, React-first) |
| Material-UI, Ant Design, Chakra UI | Opinionated visual design. Hard to achieve "calm, minimal" aesthetic. Heavy bundles (500kb+). | Radix UI or Headless UI with custom Tailwind styling |
| Formik | Slower performance than react-hook-form. Larger bundle. Not actively developed since 2022. | react-hook-form |
| Redux, Zustand, Recoil | Overkill for small personal app. Adds complexity without benefit. State is local/route-scoped. | React Context API + useState/useReducer |
| react-select, downshift | For complex multi-select or autocomplete. Sadie doesn't need these patterns. Native `<select>` or Radix Select is sufficient. | Native HTML or Radix Select |
| date-fns, moment.js | For date manipulation. Sadie doesn't have date-heavy features. If needed, use native `Intl.DateTimeFormat`. | Native `Intl` APIs |

## Stack Patterns by Feature

### Feature: Gentle Page Transitions

**Pattern:**
```jsx
import { motion } from 'framer-motion';

function BookDetail() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* content */}
    </motion.div>
  );
}
```

**When:** Every route transition (library → book detail, book detail → back).

**Why:** Creates calm, continuous feel. Users track where content came from. Use subtle motion (20px, 300ms) to avoid distraction.

### Feature: Inline Search Filter

**Pattern:**
```jsx
import { useState, useDeferredValue, useMemo } from 'react';

function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredBooks = useMemo(() =>
    books.filter(book =>
      book.title.toLowerCase().includes(deferredQuery.toLowerCase())
    ),
    [books, deferredQuery]
  );

  return (
    <>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search books..."
      />
      <BookGrid books={filteredBooks} />
    </>
  );
}
```

**When:** Library view with 10+ books.

**Why:** Input stays responsive. Filter computation defers until user pauses typing. `useMemo` prevents recalculation on unrelated renders.

### Feature: Book Status/Notes Editing

**Pattern:**
```jsx
import { useForm } from 'react-hook-form';

function BookEditForm({ book, onSave }) {
  const { register, handleSubmit, formState: { isDirty } } = useForm({
    defaultValues: { status: book.status, notes: book.notes }
  });

  const onSubmit = (data) => onSave(book.id, data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('status')}>
        <option value="unread">Unread</option>
        <option value="reading">Reading</option>
        <option value="read">Read</option>
      </select>
      <textarea {...register('notes')} />
      <button disabled={!isDirty}>Save</button>
    </form>
  );
}
```

**When:** Book detail page editing.

**Why:** `register` handles change tracking. `isDirty` enables save button only when changed. Minimal re-renders. Validation can be added via HTML5 or zod.

### Feature: Modal/Dialog for Confirmations

**Pattern (Radix UI):**
```jsx
import * as Dialog from '@radix-ui/react-dialog';

function DeleteBookDialog({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded">
          <Dialog.Title>Remove book?</Dialog.Title>
          <Dialog.Description>This cannot be undone.</Dialog.Description>
          <button onClick={onConfirm}>Remove</button>
          <Dialog.Close asChild>
            <button>Cancel</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

**When:** Destructive actions (remove book from library).

**Why:** Radix handles focus trap, ESC to close, accessibility. You control styling completely with Tailwind.

### Feature: Calm Typography for Notes

**Pattern:**
```jsx
// tailwind.config.js
export default {
  plugins: [
    require('@tailwindcss/typography'),
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
          },
        },
      },
    },
  },
}

// Component
function BookNotes({ notes }) {
  return (
    <div className="prose prose-neutral prose-sm">
      {notes}
    </div>
  );
}
```

**When:** Displaying book notes/descriptions.

**Why:** `prose` class adds optimal line-height (1.7), max-width (65ch), spacing for readability. Customize via Tailwind config for calm aesthetic.

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| framer-motion@12.x | React 19.x | React 19 support added in 12.x. Use `^12.0.0` or higher. |
| react-hook-form@7.x | React 19.x | Works with React 19 but has known issues with React Compiler. Consider v8 beta if using React Compiler. |
| @radix-ui/react-*@latest | React 19.x, Tailwind CSS 4.x | React 19 support since Oct 2024. Tailwind 4 CSS specificity fixes in recent versions. |
| @headlessui/react@2.x | React 19.x, Tailwind CSS 4.x | v2.0 released for React 19. Official Tailwind Labs support for v4. |
| clsx@2.x | N/A | Framework-agnostic. No compatibility issues. |
| tailwind-merge@2.x | Tailwind CSS 4.x | Actively maintained for Tailwind v4 class merging rules. |

## Stack Philosophy: Calm & Minimal

**Principles:**

1. **Subtle motion over flashy animations.** Use 300ms transitions, 20px movement, ease-out easing. Never auto-play animations.

2. **Unstyled primitives over pre-styled components.** Radix/Headless give control. Pre-styled libraries (MUI, Chakra) impose aesthetic.

3. **Native browser features over libraries.** Use `loading="lazy"`, `useDeferredValue`, native `<select>` when sufficient. Add libraries only when you hit limitations.

4. **Typography-first design.** Reading journal = text-heavy. Invest in `@tailwindcss/typography` config. Use system fonts or single variable font (Inter, Public Sans).

5. **Minimal state management.** Context for theme/auth. Local state for everything else. External state library = premature optimization for this app size.

6. **Zero-config defaults.** framer-motion, react-hook-form, clsx work out-of-box. Avoid libraries requiring complex setup.

## Performance Budget

| Category | Budget | Current (MVP) | Notes |
|----------|--------|---------------|-------|
| JavaScript | <100kb gzipped | ~60kb | React 19 (43kb) + framer-motion (12kb) + react-hook-form (5kb if used) + Radix primitives (~5kb each) |
| CSS | <50kb | ~15kb | Tailwind CSS (purged) + custom styles |
| Images | Lazy loaded | N/A | Book covers from DatoCMS. Use `loading="lazy"` + responsive images. |

**Notes:**
- Vite tree-shaking removes unused code.
- Radix UI: Install only primitives you need (e.g., `@radix-ui/react-dialog` not `@radix-ui/react`).
- framer-motion can be code-split per route if bundle grows.

## Sources

**Animation:**
- [framer-motion npm](https://www.npmjs.com/package/framer-motion) — Version 12.34.0, React 19 support verified
- [Syncfusion: Top React Animation Libraries 2026](https://www.syncfusion.com/blogs/post/top-react-animation-libraries) — Comparison and recommendations
- [LogRocket: Best React Animation Libraries 2026](https://blog.logrocket.com/best-react-animation-libraries/) — framer-motion vs react-spring analysis

**UI Components:**
- [Radix UI Releases](https://www.radix-ui.com/themes/docs/overview/releases) — React 19 support, Tailwind CSS 4 compatibility notes
- [Headless UI v2.0 announcement](https://tailwindcss.com/blog/headless-ui-v2) — New features, React 19 support
- [Builder.io: Best React UI Libraries 2026](https://www.builder.io/blog/react-component-libraries-2026) — Unstyled vs styled comparison

**Forms:**
- [react-hook-form npm](https://www.npmjs.com/package/react-hook-form) — Version 7.71.1
- [Croct Blog: Best React Form Libraries 2026](https://blog.croct.com/post/best-react-form-libraries) — react-hook-form vs TanStack Form vs Formik
- [React Hook Form GitHub Discussion #11832](https://github.com/orgs/react-hook-form/discussions/11832) — React 19 compatibility discussion

**Search/Filtering:**
- [React Docs: useDeferredValue](https://react.dev/reference/react/useDeferredValue) — Official documentation
- [Amit Merchant: Natural Debouncing with useDeferredValue](https://www.amitmerchant.com/natural-debouncing-using-the-usedeferredvalue-hook-in-react-18/) — Pattern explanation
- [Refine: React Search Bar and Filtering](https://refine.dev/blog/react-search-bar-and-filtering/) — Implementation patterns

**Styling:**
- [clsx npm](https://www.npmjs.com/package/clsx) — Version 2.1.1, 311 bytes
- [Akhila Ariyachandra: Using clsx with tailwind-merge](https://akhilaariyachandra.com/blog/using-clsx-or-classnames-with-tailwind-merge) — Pattern explanation
- [Tailwind CSS Typography](https://github.com/tailwindlabs/tailwindcss-typography) — Official plugin

**State Management:**
- [Nucamp: State Management in 2026](https://www.nucamp.co/blog/state-management-in-2026-redux-context-api-and-modern-patterns) — Redux vs Context API vs Zustand comparison
- [Medium: Redux vs Zustand vs Context API in 2026](https://medium.com/@sparklewebhelp/redux-vs-zustand-vs-context-api-in-2026-7f90a2dc3439) — When to use each
- [Medium: React 19 State Management with Improved Context API](https://medium.com/@ignatovich.dm/react-19-state-management-with-improved-context-api-82bba332bb69) — React 19 Context improvements

**Images:**
- [freeCodeCamp: How to Lazy Load Images in React](https://www.freecodecamp.org/news/how-to-lazy-load-images-in-react/) — Native and library approaches
- [Transloadit: Lazy Loading for Images in React](https://transloadit.com/devtips/cdn-fotos/) — Performance benefits
- [Syncfusion: Top React Lazy-Loading Libraries](https://www.syncfusion.com/blogs/post/top-react-lazy-loading-libraries) — Library comparison

---
*Stack research for: Sadie Personal Library UI Enhancement*
*Researched: 2026-02-16*
*Confidence: HIGH for core recommendations, MEDIUM for form handling (React 19 Compiler issues in RHF v7)*
