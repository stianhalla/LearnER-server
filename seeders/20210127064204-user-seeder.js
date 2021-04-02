'use strict';

const faker = require('faker');
const { Rank } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = [];

    const ranks = (await Rank.findAll()).map(rank => rank.points_required);

    for (let i = 0; i < 10; i++ ){
        data.push({
          rank_id: (i % 5) + 1,
          avatar_id: (i % 5) + 1,
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: '$2b$10$8nGNh2p6MNzcpR7B7kRRVuE.6to4OXk/6xyBwb5T5QW/vgU6eQtdu', // passord123
          type: 1,
          verified: true,
          selected_notation: 1,
          score: ranks[(i % 5)] + Math.random() * Math.floor(2900),
          created_at: new Date(),
          updated_at: new Date()
        });
    }
    await queryInterface.bulkInsert('users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_has_achievements', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.sequelize.query('ALTER TABLE user_has_achievements AUTO_INCREMENT = 1');
    await queryInterface.sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1');
  }
};
