import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom'; // Importado o useLocation
import { BooksProvider } from './contexts/BooksContext.jsx';
import SearchForm from './components/SearchForm.jsx';
import BookList from './components/BookList.jsx';
import Login from './components/Login.jsx';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <BooksProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Nexus Library</h1>
          <p>Encontre os seus livros favoritos na nossa biblioteca digital</p>

          {location.pathname === '/biblioteca' && (
            <nav style={{ marginTop: '20px' }}>
              <Link to="/" className="logout-button">
                Sair
              </Link>
            </nav>
          )}
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/biblioteca" element={
              <>
                <section className="search-section">
                  <SearchForm />
                </section>
                <section className="results-section">
                  <BookList />
                </section>
              </>
            } />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Nexus Library. Todos os direitos reservados.</p>
        </footer>
      </div>
    </BooksProvider>
  );
}

export default App;