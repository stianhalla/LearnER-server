'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const wordsData = [{
      word: 'ansatt',
      created_at: new Date(),
      updated_at: new Date()
    }];

    const synonymsData = [{
      word_id: 1,
      synonym: 'ans',
      created_at: new Date(),
      updated_at: new Date()
    }];

    const exerciseHasWordsData = [{
      word_id: 1,
      exercise_id: 1,
      type: 'attr',
      created_at: new Date(),
      updated_at: new Date()
    }];

    // 1 words
    await queryInterface.bulkInsert('words', wordsData, {});

    // 2 synonyms
    await queryInterface.bulkInsert('synonyms', synonymsData, {});

    // 3 exercise_has_words
    await queryInterface.bulkInsert('exercise_has_words', exerciseHasWordsData, {});

  },

  down: async (queryInterface, Sequelize) => {
     // 1 exercise_has_words
     await queryInterface.bulkDelete('exercise_has_words', null, {});
     await queryInterface.sequelize.query('ALTER TABLE exercise_has_words AUTO_INCREMENT = 1');

    // 2 synonyms
    await queryInterface.bulkDelete('synonyms', null, {});
    await queryInterface.sequelize.query('ALTER TABLE synonyms AUTO_INCREMENT = 1');

    // 3 words
    await queryInterface.bulkDelete('words', null, {});
    await queryInterface.sequelize.query('ALTER TABLE words AUTO_INCREMENT = 1');
  }
};
