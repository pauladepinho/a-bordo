'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('evaluations', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      max_grade: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(7),
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('evaluations');
  }
};