import React, { useState, useEffect } from 'react';
import api from '../api';

const PLACEHOLDER_COVER = 'https://via.placeholder.com/150x200?text=Sem+Capa';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFavorites = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/favorites');
      setFavorites(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar favoritos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (favoriteId) => {
    try {
      await api.delete(`/favorites/${favoriteId}`);
      setFavorites((prev) => prev.filter((book) => book.favoriteId !== favoriteId));
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao remover favorito.');
    }
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Carregando favoritos...</p>;

  if (error) return <p style={{ textAlign: 'center', color: '#e74c3c' }}>{error}</p>;

  return (
    <section className="results-section">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Meus Livros Favoritos</h2>

      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Você ainda não tem livros favoritos. Pesquise e favorite alguns!</p>
      ) : (
        <div className="book-grid">
          {favorites.map((book) => (
            <div className="book-card" key={book.favoriteId}>
              <img src={book.coverUrl || PLACEHOLDER_COVER} alt={`Capa do livro ${book.title}`} />
              <h3>{book.title}</h3>
              <p><strong>Autor:</strong> {book.author || 'Autor desconhecido'}</p>
              <p><strong>Ano:</strong> {book.year || 'N/A'}</p>
              <button onClick={() => handleRemove(book.favoriteId)}>Remover dos Favoritos</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;
