const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Favorite = require('../models/Favorite');
const { verifyToken } = require('../config/auth');
const logger = require('../config/logger');

router.post('/', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const { title, author, year, coverUrl, openLibraryId } = req.body;

  if (!title || !author) {
    logger.warn(`Tentativa de inserir favorito sem campos obrigatorios. Usuario: ${req.user.email}`);
    return res.status(400).json({ message: 'Titulo e autor sao obrigatorios.' });
  }

  try {
    let book = null;

    if (openLibraryId) {
      book = await Book.findOne({ openLibraryId });
    }
    if (!book) {
      book = await Book.findOne({ title, author });
    }
    if (!book) {
      book = await Book.create({
        title,
        author,
        year: year || null,
        coverUrl: coverUrl || null,
        openLibraryId: openLibraryId || null,
      });
    }

    const existingFavorite = await Favorite.findOne({ user: userId, book: book._id });
    if (existingFavorite) {
      return res.status(409).json({ message: 'Este livro ja esta nos seus favoritos.' });
    }

    const favorite = await Favorite.create({ user: userId, book: book._id });

    logger.info(`Livro "${book.title}" favoritado pelo usuario ${req.user.email}`);
    return res.status(201).json({ message: 'Favorito adicionado com sucesso!', favorite });
  } catch (error) {
    logger.error(`Erro ao adicionar favorito: ${error.message}`);
    return res.status(500).json({ message: 'Erro ao adicionar favorito.' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.userId })
      .populate('book')
      .sort({ createdAt: -1 });

    const books = favorites.map((fav) => ({
      favoriteId: fav._id,
      ...fav.book.toObject(),
    }));

    return res.json(books);
  } catch (error) {
    logger.error(`Erro ao buscar favoritos: ${error.message}`);
    return res.status(500).json({ message: 'Erro ao buscar favoritos.' });
  }
});

router.delete('/:favoriteId', verifyToken, async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.favoriteId,
      user: req.user.userId,
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorito nao encontrado.' });
    }

    logger.info(`Favorito ${req.params.favoriteId} removido pelo usuario ${req.user.email}`);
    return res.json({ message: 'Favorito removido com sucesso.' });
  } catch (error) {
    logger.error(`Erro ao remover favorito: ${error.message}`);
    return res.status(500).json({ message: 'Erro ao remover favorito.' });
  }
});

module.exports = router;
