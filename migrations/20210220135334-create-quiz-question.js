'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('db_quiz_questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chapter_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'db_quiz_chapters',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE' // Sletter alle spørsmål knyttet til et kapittel
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('db_quiz_questions');
  }
};