import Sequelize, { Model, DataTypes } from 'sequelize';
import SequelizeSlugify from 'sequelize-slugify';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        slug: {
          type: DataTypes.STRING,
          unique: true,
        },
        cnpj: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    SequelizeSlugify.slugifyModel(Company, {
      source: ['name'],
    });

    return this;
  }

  // static associate

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }

  // methods
}

export default Company;
