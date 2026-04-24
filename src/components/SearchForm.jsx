import React, { useState, useContext } from 'react';
import { BooksContext } from '../contexts/BooksContext';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState('');
  const { searchBooks, loading, error } = useContext(BooksContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim() === '') {
      setValidationError('O título do livro é obrigatório para a busca.');
      return;
    }

    setValidationError('');
    searchBooks(query);
  };

  return (
    <div style={{ margin: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome do livro..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Pesquisar'}
        </button>
      </form>


      {validationError && <p style={{ color: 'orange' }}>{validationError}</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SearchForm;