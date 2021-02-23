'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const resources = [];

    resources.push({
        question_id: 5,
        resource_id: 1
    });
    resources.push({
      question_id: 6,
      resource_id: 1
    });
    resources.push({
      question_id: 7,
      resource_id: 1
    });
    resources.push({
      question_id: 8,
      resource_id: 1
    });

    await queryInterface.bulkInsert('sql_question_has_resources', resources, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sql_question_has_resources', null, {});
    await queryInterface.sequelize.query('ALTER TABLE sql_question_has_resources AUTO_INCREMENT = 1');
  }
};
