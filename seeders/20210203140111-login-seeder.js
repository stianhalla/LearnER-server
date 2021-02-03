'use strict';

const {User} = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = [];

    for (let i = 1; i < 60; i++){

      const userId = await User.findOne({ order: Sequelize.literal('rand()') }).then( user => {
        return user.id;
      });

      data.push({
        id: i,
        createdAt: new Date(),
        updatedAt: new Date(),
        user_id: userId
      });
    }

    await queryInterface.bulkInsert('logins', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('logins', null, {});
  }
};
