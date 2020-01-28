require('dotenv/config');
import { Sequelize } from 'sequelize-typescript';
import { User } from '../app/models/User';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: console.log,
  models: [User], // ou ../models
  /*
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  };
*/
});
