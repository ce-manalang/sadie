import { useState, useEffect, useCallback } from 'react';
import sam from '../api/samClient';

export function useLibraryBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await sam.get('/library_books');
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching library books", err);
      setError(err.response?.data?.error || "Failed to load library books");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const removeBook = async (bookId) => {
    try {
      await sam.delete(`/library_books/${bookId}`);
      // Optimistically remove from state
      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
      return { success: true };
    } catch (err) {
      console.error("Error removing book", err);
      return {
        success: false,
        error: err.response?.data?.error || "Failed to remove book"
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
