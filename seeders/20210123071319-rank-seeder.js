'use strict';

const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const data = [];

      for (let i = 0; i < 3; i++) {
          data.push({
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
