'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      schools_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'schools',
          key: 'id'
        }
      },
      code: {
        type: Sequelize.STRING(10),
        allowNull: false, 
      },
      number_of_students: Sequelize.INTEGER,
      number_of_courses: Sequelize.INTEGER,
      number_of_teachers: Sequelize.INTEGER,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('classes');
  }
};