'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username:{
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type:{ // Student = 1, Lærer = 2
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      verified: { // Om bruker har blitt verifisert av lærer
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      selected_notation: { // 1 = ER, 2 = UML 3 = forenklet ER, 4 er til utviddelse
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      score:{
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
    await queryInterface.dropTable('users');
  }
};