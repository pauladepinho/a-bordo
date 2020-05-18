'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categories');
  }
};