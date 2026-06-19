const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const logger = require('../config/logger');
const { loginLimiter } = require('../config/auth');

// POST /api/auth/register
// Nao exigido pela proposta (usuarios podem ser inseridos direto no banco),
// mas mantido como utilitario para facilitar testes locais.
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuario ja existe.' });
    }

    const user = new User({ email, password });
    await user.save();

    logger.info(`Novo usuario registrado: ${email}`);
    res.status(201).json({ message: 'Usuario criado com sucesso!' });
  } catch (error) {
    logger.error(`Erro ao registrar usuario: ${error.message}`);
    res.status(500).json({ message: 'Erro ao criar usuario.' });
  }
});

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    logger.warn('Tentativa de login falhou: campos em branco.');
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      logger.warn(`Tentativa de login falhou: usuario nao encontrado para o email ${email}`);
      return res.status(401).json({ message: 'Credenciais invalidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Tentativa de login falhou: senha incorreta para o email ${email}`);
      return res.status(401).json({ message: 'Credenciais invalidas.' });
    }

    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    logger.info(`Usuario ${email} logado com sucesso.`);
    res.json({ token, user: { email: user.email } });
  } catch (error) {
    logger.error(`Erro no servidor ao fazer login: ${error.message}`);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

module.exports = router;
