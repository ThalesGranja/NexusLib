import React from 'react';
import { BooksProvider } from './contexts/BooksContext.jsx';
import SearchForm from './components/SearchForm.jsx';
import BookList from './components/BookList.jsx';
import './App.css'

function App() {
  return (
    <BooksProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Nexus Library</h1>
          <p>Encontre os seus livros favoritos na nossa biblioteca digital</p>
        </header>

        <main className="app-main">
          <section className="search-section">
            <SearchForm />
          </section>

          <section className="results-section">
            <BookList />
          </section>
        </main>

        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Nexus Library. Todos os direitos reservados.</p>
        </footer>
      </div>
    </BooksProvider>
  );
}

export default App;