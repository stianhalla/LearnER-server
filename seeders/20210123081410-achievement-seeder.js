    'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      const data = [];

      data.push({
          title: 'Hei verden',
          description: 'Fullfør 5 forskjellige ER-modellerings oppgaver',
          type: 1,
          reward: 250,
          condition: 5,
          image: "trophy_3.png",
          created_at: new Date(),
          updated_at: new Date()
      });

      data.push({
          title: 'Ted',
          description: 'Fullfør 10 forskjellige ER-modellerings oppgaver',
          type: 1,
          reward: 500,
          condition: 10,
          image: "trophy_3.png",
          created_at: new Date(),
          updated_at: new Date()
      });

      data.push({
          title: 'Edgar Codd',
          description: 'Fullfør 15 forskjellige ER-modellerings oppgaver',
          type: 1,
          reward: 1000,
          condition: 15,
          image: "trophy_3.png",
          created_at: new Date(),
          updated_at: new Date()
      });

      data.push({
          title: 'Av med støttehjul',
          description: 'Fullfør 5 ER-modellerings oppgaver uten å trykke "sjekk"',
          type: 2,
          reward: 250,
          condition: 5,
          image: "trophy_3.png",
          created_at: new Date(),
          updated_at: new Date()
      });

      data.push({
          title: 'Full kontroll',
          description: 'Fullfør 10 ER-modellerings oppgaver uten å trykke "sjekk"',
          type: 2,
          reward: 500,
          condition: 10,
          image: "trophy_3.png",
          created_at: new Date(),
          updated_at: new Date()
      });

      data.push({
          title: 'Daredevil',
          description: 'Fullfør 15 ER-modellerings oppgaver uten å trykke "sjekk"',
          type: 2,
          reward: 1000,
          condition: 15,
          image: "trophy_3.png",
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
