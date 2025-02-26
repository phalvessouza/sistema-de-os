const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Local = sequelize.define('Local', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Local;