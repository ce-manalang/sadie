# Testing Patterns

**Analysis Date:** 2026-02-16

## Test Framework

**Runner:**
- Not configured
- No test framework installed (Jest, Vitest, etc.)

**Assertion Library:**
- Not configured

**Run Commands:**
- No test commands defined in `package.json`
- Testing not set up for this project

## Test File Organization

**Location:**
- No test files present in codebase
- Search for `*.test.*` and `*.spec.*` files returned no results (excluding node_modules)

**Naming:**
- Not applicable - no tests present

**Structure:**
- Not applicable - no tests present

## Current Testing Status

**Zero test coverage:** The project currently has no automated tests.

**Why this matters:**
- All functionality relies on manual testing
- No safeguards against regressions
- Components cannot be tested in isolation from the backend API
- State changes, data fetching, and error handling are untested

## Mocking

**Framework:** Not configured

**What to Mock (when tests are added):**
- Axios calls to the backend API at `http://localhost:3000`
- `localStorage` for token persistence
- `window.confirm()` for destructive actions (remove book confirmation)
- Router hooks from `react-router-dom` (useParams, useNavigate)

**Patterns for future implementation:**
```javascript
// Example pattern for mocking axios
jest.mock('axios');
axios.get.mockResolvedValue({ data: mockBookData });

// Example pattern for mocking localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
global.localStorage = localStorageMock;
```

## Test Data & Fixtures

**Current State:**
- No fixtures or test factories
- API responses used directly from backend

**Recommendations for fixtures:**
```javascript
// Suggested location: src/__fixtures__/books.js
export const mockBook = {
  id: 1,
  title: 'Test Book',
  author: 'Test Author',
  isbn: '123-456-789',
  description: 'A test book',
  cover: { url: 'https://example.com/cover.jpg' },
  tags: 'fiction,test',
  in_library: false,
};

export const mockLibraryBook = {
  ...mockBook,
  in_library: true,
  library_status: 'to-read',
  library_notes: '',
};
```

## Coverage

**Requirements:** None enforced

**Current Coverage:** 0% - no tests

## Test Types

**Unit Tests (to implement):**
- Component rendering with various props
- Handler function behavior (addToLibrary, handleRemoveBook)
- State updates triggered by user interactions
- Error state rendering

**Integration Tests (to implement):**
- Full data flow: fetch → display → update
- Login flow: form submission → token storage → navigation
- Add to library flow: button click → API call → state update
- Remove from library flow: confirmation → API call → UI update

**E2E Tests:**
- Not configured
- Could use Cypress or Playwright to test full user workflows

## Error Testing Patterns

**Current error handling that needs tests:**
- Fetch failures with error messages displayed
- Network timeouts handled gracefully
- Missing/invalid responses (null checks)
- Authentication failures (missing token, invalid credentials)

**Example pattern for future error testing:**
```javascript
test('displays error message on failed fetch', async () => {
  axios.get.mockRejectedValue({
    response: { data: { error: 'Book not found' } }
  });

  render(<BookDetail />);

  await waitFor(() => {
    expect(screen.getByText('Book not found')).toBeInTheDocument();
  });
});
```

## Async Testing Patterns

**Current async operations:**
- All data fetching via axios in useEffect hooks
- Button actions trigger async state updates

**Example pattern for future async testing:**
```javascript
test('loads book data on mount', async () => {
  const mockBook = { id: 1, title: 'Test Book' };
  axios.get.mockResolvedValue({ data: mockBook });

  render(<BookDetail />);

  expect(screen.getByText(/Loading/)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Test Book')).toBeInTheDocument();
  });
});
```

## Components Needing Tests

**High Priority:**
- `BookDetail.jsx` (`/Volumes/Workspace/weekend/sadie/src/components/BookDetail.jsx`)
  - Data fetching on mount
  - Add to library flow
  - Error states and loading states
  - Conditional rendering (in_library vs not_in_library)

- `Dashboard.jsx` (`/Volumes/Workspace/weekend/sadie/src/components/Dashboard.jsx`)
  - Library books listing
  - Remove book confirmation and deletion
  - Empty state rendering

- `Login.jsx` (`/Volumes/Workspace/weekend/sadie/src/components/Login.jsx`)
  - Form submission
  - Token storage
  - Navigation after successful login
  - Error handling

**Medium Priority:**
- `PublicCatalog.jsx` (`/Volumes/Workspace/weekend/sadie/src/components/PublicCatalog.jsx`)
  - Books list rendering
  - Loading state
  - Error handling

- `App.jsx` (`/Volumes/Workspace/weekend/sadie/src/App.jsx`)
  - Token initialization from localStorage
  - Navigation between routes
  - Logout functionality
  - Conditional rendering (authenticated vs unauthenticated)

## Testing Setup Recommendations

**For implementation:**
1. Install testing framework: `npm install --save-dev vitest @testing-library/react @testing-library/jest-dom`
2. Add test config: `vitest.config.js`
3. Add test scripts to package.json:
   ```json
   {
     "test": "vitest",
     "test:ui": "vitest --ui",
     "test:coverage": "vitest --coverage"
   }
   ```
4. Create test files alongside components (e.g., `BookDetail.test.jsx`)
5. Set up fixtures in `src/__fixtures__/` directory
6. Mock axios and localStorage globally in test setup

---

*Testing analysis: 2026-02-16*
