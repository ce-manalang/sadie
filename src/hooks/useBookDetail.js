import { useState, useEffect } from 'react';
import sam from '../api/samClient';

export function useBookDetail(bookId) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await sam.get(`/books/${bookId}`);
        setBook(res.data);
      } catch (err) {
        console.error("Error fetching book details", err);
        setError(err.response?.data?.error || "Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  const addToLibrary = async () => {
    setAdding(true);
    try {
      await sam.post('/library_books', {
        library_book: {
          dato_book_id: bookId,
          status: 'to-read'
        }
      });
      // Refetch book data to get updated library status
      const res = await sam.get(`/books/${bookId}`);
      setBook(res.data);
      return { success: true };
    } catch (err) {
      console.error("Error adding to library", err);
      return {
        success: false,
        error: err.response?.data?.error || "Failed to add to library"
      };
    } finally {
      setAdding(false);
    }
  };

  return {
    book,
    loading,
    error,
    addToLibrary,
    adding
  };
}
