'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('attendances', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        allowNull: false,
        autoIncrement: true
      }, 
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      classes_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'classes_courses',
          key: 'classes_id'
        }
      },
      courses_id: {
        type: Sequelize.INTEGER,
        allowNull: false ,
        references: {
          model: 'classes_courses',
          key: 'courses_id'
        }      
      },
      type: Sequelize.STRING(45),
      evaluation_day: Sequelize.INTEGER(1),
      date: Sequelize.DATE,
      academic_term: Sequelize.INTEGER,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('attendances');
  }
};