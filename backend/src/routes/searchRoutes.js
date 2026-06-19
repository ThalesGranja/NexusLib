const express = require('express');
const axios = require('axios');
const router = express.Router();
const { verifyToken } = require('../config/auth');
const logger = require('../config/logger');

const CACHE_TTL_MS = 5 * 60 * 1000;
const searchCache = new Map();

router.get('/', verifyToken, async (req, res) => {
  const { title } = req.query;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "O parametro 'title' e obrigatorio." });
  }

  const cacheKey = title.trim().toLowerCase();
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    logger.info(`Busca "${title}" retornada do cache para o usuario ${req.user.email}`);
    return res.json(cached.data);
  }

  try {
    const response = await axios.get('https://openlibrary.org/search.json', {
      params: { title: title.trim() },
      timeout: 8000,
    });

    const books = response.data.docs.slice(0, 20).map((doc) => ({
      title: doc.title,
      author: doc.author_name ? doc.author_name[0] : 'Autor desconhecido',
      year: doc.first_publish_year || null,
      openLibraryId: doc.key || null,
      coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
    }));

    searchCache.set(cacheKey, { data: books, timestamp: Date.now() });

    logger.info(`Busca de livros "${title}" realizada pelo usuario ${req.user.email}`);
    return res.json(books);
  } catch (error) {
    logger.error(`Erro ao buscar na Open Library: ${error.message}`);
    return res.status(500).json({ message: 'Erro ao buscar livros.' });
  }
});

module.exports = router;
