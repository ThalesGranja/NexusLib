import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    navigate('/');
  };

  return (
    <section className="login-section">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar na Biblioteca</button>
        <p><strong>Apenas clique no botão de entrar, não há Backend ainda para validação!!</strong></p>
      </form>
    </section>
  );
};

export default Login;