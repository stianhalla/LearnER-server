    'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const data = [];

      // Bruker kjenete placholder navn som tittel

      data.push({
          title: 'Foo',
          description: 'Fullfør 5 forskjellige ER-modellerings oppgaver',
          type: 1,
          reward: 250,
          condition: 5,
          image: "trophy_3.png",
          created_at: new Date(),
          updated_at: new Date()
      });

      data.push({
          title: 'Bar',
          description: 'Fullfør 10 forskjellige ER-modellerings oppgaver',
          type: 1,
          reward: 500,
          condition: 10,
          image: "trophy_2.png",
          created_at: new Date(),
          updated_at: new Date()
      });

      data.push({
          title: 'Baz',
          description: 'Fullfør 15 forskjellige ER-modellerings oppgaver',
          type: 1,
          reward: 1000,
          condition: 15,
          image: "trophy_1.png",
          created_at: new Date(),
          updated_at: new Date()
      });

      data.push({
          title: 'Qux',
          description: 'Fullfør 5 ER-modellerings oppgaver uten å trykke "sjekk"',
          type: 2,
          reward: 250,
          condition: 5,
          image: "trophy_3.png",
          created_at: new Date(),
          updated_at: new Date()
      });

      data.push({
          title: 'Acme',
          description: 'Fullfør 10 ER-modellerings oppgaver uten å trykke "sjekk"',
          type: 2,
          reward: 500,
          condition: 10,
          image: "trophy_2.png",
          created_at: new Date(),
          updated_at: new Date()
      });

      data.push({
          title: 'Xyzzy',
          description: 'Fullfør 15 ER-modellerings oppgaver uten å trykke "sjekk"',
          type: 2,
          reward: 1000,
          condition: 15,
          image: "trophy_1.png",
          created_at: new Date(),
          updated_at: new Date()
      });

     await queryInterface.bulkInsert('achievements', data, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('achievements', null, {});
     await queryInterface.sequelize.query('ALTER TABLE achievements AUTO_INCREMENT = 1');
  }
};
