'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SQL_quiz_alternatives', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,
        type: Sequelize.STRING
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING
      },
      correct: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SQL_quiz_alternatives');
  }
};