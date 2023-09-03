import { DataTypes } from 'sequelize';
import db from '../../config/db.js';
import Usuario from '../models/usuario.model.js';

const Card = db.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  mensagem: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  envidoEm: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  LidoEm: {
    type: DataTypes.DATE,
    allowNull: true,
  },

});

Card.belongsTo(Usuario,{
  constraints:true,
  foreignKey:'idRemetente',
  allowNull: false,
});

Card.belongsTo(Usuario,{
  constraints:true,
  foreignKey:'idDestinatario',
  allowNull: false,
});

Usuario.hasMany(Card,{
  constraints:true,
  foreignKey:'idRemetente',
  allowNull: false,
});

Usuario.hasMany(Card,{
  constraints:true,
  foreignKey:'idDestinatario',
  allowNull: false,
});

export default Card;
