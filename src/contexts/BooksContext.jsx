import React, { createContext, useReducer } from 'react';

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

  const searchBooks = async (query) => {
    if (!query) return;

    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await response.json();

      dispatch({ type: 'FETCH_SUCCESS', payload: data.docs });

    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Erro ao buscar livros.' });
    }
  };

  return (
    <BooksContext.Provider value={{ ...state, searchBooks }}>
      {children}
    </BooksContext.Provider>
  );
};