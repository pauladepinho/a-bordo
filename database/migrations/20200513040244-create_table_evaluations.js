'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('evaluations', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING(20)
      },
      max_grade: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(7),
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      academic_term: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      evaluation_number: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      classes_courses_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "classes_courses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('evaluations');
  }
};
