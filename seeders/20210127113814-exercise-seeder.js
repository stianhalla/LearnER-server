'use strict';

const faker = require('faker')
const { User, Difficulty_level  } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const data = [];

      for(let i = 1; i < 4; i++){

        const jsonData = '{"test" : "test"}';
        const html = `<p>${faker.lorem.paragraph()}</p>`

        const authorId = await User.findOne({ order: Sequelize.literal('rand()') }).then( user => {
         return user.id;
        });

        const diffLevId = await Difficulty_level.findOne({ order: Sequelize.literal('rand()') }).then( diff => {
          return diff.id;
        });

        data.push({
          author_id: authorId,
          difficulty_level_id: diffLevId,
          title: `Oppgave ${i}`,
          description: html,
          solution: jsonData,
          public: faker.random.boolean(),
          extra_points: faker.random.number(),
          tags: faker.lorem.words(),
          hint: html,
          hint_penalty: faker.random.number(),
          created_at: new Date(),
          updated_at: new Date()
        })
      }

      await queryInterface.bulkInsert('exercises', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exercises', null, {});
  }
};
