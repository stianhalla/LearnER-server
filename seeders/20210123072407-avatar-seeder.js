'use strict';


const {avatarType} = require("../config/types");

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const data = [];

      for(let i = 1; i < avatarType.NUMBER_OF_AVATARS; i++){
          data.push({
              id: i,
              filename: `rank${i}.png`,
              created_at: new Date(),
              updated_at: new Date()
          })
      }

      // Legger til administrator avatar
      data.push({
          id: avatarType.ADMIN_AVATAR.id,
          filename: avatarType.ADMIN_AVATAR.filename,
          created_at: new Date(),
          updated_at: new Date()
      });

      await queryInterface.bulkInsert('avatars', data, {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('avatars', null, {});
      await queryInterface.sequelize.query('ALTER TABLE avatars AUTO_INCREMENT = 1');
  }
};
