# NexusLib - Frontend

Frontend da aplicação **Nexus Library**, desenvolvido em React (Vite) para o
Projeto 2 da disciplina ES47B - Programação Web Fullstack.

## Tecnologias

- React 19 + Vite
- React Router DOM
- Axios (comunicação HTTP com o backend)
- Context API + Hooks (autenticação e estado de busca)

## Estrutura

```
src/
├── App.jsx
├── main.jsx
├── api.js                    # instância axios com token JWT automático
├── components/
│   ├── BookCard.jsx          # card de livro com botão "Favoritar"
│   ├── BookList.jsx
│   ├── Login.jsx
│   ├── SearchForm.jsx
│   └── ProtectedRoute.jsx    # bloqueia rotas para quem não está logado
├── contexts/
│   ├── AuthContext.jsx       # login/logout, token em localStorage
│   └── BooksContext.jsx      # busca de livros via backend
└── pages/
    └── FavoritesPage.jsx     # lista os favoritos do usuário logado
```

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Garanta que o **backend** esteja rodando em `http://localhost:5000`
   (veja o README da pasta `backend/`).
3. Rode o frontend:
   ```bash
   npm run dev
   ```

## Fluxo da aplicação

1. **Login** (`/`): autentica o usuário no backend e guarda o token JWT.
2. **Biblioteca** (`/biblioteca`): permite pesquisar livros (via Open Library,
   através do backend) e favoritá-los com um clique.
3. **Favoritos** (`/favoritos`): lista os livros favoritados pelo usuário,
   com opção de remover.

Todas as rotas, exceto o login, são protegidas por `ProtectedRoute` e exigem
um token JWT válido.
