'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alternatives = [];

    alternatives.push({
      question_id: 1,
      value: 'a',
      text: 'I form av noder som peker til hverandre.',
      correct: false
    });
    alternatives.push({
      question_id: 1,
      value: 'b',
      text: 'I form av en samling av tabeller som hører logisk sammen.',
      correct: true
    });
    alternatives.push({
      question_id: 1,
      value: 'c',
      text: 'I form av et slags slektstre.',
      correct: false
    });
    alternatives.push({
      question_id: 1,
      value: 'd',
      text: 'I form av en graf.',
      correct: false
    });
    alternatives.push({
      question_id: 2,
      value: 'a',
      text: 'En maskin for å lagre store mengder av data.',
      correct: false
    });
    alternatives.push({
      question_id: 2,
      value: 'b',
      text: 'Et programmeringsspråk for å lage nettsider.',
      correct: false
    });
    alternatives.push({
      question_id: 2,
      value: 'c',
      text: 'En person som har ansvar for driften av et databasesystem.',
      correct: false
    });
    alternatives.push({
      question_id: 2,
      value: 'd',
      text: 'Et spørrespråk for å jobbe med databaser.',
      correct: true
    });
    alternatives.push({
      question_id: 3,
      value: 'a',
      text: '2',
      correct: false
    });
    alternatives.push({
      question_id: 3,
      value: 'b',
      text: '8',
      correct: false
    });
    alternatives.push({
      question_id: 3,
      value: 'c',
      text: '16',
      correct: false
    });
    alternatives.push({
      question_id: 3,
      value: 'd',
      text: '256',
      correct: true
    });
    alternatives.push({
      question_id: 4,
      value: 'a',
      text: '1110',
      correct: false
    });
    alternatives.push({
      question_id: 4,
      value: 'b',
      text: '10111',
      correct: true
    });
    alternatives.push({
      question_id: 4,
      value: 'c',
      text: '1010111',
      correct: false
    });
    alternatives.push({
      question_id: 4,
      value: 'd',
      text: '111000',
      correct: false
    });
    alternatives.push({
      question_id: 5,
      value: 'a',
      text: 'Navn på tabellene som spørringene skal hente data fra.',
      correct: false
    });
    alternatives.push({
      question_id: 5,
      value: 'b',
      text: 'En betingelse som definerer hvilke rader som skal med i resultatet.',
      correct: true
    });
    alternatives.push({
      question_id: 5,
      value: 'c',
      text: 'En liste med kolonnenavn.',
      correct: false
    });
    alternatives.push({
      question_id: 5,
      value: 'd',
      text: 'Verdier som blir satt inn som nye rader i en tabell.',
      correct: false
    });
    alternatives.push({
      question_id: 6,
      value: 'd',
      text: 'Kategori = \'Verktøy\', \'Småting\'',
      correct: false
    });
    alternatives.push({
      question_id: 6,
      value: 'b',
      text: 'Kategori = \'Verktøy\' AND Kategori=\'Småting\'',
      correct: false
    });
    alternatives.push({
      question_id: 6,
      value: 'c',
      text: 'Kategori = \'Verktøy\' + \'Småting\'',
      correct: false
    });
    alternatives.push({
      question_id: 6,
      value: 'd',
      text: 'Kategori = \'Verktøy\' OR Kategori=\'Småting\'',
      correct: true
    });
    alternatives.push({
      question_id: 7,
      value: 'a',
      text: 'Kategori &lt;&gt; \'Verktøy\' OR Pris = 30',
      correct: false
    });
    alternatives.push({
      question_id: 7,
      value: 'b',
      text: 'Kategori = \'Verktøy\' OR Pris &gt; 30',
      correct: false
    });
    alternatives.push({
      question_id: 7,
      value: 'c',
      text: 'Kategori &lt;&gt; \'Verktøy\' OR Pris &lt;= 30',
      correct: true
    });
    alternatives.push({
      question_id: 7,
      value: 'd',
      text: 'Kategori &gt; 30 AND Pris = \'Verktøy\'',
      correct: false
    });
    alternatives.push({
      question_id: 8,
      value: 'a',
      text: 'SELECT * FROM Vare WHERE Kategori',
      correct: false
    });
    alternatives.push({
      question_id: 8,
      value: 'b',
      text: 'SELECT DISTINCT Kategori FROM Vare',
      correct: true
    });
    alternatives.push({
      question_id: 8,
      value: 'd',
      text: 'SELECT Id, Kategori FROM Vare',
      correct: false
    });
    alternatives.push({
      question_id: 8,
      value: 'd',
      text: 'SELECT Kategori FROM Vare ORDER BY Kategori',
      correct: false
    });
    alternatives.push({
      question_id: 9,
      value: 'a',
      text: 'En teknikk for å låse tabeller slik at ikke flere brukere kan oppdatere samtidig.',
      correct: false
    });
    alternatives.push({
      question_id: 9,
      value: 'b',
      text: 'En eller flere kolonner som entydig identifiserer en rad i en tabell',
      correct: true
    });
    alternatives.push({
      question_id: 9,
      value: 'c',
      text: 'De kolonnene som inneholder repeterende verdier. ',
      correct: false
    });
    alternatives.push({
      question_id: 9,
      value: 'd',
      text: 'Enhver kolonne som ikke kan inneholde nullmerker.',
      correct: false
    });
    alternatives.push({
      question_id: 10,
      value: 'a',
      text: 'Den kan ikke inneholde nullmerker.',
      correct: false
    });
    alternatives.push({
      question_id: 10,
      value: 'b',
      text: 'Den må tilfredsstille samtlige valideringsregler som er definert på tabellen.',
      correct: false
    });
    alternatives.push({
      question_id: 10,
      value: 'c',
      text: 'Den må enten være null, eller inneholde en verdi som finnes i tilhørende primærnøkkel.',
      correct: true
    });
    alternatives.push({
      question_id: 10,
      value: 'd',
      text: 'Den kan ikke inneholde repetisjoner.',
      correct: false
    });
    alternatives.push({
      question_id: 11,
      value: 'a',
      text: 'INSERT',
      correct: false
    });
    alternatives.push({
      question_id: 11,
      value: 'b',
      text: 'UPDATE',
      correct: false
    });
    alternatives.push({
      question_id: 11,
      value: 'c',
      text: 'SELECT',
      correct: false
    });
    alternatives.push({
      question_id: 11,
      value: 'd',
      text: 'DELETE',
      correct: false
    });
    alternatives.push({
      question_id: 12,
      value: 'a',
      text: 'DATE',
      correct: false
    });
    alternatives.push({
      question_id: 12,
      value: 'b',
      text: 'REGNR',
      correct: false
    });
    alternatives.push({
      question_id: 12,
      value: 'c',
      text: 'CHAR(7)',
      correct: true
    });
    alternatives.push({
      question_id: 12,
      value: 'd',
      text: 'INTEGER',
      correct: false
    });

    await queryInterface.bulkInsert('sql_quiz_alternatives', alternatives, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sql_quiz_alternatives', null, {});
    await queryInterface.sequelize.query('ALTER TABLE sql_quiz_alternatives AUTO_INCREMENT = 1');
  }
};
