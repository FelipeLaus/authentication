import { DataTypes } from 'sequelize';
import db from '../../config/db.js';

const Usuario = db.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

});

export default Usuario;
