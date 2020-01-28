module.exports = {
  /**
   * @typedef {import('sequelize').Sequelize} Sequelize
   * @typedef {import('sequelize').QueryInterface} QueryInterface
   */

  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns
   */
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('companies', 'start_date', {
      type: Sequelize.DATEONLY,
    });
  },

  /**
   * @param {SequelizeQueryInterface} sqlQueryInterface
   * @param {Sequelize} Sequelize
   */
  down: queryInterface => {
    return queryInterface.removeColumn('companies', 'start_date');
  },
};
