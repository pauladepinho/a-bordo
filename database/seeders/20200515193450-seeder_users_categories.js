'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_categories', [
      {
        users_id: 1, // Paula
        categories_id: 1 // professor
      },
      {
        users_id: 1, // Paula
        categories_id: 2 // responsável
      },
      {
        users_id: 2, // Patrícia
        categories_id: 1 // professor
      },
      {
        users_id: 3, // Andeilso
        categories_id: 2 // responsável
      },
      {
        users_id: 4, // João
        categories_id: 2 // responsável
      },
      {
        users_id: 4, // João
        categories_id: 3 // aluno
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_categories', null, {});
  }
};
