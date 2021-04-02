'use strict';

const faker = require('faker');
const { Rank, Achievement } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = [];
    const data2 = [];

    const ranks = (await Rank.findAll()).map(rank => rank.points_required);
    const achievements = await Achievement.findAll();

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

        const dataAchi = [];
        achievements.forEach(achi => {
          dataAchi.push({ user_id: i + 1, achievement_id: achi.id, created_at: new Date(), updated_at: new Date()})
        })
        data2.push(dataAchi);
    }
    await queryInterface.bulkInsert('users', data, {});
    for (const dataAchi of data2) {
      await queryInterface.bulkInsert('user_has_achievements', dataAchi, {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_has_achievements', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.sequelize.query('ALTER TABLE user_has_achievements AUTO_INCREMENT = 1');
    await queryInterface.sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1');
  }
};
