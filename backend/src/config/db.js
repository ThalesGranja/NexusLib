const mongoose = require('mongoose');
const logger = require('./logger');

// Configuracao do pool de conexoes do MongoDB (requisito de avaliacao)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Erro de conexao com MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
