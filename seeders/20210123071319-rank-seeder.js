'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      const ranks = [];

      ranks.push({
         id: 1,
         name: "Nybegynner",
         points_required: 0,
         created_at: new Date(),
         updated_at: new Date()
      });
      ranks.push({
          id: 2,
          name: "Amatør",
          points_required: 20000,
          created_at: new Date(),
          updated_at: new Date()
      });
      ranks.push({
          id: 3,
          name: "Dyktig",
          points_required: 40000,
          created_at: new Date(),
          updated_at: new Date()
      });
      ranks.push({
          id: 4,
          name: "Ekspert",
          points_required: 70000,
          created_at: new Date(),
          updated_at: new Date()
      });
      ranks.push({
          id: 5,
          name: "Mester",
          points_required: 100000,
          created_at: new Date(),
          updated_at: new Date()
      });


      await queryInterface.bulkInsert('ranks', ranks, {});

  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('ranks', null, {});
      await queryInterface.sequelize.query('ALTER TABLE difficulty_levels AUTO_INCREMENT = 1');
  }
};
