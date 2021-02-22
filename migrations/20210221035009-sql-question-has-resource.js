'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SQL_question_has_resources', {
      question_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'SQL_quiz_questions',
          key: 'id'
        }
      },
      resource_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'SQL_quiz_resources',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SQL_question_has_resources');
  }
};
