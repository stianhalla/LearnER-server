/**
 * Migrasjonsfil som håndterer forhold mellom entiteter.
 *
 * Viktig att dette er den siste migration fila (kjøres til slutt),
 * Lages nye migrasjoner skal denne fila lages på nytt (kopieres):
 *   - Kopier innhold på fila
 *   - Slett denne fila
 *   - Bruk komandoen: sequelize migration:generate --name add-associations
 *   - Lim inn i den nye fila
 * */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn(
         'exercises',
         'user_id',
         {
           type: Sequelize.INTEGER,
           references: {
             model: 'users', // Database modell
             key: 'id'
           },
           // TODO: Ikke cascade når forfatter blir slettet
           onDelete: 'CASCADE' // Slett oppgaver knyttet til bruker son slettes
         });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn(
         'exercises',
         'user_id'
     );
  }
};
