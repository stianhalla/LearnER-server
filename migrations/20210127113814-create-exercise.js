'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: { // HTML formatert oppgave beskrivelse
        type: Sequelize.TEXT
      },
      solution: {
        type: Sequelize.JSON
      },
      public: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      extra_points: { // Ekstra poeng man får for å løse denne oppgaven
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tags: {
        type: Sequelize.STRING
      },
      // Ekstra ord som kan godtas (oppgaver uten hjelp, bygger json synonymer)
      extra_relation_names: {
        type: Sequelize.STRING
      },
      extra_entity_names: {
        type: Sequelize.STRING
      },
      extra_attribute_names: {
        type: Sequelize.STRING
      },
      hint: { // HTML formatert hint
        type: Sequelize.TEXT
      },
      hint_penalty: { // Hvor mye poeng man mister for å bruke hintet over (prosent)
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exercises');
  }
};