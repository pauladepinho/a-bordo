'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('schools', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      passing_grade: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false
      },
      academic_terms: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      municipality: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('schools');
  }
};
