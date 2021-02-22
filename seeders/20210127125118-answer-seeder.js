'use strict';

const faker = require('faker')
const { User, Exercise } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const data = [];

      const jsonData = '{}';

      const userId = await User.findOne({ order: Sequelize.literal('rand()') }).then( user => {
          return user.id;
      });

      const exerciseId = await Exercise.findOne({ order: Sequelize.literal('rand()') }).then( exercise => {
          return exercise.id;
      });

      data.push({
          user_id: userId,
          exercise_id: exerciseId,
          answer: jsonData,
          points: 0,
          penalty_recived: 0,
          hint_used: false,
          with_help: false,
          progression: 0,
          times_checked: 0,
          created_at: new Date(),
          updated_at: new Date()
        });

      await queryInterface.bulkInsert('answers', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('answers', null, {});
    await queryInterface.sequelize.query('ALTER TABLE answers AUTO_INCREMENT = 1');
  }
};
