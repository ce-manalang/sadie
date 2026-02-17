export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        {/* Open book icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="font-display text-2xl text-gray-900 mb-3">
          Something went wrong
        </h1>

        {/* Body */}
        <p className="text-gray-600 leading-relaxed mb-8">
          Your books are safe. We hit a snag loading this page.
        </p>

        {/* Retry button */}
        <button
          onClick={resetErrorBoundary}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-card transition-colors duration-200 font-medium"
        >
          Try again
        </button>

        {/* Error details in dev mode */}
        {import.meta.env.DEV && error && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              Error details (dev only)
            </summary>
            <pre className="mt-2 text-xs text-red-600 overflow-auto p-4 bg-red-50 rounded-card">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
