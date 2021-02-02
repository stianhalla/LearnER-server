'use strict';

const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const data = [];

      for (let i = 1; i < 4; i++) {
          data.push({
              id: i,
              name: `Rank ${i + 1}`,
              points_required: 10 * i,
              created_at: new Date(),
              updated_at: new Date()
          })
      }

      await queryInterface.bulkInsert('ranks', data, {});

  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('ranks', null, {});
  }
};
