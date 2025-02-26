// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.error('Authorization header missing');
        return res.status(401).send({ error: 'Acesso negado: Cabeçalho de autorização ausente' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.error('Token missing in Authorization header');
        return res.status(401).send({ error: 'Acesso negado: Token ausente' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Invalid token', err);
            return res.status(403).send({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;