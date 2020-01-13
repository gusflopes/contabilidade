import Sequelize, { Model } from 'sequelize';

class Balance extends Model {
  static init(sequelize) {
    super.init(
      {
        competencia: Sequelize.STRING,
        recBruta: Sequelize.STRING,
        despFolha: Sequelize.STRING,
        companyId: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    // Hooks

    return this;
  }

  // static associate

  static associate(models) {
    this.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' });
  }

  // methods
}

export default Balance;
