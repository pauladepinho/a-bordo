'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      forename: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      phone: Sequelize.STRING(17),
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      picture: Sequelize.BLOB
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
