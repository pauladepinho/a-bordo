'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students_evaluations', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      evaluated: {
        type: Sequelize.TINYINT,
        allowNull: false
      },
      grade: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      evaluations_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "evaluations",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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
    return queryInterface.dropTable('students_evaluations');
  }
};