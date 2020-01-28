import { Sequelize } from 'sequelize-typescript';

import User from '../app/models/User';
import Company from '../app/models/Company';
import Balance from '../app/models/Balance';

import databaseConfig from '../config/database';

const models = [User, Company, Balance];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
