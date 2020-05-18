'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users_classes', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      subject: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      student_number: {
        type: Sequelize.INTEGER
      },
      repeater: {
        type: Sequelize.TINYINT
      },
      users_categories_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users_categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      classes_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "classes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users_classes');
  }
};