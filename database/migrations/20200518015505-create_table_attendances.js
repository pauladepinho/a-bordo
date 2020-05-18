'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('attendances', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      mark: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      period: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
      classes_lessons_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "classes_lessons",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('attendances');
  }
};