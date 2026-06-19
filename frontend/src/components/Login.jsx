import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const result = await login(email, password);

    setSubmitting(false);

    if (result.success) {
      navigate('/biblioteca');
    } else {
      setError(result.message);
    }
  };

  return (
    <section className="login-section">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p style={{ color: '#e74c3c', textAlign: 'center', margin: 0 }}>{error}</p>}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Entrando...' : 'Entrar na Biblioteca'}
        </button>
      </form>
    </section>
  );
};

export default Login;
