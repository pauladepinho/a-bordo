'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userTypes', [
      {
        type: "professor",
      },
      {
        type: "responsavel",
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
