'use strict';

const faker = require('faker')
const { Rank, Avatar } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = [];

    for(let i = 1; i < 4; i++){
      // Finner en tilfeldig rank id
      const  rankId = await Rank.findOne({ order: Sequelize.literal('rand()') }).then((rank) => {
            return rank.id;
      });
      // Finner en tilfeldig avatar id
      const avatarId = await Avatar.findOne({ order: Sequelize.literal('rand()') }).then((avatar) => {
        return avatar.id;
      });

      data.push({
        rank_id: rankId,
        avatar_id: avatarId,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'passord123',
        type: faker.random.number({'min': 1,'max': 2}),
        verified: faker.random.boolean(),
        selected_notation: faker.random.number({'min': 1,'max': 2}),
        score: faker.random.number(),
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
