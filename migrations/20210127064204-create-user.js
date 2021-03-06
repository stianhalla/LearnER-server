const { defaultValue } = require('../config/types')

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
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type:{ // Student = 1, Lærer = 2
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: defaultValue.USER_TYPE
      },
      verified: { // Om bruker har blitt verifisert av lærer
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: defaultValue.VERIFIED
      },
      selected_notation: { // 1 = ER, 2 = forenklet ER, 3 = UML, 4 er til utviddelse
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: defaultValue.NOTATION
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