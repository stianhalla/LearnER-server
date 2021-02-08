'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = [];

      // Trekker tilfeldig poengsum fra 0 til 110 000 og finner tilhørende rank
    const randomScore1 = faker.random.number({'min': 1, 'max': 110000});
    const randomScore2 = faker.random.number({'min': 1, 'max': 110000});
    function getRank(randomScore){
      switch (randomScore > 0) {
        case randomScore < 20000:
          return 1;
        case randomScore < 40000:
          return 2;
        case randomScore < 70000:
          return 3;
        case randomScore < 100000:
          return 4;
        case ranScore > 100000:
          return 5;
      }
    }
    const rankId1 = getRank(randomScore1);
    const rankId2 = getRank(randomScore2);

    data.push({
      rank_id: rankId1,
      avatar_id: rankId1,
      username: 'OlaNor',
      email: 'Ola-Normann@gmail.no',
      password: '$2b$10$8nGNh2p6MNzcpR7B7kRRVuE.6to4OXk/6xyBwb5T5QW/vgU6eQtdu', // passord123
      type: faker.random.number({'min': 1,'max': 2}),
      verified: faker.random.boolean(),
      selected_notation: faker.random.number({'min': 1,'max': 2}),
      score: randomScore1,
      created_at: new Date(),
      updated_at: new Date()
    });

    data.push({
      rank_id: rankId2,
      avatar_id: rankId2,
      username: 'KariNor',
      email: 'Kari-Normann@gmail.no',
      password: '$2b$10$8nGNh2p6MNzcpR7B7kRRVuE.6to4OXk/6xyBwb5T5QW/vgU6eQtdu', // passord123
      type: faker.random.number({'min': 1,'max': 2}),
      verified: faker.random.boolean(),
      selected_notation: faker.random.number({'min': 1,'max': 2}),
      score: randomScore2,
      created_at: new Date(),
      updated_at: new Date()
    });

    await queryInterface.bulkInsert('users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
