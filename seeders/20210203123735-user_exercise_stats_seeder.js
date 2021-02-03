'use strict';

const faker = require('faker');
const {User, Exercise} = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [];

    for(let i = 0; i < 40; i++) {

      const userId = await User.findOne({ order: Sequelize.literal('rand()') }).then( user => {
        return user.id;
      });

      const exId = await Exercise.findOne({ order: Sequelize.literal('rand()') }).then( exercise => {
        return exercise.id;
      });

      data.push({
        user_id: userId,
        exercise_id: exId,
        completed: faker.random.boolean(),
        attempts: faker.random.number({'min': 1, 'max': 5}),
        completed_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      })
    }

    // Sjekker at listen ikke inneholder duplikat kombinasjoner av user_id og exercise_id før den blir seedet til DB.
    for (let i = 0; i < data.length; i++){
      for(let j = i; j < data.length; j++){
        if(data[i].user_id === data[j].user_id && data[i].exercise_id === data[j].exercise_id){
          data.splice(data[j], 1);
        }
      }
    }

    await queryInterface.bulkInsert('user_exercise_stats', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_exercise_stats', null, {});
  }
};
