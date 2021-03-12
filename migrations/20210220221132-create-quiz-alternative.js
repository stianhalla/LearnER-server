'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('db_quiz_alternatives', {
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
      question_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'db_quiz_questions',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE' // Sletter alle alternativer knyttet til et spørsmål
      },
      correct: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('db_quiz_alternatives');
  }


};