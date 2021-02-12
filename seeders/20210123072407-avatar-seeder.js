'use strict';

const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const data = [];

      for(let i = 1; i < 6; i++){
          data.push({
              id: i,
              filename: faker.image.avatar(),
              created_at: new Date(),
              updated_at: new Date()
          })
      }


      await queryInterface.bulkInsert('avatars', data, {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('avatars', null, {});
      await queryInterface.sequelize.query('ALTER TABLE difficulty_levels AUTO_INCREMENT = 1');
  }
};
