import React, { createContext, useReducer } from 'react';
import api from '../api';

export const BooksContext = createContext();

const initialState = {
  books: null,
  loading: false,
  error: null,
};

function booksReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, books: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, initialState);

  // Busca livros atraves do backend (rota /api/search), que por sua vez
  // consulta a Open Library. Isso mantem a comunicacao do front-end
  // restrita ao back-end via HTTP, conforme exigido na proposta.
  const searchBooks = async (query) => {
    if (!query) return;

    dispatch({ type: 'FETCH_START' });
    try {
      const response = await api.get('/search', { params: { title: query } });
      dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
    } catch (err) {
      const message = err.response?.data?.message || 'Erro ao buscar livros.';
      dispatch({ type: 'FETCH_ERROR', payload: message });
    }
  };

  return (
    <BooksContext.Provider value={{ ...state, searchBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
