const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    funcao: {
        type: DataTypes.ENUM('Admin', 'Tecnico'),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    departamento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ultimoLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    chamadosAbertos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Usuario;