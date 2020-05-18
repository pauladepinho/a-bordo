'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes_lessons', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      users_classes_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users_classes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      lessons_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "lessons",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('classes_lessons');
  }
};