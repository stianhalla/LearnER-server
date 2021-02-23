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
      text: {
        allowNull: false,
        type: Sequelize.STRING
      }
    }).then(async () => {
      // 13. sql_quiz_question belongsTo sql_quiz_chapter || chapter has many questions
      await queryInterface.addColumn(
          'sql_quiz_questions',
          'chapter_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'sql_quiz_chapters',
              key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE' // Sletter alle spørsmål knyttet til et kapittel
          }
      )
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sql_quiz_questions').then(async () => {
      await queryInterface.removeColumn(
          'sql_quiz_questions',
          'chapter_id'
      )
    });
  }
};