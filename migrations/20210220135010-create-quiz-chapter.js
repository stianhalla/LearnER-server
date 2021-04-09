'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('db_quiz_chapters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      best_attempt: {
        type: Sequelize.JSON
      },
      num_attempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('db_quiz_chapters');
  }
};