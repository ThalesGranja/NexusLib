import React from 'react';

const BookCard = ({ book }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/150x200?text=Sem+Capa';

  return (
    <div className="book-card">
      <img src={coverUrl} alt={`Capa do livro ${book.title}`} />
      <h3>{book.title}</h3>
      <p><strong>Autor:</strong> {book.author_name ? book.author_name.join(', ') : 'Autor desconhecido'}</p>
      <p><strong>Ano:</strong> {book.first_publish_year || 'N/A'}</p>

      <button style={{ marginTop: '10px', padding: '5px', fontSize: '0.8rem' }}>
        Ver detalhes
      </button>
    </div>
  );
};

export default BookCard;