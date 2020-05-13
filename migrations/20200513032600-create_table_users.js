'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        autoIncrement: true
      }, 
      forename: Sequelize.STRING(100),
      surname: Sequelize.STRING(100),
      email: Sequelize.STRING(100),
      phone: Sequelize.STRING(13),
      password: Sequelize.STRING(256),
      picture: Sequelize.STRING(256),
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
