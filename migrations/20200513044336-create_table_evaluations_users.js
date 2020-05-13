'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('evaluations_users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      evaluations_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'evaluations',
          key: 'id'
        }
      },
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      evaluated: Sequelize.INTEGER(1),
      grade: Sequelize.FLOAT
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('evaluations_users');
  }
};