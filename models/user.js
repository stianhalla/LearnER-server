'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Exercise }) {
      // En bruker kan være forfatter for mange oppgaver
      this.hasMany(Exercise, {
        foreignKey: 'user_id'
      }); // Fremmednøkkel hos exercise tabell
    }
  };
  User.init({
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    rank: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};