'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subjects', [
      { name: "arts" },
      { name: "biology" },
      { name: "science" },
      { name: "physical education" },
      { name: "philosophy" },
      { name: "physics" },
      { name: "geography" },
      { name: "geometry" },
      { name: "history" },
      { name: "informatics" },
      { name: "spanish" },
      { name: "french" },
      { name: "english" },
      { name: "portuguese" },
      { name: "literature" },
      { name: "mathematics" },
      { name: "music" },
      { name: "chemistry" },
      { name: "writing" },
      { name: "sociology" },
      { name: "theater" }
    ],
      {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subjects', null, {});
  }
};
