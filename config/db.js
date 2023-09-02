import { Sequelize } from 'sequelize';
import 'dotenv/config';

const db = new Sequelize(process.env.DATABASE , process.env.DBUSER, process.env.DBPASSWORD, {
  dialect: process.env.DIALECT,
  host: process.env.DBHOST,
});

export default db;
