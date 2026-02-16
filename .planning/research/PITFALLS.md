# Pitfalls Research

**Domain:** React UI Redesign & Refactoring with Design System
**Researched:** 2026-02-16
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Hardcoded Values Escaping Into Components During Redesign

**What goes wrong:**
During UI redesign, developers apply new colors, spacing, and typography values directly in components (e.g., `bg-blue-600`, `text-lg`, `px-4`) rather than using design tokens. This creates a fragmented design system where some components use tokens while refactored components use arbitrary values. Six months later, when the brand color changes, you find hardcoded values scattered across 50+ components.

**Why it happens:**
Speed pressure during redesign encourages copy-paste from Figma/design mocks. Developers eyeball "close enough" values rather than mapping to system tokens. Without lint rules blocking non-token classes, nothing prevents drift.

**How to avoid:**
- Define all design tokens FIRST before touching components (Tailwind v4 `@theme` or CSS variables)
- Create custom Tailwind classes that enforce token usage (e.g., `text-heading-lg` not `text-2xl`)
- Add ESLint rules blocking arbitrary values and non-system classes
- Use Tailwind's `safelist` to explicitly allow only token-based classes
- Refactor in waves: identify global patterns, replace with tokens, verify old values are gone

**Warning signs:**
- PRs with inline color hex values or arbitrary spacing (`px-[23px]`)
- Multiple shades of "similar" colors across components
- Designers saying "that's not the right blue"
- Inconsistent spacing between similar UI elements

**Phase to address:**
Phase 1 (Design System Foundation) - Must establish tokens before any component refactoring begins.

---

### Pitfall 2: Breaking Existing Functionality While Changing Visual Styles

**What goes wrong:**
Refactoring component JSX to match new designs accidentally removes critical functionality. Example: changing a button from generic Tailwind to a custom design system button loses its onClick handler, disabled state, or loading indicator. QA catches some issues, but edge cases (like keyboard navigation or error states) slip through and break in production.

**Why it happens:**
Focus on visual changes overshadows functional requirements. Developers test the happy path but miss edge cases that the old component handled. No visual regression testing means unintended layout shifts aren't caught. The "it looks right" mentality replaces "it works right."

**How to avoid:**
- NEVER refactor component behavior and visuals simultaneously
- Add React Testing Library tests for component behavior BEFORE redesigning
- Use Storybook to document all component states (loading, error, disabled, empty)
- Implement visual regression testing with Chromatic before starting redesign
- Create a checklist: "Does new component handle all states old component did?"
- Verify keyboard navigation, focus management, and accessibility in refactored components

**Warning signs:**
- User reports of "buttons not working" after UI updates
- Missing loading states in redesigned components
- Form submissions failing silently
- Console errors about undefined props after refactoring
- Keyboard users unable to navigate redesigned UI

**Phase to address:**
Phase 0 (Testing Infrastructure) - Add tests and visual regression tooling before any refactoring. Phase 2+ (Component Refactoring) must verify functionality in every component.

---

### Pitfall 3: Inconsistent Component API Changes Creating Cascade Failures

**What goes wrong:**
While refactoring components for the new design, you "improve" component APIs (renaming props, changing prop structures, reordering parameters). This breaks every consumer of that component. Example: Dashboard uses `<BookCard book={book} />`, you refactor to `<BookCard title={book.title} author={book.author} cover={book.cover} />`, Dashboard breaks. You fix Dashboard, but PublicCatalog also breaks, and you don't discover it until deployment.

**Why it happens:**
Lack of TypeScript means no compiler errors when APIs change. No component inventory means you don't know all consumers. The urge to "do it right this time" leads to gratuitous API changes. Refactoring multiple components in parallel creates merge conflicts and missed updates.

**How to avoid:**
- Adopt TypeScript immediately - compiler errors catch breaking API changes
- Create a component dependency map before refactoring (what uses what)
- Preserve component APIs during visual redesign - behavior changes come later
- Use the Adapter Pattern: wrap old components with new UI, keep same props
- Refactor one component at a time, verify all consumers work
- Add integration tests for critical user flows (login → view library → add book)

**Warning signs:**
- PropTypes warnings in console after component updates
- "Cannot read property X of undefined" errors
- Components rendering empty/blank after refactor
- Multiple "fix: update props after refactor" commits
- QA finding broken pages developers "didn't touch"

**Phase to address:**
Phase 0 (Foundation) - Add TypeScript. Phase 2+ (Component Refactoring) - Preserve APIs, refactor visuals only.

---

### Pitfall 4: Custom Elements (`<el-tab-group>`, `<el-disclosure>`) Silently Failing

**What goes wrong:**
Your codebase has non-functional custom elements like `<el-tab-group>`, `<el-disclosure>`, `<el-tab-panels>` mixed with React JSX. These render as unknown HTML elements, don't provide interactivity, and don't throw errors. During redesign, developers assume these work, style them, and ship. Users click tabs that don't switch panels, disclosure sections that don't expand.

**Why it happens:**
Copy-pasted Headless UI or Catalyst examples that use Web Components or custom template syntax. Developers mistake these for valid React components. No runtime errors because browsers allow unknown elements. Lack of testing means non-functional UI ships.

**How to avoid:**
- Audit codebase for `<el-*>` and `<x-*>` elements - these aren't React components
- Replace with proper React implementations (Radix UI, Headless UI, or native HTML + state)
- Add ESLint rule to block unknown element names
- Test interactive elements in all refactored components
- If keeping Web Components, register them properly and ensure they work

**Warning signs:**
- Clicking interactive UI elements does nothing
- Elements in DevTools showing as generic `<el-disclosure>` not `<button>`
- No event handlers attached to custom elements
- Browser treating elements as `display: inline` by default

**Phase to address:**
Phase 1 (Foundation) - Audit and remove or replace non-functional custom elements before visual redesign begins.

---

### Pitfall 5: Scattered Token Management Leading to Auth/API Token Confusion

**What goes wrong:**
You're refactoring UI while also cleaning up tech debt. "Token management" becomes ambiguous - are we refactoring design tokens (colors, spacing) or auth tokens (localStorage, Authorization headers)? Auth logic gets accidentally removed during component cleanup. Or worse, design token constants overshadow auth token variables, creating naming conflicts.

**Why it happens:**
Overloaded terminology. Auth token logic scattered across components means refactoring touches it accidentally. No clear separation between API concerns and UI concerns in component files.

**How to avoid:**
- Use distinct naming: "design tokens" and "auth credentials" or "access tokens"
- Extract all auth logic into a custom hook (`useAuth`) BEFORE redesigning components
- Move API calls out of components into service layer before visual changes
- Create clear file structure: `/tokens/design.ts` for design, `/lib/auth.ts` for authentication
- Never refactor API integration and UI simultaneously

**Warning signs:**
- localStorage.getItem('token') calls inside render logic
- Components breaking after "harmless" UI changes
- Auth headers missing after component refactor
- Confusion in PR comments about what "tokens" means

**Phase to address:**
Phase 0 (Tech Debt) - Extract auth logic, centralize API calls. Phase 1 (Design System) - Establish design tokens. Keep these separate.

---

### Pitfall 6: The "Calm and Minimal" Design Hiding Critical User Feedback

**What goes wrong:**
Pursuing "calm and minimal" aesthetic removes loading indicators, error messages, and success feedback. Forms submit with no indication of success. Errors fail silently. Users click buttons repeatedly because there's no visual feedback. The app feels broken despite working correctly underneath.

**Why it happens:**
Overemphasis on visual cleanliness. Designers remove "noisy" elements like spinners and toasts. Developers implement exactly what mockups show, missing feedback states. Users confuse minimalism with bugs.

**How to avoid:**
- Document ALL states in design system: idle, loading, success, error, disabled, empty
- Require designs for loading and error states before implementing any feature
- Use subtle feedback (progress indicators, disabled states) that fits minimal aesthetic
- Add `aria-live` regions for screen reader announcements even if visual feedback is subtle
- Test with real users on slow connections - does the UI feel responsive?

**Warning signs:**
- User reports: "I clicked but nothing happened"
- Multiple form submissions due to missing loading states
- Users unaware of errors (forms fail silently)
- No way to distinguish interactive from non-interactive elements
- Empty states that look identical to loading states

**Phase to address:**
Phase 1 (Design System) - Define feedback patterns. Phase 2+ (Component Refactoring) - Every interactive component must have loading/error/success states.

---

### Pitfall 7: No Error Boundaries Means UI Crashes Destroy Entire App

**What goes wrong:**
A small error in one refactored component (malformed book data, missing cover URL, null reference) crashes the entire React tree. Users see blank screens instead of useful fallback UI. Errors aren't logged, so you don't know what broke until users complain.

**Why it happens:**
React 19 apps without Error Boundaries show white screen of death on any error. Refactoring increases error risk (new code paths, changed data structures). Developers assume "it won't error" rather than "when it errors, what happens?"

**How to avoid:**
- Add root-level Error Boundary before any refactoring begins
- Use React 19's `onCaughtError` and `onUncaughtError` for centralized error reporting
- Add Error Boundaries around major features (Dashboard, PublicCatalog, BookDetail)
- Use `react-error-boundary` library for better DX and error recovery
- Log errors to service (Sentry, LogRocket) so you know when things break
- Design calm, minimal error fallback UI that matches design system

**Warning signs:**
- Blank screens when errors occur
- Console full of errors but no user-facing error UI
- Unable to reproduce user-reported "page won't load" issues
- Errors in one component breaking entire page

**Phase to address:**
Phase 0 (Foundation) - Add error boundaries and error logging before refactoring any components.

---

### Pitfall 8: Incremental Refactor Without Strategy Becomes Partial Rewrite

**What goes wrong:**
You start refactoring "just the Dashboard," but realize it shares components with PublicCatalog. So you refactor those too. Which breaks BookDetail. Six months later, you've touched every component, introduced bugs, but never finished the redesign. The app is a mix of old and new styles, and you've lost momentum.

**Why it happens:**
No clear refactoring scope or phase boundaries. Perfectionism drives expanding scope. Lack of component dependency map means surprises. Refactoring in large batches causes merge conflicts and quality issues.

**How to avoid:**
- Create component dependency tree BEFORE starting
- Define clear phase boundaries: Phase 1 = system, Phase 2 = Dashboard only, Phase 3 = PublicCatalog
- Use feature flags to ship partial redesigns without visual inconsistency
- Refactor leaf components first (no dependencies), then work up the tree
- Each phase must ship working software with visible user value
- Accept temporary style inconsistency between phases rather than trying to do everything at once

**Warning signs:**
- Refactoring PRs that "just keep growing"
- Merge conflicts on every branch
- Unclear when "redesign" will be "done"
- QA unable to test because "it's not finished yet"
- Stakeholder frustration with slow progress

**Phase to address:**
Phase 0 (Planning) - Map dependencies, define phase scope. Every subsequent phase has clear boundaries and ships independently.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip TypeScript, keep JavaScript | Faster initial refactoring | Runtime errors, no IDE autocomplete, API changes break silently | Never - TypeScript prevents cascade failures |
| Hardcode API URLs in components | Quick to implement | Impossible to deploy to staging/production, breaks local dev for team | Never - use .env from day one |
| Skip tests during refactor | Ship faster, "we'll add them later" | Regressions slip through, fear of changing code, "later" never comes | Never during refactoring - tests catch breaks |
| Copy-paste component logic instead of extracting | Faster than thinking through abstractions | Bugs require fixing in 5 places, inconsistent behavior, bloated bundle | Acceptable for MVP to validate, must refactor after |
| Use arbitrary Tailwind values | Matches design pixel-perfect quickly | Inconsistent spacing/colors, impossible to update theme globally | Never - define tokens first |
| Skip Storybook for component dev | One less tool to learn | No component inventory, testing in prod, designers can't review in progress | Acceptable for solo projects, required for teams |
| Refactor behavior + visuals together | Fewer total PRs | High risk of breaking changes, hard to review, impossible to identify cause of bugs | Never - separate concerns |
| No error boundaries | Fewer components to maintain | White screen of death on any error, terrible user experience, no error visibility | Never - especially during refactors |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| API calls | Hardcoding `http://localhost:3000` in components | Use environment variables: `VITE_API_URL` accessed via `import.meta.env.VITE_API_URL` (Vite syntax) |
| Auth tokens | `localStorage.getItem('token')` scattered across components | Centralize in `useAuth` hook, provide token via context or axios interceptor |
| Image URLs | Assuming all books have `cover.url` property | Defensive: `cover?.url \|\| PLACEHOLDER_IMAGE_URL`, test with missing data |
| API error handling | `.catch(err => console.error(err))` without user feedback | Surface errors in UI, use Error Boundaries for rendering errors, log to service |
| CORS in development | Proxying through Vite dev server without documenting | Document proxy config in README, ensure works for entire team |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Re-fetching library on every render | Spinner flashing, high API usage | Use React Query or SWR for caching, add loading states properly | >100 books or slow network |
| No image optimization | Slow page loads, layout shift | Use responsive images, lazy loading, proper sizing | High-res covers on mobile |
| Inline functions in render | Re-renders triggering child re-renders | Use `useCallback` for handlers passed to children, memoize expensive computations | Deep component trees, frequent updates |
| Fetching all books at once | Initial load time grows linearly | Add pagination or infinite scroll | >50 books in library |
| No code splitting | Large initial bundle | Use React.lazy for routes, dynamic imports for heavy features | Bundle >500KB |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Auth token in URL params | Token leaks in browser history, logs, referer headers | Always use Authorization header, never query string |
| No token expiration handling | Users kicked out mid-session with no warning | Implement token refresh, handle 401 responses gracefully |
| Exposing API keys in frontend | Keys stolen via browser DevTools | Never put secrets in React - use backend proxy for external APIs |
| Missing HTTPS enforcement | Man-in-the-middle attacks steal tokens | Ensure production uses HTTPS, fail hard if not |
| Client-side only auth check | User manipulates localStorage to "log in" | Always verify auth on backend, frontend checks are UX only |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No empty states in library | User sees blank page, thinks app broken | Design empty state: "No books yet. Add your first book!" |
| Missing loading states | User unsure if click worked, clicks again | Show loading spinner, disable button during action |
| Silent error handling | Form fails, user doesn't know why | Show error message: "Failed to add book: [reason]" |
| No confirmation on destructive action | User accidentally removes book | Confirm: "Remove 'Book Title' from library?" before deletion |
| Broken keyboard navigation | Keyboard users can't use app | Test with Tab key, ensure focus visible, proper focus management in modals |
| No optimistic updates | App feels slow despite fast API | Update UI immediately, rollback on error |
| Inconsistent button states | Some buttons disable while loading, others don't | All action buttons should show loading/disabled states consistently |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Interactive components:** Custom elements (`<el-*>`) replaced with functional React components - verify by testing interactivity
- [ ] **Design tokens:** All colors/spacing use system tokens, not arbitrary values - verify with ESLint rules or manual audit
- [ ] **Error states:** Every API call has error handling and user-facing error UI - verify by simulating network failures
- [ ] **Loading states:** Every async action shows loading indicator and disables controls - verify by throttling network in DevTools
- [ ] **Empty states:** Collections (library, search results) have designed empty states - verify by testing with empty data
- [ ] **Accessibility:** Keyboard navigation works, proper focus management, semantic HTML - verify with keyboard-only navigation
- [ ] **Responsive design:** Works on mobile, tablet, desktop - verify in DevTools device mode
- [ ] **Error boundaries:** React Error Boundaries present at route and feature level - verify by throwing test errors
- [ ] **Environment variables:** API URLs and config come from .env, not hardcoded - verify by checking source code
- [ ] **Type safety:** TypeScript with no `any` types, proper prop types - verify with `tsc --noEmit`

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Hardcoded values in 50+ components | MEDIUM | Use find-replace with regex to identify patterns, create tokens, migrate in waves with ESLint rules |
| Broke functionality in refactored component | LOW | Git revert, add tests for expected behavior, refactor again with tests passing |
| Inconsistent component APIs | HIGH | Add TypeScript to catch breaks, create compatibility layer/adapter, migrate consumers gradually |
| Custom elements don't work | MEDIUM | Identify all `<el-*>` elements, replace with Radix UI or Headless UI equivalents, test interactivity |
| Auth token issues after refactor | LOW | Extract auth to `useAuth` hook, replace scattered `localStorage` calls, test login/logout/API calls |
| No error boundaries in production | LOW | Add `react-error-boundary` to root and feature areas, deploy immediately, add error logging |
| Incremental refactor lost direction | HIGH | Stop, create component map, define clear phases, finish one phase before starting next |
| User-reported bugs in "redesigned" features | MEDIUM | Add Error Boundaries to catch unknown errors, add Sentry for production monitoring, prioritize test coverage |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Hardcoded values | Phase 1: Design System Foundation | ESLint rules pass, all colors come from theme config |
| Breaking functionality | Phase 0: Testing Infrastructure | Tests pass before and after refactor |
| Inconsistent component APIs | Phase 0: Add TypeScript | TypeScript compiler errors on API changes |
| Custom elements fail | Phase 1: Foundation Audit | Interactive elements work, no `<el-*>` in codebase |
| Scattered token management | Phase 0: Tech Debt Cleanup | Auth in hooks, API in services, design tokens in theme |
| Missing user feedback | Phase 1: Design System Feedback States | Every interactive element has loading/error/success states |
| No error boundaries | Phase 0: Error Infrastructure | Errors show fallback UI instead of blank screen |
| Refactor scope creep | Phase 0: Planning & Mapping | Component dependency map exists, phase boundaries clear |

---

## Sources

### Critical Pitfalls Research
- [Common Sense Refactoring of a Messy React Component](https://alexkondov.com/refactoring-a-messy-react-component/)
- [Building Reusable React Components in 2026](https://medium.com/@romko.kozak/building-reusable-react-components-in-2026-a461d30f8ce4)
- [Common Beginner Mistakes with React - Josh W. Comeau](https://www.joshwcomeau.com/react/common-beginner-mistakes/)
- [10 mistakes React developers make - LogRocket Blog](https://blog.logrocket.com/10-mistakes-react-developers-make/)
- [33 React JS Best Practices For 2026 | Technostacks](https://technostacks.com/blog/react-best-practices/)

### Design System Integration
- [Don't use Tailwind for your Design System | sancho.dev](https://sancho.dev/blog/tailwind-and-design-systems)
- [Tailwind CSS Best Practices 2025-2026: Design Tokens](https://www.frontendtools.tech/blog/tailwind-css-best-practices-design-system-patterns)
- [Tailwind CSS v4: The Complete Guide for 2026](https://devtoolbox.dedyn.io/blog/tailwind-css-v4-complete-guide)
- [How to Build a Design Token System for Tailwind That Scales Forever](https://hexshift.medium.com/how-to-build-a-design-token-system-for-tailwind-that-scales-forever-84c4c0873e6d)
- [React Design System – Where to Start? | UXPin](https://www.uxpin.com/studio/blog/react-design-system/)

### Component Refactoring & Breaking Changes
- [React v19 – React](https://react.dev/blog/2024/12/05/react-19)
- [I Tracked Every Breaking Change in React for 2 Years](https://medium.com/@sohail_saifi/i-tracked-every-breaking-change-in-react-for-2-years-heres-the-hidden-pattern-2877df33e626)
- [React Stack Patterns](https://www.patterns.dev/react/react-2026/)

### Error Boundaries
- [How to Implement Error Boundaries for Graceful Error Handling in React](https://oneuptime.com/blog/post/2026-01-15-react-error-boundaries/view)
- [Error Boundaries – React](https://legacy.reactjs.org/docs/error-boundaries.html)
- [React 19 Resilience: Retry, Suspense & Error Boundaries](https://medium.com/@connect.hashblock/react-19-resilience-retry-suspense-error-boundaries-40ea504b09ed)
- [react-error-boundary - npm](https://www.npmjs.com/package/react-error-boundary)

### Refactor vs Rewrite
- [Refactor vs Rewrite: Best Strategy to Modernize Software](https://imaginovation.net/blog/refactor-vs-rewrite-modernization-strategy-guide/)
- [Understanding legacy application rewrite vs. refactor tradeoffs](https://testdouble.com/insights/understanding-legacy-application-rewrite-vs-refactor-tradeoffs)
- [Good Refactoring vs Bad Refactoring](https://www.builder.io/blog/good-vs-bad-refactoring)
- [The Risks of Rewrites - Rewrite or Refactor](https://www.bennorthrop.com/rewrite-or-refactor-book/chapter-2-the-risks-of-rewrites.php)

### Visual Regression Testing
- [How to Implement Visual Regression Testing for React with Chromatic](https://oneuptime.com/blog/post/2026-01-15-visual-regression-testing-react-chromatic/view)
- [Visual testing for Storybook • Chromatic](https://www.chromatic.com/storybook)
- [Visual tests | Storybook docs](https://storybook.js.org/docs/writing-tests/visual-testing)

### Environment Variables & API Configuration
- [Daily Discovery: Using Environment Variables for API Endpoint Refactor (React.js)](https://medium.com/@jordan1trickett/daily-discovery-using-environment-variables-for-api-endpoint-refactor-react-js-a6772800987e)
- [Handling runtime environment variables in create-react-apps](https://blog.risingstack.com/create-react-app-runtime-env-cra/)
- [Working with Environment Variables in React](https://blog.openreplay.com/working-with-environment-variables-in-react/)

---
*Pitfalls research for: Sadie Personal Book Library UI Redesign*
*Researched: 2026-02-16*
