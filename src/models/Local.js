const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Local = sequelize.define('Local', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'O nome não pode estar vazio'
            },
            len: {
                args: [3, 255],
                msg: 'O nome deve ter entre 3 e 255 caracteres'
            }
        }
    }
}, {
    timestamps: true,
    paranoid: true,
    tableName: 'locais'
});

module.exports = Local;