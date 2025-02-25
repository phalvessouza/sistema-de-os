const express = require('express');
const dotenv = require('dotenv');
const ordensRouter = require('./routes/ordens');
const sequelize = require('./config/database');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Sincronizar o banco de dados
sequelize.sync()
    .then(() => console.log('Banco de dados sincronizado'))
    .catch(err => console.error('Erro ao sincronizar o banco de dados', err));

// Usar as rotas de ordens
app.use('/api', ordensRouter);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});