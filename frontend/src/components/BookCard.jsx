import React, { useState } from 'react';
import api from '../api';

const PLACEHOLDER_COVER = 'https://via.placeholder.com/150x200?text=Sem+Capa';

const BookCard = ({ book }) => {
  const [status, setStatus] = useState('idle'); // idle | saving | saved | error
  const [feedback, setFeedback] = useState('');

  const handleFavorite = async () => {
    setStatus('saving');
    setFeedback('');

    try {
      await api.post('/favorites', {
        title: book.title,
        author: book.author,
        year: book.year,
        coverUrl: book.coverUrl,
        openLibraryId: book.openLibraryId,
      });
      setStatus('saved');
      setFeedback('Adicionado aos favoritos!');
    } catch (error) {
      setStatus('error');
      setFeedback(error.response?.data?.message || 'Erro ao favoritar.');
    }
  };

  return (
    <div className="book-card">
      <img src={book.coverUrl || PLACEHOLDER_COVER} alt={`Capa do livro ${book.title}`} />
      <h3>{book.title}</h3>
      <p><strong>Autor:</strong> {book.author || 'Autor desconhecido'}</p>
      <p><strong>Ano:</strong> {book.year || 'N/A'}</p>

      <button onClick={handleFavorite} disabled={status === 'saving' || status === 'saved'}>
        {status === 'saved' ? '★ Favoritado' : status === 'saving' ? 'Favoritando...' : '☆ Favoritar'}
      </button>

      {feedback && (
        <p style={{ fontSize: '0.8rem', color: status === 'error' ? '#e74c3c' : '#27ae60', marginTop: '6px' }}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default BookCard;
