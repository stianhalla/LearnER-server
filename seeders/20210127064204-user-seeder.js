'use strict';

const faker = require('faker')
const { Avatar } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = [];

    for(let i = 1; i < 25; i++){

      // Finner en tilfeldig avatar id
      const avatarId = await Avatar.findOne({ order: Sequelize.literal('rand()') }).then((avatar) => {
        return avatar.id;
      });

      // Trekker tilfeldig poengsum fra 0 til 110 000 og finner tilhørende rank
      const randomScore = faker.random.number({'min': 1, 'max': 110000});

      function getRank(ranScore){
        switch (ranScore > 0) {
          case ranScore < 20000:
            return 1;
          case ranScore < 40000:
            return 2;
          case ranScore < 70000:
            return 3;
          case ranScore < 100000:
            return 4;
          case ranScore > 100000:
            return 5;
        }
      }

      const rankId = getRank(randomScore);

      data.push({
        rank_id: rankId,
        avatar_id: avatarId,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: '$2b$10$8nGNh2p6MNzcpR7B7kRRVuE.6to4OXk/6xyBwb5T5QW/vgU6eQtdu', // passord123
        type: faker.random.number({'min': 1,'max': 2}),
        verified: faker.random.boolean(),
        selected_notation: faker.random.number({'min': 1,'max': 2}),
        score: randomScore,
        created_at: new Date(),
        updated_at: new Date()
      })
    }
    await queryInterface.bulkInsert('users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
