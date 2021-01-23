'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      solution: {
        type: Sequelize.JSON
      },
      public: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      points: {
        type: Sequelize.INTEGER
      },
      tags: {
        type: Sequelize.STRING
      },
      difficulty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      feedback: {
        type: Sequelize.STRING
      },
      feedback_penalty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exercises');
  }
};