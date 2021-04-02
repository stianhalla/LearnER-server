'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const data = [];

      data.push({
          title: 'Hei verden',
          description: 'ikke prøv',
          type: 1,
          points: 0,
          created_at: new Date(),
          updated_at: new Date()
      })

     await queryInterface.bulkInsert('achievements', data, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('achievements', null, {});
     await queryInterface.sequelize.query('ALTER TABLE achievements AUTO_INCREMENT = 1');
  }
};
