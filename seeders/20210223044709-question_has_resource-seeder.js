'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const resources = [];

    resources.push({
      question_id: 1,
      resource_id: 1
    });
    resources.push({
      question_id: 2,
      resource_id: 1
    });
    resources.push({
      question_id: 3,
      resource_id: 1
    });
    resources.push({
      question_id: 4,
      resource_id: 1
    });
    resources.push({
      question_id: 2,
      resource_id: 2
    });

    await queryInterface.bulkInsert('quiz_question_has_resources', resources, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('quiz_question_has_resources', null, {});
    await queryInterface.sequelize.query('ALTER TABLE quiz_question_has_resources AUTO_INCREMENT = 1');
  }
};
