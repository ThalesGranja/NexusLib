import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { BooksProvider } from './contexts/BooksContext.jsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import SearchForm from './components/SearchForm.jsx';
import BookList from './components/BookList.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import './App.css';

function AppContent() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const isLoggedArea = location.pathname === '/biblioteca' || location.pathname === '/favoritos';

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Nexus Library</h1>
        <p>Encontre os seus livros favoritos na nossa biblioteca digital</p>

        {user && isLoggedArea && (
          <nav style={{ marginTop: '20px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/biblioteca" className="logout-button">Biblioteca</Link>
            <Link to="/favoritos" className="logout-button">Favoritos</Link>
            <Link to="/" className="logout-button" onClick={handleLogout}>Sair</Link>
          </nav>
        )}
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/biblioteca"
            element={
              <ProtectedRoute>
                <>
                  <section className="search-section">
                    <SearchForm />
                  </section>
                  <section className="results-section">
                    <BookList />
                  </section>
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Nexus Library. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <AppContent />
      </BooksProvider>
    </AuthProvider>
  );
}

export default App;
