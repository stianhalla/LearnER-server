'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Exercise_has_word extends Model {

    static associate({ Word, Exercise }) {

      this.belongsTo(Word, {
        foreignKey: 'word_id',
        as: 'word' // Navn som vises i include
      })

      this.belongsTo(Exercise, {
        foreignKey: 'exercise_id',
        as: 'exercise' // Navn som vises i include
      })

    }
  }

  Exercise_has_word.init({
    word_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    exercise_id: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'exercise_has_word',
    tableName: 'exercise_has_words',
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });
  return Exercise_has_word;
};