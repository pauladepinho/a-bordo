'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('userTypes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        autoIncrement: true
      }, 
      type: {
        type: Sequelize.STRING(45),
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('userTypes');
  }
};