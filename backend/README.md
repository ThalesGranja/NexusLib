# NexusLib - Backend

Backend da aplicação **Nexus Library**, desenvolvido para o **Projeto 2** da disciplina
ES47B - Programação Web Fullstack.

## Tecnologias

- Node.js + Express.js
- MongoDB + Mongoose (com pool de conexões)
- JWT para autenticação
- bcryptjs para criptografia de senhas
- Winston para logs (autenticação, buscas e inserções)
- helmet + express-mongo-sanitize (proteção contra injeção e cabeçalhos inseguros)
- express-rate-limit (proteção contra ataques automatizados de login)
- compression (compressão gzip das respostas)
- axios (consumo da API Open Library)

## Estrutura

```
backend/
├── src/
│   ├── server.js
│   ├── createUser.js        # script utilitário para criar um usuário de teste
│   ├── config/
│   │   ├── db.js             # conexão com o MongoDB e pool de conexões
│   │   ├── logger.js         # configuração do Winston
│   │   └── auth.js           # middleware de autenticação JWT + rate limiter de login
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Favorite.js
│   └── routes/
│       ├── authRoutes.js     # login (e registro utilitário)
│       ├── searchRoutes.js   # busca de livros via Open Library (com cache)
│       └── favoriteRoutes.js # inserção/listagem/remoção de favoritos
```

## Como rodar

1. Copie `.env.example` para `.env` e ajuste os valores (principalmente `MONGO_URI` e `JWT_SECRET`).
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um usuário de teste para conseguir fazer login (não há cadastro pela aplicação web):
   ```bash
   npm run create-user -- seuemail@exemplo.com suasenha
   ```
4. Rode o servidor:
   ```bash
   npm run dev
   ```
   O servidor sobe por padrão em `http://localhost:5000`.

## Rotas principais

| Método | Rota                      | Protegida | Descrição                              |
|--------|---------------------------|-----------|-----------------------------------------|
| POST   | /api/auth/login           | Não       | Autentica o usuário e retorna um token  |
| GET    | /api/search?title=...     | Sim       | Busca livros na Open Library            |
| GET    | /api/favorites            | Sim       | Lista os favoritos do usuário logado    |
| POST   | /api/favorites            | Sim       | Adiciona um livro aos favoritos         |
| DELETE | /api/favorites/:id        | Sim       | Remove um livro dos favoritos           |

Todas as rotas protegidas exigem o cabeçalho `Authorization: Bearer <token>`.
