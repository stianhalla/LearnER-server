'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      msg_key: {
        type: Sequelize.STRING(30)
      },
      msg_level: {
        type: Sequelize.INTEGER
      },
      msg_lang: {
        type: Sequelize.STRING(3)
      },
      msg_alt: {
        type: Sequelize.STRING(3)
      },
      msg_text: {
        type: Sequelize.STRING(10000)
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  }
};