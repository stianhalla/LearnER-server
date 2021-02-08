'use strict';

const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = [];
    const diffLevels = ['Enkel', 'Middels', 'Krevende', 'Vanskelig', 'Ekstra Vanskelig' ];

    for(let i = 0; i <= 4 ; i++){
      data.push({
        name: diffLevels[i],
        points: 1200 + (200 * i),
        created_at: new Date(),
        updated_at: new Date()
      })
    }

    await queryInterface.bulkInsert('difficulty_levels', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('difficulty_levels', null, {});
  }
};
