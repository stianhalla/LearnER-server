'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const chapters = [];

    chapters.push({
      id: 1,
      title: "1. Introduksjon"
    });
    chapters.push({
      id: 2,
      title: "2. Spørringer mot én tabell"
    });
    chapters.push({
      id: 3,
      title: "3. Lage og bruke tabeller"
    });
    chapters.push({
      id: 4,
      title: "4. Spørringer mot flere tabeller"
    });
    chapters.push({
      id: 5,
      title: "5. Avanserte spørringer"
    });
    chapters.push({
      id: 6,
      title: "6. Relasjonsmodellen"
    });
    chapters.push({
      id: 7,
      title: "7. Datamodellering med ER"
    });
    chapters.push({
      id: 8,
      title: "8. Fra modell til database"
    });
    chapters.push({
      id: 9,
      title: "9. Filer og indekser"
    });
    chapters.push({
      id: 10,
      title: "10. Transaksjoner"
    });
    chapters.push({
      id: 11,
      title: "11. Databaseadministrasjon"
    });
    chapters.push({
      id: 12,
      title: "12. Web-applikasjoner"
    });
    chapters.push({
      id: 13,
      title: "13. Lagrede programmer"
    });

    await queryInterface.bulkInsert('SQL_quiz_chapters', chapters, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SQL_quiz_chapters', null, {});
    await queryInterface.sequelize.query('ALTER TABLE SQL_quiz_chapters AUTO_INCREMENT = 1');
  }
};
