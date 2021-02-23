'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sql_quiz_questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chapter_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sql_quiz_chapters',
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
    await queryInterface.removeColumn(
        'sql_quiz_questions',
        'chapter_id'
    );
    await queryInterface.dropTable('sql_quiz_questions');
  }
};