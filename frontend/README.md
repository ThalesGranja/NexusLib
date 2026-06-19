# Nexus Library (NexusLib)

Projeto desenvolvido para a disciplina **ES47B - Programação Web Fullstack**
(Prof. Willian Massami Watanabe - UTFPR Campus Cornélio Procópio).

Aplicação web em 3 camadas (Front-end, Back-end HTTP e Banco de dados) que
permite a um usuário autenticado pesquisar livros (via Open Library API) e
montar sua própria lista de livros favoritos.

---

## Identificação

- **Projeto:** Projeto 2 - Desenvolvimento Web Fullstack

---

## Tecnologias utilizadas

**Frontend**
- React.js (Vite)
- React Router DOM
- Axios
- Context API + Hooks
- Proteção de rotas (`ProtectedRoute`)
- Autenticação via JWT (token salvo no `localStorage`)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose (com pool de conexões configurado)
- bcryptjs (criptografia de senhas)
- jsonwebtoken (JWT)
- Winston (logs de autenticação, buscas e inserções)
- helmet + express-mongo-sanitize (proteção contra injeção e cabeçalhos inseguros)
- express-rate-limit (proteção contra ataques automatizados no login)
- compression (compressão gzip das respostas)
- Cache interno em memória (TTL) para a busca de livros

**API externa**
- Open Library API

---

## Estrutura do repositório

```
.
├── backend/
│   └── src/
│       ├── server.js
│       ├── createUser.js
│       ├── config/
│       │   ├── db.js
│       │   ├── logger.js
│       │   └── auth.js
│       ├── models/
│       │   ├── User.js
│       │   ├── Book.js
│       │   └── Favorite.js
│       └── routes/
│           ├── authRoutes.js
│           ├── searchRoutes.js
│           └── favoriteRoutes.js
│
└── frontend/
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── api.js
        ├── components/
        │   ├── BookCard.jsx
        │   ├── BookList.jsx
        │   ├── Login.jsx
        │   ├── SearchForm.jsx
        │   └── ProtectedRoute.jsx
        ├── contexts/
        │   ├── AuthContext.jsx
        │   └── BooksContext.jsx
        └── pages/
            └── FavoritesPage.jsx
```

---

## Funcionalidades implementadas

**1. Login e Autenticação**
- Login de usuários previamente cadastrados no banco (sem rota pública de
  cadastro, conforme a proposta)
- Senhas criptografadas com bcrypt
- JWT com expiração de 1h
- Rotas protegidas (front e back)
- Logs de tentativas de login (sucesso e falha)

**2. Busca de livros**
- Busca por título através da Open Library API, via rota própria do backend
  (`GET /api/search`)
- Exibição de título, autor, ano e capa
- Cache em memória (TTL de 5 min) para reduzir chamadas repetidas à API externa

**3. Favoritos**
- Adicionar um livro pesquisado à lista de favoritos (`POST /api/favorites`)
- Evita duplicados com índice único (`user` + `book`)
- Listagem dos favoritos do usuário autenticado (`GET /api/favorites`)
- Remoção de um favorito (`DELETE /api/favorites/:id`)

---

## Segurança

- Criptografia de senhas (bcrypt)
- Sanitização de parâmetros contra NoSQL Injection (`express-mongo-sanitize`)
- Cabeçalhos HTTP seguros (`helmet`)
- Rate limiting no login, para mitigar ataques automatizados
- Tokens JWT validados a cada requisição às rotas protegidas
- Logout limpa o token no front-end
- Logs de autenticação, buscas e inserções (Winston)

---

## Como rodar o projeto

### 1. Banco de dados (MongoDB)

Tenha um MongoDB rodando localmente (`mongodb://127.0.0.1:27017`) ou use o
MongoDB Atlas. Veja mais detalhes em `backend/README.md`.

### 2. Backend

```bash
cd backend
cp .env.example .env   # ajuste MONGO_URI e JWT_SECRET
npm install
npm run create-user -- seuemail@teste.com suasenha   # cria um usuário de teste
npm run dev
```

O backend sobe em `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend sobe (por padrão) em `http://localhost:5173`.

### 4. Uso

1. Acesse o frontend e faça login com o usuário criado no passo 2.
2. Em **Biblioteca**, pesquise livros e clique em **☆ Favoritar**.
3. Em **Favoritos**, veja e remova os livros favoritados.

---

Mais detalhes técnicos de cada camada estão nos READMEs específicos:
[`backend/README.md`](./backend/README.md) e [`frontend/README.md`](./frontend/README.md).