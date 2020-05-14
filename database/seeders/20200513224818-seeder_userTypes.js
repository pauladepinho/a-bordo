'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userTypes', [
      {
        type: "professor",
      },
      {
        type: "responsável",
      },
      {
        type: "aluno",
      }
    ],
      {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userTypes', null, {});
  }
};
