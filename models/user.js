'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate({ Exercise, Avatar, Answer, Login }) {

      // En bruker kan være forfatter for mange oppgaver
      this.hasMany(Exercise, {
        foreignKey: 'author_id'
      }); // Fremmednøkkel hos exercise tabell

      this.belongsTo(Avatar, {
        foreignKey: 'avatar_id'
      })

      this.hasMany(Answer, {
        foreignKey: 'user_id'
      })

      this.hasMany(Login, {
        foreignKey: 'user_id'
      })

      this.belongsToMany(Exercise, {
        through: 'user_exercise_stats',
        foreignKey: 'user_id'
      })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a username' },
        notEmpty: true,
      }
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    type: DataTypes.INTEGER,
    verified: DataTypes.BOOLEAN,
    selected_notation: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return User;
};