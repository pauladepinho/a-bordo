'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        forename: 'Patricia',
        surname: 'Felix',
        email: 'patricia@email.com',
        phone: '11 99999-9999',
        password: '1234',
        picture: '/img/patriciafelix.jpg'
      },
      {
        forename: 'Paula',
        surname: 'de Pinho',
        email: 'paula@email.com',
        phone: '11 99999-9999',
        password: '1234',
        picture: '/img/pauladepinho.jpg'
      },
      {
        forename: 'Andeilso',
        surname: 'Alves',
        email: 'andeilso@email.com',
        phone: '11 99999-9999',
        password: '1234',
        picture: '/img/andeilsoalves.jpg'
      },
      {
        forename: 'João',
        surname: 'de Oliveira da Silva Santos',
        email: 'joao@email.com',
        phone: '11 99999-9999',
        password: '1234',
        picture: '/img/joaodeoliveira.jpg'
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
