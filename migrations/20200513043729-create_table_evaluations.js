'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('evaluations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      classes_courses_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'classes_courses',
          key: 'id'
        }
      },
      evaluation_number: Sequelize.INTEGER,
      max_grade: Sequelize.FLOAT,
      title: Sequelize.STRING(100),
      color: Sequelize.STRING(45),
      type: Sequelize.STRING(45),
      date: Sequelize.DATE,
      academic_term: Sequelize.INTEGER
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('evaluations');
  }
};