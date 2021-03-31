/**
 * @author Stian Helgerud
 * DB Model grensesnitt klasse for å representere ord i en oppgave
 * */

'use strict';
const {encrypt} = require('../utilities/crypting');

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
        as: 'synonyms'
      });

    }
    // Fjerner valgte felter fra json objektet ved json response
    toJSON() {
      return {
        ...this.get(),
        word: encrypt(this.word), // krypterer fasit svaret
        created_at: undefined,
        updated_at: undefined
      }
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