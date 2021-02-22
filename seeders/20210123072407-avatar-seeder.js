'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const data = [];

      for(let i = 1; i < 6; i++){
          data.push({
              id: i,
              filename: `rank${i}.png`,
              created_at: new Date(),
              updated_at: new Date()
          })
      }


      await queryInterface.bulkInsert('avatars', data, {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('avatars', null, {});
      await queryInterface.sequelize.query('ALTER TABLE avatars AUTO_INCREMENT = 1');
  }
};
