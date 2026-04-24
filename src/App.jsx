import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { BooksProvider } from './contexts/BooksContext.jsx';
import SearchForm from './components/SearchForm.jsx';
import BookList from './components/BookList.jsx';
import Login from './components/Login.jsx';
import './App.css';

function App() {
  return (
    <BooksProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Nexus Library</h1>
          <p>Encontre os seus livros favoritos na nossa biblioteca digital</p>
          <nav style={{ marginTop: '20px' }}>
            <Link to="/" style={{ color: 'white', marginRight: '15px' }}>Biblioteca</Link>
            <Link to="/login" style={{ color: 'white' }}>Sair / Login</Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            {/* Rota da Biblioteca (Conteúdo atual) */}
            <Route path="/" element={
              <>
                <section className="search-section">
                  <SearchForm />
                </section>
                <section className="results-section">
                  <BookList />
                </section>
              </>
            } />

            {/* Nova Rota de Login */}
            <Route path="/login" element={<Login />} />
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