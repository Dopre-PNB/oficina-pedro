const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING(8),
    allowNull: false,
    validate: {
      is: /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/,
    },
  },
  modeloVeiculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quilometragem: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}, {
  tableName: 'clientes',
})

module.exports = Cliente
