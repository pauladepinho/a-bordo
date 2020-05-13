'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('courses', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        autoIncrement: true
      }, 
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('courses');
  }
};