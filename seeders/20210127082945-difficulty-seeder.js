'use strict';


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

    data[0].attempts = 5
    data[1].attempts = 7
    data[2].attempts = 10
    data[3].attempts = 12
    data[4].attempts = 15

    await queryInterface.bulkInsert('difficulty_levels', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('difficulty_levels', null, {});
    await queryInterface.sequelize.query('ALTER TABLE difficulty_levels AUTO_INCREMENT = 1');
  }
};
