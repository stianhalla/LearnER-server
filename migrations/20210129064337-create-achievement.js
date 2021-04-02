'use strict';
const {defaultValue} = require("../config/types");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('achievements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: defaultValue.ACHIEVEMENT_TYPE
      },
      reward: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
      },
      condition: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0
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
    await queryInterface.dropTable('achievements');
  }
};