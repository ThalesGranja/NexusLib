import React, { useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';
import BookCard from './BookCard';

const BookList = () => {
  const { books, loading, error } = useContext(BooksContext);

  if (loading) return <p style={{ textAlign: 'center' }}>Carregando livros...</p>;

  if (error) return null;

  if (!books || books.length === 0) {
    return <p style={{ textAlign: 'center' }}>Nenhum livro encontrado. Tente outra busca.</p>;
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
};

export default BookList;