'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_userTypes', [
      {
        users_id: 1, // Paula
        userTypes_id: 1 // professor
      },
      {
        users_id: 1, // Paula
        userTypes_id: 2 // responsável
      },
      {
        users_id: 2, // Patrícia
        userTypes_id: 1 // professor
      },
      {
        users_id: 3, // Andeilso
        userTypes_id: 2 // responsável
      },
      {
        users_id: 4, // João
        userTypes_id: 2 // responsável
      },
      {
        users_id: 4, // João
        userTypes_id: 3 // aluno
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_userTypes', null, {});
  }
};
