/**
 * @author Stian Helgerud
 * DB Model grensesnitt klasse for å representere synonymer
 * */

'use strict';
const { Model } = require('sequelize');
const {encrypt} = require('../utilities/crypting');


module.exports = (sequelize, DataTypes) => {
  class Synonym extends Model {

    static associate({ Word }) {

      this.belongsTo(Word, {
        foreignKey: 'word_id',
        as: 'word'
      });

    }
    // Fjerner valgte felter fra json objektet ved json response
    toJSON() {
      return {
        ...this.get(),
        synonym: encrypt(this.synonym), // krypterer fasit svaret
        created_at: undefined,
        updated_at: undefined
      }
    }
  }

  Synonym.init({
    synonym: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Synonym',
    tableName: 'synonyms',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
  });
  return Synonym;
};