'use strict';
const {notEmptyMsg} = require("../config/validations");
const {notNullMsg} = require("../config/validations");
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Word extends Model {

    static associate({ Synonym, Exercise }) {

      this.belongsToMany(Exercise, {
        through: 'exercise_has_words',
        foreignKey: 'word_id',
        as: 'exercises'
      })

      this.hasMany(Synonym, {
        foreignKey: 'word_id',
      });

    }
  }

  Word.init({
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: notNullMsg},
        notEmpty: {msg: notEmptyMsg},
      }
    }
  }, {
    sequelize,
    tableName: 'words',
    modelName: 'Word',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });
  return Word;
};