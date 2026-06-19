// Script utilitario para criar um usuario de teste no banco,
// ja que o login nao precisa de uma rota publica de cadastro (ver proposta).
// Uso: npm run create-user
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = process.argv[2] || 'usuario@nexuslib.com';
    const password = process.argv[3] || '123456';

    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`Usuario ${email} ja existe.`);
      process.exit(0);
    }

    const user = new User({ email, password });
    await user.save();

    console.log(`Usuario criado com sucesso: ${email} / senha: ${password}`);
    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar usuario:', error);
    process.exit(1);
  }
};

createUser();
