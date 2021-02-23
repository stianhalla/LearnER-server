'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('sql_quiz_alternatives', {
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
    }).then(async () => {
      // 10. sql_quiz_alternative belongsTo sql_quiz_question || question has many alternatives
      await queryInterface.addColumn(
          'sql_quiz_alternatives',
          'question_id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'sql_quiz_questions',
              key: 'id'
            },
            allowNull: false,
            onDelete: 'CASCADE' // Sletter alle alternativer knyttet til et spørsmål
          }
      )
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sql_quiz_alternatives').then(async () => {
      await queryInterface.removeColumn(
          'sql_quiz_alternatives',
          'question_id'
      )
    });
  }
};