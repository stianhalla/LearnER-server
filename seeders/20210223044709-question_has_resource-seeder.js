'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.sequelize.query("INSERT INTO `quiz_question_has_resources` VALUES (10,1),(11,1),(43,1),(44,1),(45,1),(46,1),(58,2),(59,2),(60,2),(61,2),(62,2),(64,2),(66,2),(35,3),(36,3),(37,3),(38,3),(40,3),(41,3),(47,3),(139,3),(140,3),(35,4),(36,4),(40,4),(41,4),(50,4),(138,4),(34,5),(35,5),(36,5),(37,5),(38,5),(39,5),(40,5),(41,5),(47,5),(49,5),(50,5),(44,6),(46,6),(47,7),(49,7),(47,8),(49,9),(50,10),(51,11),(52,11),(53,11),(55,11),(56,11),(51,12),(52,12),(53,12),(55,12),(56,12),(73,13),(74,13),(75,13),(76,13),(81,14),(82,14),(83,14),(84,14),(85,14),(86,14),(79,15),(87,15),(88,15),(89,15),(92,16),(93,16),(94,16),(95,16),(122,17),(123,18),(124,19),(128,20),(134,21),(134,22),(134,23),(138,24),(139,25),(140,25),(138,26),(139,27),(140,28);\n")
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('quiz_question_has_resources', null, {});
    await queryInterface.sequelize.query('ALTER TABLE quiz_question_has_resources AUTO_INCREMENT = 1');
  }
};
