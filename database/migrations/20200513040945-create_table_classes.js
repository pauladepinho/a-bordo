'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      level_of_education: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      grade: {
        type: Sequelize.INTEGER(2),
        allowNull: false
      },
      year: {
        type: Sequelize.STRING(4),
        allowNull: false
      },
      number_of_students: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      number_of_subjects: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      number_of_teachers: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      schools_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "schools",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('classes');
  }
};