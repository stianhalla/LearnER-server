'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {

    static associate({ User }) {
      // En oppgave tilghører en bruker (forfatter)
      this.belongsTo(User, {
        foreignKey: 'user_id'
      }); // Fremmednøkkel i exercises tabellen
    }
  };
  Exercise.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    solution: DataTypes.JSON,
    public: DataTypes.BOOLEAN,
    points: DataTypes.INTEGER,
    tags: DataTypes.STRING,
    difficulty: DataTypes.INTEGER,
    feedback: DataTypes.STRING,
    feedback_penalty: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'exercises',
    modelName: 'Exercise',
  });
  return Exercise;
};