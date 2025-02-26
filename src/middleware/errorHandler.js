const { ValidationError } = require('express-validator');

const errorHandler = (err, req, res, next) => {
    console.error('Erro:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        query: req.query,
        params: req.params
    });

    if (err instanceof ValidationError) {
        return res.status(400).json({ 
            error: 'Erro de validação', 
            details: err.array() 
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ 
            error: 'Não autorizado', 
            message: err.message 
        });
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({ 
            error: 'Não encontrado', 
            message: err.message 
        });
    }

    res.status(500).json({ 
        error: 'Ocorreu um erro interno no servidor', 
        message: err.message 
    });
};

module.exports = errorHandler;