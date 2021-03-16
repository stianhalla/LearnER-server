'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      answer: {
        type: Sequelize.JSON
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      penalty_recived: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      hint_used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      with_help: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      submitted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      progression: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      times_checked: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('answers');
  }
};