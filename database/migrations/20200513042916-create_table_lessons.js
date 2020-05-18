'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lessons', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      academic_term: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      periods: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
      observations: Sequelize.STRING,
      evaluation_day: {
        type: Sequelize.TINYINT,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('lessons');
  }
};