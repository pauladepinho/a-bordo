'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('userTypes', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('userTypes');
  }
};
