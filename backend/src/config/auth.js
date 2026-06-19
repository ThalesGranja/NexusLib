const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const logger = require('./logger');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    logger.warn('Tentativa de acesso sem token.');
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn(`Token invalido ou expirado: ${error.message}`);
    return res.status(401).json({ message: 'Token invalido ou expirado.' });
  }
};

// Limita tentativas de login para mitigar ataques automatizados (brute force)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Muitas tentativas de login. Tente novamente mais tarde.' },
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit de login atingido para o IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
});

module.exports = { verifyToken, loginLimiter };
