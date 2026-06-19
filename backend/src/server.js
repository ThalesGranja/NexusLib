const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');

const connectDB = require('./config/db');
const logger = require('./config/logger');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());

app.use(compression());

connectDB();

// Rotas
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/favorites', favoriteRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
