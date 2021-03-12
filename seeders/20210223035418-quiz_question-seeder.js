'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const questions = [];

    questions.push({
      chapter_id: 1,
      text: 'Hvordan blir data organisert i et relasjonsdatabasesystem?'
    });
    questions.push({
      chapter_id: 1,
      text: 'Hva er SQL?'
    });
    questions.push({
      chapter_id: 1,
      text: 'Hvor mange forskjellige verdier kan lagres i en byte?'
    });
    questions.push({
      chapter_id: 1,
      text: 'Tallet 23 i titallsystemet tilsvarer hvilket tall i totallsystemet?'
    });
    questions.push({
      chapter_id: 2,
      text: 'Hva inneholder WHERE-delen av en SELECT-spørring?'
    });
    questions.push({
      chapter_id: 2,
      text: 'Velg WHERE-betingelse for å vise alle varer i kategoriene Verktøy og Småting.'
    });
    questions.push({
      chapter_id: 2,
      text: 'Hvilket uttrykk betyr det samme som NOT (Kategori=\'Verktøy\' AND Pris>30) ?'
    });
    questions.push({
      chapter_id: 2,
      text: 'Hvilken av følgende spørringer viser samtlige kategorier nøyaktig én gang?'
    });
    questions.push({
      chapter_id: 3,
      text: 'Hva er en primærnøkkel?'
    });
    questions.push({
      chapter_id: 3,
      text: 'Hva er kravene til en fremmednøkkel?'
    });
    questions.push({
      chapter_id: 3,
      text: 'Hvilken SQL-kommando brukes for å sette inn nye rader i en tabell?'
    });
    questions.push({
      chapter_id: 3,
      text: 'Anta alle registreringsnumre som skal lagres i en bildatabase består av 2 bokstaver og 5 siffer. Hvilken datatype er mest hensiktsmessig å bruke?'
    });

    await queryInterface.bulkInsert('db_quiz_questions', questions, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('db_quiz_questions', null, {});
    await queryInterface.sequelize.query('ALTER TABLE db_quiz_questions AUTO_INCREMENT = 1');
  }
};
