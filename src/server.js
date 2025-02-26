const express = require('express');
const dotenv = require('dotenv');
const ordensRouter = require('./src/routes/ordens');
const locaisRouter = require('./src/routes/locais');
const sequelize = require('./src/config/database');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Sistema de Chamados de TI',
            version: '1.0.0',
            description: 'API para gerenciamento de chamados de TI'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sincronizar o banco de dados
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => console.error('Erro ao sincronizar o banco de dados', err));

// Usar as rotas de ordens
app.use('/ordens', ordensRouter);
app.use('/locais', locaisRouter);

// Middleware de tratamento de erros
app.use(errorHandler);